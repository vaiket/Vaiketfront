import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/src/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const txnid = data.get("txnid") as string;
    const amount = data.get("amount") as string;
    const status = data.get("status") as string;
    const email = data.get("email") as string;
    const firstname = data.get("firstname") as string;
    const productinfo = data.get("productinfo") as string;
    const receivedHash = data.get("hash") as string;

    const key = process.env.PAYU_KEY!;
    const salt = process.env.PAYU_SALT!;

    const hashString =
      `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;

    const generatedHash = crypto
      .createHash("sha512")
      .update(hashString)
      .digest("hex");

    if (generatedHash !== receivedHash) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`
      );
    }

    // Update payment
    await supabaseAdmin
      .from("payments")
      .update({ payment_status: status })
      .eq("txnid", txnid);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?txnid=${txnid}`
    );
  } catch (err) {
    console.error("PayU success error:", err);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`
    );
  }
}
