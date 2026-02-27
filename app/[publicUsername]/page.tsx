
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Users,
  Youtube,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  isReservedBusinessUsername,
  normalizeBusinessUsername,
} from "@/lib/business-identity";
import { buildBusinessPublicUrl, buildQrCodeImageUrl } from "@/lib/site-url";
import PublicEnquiryForm from "@/app/[publicUsername]/PublicEnquiryForm";

type PageProps = {
  params: Promise<{ publicUsername: string }>;
};

type SocialLinks = {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  x?: string;
  twitter?: string;
};

type Testimonial = {
  name: string;
  text: string;
  rating?: number;
};

type FaqItem = {
  question: string;
  answer: string;
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
  whatsapp: string | null;
  contact_email: string | null;
  website: string | null;
  logo_url: string | null;
  cover_banner_url: string | null;
  owner_name: string | null;
  google_maps_url: string | null;
  years_experience: number | null;
  about_short: string | null;
  about_long: string | null;
  social_links: SocialLinks | null;
  key_highlights: unknown;
  gallery_images: unknown;
  portfolio_images: unknown;
  certificates: unknown;
  testimonials: unknown;
  faqs: unknown;
  profile_views: number | string | null;
  enquiry_count: number | string | null;
  certificate_id: string | null;
  approved_at: string | null;
  published_at: string | null;
  created_at: string | null;
};

type PublicBusinessProduct = {
  id: string;
  product_name: string;
  short_description: string | null;
  full_description: string | null;
  price: number | string;
  currency: string;
  image_url: string | null;
  cta_label: string;
  is_active: boolean;
};

function normalizeExternalUrl(value: string) {
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

function formatDate(value: string | null | undefined) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toNumber(value: number | string | null | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item ?? "").trim())
    .filter(Boolean);
}

function parseTestimonials(value: unknown): Testimonial[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        const text = String(item ?? "").trim();
        if (!text) return null;
        return { name: "Customer", text };
      }
      const name = String((item as Record<string, unknown>).name ?? "Customer").trim() || "Customer";
      const text = String((item as Record<string, unknown>).text ?? "").trim();
      if (!text) return null;
      const ratingRaw = Number((item as Record<string, unknown>).rating ?? 0);
      const rating =
        Number.isFinite(ratingRaw) && ratingRaw > 0
          ? Math.max(1, Math.min(5, Math.round(ratingRaw)))
          : undefined;
      return { name, text, ...(rating ? { rating } : {}) };
    })
    .filter((item): item is Testimonial => Boolean(item));
}

function parseFaqs(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return null;
      const question = String((item as Record<string, unknown>).question ?? "").trim();
      const answer = String((item as Record<string, unknown>).answer ?? "").trim();
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is FaqItem => Boolean(item));
}

function buildWhyChooseBullets(business: PublicBusinessListing, activeServices: number) {
  const highlights = parseStringArray(business.key_highlights).slice(0, 8);
  if (highlights.length > 0) return highlights;

  const fallback = [
    `Verified profile on Vaiket with secure contact channels.`,
    `Local provider in ${business.city} for ${business.category.toLowerCase()} requirements.`,
    activeServices > 0
      ? `${activeServices} service${activeServices > 1 ? "s" : ""} published with clear offerings.`
      : "Clear service communication with direct enquiry options.",
    business.years_experience
      ? `${business.years_experience}+ years of practical experience.`
      : "Business profile maintained with current details and response options.",
  ];
  return fallback.slice(0, 6);
}

function SocialButton({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <a
      href={normalizeExternalUrl(href)}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
    >
      <Icon className="mr-1.5 h-3.5 w-3.5 text-cyan-700" />
      {label}
    </a>
  );
}

export default async function PublicBusinessUsernamePage({ params }: PageProps) {
  const { publicUsername } = await params;
  const normalizedUsername = normalizeBusinessUsername(publicUsername);

  if (!normalizedUsername || isReservedBusinessUsername(normalizedUsername)) {
    notFound();
  }

  const { data: listing } = await supabase
    .from("business_listings")
    .select(
      "id, business_name, public_username, slug, category, title, details, city, address, phone, whatsapp, contact_email, website, logo_url, cover_banner_url, owner_name, google_maps_url, years_experience, about_short, about_long, social_links, key_highlights, gallery_images, portfolio_images, certificates, testimonials, faqs, profile_views, enquiry_count, certificate_id, approved_at, published_at, created_at"
    )
    .ilike("public_username", normalizedUsername)
    .eq("status", "approved")
    .eq("payment_status", "paid")
    .maybeSingle();

  if (!listing) {
    notFound();
  }

  const business = listing as PublicBusinessListing;
  let profileViews = toNumber(business.profile_views);

  const { data: nextViewCount } = await supabase.rpc("increment_business_profile_views", {
    p_listing_id: business.id,
  });
  if (typeof nextViewCount === "number" || typeof nextViewCount === "string") {
    profileViews = toNumber(nextViewCount);
  }

  const enquiryCount = toNumber(business.enquiry_count);
  const activeSince = formatDate(business.published_at || business.approved_at || business.created_at);
  const aboutShort = business.about_short || business.title;
  const aboutLong = business.about_long || business.details;

  const profileUrl = business.public_username
    ? buildBusinessPublicUrl(business.public_username)
    : null;
  const qrCodeUrl = profileUrl ? buildQrCodeImageUrl(profileUrl, 240) : null;

  const whatsapp = business.whatsapp || business.phone;
  const whatsappUrl = whatsapp ? toWhatsappUrl(whatsapp) : null;

  const { data: products } = await supabase
    .from("business_products")
    .select(
      "id, product_name, short_description, full_description, price, currency, image_url, cta_label, is_active"
    )
    .eq("listing_id", business.id)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const activeServices = (products ?? []) as PublicBusinessProduct[];
  const whyChooseBullets = buildWhyChooseBullets(business, activeServices.length);
  const galleryImages = parseStringArray(business.gallery_images);
  const portfolioImages = parseStringArray(business.portfolio_images);
  const certificates = parseStringArray(business.certificates);
  const testimonials = parseTestimonials(business.testimonials);
  const faqs = parseFaqs(business.faqs);
  const social = business.social_links || {};

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-cyan-50/40 px-4 py-8 pb-28 text-slate-900 md:px-6 md:pb-10">
      <div className="mx-auto w-full max-w-7xl">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_28px_90px_-48px_rgba(15,23,42,0.5)]">
          {business.cover_banner_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={business.cover_banner_url}
              alt={`${business.business_name} cover`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/55 to-slate-900/35" />

          <div className="relative grid gap-6 px-4 py-7 md:px-7 md:py-10 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 overflow-hidden rounded-xl border border-white/30 bg-white/95">
                  {business.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={business.logo_url}
                      alt={`${business.business_name} logo`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-cyan-100 text-lg font-bold text-cyan-700">
                      {business.business_name.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <p className="inline-flex items-center gap-1 rounded-full bg-emerald-100/95 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified Business
                  </p>
                  <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    {business.business_name}
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-3xl text-base text-slate-100">{aboutShort}</p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/15 px-2.5 py-1 font-semibold text-white">
                  {business.category}
                </span>
                <span className="rounded-full bg-white/15 px-2.5 py-1 font-semibold text-white">
                  {business.city}
                </span>
                {business.years_experience ? (
                  <span className="rounded-full bg-white/15 px-2.5 py-1 font-semibold text-white">
                    {business.years_experience}+ years experience
                  </span>
                ) : null}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={toTelUrl(business.phone)}
                  className="inline-flex items-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-400"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-400"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                ) : null}
                <a
                  href="#quick-enquiry"
                  className="inline-flex items-center rounded-xl border border-white/40 bg-white/15 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  Request Callback
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {social.instagram ? (
                  <SocialButton href={social.instagram} label="Instagram" icon={Instagram} />
                ) : null}
                {social.facebook ? (
                  <SocialButton href={social.facebook} label="Facebook" icon={Facebook} />
                ) : null}
                {social.linkedin ? (
                  <SocialButton href={social.linkedin} label="LinkedIn" icon={Linkedin} />
                ) : null}
                {social.youtube ? (
                  <SocialButton href={social.youtube} label="YouTube" icon={Youtube} />
                ) : null}
                {(social.x || social.twitter) ? (
                  <SocialButton href={social.x || social.twitter || ""} label="X" icon={Star} />
                ) : null}
              </div>
            </div>

            <aside className="rounded-2xl border border-white/25 bg-white/90 p-4 text-slate-800">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Contact Snapshot</h2>
              <div className="mt-3 space-y-2 text-sm">
                <p className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-cyan-700" />
                  {business.address}
                </p>
                <p className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-cyan-700" />
                  {business.phone}
                </p>
                {business.contact_email ? (
                  <p className="inline-flex items-center gap-2 break-all">
                    <Mail className="h-4 w-4 text-cyan-700" />
                    {business.contact_email}
                  </p>
                ) : null}
                {business.website ? (
                  <a
                    href={normalizeExternalUrl(business.website)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-cyan-700 hover:underline"
                  >
                    <Globe className="h-4 w-4" />
                    Visit Website
                  </a>
                ) : null}
                {business.google_maps_url ? (
                  <a
                    href={normalizeExternalUrl(business.google_maps_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-cyan-700 hover:underline"
                  >
                    <MapPin className="h-4 w-4" />
                    Open on Google Maps
                  </a>
                ) : null}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-3">
          <div className="grid gap-2 text-xs font-semibold text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
            <TrustPill icon={ShieldCheck} text="Verified Business" />
            <TrustPill icon={MapPin} text={`Local Provider in ${business.city}`} />
            <TrustPill icon={Clock3} text={`Active on Vaiket since ${activeSince}`} />
            <TrustPill icon={CheckCircle2} text="Secure Contact Channel" />
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-bold text-slate-900">Why choose this business</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {whyChooseBullets.map((item) => (
                  <p
                    key={item}
                    className="inline-flex items-start rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-cyan-700" />
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-bold text-slate-900">Services and Offers</h2>
              {activeServices.length === 0 ? (
                <p className="mt-3 text-sm text-slate-600">
                  Services will be listed shortly. Use quick enquiry form for immediate callback.
                </p>
              ) : (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {activeServices.map((service) => (
                    <article
                      key={service.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                    >
                      {service.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={service.image_url}
                          alt={service.product_name}
                          className="mb-3 h-36 w-full rounded-lg object-cover"
                        />
                      ) : (
                        <div className="mb-3 flex h-36 w-full items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-500">
                          Service image
                        </div>
                      )}
                      <h3 className="text-base font-bold text-slate-900">{service.product_name}</h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {service.short_description ||
                          service.full_description ||
                          "Details available on enquiry."}
                      </p>
                      {toNumber(service.price) > 0 ? (
                        <p className="mt-2 text-sm font-bold text-slate-900">
                          Rs. {toNumber(service.price).toLocaleString("en-IN")}
                        </p>
                      ) : (
                        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Custom pricing
                        </p>
                      )}
                      <a
                        href="#quick-enquiry"
                        className="mt-3 inline-flex rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                      >
                        Enquire Now
                      </a>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-bold text-slate-900">Media and Portfolio</h2>

              {galleryImages.length === 0 && portfolioImages.length === 0 ? (
                <p className="mt-3 text-sm text-slate-600">
                  Gallery will be updated soon. Contact business for latest work samples.
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  {galleryImages.length > 0 ? (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">Gallery</p>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {galleryImages.map((imageUrl) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={imageUrl}
                            src={imageUrl}
                            alt={`${business.business_name} gallery`}
                            className="h-36 w-full rounded-lg border border-slate-200 object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {portfolioImages.length > 0 ? (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">Portfolio</p>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {portfolioImages.map((imageUrl) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={imageUrl}
                            src={imageUrl}
                            alt={`${business.business_name} portfolio`}
                            className="h-36 w-full rounded-lg border border-slate-200 object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-bold text-slate-900">Customer Reviews and Trust Data</h2>

              {testimonials.length > 0 ? (
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {testimonials.map((item, index) => (
                    <article
                      key={`${item.name}-${index}`}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                    >
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      {item.rating ? (
                        <p className="mt-0.5 text-xs font-semibold text-amber-600">
                          {"★".repeat(item.rating)}
                        </p>
                      ) : null}
                      <p className="mt-1 text-sm text-slate-700">{item.text}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-600">
                  Reviews will be added over time. Use trust metrics below for current profile activity.
                </p>
              )}

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <InfoCard label="Profile Views" value={String(profileViews)} />
                <InfoCard label="Enquiries Received" value={String(enquiryCount)} />
                <InfoCard label="Active Since" value={activeSince} />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-bold text-slate-900">About Business</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">{aboutLong}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <InfoCard label="Business Owner" value={business.owner_name || "Team"} />
                <InfoCard
                  label="Experience"
                  value={
                    business.years_experience
                      ? `${business.years_experience}+ years`
                      : "Experience details not specified"
                  }
                />
              </div>

              {faqs.length > 0 ? (
                <div className="mt-5">
                  <h3 className="text-lg font-bold text-slate-900">FAQs</h3>
                  <div className="mt-3 space-y-2">
                    {faqs.map((item, index) => (
                      <article
                        key={`${item.question}-${index}`}
                        className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                      >
                        <p className="text-sm font-semibold text-slate-900">{item.question}</p>
                        <p className="mt-1 text-sm text-slate-700">{item.answer}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>

            <PublicEnquiryForm
              listingId={business.id}
              publicUsername={business.public_username || normalizedUsername}
              businessName={business.business_name}
            />

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-bold text-slate-900">Certificate and Verification</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-[1fr_220px]">
                <div>
                  <p className="text-sm text-slate-700">
                    This profile is verified under Vaiket business review system.
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    Certificate ID: {business.certificate_id ?? "-"}
                  </p>
                  {business.certificate_id ? (
                    <Link
                      href={`/business/certificate/${business.certificate_id}`}
                      className="mt-2 inline-flex text-sm font-semibold text-cyan-700 hover:underline"
                    >
                      Verify Certificate
                    </Link>
                  ) : null}

                  {certificates.length > 0 ? (
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {certificates.map((imageUrl) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={imageUrl}
                          src={imageUrl}
                          alt="Certificate proof"
                          className="h-36 w-full rounded-lg border border-slate-200 object-cover"
                        />
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Profile QR</p>
                  {qrCodeUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={qrCodeUrl}
                        alt="Business profile QR code"
                        className="mx-auto mt-2 h-36 w-36 rounded-md border border-slate-200 bg-white p-1"
                      />
                      <a
                        href={qrCodeUrl}
                        download={`vaiket-${business.public_username}-qr.png`}
                        className="mt-2 inline-flex text-xs font-semibold text-cyan-700 hover:underline"
                      >
                        Download QR
                      </a>
                    </>
                  ) : (
                    <p className="mt-2 text-xs text-slate-500">QR unavailable.</p>
                  )}
                  <p className="mt-3 text-[11px] font-semibold text-slate-600">
                    Issued by Vaiket - Vikas Web Development Pvt. Ltd.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Contact Panel</h3>
                <div className="mt-3 space-y-2">
                  <a
                    href={toTelUrl(business.phone)}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-400"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </a>
                  {whatsappUrl ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </a>
                  ) : null}
                  <a
                    href="#quick-enquiry"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Request Callback
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Trust Stats</h3>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4 text-cyan-700" />
                    {profileViews} profile views
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-cyan-700" />
                    {enquiryCount} enquiries
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-cyan-700" />
                    Active since {activeSince}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2 shadow-[0_-8px_24px_-16px_rgba(15,23,42,0.55)] backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-2">
          <a
            href={toTelUrl(business.phone)}
            className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-2 py-2 text-xs font-bold text-white"
          >
            <Phone className="mr-1.5 h-3.5 w-3.5" />
            Call
          </a>
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-2 py-2 text-xs font-bold text-white"
            >
              <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
              WhatsApp
            </a>
          ) : (
            <a
              href="#quick-enquiry"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-2 py-2 text-xs font-bold text-white"
            >
              Enquiry
            </a>
          )}
          <a
            href="#quick-enquiry"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-2 py-2 text-xs font-bold text-slate-700"
          >
            Enquiry
          </a>
        </div>
      </div>
    </main>
  );
}

function TrustPill({
  text,
  icon: Icon,
}: {
  text: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <p className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center">
      <Icon className="h-3.5 w-3.5 text-cyan-700" />
      {text}
    </p>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}
