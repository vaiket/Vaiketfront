// components/PricingSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Zap, 
  Star,
  Building2,
  CreditCard,
  ShieldCheck,
  Users,
  ArrowRight,
  Flame,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import PayPopup from './PayPopup';

const pricingPlans = [
  {
    id: 'monthly',
    name: 'MONTHLY',
    price: 999,
    oldPrice: 1999,
    period: 'month',
    popular: false,
    accentColor: 'from-blue-500 to-cyan-400',
    borderColor: 'border-blue-500/30',
    buttonColor: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
    icon: Zap,
    features: [
      'Unlimited AI-Powered Emails',
      'Lifetime FREE Custom Domain Mailbox',
      'Advanced AI Personalization',
      'Smart Auto-Reply & Automation',
      'Unlimited Campaigns & Templates',
      'Multi-Channel Integration',
      'Priority 24/7 Support',
      'No Credit Card Required'
    ],
    cta: 'Start Now',
    badge: 'Flexible',
    note: 'Cancel anytime',
    bgColor: 'bg-gradient-to-br from-blue-900/10 to-cyan-900/5',
  },
  {
    id: 'yearly',
    name: 'YEARLY',
    price: 9999,
    oldPrice: 14988,
    period: 'year',
    popular: true,
    accentColor: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/40',
    buttonColor: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700',
    icon: Star,
    features: [
      'Everything in Monthly Plan',
      'FREE 2 Extra Months',
      'Priority Feature Requests',
      'Advanced Analytics Dashboard',
      'Dedicated Onboarding',
      'Early Beta Access',
      'Team Collaboration Tools',
      'Delivery Guarantee'
    ],
    cta: 'Get Best Deal',
    badge: 'POPULAR',
    note: 'Save 63% • ₹714/month',
    savings: 'Save 63%',
    monthlyEquivalent: '₹714/month',
    bgColor: 'bg-gradient-to-br from-purple-900/20 via-black to-pink-900/10',
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    price: null,
    period: 'custom',
    popular: false,
    accentColor: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-500/30',
    buttonColor: 'bg-blue-900 hover:bg-blue-800',
    icon: Building2,
    features: [
      'Everything in Yearly Plan',
      'Custom AI Model Training',
      'Dedicated Account Manager',
      'Custom API Development',
      '99.9% Uptime SLA',
      'Advanced Security & Compliance',
      'White-label Solution',
      '24/7 Phone Support'
    ],
    cta: 'Contact Sales',
    badge: 'Custom',
    note: 'Tailored solutions',
    bgColor: 'bg-gradient-to-br from-gray-900/50 to-black/50',
  },
];

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<{name: string; amount: number} | null>(null);
  const [showPayPopup, setShowPayPopup] = useState(false);

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
      <section className="py-16 bg-[#0B0F19] relative" id="pricing">
        {/* Minimal Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-purple-900/5 to-[#0B0F19]"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Clean Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-4">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-300">NO CREDIT CARD REQUIRED</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Plan
            </h1>
            
            <p className="text-gray-300 max-w-2xl mx-auto">
              All plans include unlimited AI emails, lifetime domain mailbox, and priority support.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl border ${plan.borderColor} p-6 ${plan.bgColor} backdrop-blur-sm flex flex-col h-full ${
                  plan.popular ? 'border-purple-500/50 ring-1 ring-purple-500/20' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${plan.accentColor}`}>
                      <plan.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">{plan.name}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-white">
                        {plan.price ? `₹${plan.price}` : 'Custom'}
                      </span>
                      {plan.price && (
                        <span className="text-gray-400">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    
                    {plan.oldPrice && plan.price && (
                      <div className="mt-1">
                        <span className="text-gray-500 text-sm line-through">
                          ₹{plan.oldPrice}
                        </span>
                      </div>
                    )}
                    
                    {plan.monthlyEquivalent && (
                      <p className="text-green-400 text-sm mt-1">
                        {plan.monthlyEquivalent}
                      </p>
                    )}
                  </div>

                  {/* Badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700 mb-4">
                    <span className="text-sm text-white">{plan.badge}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-200 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (plan.id !== 'enterprise') {
                      handlePlanSelect({
                        name: plan.name,
                        amount: plan.price || 0,
                      });
                    } else {
                      window.open('https://wa.me/+917004614077', '_blank');
                    }
                  }}
                  className={`w-full py-3 rounded-lg font-semibold ${plan.buttonColor} text-white flex items-center justify-center gap-2`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                {/* Note */}
                <p className="text-center text-gray-400 text-sm mt-3">
                  {plan.note}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Quick Comparison Table */}
          <div className="bg-gray-900/30 rounded-xl border border-gray-800 overflow-hidden mb-12">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white mb-2">Compare Features</h3>
              <p className="text-gray-400">See what's included in each plan</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-4 text-gray-400">Feature</th>
                    <th className="text-center p-4">
                      <div className="text-white font-semibold">Monthly</div>
                    </th>
                    <th className="text-center p-4 bg-purple-500/10">
                      <div className="text-purple-300 font-semibold">Yearly</div>
                    </th>
                    <th className="text-center p-4">
                      <div className="text-blue-300 font-semibold">Enterprise</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'Unlimited AI Emails',
                    'Custom Domain Mailbox',
                    'Advanced Personalization',
                    'Multi-Channel Integration',
                    'Priority Support',
                    'Team Collaboration',
                    'API Access',
                    'Custom AI Training'
                  ].map((feature, index) => (
                    <tr key={index} className="border-b border-gray-800 last:border-0">
                      <td className="p-4 text-gray-300">{feature}</td>
                      <td className="p-4 text-center">
                        {index < 7 ? <Check className="w-4 h-4 text-green-400 mx-auto" /> : '—'}
                      </td>
                      <td className="p-4 text-center bg-purple-500/10">
                        {index < 8 ? <Check className="w-4 h-4 text-green-400 mx-auto" /> : '—'}
                      </td>
                      <td className="p-4 text-center">
                        <Check className="w-4 h-4 text-green-400 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Simple Trust Signals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-gray-800/30">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <span className="text-white">30-Day Money Back</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-gray-800/30">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-white">5,000+ Businesses</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-gray-800/30">
              <CreditCard className="w-5 h-5 text-orange-400" />
              <span className="text-white">No Credit Card Required</span>
            </div>
          </div>

          {/* Clean CTA */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlanSelect({
                  name: 'Yearly Plan',
                  amount: 9999,
                })}
                className="px-8 py-3 rounded-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 text-white flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Start 14-Day Free Trial
              </motion.button>
              
              <a
                href="https://wa.me/+917004614077"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg font-semibold bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Need Help?
              </a>
            </div>
          </div>
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