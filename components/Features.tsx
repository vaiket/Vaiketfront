"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Brain,
  ShieldCheck,
  Link2,
  Activity,
  Inbox,
  Workflow,
  Lock,
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative bg-black text-white py-32 px-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto text-center mb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
        >
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
          <span className="text-sm text-zinc-300">AI-Powered Business Suite</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold mb-8"
        >
          <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Supercharge Your
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Business Communication
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-zinc-400 max-w-4xl mx-auto leading-relaxed"
        >
          Transform your email into an intelligent business growth engine with 
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
            {" "}AI-powered automation
          </span>{" "}
          and enterprise-grade security.
        </motion.p>
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
            className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 
                       backdrop-blur-xl hover:backdrop-blur-2xl transition-all duration-500
                       hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            {/* Hover gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 rounded-3xl transition-all duration-500`} />
            
            {/* Animated border gradient */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 p-px`}>
              <div className="w-full h-full bg-black rounded-3xl" />
            </div>

            <div className="relative z-10">
              <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} w-fit group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300">
                {feature.title}
              </h3>
              
              <p className="text-zinc-400 group-hover:text-zinc-300 leading-relaxed transition-colors duration-300">
                {feature.desc}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-ping" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}