import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const {
    order_id,
    razorpay_order_id,
    razorpay_payment_id,
  } = await req.json();

  // Update order
  await supabase
    .from("orders")
    .update({ status: "paid" })
    .eq("id", order_id);

  // Update lead
  const { data } = await supabase
    .from("orders")
    .select("lead_id, total")
    .eq("id", order_id)
    .single();

  if (data) {
    await supabase
      .from("lead")
      .update({ status: "paid" })
      .eq("id", data.lead_id);

    await supabase.from("payments").insert({
      id: randomUUID(),
      lead_id: data.lead_id,
      razorpay_order_id,
      razorpay_payment_id,
      amount: data.total,
      status: "paid",
    });
  }

  return NextResponse.json({ success: true });
}
