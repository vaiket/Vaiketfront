"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Shield, 
  Database,
  Clock,
  Trash2,
  Lock,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Building,
  FileText,
  MapPin,
  Mail
} from "lucide-react";

export default function DataRetentionPolicy() {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const retentionData = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "1. Types of Data We Retain",
      content: `We retain the following types of data to provide and improve our services:`,
      warning: false,
      table: true,
      tableData: {
        headers: ["Data Type", "Examples", "Purpose"],
        rows: [
          ["Account Data", "Name, email, billing info", "Login & invoicing"],
          ["Business Emails", "Messages & metadata", "AI automation services"],
          ["Logs & Analytics", "IP, browsing, timestamps", "Security & performance"],
          ["Payment Records", "Transactions, invoices", "Compliance with finance laws"]
        ]
      }
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "2. Retention Periods",
      content: `Data is retained for specific periods based on legal requirements and service needs:`,
      warning: false,
      table: true,
      tableData: {
        headers: ["Category", "Retention Duration"],
        rows: [
          ["Account details", "While subscription remains active"],
          ["Email content", "90 days after deletion/cancellation"],
          ["AI analysis results", "30–60 days"],
          ["Billing records", "Minimum 5 years (legal compliance)"],
          ["System backup data", "~30 days before auto removal"]
        ]
      },
      note: "If a user requests immediate deletion — we will prioritize removing their data sooner."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "3. Why We Retain Data",
      content: `We retain data for the following purposes:

✅ Provide and improve our services
✅ Comply with security and fraud regulations
✅ Maintain legal accounting obligations
✅ Troubleshooting and support`,
      warning: false
    },
    {
      icon: <Trash2 className="w-6 h-6" />,
      title: "4. User-Controlled Data Deletion",
      content: `Users can request:

• Account deletion
• Email data removal
• Removal from backups (takes additional time)

📩 Contact: privacy@vaiket.com`,
      warning: false
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "5. Exceptions",
      content: `Retention may extend if:

• Required by law
• Fraud or misuse investigation is pending
• Payment disputes are unresolved`,
      warning: true
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "6. Security of Retained Data",
      content: `• Encrypted email storage
• Restricted access to authorized staff
• Automatic backup rotation & wipe`,
      warning: false
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "7. Policy Updates",
      content: `We may revise this policy occasionally.
Updates are posted on this page.`,
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-gray-200 mb-6">
            <Database className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">Data Retention Policy</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Data Retention Policy
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
                  Transparent Data Management
                </h3>
                <p className="text-blue-800">
                  This policy explains how long Vaiket stores and processes customer data in compliance with global data protection regulations.
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
              {retentionData.map((section, index) => (
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
                      ? 'bg-blue-100 border border-blue-200'
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

        {/* Data Retention Policy Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {retentionData.map((section, index) => (
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
                      : 'bg-blue-50 text-blue-600'
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
                      section.warning ? 'border-l-4 border-orange-400 pl-4' : ''
                    }`}>
                      <p className="text-gray-700 mb-4">{section.content}</p>
                      
                      {section.table && (
                        <div className="overflow-x-auto mb-4">
                          <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                            <thead>
                              <tr className="bg-gray-100">
                                {section.tableData.headers.map((header, idx) => (
                                  <th key={idx} className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.tableData.rows.map((row, rowIdx) => (
                                <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className="border border-gray-300 px-4 py-3 text-gray-700">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {section.note && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                          <p className="text-yellow-800 text-sm">{section.note}</p>
                        </div>
                      )}

                      {!section.table && section.content.split('\n').slice(1).map((paragraph, idx) => (
                        <p key={idx} className={`mb-3 text-gray-700 leading-relaxed ${
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

        {/* Data Control Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-green-50 rounded-2xl p-8 border border-green-200 mt-8"
        >
          <div className="flex items-start gap-4">
            <Trash2 className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-green-900 mb-2">
                Control Your Data
              </h3>
              <p className="text-green-800 mb-4">
                You have the right to request deletion of your data. Contact us for immediate data removal requests.
              </p>
              <div className="flex items-center gap-2 text-green-700 font-semibold">
                <Mail className="w-4 h-4" />
                privacy@vaiket.com
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
              By using Vaiket, you agree to this Data Retention Policy.
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