'use client'
// app/product/ai-email-automation/page.tsx

import {
  Mail,
  Bot,
  Zap,
  Sparkles,
  Clock3,
  ShieldCheck,
  LineChart,
  Users,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

export default function AiEmailAutomationPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
            {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-200/45 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-12 h-56 w-56 rounded-full bg-cyan-200/45 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.04fr_0.96fr] md:py-20 lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              AI Email Automation by Vaiket
            </p>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              Convert every inbound email into a
              <span className="block bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent">
                fast, on-brand sales response
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 md:text-base md:leading-7">
              Vaiket reads customer intent, drafts accurate replies, routes
              leads to the right owner, and triggers follow-ups automatically so
              your team closes more deals with less manual inbox work.
            </p>

            <div className="mt-6 grid gap-2.5 text-sm sm:grid-cols-2 sm:gap-3 md:max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-white/85 px-3 py-2 text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Smart auto-replies in seconds
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-white/85 px-3 py-2 text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Human approval for sensitive cases
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-white/85 px-3 py-2 text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Lead tagging and routing built-in
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-white/85 px-3 py-2 text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Works with your current email setup
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-sm md:max-w-md">
              <StatPill value="3.2x" label="Faster reply time" />
              <StatPill value="+40%" label="More leads retained" />
              <StatPill value="92%" label="Lower manual workload" />
              <StatPill value="24/7" label="AI coverage" />
            </div>

            <div className="mt-8 flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
              <a
                href="/resources/demo-booking"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white shadow-[0_14px_30px_-16px_rgba(5,150,105,0.6)] transition hover:bg-emerald-700"
              >
                Book a Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 font-medium text-slate-800 transition hover:bg-slate-50"
              >
                View Pricing
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              No credit card required - Setup under 30 minutes - Use your
              existing domain email
            </p>
          </div>

          <div>
            <div className="mx-auto w-full max-w-lg rounded-3xl border border-emerald-100 bg-white/90 p-4 shadow-[0_28px_70px_-38px_rgba(15,23,42,0.45)] backdrop-blur sm:p-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-slate-500" />
                    Inbox intelligence
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 font-semibold text-emerald-700">
                    <Zap className="h-3 w-3" />
                    Live AI
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                  <p className="font-semibold text-slate-900">
                    Subject: Need pricing and onboarding details
                  </p>
                  <p className="mt-1.5 leading-relaxed text-slate-600">
                    Hi team, can you share the monthly plan and onboarding
                    timeline for a 5-member sales setup?
                  </p>
                </div>

                <div className="my-3 flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </div>

                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-slate-700">
                  <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                    <Bot className="h-4 w-4" />
                    AI Suggested Reply
                  </p>
                  <p className="mt-1.5 leading-relaxed">
                    Thanks for reaching out. For a 5-member team, plans start
                    at <span className="font-semibold">Rs 1499/month</span> and
                    onboarding is usually completed in{' '}
                    <span className="font-semibold">1-2 working days</span>.
                    I can also share a quick demo slot for your team.
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-2">
                    <Clock3 className="h-3.5 w-3.5 text-emerald-600" />
                    Responded in 4 sec
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-2">
                    <Users className="h-3.5 w-3.5 text-cyan-600" />
                    Routed to sales
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Why AI Email Automation?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Replace slow manual inbox handling with intelligent, consistent,
                AI-powered responses that scale with your business.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Zap className="h-5 w-5 text-emerald-600" />}
              title="Instant replies, 24/7"
              description="V-AI reads the email, understands context, and replies in seconds - even at night or on weekends."
            />
            <FeatureCard
              icon={<MessageCircle className="h-5 w-5 text-emerald-600" />}
              title="On-brand messaging"
              description="Train tone and guidelines once. Every reply follows your style, offers, and business rules."
            />
            <FeatureCard
              icon={<LineChart className="h-5 w-5 text-emerald-600" />}
              title="Designed to convert"
              description="Lead-focused replies, smart follow-ups, and clear CTAs to drive more demos, calls, and sales."
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            How Vaiket handles your emails
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Under the hood, a simple 3-step flow keeps your inbox clean and your
            customers impressed.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <StepCard
              step="1"
              title="Connect your mailbox"
              description="Securely connect your existing business email (IMAP/SMTP) from any provider. No migration needed."
            />
            <StepCard
              step="2"
              title="Teach your preferences"
              description="Set reply tone, FAQs, pricing rules, escalation paths, and which emails require human approval."
            />
            <StepCard
              step="3"
              title="AI replies & routes"
              description="Vaiket drafts replies, assigns owners, tags leads, and sends follow-ups automatically."
            />
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Built for real Indian businesses
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Whether you&apos;re running a local service, online store, or B2B
              agency - Vaiket adapts to your workflow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <UseCaseCard
              title="E-commerce & D2C"
              points={[
                "Instant replies to order queries",
                "Shipping & refund FAQs handled by AI",
                "Upsell and cross-sell suggestions"
              ]}
            />
            <UseCaseCard
              title="Service businesses"
              points={[
                "Auto-send quotes & call booking links",
                "Follow up with leads who stopped replying",
                "Keep team aligned with one inbox"
              ]}
            />
            <UseCaseCard
              title="Agencies & B2B"
              points={[
                "Reply to inbound leads in seconds",
                "Route by client or project automatically",
                "Summarize long email threads for managers"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Trust / Security */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Secure, reliable and DPDP-aware
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Your customer conversations are sensitive. Vaiket is designed
                to keep them safe while still giving you AI superpowers.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-[2px] h-4 w-4 text-emerald-600" />
                  <span>
                    Encrypted IMAP/SMTP connections and secure data handling
                    aligned with DPDP best practices.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-[2px] h-4 w-4 text-emerald-600" />
                  <span>
                    Human-in-the-loop options for high-value or sensitive
                    emails. AI drafts, you approve.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-[2px] h-4 w-4 text-emerald-600" />
                  <span>
                    Detailed logs and activity tracking so you always know what
                    the AI replied and why.
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  DPDP-aware data practices
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                  India-first
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 text-xs">
                <TrustPill label="99.9% uptime target" />
                <TrustPill label="Role-based access" />
                <TrustPill label="Audit logs" />
                <TrustPill label="Secure infra" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] md:items-start">
            {/* FAQ */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Common questions about AI Email Automation
              </h2>
              <div className="mt-6 space-y-4 text-sm">
                <FAQItem
                  question="Do I need to change my existing email provider?"
                  answer="No. Vaiket connects to your existing business email using secure IMAP/SMTP. You keep your current domain and mailboxes."
                />
                <FAQItem
                  question="Will AI send wrong or risky replies?"
                  answer="You stay in control. You can require approval for certain categories (payments, contracts, etc.), and change or block any auto-behaviour."
                />
                <FAQItem
                  question="How long does setup take?"
                  answer="Most businesses get their first AI replies running in under 30 minutes. Full optimization usually takes 1-2 days."
                />
              </div>
            </div>

            {/* CTA Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Ready to turn your inbox into a growth engine?
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                See exactly how Vaiket can automate your email and boost
                conversions for your business.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href="/resources/demo-booking"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Book a Live Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  Compare all plans
                </a>
              </div>
              <p className="mt-3 text-[11px] text-slate-500">
                Special launch pricing available for early customers. Contact us
                for custom requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Small presentational components */

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white px-3 py-2 shadow-sm border border-slate-100">
      <div className="text-base font-semibold text-slate-900">{value}</div>
      <div className="text-[11px] text-slate-500">{label}</div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
        {step}
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function UseCaseCard({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <ul className="mt-3 space-y-2 text-xs text-slate-600">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <CheckCircle2 className="mt-[2px] h-3 w-3 text-emerald-600" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrustPill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-slate-700 shadow-sm border border-slate-100">
      <ShieldCheck className="h-3 w-3 text-emerald-600" />
      <span>{label}</span>
    </div>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
      <p className="font-medium text-slate-900">{question}</p>
      <p className="mt-2 text-xs text-slate-600">{answer}</p>
    </div>
  );
}
