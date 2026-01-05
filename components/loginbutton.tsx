"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function GoldCTA() {
  return (
    <motion.button
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260 }}
      className="
        relative px-12 py-4 text-xl font-extrabold tracking-wide
        rounded-full
        text-white
        bg-gradient-to-r from-[#FF9900] via-[#FFC233] to-[#FF6A00]
        shadow-[0_0_25px_rgba(255,170,50,0.55),0_0_45px_rgba(255,120,0,0.35)]
        flex items-center gap-3
        overflow-hidden
      "
    >
      {/* Text — extra highlight */}
      <span className="relative z-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
        Get Started
      </span>
      <ArrowRight className="relative z-20" size={22} />

      {/* Moving Gold Shine */}
      <motion.span
        initial={{ x: "-200%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }}
        className="
          absolute top-0 w-1/3 h-full
          bg-gradient-to-r from-transparent via-white/65 to-transparent
          blur-[16px]
        "
      />

      {/* Inner soft highlight */}
      <span className="absolute inset-0 bg-gradient-radial from-white/15 via-transparent to-transparent opacity-70" />

      {/* Glow Ring */}
      <span className="absolute inset-0 rounded-full border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.25)_inset]" />
    </motion.button>
  );
}
