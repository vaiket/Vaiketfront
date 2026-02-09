import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { lead_id, status } = await req.json();

    if (!lead_id || !status) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    await supabase
      .from("lead")
      .update({ status })
      .eq("id", lead_id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
