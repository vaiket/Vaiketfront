// app/product/workflow-builder/page.tsx
import {
  Workflow,
  Zap,
  Settings,
  ArrowRight,
  CheckCircle2,
  Filter,
  MousePointerClick,
  MessageCircle,
  Mail,
  Clock3,
  Link2,
  ShieldCheck,
   Users, 
} from "lucide-react";

export default function WorkflowBuilderPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-10 px-4 py-16 md:py-20">
          
          {/* Left */}
          <div className="flex-1">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Workflow className="h-4 w-4" />
              Drag-and-automate for business growth
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Automate customer workflows
              <span className="block text-blue-600">
                without writing any code.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm md:text-base text-slate-600">
              Build automation flows using simple triggers and actions. Assign tasks,
              send emails, update lead status — all automatically.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6 md:max-w-md">
              <HeroStat value="10 min" label="Average setup time" />
              <HeroStat value="24×7" label="Always automating" />
              <HeroStat value="2×" label="Better customer experience" />
              <HeroStat value="60%" label="Less manual work" />
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/resources/demo-booking"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white text-sm font-semibold shadow-sm hover:bg-blue-700"
              >
                Try Workflow Builder
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium hover:bg-slate-50"
              >
                View Pricing
              </a>
            </div>
          </div>

          {/* Right — Mock Flow UI */}
          <div className="flex-1">
            <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <FlowStep title="New Email Received" icon={<Mail className="h-4 w-4 text-blue-600" />} />
              <FlowConnector />
              <FlowStep title="Classify Intent (Lead/Support)" icon={<Filter className="h-4 w-4 text-blue-600" />} />
              <FlowConnector />
              <FlowStep title="Auto-Assign to Team Member" icon={<Users className="h-4 w-4 text-blue-600" />} />
              <FlowConnector />
              <FlowStep title="Send AI Follow-Up" icon={<MessageCircle className="h-4 w-4 text-blue-600" />} />
              <FlowEnd />
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-xl md:text-2xl font-semibold">What you can automate</h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Replace repetitive tasks with automation that runs instantly and perfectly.
          </p>

          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <BenefitCard
              icon={<Settings className="h-5 w-5 text-blue-600" />}
              title="Email routing & assignment"
              description="Automatically send messages to the right owner with SLA reminders."
            />
            <BenefitCard
              icon={<MousePointerClick className="h-5 w-5 text-blue-600" />}
              title="Lead qualification"
              description="Auto-detect leads and tag by purchase intent and urgency."
            />
            <BenefitCard
              icon={<Clock3 className="h-5 w-5 text-blue-600" />}
              title="Timing-based triggers"
              description="Follow-ups or alerts after delays and specific conditions."
            />
          </div>
        </div>
      </section>

      {/* Automation Examples */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            Pre-built automation templates
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-xl">
            Start instantly with ready workflows designed for Indian SMEs.
          </p>

          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <WorkflowCard
              title="Lead Follow-Up Booster"
              steps="Trigger + Tagging + Follow-up"
              result="20% more leads converted"
            />
            <WorkflowCard
              title="Support Ticket Prioritizer"
              steps="Auto-assign + SLA + Alerts"
              result="50% faster responses"
            />
            <WorkflowCard
              title="Sales Pipeline Updater"
              steps="CRM update + reminders"
              result="Zero missed opportunities"
            />
          </div>
        </div>
      </section>

      {/* Security & Control */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-14 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
              Fully secure. Fully trackable.
            </h2>
            <ul className="mt-4 text-sm text-slate-700 space-y-3">
              <SecureItem text="DPDP compliant" />
              <SecureItem text="Access control per team member" />
              <SecureItem text="Activity logs for every automation trigger" />
              <SecureItem text="Failures alert instantly by email or WhatsApp" />
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold">99.9% automation success</span>
            </div>
            <p className="mt-3 text-xs text-slate-600">
              Vaiket ensures workflows run continuously, even when your team is away.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Build workflows that scale with your business
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Start with one automation. Soon your whole business will run smoother.
          </p>

          <div className="mt-6 flex justify-center gap-4 flex-col sm:flex-row">
            <a
              href="/resources/demo-booking"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white shadow-sm text-sm hover:bg-blue-700"
            >
              Book a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm hover:bg-slate-50"
            >
              Compare Plans
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Components */

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white border border-slate-100 px-3 py-2 shadow-sm">
      <div className="font-semibold text-slate-900 text-base">{value}</div>
      <div className="text-[11px] text-slate-500">{label}</div>
    </div>
  );
}

function FlowStep({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-3 text-xs shadow-sm flex gap-2 items-center">
      {icon}
      <span className="font-medium text-slate-800">{title}</span>
    </div>
  );
}

function FlowConnector() {
  return <div className="h-4 border-l-2 border-dashed border-slate-300 mx-auto w-0" />;
}

function FlowEnd() {
  return (
    <div className="mx-auto mt-2 flex items-center gap-2 text-[11px] text-emerald-700 font-medium">
      <CheckCircle2 className="h-3 w-3" />
      Done — resolved
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
      <div className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-50 mb-3">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-600 leading-relaxed mt-2">{description}</p>
    </div>
  );
}

function WorkflowCard({
  title,
  steps,
  result,
}: {
  title: string;
  steps: string;
  result: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 shadow-sm text-sm">
      <h4 className="font-semibold text-slate-900">{title}</h4>
      <p className="text-xs text-slate-500 mt-1">{steps}</p>
      <p className="text-[11px] text-emerald-700 font-medium mt-2">{result}</p>
    </div>
  );
}

function SecureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <ShieldCheck className="h-4 w-4 text-blue-600" />
      <span>{text}</span>
    </div>
  );
}
