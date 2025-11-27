// components/Pricing.tsx
'use client';

import { useState } from 'react';
import { motion, easeInOut } from 'framer-motion';
import { Check, Star, MessageCircle, Rocket, Zap, Users, Shield } from 'lucide-react';
import PayPopup from './PayPopup';

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    badge: "Best for individuals",
    monthlyPrice: 499,
    yearlyPrice: 4990,
    savePercent: "Save 20%",
    valueMetric: "Up to 10,000 emails / month",
    features: [
      "10,000 AI-powered emails / month",
      "IMAP/SMTP Email Automation",
      "Smart Auto-Reply Bot",
      "Basic Lead Verification",
      "Basic Email Templates",
      "Campaign Scheduler",
      "Standard Support 24*7",
    ],
    cta: "Start Free Trial",
    noCreditCard: true,
    icon: Zap,
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Most Popular ⭐⭐⭐⭐⭐",
    highlight: true,
    monthlyPrice: 999,
    yearlyPrice: 14990,
    savePercent: "Save 70%",
    valueMetric: "Up to 50,000 emails / month",
    features: [
      "50,000 emails / month",
      "Everything in Starter",
      "AI Personalization (Names, Dynamic Text)",
      "Advanced AI Personalization",
      "Inbox Spam-Score + Fix Suggestions",
      "Advanced Lead Verification",
      "AI Generated Campaigns",
      "Multi-Channel Automation (Email + chatbot)"
    ],
    cta: "Buy 1 Month, Get 1M Free 🎉",
    noCreditCard: true,
    icon: Users,
  },
  {
    id: "scale",
    name: "Scale",
    badge: "For Enterprises & Bulk Senders",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    valueMetric: "100k+ emails & Enterprise",
    features: [
      "Dedicated Sending IP",
      "Team Workspaces",
      "Custom Domain Warmup",
      "Deliverability Specialist Support",
      "Automation Engineer Assigned",
      "24×7 Premium Support",
      "Custom Integrations & SLA",
    ],
    cta: "Talk to Sales",
    noCreditCard: false,
    icon: Shield,
  },
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<{name: string; amount: number} | null>(null);
  const [showPayPopup, setShowPayPopup] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: easeInOut },
    },
  };

  const toggleVariants = {
    monthly: { x: 0 },
    yearly: { x: '100%' },
  };

  const handlePlanSelect = (plan: {name: string; amount: number}) => {
    setSelectedPlan(plan);
    setShowPayPopup(true);
  };

  const handleClosePopup = () => {
    setShowPayPopup(false);
    setSelectedPlan(null);
  };

  return (
    <>
      <section className="min-h-screen bg-black py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden stars-container" id="pricing">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple pricing for growing businesses
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Start free — upgrade based on your sending volume
            </p>

            <div className="relative inline-flex bg-gray-900/80 rounded-xl p-1.5 border border-gray-700 mt-8 backdrop-blur-sm">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`relative z-10 px-8 py-3 rounded-lg text-sm font-medium ${
                  billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'
                }`}
              >
                Monthly
              </button>

              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`relative z-10 px-8 py-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  billingPeriod === 'yearly' ? 'text-white' : 'text-gray-400'
                }`}
              >
                Yearly <span className="bg-green-600 px-2 py-1 rounded-full text-xs">Save 20%</span>
              </button>

              <motion.div
                variants={toggleVariants}
                initial="monthly"
                animate={billingPeriod}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-1.5 w-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg"
              />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className={`relative flex flex-col h-full rounded-2xl border-2 p-8 backdrop-blur-sm ${
                  plan.highlight 
                    ? 'border-purple-500 bg-purple-900/20 shadow-purple-500/20 shadow-xl'
                    : 'border-gray-800 bg-gray-900'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 px-6 py-2 rounded-full font-bold text-gray-800">
                    <Star className="inline w-4 h-4 mr-2" /> {plan.badge}
                  </div>
                )}

                <div className="text-center mb-6">
                  <plan.icon className="w-10 h-10 mx-auto text-purple-400 mb-3" />
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>

                  <div className="mt-3">
                    {typeof plan.monthlyPrice === 'number' ? (
                      <>
                        <span className="text-4xl font-bold text-white">
                          ₹{billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                        </span>
                        <p className="text-gray-400 text-sm">{billingPeriod}</p>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-white">Custom</span>
                    )}
                  </div>

                  <p className="text-gray-300 mt-3">{plan.valueMetric}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <Check className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.id !== 'scale' ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (typeof plan.monthlyPrice === 'number') {
                        handlePlanSelect({
                          name: plan.name,
                          amount:
                            billingPeriod === 'monthly'
                              ? plan.monthlyPrice
                              : plan.yearlyPrice as number,
                        });
                      }
                    }}
                    className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700"
                  >
                    {plan.cta}
                  </motion.button>
                ) : (
                  <a
                    href="https://wa.me/+917004614077"
                    className="w-full py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 flex justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" /> {plan.cta}
                  </a>
                )}

                {plan.noCreditCard && (
                  <p className="text-center text-sm text-gray-400 mt-3">
                    No credit card required
                  </p>
                )}
              </motion.div>
            ))}
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
