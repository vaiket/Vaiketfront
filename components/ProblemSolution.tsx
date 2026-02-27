import { CheckCircle, XCircle } from "lucide-react";

const problemItems = [
  "Leads scattered across WhatsApp, Email, and Forms",
  "Manual follow-ups waste time and energy",
  "No clear visibility of customers or pipeline",
  "Low conversions despite traffic and ad spend",
];

const solutionItems = [
  "Centralized leads and conversations in one place",
  "Automated WhatsApp, Email, and SMS workflows",
  "Built-in CRM with full customer visibility",
  "Faster response cycles and higher conversions",
];

export default function ProblemSolution() {
  return (
    <section className="vaiket-surface-bg relative w-full overflow-hidden py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="vaiket-grid-lines absolute inset-0 opacity-35" />
        <div className="absolute -left-16 top-8 h-56 w-56 rounded-full bg-cyan-200/35 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-emerald-200/35 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
            Problem to Solution
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Why growth teams switch to Vaiket
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            Replace disconnected tools with one system that unifies leads,
            messaging, and automation.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-rose-200/70 bg-white/80 p-6 shadow-[0_16px_50px_-35px_rgba(15,23,42,0.5)] backdrop-blur sm:p-8">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-rose-600">
              The Problem
            </p>
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              Growing businesses lose momentum with tool chaos
            </h3>

            <ul className="space-y-4">
              {problemItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50/70 px-3 py-3 text-sm text-slate-700"
                >
                  <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-emerald-200/80 bg-white/80 p-6 shadow-[0_16px_50px_-35px_rgba(15,23,42,0.5)] backdrop-blur sm:p-8">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
              The Solution
            </p>
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              Vaiket gives one connected growth operating system
            </h3>

            <ul className="space-y-4">
              {solutionItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-3 text-sm text-slate-800"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
