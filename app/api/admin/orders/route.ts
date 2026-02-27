import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ADMIN_SESSION_COOKIE, readAdminSessionToken } from "@/lib/admin-auth";

const ALLOWED_ORDER_STATUSES = [
  "initiated",
  "pending",
  "paid",
  "failed",
  "cancelled",
] as const;

function isAuthorized(req: NextRequest) {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return Boolean(readAdminSessionToken(token));
}

function escapeForIlike(value: string) {
  return value.replace(/[%_,]/g, " ").trim();
}

function mapRequestStatus(orderStatus: string) {
  if (orderStatus === "paid") return "success";
  if (orderStatus === "failed" || orderStatus === "cancelled") return "failed";
  return "pending";
}

export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const search = escapeForIlike(req.nextUrl.searchParams.get("q") ?? "");
    const status = req.nextUrl.searchParams.get("status") ?? "";
    const orderType = req.nextUrl.searchParams.get("order_type") ?? "";

    let query = supabase
      .from("orders")
      .select(
        "id, order_no, request_id, order_type, plan, customer_name, customer_email, customer_phone, lead_id, services, subtotal, gst, total, status, razorpay_order_id, razorpay_payment_id, failure_reason, created_at, paid_at"
      )
      .order("created_at", { ascending: false })
      .limit(500);

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (orderType && orderType !== "all") {
      query = query.eq("order_type", orderType);
    }

    if (search) {
      query = query.or(
        `order_no.ilike.%${search}%,customer_name.ilike.%${search}%,customer_email.ilike.%${search}%,customer_phone.ilike.%${search}%,razorpay_order_id.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("ADMIN ORDERS FETCH ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch orders" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, orders: data ?? [] });
  } catch (error) {
    console.error("ADMIN ORDERS GET ERROR:", error);
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
    const orderId = String(body.orderId ?? "").trim();
    const status = String(body.status ?? "").trim();
    const reason = String(body.reason ?? "").trim();

    if (!orderId || !ALLOWED_ORDER_STATUSES.includes(status as (typeof ALLOWED_ORDER_STATUSES)[number])) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const updatePayload: Record<string, unknown> = { status };
    if (status === "failed" || status === "cancelled") {
      updatePayload.failure_reason = reason || "Updated from admin panel";
    }
    if (status === "paid") {
      updatePayload.paid_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("orders")
      .update(updatePayload)
      .eq("id", orderId)
      .select(
        "id, order_no, request_id, order_type, plan, customer_name, customer_email, customer_phone, lead_id, services, subtotal, gst, total, status, razorpay_order_id, razorpay_payment_id, failure_reason, created_at, paid_at"
      )
      .single();

    if (error || !data) {
      console.error("ADMIN ORDER UPDATE ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Failed to update order" },
        { status: 500 }
      );
    }

    if (data.request_id) {
      await supabase
        .from("website_requests")
        .update({ status: mapRequestStatus(status), latest_order_id: data.id })
        .eq("id", data.request_id);
    }

    if (data.lead_id && status === "paid") {
      await supabase
        .from("leads")
        .update({ status: "paid" })
        .eq("id", data.lead_id);
    }

    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    console.error("ADMIN ORDERS PATCH ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
