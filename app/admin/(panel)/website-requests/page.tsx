import { supabase } from "@/lib/supabase";
import WebsiteRequestsManager, {
  type AdminWebsiteRequest,
} from "@/app/admin/(panel)/website-requests/WebsiteRequestsManager";

export const dynamic = "force-dynamic";

export default async function AdminWebsiteRequestsPage() {
  const { data } = await supabase
    .from("website_requests")
    .select(
      "id, request_no, lead_id, plan, customer_name, customer_email, customer_phone, business_name, website_status, goals, add_ons, pages_needed, notes, base_price, add_on_amount, subtotal, gst, total, currency, latest_order_id, status, created_at, updated_at"
    )
    .order("created_at", { ascending: false })
    .limit(500);

  return <WebsiteRequestsManager initialRequests={(data ?? []) as AdminWebsiteRequest[]} />;
}
