// components/Pricing.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, Star, MessageCircle, Rocket, Zap, Users, Shield, Infinity, 
  Mail, Sparkles, Gift, Crown, TrendingUp, BadgeCheck, Globe, Lock, 
  Cloud, Brain, Target, ShieldCheck, Clock, RefreshCw, Flame, ArrowRight
} from 'lucide-react';
import PayPopup from './PayPopup';

const pricingPlans = [
  {
    id: "monthly",
    name: "MONTHLY PLAN",
    badge: "Most Flexible",
    price: 999,
    period: "month",
    valueMetric: "Unlimited Everything + Lifetime Mailbox",
    tagline: "Perfect for testing & scaling gradually",
    highlight: false,
    icon: Zap,
    color: "from-blue-500 to-cyan-400",
    borderColor: "border-blue-500/30",
    bgColor: "bg-gradient-to-br from-blue-900/10 to-cyan-900/5",
    features: [
      { text: "Unlimited AI-Powered Emails", icon: Mail },
      { text: "Lifetime FREE Custom Domain Mailbox", icon: Globe },
      { text: "Advanced AI Personalization Engine", icon: Brain },
      { text: "Smart Auto-Reply & Automation Bots", icon: RefreshCw },
      { text: "Unlimited Campaigns & Templates", icon: Target },
      { text: "Multi-Channel Integration", icon: Cloud },
      { text: "Priority 24/7 Support", icon: ShieldCheck },
      { text: "No Credit Card Required", icon: Lock },
    ],
    cta: "Start Now",
    ctaColor: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
    note: "Cancel anytime, no questions asked",
    mostPopular: false,
  },
  {
    id: "yearly",
    name: "YEARLY PLAN",
    badge: "MOST POPULAR ⭐⭐⭐⭐⭐",
    price: 9999,
    period: "year",
    valueMetric: "Unlimited Everything + Extra Bonuses",
    tagline: "Best value - Join 5,000+ growing businesses",
    highlight: true,
    icon: Crown,
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/40",
    bgColor: "bg-gradient-to-br from-purple-900/20 via-black to-pink-900/10",
    features: [
      { text: "Everything in Monthly Plan", icon: Check },
      { text: "FREE 2 Extra Months (14 months for 12)", icon: Gift },
      { text: "Priority Feature Requests", icon: TrendingUp },
      { text: "Advanced Analytics Dashboard", icon: Sparkles },
      { text: "Dedicated Onboarding Specialist", icon: Users },
      { text: "Early Access to Beta Features", icon: Rocket },
      { text: "Team Collaboration Tools", icon: Shield },
      { text: "Email Deliverability Guarantee", icon: BadgeCheck },
    ],
    cta: "Get Instant Access",
    ctaColor: "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg shadow-orange-500/30",
    note: "Equivalent to ₹714/month - Save 63%",
    mostPopular: true,
    ribbonText: "SAVE 63%",
    bestDeal: true,
  },
];

const oldWayItems = [
  { name: "Email Service Provider", price: "₹599/mo" },
  { name: "Custom Mailbox Service", price: "₹399/mo" },
  { name: "AI Writing Tool", price: "₹499/mo" },
  { name: "Automation Software", price: "₹699/mo" },
  { name: "Support & Maintenance", price: "₹299/mo" },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<{name: string; amount: number} | null>(null);
  const [showPayPopup, setShowPayPopup] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      },
    },
  };

  const handlePlanSelect = (plan: {name: string; amount: number}) => {
    setSelectedPlan(plan);
    setShowPayPopup(true);
  };

  const handleClosePopup = () => {
    setShowPayPopup(false);
    setSelectedPlan(null);
  };

  const totalOldWayCost = 599 + 399 + 499 + 699 + 299;

  return (
    <>
      <section className="min-h-screen bg-[#0B0F19] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="pricing">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-purple-900/5 to-[#0B0F19]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        {/* Animated Stars */}
        <div className="stars-container">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-300">NO CREDIT CARD REQUIRED</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Simple,{' '}
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                Transparent
              </span>
              {' '}Pricing
            </h1>
            
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to scale your email marketing. 
              <span className="text-orange-300 font-semibold"> No limits.</span>
            </p>
          </motion.div>

          {/* Comparison Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
          >
            {/* The Old Way */}
            <div className="relative rounded-2xl border border-gray-800 bg-[#111827]/80 p-8 backdrop-blur-sm">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-800 px-6 py-2 rounded-full text-sm font-medium text-gray-300">
                ❌ The Old Way
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Multiple Tools = Multiple Problems</h3>
              
              <div className="space-y-4 mb-8">
                {oldWayItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-800/50 rounded-xl">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-red-400 font-bold">{item.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl border border-red-500/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-bold">Total Monthly Cost</span>
                  <span className="text-2xl font-bold text-red-400">₹{totalOldWayCost}/mo</span>
                </div>
                <p className="text-sm text-gray-400">+ Setup headaches + Integration issues</p>
              </div>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Multiple subscriptions to manage</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Constant tool switching</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>No unified analytics</span>
                </div>
              </div>
            </div>

            {/* The New Way */}
            <div className="relative rounded-2xl border-2 border-orange-500/40 bg-gradient-to-br from-orange-900/10 to-black p-8 backdrop-blur-sm">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-red-600 px-8 py-2 rounded-full text-sm font-bold text-white">
                ✅ The Smart Way
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 text-center">One Platform, Infinite Possibilities</h3>
              <p className="text-gray-300 text-center mb-8">Everything you need in one place</p>
              
              <div className="bg-gradient-to-r from-orange-900/40 to-red-900/40 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold">All-In-One Platform</span>
                  <span className="text-2xl font-bold text-green-400">₹999/mo</span>
                </div>
                <p className="text-sm text-orange-300">Lifetime custom mailbox included FREE</p>
              </div>
              
              <div className="space-y-4">
                {[
                  "Unified dashboard",
                  "Seamless integrations",
                  "24/7 priority support",
                  "No hidden fees"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl border border-green-500/30">
                <div className="flex items-center gap-3">
                  <Infinity className="w-6 h-6 text-green-400" />
                  <span className="text-white font-bold">Unlimited Everything</span>
                </div>
                <p className="text-sm text-gray-300 mt-2">No caps on emails, campaigns, or features</p>
              </div>
            </div>
          </motion.div>

          {/* Pricing Cards - Only Two Plans */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto mb-20"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredCard(plan.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className={`relative flex flex-col h-full rounded-3xl border-2 ${plan.borderColor} p-8 backdrop-blur-sm ${plan.bgColor} overflow-hidden`}
              >
                {/* Glow Effect */}
                {hoveredCard === plan.id && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Ribbon for Yearly Plan */}
                {plan.bestDeal && (
                  <div className="absolute -top-2 -right-8 rotate-45 bg-gradient-to-r from-orange-400 to-red-500 text-black font-bold px-12 py-2 text-sm">
                    {plan.ribbonText}
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8 relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} mb-4`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-300 mb-6">{plan.tagline}</p>

                  {/* Price Display */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold text-white">
                        ₹{plan.price}
                      </span>
                      <span className="text-gray-400 text-lg">
                        /{plan.period}
                      </span>
                    </div>
                    
                    {plan.id === 'yearly' && (
                      <div className="mt-2">
                        <p className="text-green-400 font-bold text-lg">
                          Save ₹1,989 vs monthly
                        </p>
                        <p className="text-gray-400 text-sm">
                          Equivalent to ₹714/month
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Value Metric */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700">
                    <Infinity className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">{plan.valueMetric}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-grow relative z-10">
                  {plan.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-gray-900/30 to-transparent hover:from-gray-800/40 transition-all"
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${plan.color}/20`}>
                        {typeof feature.icon === 'function' ? (
                          <feature.icon className="w-4 h-4 text-white" />
                        ) : (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-gray-200">{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button - Orange for High Conversion */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handlePlanSelect({
                      name: plan.name,
                      amount: plan.price,
                    });
                  }}
                  className={`relative z-10 w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 ${plan.ctaColor} text-white`}
                >
                  {plan.cta}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {/* Note */}
                <p className="text-center text-sm text-gray-400 mt-3">
                  {plan.note}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust & Enterprise Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: ShieldCheck,
                  title: "30-Day Money Back",
                  desc: "Full refund if not satisfied",
                  color: "text-green-400"
                },
                {
                  icon: Clock,
                  title: "24/7 Priority Support",
                  desc: "Average response time: 15min",
                  color: "text-blue-400"
                },
                {
                  icon: Users,
                  title: "5,000+ Growing Businesses",
                  desc: "Trusted by startups & enterprises",
                  color: "text-orange-400"
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-[#111827] border border-gray-800">
                  <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Enterprise CTA */}
            <div className="bg-gradient-to-r from-[#111827] to-black rounded-3xl border border-gray-800 p-10 text-center max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Need Custom Enterprise Solutions?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Dedicated servers, custom integrations, team training, and SLA guarantees.
              </p>
              <a
                href="https://wa.me/+917004614077"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-bold text-white hover:from-orange-700 hover:to-red-700 transition-all shadow-lg shadow-orange-500/20"
              >
                <MessageCircle className="w-6 h-6" />
                Contact Enterprise Sales Team
              </a>
            </div>
          </motion.div>

          {/* FAQ Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 text-sm">
              All plans include unlimited emails, unlimited campaigns, and lifetime custom mailbox. 
              No hidden fees. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {selectedPlan && (
        <PayPopup
          isOpen={showPayPopup}
          onClose={handleClosePopup}
          amount={selectedPlan.amount}
          planName={selectedPlan.name}
        />
      )}
    </>
  );
}