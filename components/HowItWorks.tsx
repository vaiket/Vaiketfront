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
    <section className="w-full bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            How Vaiket works
          </h2>
          <p className="mt-3 text-slate-500">
            Get started in minutes. Scale as you grow.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
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
