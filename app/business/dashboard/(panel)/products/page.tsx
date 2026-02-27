import { requireBusinessSession } from "@/lib/business-guard";
import { supabase } from "@/lib/supabase";
import BusinessProductsManager, {
  type BusinessProduct,
} from "@/app/business/dashboard/(panel)/products/BusinessProductsManager";

export const dynamic = "force-dynamic";

export default async function BusinessDashboardProductsPage() {
  const session = await requireBusinessSession();

  const { data: listing } = await supabase
    .from("business_listings")
    .select("id, business_name, public_username, status, payment_status")
    .eq("user_id", session.userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let products: BusinessProduct[] = [];
  if (listing?.id) {
    const { data } = await supabase
      .from("business_products")
      .select(
        "id, listing_id, user_id, product_name, short_description, full_description, price, currency, image_url, purchase_url, cta_label, is_active, sort_order, created_at, updated_at"
      )
      .eq("listing_id", listing.id)
      .eq("user_id", session.userId)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    products = (data ?? []) as BusinessProduct[];
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Manage Services and Offers</h1>
      <p className="mt-1 text-sm text-slate-600">
        Add service cards and offers visible on your high-conversion public profile page.
      </p>

      <div className="mt-5">
        <BusinessProductsManager
          initialListing={listing ?? null}
          initialProducts={products}
        />
      </div>
    </div>
  );
}
