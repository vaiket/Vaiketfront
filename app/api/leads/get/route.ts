import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { lead_id } = await req.json();

  const { data, error } = await supabase
    .from("leads")
    .select("name, email, phone")
    .eq("id", lead_id)
    .single();

  if (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    lead: data,
  });
}
