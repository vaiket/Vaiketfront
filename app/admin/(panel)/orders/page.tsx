import { supabase } from "@/lib/supabase";
import OrdersManager, { type AdminOrder } from "@/app/admin/(panel)/orders/OrdersManager";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const { data } = await supabase
    .from("orders")
    .select(
      "id, order_no, request_id, order_type, plan, customer_name, customer_email, customer_phone, lead_id, services, subtotal, gst, total, status, razorpay_order_id, razorpay_payment_id, failure_reason, created_at, paid_at"
    )
    .order("created_at", { ascending: false })
    .limit(500);

  return <OrdersManager initialOrders={(data ?? []) as AdminOrder[]} />;
}
