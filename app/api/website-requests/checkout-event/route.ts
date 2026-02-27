import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type CheckoutEventPayload = {
  order_id?: string;
  event?: "dismissed" | "failed";
  reason?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CheckoutEventPayload;
    const orderId = String(body.order_id ?? "").trim();
    const event = body.event;
    const reason = String(body.reason ?? "").trim();

    if (!orderId || !event || !["dismissed", "failed"].includes(event)) {
      return NextResponse.json(
        { success: false, error: "Invalid checkout event payload." },
        { status: 400 }
      );
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, request_id, order_type, status")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { success: false, error: "Order not found." },
        { status: 404 }
      );
    }

    if (order.order_type !== "website") {
      return NextResponse.json(
        { success: false, error: "Invalid order type for this endpoint." },
        { status: 400 }
      );
    }

    if (order.status === "paid") {
      return NextResponse.json({ success: true });
    }

    const orderStatus = event === "failed" ? "failed" : "pending";
    const requestStatus = event === "failed" ? "failed" : "pending";

    const { error: updateOrderError } = await supabase
      .from("orders")
      .update({
        status: orderStatus,
        failure_reason: reason || (event === "failed" ? "Payment failed" : "Checkout dismissed"),
      })
      .eq("id", order.id);

    if (updateOrderError) {
      console.error("WEBSITE CHECKOUT EVENT ORDER UPDATE ERROR:", updateOrderError);
      return NextResponse.json(
        { success: false, error: "Failed to update order status." },
        { status: 500 }
      );
    }

    if (order.request_id) {
      const { error: updateRequestError } = await supabase
        .from("website_requests")
        .update({ status: requestStatus })
        .eq("id", order.request_id);

      if (updateRequestError) {
        console.error("WEBSITE CHECKOUT EVENT REQUEST UPDATE ERROR:", updateRequestError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("WEBSITE CHECKOUT EVENT ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Could not process checkout event." },
      { status: 500 }
    );
  }
}
