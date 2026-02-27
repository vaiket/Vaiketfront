import { Plug, Settings, Inbox, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Connect your channels",
    desc: "Link WhatsApp, Email and SMS in one place.",
    icon: Plug,
  },
  {
    step: "02",
    title: "Set automations",
    desc: "Create workflows, replies and follow-ups.",
    icon: Settings,
  },
  {
    step: "03",
    title: "Manage leads & conversations",
    desc: "Track every interaction from one dashboard.",
    icon: Inbox,
  },
  {
    step: "04",
    title: "Analyze & grow",
    desc: "Measure performance and improve conversions.",
    icon: TrendingUp,
  },
];

export default function HowItWorks() {
  return (
    <section className="vaiket-surface-bg relative w-full overflow-hidden py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="vaiket-grid-lines absolute inset-0 opacity-35" />
        <div className="absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-cyan-200/28 blur-3xl" />
        <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-amber-200/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            How Vaiket works
          </h2>
          <p className="mt-3 text-slate-600">
            Get started in minutes. Scale as you grow.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_14px_36px_-30px_rgba(15,23,42,0.45)] transition hover:-translate-y-1 hover:shadow-[0_24px_52px_-32px_rgba(15,23,42,0.45)]"
            >
              <span className="absolute right-4 top-4 text-sm font-semibold text-slate-300">
                {item.step}
              </span>

              <item.icon className="mb-4 h-6 w-6 text-slate-800" />

              <h3 className="mb-2 text-lg font-medium text-slate-900">
                {item.title}
              </h3>

              <p className="text-sm text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
