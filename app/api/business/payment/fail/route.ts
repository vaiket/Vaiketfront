import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { BUSINESS_SESSION_COOKIE, readBusinessSessionToken } from "@/lib/business-auth";

type Payload = {
  listingId?: string;
  razorpay_order_id?: string;
  reason?: string;
};

function isAuthorized(req: NextRequest) {
  const token = req.cookies.get(BUSINESS_SESSION_COOKIE)?.value;
  return readBusinessSessionToken(token);
}

export async function POST(req: NextRequest) {
  try {
    const session = isAuthorized(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as Payload;
    const listingId = String(body.listingId ?? "").trim();
    const razorpayOrderId = String(body.razorpay_order_id ?? "").trim();
    const reason = String(body.reason ?? "").trim();

    if (!listingId || !razorpayOrderId) {
      return NextResponse.json(
        { success: false, error: "Missing listing/payment reference." },
        { status: 400 }
      );
    }

    await supabase
      .from("business_listing_payments")
      .update({
        status: "failed",
        failure_reason: reason || "Payment dismissed/failed by user",
      })
      .eq("listing_id", listingId)
      .eq("user_id", session.userId)
      .eq("razorpay_order_id", razorpayOrderId);

    await supabase
      .from("business_listings")
      .update({ payment_status: "failed" })
      .eq("id", listingId)
      .eq("user_id", session.userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("BUSINESS PAYMENT FAIL ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unable to update payment failure state." },
      { status: 500 }
    );
  }
}
