// components/FAQSection.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle, Mail, CreditCard, RefreshCw, Shield, Globe, Users } from 'lucide-react';

const faqs = [
  {
    question: "Is there a free trial?",
    answer: "Yes, all plans come with a 14-day free trial. No credit card required to start. You can explore all features during the trial period.",
    icon: RefreshCw,
    category: "general"
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. You can cancel your subscription at any time. When you cancel, you'll continue to have access until the end of your billing period.",
    icon: CreditCard,
    category: "billing"
  },
  {
    question: "What happens to my emails if I cancel?",
    answer: "Your data is safe for 90 days after cancellation. You can export all your emails, templates, and contact lists anytime.",
    icon: Mail,
    category: "general"
  },
  {
    question: "How does the lifetime custom domain mailbox work?",
    answer: "Once you add your custom domain, the mailbox stays free forever even if you cancel your subscription. This is our commitment to you.",
    icon: Globe,
    category: "features"
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, request a refund within 30 days for a full refund.",
    icon: Shield,
    category: "billing"
  },
  {
    question: "How many team members can I add?",
    answer: "All plans support unlimited team members. The Yearly and Enterprise plans include advanced team collaboration tools.",
    icon: Users,
    category: "features"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, Net Banking, and PayPal. All transactions are secure and encrypted.",
    icon: CreditCard,
    category: "billing"
  },
  {
    question: "Is there a setup fee?",
    answer: "No setup fees. Your first payment is only charged after your 14-day free trial ends.",
    icon: HelpCircle,
    category: "billing"
  }
];

const categories = [
  { id: 'all', name: 'All Questions', count: faqs.length },
  { id: 'billing', name: 'Billing', count: faqs.filter(f => f.category === 'billing').length },
  { id: 'features', name: 'Features', count: faqs.filter(f => f.category === 'features').length },
  { id: 'general', name: 'General', count: faqs.filter(f => f.category === 'general').length }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="py-16 bg-[#0B0F19]" id="faq">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 mb-4">
            <HelpCircle className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">FAQ</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about our plans and services.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-800 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-900/30 hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-md bg-gray-800/50">
                    <faq.icon className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-left font-medium text-white">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 border-t border-gray-800 bg-gray-900/10">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 p-6 rounded-xl border border-gray-800 bg-gradient-to-r from-gray-900/50 to-black/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-400">
                Can't find the answer you're looking for? Please chat with our team.
              </p>
            </div>
            <a
              href="https://wa.me/+917004614077"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}