import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { BUSINESS_SESSION_COOKIE, readBusinessSessionToken } from "@/lib/business-auth";
import {
  BUSINESS_REFERRAL_COMMISSION_RATE,
  BUSINESS_REFERRAL_CURRENCY,
  calculateReferralCommission,
} from "@/lib/business-referral";

type Payload = {
  listingId?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

function isAuthorized(req: NextRequest) {
  const token = req.cookies.get(BUSINESS_SESSION_COOKIE)?.value;
  return readBusinessSessionToken(token);
}

async function processReferralCommission({
  referredUserId,
  listingId,
  paymentId,
  orderNo,
  amount,
  currency,
}: {
  referredUserId: string;
  listingId: string;
  paymentId: string;
  orderNo: string | null;
  amount: number;
  currency: string;
}) {
  const { data: referredUser, error: referredUserError } = await supabase
    .from("business_users")
    .select("id, referred_by_user_id, referred_by_code")
    .eq("id", referredUserId)
    .maybeSingle();

  if (referredUserError || !referredUser?.referred_by_user_id) {
    return;
  }

  const referrerUserId = String(referredUser.referred_by_user_id);
  if (!referrerUserId || referrerUserId === referredUserId) {
    return;
  }

  const { data: existingEarning } = await supabase
    .from("business_referral_earnings")
    .select("id")
    .eq("referred_user_id", referredUserId)
    .maybeSingle();

  if (existingEarning?.id) {
    return;
  }

  const { data: referrerListing } = await supabase
    .from("business_listings")
    .select("id")
    .eq("user_id", referrerUserId)
    .eq("status", "approved")
    .eq("payment_status", "paid")
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!referrerListing) {
    return;
  }

  const commissionAmount = calculateReferralCommission(amount);
  if (commissionAmount <= 0) {
    return;
  }

  const { error: insertError } = await supabase.from("business_referral_earnings").insert({
    referrer_user_id: referrerUserId,
    referred_user_id: referredUserId,
    referred_listing_id: listingId,
    referred_payment_id: paymentId,
    referred_order_no: orderNo,
    commission_rate: BUSINESS_REFERRAL_COMMISSION_RATE,
    commission_amount: commissionAmount,
    currency: currency || BUSINESS_REFERRAL_CURRENCY,
    status: "credited",
    note: "Commission credited after successful referral payment.",
    credited_at: new Date().toISOString(),
  });

  if (insertError && insertError.code !== "23505") {
    console.error("BUSINESS REFERRAL COMMISSION INSERT ERROR:", insertError);
  }
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
    const razorpayPaymentId = String(body.razorpay_payment_id ?? "").trim();
    const razorpaySignature = String(body.razorpay_signature ?? "").trim();

    if (!listingId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { success: false, error: "Missing payment fields." },
        { status: 400 }
      );
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, error: "Payment verification is not configured." },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature." },
        { status: 400 }
      );
    }

    const { data: payment, error: paymentError } = await supabase
      .from("business_listing_payments")
      .select("id, listing_id, user_id, order_no, status, amount, currency")
      .eq("razorpay_order_id", razorpayOrderId)
      .eq("listing_id", listingId)
      .eq("user_id", session.userId)
      .single();

    if (paymentError || !payment) {
      return NextResponse.json(
        { success: false, error: "Payment request not found." },
        { status: 404 }
      );
    }

    if (payment.status === "paid") {
      await processReferralCommission({
        referredUserId: payment.user_id,
        listingId: payment.listing_id,
        paymentId: payment.id,
        orderNo: payment.order_no ?? null,
        amount: Number(payment.amount ?? 0),
        currency: String(payment.currency ?? BUSINESS_REFERRAL_CURRENCY),
      });

      return NextResponse.json({
        success: true,
        order_no: payment.order_no,
      });
    }

    await supabase
      .from("business_listing_payments")
      .update({
        status: "paid",
        razorpay_payment_id: razorpayPaymentId,
        paid_at: new Date().toISOString(),
      })
      .eq("id", payment.id);

    await supabase
      .from("business_listings")
      .update({
        payment_status: "paid",
        status: "pending_review",
      })
      .eq("id", listingId)
      .eq("user_id", session.userId);

    await processReferralCommission({
      referredUserId: payment.user_id,
      listingId: payment.listing_id,
      paymentId: payment.id,
      orderNo: payment.order_no ?? null,
      amount: Number(payment.amount ?? 0),
      currency: String(payment.currency ?? BUSINESS_REFERRAL_CURRENCY),
    });

    return NextResponse.json({
      success: true,
      order_no: payment.order_no,
    });
  } catch (error) {
    console.error("BUSINESS PAYMENT VERIFY ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unable to verify payment." },
      { status: 500 }
    );
  }
}
