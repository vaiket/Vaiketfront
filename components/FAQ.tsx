// components/FAQ.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  {
    id: '1',
    question: 'How quickly can I set up Arte and start automating?',
    answer: 'Most businesses get fully operational in under 30 minutes with our AI-powered onboarding. Connect your CRM, email, and business tools using pre-built automation templates. Import customer data automatically and launch your first AI workflows immediately—no technical expertise needed.',
    category: 'Getting Started',
    icon: Rocket,
    cta: {
      text: 'Start Free Trial',
      link: '/signup',
      type: 'primary'
    }
  },
  {
    id: '2',
    question: 'What makes Arte different from other automation tools?',
    answer: 'Arte uses advanced machine learning to understand your business processes and suggest optimal workflows automatically. Unlike traditional tools, we offer true no-code visual workflow building, predictive analytics, seamless 500+ app integrations, and enterprise security with consumer-level simplicity.',
    category: 'Getting Started',
    icon: Zap
  },
  {
    id: '3',
    question: 'Do I need technical skills to use Arte?',
    answer: 'Absolutely not. Built for business owners and non-technical teams, Arte features intuitive drag-and-drop interfaces, pre-built templates, and AI-assisted setup. Complex multi-channel customer journeys can be set up in minutes with our visual designer and comprehensive support resources.',
    category: 'Getting Started',
    icon: MessageCircle,
    cta: {
      text: 'Chat on WhatsApp',
      link: 'https://wa.me/+917004614077',
      type: 'secondary'
    }
  },
  {
    id: '4',
    question: 'What is included in the free trial?',
    answer: '14-day free trial with full premium access: unlimited automation workflows, AI chatbot builder, CRM integration, advanced analytics. Connect 5 business apps and automate entire customer journeys. Transparent pricing starts at $29/month after trial with no hidden fees.',
    category: 'Pricing & Billing',
    icon: CreditCard
  },
  {
    id: '5',
    question: 'Can I change plans as my business grows?',
    answer: 'Yes! Scale seamlessly with flexible plan changes anytime. Upgrade for immediate feature access or downgrade with prorated credits. Our AI analyzes your usage patterns to recommend optimal plans based on automation needs and growth trajectory.',
    category: 'Pricing & Billing',
    icon: CreditCard,
    cta: {
      text: 'Start Free Trial',
      link: '/signup',
      type: 'primary'
    }
  },
  {
    id: '6',
    question: 'Are there any hidden costs?',
    answer: 'No hidden costs or surprise fees. Transparent all-inclusive pricing covers all features without per-user fees. Only additional costs are enterprise customizations or dedicated infrastructure, clearly communicated upfront. 30-day money-back guarantee included.',
    category: 'Pricing & Billing',
    icon: CreditCard
  },
  {
    id: '7',
    question: 'How does Arte protect my business data?',
    answer: 'Enterprise-grade security with AES-256 encryption, SOC 2 Type II compliance, regular audits. Data stored in secure AWS centers with redundancy. Strict access controls, 2FA, real-time threat monitoring. Customer data never shared without consent, TLS 1.3 encryption.',
    category: 'Security & Compliance',
    icon: Shield
  },
  {
    id: '8',
    question: 'Is Arte DPDP Act compliant?',
    answer: 'Yes, fully compliant with Digital Personal Data Protection Act 2023 and global regulations. Comprehensive data processing agreements, consent management, data localization options. Built-in features for data subject rights management and secure erasure procedures.',
    category: 'Security & Compliance',
    icon: Shield
  },
  {
    id: '9',
    question: 'What security certifications does Arte maintain?',
    answer: 'ISO 27001, SOC 2 Type II, GDPR compliance with regular third-party audits and penetration testing. Infrastructure on compliant cloud platforms with encryption in transit and at rest. Working towards ISO 27701 certification for privacy management.',
    category: 'Security & Compliance',
    icon: Shield,
    cta: {
      text: 'Chat on WhatsApp',
      link: 'https://wa.me/+917004614077',
      type: 'secondary'
    }
  },
  {
    id: '10',
    question: 'How can Arte help scale my business revenue?',
    answer: 'Automates revenue-critical processes: lead qualification, customer onboarding, retention campaigns. AI analyzes behavior for upsell opportunities and personalized outreach. Typical results: 35-50% manual workload reduction, 40% faster lead response, 25% retention increase.',
    category: 'Business Growth',
    icon: Zap,
    cta: {
      text: 'Start Free Trial',
      link: '/signup',
      type: 'primary'
    }
  },
  {
    id: '11',
    question: 'Can Arte integrate with my existing tools?',
    answer: 'Seamless integration with 500+ applications including Salesforce, HubSpot, Zoho. AI-powered integration assistant automatically maps data fields and suggests optimal workflow connections. Complex multi-system workflows without technical expertise.',
    category: 'Business Growth',
    icon: Zap
  },
  {
    id: '12',
    question: 'What ROI can I expect from Arte?',
    answer: 'Most achieve full ROI within 3-6 months. Typical results: 60% reduction in manual data entry, 45% faster customer response, 30% sales conversion increase, 50% more efficient marketing. AI continuously optimizes workflows for increasing value over time.',
    category: 'Business Growth',
    icon: Zap
  }
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
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = activeCategory === 'All' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqData.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <section className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8" id="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <div className="max-w-4xl mx-auto">
        {/* Simple Header */}
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

        {/* Simple Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['All', 'Getting Started', 'Pricing & Billing', 'Security & Compliance', 'Business Growth'].map((category) => {
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

        {/* Simple FAQ Grid */}
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
                  className="w-full px-6 py-6 text-left flex items-start justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                      <faq.icon className="w-4 h-4 text-blue-400" />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-semibold text-white leading-relaxed">
                        {faq.question}
                      </h3>
                      
                      <AnimatePresence>
                        {openItems.has(faq.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4">
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
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ rotate: openItems.has(faq.id) ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Simple CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-400 mb-6">
            Our team is here to help you get started with Arte AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Start Free Trial
            </a>
            
            <a
              href="https://wa.me/+917004614077"
              className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Support
            </a>
          </div>

          {/* Simple Compliance Note */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-gray-800">
            {['SSL Secure', 'DPDP Compliant', 'Made in India'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;