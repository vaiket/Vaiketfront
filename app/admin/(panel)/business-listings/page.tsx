import BusinessListingsManager, {
  type AdminBusinessListing,
} from "@/app/admin/(panel)/business-listings/BusinessListingsManager";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminBusinessListingsPage() {
  const { data } = await supabase
    .from("business_listings")
    .select(
      "id, user_id, business_name, public_username, slug, category, title, details, city, address, phone, website, whatsapp, logo_url, status, payment_status, verification_fee, verification_gst, verification_total, certificate_id, rejection_reason, approved_at, published_at, created_at, updated_at"
    )
    .order("created_at", { ascending: false })
    .limit(300);

  const listings = (data ?? []) as AdminBusinessListing[];
  if (listings.length === 0) {
    return <BusinessListingsManager initialListings={[]} />;
  }

  const userIds = Array.from(
    new Set(listings.map((item) => String(item.user_id ?? "").trim()).filter(Boolean))
  );
  const { data: users } = userIds.length
    ? await supabase.from("business_users").select("id, full_name, email, phone").in("id", userIds)
    : { data: [] as Array<{ id: string; full_name: string; email: string; phone: string | null }> };

  const usersMap = new Map(
    (users ?? []).map((user) => [
      user.id,
      {
        owner_name: user.full_name ?? null,
        owner_email: user.email ?? null,
        owner_phone: user.phone ?? null,
      },
    ])
  );

  const hydratedListings = listings.map((listing) => ({
    ...listing,
    ...(usersMap.get(listing.user_id) ?? {
      owner_name: null,
      owner_email: null,
      owner_phone: null,
    }),
  }));

  return <BusinessListingsManager initialListings={hydratedListings} />;
}
