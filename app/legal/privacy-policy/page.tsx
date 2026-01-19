"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Shield, 
  Lock, 
  Cookie,
  Share2,
  Clock,
  UserCheck,
  Globe,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Building,
  FileText,
  MapPin,
  Mail,
  Eye,
  Brain,
  Server,
  Users
} from "lucide-react";

export default function PrivacyPolicy() {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const privacyData = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "1. What Information We Collect",
      content: `We collect the following types of information:

✅ Information You Provide
• Name, email, phone, business name
• Billing and payment details (handled securely via payment providers)
• Emails sent through our platform (stored encrypted)

✅ Automatically Collected
• IP address, device type, browser, timezone
• App usage logs and analytics
• Cookies & session data

✅ AI Email Processing Data
Our AI may process:
• Email subject & message content
• Attachments and customer details
(Securely processed only to provide features)`,
      warning: false
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "2. How We Use Your Information",
      content: `To:

• Provide business email functionality
• Run AI automation (auto reply, lead extraction, sorting)
• Manage subscription billing
• Improve service experience
• Enforce security and fraud prevention
• Send service and product updates

We do not sell or rent your data to any third parties.`,
      warning: false
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "3. Data Security",
      content: `• TLS encrypted email transfer (IMAP & SMTP)
• Secured servers & restricted access
• Industry-standard authentication

Still, no system can guarantee 100% security.`,
      warning: true
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: "4. Cookies & Tracking Technologies",
      content: `Used to:

• Keep you logged in
• Analyze usage patterns
• Show relevant product updates

Users can disable cookies in browser settings — but some features may stop working.`,
      warning: false
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "5. Data Sharing & Third-Party Services",
      content: `We share limited information only with:

• Payment processors (e.g., Razorpay / Stripe)
• Hosting and analytics providers
• CRM & communication integrations (if enabled)

All partners follow strict data protection policies.`,
      warning: false
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "6. Data Retention",
      content: `We retain data:

• As long as your account is active
• Up to 90 days after account deletion (for recovery & fraud prevention)

You may request permanent deletion anytime.`,
      warning: false
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "7. Your Rights (Under DPDP & GDPR Standards)",
      content: `You can:

• Access your data
• Request corrections
• Ask for data export
• Request deletion
• Withdraw consent for marketing

Contact: support@vaiket.com`,
      warning: false
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "8. Children's Privacy",
      content: `Service is not intended for users under 18.
We do not knowingly store minors' data.`,
      warning: true
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "9. International Data Transfer",
      content: `Data may be stored or processed outside India
but always with strong security protections.`,
      warning: false
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "10. Policy Changes",
      content: `We may update this policy.
Continued use = acceptance of latest version.`,
      warning: false
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "11. Contact Information",
      content: `📩 privacy@vaiket.com

🏢 Rajendra Nagar, Ranchi, Jharkhand, India — 834002`,
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
            <span className="text-sm font-semibold text-gray-700">Privacy Policy</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
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

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 text-lg mb-2">
                  Our Commitment to Your Privacy
                </h3>
                <p className="text-blue-800">
                  Vaiket ("We", "Our", "Us") respects your privacy and is committed to protecting your personal data. 
                  This Privacy Policy explains how we collect, store, and use information when you use Vaiket services.
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
              {privacyData.map((section, index) => (
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

        {/* Privacy Policy Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {privacyData.map((section, index) => (
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
                        <AlertCircle className="w-3 h-3" />
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
                          paragraph.includes('✅') ? 'text-green-700 font-medium' : ''
                        } ${
                          paragraph.includes('📩') ? 'bg-blue-50 p-3 rounded-lg border border-blue-200 font-medium' : ''
                        } ${
                          paragraph.includes('🏢') ? 'bg-gray-50 p-3 rounded-lg border border-gray-200 font-medium' : ''
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

        {/* Security Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        >
          <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
            <Lock className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold text-green-900">TLS Encryption</div>
            <div className="text-green-700 text-sm">Secure IMAP & SMTP</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center">
            <Server className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold text-blue-900">Secure Servers</div>
            <div className="text-blue-700 text-sm">Restricted Access</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 text-center">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="font-semibold text-purple-900">GDPR Compliant</div>
            <div className="text-purple-700 text-sm">Data Protection</div>
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
              Privacy Policy Agreement
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              By using Vaiket, you consent to this Privacy Policy and the processing of your information as described above.
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