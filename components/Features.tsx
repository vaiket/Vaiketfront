import {
  Inbox,
  Workflow,
  LineChart,
  FileText,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Unified Inbox",
    desc: "Manage WhatsApp, Email and SMS from one place.",
    icon: Inbox,
  },
  {
    title: "Workflow Automation",
    desc: "Automate replies, follow-ups and campaigns.",
    icon: Workflow,
  },
  {
    title: "Lead Tracking",
    desc: "Track leads from first contact to conversion.",
    icon: LineChart,
  },
  {
    title: "Custom Templates",
    desc: "Create reusable email and message templates.",
    icon: FileText,
  },
  {
    title: "Analytics & Reports",
    desc: "Measure engagement, delivery and conversions.",
    icon: BarChart3,
  },
  {
    title: "Secure Access Control",
    desc: "Role-based access to keep your data protected.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section className="vaiket-surface-bg relative w-full overflow-hidden py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="vaiket-grid-lines absolute inset-0 opacity-35" />
        <div className="absolute right-0 top-12 h-52 w-52 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Powerful product features built for scale
          </h2>
          <p className="mt-3 text-slate-600">
            Everything you need to manage conversations, leads and growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_14px_36px_-30px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_52px_-32px_rgba(15,23,42,0.45)]"
            >
              <item.icon className="mb-4 h-6 w-6 text-slate-800 transition-colors group-hover:text-slate-900" />

              <h3 className="mb-2 text-lg font-medium text-slate-900">
                {item.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
