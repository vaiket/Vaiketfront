import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

/* ================= SUPABASE ================= */
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ================= WEBHOOK ================= */
export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    /* ---------- VERIFY SIGNATURE ---------- */
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Webhook signature mismatch");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(body);
    const event = payload.event;
    const payment = payload.payload.payment.entity;

    const razorpay_payment_id = payment.id;
    const razorpay_order_id = payment.order_id;
    const amount = payment.amount; // paise
    const status = payment.status; // captured / failed

    /* ---------- FIND ORDER ---------- */
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("razorpay_order_id", razorpay_order_id)
      .single();

    if (orderError || !order) {
      console.error("Order not found for webhook:", razorpay_order_id);
      return NextResponse.json({ success: false }, { status: 404 });
    }

    /* ================= PAYMENT SUCCESS ================= */
    if (event === "payment.captured") {
      // update order
      await supabase
        .from("orders")
        .update({
          status: "paid",
          razorpay_payment_id,
          paid_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      // upsert payment
      await supabase
        .from("payments")
        .upsert(
          {
            order_id: order.id,
            lead_id: order.lead_id,
            razorpay_order_id,
            razorpay_payment_id,
            amount,
            currency: "INR",
            status: "paid",
            paid_at: new Date().toISOString(),
          },
          { onConflict: "order_id" }
        );

      // update lead
      if (order.lead_id) {
        await supabase
          .from("leads")
          .update({ status: "paid" })
          .eq("id", order.lead_id);
      }
    }

    /* ================= PAYMENT FAILED ================= */
    if (event === "payment.failed") {
      await supabase
        .from("orders")
        .update({ status: "failed" })
        .eq("id", order.id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
