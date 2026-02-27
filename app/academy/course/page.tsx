import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Layers3,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const highlights = [
  { label: "Cohort Duration", value: "6-12 Weeks", icon: Clock3 },
  { label: "Delivery", value: "Live + Hands-on", icon: Users },
  { label: "Focus", value: "Portfolio + Execution", icon: Target },
  { label: "Tracks", value: "Career-Oriented", icon: Layers3 },
];

const tracks = [
  {
    title: "Web Development Bootcamp",
    level: "Foundation to Project",
    text: "Frontend fundamentals, responsive design, components, deployment, and real portfolio pages.",
  },
  {
    title: "Digital Marketing and Funnels",
    level: "Performance and Strategy",
    text: "Campaign setup, funnel structure, ad-copy systems, lead tracking, and conversion optimization basics.",
  },
  {
    title: "Automation and CRM Systems",
    level: "Business Operations",
    text: "Lead flow automation, CRM setup, WhatsApp and email journeys, and practical workflow implementation.",
  },
];

const pricingPlans = [
  {
    name: "Foundation Cohort",
    price: "Rs. 6,999",
    note: "One-time fee",
    duration: "4-6 weeks",
    points: [
      "Core concepts and guided practice",
      "Weekly live sessions",
      "Doubt support and assignments",
      "Completion certificate",
    ],
    cta: "Join Foundation",
  },
  {
    name: "Career Cohort",
    price: "Rs. 18,999",
    note: "Most recommended",
    duration: "8-10 weeks",
    featured: true,
    points: [
      "Everything in Foundation",
      "Project-based execution tracks",
      "Weekly mentor review",
      "Portfolio and case-study build",
    ],
    cta: "Join Career Cohort",
  },
  {
    name: "Job Accelerator",
    price: "Rs. 34,999",
    note: "Advanced support",
    duration: "10-12 weeks",
    points: [
      "Everything in Career Cohort",
      "Advanced capstone implementation",
      "Interview and profile preparation",
      "Priority mentor support",
    ],
    cta: "Join Job Accelerator",
  },
];

const process = [
  {
    step: "Step 1",
    title: "Choose track",
    text: "Select your target domain and preferred learning outcome.",
  },
  {
    step: "Step 2",
    title: "Screening call",
    text: "A short call to align your current level and right cohort.",
  },
  {
    step: "Step 3",
    title: "Enrollment",
    text: "Confirm seat, onboarding details, and batch schedule.",
  },
  {
    step: "Step 4",
    title: "Live execution",
    text: "Attend sessions, submit assignments, and build project proof.",
  },
];

const faqs = [
  {
    q: "Are these courses beginner-friendly?",
    a: "Yes. Foundation and Career cohorts are designed to support beginners with structured progression.",
  },
  {
    q: "Is this self-paced or live?",
    a: "It is hybrid. Live sessions plus assignments and guided project implementation.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes. Course completion certificate is provided after assignment and project submission.",
  },
  {
    q: "Can I start from lower plan and upgrade later?",
    a: "Yes. You can start with Foundation and upgrade to Career or Job Accelerator in next batch.",
  },
];

export default function CoursePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-sky-50 via-white to-cyan-50 px-4 py-14 md:px-6 md:py-18">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-cyan-200/45 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Vaiket Academy Courses
            </p>
            <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight md:text-5xl md:leading-[1.05]">
              Learn job-ready skills with project-first guided cohorts
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Courses are designed for real execution, not only theory. Build practical
              confidence with live sessions, assignments, and mentor reviews.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/academy/course/apply"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Join Next Course Batch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/academy/internship"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Explore Internship
              </Link>
            </div>

            <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {[
                "Live cohorts with weekly assignment review",
                "Project-based outcomes for portfolio proof",
                "Mentor support for implementation clarity",
                "Clear upgrade path from beginner to advanced",
              ].map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-46px_rgba(15,23,42,0.55)]">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
              <BookOpen className="h-3.5 w-3.5" />
              Course Snapshot
            </p>
            <div className="mt-4 grid gap-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <item.icon className="h-3.5 w-3.5 text-cyan-700" />
                    {item.label}
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Choose your learning track</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Select a track aligned with the role or freelance path you want to build.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {tracks.map((track) => (
              <article key={track.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="inline-flex rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                  {track.level}
                </p>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{track.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{track.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 md:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Recommended course pricing model</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Three-tier pricing keeps entry affordable and gives clear upgrade path.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-2xl border bg-white p-6 shadow-sm ${
                  plan.featured
                    ? "border-slate-900 shadow-[0_22px_60px_-38px_rgba(2,6,23,0.72)]"
                    : "border-slate-200"
                }`}
              >
                {plan.featured && (
                  <span className="mb-3 inline-flex rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{plan.duration}</p>

                <div className="mt-4 rounded-xl border border-cyan-100 bg-cyan-50/80 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-800">
                    Pricing
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-slate-900">{plan.price}</p>
                  <p className="text-xs text-slate-600">{plan.note}</p>
                </div>

                <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
                  {plan.points.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/academy/course/apply"
                  className={`mt-5 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    plan.featured
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {plan.cta}
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Scholarship and installment support can be added for top-performing or financially constrained learners.
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">How enrollment works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {process.map((item) => (
              <div key={item.step} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{item.step}</p>
                <p className="mt-1.5 font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1.5 text-xs leading-5 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 md:px-6">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Course FAQ</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="rounded-xl border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-4 py-14 text-white md:px-6">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Ready to join the next course cohort?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Apply now to get batch details, mentor call, and track recommendation.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/academy/course/apply"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Apply for Course
            </Link>
            <Link
              href="/academy/internship"
              className="rounded-xl border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-300"
            >
              Check Internship
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
