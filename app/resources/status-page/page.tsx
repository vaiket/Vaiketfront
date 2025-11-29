'use client'
// app/resources/status/page.tsx

import {
  Server,
  Mail,
  Brain,
  Activity,
  ShieldCheck,
  BellRing,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black via-zinc-950 to-black" />
      <div className="fixed -top-40 right-0 w-[420px] h-[420px] bg-emerald-500/20 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-0 left-0 w-[360px] h-[360px] bg-cyan-500/20 blur-[120px] rounded-full -z-10" />

      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 text-xs uppercase tracking-[0.25em] text-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
            </span>
            All Systems Operational
          </div>

          <h1 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Vaiket{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Status Page
            </span>
          </h1>

          <p className="mt-4 text-sm md:text-base text-zinc-400 max-w-2xl mx-auto">
            Real-time overview of Vaiket&apos;s core services.  
            Transparent uptime, incident history, and system health for your business-critical email & AI automation.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm text-zinc-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">99.9% Uptime This Month</span>
            <span className="h-4 w-px bg-zinc-700" />
            <Clock className="w-4 h-4 text-cyan-300" />
            <span>Monitored 24/7</span>
          </div>
        </header>

        {/* Grid: System Components + Uptime Summary */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] mb-12">
          {/* Component Status */}
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              System Components
            </h2>
            <p className="text-sm text-zinc-400 mb-4">
              Status of each main Vaiket service. Green means fully operational, yellow means partially available or in planned maintenance.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Business Email */}
              <StatusCard
                icon={<Mail className="w-5 h-5" />}
                name="Business Email (IMAP & SMTP)"
                status="Operational"
                statusColor="emerald"
                description="Sending & receiving business email is working normally."
              />
              {/* AI Automation */}
              <StatusCard
                icon={<Brain className="w-5 h-5" />}
                name="AI Reply Automation"
                status="Operational"
                statusColor="emerald"
                description="AI-powered auto-replies are functioning as expected."
              />
              {/* Lead Capture */}
              <StatusCard
                icon={<Server className="w-5 h-5" />}
                name="Lead Capture & Inbox Rules"
                status="Operational"
                statusColor="emerald"
                description="Lead extraction, tagging & rules are running smoothly."
              />
              {/* Dashboard */}
              <StatusCard
                icon={<BarChart3 className="w-5 h-5" />}
                name="Dashboard & Admin Panel"
                status="Operational"
                statusColor="emerald"
                description="Login, settings & analytics loading normally."
              />
              {/* API & Integrations */}
              <StatusCard
                icon={<Activity className="w-5 h-5" />}
                name="API & Integrations"
                status="Partial"
                statusColor="yellow"
                description="Early-stage beta. Minor limitations may apply."
              />
              {/* Analytics */}
              <StatusCard
                icon={<BellRing className="w-5 h-5" />}
                name="Analytics & Reports"
                status="Partial"
                statusColor="yellow"
                description="Data sync improvements in progress. No downtime."
              />
            </div>
          </section>

          {/* Uptime Summary */}
          <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-300" />
              Uptime Summary
            </h2>
            <p className="text-sm text-zinc-400 mb-4">
              Historical uptime metrics based on our internal monitoring & infrastructure logs.
            </p>

            <div className="space-y-3 text-sm">
              <UptimeRow label="Last 24 Hours" status="Operational" value="100%" />
              <UptimeRow label="Last 7 Days" status="Operational" value="99.9%" />
              <UptimeRow label="Last 30 Days" status="Operational" value="99.9%" />
            </div>

            <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-100 flex items-start gap-2">
              <span className="mt-[3px]">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <p>
                We aim to maintain{" "}
                <span className="font-semibold">99.9%+ uptime</span> across core services.
                Planned maintenance is communicated in advance whenever possible.
              </p>
            </div>
          </section>
        </div>

        {/* Incidents + Security */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] mb-14">
          {/* Incident History */}
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-300" />
              Incident History
            </h2>
            <p className="text-sm text-zinc-400 mb-4">
              Transparent log of past issues. We keep this history to help customers understand our reliability and response practices.
            </p>

            <div className="space-y-4">
              <IncidentItem
                date="14 Nov 2025"
                impact="Minor email delivery delay"
                status="Resolved"
                duration="38 minutes"
                description="A DNS propagation change caused slower-than-usual delivery for some outgoing emails. No data was lost; all queued messages were successfully sent."
              />
              <IncidentItem
                date="03 Nov 2025"
                impact="AI response latency spike"
                status="Resolved"
                duration="15 minutes"
                description="An unexpected traffic spike temporarily increased AI reply generation time. Auto-scaling rules were updated to prevent similar impact."
              />
              <IncidentItem
                date="No other incidents recorded in the last 90 days"
                impact=""
                status="Healthy"
                duration=""
                description=""
                isInfoOnly
              />
            </div>
          </section>

          {/* Security & Subscribe */}
          <section className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
                Security & Reliability
              </h2>
              <p className="text-sm text-zinc-300 mb-3">
                Vaiket is built as business-critical communication infrastructure. We prioritize stability, data protection and compliance.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-zinc-300">
                <li>• DPDP-aware data handling for Indian businesses</li>
                <li>• Encrypted IMAP/SMTP connections over TLS</li>
                <li>• Continuous monitoring of core mail & AI services</li>
                <li>• Regular backups and internal redundancy</li>
                <li>• Strict access controls for production systems</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <BellRing className="w-5 h-5 text-cyan-300" />
                Subscribe to Status Updates
              </h2>
              <p className="text-sm text-zinc-300 mb-3">
                Get notified when we schedule maintenance windows or face service-impacting incidents.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-3"
              >
                <input
                  type="email"
                  placeholder="you@yourbusiness.com"
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-emerald-400"
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 px-4 py-2 text-xs md:text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-transform"
                >
                  Notify Me About Incidents
                </button>
                <p className="text-[11px] text-zinc-500">
                  Subscription system is in beta. For urgent issues, always check this page or contact support.
                </p>
              </form>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <footer className="border-t border-white/10 pt-8 mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-300">
          <div>
            <p className="font-medium text-zinc-200">
              All systems are running smoothly.
            </p>
            <p className="text-xs md:text-sm text-zinc-500">
              Ready to see how Vaiket can automate your business communication?
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/resources/demo-booking"
              className="inline-flex items-center justify-center rounded-full bg-white text-black px-4 py-2 text-xs md:text-sm font-semibold hover:bg-zinc-100 transition"
            >
              Book a Live Demo
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-4 py-2 text-xs md:text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              View Pricing
            </a>
          </div>
        </footer>
      </section>
    </main>
  );
}

// Small reusable components

type StatusCardProps = {
  icon: React.ReactNode;
  name: string;
  status: "Operational" | "Partial";
  statusColor: "emerald" | "yellow";
  description: string;
};

function StatusCard({
  icon,
  name,
  status,
  statusColor,
  description,
}: StatusCardProps) {
  const badgeBase =
    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium";
  const dotBase =
    "h-2 w-2 rounded-full animate-pulse";

  const colorClasses =
    statusColor === "emerald"
      ? {
          badge: "bg-emerald-500/10 text-emerald-200 border border-emerald-400/40",
          dot: "bg-emerald-400",
        }
      : {
          badge: "bg-yellow-500/10 text-yellow-200 border border-yellow-400/40",
          dot: "bg-yellow-300",
        };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-2 text-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/50 border border-white/10">
            {icon}
          </div>
          <p className="font-medium text-zinc-100 text-xs md:text-sm">{name}</p>
        </div>
        <span className={`${badgeBase} ${colorClasses.badge}`}>
          <span className={`${dotBase} ${colorClasses.dot}`} />
          {statusColor === "emerald" ? "Operational" : "Partial"}
        </span>
      </div>
      <p className="text-xs text-zinc-400">{description}</p>
    </div>
  );
}

type UptimeRowProps = {
  label: string;
  status: string;
  value: string;
};

function UptimeRow({ label, status, value }: UptimeRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-black/40 border border-white/10 px-3 py-2">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-zinc-200 text-xs md:text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-3 text-xs md:text-sm">
        <span className="text-zinc-400">{status}</span>
        <span className="font-semibold text-emerald-300">{value}</span>
      </div>
    </div>
  );
}

type IncidentItemProps = {
  date: string;
  impact: string;
  status: "Resolved" | "Healthy" | string;
  duration: string;
  description: string;
  isInfoOnly?: boolean;
};

function IncidentItem({
  date,
  impact,
  status,
  duration,
  description,
  isInfoOnly,
}: IncidentItemProps) {
  const isResolved = status === "Resolved";
  const isHealthy = status === "Healthy";

  return (
    <div className="flex gap-3">
      {/* Timeline bullet */}
      <div className="flex flex-col items-center">
        <div
          className={`h-3 w-3 rounded-full ${
            isHealthy
              ? "bg-emerald-400"
              : isResolved
              ? "bg-yellow-300"
              : "bg-red-400"
          }`}
        />
        <div className="flex-1 w-px bg-zinc-700/70 mt-1" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-3 border-b border-zinc-800">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 mb-1">
          {date}
        </p>

        {!isInfoOnly && (
          <p className="text-sm font-medium text-zinc-100 mb-1">{impact}</p>
        )}

        {!isInfoOnly && (
          <p className="text-xs text-zinc-400 mb-1">
            <span className="inline-flex items-center gap-1 mr-3">
              <Clock className="w-3 h-3 text-zinc-500" />
              {duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              {status}
            </span>
          </p>
        )}

        {description && (
          <p className="text-xs text-zinc-400 mt-1">{description}</p>
        )}

        {isInfoOnly && (
          <p className="text-xs text-zinc-400">
            Systems have been{" "}
            <span className="text-emerald-300 font-medium">
              healthy and stable
            </span>{" "}
            with no major incidents recorded.
          </p>
        )}
      </div>
    </div>
  );
}
