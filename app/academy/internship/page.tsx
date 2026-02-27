import Link from "next/link";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Laptop2,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";

const keyStats = [
  { label: "Program Duration", value: "8-12 Weeks", icon: Clock3 },
  { label: "Mode", value: "Live + Project Based", icon: Laptop2 },
  { label: "Mentorship", value: "Weekly Reviews", icon: Users },
  { label: "Outcome", value: "Portfolio + Certificate", icon: Award },
];

const tracks = [
  {
    title: "Web Development",
    text: "Build modern responsive websites and production-ready UI flows with strong frontend fundamentals.",
  },
  {
    title: "Automation and CRM Ops",
    text: "Work on lead pipelines, CRM setup, and practical automation systems used in real business teams.",
  },
  {
    title: "Digital Marketing Execution",
    text: "Run campaign structure, landing page flow, and performance reporting with conversion-oriented thinking.",
  },
];

const outcomes = [
  "Real client-style assignments with weekly review checkpoints",
  "Practical understanding of tools, delivery workflows, and execution standards",
  "Capstone project ready for portfolio and job interviews",
  "Certificate with performance feedback and recommendation summary",
];

const process = [
  {
    step: "Step 1",
    title: "Application",
    text: "Submit your basic profile and interest area for screening.",
  },
  {
    step: "Step 2",
    title: "Short assessment",
    text: "Complete a simple aptitude or skill-fit task based on selected track.",
  },
  {
    step: "Step 3",
    title: "Mentor interaction",
    text: "Attend a short call to align expectations and batch timing.",
  },
  {
    step: "Step 4",
    title: "Onboarding",
    text: "Receive roadmap, assignments, and project workflow guidelines.",
  },
];

const faqs = [
  {
    q: "Is this internship beginner friendly?",
    a: "Yes. Beginners can join if they are ready for disciplined weekly practice and review cycles.",
  },
  {
    q: "Will I get live mentorship?",
    a: "Yes. Every batch includes mentor-led sessions and feedback on assignments and projects.",
  },
  {
    q: "Is there a certificate?",
    a: "Yes. Eligible interns receive a completion certificate with performance notes after final evaluation.",
  },
  {
    q: "Do you provide placement guarantee?",
    a: "No direct guarantee. The focus is building strong practical skills and portfolio quality for opportunities.",
  },
];

export default function InternshipPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-4 py-14 md:px-6 md:py-18">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-cyan-200/45 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-emerald-200/45 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-1.5 text-xs font-semibold text-cyan-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Vaiket Academy Internship
            </p>
            <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight md:text-5xl md:leading-[1.05]">
              Build real-world skills with guided internship projects
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              This internship is designed for learners who want execution-level
              exposure, mentor feedback, and portfolio-ready project outcomes.
              You will learn by building, reviewing, and improving every week.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/academy/internship/apply"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Apply for Internship
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/academy/course"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Explore Courses
              </Link>
            </div>

            <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {[
                "Batch-based structure with weekly checkpoints",
                "Hands-on tasks instead of only recorded lessons",
                "Mentor review and practical feedback loops",
                "Final showcase project for portfolio proof",
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
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Rocket className="h-3.5 w-3.5" />
              Internship Snapshot
            </p>
            <div className="mt-4 grid gap-3">
              {keyStats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <stat.icon className="h-3.5 w-3.5 text-cyan-700" />
                    {stat.label}
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
              Seats are limited per batch to maintain mentor quality and feedback depth.
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Choose your internship track</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Pick the track aligned with your career direction and build work-ready execution ability.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {tracks.map((track) => (
              <article key={track.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="inline-flex rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                  Track
                </p>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{track.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{track.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 md:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="inline-flex items-center gap-2 text-xl font-bold text-slate-900">
              <BriefcaseBusiness className="h-5 w-5 text-cyan-700" />
              Internship outcomes
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
              {outcomes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-bold text-slate-900">Selection and onboarding process</h3>
            <div className="mt-4 space-y-3">
              {process.map((item) => (
                <div key={item.step} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{item.step}</p>
                  <p className="mt-1 font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-6">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Internship FAQ</h2>
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

      <section className="bg-slate-900 px-4 py-14 text-white md:px-6">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Ready to join the next internship batch?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Apply now and start building real project confidence with mentor support.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/academy/internship/apply"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Apply for Internship
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
