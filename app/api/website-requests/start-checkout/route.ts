import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase";
import {
  calculateWebsiteQuote,
  createOrderNo,
  createWebsiteRequestNo,
  isWebsitePlanId,
  sanitizeStringList,
  sanitizeWebsiteAddons,
  toPaise,
  WEBSITE_PLAN_CATALOG,
} from "@/lib/website-request";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ?? "",
  key_secret: process.env.RAZORPAY_KEY_SECRET ?? "",
});

type StartCheckoutPayload = {
  plan?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  businessName?: string;
  websiteStatus?: string;
  goals?: unknown;
  addOns?: unknown;
  pagesNeeded?: string;
  notes?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalize(value: unknown) {
  return String(value ?? "").trim();
}

export async function POST(req: Request) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, error: "Razorpay is not configured." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as StartCheckoutPayload;

    const planRaw = normalize(body.plan).toLowerCase();
    if (!isWebsitePlanId(planRaw)) {
      return NextResponse.json(
        { success: false, error: "Invalid website plan." },
        { status: 400 }
      );
    }

    const plan = planRaw;
    const planConfig = WEBSITE_PLAN_CATALOG[plan];
    if (!planConfig.paymentEnabled) {
      return NextResponse.json(
        { success: false, error: "This plan requires a custom quote." },
        { status: 400 }
      );
    }

    const customerName = normalize(body.customerName);
    const customerEmail = normalize(body.customerEmail).toLowerCase();
    const customerPhone = normalize(body.customerPhone);
    const businessName = normalize(body.businessName);
    const websiteStatus = normalize(body.websiteStatus);
    const pagesNeeded = normalize(body.pagesNeeded);
    const notes = normalize(body.notes);

    if (!customerName || !customerEmail || !customerPhone || !websiteStatus) {
      return NextResponse.json(
        { success: false, error: "Name, email, phone, and website status are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(customerEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (customerPhone.length < 8) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    const addOns = sanitizeWebsiteAddons(body.addOns);
    const goals = sanitizeStringList(body.goals, 8);
    const quote = calculateWebsiteQuote(plan, addOns);

    if (quote.total <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid quote amount." },
        { status: 400 }
      );
    }

    const leadId = randomUUID();
    const requestId = randomUUID();
    const orderId = randomUUID();
    const requestNo = createWebsiteRequestNo();
    const orderNo = createOrderNo();

    const rpOrder = await razorpay.orders.create({
      amount: toPaise(quote.total),
      currency: "INR",
      receipt: orderNo,
      notes: {
        request_no: requestNo,
        plan,
        customer_email: customerEmail,
      },
    });

    const { error: leadError } = await supabase.from("leads").insert({
      id: leadId,
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      websitestatus: websiteStatus,
      goals,
      channels: ["Website Development"],
      source: `website-${plan}`,
      status: "new",
    });

    if (leadError) {
      console.error("WEBSITE REQUEST LEAD INSERT ERROR:", leadError);
      return NextResponse.json(
        { success: false, error: "Failed to create lead record." },
        { status: 500 }
      );
    }

    const { error: requestError } = await supabase.from("website_requests").insert({
      id: requestId,
      request_no: requestNo,
      lead_id: leadId,
      plan,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      business_name: businessName || null,
      website_status: websiteStatus,
      goals,
      add_ons: addOns,
      pages_needed: pagesNeeded || null,
      notes: notes || null,
      base_price: quote.basePrice,
      add_on_amount: quote.addOnAmount,
      subtotal: quote.subtotal,
      gst: quote.gst,
      total: quote.total,
      currency: "INR",
      latest_order_id: orderId,
      status: "pending",
    });

    if (requestError) {
      console.error("WEBSITE REQUEST INSERT ERROR:", requestError);
      return NextResponse.json(
        { success: false, error: "Failed to create website request." },
        { status: 500 }
      );
    }

    const services = [`website:${plan}`, ...addOns.map((addOn) => `addon:${addOn}`)];

    const { error: orderError } = await supabase.from("orders").insert({
      id: orderId,
      order_no: orderNo,
      request_id: requestId,
      order_type: "website",
      plan,
      lead_id: leadId,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      services,
      subtotal: quote.subtotal,
      gst: quote.gst,
      total: quote.total,
      status: "pending",
      razorpay_order_id: rpOrder.id,
    });

    if (orderError) {
      console.error("WEBSITE REQUEST ORDER INSERT ERROR:", orderError);
      await supabase
        .from("website_requests")
        .update({ status: "failed" })
        .eq("id", requestId);

      return NextResponse.json(
        { success: false, error: "Failed to create order." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      request_id: requestId,
      request_no: requestNo,
      order_id: orderId,
      order_no: orderNo,
      razorpay_order_id: rpOrder.id,
      amount: rpOrder.amount,
      currency: rpOrder.currency,
      quote,
      plan: planConfig.label,
    });
  } catch (error) {
    console.error("WEBSITE START CHECKOUT ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unable to start checkout right now." },
      { status: 500 }
    );
  }
}
