import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BadgeCheck, Globe, MapPin, MessageCircle, Package, Phone } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { buildBusinessPublicUrl, buildQrCodeImageUrl } from "@/lib/site-url";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type PublicBusinessListing = {
  id: string;
  business_name: string;
  public_username: string | null;
  slug: string;
  category: string;
  title: string;
  details: string;
  city: string;
  address: string;
  phone: string;
  website: string | null;
  whatsapp: string | null;
  logo_url: string | null;
  certificate_id: string | null;
  approved_at: string | null;
  published_at: string | null;
};

type PublicBusinessProduct = {
  id: string;
  product_name: string;
  short_description: string | null;
  full_description: string | null;
  price: number | string;
  currency: string;
  image_url: string | null;
  purchase_url: string | null;
  cta_label: string;
};

function normalizeWebsiteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function toTelUrl(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits || phone}`;
}

function toWhatsappUrl(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}`;
}

export default async function BusinessPublicProfilePage({ params }: PageProps) {
  const { slug } = await params;

  const { data: listing } = await supabase
    .from("business_listings")
    .select(
      "id, business_name, public_username, slug, category, title, details, city, address, phone, website, whatsapp, logo_url, certificate_id, approved_at, published_at"
    )
    .eq("slug", slug)
    .eq("status", "approved")
    .eq("payment_status", "paid")
    .maybeSingle();

  if (!listing) {
    notFound();
  }

  const business = listing as PublicBusinessListing;
  if (business.public_username) {
    redirect(`/${business.public_username}`);
  }
  const whatsapp = business.whatsapp || business.phone;
  const whatsappUrl = whatsapp ? toWhatsappUrl(whatsapp) : null;
  const profileUrl = business.public_username
    ? buildBusinessPublicUrl(business.public_username)
    : null;
  const qrCodeUrl = profileUrl ? buildQrCodeImageUrl(profileUrl, 220) : null;

  const { data: products } = await supabase
    .from("business_products")
    .select(
      "id, product_name, short_description, full_description, price, currency, image_url, purchase_url, cta_label"
    )
    .eq("listing_id", business.id)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const publicProducts = (products ?? []) as PublicBusinessProduct[];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <section className="border-b border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-4 py-12 md:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified on Vaiket Directory
          </p>

          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
                {business.business_name}
              </h1>
              <p className="mt-2 text-base font-medium text-slate-700">{business.title}</p>
              <p className="mt-2 text-sm font-semibold text-cyan-700">{business.category}</p>

              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-cyan-700" />
                {business.city}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Certificate ID
              </p>
              <p className="mt-1 font-bold text-slate-900">{business.certificate_id ?? "-"}</p>
              {business.certificate_id ? (
                <Link
                  href={`/business/certificate/${business.certificate_id}`}
                  className="mt-2 inline-flex text-xs font-semibold text-cyan-700 hover:underline"
                >
                  Verify Certificate
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={toTelUrl(business.phone)}
              className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call
            </a>
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            ) : null}
            {business.website ? (
              <a
                href={normalizeWebsiteUrl(business.website)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <Globe className="mr-2 h-4 w-4" />
                Website
              </a>
            ) : null}
          </div>

          {profileUrl && qrCodeUrl ? (
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Public URL
              </p>
              <p className="mt-1 break-all text-sm font-semibold text-cyan-700">{profileUrl}</p>
              <div className="mt-2 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCodeUrl}
                  alt="Business profile QR code"
                  className="h-16 w-16 rounded-md border border-slate-200 bg-white p-1"
                />
                <a
                  href={qrCodeUrl}
                  download={`vaiket-${business.public_username}-qr.png`}
                  className="text-xs font-semibold text-cyan-700 hover:underline"
                >
                  Download QR
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-4 py-12 md:px-6">
        <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-bold text-slate-900">About this business</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {business.details}
            </p>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-bold text-slate-900">Contact details</h2>

            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <p className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" />
                <span>{business.address}</span>
              </p>
              <p className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-cyan-700" />
                {business.phone}
              </p>
              {business.website ? (
                <p className="inline-flex items-center gap-2 break-all">
                  <Globe className="h-4 w-4 text-cyan-700" />
                  <a
                    href={normalizeWebsiteUrl(business.website)}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-cyan-700 hover:underline"
                  >
                    {business.website}
                  </a>
                </p>
              ) : null}
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Issued by
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Vaiket - Vikas Web Development Pvt. Ltd.
              </p>
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-8 w-full max-w-5xl">
          <h2 className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900">
            <Package className="h-5 w-5 text-cyan-700" />
            Products
          </h2>

          {publicProducts.length === 0 ? (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
              No products listed yet.
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {publicProducts.map((product) => (
                <article key={product.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  {product.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image_url}
                      alt={product.product_name}
                      className="mb-3 h-36 w-full rounded-lg object-cover"
                    />
                  ) : null}
                  <h3 className="text-base font-bold text-slate-900">{product.product_name}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {product.short_description || product.full_description || "Product details available on request."}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    Rs. {Number(product.price ?? 0).toLocaleString("en-IN")}
                  </p>
                  {product.purchase_url ? (
                    <a
                      href={product.purchase_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                    >
                      {product.cta_label || "Buy Now"}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
