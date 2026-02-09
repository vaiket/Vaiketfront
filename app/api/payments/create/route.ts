import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const { order_id } = await req.json();

  // 1. Get order from DB
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", order_id)
    .single();

  if (!order || error) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 400 }
    );
  }

  // 2. Create Razorpay order
  const rpOrder = await razorpay.orders.create({
    amount: order.total * 100, // paise
    currency: "INR",
    receipt: order_id,
  });

  return NextResponse.json({
    razorpayOrderId: rpOrder.id,
    amount: order.total,
    currency: "INR",
  });
}
