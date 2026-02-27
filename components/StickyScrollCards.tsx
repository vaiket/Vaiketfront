"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import {
  ArrowRight,
  Layout,
  Mail,
  Megaphone,
  MessageSquare,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";

type CardTone = "cyan" | "emerald" | "amber" | "violet" | "blue" | "teal";

type ServiceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: CardTone;
  tag: string;
  cta: string;
  href: string;
  points: string[];
};

const cards: ServiceCard[] = [
  {
    title: "AI Email Automation",
    description:
      "Launch personalized campaigns with smart follow-ups that move leads faster through your funnel.",
    icon: Mail,
    tone: "cyan",
    tag: "Email AI",
    cta: "Explore Email AI",
    href: "/product/ai-email-automation",
    points: ["Smart Segments", "Auto Follow-ups", "Higher Reply Rate"],
  },
  {
    title: "WhatsApp Automation",
    description:
      "Automate chats, qualification flows, and campaign journeys directly on WhatsApp.",
    icon: MessageSquare,
    tone: "emerald",
    tag: "WhatsApp",
    cta: "Explore WhatsApp",
    href: "/product/whatsapp",
    points: ["Instant Replies", "Lead Qualification", "Campaign Journeys"],
  },
  {
    title: "SMS and RCS Messaging",
    description:
      "Deliver alerts, reminders, and offers with high open rates across mobile channels.",
    icon: Smartphone,
    tone: "amber",
    tag: "SMS + RCS",
    cta: "Explore SMS + RCS",
    href: "/product/sms-and-rcs",
    points: ["Fast Delivery", "Alerts + OTP", "Promotional Broadcasts"],
  },
  {
    title: "CRM and Lead Management",
    description:
      "Track every lead, owner, and stage in a single clean system for better conversion control.",
    icon: Users,
    tone: "violet",
    tag: "CRM",
    cta: "Explore CRM",
    href: "/product/crm-and-leads",
    points: ["Unified Pipeline", "Team Assignment", "Conversion Tracking"],
  },
  {
    title: "Website Development",
    description:
      "Build high-speed, conversion-focused websites designed for search visibility and growth.",
    icon: Layout,
    tone: "blue",
    tag: "Website",
    cta: "Explore Website",
    href: "/product/website",
    points: ["SEO Ready", "High Performance", "Mobile First UX"],
  },
  {
    title: "Digital Marketing",
    description:
      "Scale paid growth with better audience targeting, creative testing, and ROI tracking.",
    icon: Megaphone,
    tone: "teal",
    tag: "Marketing",
    cta: "Explore Marketing",
    href: "/product/digital-marketing",
    points: ["Meta + Google Ads", "Creative Testing", "ROI Dashboard"],
  },
];

function toneStyles(tone: CardTone) {
  const styles = {
    cyan: {
      glow: "from-cyan-200/60 via-cyan-100/20 to-transparent",
      badge: "bg-cyan-100 text-cyan-700",
      icon: "bg-cyan-100 text-cyan-700",
      border: "border-cyan-200/80",
    },
    emerald: {
      glow: "from-emerald-200/60 via-emerald-100/20 to-transparent",
      badge: "bg-emerald-100 text-emerald-700",
      icon: "bg-emerald-100 text-emerald-700",
      border: "border-emerald-200/80",
    },
    amber: {
      glow: "from-amber-200/60 via-amber-100/20 to-transparent",
      badge: "bg-amber-100 text-amber-700",
      icon: "bg-amber-100 text-amber-700",
      border: "border-amber-200/80",
    },
    violet: {
      glow: "from-violet-200/60 via-violet-100/20 to-transparent",
      badge: "bg-violet-100 text-violet-700",
      icon: "bg-violet-100 text-violet-700",
      border: "border-violet-200/80",
    },
    blue: {
      glow: "from-blue-200/60 via-blue-100/20 to-transparent",
      badge: "bg-blue-100 text-blue-700",
      icon: "bg-blue-100 text-blue-700",
      border: "border-blue-200/80",
    },
    teal: {
      glow: "from-teal-200/60 via-teal-100/20 to-transparent",
      badge: "bg-teal-100 text-teal-700",
      icon: "bg-teal-100 text-teal-700",
      border: "border-teal-200/80",
    },
  };

  return styles[tone];
}

export default function StickyScrollCards() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll progress for this section only.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Convert section scroll progress to active card index.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.max(0, Math.min(0.999999, latest));
    const next = Math.min(cards.length - 1, Math.floor(clamped * cards.length));
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const progress = ((activeIndex + 1) / cards.length) * 100;
  const sectionHeightVh = Math.max((cards.length + 1) * 78, 480);
  const activeCard = cards[activeIndex];
  const tone = toneStyles(activeCard.tone);

  return (
    <section className="relative isolate w-full overflow-x-clip bg-gradient-to-b from-[#e8f5ee] via-[#f1f7f4] to-[#f7faf8] py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="vaiket-grid-lines absolute inset-0 opacity-35" />
        <div className="absolute -left-20 top-8 h-56 w-56 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
            Core Services
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Sticky Scroll Service Cards
          </h2>
          <p className="mx-auto mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Scroll to reveal each service card with smooth premium transitions.
          </p>
        </div>
      </div>

      <div
        ref={sectionRef}
        className="relative z-10"
        style={{ height: `${sectionHeightVh}vh` }}
      >
        <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] items-center">
          <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <div className="mb-5 rounded-xl border border-slate-200 bg-white/85 px-4 py-3 backdrop-blur">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                  Scroll Progress
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {activeIndex + 1} / {cards.length}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-emerald-600"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
                />
              </div>
            </div>

            <div className="relative mx-auto min-h-[440px] w-full max-w-5xl sm:min-h-[500px]">
              <AnimatePresence initial={false} mode="sync">
                <motion.article
                  key={activeCard.title}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                      : { opacity: 0, y: 36, scale: 0.985, filter: "blur(6px)" }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0, y: 0, scale: 1, filter: "blur(0px)" }
                      : { opacity: 0, y: -36, scale: 0.985, filter: "blur(6px)" }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`absolute inset-0 overflow-hidden rounded-3xl border bg-white/95 p-6 shadow-[0_30px_80px_-38px_rgba(15,23,42,0.45)] sm:p-8 ${tone.border}`}
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone.glow}`} />

                  <div className="relative">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${tone.icon}`}>
                        <activeCard.icon className="h-6 w-6" />
                      </div>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${tone.badge}`}>
                        {activeCard.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.7rem]">
                      {activeCard.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                      {activeCard.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {activeCard.points.map((point) => (
                        <span
                          key={point}
                          className="inline-flex rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700"
                        >
                          {point}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href={activeCard.href}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800"
                      >
                        {activeCard.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/get-started?service=${encodeURIComponent(activeCard.tag)}`}
                        className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        Start with this service
                      </Link>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {cards.map((card, i) => (
                <span
                  key={card.title}
                  className={`h-2.5 rounded-full transition-all ${
                    i <= activeIndex ? "w-7 bg-slate-900" : "w-2.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <p className="mt-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              Keep scrolling to reveal each card
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
