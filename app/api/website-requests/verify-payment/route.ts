import crypto from "crypto";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type VerifyPayload = {
  order_id?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as VerifyPayload;
    const orderId = String(body.order_id ?? "").trim();
    const razorpayOrderId = String(body.razorpay_order_id ?? "").trim();
    const razorpayPaymentId = String(body.razorpay_payment_id ?? "").trim();
    const razorpaySignature = String(body.razorpay_signature ?? "").trim();

    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { success: false, error: "Missing payment verification fields." },
        { status: 400 }
      );
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, error: "Payment verification is not configured." },
        { status: 500 }
      );
    }

    const bodyToSign = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(bodyToSign)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature." },
        { status: 400 }
      );
    }

    const { data: order, error: orderFetchError } = await supabase
      .from("orders")
      .select(
        "id, order_no, request_id, lead_id, order_type, plan, customer_name, customer_email, customer_phone, total, status, razorpay_order_id"
      )
      .eq("id", orderId)
      .single();

    if (orderFetchError || !order) {
      console.error("WEBSITE VERIFY ORDER FETCH ERROR:", orderFetchError);
      return NextResponse.json(
        { success: false, error: "Order not found." },
        { status: 404 }
      );
    }

    if (order.order_type !== "website") {
      return NextResponse.json(
        { success: false, error: "Invalid order type for this flow." },
        { status: 400 }
      );
    }

    if (order.razorpay_order_id !== razorpayOrderId) {
      return NextResponse.json(
        { success: false, error: "Order reference mismatch." },
        { status: 400 }
      );
    }

    if (order.status === "paid") {
      return NextResponse.json({
        success: true,
        order_no: order.order_no,
        request_id: order.request_id,
      });
    }

    const paidAt = new Date().toISOString();
    const { error: orderUpdateError } = await supabase
      .from("orders")
      .update({
        status: "paid",
        razorpay_payment_id: razorpayPaymentId,
        paid_at: paidAt,
      })
      .eq("id", order.id);

    if (orderUpdateError) {
      console.error("WEBSITE VERIFY ORDER UPDATE ERROR:", orderUpdateError);
      return NextResponse.json(
        { success: false, error: "Failed to update order status." },
        { status: 500 }
      );
    }

    const totalAmount = Number(order.total ?? 0);

    const { error: paymentError } = await supabase.from("payments").upsert(
      {
        order_id: order.id,
        order_no: order.order_no,
        lead_id: order.lead_id,
        name: order.customer_name,
        email: order.customer_email,
        phone: order.customer_phone,
        plan: order.plan,
        payment_type: "razorpay",
        payment_status: "captured",
        status: "paid",
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        amount: totalAmount,
        currency: "INR",
        paid_at: paidAt,
      },
      { onConflict: "order_id" }
    );

    if (paymentError) {
      console.error("WEBSITE VERIFY PAYMENT UPSERT ERROR:", paymentError);
      return NextResponse.json(
        { success: false, error: "Failed to save payment." },
        { status: 500 }
      );
    }

    if (order.request_id) {
      const { error: requestUpdateError } = await supabase
        .from("website_requests")
        .update({
          latest_order_id: order.id,
          status: "success",
        })
        .eq("id", order.request_id);

      if (requestUpdateError) {
        console.error("WEBSITE VERIFY REQUEST UPDATE ERROR:", requestUpdateError);
      }
    }

    if (order.lead_id) {
      const { error: leadUpdateError } = await supabase
        .from("leads")
        .update({ status: "paid" })
        .eq("id", order.lead_id);

      if (leadUpdateError) {
        console.error("WEBSITE VERIFY LEAD UPDATE ERROR:", leadUpdateError);
      }
    }

    return NextResponse.json({
      success: true,
      order_no: order.order_no,
      request_id: order.request_id,
    });
  } catch (error) {
    console.error("WEBSITE VERIFY PAYMENT ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unable to verify payment." },
      { status: 500 }
    );
  }
}
