"use client";

import { motion, Variants } from "framer-motion";
import {
  Mail,
  Brain,
  ShieldCheck,
  Link2,
  Activity,
  Inbox,
  Workflow,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Custom Business Email",
      desc: "Create unlimited professional email IDs with your domain name.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Customer Support",
      desc: "V-AI replies to emails 24/7 — no hiring required.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Lead Capture From Emails",
      desc: "Extract leads automatically from every inquiry & track conversions.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Secure IMAP & SMTP",
      desc: "Enterprise-grade encryption keeps data protected & reliable.",
      gradient: "from-red-500 to-orange-500",
      bgGradient: "from-red-500/10 to-orange-500/10",
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      title: "Sales & Support Automation",
      desc: "Auto-route mail, update CRM & trigger workflows instantly.",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-500/10 to-rose-500/10",
    },
    {
      icon: <Inbox className="w-8 h-8" />,
      title: "Smart Inbox & Spam AI",
      desc: "Auto-prioritize important leads and eliminate spam distractions.",
      gradient: "from-yellow-500 to-amber-500",
      bgGradient: "from-yellow-500/10 to-amber-500/10",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "One Dashboard. Full Control.",
      desc: "Logs, analytics & AI insights — manage everything in one place.",
      gradient: "from-cyan-500 to-sky-500",
      bgGradient: "from-cyan-500/10 to-sky-500/10",
    },
    {
      icon: <Link2 className="w-8 h-8" />,
      title: "Integrates With Everything",
      desc: "CRM, WhatsApp & 100+ business apps — fully connected.",
      gradient: "from-teal-500 to-green-500",
      bgGradient: "from-teal-500/10 to-green-500/10",
    },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="relative bg-black text-white py-32 px-6 overflow-hidden">
      {/* Background lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto text-center mb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-zinc-300 text-sm mb-4"
        >
          AI-Powered Business Suite
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Supercharge Your Business Communication
        </motion.h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto relative"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{
              y: -6,
              transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
            }}
            className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 
                       backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-xl
                       hover:shadow-purple-500/20"
          >
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-all duration-500`}
            />

            <div className="relative z-10">
              <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} w-fit`}>
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
