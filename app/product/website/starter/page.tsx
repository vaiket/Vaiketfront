import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Globe,
  LifeBuoy,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";

const includedItems = [
  {
    title: "Up to 5 high-impact pages",
    text: "Home, About, Services, Contact, and one custom page based on your business need.",
  },
  {
    title: "Mobile responsive design",
    text: "Website optimized for mobile, tablet, and desktop to keep user experience consistent.",
  },
  {
    title: "Lead capture setup",
    text: "Contact form and WhatsApp CTA placement for quick enquiry collection.",
  },
  {
    title: "Basic on-page SEO",
    text: "Page titles, meta descriptions, and structure setup for search-readiness.",
  },
  {
    title: "Performance-first build",
    text: "Clean layout and optimized front-end setup for fast loading and smooth navigation.",
  },
  {
    title: "Launch-ready deployment support",
    text: "Go-live assistance and checklist-based quality review before launch.",
  },
];

const idealForItems = [
  "New businesses launching online for the first time",
  "Local service providers who need trust and enquiries",
  "Founders replacing outdated one-page or basic templates",
  "Teams that need a quick and professional starter presence",
];

const deliverables = [
  "Design and content section structure for each page",
  "Business-focused copy placement guidance",
  "Lead form and WhatsApp button integration",
  "Basic legal and footer setup (policy links if provided)",
  "Pre-launch QA checklist and final handover",
];

const processSteps = [
  {
    step: "Step 1",
    title: "Requirement collection",
    text: "You share business details, service list, brand assets, and goals.",
  },
  {
    step: "Step 2",
    title: "Page structure and wireframe",
    text: "We finalize section flow for trust, clarity, and conversion intent.",
  },
  {
    step: "Step 3",
    title: "Design and development",
    text: "We build your pages with responsive layout and performance-first approach.",
  },
  {
    step: "Step 4",
    title: "Review and revision",
    text: "You review the website and we implement one standard revision cycle.",
  },
  {
    step: "Step 5",
    title: "Launch and handover",
    text: "Final QA, deployment support, and handover with next-step recommendations.",
  },
];

const notIncludedItems = [
  "Extra pages beyond 5 pages",
  "Custom dashboards or admin panels",
  "Complex API or third-party integrations",
  "Paid plugins, premium templates, or stock assets",
  "Advanced SEO, paid ads setup, and marketing automation",
];

const addOns = [
  "Additional page blocks or full extra pages",
  "Blog module and content migration",
  "Booking or appointment workflows",
  "Advanced analytics and event tracking",
  "CRM integration and automation setup",
];

const faqs = [
  {
    q: "Is the Rs. 4,999 price one-time or monthly?",
    a: "It is a one-time project fee for the Starter Website package. GST is charged extra.",
  },
  {
    q: "Can I add more features later?",
    a: "Yes. You can start with this package and add features through separate approved quotations.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard timeline is 5-7 working days after content and requirements are finalized.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes, basic post-launch support is included for minor fixes and launch stability checks.",
  },
];

export default function StarterWebsitePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-6 py-16 md:py-20">
        <div className="pointer-events-none absolute -left-20 -top-16 h-64 w-64 rounded-full bg-cyan-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-emerald-200/45 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-700">
              <Sparkles className="h-3.5 w-3.5" />
              Starter Pack
            </p>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Starter Website Package built for quick launch and real enquiries
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              This package is designed for businesses that need a professional,
              modern, and conversion-ready website without overcomplicating the
              first launch stage.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/product/website/request?plan=starter"
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Get Starter Website
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/company/contact-support"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Speak to Team
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
                <FileText className="h-4 w-4 text-cyan-700" />
                Starter Package Summary
              </p>
              <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-[11px] font-semibold text-cyan-700">
                One-time
              </span>
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-100 bg-cyan-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-800">
                Package price
              </p>
              <p className="mt-1 text-3xl font-extrabold text-slate-900">Rs. 4,999</p>
              <p className="text-xs text-slate-600">GST extra</p>
            </div>

            <div className="mt-4 space-y-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="inline-flex items-center gap-2 font-medium text-slate-900">
                <Globe className="h-4 w-4 text-cyan-700" />
                Up to 5 pages included
              </p>
              <p className="inline-flex items-center gap-2 font-medium text-slate-900">
                <Clock3 className="h-4 w-4 text-emerald-600" />
                Delivery in 5-7 working days
              </p>
              <p className="inline-flex items-center gap-2 font-medium text-slate-900">
                <ShieldCheck className="h-4 w-4 text-indigo-600" />
                1 standard revision cycle
              </p>
              <p className="inline-flex items-center gap-2 font-medium text-slate-900">
                <LifeBuoy className="h-4 w-4 text-amber-600" />
                Basic launch support included
              </p>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Extra pages, integrations, premium assets, and additional scope
              are handled through separate quotation approval.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold md:text-3xl">Everything included in Starter Pack</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
            Core deliverables required for a professional business website launch.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          <h2 className="text-2xl font-bold md:text-3xl">How the starter workflow runs</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
            Clear process with predictable updates from kickoff to launch.
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
            Add-ons are available when you need more than starter scope.
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
            Any extra requirement outside starter scope is quoted separately and
            started only after your approval.
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Starter Package FAQ</h2>
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
          <h2 className="text-3xl font-bold">Ready to launch your starter website?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Start with Starter Pack today, then scale with business and enterprise
            upgrades when your growth stage changes.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/product/website/request?plan=starter"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Get Starter Website
            </Link>
            <Link
              href="/product/website"
              className="rounded-lg border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-300"
            >
              Compare All Website Plans
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
