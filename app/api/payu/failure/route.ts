import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const txnid = data.get("txnid") as string;
    const status = data.get("status") as string;

    if (txnid) {
      await supabaseAdmin
        .from("payments")
        .update({
          payment_status: status || "FAILED",
        })
        .eq("txnid", txnid);
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`
    );
  } catch (error) {
    console.error("PayU Failure Error:", error);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`
    );
  }
}
