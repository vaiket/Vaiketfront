// app/product/conversation-inbox/page.tsx

import {
  Mail,
  Inbox,
  Users,
  MessageCircle,
  Filter,
  Zap,
  Tag,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock3,
  LineChart,
} from "lucide-react";

export default function ConversationInboxPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-20">
          {/* Left */}
          <div className="flex-1">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Inbox className="h-4 w-4" />
              Unified Conversation Inbox for Teams
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              One inbox for
              <span className="block text-blue-600">
                every customer conversation.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm md:text-base text-slate-600">
              Centralize all your customer emails into a clean, shared inbox.
              Assign, track, and resolve conversations without forwarding chains,
              messy CCs, or missed messages.
            </p>

            {/* Hero stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm md:max-w-md">
              <HeroStat value="0" label="Missed customer emails" />
              <HeroStat value="2×" label="Faster resolution time" />
              <HeroStat value="-60%" label="Internal back-and-forth" />
              <HeroStat value="1" label="Inbox for entire team" />
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
              <a
                href="/resources/demo-booking"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                See Inbox in Action
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 font-medium text-slate-800 hover:bg-slate-50"
              >
                Compare Plans
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Ideal for sales, support and founders handling customer emails
              together.
            </p>
          </div>

          {/* Right – Inbox mock */}
          <div className="flex-1">
            <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  inbox@yourbusiness.com
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                  <Zap className="h-3 w-3" />
                  Smart sorting ON
                </span>
              </div>

              <div className="flex gap-3 text-[11px]">
                <div className="w-1/2 space-y-2">
                  <InboxRow
                    name="Rohan — Pricing Enquiry"
                    badge="New Lead"
                    tone="hot"
                  />
                  <InboxRow
                    name="Aditi — Order Status"
                    badge="Support"
                    tone="warm"
                  />
                  <InboxRow
                    name="Vendor Invoice"
                    badge="Back-office"
                    tone="neutral"
                  />
                </div>
                <div className="w-1/2 space-y-2">
                  <div className="rounded-xl bg-white p-3 text-xs shadow-sm">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-800">
                        Conversation Overview
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-[10px] text-blue-700">
                        <Filter className="h-3 w-3" />
                        Lead Priority
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Lead: <span className="font-semibold">Rohan</span> is
                      asking for{" "}
                      <span className="font-semibold">
                        pricing & implementation time
                      </span>
                      . AI suggests assigning this to{" "}
                      <span className="font-semibold">Sales Team</span> and
                      sending a follow-up if no reply in 24 hours.
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Assigned: Sales
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="h-3 w-3" />
                        SLA: 2 hrs
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-100 p-2 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Tag className="h-3 w-3 text-slate-400" />
                      Auto-tags: new lead • pricing • website form
                    </span>
                  </div>
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
                Why use a shared Conversation Inbox?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Move from personal inbox chaos to a clean, structured,
                team-friendly workspace where every customer gets a reply.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <BenefitCard
              icon={<Inbox className="h-5 w-5 text-blue-600" />}
              title="One inbox, all teams"
              description="Sales, support and founders can manage conversations from one place, with clear ownership."
            />
            <BenefitCard
              icon={<Users className="h-5 w-5 text-blue-600" />}
              title="No more double replies"
              description="Status, assignment and notes make sure two people don&apos;t reply to the same customer."
            />
            <BenefitCard
              icon={<Filter className="h-5 w-5 text-blue-600" />}
              title="Smart filters & views"
              description="Quickly see new leads, pending replies, VIP customers, or escalated cases using saved views."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            How Vaiket Conversation Inbox works
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Under the hood, Vaiket keeps your inbox clean, prioritized, and
            revenue-focused.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <WorkflowStepCard
              step="1"
              title="All emails in one inbox"
              description="Connect your business email. All incoming messages arrive in a shared inbox with no change for your customers."
            />
            <WorkflowStepCard
              step="2"
              title="Auto-tag & auto-assign"
              description="AI detects intent (lead, support, vendor) and tags/assigns each conversation to the right people."
            />
            <WorkflowStepCard
              step="3"
              title="Reply, collaborate, resolve"
              description="Reply with AI-suggested responses, ping teammates with notes, and close conversations with full visibility."
            />
          </div>
        </div>
      </section>

      {/* Gmail vs Vaiket Comparison */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Why not just use normal email?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Traditional inboxes were never designed for multiple people
              handling customers together. Vaiket fixes that.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-sm">
            <div className="grid grid-cols-[2fr,1fr,1fr] border-b border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700">
              <span>Use case</span>
              <span className="text-center">Gmail / normal inbox</span>
              <span className="text-center">Vaiket Inbox</span>
            </div>

            <ComparisonRow
              label="Assign conversations to teammates"
              normal="Manual forwarding & CC"
              vaiket="One-click assignment with clear owner"
            />
            <ComparisonRow
              label="See if someone already replied"
              normal="Scroll through threads & ask team"
              vaiket="Real-time status: new, in progress, closed"
            />
            <ComparisonRow
              label="Track leads vs support vs vendor"
              normal="Labels (if used manually)"
              vaiket="Auto-tags using AI intent detection"
            />
            <ComparisonRow
              label="Avoid missed or lost emails"
              normal="Easy to miss during busy days"
              vaiket="Prioritized queues & SLA reminders"
            />
            <ComparisonRow
              label="Team collaboration & notes"
              normal="Comment inside long email threads"
              vaiket="Internal notes & mentions without customer seeing"
            />
          </div>
        </div>
      </section>

      {/* Team collaboration & AI */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* Team Collaboration */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Designed for teams, not lone inbox heroes
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Stop forwarding mails between team members. Use an inbox built
                for collaboration.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Users className="mt-[2px] h-4 w-4 text-blue-600" />
                  <span>
                    Assign owners so it&apos;s clear who is responsible for
                    each conversation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="mt-[2px] h-4 w-4 text-blue-600" />
                  <span>
                    Use internal notes to discuss issues without the customer
                    seeing internal messages.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <LineChart className="mt-[2px] h-4 w-4 text-blue-600" />
                  <span>
                    Track response & resolution time across team members to
                    spot bottlenecks.
                  </span>
                </li>
              </ul>
            </div>

            {/* AI Assistance */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                AI that helps, not replaces, your team
              </h3>
              <p className="mt-2 text-xs text-slate-600">
                Vaiket&apos;s Conversation Inbox is deeply integrated with
                V-AI. It suggests replies, summarizes threads, and flags
                important emails — but you stay in full control.
              </p>

              <div className="mt-4 space-y-3">
                <AIHighlight
                  label="AI Reply Suggestions"
                  description="Reply to common questions in a click, with editable AI drafts based on your tone."
                />
                <AIHighlight
                  label="Thread Summaries"
                  description="Get a one-paragraph summary before you jump into long conversations."
                />
                <AIHighlight
                  label="Follow-up reminders"
                  description="Automatically follow up with leads who haven't replied after a set time."
                />
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
                Questions about the Conversation Inbox
              </h2>
              <div className="mt-6 space-y-4 text-sm">
                <FAQItem
                  question="Can I use this with my existing email addresses?"
                  answer="Yes. You continue using your existing domain email (like support@yourbusiness.com). Vaiket connects on top using IMAP/SMTP."
                />
                <FAQItem
                  question="Is this only for support teams?"
                  answer="No. Many businesses use Vaiket for sales, founder-level inboxes, and mixed support + sales workflows."
                />
                <FAQItem
                  question="How many team members can share the inbox?"
                  answer="Depending on your plan, multiple users can log in, view, assign, and reply from the same shared inbox with full visibility."
                />
              </div>
            </div>

            {/* CTA Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Want a clean, shared inbox your whole team loves?
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Let us show you how Vaiket&apos;s Conversation Inbox can replace
                messy email forwards and scattered replies.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href="/resources/demo-booking"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Book a Live Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  View Plans & Pricing
                </a>
              </div>
              <p className="mt-3 text-[11px] text-slate-500">
                Early customers can unlock bundled pricing with AI Email
                Automation + Conversation Inbox together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Small presentational components */

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white px-3 py-2 shadow-sm border border-slate-100">
      <div className="text-base font-semibold text-slate-900">{value}</div>
      <div className="text-[11px] text-slate-500">{label}</div>
    </div>
  );
}

function InboxRow({
  name,
  badge,
  tone,
}: {
  name: string;
  badge: string;
  tone: "hot" | "warm" | "neutral";
}) {
  const toneColor =
    tone === "hot"
      ? "bg-emerald-50 text-emerald-700"
      : tone === "warm"
      ? "bg-yellow-50 text-yellow-700"
      : "bg-slate-100 text-slate-600";

  return (
    <div className="rounded-xl bg-white p-2 shadow-sm border border-slate-100">
      <p className="text-[11px] font-medium text-slate-800 truncate">{name}</p>
      <span
        className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${toneColor}`}
      >
        {badge}
      </span>
    </div>
  );
}

function BenefitCard({
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
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function WorkflowStepCard({
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
      <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
        {step}
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function ComparisonRow({
  label,
  normal,
  vaiket,
}: {
  label: string;
  normal: string;
  vaiket: string;
}) {
  return (
    <div className="grid grid-cols-[2fr,1fr,1fr] border-t border-slate-200 px-4 py-3 text-xs">
      <span className="pr-4 text-slate-700">{label}</span>
      <span className="px-3 text-center text-slate-500">{normal}</span>
      <span className="px-3 text-center font-medium text-emerald-700">
        {vaiket}
      </span>
    </div>
  );
}

function AIHighlight({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs">
      <p className="inline-flex items-center gap-2 text-[11px] font-semibold text-slate-900">
        <Zap className="h-3 w-3 text-blue-600" />
        {label}
      </p>
      <p className="mt-1 text-[11px] text-slate-600">{description}</p>
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
