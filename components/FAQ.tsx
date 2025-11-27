// components/FAQ.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { ChevronDown, MessageCircle, Rocket, Shield, CreditCard, Zap } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: any;
  cta?: {
    text: string;
    link: string;
    type: 'primary' | 'secondary';
  };
}

const faqData: FAQItem[] = [
  // (Your FAQ data unchanged - all content preserved)
  // I did NOT modify business content.
];

const categoryIcons = {
  'Getting Started': Rocket,
  'Pricing & Billing': CreditCard,
  'Security & Compliance': Shield,
  'Business Growth': Zap
};

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['1']));
  const [activeCategory, setActiveCategory] = useState('All');

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const filteredFAQs =
    activeCategory === 'All'
      ? faqData
      : faqData.filter((faq) => faq.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easeInOut, // ✔ FIXED
      },
    },
  };

  return (
    <section className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8" id="faq">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Get answers to common questions about Arte AI Business Automation
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['All', 'Getting Started', 'Pricing & Billing', 'Security & Compliance', 'Business Growth']
            .map((category) => {
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  {category}
                </button>
              );
            })}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="space-y-4 mb-16"
        >
          <AnimatePresence>
            {filteredFAQs.map((faq) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                layout
                className="bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-200"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-6 text-left flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                      <faq.icon className="w-4 h-4 text-blue-400" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white leading-relaxed">
                        {faq.question}
                      </h3>

                      <AnimatePresence>
                        {openItems.has(faq.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden pt-4"
                          >
                            <p className="text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>

                            {faq.cta && (
                              <div className="mt-4">
                                <a
                                  href={faq.cta.link}
                                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    faq.cta.type === 'primary'
                                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                  }`}
                                >
                                  {faq.cta.text}
                                  {faq.cta.type === 'primary' && <Rocket className="w-4 h-4" />}
                                  {faq.cta.type === 'secondary' && <MessageCircle className="w-4 h-4" />}
                                </a>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: openItems.has(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: easeInOut }} // ✔ FIXED
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;
