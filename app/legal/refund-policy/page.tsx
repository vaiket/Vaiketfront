"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Shield, 
  CreditCard, 
  RotateCcw,
  XCircle,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Building,
  FileText,
  MapPin,
  Mail
} from "lucide-react";

export default function RefundPolicy() {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const refundData = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "1. Subscription-Based Billing",
      content: `Vaiket services operate on a prepaid subscription model.
Payments are charged in advance for the selected plan.`,
      warning: false
    },
    {
      icon: <XCircle className="w-6 h-6" />,
      title: "2. No Refunds for Current Billing Cycle",
      content: `Once subscribed and the payment is processed:

❌ No refunds are provided for the ongoing billing period
❌ Even if the user cancels immediately after purchase
❌ Because service is instantly provisioned and system resources are allocated`,
      warning: true
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "3. Cancellation Policy",
      content: `Users may cancel anytime through:

Dashboard → Billing → Cancel Subscription

✅ Service remains active until the current paid period expires
❌ No partial refunds for unused time`,
      warning: false
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "4. Free Trials & Promotional Offers",
      content: `If a free trial is available:

• No charge during trial
• Charges start automatically after trial unless cancelled beforehand
• Promotional pricing is non-refundable & non-transferable.`,
      warning: false
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "5. Duplicate or Fraudulent Payments",
      content: `If payment is:

• Charged twice due to system error
• Unauthorized (card/bank fraud)

We will investigate and issue a refund within 7–10 working days after verification.`,
      warning: true
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "6. Failed Transactions",
      content: `If money is deducted but subscription is not activated:

• Refund will be automatically processed by your bank within 5–7 working days.

You may contact support with:

• Email used for login
• Transaction ID
• Payment screenshot

📩 support@vaiket.com`,
      warning: true
    },
    {
      icon: <XCircle className="w-6 h-6" />,
      title: "7. Account Termination Due to Misuse",
      content: `Refunds are not granted if account is closed for:

• Abuse, spam, illegal usage
• Violation of Acceptable Use Policy
• Chargeback fraud attempts`,
      warning: true
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "8. Payment Gateway Rules",
      content: `Refund timelines depend on:

• Bank processing time
• Payment provider rules (Razorpay / Stripe)`,
      warning: false
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
    <section className="relative bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-gray-200 mb-6">
            <RotateCcw className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700">Refund Policy</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Refund & Cancellation Policy
          </h1>

          {/* Company Details */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Building className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-gray-500 mb-1">Company Name</div>
                <div className="font-semibold text-gray-900">Vikas Web Development Pvt. Ltd.</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-gray-500 mb-1">Last Updated</div>
                <div className="font-semibold text-gray-900">November 29, 2025</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-gray-500 mb-1">Registered Office</div>
                <div className="font-semibold text-gray-900">Rajendra Nagar, Ranchi — Jharkhand, India</div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-orange-900 text-lg mb-2">
                  Important Refund Notice
                </h3>
                <p className="text-orange-800">
                  Vaiket operates on a no-refund policy for active subscriptions. Please read this policy carefully before making a purchase.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Navigation - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block mb-8"
        >
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Policy Sections</h3>
            <div className="grid grid-cols-4 gap-2">
              {refundData.map((section, index) => (
                <button
                  key={index}
                  onClick={() => {
                    toggleSection(index);
                    setTimeout(() => {
                      document.getElementById(`section-${index}`)?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }, 100);
                  }}
                  className={`p-3 rounded-xl text-center transition-all duration-200 ${
                    openSections.includes(index)
                      ? 'bg-purple-100 border border-purple-200'
                      : 'bg-gray-50 border border-gray-100 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-2xl font-bold text-gray-600 mb-1">{index + 1}</div>
                  <div className="text-xs font-medium text-gray-600 leading-tight">
                    {section.title.split(" ").slice(1).join(" ")}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Refund Policy Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {refundData.map((section, index) => (
            <motion.div
              key={index}
              id={`section-${index}`}
              variants={item}
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                section.warning
                  ? 'border-orange-200 hover:border-orange-300'
                  : 'border-gray-200 hover:border-gray-300'
              } ${openSections.includes(index) ? 'shadow-lg' : 'shadow-sm'}`}
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${
                    section.warning 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'bg-purple-50 text-purple-600'
                  }`}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {section.title}
                    </h3>
                    {section.warning && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium mt-1">
                        <AlertTriangle className="w-3 h-3" />
                        Important
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0 ml-4">
                  {openSections.includes(index) ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>

              {openSections.includes(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 overflow-hidden"
                >
                  <div className="pl-16">
                    <div className={`prose prose-gray max-w-none ${
                      section.warning ? 'border-l-4 border-orange-400 pl-4' : ''
                    }`}>
                      {section.content.split('\n').map((paragraph, idx) => (
                        <p key={idx} className={`mb-3 text-gray-700 leading-relaxed ${
                          paragraph.includes('❌') ? 'text-red-700 font-medium' : ''
                        } ${
                          paragraph.includes('✅') ? 'text-green-700 font-medium' : ''
                        } ${
                          paragraph.includes('📩') ? 'bg-blue-50 p-3 rounded-lg border border-blue-200 font-medium' : ''
                        }`}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Support Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-blue-50 rounded-2xl p-8 border border-blue-200 mt-8"
        >
          <div className="flex items-start gap-4">
            <Mail className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Need Help with Refunds?
              </h3>
              <p className="text-blue-800 mb-4">
                Contact our support team for assistance with payment issues, failed transactions, or duplicate charges.
              </p>
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <Mail className="w-4 h-4" />
                support@vaiket.com
              </div>
            </div>
          </div>
        </motion.div>

        {/* Agreement Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Policy Agreement
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              By subscribing to Vaiket, you acknowledge that you understand this Refund & Cancellation Policy and agree to all terms written above.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25">
                I Understand & Accept
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-all duration-300">
                Download PDF Copy
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}