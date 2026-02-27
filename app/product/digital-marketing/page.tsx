import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Clock3,
  Funnel,
  Gauge,
  LineChart,
  Megaphone,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  XCircle,
} from "lucide-react";

const serviceBlocks = [
  {
    icon: Search,
    title: "Google Search Campaigns",
    text: "High-intent lead acquisition targeting buyers already searching for your service.",
  },
  {
    icon: Megaphone,
    title: "Meta Ads Execution",
    text: "Audience-driven campaigns across Facebook and Instagram with creative testing.",
  },
  {
    icon: Funnel,
    title: "Landing Page Funnel",
    text: "Conversion-focused landing flow built to collect qualified enquiries, not just traffic.",
  },
  {
    icon: BarChart3,
    title: "Tracking and Attribution",
    text: "Pixel, analytics, and event setup so every lead source is measurable and visible.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp and Email Follow-up",
    text: "Instant automation after lead capture to reduce drop-offs and improve response speed.",
  },
  {
    icon: LineChart,
    title: "Weekly Optimization",
    text: "Campaign tuning based on cost per lead, lead quality, and conversion signals.",
  },
];

const idealFor = [
  "Service businesses focused on monthly lead volume",
  "Teams running ads but getting weak conversion quality",
  "Local and regional brands scaling beyond referrals",
  "Founders who need measurable growth with clear reporting",
];

const processSteps = [
  {
    step: "Step 1",
    title: "Audit and strategy",
    text: "We review your offer, audience, funnel gaps, and define channel strategy.",
  },
  {
    step: "Step 2",
    title: "Campaign and tracking setup",
    text: "Ad account structure, events, and lead tracking are configured for clean measurement.",
  },
  {
    step: "Step 3",
    title: "Launch and data collection",
    text: "Campaigns go live with controlled testing to identify winning audiences and creatives.",
  },
  {
    step: "Step 4",
    title: "Optimization loop",
    text: "Budget, creatives, and targeting are optimized weekly using real performance data.",
  },
  {
    step: "Step 5",
    title: "Scale and automation",
    text: "Best-performing campaigns are scaled and connected with follow-up automation.",
  },
];

const deliverables = [
  "Campaign strategy and execution plan",
  "Google and Meta ad setup with structure",
  "Landing page recommendation or build guidance",
  "Lead tracking dashboard and reporting rhythm",
  "Funnel improvement suggestions every cycle",
  "Automation integration readiness for lead follow-up",
];

const notIncluded = [
  "Ad spend budget (paid directly by client)",
  "Creative production at large studio scale",
  "Enterprise CRM customization projects",
  "Guaranteed fixed number of leads",
  "Third-party paid tools and premium assets",
];

const faqs = [
  {
    q: "Is ad spend included in this service?",
    a: "No. Media budget is separate and paid from your ad account. We manage strategy and execution.",
  },
  {
    q: "How fast can we start campaigns?",
    a: "Standard setup and launch timeline is 5 to 7 working days after onboarding and access approval.",
  },
  {
    q: "Do you support both Google and Meta?",
    a: "Yes. We can run one or both channels based on your audience intent and acquisition goals.",
  },
  {
    q: "Can this connect to WhatsApp and email follow-ups?",
    a: "Yes. We can connect lead capture with automation workflows to improve conversion speed.",
  },
];

export default function DigitalMarketingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-emerald-200/45 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.06fr_0.94fr] md:py-20 lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/90 bg-white/90 px-4 py-1.5 text-xs font-semibold text-cyan-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Performance Digital Marketing by Vaiket
            </p>

            <h1 className="mt-5 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-[3.35rem] lg:leading-[1.04]">
              Turn ad spend into a predictable lead pipeline with a conversion-first system
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 md:text-base md:leading-7">
              We do not run random ads. We build a measurable lead engine with
              paid traffic, landing conversion, and automated follow-up so your
              team gets better qualified leads and faster response flow.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-18px_rgba(15,23,42,0.72)] transition hover:bg-slate-800"
              >
                Start Lead Campaign
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/company/contact-support"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
              >
                Book Strategy Call
              </Link>
            </div>

            <div className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
              {[
                "Google and Meta campaign execution",
                "Landing funnel aligned to your offer",
                "Tracking-first setup with clean reporting",
                "Automation-ready lead handoff",
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
                  <Workflow className="h-4 w-4 text-cyan-600" />
                  Growth Engine Snapshot
                </p>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  Live Workflow
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Core journey
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Ads to landing to lead capture to automation to sales call
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                    <p className="text-slate-500">Setup timeline</p>
                    <p className="mt-1 text-base font-bold text-slate-900">5-7 days</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                    <p className="text-slate-500">Reporting cadence</p>
                    <p className="mt-1 text-base font-bold text-slate-900">Weekly</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                    <p className="text-slate-500">Channel stack</p>
                    <p className="mt-1 text-base font-bold text-slate-900">Google + Meta</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                    <p className="text-slate-500">Lead handoff</p>
                    <p className="mt-1 text-base font-bold text-slate-900">Automation-ready</p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                  <p className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                    <Gauge className="h-3.5 w-3.5 text-emerald-600" />
                    Performance principle
                  </p>
                  <p className="mt-1.5">
                    Optimize for lead quality, cost efficiency, and faster response speed.
                  </p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-5 -left-4 hidden rounded-xl border border-cyan-200 bg-cyan-50/95 px-3 py-2 text-xs font-semibold text-cyan-700 shadow-sm sm:block">
              <span className="inline-flex items-center gap-1.5">
                <Bot className="h-3.5 w-3.5" />
                Smart follow-up automation included
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What we run for your growth</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Full-funnel digital marketing execution with measurement and optimization discipline.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceBlocks.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <item.icon className="h-5 w-5 text-cyan-700" />
                <h3 className="mt-3 font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Who this is best for</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Built for businesses that need consistent lead flow with transparent performance signals.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {idealFor.map((item) => (
              <div
                key={item}
                className="inline-flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">How the lead engine works</h2>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Simple execution framework with clear visibility at every stage.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {processSteps.map((step) => (
              <article key={step.step} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{step.step}</p>
                <p className="mt-1.5 text-sm font-semibold text-slate-900">{step.title}</p>
                <p className="mt-1.5 text-xs leading-5 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="inline-flex items-center gap-2 text-xl font-bold text-slate-900">
              <Target className="h-5 w-5 text-emerald-600" />
              What is included
            </h3>
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
            <h3 className="inline-flex items-center gap-2 text-xl font-bold text-slate-900">
              <ShieldCheck className="h-5 w-5 text-rose-600" />
              Scope clarity
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
              {notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
              Extra requirements outside agreed scope are handled through separate quotation approval.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Common questions</h2>

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

      <section className="bg-slate-900 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Ready to build your digital marketing engine?</h2>
          <p className="mt-3 text-sm text-slate-300 md:text-base">
            Start with a focused campaign structure and scale through data-backed optimization.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/get-started"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Start Lead Campaign
            </Link>
            <Link
              href="/company/contact-support"
              className="rounded-lg border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-300"
            >
              Talk to an Expert
            </Link>
          </div>

          <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-400">
            <Clock3 className="h-3.5 w-3.5" />
            Typical onboarding starts within 24 to 48 hours after confirmation.
          </p>
        </div>
      </section>
    </main>
  );
}
