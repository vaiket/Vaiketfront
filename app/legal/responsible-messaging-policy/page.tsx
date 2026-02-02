"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Shield, 
  MessageCircle,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  Ban,
  Eye,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Building,
  FileText,
  MapPin,
  Mail
} from "lucide-react";

export default function ResponsibleMessagingPolicy() {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const messagingData = [
    {
      icon: <Ban className="w-6 h-6" />,
      title: "1. Message Content Rules",
      content: `Users must not send:

❌ Threats, harassment, discrimination, or hate speech
❌ Illegal, fraudulent, or deceptive content
❌ Impersonation messages or harmful claims
❌ Misleading sales communications`,
      warning: true
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "2. Truthful & Accurate Messaging",
      content: `Users must ensure:

✅ All claims regarding products/services are factual
✅ AI-generated messaging is reviewed before sending
✅ Messages do not mislead the recipient`,
      warning: false
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "3. Respect for Recipient Rights",
      content: `Users must:

• Provide clear identity of sender
• Include unsubscribe / opt-out options where applicable
• Respect customer privacy & data requests`,
      warning: false
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "4. Allowed Communication Use Cases",
      content: `✅ Customer support emails
✅ Order updates / service notifications
✅ Follow-ups and reminders with user consent
✅ Professional inquiries and offers`,
      warning: false
    },
    {
      icon: <Ban className="w-6 h-6" />,
      title: "5. Prohibited Use Cases",
      content: `❌ Bulk messages to purchased lists
❌ Harassment or repeated contact after opt-out
❌ Adult, violent, or abusive content
❌ Political campaigning without consent`,
      warning: true
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "6. Platform Protection",
      content: `Vaiket may:

• Monitor abuse indicators of messaging
• Limit or suspend automated sending
• Suspend or terminate accounts violating this policy
• Report illegal misuse to authorities`,
      warning: true
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "7. User Responsibility",
      content: `The user is responsible for:

• Content in all messages sent via Vaiket
• Ensuring consent from email recipients

Vaiket is not accountable for user-generated content.`,
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
            <MessageCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-gray-700">Responsible Messaging Policy</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Responsible Messaging Policy
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
                  <FileText className="w-5 h-5 text-blue-600" />
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

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <MessageCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900 text-lg mb-2">
                  Ethical Communication Standards
                </h3>
                <p className="text-green-800">
                  Vaiket provides tools that automate business communication using AI. We expect users to act responsibly and lawfully when sending or automating messages.
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
              {messagingData.map((section, index) => (
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
                      ? 'bg-green-100 border border-green-200'
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

        {/* Messaging Policy Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {messagingData.map((section, index) => (
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
                      : 'bg-green-50 text-green-600'
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
                      section.warning ? 'border-l-4 border-orange-400 pl-4' : ''
                    }`}>
                      {section.content.split('\n').map((paragraph, idx) => (
                        <p key={idx} className={`mb-3 text-gray-700 leading-relaxed ${
                          paragraph.includes('❌') ? 'text-red-700 font-medium' : ''
                        } ${
                          paragraph.includes('✅') ? 'text-green-700 font-medium' : ''
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
          <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
            <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold text-green-900">Consent Required</div>
            <div className="text-green-700 text-sm">Permission-based</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center">
            <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold text-blue-900">Truthful Content</div>
            <div className="text-blue-700 text-sm">Accurate Messaging</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 text-center">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="font-semibold text-purple-900">Recipient Rights</div>
            <div className="text-purple-700 text-sm">Privacy Respect</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200 text-center">
            <Eye className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="font-semibold text-orange-900">Active Monitoring</div>
            <div className="text-orange-700 text-sm">Abuse Prevention</div>
          </div>
        </motion.div>

        {/* Report Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-blue-50 rounded-2xl p-8 border border-blue-200 mt-8"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Report Policy Violations
              </h3>
              <p className="text-blue-800 mb-4">
                Help us maintain ethical communication standards. Report any misuse of messaging services.
              </p>
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
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
              By using Vaiket's messaging services, you acknowledge that you understand the rules above, will respect recipient rights, and accept responsibility for message content.
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