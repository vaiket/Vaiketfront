// components/PricingSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  MessageCircle,
  TrendingUp,
  Globe,
  Target,
  BarChart3,
  X,
  ChevronRight
} from 'lucide-react';
import PayPopup from './PayPopup';

const pricingPlans = [
  {
    id: 'monthly',
    name: 'Monthly',
    tagline: 'Perfect for getting started',
    price: 999,
    oldPrice: 1999,
    period: 'month',
    popular: false,
    accentColor: 'from-blue-500 to-blue-600',
    borderColor: 'border-gray-200',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
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
    cta: 'Start Free Trial',
    badge: 'Flexible',
    note: 'Cancel anytime',
    bgColor: 'bg-white',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    tagline: 'Best value for growing businesses',
    price: 9999,
    oldPrice: 14988,
    period: 'year',
    popular: true,
    accentColor: 'from-purple-600 to-purple-700',
    borderColor: 'border-purple-500/50',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
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
    bgColor: 'bg-white',
    highlight: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For large organizations',
    price: null,
    period: 'custom',
    popular: false,
    accentColor: 'from-gray-700 to-gray-800',
    borderColor: 'border-gray-200',
    buttonColor: 'bg-gray-800 hover:bg-gray-900',
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
    bgColor: 'bg-white',
  },
];

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<{name: string; amount: number; id: string} | null>(null);
  const [showPayPopup, setShowPayPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handlePlanSelect = async (plan: {name: string; amount: number; id: string}) => {
    setIsLoading(true);
    setSelectedPlan(plan);
    
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 100));
    
    setShowPayPopup(true);
    setIsLoading(false);
  };

  const handleClosePopup = () => {
    setShowPayPopup(false);
    setTimeout(() => {
      setSelectedPlan(null);
    }, 300);
  };

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (showPayPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPayPopup]);

  return (
    <>
      <section className="py-20 bg-gray-50" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-6"
            >
              <Flame className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">NO CREDIT CARD REQUIRED</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
            >
              Simple, Transparent Pricing
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Start for free. All plans include our core features. Upgrade anytime.
            </motion.p>
          </div>

          {/* Pricing Cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative rounded-2xl border ${plan.borderColor} p-8 ${plan.bgColor} shadow-lg flex flex-col h-full transition-all duration-300 ${
                  plan.highlight 
                    ? 'ring-2 ring-purple-500 shadow-xl' 
                    : 'hover:shadow-xl hover:border-gray-300'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold tracking-wide shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg bg-gradient-to-br ${plan.accentColor}`}>
                        <plan.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                        <p className="text-gray-500 text-sm">{plan.tagline}</p>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
                        <span className="text-sm font-medium text-gray-700">{plan.badge}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-bold text-gray-900">
                        {plan.price ? `₹${plan.price}` : 'Custom'}
                      </span>
                      {plan.price && (
                        <span className="text-gray-500 text-xl">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    
                    {plan.oldPrice && plan.price && (
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gray-500 text-sm line-through">
                          ₹{plan.oldPrice}
                        </span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
                          Save {Math.round((1 - plan.price/plan.oldPrice) * 100)}%
                        </span>
                      </div>
                    )}
                    
                    {plan.monthlyEquivalent && (
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Only {plan.monthlyEquivalent}</span>
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: plan.id === 'enterprise' ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (plan.id !== 'enterprise') {
                        handlePlanSelect({
                          name: plan.name,
                          amount: plan.price || 0,
                          id: plan.id
                        });
                      } else {
                        window.open('https://wa.me/+917004614077', '_blank');
                      }
                    }}
                    disabled={isLoading}
                    className={`w-full py-3.5 rounded-lg font-semibold ${plan.buttonColor} text-white flex items-center justify-center gap-2 transition-all duration-200 ${
                      isLoading && plan.id === selectedPlan?.id ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading && plan.id === selectedPlan?.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        {plan.cta}
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Features */}
                <div className="mb-8 flex-grow">
                  <div className="text-gray-700 font-medium mb-4">What's included:</div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Note */}
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-gray-500 text-sm text-center">
                    {plan.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Signals */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="flex items-center gap-4 p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
              <div className="p-3 rounded-lg bg-green-50">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">30-Day Money Back</h4>
                <p className="text-gray-600 text-sm">Full refund if not satisfied</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
              <div className="p-3 rounded-lg bg-blue-50">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">5,000+ Businesses</h4>
                <p className="text-gray-600 text-sm">Trust us with their growth</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
              <div className="p-3 rounded-lg bg-orange-50">
                <CreditCard className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">No Credit Card</h4>
                <p className="text-gray-600 text-sm">Start your free trial today</p>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <p className="text-gray-600">Get answers to common questions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: 'Is there a free trial?',
                  a: 'Yes! All plans include a 14-day free trial. No credit card required.'
                },
                {
                  q: 'Can I cancel anytime?',
                  a: 'Absolutely. You can cancel your subscription at any time with no questions asked.'
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'We offer a 30-day money-back guarantee on all annual plans.'
                },
                {
                  q: 'Can I upgrade or downgrade?',
                  a: 'Yes, you can change your plan at any time. You\'ll be credited for unused time.'
                }
              ].map((faq, index) => (
                <div key={index} className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex flex-col items-center gap-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h3>
                <p className="text-gray-600 text-lg">Join thousands of businesses already using our platform</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlanSelect({
                    name: 'Yearly Plan',
                    amount: 9999,
                    id: 'yearly'
                  })}
                  className="px-8 py-4 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 text-white flex items-center gap-3 hover:shadow-xl transition-all duration-200"
                >
                  <Sparkles className="w-5 h-5" />
                  Start 14-Day Free Trial
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <a
                  href="https://wa.me/+917004614077"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 flex items-center gap-3 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5" />
                  Talk to Sales
                </a>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showPayPopup && selectedPlan && (
          <PayPopup
            key="pay-popup"
            isOpen={showPayPopup}
            onClose={handleClosePopup}
            amount={selectedPlan.amount}
            planName={selectedPlan.name}
          />
        )}
      </AnimatePresence>
    </>
  );
}