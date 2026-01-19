'use client';

import {
  Rocket,
  Wrench,
  ShieldCheck,
  BellRing,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function ChangelogPage() {
  const updates = [
    {
      version: "v1.0.1",
      date: "Dec 2025",
      icon: <Wrench className="w-6 h-6 text-purple-300" />,
      title: "Performance & UI Enhancements",
      changes: [
        "Improved AI response time by +17%",
        "Updated dashboard UI polishing",
        "Bug fix: navigation responsiveness",
        "Upgrade: onboarding help text improved"
      ],
      type: "improvements",
    },
    {
      version: "v1.0.0",
      date: "Nov 2025",
      icon: <Rocket className="w-6 h-6 text-emerald-300" />,
      title: "Vaiket Launch 🚀",
      changes: [
        "AI Auto Replies + Lead Extraction",
        "Business Email: IMAP & SMTP Secure",
        "Spam Filter v1",
        "Dashboard + Activity Logs"
      ],
      type: "launch",
    },
  ];

  const upcoming = [
    "WhatsApp + CRM Integration",
    "Multi-language Support",
    "Full API Access for Developers",
    "Analytics Dashboard v2"
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background Gradient + Glow */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black via-zinc-950 to-black" />
      <div className="fixed -top-[150px] right-[100px] w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-0 left-[80px] w-[380px] h-[380px] bg-emerald-500/20 blur-[120px] rounded-full -z-10" />

      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
          System Changelog
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
          Transparent updates as we evolve Vaiket into the smartest Business Email & AI platform.
        </p>
      </section>

      {/* Changelog Timeline */}
      <section className="max-w-4xl mx-auto px-6 space-y-10 pb-20">
        {updates.map((log, index) => (
          <div key={index} className="relative">
            {/* Timeline Line */}
            <div className="absolute top-0 left-[14px] h-full w-[2px] bg-zinc-700 opacity-40" />

            <div className="relative ml-10 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-lg">
              {/* Version Badge */}
              <div className="absolute -left-5 top-6 bg-black border border-white/20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl">
                {log.icon}
              </div>

              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-white">{log.title}</h3>
                <span className="text-sm text-zinc-400">{log.date}</span>
              </div>

              <p className="text-sm text-purple-400 font-mono mb-3">{log.version}</p>

              <ul className="space-y-2 text-sm text-zinc-300">
                {log.changes.map((change, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Upcoming Updates */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <BellRing className="w-6 h-6 text-cyan-300" />
          Coming Soon
        </h2>

        <ul className="space-y-4">
          {upcoming.map((feature, index) => (
            <li
              key={index}
              className="bg-black/40 border border-white/10 p-4 rounded-lg text-zinc-300 flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-yellow-300" />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Subscribe Section */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center backdrop-blur-xl">
          <h3 className="text-xl font-semibold mb-3">
            Stay Updated with New Releases
          </h3>
          <p className="text-sm text-zinc-400 mb-5">
            Join our mailing list to receive system updates and improvements.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <input
              type="email"
              placeholder="you@yourbusiness.com"
              className="w-full sm:flex-1 bg-black/60 border border-white/15 rounded-lg py-3 px-4 placeholder:text-zinc-500 text-white focus:border-purple-400 focus:outline-none"
            />
            <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
