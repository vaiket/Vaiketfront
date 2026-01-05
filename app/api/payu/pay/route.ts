import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/src/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, amount, plan } = await req.json();

    if (!name || !email || !phone || !amount || !plan) {
      return NextResponse.json(
        { error: true, message: "Missing fields" },
        { status: 400 }
      );
    }

    const key = process.env.PAYU_KEY!;
    const salt = process.env.PAYU_SALT!;
    const gateway = process.env.PAYU_GATEWAY_URL!;
    const surl = process.env.PAYU_SUCCESS_URL!;
    const furl = process.env.PAYU_FAILURE_URL!;

    const txnid = "TXN" + Date.now();
    const productinfo = plan;

    // Generate hash
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${name}|${email}|||||||||||${salt}`;
    const hash = crypto
      .createHash("sha512")
      .update(hashString)
      .digest("hex");

    // Save initial payment
    await supabaseAdmin.from("payments").insert({
      name,
      email,
      phone,
      plan,
      amount,
      payment_type: "PAYU",
      payment_status: "PENDING",
      txnid,
    });

    return NextResponse.json({
      actionUrl: gateway,
      params: {
        key,
        txnid,
        amount,
        productinfo,
        firstname: name,
        email,
        phone,
        surl,
        furl,
        hash,
      },
    });
  } catch (err) {
    console.error("PayU API Error:", err);
    return NextResponse.json(
      { error: true, message: "Payment init failed" },
      { status: 500 }
    );
  }
}
