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
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            Powerful product features built for scale
          </h2>
          <p className="mt-3 text-slate-500">
            Everything you need to manage conversations, leads and growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
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
