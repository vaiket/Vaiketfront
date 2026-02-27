import { requireBusinessSession } from "@/lib/business-guard";
import { supabase } from "@/lib/supabase";
import BusinessListingForm from "@/app/business/dashboard/(panel)/add/BusinessListingForm";
import type { BusinessListing } from "@/app/business/dashboard/(panel)/add/BusinessListingForm";

export const dynamic = "force-dynamic";

export default async function BusinessDashboardAddPage() {
  const session = await requireBusinessSession();

  const { data } = await supabase
    .from("business_listings")
    .select(
      "id, business_name, public_username, category, title, details, city, address, phone, website, whatsapp, logo_url, cover_banner_url, owner_name, contact_email, google_maps_url, years_experience, about_short, about_long, social_links, key_highlights, gallery_images, portfolio_images, certificates, testimonials, faqs, status, payment_status"
    )
    .eq("user_id", session.userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Add or Edit Business Listing</h1>
      <p className="mt-1 text-sm text-slate-600">
        Build a high-conversion mini website profile. Upload images directly, no mandatory image-link pasting.
      </p>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <BusinessListingForm initialListing={(data ?? null) as BusinessListing | null} />
      </div>
    </div>
  );
}
