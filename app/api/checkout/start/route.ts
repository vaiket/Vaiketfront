import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";

/* ================= SUPABASE (SERVICE ROLE) ================= */
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ================= RAZORPAY ================= */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,       // 👈 SERVER KEY
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

/* ================= POST ================= */
export async function POST(req: Request) {
  try {
    console.log("CHECKOUT START HIT");

    const { lead_id, services, subtotal, gst, total } = await req.json();

    /* ---------- VALIDATION ---------- */
    if (!lead_id || !services || !total) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    /* ---------- CREATE INTERNAL ORDER ID ---------- */
    const order_id = randomUUID();

    /* ---------- CREATE RAZORPAY ORDER ---------- */
    const rpOrder = await razorpay.orders.create({
      amount: total * 100, // paise
      currency: "INR",
      receipt: order_id,
    });

    console.log("RAZORPAY ORDER CREATED:", rpOrder.id);

    /* ---------- SAVE ORDER IN DB ---------- */
    const { error } = await supabase.from("orders").insert({
      id: order_id,
      lead_id,
      services,
      subtotal,
      gst,
      total,
      status: "initiated",
      razorpay_order_id: rpOrder.id,
    });

    if (error) {
      console.error("ORDER INSERT ERROR:", error);
      return NextResponse.json(
        { success: false, error: "DB insert failed" },
        { status: 500 }
      );
    }

    /* ---------- RESPONSE TO FRONTEND ---------- */
    return NextResponse.json({
      success: true,
      order_id,                     // internal DB order id (UUID)
      razorpay_order_id: rpOrder.id, // Razorpay order id
      amount: rpOrder.amount,        // paise
    });
  } catch (err) {
    console.error("CHECKOUT START ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
