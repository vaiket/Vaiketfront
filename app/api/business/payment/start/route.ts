import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase";
import { BUSINESS_SESSION_COOKIE, readBusinessSessionToken } from "@/lib/business-auth";
import {
  BUSINESS_VERIFICATION_TOTAL,
  BUSINESS_VERIFICATION_TOTAL_PAISE,
  createBusinessPaymentOrderNo,
} from "@/lib/business-identity";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ?? "",
  key_secret: process.env.RAZORPAY_KEY_SECRET ?? "",
});

type Payload = {
  listingId?: string;
};

function isAuthorized(req: NextRequest) {
  const token = req.cookies.get(BUSINESS_SESSION_COOKIE)?.value;
  return readBusinessSessionToken(token);
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, error: "Razorpay is not configured." },
        { status: 500 }
      );
    }

    const session = isAuthorized(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as Payload;
    const listingId = String(body.listingId ?? "").trim();
    if (!listingId) {
      return NextResponse.json(
        { success: false, error: "Listing id is required." },
        { status: 400 }
      );
    }

    const { data: listing, error: listingError } = await supabase
      .from("business_listings")
      .select("id, user_id, business_name, status, payment_status")
      .eq("id", listingId)
      .eq("user_id", session.userId)
      .single();

    if (listingError || !listing) {
      return NextResponse.json(
        { success: false, error: "Listing not found." },
        { status: 404 }
      );
    }

    if (listing.payment_status === "paid") {
      return NextResponse.json(
        { success: false, error: "Verification fee already paid for this listing." },
        { status: 400 }
      );
    }

    const orderNo = createBusinessPaymentOrderNo();
    const rpOrder = await razorpay.orders.create({
      amount: BUSINESS_VERIFICATION_TOTAL_PAISE,
      currency: "INR",
      receipt: orderNo,
      notes: {
        listing_id: listing.id,
        business_name: listing.business_name,
      },
    });

    const { error: paymentInsertError } = await supabase
      .from("business_listing_payments")
      .insert({
        listing_id: listing.id,
        user_id: session.userId,
        order_no: orderNo,
        razorpay_order_id: rpOrder.id,
        status: "initiated",
        amount: BUSINESS_VERIFICATION_TOTAL,
        currency: "INR",
      });

    if (paymentInsertError) {
      console.error("BUSINESS PAYMENT INSERT ERROR:", paymentInsertError);
      return NextResponse.json(
        { success: false, error: "Could not create payment request." },
        { status: 500 }
      );
    }

    await supabase
      .from("business_listings")
      .update({ payment_status: "pending" })
      .eq("id", listing.id);

    return NextResponse.json({
      success: true,
      listing_id: listing.id,
      order_no: orderNo,
      razorpay_order_id: rpOrder.id,
      amount: rpOrder.amount,
      currency: rpOrder.currency,
    });
  } catch (error) {
    console.error("BUSINESS PAYMENT START ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unable to start payment." },
      { status: 500 }
    );
  }
}
