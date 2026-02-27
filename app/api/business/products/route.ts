import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { BUSINESS_SESSION_COOKIE, readBusinessSessionToken } from "@/lib/business-auth";

type ProductPayload = {
  id?: string;
  listingId?: string;
  productName?: string;
  shortDescription?: string;
  fullDescription?: string;
  price?: number | string;
  currency?: string;
  imageUrl?: string;
  purchaseUrl?: string;
  ctaLabel?: string;
  isActive?: boolean;
  sortOrder?: number | string;
};

const PRODUCT_SELECT =
  "id, listing_id, user_id, product_name, short_description, full_description, price, currency, image_url, purchase_url, cta_label, is_active, sort_order, created_at, updated_at";

function getSession(req: NextRequest) {
  const token = req.cookies.get(BUSINESS_SESSION_COOKIE)?.value;
  return readBusinessSessionToken(token);
}

function text(value: unknown, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function numeric(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function getListingForUser(userId: string, listingId?: string) {
  let query = supabase
    .from("business_listings")
    .select("id, user_id, business_name, public_username, status, payment_status")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (listingId) {
    query = query.eq("id", listingId);
  }

  const { data } = await query.maybeSingle();
  return data;
}

export async function GET(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const listingId = text(req.nextUrl.searchParams.get("listingId"), 80);
    const listing = await getListingForUser(session.userId, listingId || undefined);

    if (!listing) {
      return NextResponse.json(
        { success: false, error: "Create your business listing first." },
        { status: 404 }
      );
    }

    const { data, error } = await supabase
      .from("business_products")
      .select(PRODUCT_SELECT)
      .eq("listing_id", listing.id)
      .eq("user_id", session.userId)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("BUSINESS PRODUCTS GET ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Could not fetch products." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      listing,
      products: data ?? [],
    });
  } catch (error) {
    console.error("BUSINESS PRODUCTS API GET ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as ProductPayload;
    const listingId = text(body.listingId, 80);
    const listing = await getListingForUser(session.userId, listingId || undefined);

    if (!listing) {
      return NextResponse.json(
        { success: false, error: "Create your listing first." },
        { status: 404 }
      );
    }

    const productName = text(body.productName, 140);
    const shortDescription = text(body.shortDescription, 240);
    const fullDescription = text(body.fullDescription, 4000);
    const price = Math.max(0, Number(numeric(body.price).toFixed(2)));
    const currency = text(body.currency, 10).toUpperCase() || "INR";
    const imageUrl = text(body.imageUrl, 1000);
    const purchaseUrl = text(body.purchaseUrl, 1000);
    const ctaLabel = text(body.ctaLabel, 40) || "Enquire Now";
    const isActive = Boolean(body.isActive ?? true);
    const sortOrder = Math.max(0, Math.floor(numeric(body.sortOrder)));

    if (!productName) {
      return NextResponse.json(
        { success: false, error: "Product name is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("business_products")
      .insert({
        listing_id: listing.id,
        user_id: session.userId,
        product_name: productName,
        short_description: shortDescription || null,
        full_description: fullDescription || null,
        price,
        currency,
        image_url: imageUrl || null,
        purchase_url: purchaseUrl || null,
        cta_label: ctaLabel,
        is_active: isActive,
        sort_order: sortOrder,
      })
      .select(PRODUCT_SELECT)
      .single();

    if (error || !data) {
      console.error("BUSINESS PRODUCTS INSERT ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Could not add product." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, product: data });
  } catch (error) {
    console.error("BUSINESS PRODUCTS API POST ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as ProductPayload;
    const productId = text(body.id, 80);

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Product id is required." },
        { status: 400 }
      );
    }

    const productName = text(body.productName, 140);
    const shortDescription = text(body.shortDescription, 240);
    const fullDescription = text(body.fullDescription, 4000);
    const price = Math.max(0, Number(numeric(body.price).toFixed(2)));
    const currency = text(body.currency, 10).toUpperCase() || "INR";
    const imageUrl = text(body.imageUrl, 1000);
    const purchaseUrl = text(body.purchaseUrl, 1000);
    const ctaLabel = text(body.ctaLabel, 40) || "Enquire Now";
    const isActive = Boolean(body.isActive ?? true);
    const sortOrder = Math.max(0, Math.floor(numeric(body.sortOrder)));

    if (!productName) {
      return NextResponse.json(
        { success: false, error: "Product name is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("business_products")
      .update({
        product_name: productName,
        short_description: shortDescription || null,
        full_description: fullDescription || null,
        price,
        currency,
        image_url: imageUrl || null,
        purchase_url: purchaseUrl || null,
        cta_label: ctaLabel,
        is_active: isActive,
        sort_order: sortOrder,
      })
      .eq("id", productId)
      .eq("user_id", session.userId)
      .select(PRODUCT_SELECT)
      .single();

    if (error || !data) {
      console.error("BUSINESS PRODUCTS UPDATE ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Could not update product." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, product: data });
  } catch (error) {
    console.error("BUSINESS PRODUCTS API PATCH ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as ProductPayload;
    const productId = text(body.id, 80);

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Product id is required." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("business_products")
      .delete()
      .eq("id", productId)
      .eq("user_id", session.userId);

    if (error) {
      console.error("BUSINESS PRODUCTS DELETE ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Could not delete product." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("BUSINESS PRODUCTS API DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
