import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ADMIN_SESSION_COOKIE, readAdminSessionToken } from "@/lib/admin-auth";

const ALLOWED_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "proposal_sent",
  "won",
  "lost",
  "paid",
] as const;

function isAuthorized(req: NextRequest) {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return Boolean(readAdminSessionToken(token));
}

function escapeForIlike(value: string) {
  return value.replace(/[%_,]/g, " ").trim();
}

export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const search = escapeForIlike(req.nextUrl.searchParams.get("q") ?? "");
    const status = req.nextUrl.searchParams.get("status") ?? "";

    let query = supabase
      .from("leads")
      .select(
        "id, name, email, phone, websitestatus, goals, channels, source, status, created_at, updated_at"
      )
      .order("created_at", { ascending: false })
      .limit(500);

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("ADMIN LEADS FETCH ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch leads" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, leads: data ?? [] });
  } catch (error) {
    console.error("ADMIN LEADS GET ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { leadId, status } = await req.json();

    if (!leadId || !status || !ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", String(leadId))
      .select(
        "id, name, email, phone, websitestatus, goals, channels, source, status, created_at, updated_at"
      )
      .single();

    if (error) {
      console.error("ADMIN LEADS UPDATE ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Failed to update lead" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, lead: data });
  } catch (error) {
    console.error("ADMIN LEADS PATCH ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
