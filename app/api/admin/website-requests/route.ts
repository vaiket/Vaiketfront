import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ADMIN_SESSION_COOKIE, readAdminSessionToken } from "@/lib/admin-auth";

const ALLOWED_REQUEST_STATUSES = [
  "new",
  "pending",
  "in_progress",
  "success",
  "failed",
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
    const plan = req.nextUrl.searchParams.get("plan") ?? "";

    let query = supabase
      .from("website_requests")
      .select(
        "id, request_no, lead_id, plan, customer_name, customer_email, customer_phone, business_name, website_status, goals, add_ons, pages_needed, notes, base_price, add_on_amount, subtotal, gst, total, currency, latest_order_id, status, created_at, updated_at"
      )
      .order("created_at", { ascending: false })
      .limit(500);

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (plan && plan !== "all") {
      query = query.eq("plan", plan);
    }

    if (search) {
      query = query.or(
        `request_no.ilike.%${search}%,customer_name.ilike.%${search}%,customer_email.ilike.%${search}%,customer_phone.ilike.%${search}%,business_name.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("ADMIN WEBSITE REQUESTS FETCH ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch website requests" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, requests: data ?? [] });
  } catch (error) {
    console.error("ADMIN WEBSITE REQUESTS GET ERROR:", error);
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

    const body = await req.json();
    const requestId = String(body.requestId ?? "").trim();
    const status = String(body.status ?? "").trim();

    if (
      !requestId ||
      !ALLOWED_REQUEST_STATUSES.includes(status as (typeof ALLOWED_REQUEST_STATUSES)[number])
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("website_requests")
      .update({ status })
      .eq("id", requestId)
      .select(
        "id, request_no, lead_id, plan, customer_name, customer_email, customer_phone, business_name, website_status, goals, add_ons, pages_needed, notes, base_price, add_on_amount, subtotal, gst, total, currency, latest_order_id, status, created_at, updated_at"
      )
      .single();

    if (error || !data) {
      console.error("ADMIN WEBSITE REQUESTS UPDATE ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Failed to update request status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, request: data });
  } catch (error) {
    console.error("ADMIN WEBSITE REQUESTS PATCH ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
