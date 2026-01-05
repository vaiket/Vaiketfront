"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, Mail, Brain, Shield, CreditCard, Smartphone, Users, HelpCircle, MessageCircle } from "lucide-react";

export default function FAQSection() {
 const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
  setOpenIndex(openIndex === index ? null : index);
};

  const faqs = [
    {
      question: "What is Vaiket Business Email?",
      answer: "Vaiket Business Email is an AI-powered email platform that combines professional custom domain emails with automated AI customer support, lead capture, and sales automation.",
      category: "Product",
      icon: <Mail className="w-5 h-5 text-purple-400" />
    },
    {
      question: "Do I need my own domain name?",
      answer: "Yes, you'll need your own domain name (e.g., yourbusiness.com) to create professional email addresses. We help you set it up quickly if you don't have one.",
      category: "Product",
      icon: <Mail className="w-5 h-5 text-purple-400" />
    },
    {
      question: "How does AI auto-reply work?",
      answer: "Our V-AI analyzes incoming emails and provides instant, contextual responses 24/7. It learns from your business context and can handle common inquiries automatically.",
      category: "Product",
      icon: <Brain className="w-5 h-5 text-blue-400" />
    },
    {
      question: "Can I migrate my existing emails?",
      answer: "Absolutely! We provide seamless migration tools to transfer your existing emails, contacts, and folders from Gmail, Outlook, or any IMAP-supported service.",
      category: "Product",
      icon: <Mail className="w-5 h-5 text-purple-400" />
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade encryption, secure IMAP/SMTP protocols, and comply with global data protection standards. Your data is protected 24/7.",
      category: "Product",
      icon: <Shield className="w-5 h-5 text-green-400" />
    },
    {
      question: "Is there a free trial or refund guarantee?",
      answer: "We offer a 14-day free trial with full features. If you're not satisfied, we provide a 30-day money-back guarantee on all annual plans.",
      category: "Pricing",
      icon: <CreditCard className="w-5 h-5 text-yellow-400" />
    },
    {
      question: "Can I cancel my plan anytime?",
      answer: "Yes, you can cancel or change your plan anytime. No long-term contracts or hidden fees. Cancel directly from your dashboard.",
      category: "Pricing",
      icon: <CreditCard className="w-5 h-5 text-yellow-400" />
    },
    {
      question: "Does it work on mobile mail apps?",
      answer: "Yes! Vaiket works seamlessly with all major mobile mail apps including Apple Mail, Gmail, Outlook, and any IMAP-supported email client.",
      category: "Technical",
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />
    },
    {
      question: "Can multiple teammates use the same inbox?",
      answer: "Yes, you can add unlimited team members to shared inboxes with role-based permissions and collaborative features.",
      category: "Technical",
      icon: <Users className="w-5 h-5 text-pink-400" />
    },
    {
      question: "What if AI replies incorrectly?",
      answer: "You can review and edit AI responses before sending, or set up approval workflows. The AI learns from your corrections to improve over time.",
      category: "Support",
      icon: <HelpCircle className="w-5 h-5 text-orange-400" />
    },
    {
      question: "Do you provide customer support?",
      answer: "Yes, we offer 24/7 customer support via email, chat, and phone for all paid plans. Free trial users get email support with quick response times.",
      category: "Support",
      icon: <MessageCircle className="w-5 h-5 text-red-400" />
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative bg-black py-24 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers related to Vaiket Business Emails, AI Support, and Billing.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`rounded-2xl border transition-all duration-300 ease-in-out backdrop-blur-xl
                         ${openIndex === index 
                           ? 'border-purple-500/50 bg-gradient-to-b from-[#13131A] to-[#0D0D12] shadow-lg shadow-purple-500/10' 
                           : 'border-gray-800 bg-gradient-to-b from-[#13131A] to-[#0D0D12] hover:border-purple-500/30'}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {faq.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white text-lg pr-8">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                
                <div className="flex-shrink-0 ml-4">
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 text-gray-400"
                  >
                    {openIndex === index ? (
                      <Minus className="w-6 h-6" />
                    ) : (
                      <Plus className="w-6 h-6" />
                    )}
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="pl-9">
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-gray-800 rounded-2xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Our support team is here to help you get the most out of Vaiket.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Contact Support
              </button>
              <button className="px-6 py-3 border border-gray-700 text-gray-300 rounded-xl font-semibold hover:border-purple-500/50 hover:text-white transition-all duration-300">
                Start Free Trial
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}