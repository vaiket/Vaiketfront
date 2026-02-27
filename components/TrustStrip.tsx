import { Building2, CheckCircle2, FileCheck, ShieldCheck, Sparkles } from "lucide-react";
import type { ComponentType } from "react";

type TrustTone = "cyan" | "emerald" | "amber";

type TrustItem = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  tone: TrustTone;
};

const trustItems: TrustItem[] = [
  {
    title: "Startup India Recognized",
    description:
      "Officially recognized startup with active Startup India status and compliance-ready business profile.",
    icon: ShieldCheck,
    tone: "cyan",
  },
  {
    title: "Incorporated Company",
    description:
      "Legally incorporated business entity with proper company records for enterprise and partner onboarding.",
    icon: Building2,
    tone: "amber",
  },
  {
    title: "MSME / Udyam Registered",
    description:
      "Government-recognized MSME under Udyam registration for trusted operations and vendor credibility.",
    icon: FileCheck,
    tone: "emerald",
  },
];

function toneClasses(tone: TrustTone) {
  if (tone === "cyan") {
    return {
      iconWrap: "bg-cyan-100 text-cyan-700",
      ring: "group-hover:border-cyan-300/70",
      tag: "bg-cyan-100 text-cyan-700",
    };
  }

  if (tone === "amber") {
    return {
      iconWrap: "bg-amber-100 text-amber-700",
      ring: "group-hover:border-amber-300/70",
      tag: "bg-amber-100 text-amber-700",
    };
  }

  return {
    iconWrap: "bg-emerald-100 text-emerald-700",
    ring: "group-hover:border-emerald-300/70",
    tag: "bg-emerald-100 text-emerald-700",
  };
}

export default function TrustStrip() {
  return (
    <section className="vaiket-surface-bg relative w-full overflow-hidden py-12 sm:py-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="vaiket-grid-lines absolute inset-0 opacity-35" />
        <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-cyan-200/35 blur-3xl" />
        <div className="absolute right-0 top-8 h-48 w-48 rounded-full bg-emerald-200/35 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-800 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Verified Business Credentials
          </div>
          <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Registered and Recognized Business
          </h3>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            Vaiket is backed by strong regulatory trust signals including Startup India recognition,
            incorporation status, and MSME/Udyam registration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => {
            const tone = toneClasses(item.tone);
            const Icon = item.icon;

            return (
              <div key={item.title}>
                <div
                  className={`group h-full rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-24px_rgba(15,23,42,0.5)] ${tone.ring}`}
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${tone.iconWrap}`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <h4 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>

                  <div className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${tone.tag}`}>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified Status
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600">
            Certificate and registration details are available for partner and enterprise verification.
          </p>
        </div>
      </div>
    </section>
  );
}
