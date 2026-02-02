"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Building,
  Clock,
  MapPin,
  Mail,
  FileText,
  UserCheck,
  Ban,
  Gavel,
  Flag
} from "lucide-react";

export default function AntiSpamPolicy() {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const spamPolicyData = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "1. Definition of Spam",
      content: `Spam includes:

❌ Unsolicited bulk emails
❌ Phishing / fraud attempts
❌ Emails with misleading subject lines
❌ Messages without valid sender identification`,
      warning: true
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "2. User Responsibilities",
      content: `Users must ensure:

✅ Valid consent from recipients
✅ All communications contain a working unsubscribe link
✅ No purchased/harvested email lists are used`,
      warning: false
    },
    {
      icon: <Ban className="w-6 h-6" />,
      title: "3. Prohibited Activities",
      content: `Users must not send:

❌ Mass promotional emails without recipient permission
❌ Harmful content such as scams, malware, or adult material
❌ Misleading or deceptive marketing emails

Vaiket reserves the right to monitor system abuse.`,
      warning: true
    },
    {
      icon: <Gavel className="w-6 h-6" />,
      title: "4. Enforcement & Penalties",
      content: `If spam behavior is detected:

• Account may be suspended immediately
• No refunds may be granted
• Legal rights may be exercised where applicable

Vaiket may report offenses to:

• Anti-spam monitoring networks
• Relevant law enforcement agencies`,
      warning: true
    },
    {
      icon: <Flag className="w-6 h-6" />,
      title: "5. Reporting Spam Violations",
      content: `If you suspect misuse of Vaiket services:

📩 Report to: abuse@vaiket.com

Include:

• Sender email
• Email screenshot
• Message headers

We take all reports seriously and respond promptly.`,
      warning: false
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "6. Compliance",
      content: `Vaiket follows:

• CAN-SPAM Act (USA)
• GDPR (EU)
• DPDP Act 2023 (India)
• Industry-wide email sender policies`,
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
            <Shield className="w-5 h-5 text-red-600" />
            <span className="text-sm font-semibold text-gray-700">Anti-Spam Policy</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Anti-Spam Policy
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
            className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 text-lg mb-2">
                  Zero Tolerance for Spam
                </h3>
                <p className="text-red-800">
                  Vaiket is committed to maintaining the highest standards of email communication and does not permit any form of spam. Violations may result in immediate account suspension.
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
            <div className="grid grid-cols-3 gap-2">
              {spamPolicyData.map((section, index) => (
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
                      ? 'bg-red-100 border border-red-200'
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

        {/* Anti-Spam Policy Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {spamPolicyData.map((section, index) => (
            <motion.div
              key={index}
              id={`section-${index}`}
              variants={item}
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                section.warning
                  ? 'border-red-200 hover:border-red-300'
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
                      ? 'bg-red-50 text-red-600' 
                      : 'bg-green-50 text-green-600'
                  }`}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {section.title}
                    </h3>
                    {section.warning && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium mt-1">
                        <AlertTriangle className="w-3 h-3" />
                        Strict Enforcement
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
                      section.warning ? 'border-l-4 border-red-400 pl-4' : ''
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

        {/* Compliance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8"
        >
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold text-blue-900">CAN-SPAM</div>
            <div className="text-blue-700 text-sm">USA Compliance</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 text-center">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="font-semibold text-purple-900">GDPR</div>
            <div className="text-purple-700 text-sm">EU Compliance</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
            <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold text-green-900">DPDP Act</div>
            <div className="text-green-700 text-sm">India 2023</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200 text-center">
            <Gavel className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="font-semibold text-orange-900">Industry</div>
            <div className="text-orange-700 text-sm">Standards</div>
          </div>
        </motion.div>

        {/* Report Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-red-50 rounded-2xl p-8 border border-red-200 mt-8"
        >
          <div className="flex items-start gap-4">
            <Flag className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-red-900 mb-2">
                Report Spam Violations
              </h3>
              <p className="text-red-800 mb-4">
                Help us maintain a spam-free environment. Report any suspicious email activities immediately.
              </p>
              <div className="flex items-center gap-2 text-red-700 font-semibold">
                <Mail className="w-4 h-4" />
                abuse@vaiket.com
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
              Using Vaiket confirms that you accept and comply with this Anti-Spam Policy.
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