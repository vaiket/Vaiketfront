import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { order_id, reason } = await req.json();

    if (!order_id) {
      return NextResponse.json(
        { success: false, error: "order_id missing" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("orders")
      .update({
        status: "failed",
        failure_reason: reason || "Payment failed",
      })
      .eq("id", order_id);

    if (error) {
      console.error("Failed update error:", error);
      return NextResponse.json(
        { success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
