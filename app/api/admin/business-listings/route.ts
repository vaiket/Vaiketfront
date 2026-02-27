import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ADMIN_SESSION_COOKIE, readAdminSessionToken } from "@/lib/admin-auth";
import {
  createBusinessCertificateId,
  isReservedBusinessUsername,
  normalizeBusinessUsername,
} from "@/lib/business-identity";

const LISTING_STATUS_OPTIONS = [
  "draft",
  "pending_review",
  "approved",
  "rejected",
] as const;

const PAYMENT_STATUS_OPTIONS = ["unpaid", "pending", "paid", "failed"] as const;

function isAuthorized(req: NextRequest) {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return Boolean(readAdminSessionToken(token));
}

function sanitizeForIlike(value: string) {
  return value.replace(/[%_,]/g, " ").trim();
}

async function createUniqueCertificateId() {
  for (let index = 0; index < 30; index += 1) {
    const candidate = createBusinessCertificateId();
    const { data } = await supabase
      .from("business_listings")
      .select("id")
      .eq("certificate_id", candidate)
      .maybeSingle();

    if (!data) return candidate;
  }

  throw new Error("Unable to generate unique certificate id.");
}

function withSuffix(base: string, index: number, maxLength = 40) {
  if (index <= 0) return base.slice(0, maxLength);
  const suffix = `-${index}`;
  const safeBase = base.slice(0, Math.max(3, maxLength - suffix.length));
  return `${safeBase}${suffix}`;
}

async function ensureUniquePublicUsername(base: string, listingId?: string) {
  const normalizedBase = normalizeBusinessUsername(base) || "business";
  let index = 0;

  while (index < 200) {
    const candidate = withSuffix(normalizedBase, index);
    if (!candidate || isReservedBusinessUsername(candidate)) {
      index += 1;
      continue;
    }

    const { data } = await supabase
      .from("business_listings")
      .select("id")
      .ilike("public_username", candidate)
      .maybeSingle();

    if (!data || (listingId && data.id === listingId)) {
      return candidate;
    }

    index += 1;
  }

  throw new Error("Unable to reserve public username.");
}

async function withOwnerDetails(
  listings: Array<Record<string, unknown>>
): Promise<Array<Record<string, unknown>>> {
  if (listings.length === 0) return [];

  const userIds = Array.from(
    new Set(
      listings
        .map((item) => String(item.user_id ?? "").trim())
        .filter(Boolean)
    )
  );

  if (userIds.length === 0) return listings;

  const { data: users } = await supabase
    .from("business_users")
    .select("id, full_name, email, phone")
    .in("id", userIds);

  const usersMap = new Map(
    (users ?? []).map((user) => [
      user.id,
      {
        owner_name: user.full_name ?? null,
        owner_email: user.email ?? null,
        owner_phone: user.phone ?? null,
      },
    ])
  );

  return listings.map((listing) => ({
    ...listing,
    ...(usersMap.get(String(listing.user_id ?? "")) ?? {
      owner_name: null,
      owner_email: null,
      owner_phone: null,
    }),
  }));
}

export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const search = sanitizeForIlike(req.nextUrl.searchParams.get("q") ?? "");
    const status = req.nextUrl.searchParams.get("status") ?? "";
    const paymentStatus = req.nextUrl.searchParams.get("payment_status") ?? "";
    const category = req.nextUrl.searchParams.get("category") ?? "";

    let query = supabase
      .from("business_listings")
      .select(
        "id, user_id, business_name, public_username, slug, category, title, details, city, address, phone, website, whatsapp, logo_url, status, payment_status, verification_fee, verification_gst, verification_total, certificate_id, rejection_reason, approved_at, published_at, created_at, updated_at"
      )
      .order("created_at", { ascending: false })
      .limit(500);

    if (
      status &&
      status !== "all" &&
      LISTING_STATUS_OPTIONS.includes(status as (typeof LISTING_STATUS_OPTIONS)[number])
    ) {
      query = query.eq("status", status);
    }

    if (
      paymentStatus &&
      paymentStatus !== "all" &&
      PAYMENT_STATUS_OPTIONS.includes(
        paymentStatus as (typeof PAYMENT_STATUS_OPTIONS)[number]
      )
    ) {
      query = query.eq("payment_status", paymentStatus);
    }

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    if (search) {
      query = query.or(
        `business_name.ilike.%${search}%,title.ilike.%${search}%,city.ilike.%${search}%,slug.ilike.%${search}%,public_username.ilike.%${search}%`
      );
    }

    const { data, error } = await query;
    if (error) {
      console.error("ADMIN BUSINESS LISTINGS FETCH ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch business listings." },
        { status: 500 }
      );
    }

    const withOwners = await withOwnerDetails((data ?? []) as Array<Record<string, unknown>>);
    return NextResponse.json({ success: true, listings: withOwners });
  } catch (error) {
    console.error("ADMIN BUSINESS LISTINGS GET ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const listingId = String(body.listingId ?? "").trim();
    const action = String(body.action ?? "").trim();
    const rejectionReason = String(body.rejectionReason ?? "").trim();

    if (!listingId || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const { data: listing, error: fetchError } = await supabase
      .from("business_listings")
      .select("id, user_id, business_name, public_username, slug, status, payment_status, certificate_id")
      .eq("id", listingId)
      .single();

    if (fetchError || !listing) {
      return NextResponse.json(
        { success: false, error: "Listing not found." },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();
    let updatePayload: Record<string, unknown>;

    if (action === "approve") {
      if (listing.payment_status !== "paid") {
        return NextResponse.json(
          { success: false, error: "Cannot approve before payment is completed." },
          { status: 400 }
        );
      }

      const certificateId = listing.certificate_id || (await createUniqueCertificateId());
      const desiredUsername = normalizeBusinessUsername(
        listing.public_username || listing.slug || listing.business_name
      );
      const publicUsername = await ensureUniquePublicUsername(desiredUsername, listing.id);
      updatePayload = {
        status: "approved",
        rejection_reason: null,
        approved_at: now,
        published_at: now,
        certificate_id: certificateId,
        public_username: publicUsername,
      };
    } else {
      updatePayload = {
        status: "rejected",
        rejection_reason:
          rejectionReason || "Please update listing details and submit again for review.",
        approved_at: null,
        published_at: null,
        certificate_id: null,
      };
    }

    const { data: updated, error: updateError } = await supabase
      .from("business_listings")
      .update(updatePayload)
      .eq("id", listingId)
      .select(
        "id, user_id, business_name, public_username, slug, category, title, details, city, address, phone, website, whatsapp, logo_url, status, payment_status, verification_fee, verification_gst, verification_total, certificate_id, rejection_reason, approved_at, published_at, created_at, updated_at"
      )
      .single();

    if (updateError || !updated) {
      console.error("ADMIN BUSINESS LISTINGS UPDATE ERROR:", updateError);
      return NextResponse.json(
        { success: false, error: "Failed to update listing." },
        { status: 500 }
      );
    }

    const withOwners = await withOwnerDetails([
      updated as unknown as Record<string, unknown>,
    ]);
    return NextResponse.json({ success: true, listing: withOwners[0] });
  } catch (error) {
    console.error("ADMIN BUSINESS LISTINGS PATCH ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
