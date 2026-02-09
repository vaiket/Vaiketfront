import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { order_id } = await req.json();

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, lead_id, services, subtotal, gst, total, status"
    )
    .eq("id", order_id)
    .single();

  if (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    order: data,
  });
}
