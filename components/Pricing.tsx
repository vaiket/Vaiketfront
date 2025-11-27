// components/Pricing.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
    badge: " Most Popular ⭐⭐⭐⭐⭐",
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
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const toggleVariants = {
    monthly: { x: 0 },
    yearly: { x: '100%' }
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
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
        
        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }

        .stars-container {
          position: relative;
          background: #000;
          overflow: hidden;
        }

        #stars, #stars2, #stars3 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        #stars {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 984px 345px #FFF, 458px 409px #FFF, 634px 754px #FFF, 127px 633px #FFF, 259px 894px #FFF, 712px 100px #FFF, 899px 789px #FFF, 345px 234px #FFF, 567px 456px #FFF, 123px 678px #FFF;
          animation: animStar 50s linear infinite;
        }

        #stars2 {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 234px 567px #FFF, 789px 123px #FFF, 456px 890px #FFF, 678px 345px #FFF, 901px 678px #FFF, 123px 456px #FFF, 890px 234px #FFF, 567px 901px #FFF, 345px 789px #FFF, 678px 123px #FFF;
          animation: animStar 100s linear infinite;
        }

        #stars3 {
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: 567px 234px #FFF, 123px 789px #FFF, 890px 456px #FFF, 345px 678px #FFF, 678px 901px #FFF, 456px 123px #FFF, 234px 890px #FFF, 901px 567px #FFF, 789px 345px #FFF, 123px 678px #FFF;
          animation: animStar 150s linear infinite;
        }
      `}</style>

      <section className="min-h-screen bg-black py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden stars-container" id="pricing">
        {/* Parallax Stars Background */}
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-sm text-purple-300 font-medium">Pricing</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Simple pricing for growing businesses
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Start free — upgrade based on your sending volume
            </p>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative inline-flex bg-gray-900/80 rounded-xl p-1.5 border border-gray-700 mt-8 backdrop-blur-sm"
            >
              <div className="flex">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`relative z-10 px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    billingPeriod === 'monthly' 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`relative z-10 px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    billingPeriod === 'yearly' 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Yearly
                  <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-xs rounded-full">
                    Save 20%
                  </span>
                </button>
              </div>
              
              {/* Animated Background */}
              <motion.div
                variants={toggleVariants}
                initial="monthly"
                animate={billingPeriod}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-1.5 w-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className={`relative flex flex-col h-full rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-gray-900/95 to-purple-900/30 border-purple-500/60 shadow-2xl shadow-purple-500/30 scale-[1.02] z-10'
                    : 'bg-gray-900/90 border-gray-700/70 hover:border-gray-600'
                }`}
              >
                {/* Highlight Badge */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <Star className="w-4 h-4 fill-current" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                        <plan.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {plan.name}
                      </h3>
                    </div>
                    
                    {/* Price */}
                    <div className="mb-4">
                      {typeof plan.monthlyPrice === 'number' ? (
                        <>
                          <div className="flex items-baseline justify-center gap-2">
                            <span className="text-4xl font-bold text-white">
                              ₹{billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                            </span>
                            {billingPeriod === 'yearly' && (
                              <span className="text-lg text-gray-400 line-through">
                                ₹{plan.monthlyPrice * 12}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 mt-2 text-sm">
                            {billingPeriod === 'monthly' ? 'per month' : 'per year'}
                          </p>
                        </>
                      ) : (
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-bold text-white">
                            Custom
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Value Metric */}
                    <p className="text-lg text-gray-300 font-medium">
                      {plan.valueMetric}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="flex-1 mb-8">
                    <ul className="space-y-4">
                      {plan.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Section */}
                  <div className="space-y-3 mt-auto">
                    {plan.id === 'scale' ? (
                      // Scale Plan - Talk to Sales Button
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 px-6 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 border-2 border-gray-700 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <MessageCircle className="w-5 h-5" />
                          {plan.cta}
                        </div>
                      </motion.button>
                    ) : (
                      // Starter & Growth Plans - Payment Button
                      <div className="flex flex-col space-y-3">
                        <motion.button
                          onClick={() => handlePlanSelect({
                            name: plan.name,
                            amount: billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
                          })}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                            plan.highlight
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-2xl hover:shadow-purple-500/25'
                              : 'bg-gray-800 text-white hover:bg-gray-700'
                          }`}
                        >
                          {plan.cta === 'Start Free Trial' && <Rocket className="w-5 h-5" />}
                          {plan.cta}
                        </motion.button>
                        
                        {/* WhatsApp CTA */}
                        <motion.a
                          href="https://wa.me/+917004614077"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 px-6 bg-gray-800/80 text-white rounded-xl font-semibold hover:bg-gray-700/80 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-700"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Chat on WhatsApp
                        </motion.a>
                      </div>
                    )}

                    {/* Trial Note */}
                    {plan.noCreditCard && (
                      <p className="text-center text-sm text-gray-400 pt-2">
                        Buy 1 Get 1 month free • Offer for new users only 
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Assurance */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/70 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <Shield className="w-8 h-8 text-green-400 mb-3" />
                  <h4 className="text-white font-semibold mb-2">DPDP Compliant</h4>
                  <p className="text-gray-400 text-sm">Fully compliant with Indian data laws</p>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className="w-8 h-8 text-purple-400 mb-3" />
                  <h4 className="text-white font-semibold mb-2">5-Minute Setup</h4>
                  <p className="text-gray-400 text-sm">Get started in under 5 minutes</p>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="w-8 h-8 text-indigo-400 mb-3" />
                  <h4 className="text-white font-semibold mb-2">24/7 Support</h4>
                  <p className="text-gray-400 text-sm">Dedicated support when you need it</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PayPopup Component */}
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