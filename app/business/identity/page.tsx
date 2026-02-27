import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Compass,
  FileBadge2,
  LineChart,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const valuePillars = [
  {
    icon: Compass,
    title: "Discovery and customer reach",
    text: "Get listed in a searchable directory by city and category so buyers can find you.",
  },
  {
    icon: BadgeCheck,
    title: "Trust layer for conversion",
    text: "Manual verification and profile standards improve buyer confidence before contact.",
  },
  {
    icon: LineChart,
    title: "Growth-ready profile system",
    text: "Public profile, products, referral wallet, and admin-managed operations in one flow.",
  },
  {
    icon: FileBadge2,
    title: "Recognition artifact",
    text: "Certificate is a supporting proof asset, not the core product value.",
  },
];

const processSteps = [
  "Create business owner account",
  "Submit profile details and contact channels",
  "Pay verification fee (Rs. 1 + GST in current mode)",
  "Vaiket team reviews listing quality and authenticity",
  "On approval, your profile goes live with URL, QR, and certificate",
];

const trustGuardrails = [
  "Only approved and paid listings are public.",
  "Misleading, spam, or fake listings are rejected or removed.",
  "Certificate does not claim any government affiliation.",
  "Profile updates are live from dashboard for approved businesses.",
];

const scaleRoadmap = [
  "Verified customer reviews and reputation scoring",
  "Lead inbox with response-time analytics",
  "Booking and quote request workflows",
  "Featured placements and performance campaigns",
];

type CoverageRow = {
  city: string | null;
  category: string | null;
  business_name: string | null;
};

export const dynamic = "force-dynamic";

export default async function BusinessIdentityPage() {
  const [countRes, coverageRes] = await Promise.all([
    supabase
      .from("business_listings")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved")
      .eq("payment_status", "paid"),
    supabase
      .from("business_listings")
      .select("city, category, business_name")
      .eq("status", "approved")
      .eq("payment_status", "paid")
      .order("created_at", { ascending: false })
      .limit(3000),
  ]);

  const totalLiveListings = countRes.count ?? 0;
  const coverageRows = ((coverageRes.data ?? []) as CoverageRow[]) || [];
  const cities = new Set(
    coverageRows.map((item) => (item.city ?? "").trim().toLowerCase()).filter(Boolean)
  );
  const categories = new Set(
    coverageRows.map((item) => (item.category ?? "").trim().toLowerCase()).filter(Boolean)
  );
  const recentNames = coverageRows
    .map((item) => item.business_name?.trim())
    .filter(Boolean)
    .slice(0, 3) as string[];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-4 py-14 md:px-6 md:py-18">
        <div className="pointer-events-none absolute -left-20 -top-16 h-64 w-64 rounded-full bg-cyan-200/45 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-emerald-200/45 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.06fr_0.94fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-1.5 text-xs font-semibold text-cyan-700 shadow-sm">
              <Building2 className="h-3.5 w-3.5" />
              Vaiket Business Growth Profile
            </p>
            <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight md:text-5xl md:leading-[1.05]">
              Turn your business profile into a trust engine and lead channel
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              This is not a certificate-selling page. Vaiket is building a verified business
              discovery and conversion platform for local and service-led businesses.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/business/dashboard/register"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                List Your Business
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/business"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Explore Live Directory
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-46px_rgba(15,23,42,0.55)]">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <WalletCards className="h-3.5 w-3.5" />
              Live platform snapshot
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <SnapshotCard label="Live listings" value={String(totalLiveListings)} />
              <SnapshotCard label="City coverage" value={String(cities.size)} />
              <SnapshotCard label="Category coverage" value={String(categories.size)} />
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Recently active
            </p>
            <div className="mt-2 space-y-2">
              {recentNames.length === 0 ? (
                <p className="text-xs text-slate-500">New businesses appear here after approval.</p>
              ) : (
                recentNames.map((name) => (
                  <p
                    key={name}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    {name}
                  </p>
                ))
              )}
            </div>

            <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-700" />
              Issued by Vaiket - Vikas Web Development Pvt. Ltd.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Core value for real businesses
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {valuePillars.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <item.icon className="h-5 w-5 text-cyan-700" />
                <h3 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 md:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Transparent onboarding flow</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Step {index + 1}</p>
                <p className="mt-2 text-sm font-medium text-slate-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-xl font-bold text-slate-900">Trust guardrails</h3>
            <div className="mt-4 space-y-2">
              {trustGuardrails.map((item) => (
                <p
                  key={item}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                >
                  {item}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-xl font-bold text-slate-900">Scale roadmap</h3>
            <div className="mt-4 space-y-2">
              {scaleRoadmap.map((item) => (
                <p
                  key={item}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                >
                  {item}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-slate-900 px-4 py-14 text-white md:px-6">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h2 className="text-3xl font-bold">
            Build trust once, then convert from profile, products, and referrals
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Start your onboarding and move from unstructured local presence to a verified growth
            profile on Vaiket.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/business/dashboard/register"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Start Listing Request
            </Link>
            <Link
              href="/business"
              className="rounded-xl border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-300"
            >
              View Live Businesses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SnapshotCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-base font-extrabold text-slate-900">{value}</p>
    </div>
  );
}
