"use client";

import { XCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function ProblemSolution() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const bulletContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="w-full bg-slate-50" ref={containerRef}>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="relative grid gap-16 md:grid-cols-2">
          
          {/* Subtle divider for desktop */}
          <div className="absolute left-1/2 top-1/2 hidden h-3/4 -translate-y-1/2 transform md:block">
            <div className="h-full w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>
          </div>

          {/* PROBLEM */}
          <div>
            <motion.p 
              className="mb-3 text-sm font-semibold tracking-wide text-slate-500"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              THE PROBLEM
            </motion.p>

            <motion.h2 
              className="mb-10 text-3xl font-semibold text-slate-900"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Growing businesses struggle with disconnected tools
            </motion.h2>

            <motion.ul 
              className="space-y-6"
              variants={bulletContainerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.li 
                className="flex items-start gap-3 text-slate-500"
                variants={bulletVariants}
              >
                <XCircle className="mt-0.5 h-5 w-5 text-rose-500 flex-shrink-0" />
                <span>Leads scattered across WhatsApp, Email & Forms</span>
              </motion.li>

              <motion.li 
                className="flex items-start gap-3 text-slate-500"
                variants={bulletVariants}
              >
                <XCircle className="mt-0.5 h-5 w-5 text-rose-500 flex-shrink-0" />
                <span>Manual follow-ups waste time & energy</span>
              </motion.li>

              <motion.li 
                className="flex items-start gap-3 text-slate-500"
                variants={bulletVariants}
              >
                <XCircle className="mt-0.5 h-5 w-5 text-rose-500 flex-shrink-0" />
                <span>No clear visibility of customers or pipeline</span>
              </motion.li>

              <motion.li 
                className="flex items-start gap-3 text-slate-500"
                variants={bulletVariants}
              >
                <XCircle className="mt-0.5 h-5 w-5 text-rose-500 flex-shrink-0" />
                <span>Low conversions despite traffic and ad spend</span>
              </motion.li>
            </motion.ul>
          </div>

          {/* SOLUTION */}
          <div>
            <motion.p 
              className="mb-3 text-sm font-semibold tracking-wide text-emerald-600"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              THE SOLUTION
            </motion.p>

            <motion.h2 
              className="mb-10 text-3xl font-semibold text-slate-900"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Vaiket brings everything into one powerful platform
            </motion.h2>

            <motion.ul 
              className="space-y-6"
              variants={bulletContainerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delayChildren: 0.6 }}
            >
              <motion.li 
                className="flex items-start gap-3 text-slate-700"
                variants={bulletVariants}
              >
                <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span>Centralized leads & conversations in one place</span>
              </motion.li>

              <motion.li 
                className="flex items-start gap-3 text-slate-700"
                variants={bulletVariants}
              >
                <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span>Automated WhatsApp, Email & SMS workflows</span>
              </motion.li>

              <motion.li 
                className="flex items-start gap-3 text-slate-700"
                variants={bulletVariants}
              >
                <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span>Built-in CRM with full customer visibility</span>
              </motion.li>

              <motion.li 
                className="flex items-start gap-3 text-slate-700"
                variants={bulletVariants}
              >
                <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span>Faster responses and higher conversions</span>
              </motion.li>
            </motion.ul>
          </div>

        </div>
      </div>
    </section>
  );
}