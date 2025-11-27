// components/Features.tsx
'use client';

import { motion, easeInOut } from "framer-motion";
import { Rocket, Zap, Shield, MessageSquare, Users, Check } from "lucide-react";

const features = [
  {
    id: "1",
    title: "AI Sales Outreach",
    description: "Automate lead generation + follow-up with human-grade responses.",
    icon: Rocket
  },
  {
    id: "2",
    title: "Smart Workflows",
    description: "Drag & drop automation with zero technical skill required.",
    icon: Zap
  },
  {
    id: "3",
    title: "Security First",
    description: "Enterprise-grade protection with full compliance.",
    icon: Shield
  },
];

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easeInOut, // ✔ FIXED easing
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="min-h-screen py-20 bg-black text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Powerful. Automated. Scalable.
        </h2>
        <p className="text-lg text-gray-300">
          Transform your email outreach with advanced automation AI.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{
              y: -10,
              scale: 1.03,
              transition: { duration: 0.25, ease: easeInOut },
            }}
            viewport={{ once: true }}
            className="p-8 bg-gray-900 rounded-xl shadow-xl border border-gray-800 hover:border-blue-500/40 transition-all"
          >
            <feature.icon className="w-10 h-10 text-blue-500 mb-5" />

            <h3 className="text-xl font-bold mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
