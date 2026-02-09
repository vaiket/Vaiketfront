import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

/* ================= SUPABASE (SERVER ONLY) ================= */
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ================= GET (BLOCK / DEBUG) ================= */
export async function GET() {
  return NextResponse.json(
    { error: "Method GET not allowed. Use POST." },
    { status: 405 }
  );
}

/* ================= POST: VERIFY PAYMENT ================= */
export async function POST(req: Request) {
  try {
    const {
      order_id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    console.log("VERIFY REQUEST:", {
      order_id,
      razorpay_order_id,
      razorpay_payment_id,
    });

    /* ---------- BASIC VALIDATION ---------- */
    if (
      !order_id ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ---------- SIGNATURE VERIFICATION ---------- */
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    /* ---------- FETCH ORDER ---------- */
    const { data: order, error: orderFetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .single();

    if (orderFetchError || !order) {
      console.error("ORDER FETCH ERROR:", orderFetchError);
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    /* ---------- IDEMPOTENCY CHECK ---------- */
    if (order.status === "paid") {
      console.log("ORDER ALREADY PAID");
      return NextResponse.json({ success: true });
    }

    /* ---------- UPDATE ORDER ---------- */
    const { error: orderUpdateError } = await supabase
      .from("orders")
      .update({
        status: "paid",
        razorpay_payment_id,
        paid_at: new Date().toISOString(),
      })
      .eq("id", order_id);

    if (orderUpdateError) {
      console.error("ORDER UPDATE ERROR:", orderUpdateError);
      return NextResponse.json(
        { success: false, error: "Order update failed" },
        { status: 500 }
      );
    }

    /* ---------- UPSERT PAYMENT ---------- */
    const { error: paymentError } = await supabase
      .from("payments")
      .upsert(
        {
          order_id: order.id,
          lead_id: order.lead_id,
          razorpay_order_id,
          razorpay_payment_id,
          amount: order.total * 100, // paise
          currency: "INR",
          status: "paid",
          paid_at: new Date().toISOString(),
        },
        { onConflict: "order_id" }
      );

    if (paymentError) {
      console.error("PAYMENT UPSERT ERROR:", paymentError);
      return NextResponse.json(
        { success: false, error: "Payment save failed" },
        { status: 500 }
      );
    }

    /* ---------- UPDATE LEAD ---------- */
    if (order.lead_id) {
      await supabase
        .from("leads")
        .update({ status: "paid" })
        .eq("id", order.lead_id);
    }

    console.log("PAYMENT VERIFIED & SAVED");

    /* ---------- SUCCESS ---------- */
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("VERIFY API ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
