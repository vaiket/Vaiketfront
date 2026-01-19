import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { txnid, status, hash, email, amount } = body;

  const key = process.env.PAYU_KEY!;
  const salt = process.env.PAYU_SALT!;

  // Hash sequence for success verification
  const verifyString = `${salt}|${status}|||||||||||${email}|${amount}|${txnid}|${key}`;
  const expectedHash = crypto.createHash("sha512").update(verifyString).digest("hex");

  if (expectedHash !== hash) {
    console.error("Hash mismatch!");
    return NextResponse.json({ success: false });
  }

  // Update DB to SUCCESS
  await supabase
    .from("payments")
    .update({ status: "SUCCESS" })
    .eq("txnid", txnid);

  return NextResponse.json({ success: true });
}
