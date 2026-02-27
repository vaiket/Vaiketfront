import Link from "next/link";
import type { ComponentType } from "react";
import {
  BadgeCheck,
  Building2,
  Globe,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  BUSINESS_CATEGORY_SLUGS,
  resolveBusinessCategoryFromSlug,
} from "@/lib/business-identity";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type DirectoryListing = {
  id: string;
  business_name: string;
  public_username: string | null;
  slug: string;
  category: string;
  title: string;
  city: string;
  phone: string;
  website: string | null;
  whatsapp: string | null;
  logo_url: string | null;
  certificate_id: string | null;
};

type CoverageRow = {
  city: string | null;
  category: string | null;
  created_at: string | null;
};

function pickParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function sanitizeForIlike(value: string) {
  return value.replace(/[%_,]/g, " ").trim();
}

function normalizeWebsiteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function createdInLast30Days(value?: string | null) {
  if (!value) return false;
  const createdAt = new Date(value);
  if (Number.isNaN(createdAt.getTime())) return false;
  const threshold = new Date();
  threshold.setDate(threshold.getDate() - 30);
  return createdAt >= threshold;
}

export default async function BusinessDirectoryPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const categorySlug = pickParam(params.category).trim().toLowerCase();
  const q = pickParam(params.q).trim();
  const city = pickParam(params.city).trim();
  const selectedCategory = resolveBusinessCategoryFromSlug(categorySlug);

  let listingQuery = supabase
    .from("business_listings")
    .select(
      "id, business_name, public_username, slug, category, title, city, phone, website, whatsapp, logo_url, certificate_id"
    )
    .eq("status", "approved")
    .eq("payment_status", "paid")
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(200);

  if (selectedCategory) {
    listingQuery = listingQuery.eq("category", selectedCategory);
  }

  if (city) {
    listingQuery = listingQuery.ilike("city", `%${sanitizeForIlike(city)}%`);
  }

  if (q) {
    const safeQ = sanitizeForIlike(q);
    listingQuery = listingQuery.or(
      `business_name.ilike.%${safeQ}%,title.ilike.%${safeQ}%,details.ilike.%${safeQ}%`
    );
  }

  const [listingRes, totalCountRes, coverageRes] = await Promise.all([
    listingQuery,
    supabase
      .from("business_listings")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved")
      .eq("payment_status", "paid"),
    supabase
      .from("business_listings")
      .select("city, category, created_at")
      .eq("status", "approved")
      .eq("payment_status", "paid")
      .order("created_at", { ascending: false })
      .limit(3000),
  ]);

  const visibleListings = ((listingRes.data ?? []) as DirectoryListing[]) || [];
  const totalApprovedListings = totalCountRes.count ?? 0;
  const coverageRows = ((coverageRes.data ?? []) as CoverageRow[]) || [];
  const cityCoverage = new Set(
    coverageRows.map((item) => (item.city ?? "").trim().toLowerCase()).filter(Boolean)
  ).size;
  const categoryCoverage = new Set(
    coverageRows.map((item) => (item.category ?? "").trim().toLowerCase()).filter(Boolean)
  ).size;
  const newThisMonth = coverageRows.filter((item) => createdInLast30Days(item.created_at)).length;
  const activeCategoryLabel = selectedCategory ?? "All Categories";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <section className="relative border-b border-slate-200 bg-[radial-gradient(circle_at_12%_18%,rgba(6,182,212,0.12),transparent_35%),radial-gradient(circle_at_88%_20%,rgba(16,185,129,0.1),transparent_35%)] px-4 py-10 md:px-6 md:py-12">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-3 py-1 text-xs font-semibold text-cyan-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified business discovery network
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
              Find trusted local businesses that are active, contactable, and reviewed
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
              Vaiket directory is built for buyer confidence and business growth. Only paid and
              approved listings are shown publicly.
            </p>
            <p className="mt-1 text-xs font-semibold text-cyan-700">
              Showing: {activeCategoryLabel}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/business/dashboard/register"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              List Your Business
            </Link>
            <Link
              href="/business/identity"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Why Businesses Join
            </Link>
          </div>
        </div>

        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Approved Listings" value={String(totalApprovedListings)} icon={Building2} />
          <StatCard label="Cities Covered" value={String(cityCoverage)} icon={MapPin} />
          <StatCard label="Categories Active" value={String(categoryCoverage)} icon={Users} />
          <StatCard label="Added in Last 30 Days" value={String(newThisMonth)} icon={TrendingUp} />
        </div>

        <form method="get" className="grid gap-3 md:grid-cols-[1fr_220px_220px_130px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              name="q"
              defaultValue={q}
              placeholder="Search business name or service"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />
          </div>
          <input
            name="city"
            defaultValue={city}
            placeholder="City"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
          <select
            name="category"
            defaultValue={categorySlug}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          >
            <option value="">All categories</option>
            {BUSINESS_CATEGORY_SLUGS.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.category}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Search
          </button>
        </form>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-6 md:px-6">
        <div className="grid gap-3 md:grid-cols-3">
          <TrustItem
            title="Quality checks"
            text="Each listing passes manual review before going live."
          />
          <TrustItem
            title="Real contact channels"
            text="Profiles include direct call, location, and optional website or WhatsApp."
          />
          <TrustItem
            title="Action-oriented profile pages"
            text="Businesses get shareable links, QR code, products, and ongoing updates."
          />
        </div>
      </section>

      <section className="px-4 py-12 md:px-6">
        {visibleListings.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center">
            <p className="text-sm font-semibold text-slate-700">
              No businesses found for current filters.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Try another city/category or clear filters to explore all approved listings.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link
                href="/business"
                className="inline-flex rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Reset Filters
              </Link>
              <Link
                href="/business/dashboard/register"
                className="inline-flex rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                List Your Business
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleListings.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="h-11 w-11 overflow-hidden rounded-lg border border-slate-200 bg-white">
                    {item.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.logo_url}
                        alt={`${item.business_name} logo`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-cyan-100 text-cyan-700">
                        <Building2 className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-slate-900">{item.business_name}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.title}</p>
                <p className="mt-1 text-xs font-semibold text-cyan-700">{item.category}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <MapPin className="h-3.5 w-3.5 text-cyan-700" />
                  {item.city}
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <Phone className="h-3.5 w-3.5 text-cyan-700" />
                  {item.phone}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700">
                    Call enabled
                  </span>
                  {item.website ? (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700">
                      Website linked
                    </span>
                  ) : null}
                  {item.whatsapp ? (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700">
                      WhatsApp ready
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={item.public_username ? `/${item.public_username}` : `/business/${item.slug}`}
                    className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    View Profile
                  </Link>
                  {item.website ? (
                    <a
                      href={normalizeWebsiteUrl(item.website)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <Globe className="mr-1.5 h-3.5 w-3.5" />
                      Website
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5">
      <div className="inline-flex rounded-md bg-cyan-100 p-1.5 text-cyan-700">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-0.5 text-lg font-extrabold text-slate-900">{value}</p>
    </div>
  );
}

function TrustItem({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">{text}</p>
    </article>
  );
}
