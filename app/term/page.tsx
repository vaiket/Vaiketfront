"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Shield, 
  Mail, 
  Brain, 
  CreditCard, 
  Lock, 
  BookOpen, 
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Building,
  FileText,
  MapPin
} from "lucide-react";

export default function TermsConditions() {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const termsData = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "1. Introduction",
      content: `Welcome to Vaiket.
These Terms & Conditions govern your use of the platform. By using our services, you agree to comply with and be legally bound by these Terms.`,
      warning: false
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "2. Services Provided",
      content: `Vaiket provides:

• Business email hosting and management
• AI-powered customer email automation
• Lead extraction and inbox prioritization
• Activity logs, analytics & dashboards

We may modify features to improve service delivery.`,
      warning: false
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "3. Eligibility & Account Creation",
      content: `• Must be at least 18 years old
• Users are responsible for account credentials
• Suspicious or abusive usage may lead to account suspension`,
      warning: false
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "4. Acceptable Use Policy",
      content: `Important Notice
Users must not:

❌ Send spam or bulk abusive emails
❌ Conduct fraud, phishing, or illegal acts
❌ Violate any privacy or security laws
❌ Harass or impersonate others

Email Account Ownership
All email accounts created under a domain are owned by the organization, not the individuals using them.`,
      warning: true
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "5. Subscription, Billing & Auto-Renewal",
      content: `• Service is subscription based
• Auto-renewal enabled by default
• Pricing subject to change with prior notice
• Taxes and charges apply
• Service may suspend upon failed payments`,
      warning: false
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "6. Cancellation & Refund",
      content: `• Cancel anytime via dashboard
• Active billing period is non-refundable
• Refund terms defined in our Refund Policy`,
      warning: false
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "7. Data Storage, Security & Backups",
      content: `• Secure IMAP & SMTP systems
• Encryption and controlled access
• Users remain responsible for their backups
• No system can guarantee 100% protection`,
      warning: false
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "8. AI Processing Disclaimer",
      content: `Vaiket AI may:

• Auto-generate responses
• Interpret email intent

AI may not always be accurate.
Users should review sensitive communications.`,
      warning: false
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "9. Intellectual Property",
      content: `All branding, design, source code, and AI logic belongs to Vaiket.
Unauthorized copying, resale, or reverse-engineering is prohibited.`,
      warning: false
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "10. Service Availability",
      content: `We target 99.9% uptime, however:

• Planned maintenance may occur
• Network paths rely on third-party connectivity

We are not liable for revenue loss caused by downtime.`,
      warning: true
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "11. Indemnification",
      content: `Users agree to indemnify Vaiket against:

• Legal actions caused by misuse
• Losses, damages, or violations of laws`,
      warning: true
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "12. Limitation of Liability",
      content: `Vaiket is not responsible for:

• Loss of profits
• Emails lost due to external issues
• Account misuse due to weak passwords

Maximum liability limited to last 30 days of payments.`,
      warning: true
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "13. Third-Party Integrations",
      content: `Vaiket may connect with:

• Razorpay / Stripe
• Analytics systems
• Email routing partners

We are not liable for their failures.`,
      warning: false
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "14. Changes to Terms",
      content: `These Terms may be updated anytime.
Continued usage = Acceptance of updated Terms.`,
      warning: false
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "15. Governing Law & Jurisdiction",
      content: `Applicable laws:

📍 Republic of India
📍 Jurisdiction: Courts of Ranchi, Jharkhand`,
      warning: false
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "16. Contact Information",
      content: `📩 support@vaiket.com

🏢 Rajendra Nagar, Ranchi, Jharkhand — 834002`,
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
            <Shield className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700">Legal Documentation</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms & Conditions
          </h1>

          {/* Company Registration Details */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
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
                <div className="text-gray-500 mb-1">CIN Number</div>
                <div className="font-semibold text-gray-900">[Your Company CIN]</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-gray-500 mb-1">GST Number</div>
                <div className="font-semibold text-gray-900">[Your GST, if applicable]</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-gray-500 mb-1">Last Updated</div>
                <div className="font-semibold text-gray-900">November 29, 2025</div>
              </div>
            </div>
            
            {/* Registered Office Address */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
                  <MapPin className="w-4 h-4" />
                  Registered Office Address
                </div>
                <div className="font-semibold text-gray-900">
                  Rajendra Nagar, Ranchi, Jharkhand — 834002
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Navigation - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block mb-8"
        >
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-4 gap-2">
              {termsData.map((term, index) => (
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
                    {term.title.split(" ").slice(1).join(" ")}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Terms Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {termsData.map((term, index) => (
            <motion.div
              key={index}
              id={`section-${index}`}
              variants={item}
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                term.warning
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
                    term.warning 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'bg-purple-50 text-purple-600'
                  }`}>
                    {term.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {term.title}
                    </h3>
                    {term.warning && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium mt-1">
                        <AlertTriangle className="w-3 h-3" />
                        Important Notice
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
                      term.warning ? 'border-l-4 border-orange-400 pl-4' : ''
                    }`}>
                      {term.content.split('\n').map((paragraph, idx) => (
                        <p key={idx} className={`mb-3 text-gray-700 leading-relaxed ${
                          paragraph.includes('❌') ? 'text-red-700 font-medium' : ''
                        } ${
                          paragraph.includes('Email Account Ownership') ? 'font-semibold text-blue-700 bg-blue-50 p-2 rounded-lg border border-blue-200' : ''
                        } ${
                          paragraph.includes('Important Notice') ? 'font-semibold text-orange-700' : ''
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

        {/* Acceptance Footer */}
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
              Agreement Acceptance
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              By using Vaiket, you confirm that you have read & understood these Terms and agree to comply and be legally bound.
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