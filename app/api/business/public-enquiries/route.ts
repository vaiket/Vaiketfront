import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { normalizeBusinessUsername } from "@/lib/business-identity";

type Payload = {
  listingId?: string;
  publicUsername?: string;
  serviceName?: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

function cleanText(value: unknown, max = 400) {
  return String(value ?? "").trim().slice(0, max);
}

function cleanEmail(value: unknown) {
  const email = cleanText(value, 160).toLowerCase();
  if (!email) return "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Payload;
    const listingId = cleanText(body.listingId, 80);
    const publicUsername = normalizeBusinessUsername(cleanText(body.publicUsername, 80));
    const serviceName = cleanText(body.serviceName, 140);
    const name = cleanText(body.name, 120);
    const phone = cleanText(body.phone, 32);
    const email = cleanEmail(body.email);
    const message = cleanText(body.message, 1200);

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required." },
        { status: 400 }
      );
    }

    if (!listingId && !publicUsername) {
      return NextResponse.json(
        { success: false, error: "Invalid business reference." },
        { status: 400 }
      );
    }

    let listingQuery = supabase
      .from("business_listings")
      .select("id, public_username")
      .eq("status", "approved")
      .eq("payment_status", "paid")
      .limit(1);

    if (listingId) {
      listingQuery = listingQuery.eq("id", listingId);
    } else {
      listingQuery = listingQuery.ilike("public_username", publicUsername);
    }

    const { data: listing, error: listingError } = await listingQuery.maybeSingle();
    if (listingError || !listing) {
      return NextResponse.json(
        { success: false, error: "Business listing not found." },
        { status: 404 }
      );
    }

    const { data, error } = await supabase
      .from("business_enquiries")
      .insert({
        listing_id: listing.id,
        public_username: listing.public_username,
        service_name: serviceName || null,
        customer_name: name,
        customer_phone: phone,
        customer_email: email || null,
        message: message || null,
        status: "new",
        source: "public_profile",
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error("PUBLIC BUSINESS ENQUIRY INSERT ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Could not submit enquiry." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, enquiryId: data.id });
  } catch (error) {
    console.error("PUBLIC BUSINESS ENQUIRY ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Could not submit enquiry." },
      { status: 500 }
    );
  }
}
