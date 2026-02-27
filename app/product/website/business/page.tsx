import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Globe,
  LifeBuoy,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";

const includedItems = [
  {
    title: "6-8 conversion-focused pages",
    text: "Structured pages for trust building, offer clarity, and enquiry action.",
  },
  {
    title: "Custom brand-aligned UI",
    text: "Design system and section styling matched to your brand personality.",
  },
  {
    title: "Advanced lead capture setup",
    text: "Multiple CTA blocks, form placements, and WhatsApp conversion paths.",
  },
  {
    title: "SEO-ready architecture",
    text: "Page hierarchy, metadata structure, and technical setup for search visibility.",
  },
  {
    title: "Analytics and tracking integration",
    text: "Google Analytics and event tracking baseline for marketing decisions.",
  },
  {
    title: "Performance-optimized frontend",
    text: "Fast loading experience with mobile-first layout and quality QA.",
  },
  {
    title: "Automation-ready handoff",
    text: "Structure prepared for CRM, remarketing, and future automation systems.",
  },
  {
    title: "Launch and support window",
    text: "Go-live support with one detailed revision cycle and launch stability checks.",
  },
];

const idealForItems = [
  "Growing businesses focused on qualified lead generation",
  "Teams already running ads and needing better conversion rates",
  "Service brands replacing outdated low-performing websites",
  "Businesses preparing CRM and automation integration workflows",
];

const deliverables = [
  "Conversion-oriented page wireframe and content flow",
  "Brand-consistent section design across all pages",
  "Lead form, WhatsApp CTA, and enquiry routing setup",
  "Basic policy/footer/legal structure placement",
  "Analytics and SEO foundational configuration",
  "Pre-launch QA, optimization pass, and handover",
];

const processSteps = [
  {
    step: "Step 1",
    title: "Strategy and requirements",
    text: "We collect goals, audience, offer, and current marketing context.",
  },
  {
    step: "Step 2",
    title: "Conversion blueprint",
    text: "We define page structure, CTA hierarchy, and lead journey mapping.",
  },
  {
    step: "Step 3",
    title: "Design and development",
    text: "Custom build of your business website with responsive and fast UX.",
  },
  {
    step: "Step 4",
    title: "Review and refinement",
    text: "You review implementation and we apply one standard revision cycle.",
  },
  {
    step: "Step 5",
    title: "Launch and growth handoff",
    text: "Deployment, tracking verification, and next-stage growth recommendations.",
  },
];

const notIncludedItems = [
  "Enterprise dashboards and complex role-based modules",
  "High-complexity API and software integrations",
  "Paid plugins, licenses, and premium stock assets",
  "Large content migration or bulk data upload projects",
  "Advanced marketing ops, ad management, and deep SEO campaigns",
];

const addOns = [
  "Extra pages and long-form sales page builds",
  "Booking workflow and appointment automation",
  "CRM sync and advanced lead qualification logic",
  "Remarketing pixel/event enhancement setup",
  "Marketing automation and nurture sequence setup",
];

const faqs = [
  {
    q: "Is Rs. 19,999 a one-time cost?",
    a: "Yes. It is a one-time project price for the Business Website package. GST is extra.",
  },
  {
    q: "Can this package support lead generation campaigns?",
    a: "Yes. This package is built around conversion structure, CTA flow, and tracking readiness.",
  },
  {
    q: "How much time is needed for delivery?",
    a: "The typical timeline is 7-10 working days after requirements and content are finalized.",
  },
  {
    q: "Can I request custom features during development?",
    a: "Yes. Custom additions are possible, but they are billed separately through approved quotations.",
  },
];

export default function BusinessWebsitePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-100 via-white to-cyan-50 px-6 py-16 md:py-20">
        <div className="pointer-events-none absolute -left-20 -top-16 h-64 w-64 rounded-full bg-slate-300/45 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-cyan-200/45 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-700">
              <Sparkles className="h-3.5 w-3.5" />
              Recommended Growth Plan
            </p>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Business Website Package designed for high-intent lead conversion
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              This package is ideal for businesses that need more than a basic
              site. It combines premium design, conversion-led structure, and
              growth-ready setup to help your website perform like a sales asset.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/product/website/request?plan=business"
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Choose Business Website
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/product/website/custom"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Need Enterprise Scope?
              </Link>
            </div>

            <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {idealForItems.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-start gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_32px_80px_-42px_rgba(15,23,42,0.55)]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                <FileText className="h-4 w-4 text-slate-700" />
                Business Package Summary
              </p>
              <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white">
                Recommended
              </span>
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-100 bg-cyan-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-800">
                Package price
              </p>
              <p className="mt-1 text-3xl font-extrabold text-slate-900">Rs. 19,999</p>
              <p className="text-xs text-slate-600">GST extra</p>
            </div>

            <div className="mt-4 space-y-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="inline-flex items-center gap-2 font-medium text-slate-900">
                <Globe className="h-4 w-4 text-cyan-700" />
                6-8 pages with custom design
              </p>
              <p className="inline-flex items-center gap-2 font-medium text-slate-900">
                <Clock3 className="h-4 w-4 text-emerald-600" />
                Delivery in 7-10 working days
              </p>
              <p className="inline-flex items-center gap-2 font-medium text-slate-900">
                <Target className="h-4 w-4 text-indigo-600" />
                Conversion-first CTA architecture
              </p>
              <p className="inline-flex items-center gap-2 font-medium text-slate-900">
                <LifeBuoy className="h-4 w-4 text-amber-600" />
                Launch support and revision cycle
              </p>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Additional pages, integrations, premium tools, and expanded scope
              are handled through separate quotation approval.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold md:text-3xl">
            Everything included in Business Pack
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
            Full-stack website foundation built for conversions and growth.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {includedItems.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-bold text-slate-900">Deliverables you receive</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-bold text-slate-900">What is not included</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
              {notIncludedItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold md:text-3xl">How the business workflow runs</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
            Structured execution from strategy to go-live.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {processSteps.map((item) => (
              <div key={item.step} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
                  {item.step}
                </p>
                <p className="mt-1.5 font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1.5 text-xs leading-5 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold md:text-3xl">Optional add-ons available</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
            Expand from business package with modular upgrades.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {addOns.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Additional requirements outside the package scope are quoted
            separately and started only after your approval.
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Business Package FAQ</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Ready to scale with Business Website?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Launch your conversion-focused website now and expand to enterprise
            scope when your operations require deeper systems.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/product/website/request?plan=business"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Choose Business Website
            </Link>
            <Link
              href="/product/website/custom"
              className="rounded-lg border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-300"
            >
              Request Enterprise Quote
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Built for high-conversion growth stages with clear scope and delivery.
          </p>
        </div>
      </section>
    </main>
  );
}
