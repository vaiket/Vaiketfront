import {
  Mail,
  MessageSquare,
  Smartphone,
  Layout,
  Megaphone,
  Users
} from "lucide-react";

const services = [
  {
    title: "AI Email Automation",
    desc: "Send personalized emails that convert leads automatically.",
    icon: Mail,
  },
  {
    title: "WhatsApp Automation",
    desc: "Automate customer replies, follow-ups and campaigns.",
    icon: MessageSquare,
  },
  {
    title: "SMS & RCS Messaging",
    desc: "High-open messages for alerts, offers and updates.",
    icon: Smartphone,
  },
  {
    title: "CRM & Lead Management",
    desc: "Manage, track and convert leads from one dashboard.",
    icon: Users,
  },
  {
    title: "Website Development",
    desc: "Fast, SEO-ready and conversion-focused websites.",
    icon: Layout,
  },
  {
    title: "Digital Marketing",
    desc: "Data-driven marketing to grow traffic and sales.",
    icon: Megaphone,
  },
];

export default function Services() {
  return (
    <section className="w-full bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            Services designed to grow your business
          </h2>
          <p className="mt-3 text-slate-500">
            Everything you need to acquire, engage and convert customers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <item.icon className="mb-4 h-6 w-6 text-slate-700 transition-colors group-hover:text-slate-900" />
              <h3 className="mb-2 text-lg font-medium text-slate-900">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}