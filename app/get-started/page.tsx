"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Manrope, Sora } from "next/font/google";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  websiteStatus: string;
  goals: string[];
  channels: string[];
};

const headingFont = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const websiteOptions = [
  "Yes, we already have a website",
  "No, we need a website first",
  "We want to begin without a website",
];

const goalOptions = [
  "Capture more qualified leads",
  "Automate follow-up journeys",
  "Improve lead tracking and visibility",
  "Increase ad conversion efficiency",
];

const channelOptions = [
  "WhatsApp Automation",
  "AI Email Automation",
  "SMS Campaigns",
  "RCS Messaging",
];

export default function GetStartedPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    websiteStatus: "",
    goals: [],
    channels: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const completedSteps = useMemo(() => {
    const checks = [
      Boolean(form.name && form.email && form.phone),
      Boolean(form.websiteStatus),
      form.goals.length > 0,
      form.channels.length > 0,
    ];

    return checks.filter(Boolean).length;
  }, [form]);

  const progress = Math.round((completedSteps / 4) * 100);

  const toggleValue = (key: "goals" | "channels", value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Lead save failed");
      }

      router.push(`/recommended-plan?lead_id=${data.lead_id}`);
    } catch {
      setError("Submission failed. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`${bodyFont.className} relative min-h-screen overflow-hidden bg-[#0b1220] text-slate-100`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,_rgba(20,184,166,0.26),_transparent_35%),radial-gradient(circle_at_88%_10%,_rgba(59,130,246,0.2),_transparent_28%),radial-gradient(circle_at_82%_88%,_rgba(245,158,11,0.16),_transparent_34%)]" />

      <section className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-3 py-2 transition hover:border-cyan-300/60 hover:bg-white/15"
            aria-label="Vaiket Home"
          >
            <Image
              src="/logo/vaiket-premium.svg"
              alt="Vaiket"
              width={520}
              height={140}
              priority
              className="h-12 w-auto sm:h-14"
            />
            <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 sm:inline">
              Growth Setup
            </span>
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure and private onboarding
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] xl:gap-8">
          <aside className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-cyan-950/65 p-6 shadow-[0_24px_70px_-32px_rgba(8,145,178,0.55)] backdrop-blur sm:p-8 lg:p-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              <Sparkles className="h-3.5 w-3.5" />
              Trusted By Growing Teams
            </p>

            <h1
              className={`${headingFont.className} mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.6rem]`}
            >
              Get your custom automation roadmap in 2 minutes
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Share your business goals and we will suggest the right mix of
              WhatsApp, AI Email, and CRM automation with a clear starting path.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-xl font-extrabold text-cyan-200">2 min</p>
                <p className="mt-1 text-xs font-semibold text-slate-300">Quick completion</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-xl font-extrabold text-emerald-200">Plan Fit</p>
                <p className="mt-1 text-xs font-semibold text-slate-300">Based on your goals</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-xl font-extrabold text-amber-200">Private</p>
                <p className="mt-1 text-xs font-semibold text-slate-300">Safe data handling</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {[
                "Personalized recommendation based on real requirements",
                "No payment details needed on this step",
                "Clear implementation priority after submission",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" />
                  <p className="text-sm font-medium text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </aside>

          <form
            onSubmit={submitForm}
            className="rounded-3xl border border-white/10 bg-white p-5 text-slate-900 shadow-[0_24px_70px_-28px_rgba(14,116,144,0.45)] sm:p-7"
          >
            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-600">Setup progress</p>
                <p className="text-sm font-extrabold text-slate-900">{completedSteps}/4</p>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-600 via-sky-600 to-emerald-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <section className="space-y-3">
                <h2 className={`${headingFont.className} text-lg font-bold text-slate-900`}>
                  1. Contact details
                </h2>
                <div className="grid gap-3">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Work email"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Phone number"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className={`${headingFont.className} text-lg font-bold text-slate-900`}>
                  2. Website status
                </h2>
                <div className="grid gap-2.5">
                  {websiteOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
                        form.websiteStatus === option
                          ? "border-emerald-400 bg-emerald-50"
                          : "border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/60"
                      }`}
                    >
                      <input
                        type="radio"
                        name="website"
                        required
                        checked={form.websiteStatus === option}
                        onChange={() => setForm({ ...form, websiteStatus: option })}
                        className="mt-1 h-4 w-4 border-slate-400 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm font-semibold text-slate-700">{option}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <h2 className={`${headingFont.className} text-lg font-bold text-slate-900`}>
                  3. Your main goals
                </h2>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {goalOptions.map((goal) => (
                    <label
                      key={goal}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
                        form.goals.includes(goal)
                          ? "border-amber-400 bg-amber-50"
                          : "border-slate-200 hover:border-amber-300 hover:bg-amber-50/70"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.goals.includes(goal)}
                        onChange={() => toggleValue("goals", goal)}
                        className="mt-1 h-4 w-4 border-slate-400 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-sm font-semibold text-slate-700">{goal}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <h2 className={`${headingFont.className} text-lg font-bold text-slate-900`}>
                  4. Preferred channels
                </h2>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {channelOptions.map((channel) => (
                    <label
                      key={channel}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
                        form.channels.includes(channel)
                          ? "border-sky-400 bg-sky-50"
                          : "border-slate-200 hover:border-sky-300 hover:bg-sky-50/70"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.channels.includes(channel)}
                        onChange={() => toggleValue("channels", channel)}
                        className="mt-1 h-4 w-4 border-slate-400 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-sm font-semibold text-slate-700">{channel}</span>
                    </label>
                  ))}
                </div>
              </section>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-semibold text-red-700">{error}</p>
                </div>
              )}

              <button
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-4 text-base font-extrabold text-white shadow-lg shadow-slate-900/20 transition hover:translate-y-[-1px] hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Building recommendation..." : "See my recommended plan"}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5" />
                  Private form
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Secure processing
                </span>
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  Tailored recommendation
                </span>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}