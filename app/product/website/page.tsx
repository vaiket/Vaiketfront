import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Globe,
  LayoutDashboard,
  LineChart,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

type Plan = {
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  pages: string;
  delivery: string;
  cta: string;
  href: string;
  featured?: boolean;
  points: string[];
};

const plans: Plan[] = [
  {
    title: "Starter Website",
    subtitle: "For local businesses and first-time launch",
    price: "Rs. 4,999",
    priceNote: "One-time project fee. GST extra.",
    pages: "Up to 5 pages",
    delivery: "Delivery in 5-7 working days",
    cta: "Get Starter Website",
    href: "/product/website/starter",
    points: [
      "Mobile responsive layout",
      "Contact form and WhatsApp button",
      "Basic on-page SEO setup",
      "Ready for future automation",
    ],
  },
  {
    title: "Business Website",
    subtitle: "For lead generation and faster business growth",
    price: "Rs. 19,999",
    priceNote: "One-time project fee. GST extra.",
    pages: "6-8 pages",
    delivery: "Delivery in 7-10 working days",
    cta: "Choose Business Website",
    href: "/product/website/business",
    featured: true,
    points: [
      "Custom branding and section design",
      "Lead capture forms and CTA system",
      "Analytics and SEO-ready structure",
      "Built to plug into CRM and campaigns",
    ],
  },
  {
    title: "Enterprise Website",
    subtitle: "For advanced workflows, integrations, and long-term scale",
    price: "Custom Quote",
    priceNote: "Final pricing after requirement call and scope lock.",
    pages: "Flexible scope",
    delivery: "Timeline after requirement call",
    cta: "Request Enterprise Quote",
    href: "/product/website/custom",
    points: [
      "Custom UI and user journeys",
      "Dashboard, APIs, and integrations",
      "E-commerce and payment workflows",
      "Built for long-term system growth",
    ],
  },
];

const includeItems = [
  {
    icon: MonitorSmartphone,
    title: "Responsive by default",
    text: "Looks polished on mobile, tablet, and desktop from day one.",
  },
  {
    icon: ShieldCheck,
    title: "Secure build standards",
    text: "Clean architecture, best-practice setup, and safe deployment flow.",
  },
  {
    icon: LineChart,
    title: "Conversion focus",
    text: "Every page is structured to push action, leads, and real enquiries.",
  },
  {
    icon: Workflow,
    title: "Automation ready",
    text: "Prepared for CRM, email automation, and WhatsApp integrations.",
  },
];

const steps = [
  "Choose your plan",
  "Share requirements",
  "Design and development",
  "Review and revisions",
  "Launch and growth support",
];

export default function WebsitePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
        <div className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-emerald-200/45 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.07fr_0.93fr] md:py-20 lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/90 bg-white/90 px-4 py-1.5 text-xs font-semibold text-cyan-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Conversion-First Website Funnel Build
            </p>

            <h1 className="mt-5 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-[3.45rem] lg:leading-[1.03]">
              Turn your website into your best-performing sales channel
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 md:text-base md:leading-7">
              We build premium, world-class website experiences engineered for
              trust, clarity, and action so the right visitors become qualified
              enquiries at a higher rate.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#plans"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-18px_rgba(15,23,42,0.72)] transition hover:bg-slate-800"
              >
                Get My Website Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                href="/company/contact-support"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
              >
                Book Strategy Call
              </Link>
            </div>

            <div className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
              {[
                "Message and offer positioning included",
                "High-intent CTA flow and section hierarchy",
                "Mobile-first performance and UX polish",
                "Ready for CRM, ads, and automation stack",
              ].map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-xs text-slate-700 shadow-sm"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto w-full max-w-lg rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-[0_32px_80px_-42px_rgba(15,23,42,0.55)]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <LayoutDashboard className="h-4 w-4 text-cyan-600" />
                  High-Conversion Blueprint
                </p>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  Funnel Structure
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Core journey
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Hero offer - Proof - Value - CTA - Lead capture
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                    <p className="text-slate-500">Target speed score</p>
                    <p className="mt-1 text-base font-bold text-slate-900">90+</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                    <p className="text-slate-500">CTA visibility</p>
                    <p className="mt-1 text-base font-bold text-slate-900">Multi-section</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                    <p className="text-slate-500">Lead handoff</p>
                    <p className="mt-1 text-base font-bold text-slate-900">CRM-ready</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                    <p className="text-slate-500">Design quality</p>
                    <p className="mt-1 text-base font-bold text-slate-900">Premium UI</p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                  <p className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                    <Clock3 className="h-3.5 w-3.5 text-emerald-600" />
                    Delivery workflow
                  </p>
                  <p className="mt-1.5">
                    Strategy - Design - Development - QA - Launch
                  </p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-5 -left-4 hidden rounded-xl border border-cyan-200 bg-cyan-50/95 px-3 py-2 text-xs font-semibold text-cyan-700 shadow-sm sm:block">
              <span className="inline-flex items-center gap-1.5">
                <MonitorSmartphone className="h-3.5 w-3.5" />
                Premium experience on every device
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Built for your current stage</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Whether you are launching your first site or upgrading for performance,
            this page gives you a clear path.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Globe className="h-5 w-5 text-cyan-600" />
              <h3 className="mt-3 font-semibold text-slate-900">No website yet</h3>
              <p className="mt-2 text-sm text-slate-600">
                Start with a clean, modern, and trustworthy web presence.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <LineChart className="h-5 w-5 text-emerald-600" />
              <h3 className="mt-3 font-semibold text-slate-900">Getting traffic but low leads</h3>
              <p className="mt-2 text-sm text-slate-600">
                Upgrade structure, copy, and CTA flow to improve conversion.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Workflow className="h-5 w-5 text-violet-600" />
              <h3 className="mt-3 font-semibold text-slate-900">Scaling operations</h3>
              <p className="mt-2 text-sm text-slate-600">
                Add integrations and automation-ready architecture for growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Choose the right website plan</h2>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              Clear scope, practical delivery timelines, and simple upgrade path.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.title}
                className={`flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 ${
                  plan.featured
                    ? "border-slate-900 shadow-[0_20px_50px_-30px_rgba(2,6,23,0.7)]"
                    : "border-slate-200"
                }`}
              >
                {plan.featured && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-semibold text-slate-900">{plan.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{plan.subtitle}</p>

                <div className="mt-4 rounded-xl border border-cyan-100 bg-cyan-50/70 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-800">
                    Pricing
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">{plan.price}</p>
                  <p className="text-xs text-slate-600">{plan.priceNote}</p>
                </div>

                <div className="mt-3 space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">{plan.pages}</p>
                  <p>{plan.delivery}</p>
                </div>

                <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
                  {plan.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`mt-6 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition ${
                    plan.featured
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "border border-slate-300 text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-semibold">Scope and add-on note</p>
            <p className="mt-1">
              Any extra pages, advanced integrations, premium tools, paid assets,
              or new requirements outside the selected package are handled through
              a separate quotation before work starts.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Included in every website build</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Quality baseline stays strong across all plans.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {includeItems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <item.icon className="h-5 w-5 text-cyan-700" />
                <h3 className="mt-3 font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What happens after you choose a plan</h2>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Simple process, clear updates, and predictable launch.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Step {index + 1}</p>
                <p className="mt-2 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Ready to launch the right website for your business?</h2>
          <p className="mt-3 text-sm text-slate-300 md:text-base">
            Start with the plan that fits today and upgrade when your business grows.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/product/website/starter"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Get Starter Website
            </Link>
            <Link
              href="/product/website/business"
              className="rounded-lg border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-300"
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
        </div>
      </section>
    </main>
  );
}
