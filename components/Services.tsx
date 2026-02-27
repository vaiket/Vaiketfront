import Link from "next/link";
import {
  Layout,
  Mail,
  Megaphone,
  MessageSquare,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

const services: Service[] = [
  {
    title: "AI Email Automation",
    description: "Send personalized emails that convert leads automatically.",
    icon: Mail,
    href: "/product/ai-email-automation",
  },
  {
    title: "WhatsApp Automation",
    description: "Automate customer replies, follow-ups and campaigns.",
    icon: MessageSquare,
    href: "/product/whatsapp",
  },
  {
    title: "SMS and RCS Messaging",
    description: "High-open alerts, offers and updates for your audience.",
    icon: Smartphone,
    href: "/product/sms-and-rcs",
  },
  {
    title: "CRM and Lead Management",
    description: "Track and convert leads from one clean dashboard.",
    icon: Users,
    href: "/product/crm-and-leads",
  },
  {
    title: "Website Development",
    description: "Fast, SEO-ready and conversion-focused websites.",
    icon: Layout,
    href: "/product/website",
  },
  {
    title: "Digital Marketing",
    description: "Data-driven campaigns to grow traffic and sales.",
    icon: Megaphone,
    href: "/product/digital-marketing",
  },
];

export default function Services() {
  return (
    <section className="vaiket-surface-bg relative w-full overflow-hidden py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="vaiket-grid-lines absolute inset-0 opacity-35" />
        <div className="absolute -left-20 top-12 h-56 w-56 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
            Core Services
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Services designed to grow your business
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Everything you need to acquire, engage and convert customers.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-[0_12px_34px_-24px_rgba(15,23,42,0.45)] transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_22px_48px_-28px_rgba(14,116,144,0.42)]"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-cyan-700">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
