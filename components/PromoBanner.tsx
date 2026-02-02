"use client";
import { motion } from "framer-motion";

export default function PromoBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-3 px-4 relative overflow-hidden"
    >
      {/* dotted pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
        
        {/* LEFT - PROMO TEXT */}
        <span className="font-extrabold tracking-wider text-sm sm:text-base md:text-lg">
          BLACK FRIDAY SALE 🎉
        </span>

        {/* SAVE TEXT */}
        <span className="text-xl md:text-2xl font-extrabold">
          SAVE 25%
        </span>

        {/* CTA BUTTON */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#pricing"
          className="rounded-full bg-white text-orange-600 px-5 py-2 text-sm font-semibold shadow-md flex items-center gap-2 hover:bg-gray-100"
        >
          Get V-AI-KET Now →
        </motion.a>
      </div>
    </motion.div>
  );
}
