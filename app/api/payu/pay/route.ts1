import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/src/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, amount } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: true, message: "Missing customer details" },
        { status: 400 }
      );
    }

    const key = process.env.PAYU_KEY!;
    const salt = process.env.PAYU_SALT!;
    const gateway = process.env.PAYU_GATEWAY_URL!;
    const surl = process.env.PAYU_SUCCESS_URL!;
    const furl = process.env.PAYU_FAILURE_URL!;

    const txnid = "TXN" + Date.now();
    const productInfo = "Demo Product";

    const hashString = `${key}|${txnid}|${amount}|${productInfo}|${name}|${email}|||||||||||${salt}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    // Insert to Supabase
    const { error: dbError } = await supabaseAdmin.from("payments").insert({
      txnid,
      name,
      email,
      phone,
      amount,
      status: "PENDING",
    });

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: true, message: "Database insertion failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      actionUrl: gateway,
      params: {
        key,
        txnid,
        amount,
        firstname: name,
        email,
        phone,
        productinfo: productInfo,
        surl,
        furl,
        hash,
      },
    });
  } catch (err) {
    console.error("Payment API Error:", err);
    return NextResponse.json(
      { error: true, message: "Server crashed" },
      { status: 500 }
    );
  }
}
