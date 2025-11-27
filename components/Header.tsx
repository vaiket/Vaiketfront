"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ["home", "features", "pricing", "faqs"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleScroll();
    checkMobile();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && navRef.current && !navRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Features", href: "#features", id: "features" },
    { name: "Pricing", href: "#pricing", id: "pricing" },
    { name: "FAQs", href: "#faqs", id: "faqs" },
  ];

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-3" 
          : "bg-transparent py-5"
      }`}
      style={{ 
        maxWidth: '100%',
        margin: '0 auto'
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LEFT SIDE: Logo + Desktop Menu */}
        <div className="flex items-center gap-8 lg:gap-12">
          {/* Enhanced Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-sky-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              <img
                src="/logo.png"
                alt="AI Email Automation Platform"
                className="relative h-8 w-auto md:h-10 lg:h-12 drop-shadow-2xl transition-all duration-300 transform group-hover:rotate-3"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block"
            >
              <span className="text-white font-bold text-xl bg-gradient-to-r from-teal-300 to-sky-400 bg-clip-text text-transparent">
                EmailAI
              </span>
              <div className="h-1 w-8 bg-gradient-to-r from-teal-400 to-sky-500 rounded-full mt-1 transform group-hover:scale-125 transition-transform duration-300" />
            </motion.div>
          </motion.div>

          {/* Enhanced Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-2xl rounded-2xl p-1 border border-white/10 shadow-2xl">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                href={item.href}
                className={`relative px-6 py-3 rounded-xl transition-all duration-300 font-semibold text-sm xl:text-base ${
                  activeSection === item.id
                    ? "text-white bg-gradient-to-r from-teal-500/20 to-sky-500/20 shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-sky-500/30 rounded-xl border border-teal-400/30"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-gradient-to-r from-teal-400 to-sky-400 rounded-full"
                    />
                  )}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: CTA Buttons + Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Enhanced CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.15)"
              }}
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:bg-white/20 hover:border-white/30"
              onClick={() => window.location.href = "https://ai.vaiket.com/login"}
            >
              Sign In
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(45, 212, 191, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl bg-gradient-to-r from-teal-400 to-sky-500 px-6 py-3 text-sm font-bold text-white shadow-2xl transition-all duration-300 hover:from-teal-500 hover:to-sky-600 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2"
                onClick={() => window.location.href = "https://vaiket.com/#pricing"} >
                Get Started Free
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🚀
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>

          {/* Mobile CTA Button */}
          <div className="lg:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl bg-gradient-to-r from-teal-400 to-sky-500 px-4 py-2 text-xs font-bold text-white shadow-lg"
            >
              Try Free
            </motion.button>
          </div>

          {/* Enhanced Mobile Hamburger Menu */}
          <motion.button
            whileHover={{ 
              backgroundColor: "rgba(94, 234, 212, 0.1)",
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-3 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/10 shadow-xl relative"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
              <motion.span 
                animate={{ 
                  rotate: isMobileMenuOpen ? 45 : 0, 
                  y: isMobileMenuOpen ? 8 : 0,
                  width: isMobileMenuOpen ? "100%" : "80%"
                }}
                className="h-0.5 bg-gradient-to-r from-teal-400 to-sky-400 rounded-full transition-all duration-300"
              />
              <motion.span 
                animate={{ 
                  opacity: isMobileMenuOpen ? 0 : 1,
                  width: isMobileMenuOpen ? "0%" : "60%"
                }}
                className="h-0.5 bg-gradient-to-r from-teal-400 to-sky-400 rounded-full transition-all duration-300"
              />
              <motion.span 
                animate={{ 
                  rotate: isMobileMenuOpen ? -45 : 0, 
                  y: isMobileMenuOpen ? -8 : 0,
                  width: isMobileMenuOpen ? "100%" : "70%"
                }}
                className="h-0.5 bg-gradient-to-r from-teal-400 to-sky-400 rounded-full transition-all duration-300"
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu Dropdown - Glass Morphism */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ 
              opacity: 1,
              height: "auto",
              y: 0
            }}
            exit={{ 
              opacity: 0,
              height: 0,
              y: -20
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden bg-white/10 backdrop-blur-3xl border-b border-white/10 shadow-2xl overflow-hidden"
            style={{ 
              maxWidth: '100%',
              margin: '0 auto'
            }}
          >
            <div className="px-6 py-6 space-y-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    x: 10,
                    backgroundColor: "rgba(94, 234, 212, 0.15)" 
                  }}
                  href={item.href}
                  className={`flex items-center gap-4 py-4 px-4 text-lg font-semibold rounded-2xl border transition-all duration-300 ${
                    activeSection === item.id
                      ? "border-teal-400/50 bg-teal-500/20 text-white"
                      : "border-white/10 bg-white/5 text-gray-300 hover:border-teal-400/30 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeSection === item.id 
                      ? "bg-gradient-to-r from-teal-400 to-sky-400 scale-125" 
                      : "bg-gray-400"
                  }`} />
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto text-teal-400"
                    >
                      ●
                    </motion.div>
                  )}
                </motion.a>
              ))}
              
              {/* Mobile CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-4 border-t border-white/10 space-y-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/20"
                >
                  Sign In
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl bg-gradient-to-r from-teal-400 to-sky-500 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:from-teal-500 hover:to-sky-600"
                >
                  Get Started Free 🚀
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}