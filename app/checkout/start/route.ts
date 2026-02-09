import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { lead_id, services, subtotal, gst, total } =
    await req.json();

  const orderId = randomUUID();

  const { error } = await supabase.from("orders").insert({
    id: orderId,
    lead_id,
    services,
    subtotal,
    gst,
    total,
    status: "initiated",
  });

  if (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    order_id: orderId,
  });
}
