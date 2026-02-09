import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      websiteStatus,
      goals,
      channels,
    } = body;

    if (!name || !email || !phone || !websiteStatus) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const leadId = randomUUID();

    const { error } = await supabase.from("lead").insert({
      id: leadId,
      name,
      email,
      phone,
      websitestatus: websiteStatus,
      goals,
      channels,
      source: "get-started",
      status: "new",
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead_id: leadId,
    });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
