"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import heroAnimation from "@/public/hero.json";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen text-white flex flex-col overflow-hidden"
      style={{
        backgroundImage: "url('/01.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: isMobile ? "scroll" : "fixed",
      }}
    >
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-slate-900/70 to-teal-900/40" />

      {/* MAIN HERO CONTENT */}
      <div className="relative z-10 flex-1 flex items-center justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* TEXT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left max-w-2xl lg:max-w-xl xl:max-w-2xl space-y-6 lg:space-y-8"
          >
            <div className="space-y-4 lg:space-y-6">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                World's Most Powerful
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-400 to-emerald-400 animate-gradient-x">
                  Email AIs.
                </span>
              </motion.h1>

              <motion.h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                One Automation Platform.
              </motion.h2>

              <motion.p 
                className="text-lg sm:text-xl lg:text-2xl text-gray-200 font-light leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Generate thousands of leads 24×7 — AI handles outreach, replies, everything.
              </motion.p>
            </div>

            {/* CTA SECTION */}
            <motion.div 
              className="space-y-6 lg:space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(45, 212, 191, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-gradient-to-r from-sky-400 to-emerald-500 px-8 py-4 lg:px-12 lg:py-4 text-base lg:text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:from-sky-500 hover:to-emerald-600"
                  onClick={() => window.open("/#pricing", "_blank")}
                >
                  <span className="flex items-center gap-2 justify-center">
                    Get Started Now 
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-white/10 backdrop-blur-lg border border-white/20 px-8 py-4 lg:px-12 lg:py-4 text-base lg:text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:bg-white/20"
                >
                  View Demo
                </motion.button>
              </div>

              {/* SOCIAL PROOF */}
              <div className="space-y-4">
                <motion.p 
                  className="text-sm lg:text-base text-gray-300 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Experience smarter email automation
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start text-sm lg:text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10">
                    <div className="flex text-amber-400">
                      {"⭐".repeat(5)}
                    </div>
                    <span className="font-bold text-white">4.9/5</span>
                  </div>
                  <div className="text-gray-200">
                    Trusted by <span className="font-bold text-white">12,000+</span> users worldwide
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* ANIMATION SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="w-full max-w-md lg:max-w-2xl flex justify-center"
          >
            <div className="relative">
              {/* Glow effect behind animation */}
              <div className="absolute inset-0 bg-teal-400/20 blur-3xl rounded-full scale-110" />
              <Lottie 
                animationData={heroAnimation} 
                loop 
                autoplay 
                className="relative z-10 drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-teal-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
