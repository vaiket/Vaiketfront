'use client'
import React from 'react';
import { motion } from 'framer-motion';

const Careers = () => {
  const values = [
    {
      icon: "🚀",
      title: "Innovation-First Mindset",
      description: "We challenge the status quo. Good enough isn't in our vocabulary."
    },
    {
      icon: "🤝",
      title: "Customer-Obsessed",
      description: "Our customers are our true north. We build solutions that genuinely solve their pain points."
    },
    {
      icon: "💎",
      title: "Ownership & Accountability",
      description: "You won't just 'work on' a task; you'll own outcomes from idea to impact."
    },
    {
      icon: "⚡",
      title: "Fast Execution",
      description: "We build, iterate, and ship fast. Speed is our competitive advantage."
    },
    {
      icon: "🇮🇳",
      title: "Pride in Building for India",
      description: "We're building our homegrown champion in the SaaS world."
    }
  ];

  const benefits = [
    {
      benefit: "Remote & Flexible Work",
      description: "Work from anywhere in India. We trust you to manage your time and deliver excellence."
    },
    {
      benefit: "Learning Budget",
      description: "Annual budget for courses, books, and cutting-edge AI tools. Stay ahead of the curve."
    },
    {
      benefit: "Performance Bonuses",
      description: "Get rewarded directly for the outstanding results you drive."
    },
    {
      benefit: "Founding Team Exposure",
      description: "No bureaucracy. Get direct mentorship from the CEO and founding team."
    },
    {
      benefit: "Growth Opportunities",
      description: "As we scale, you scale. Get unparalleled growth opportunities and lead future teams."
    }
  ];

  const openRoles = [
    {
      department: "Engineering",
      roles: ["Full-Stack (React, Node.js)", "Backend (Python)", "DevOps Engineer"]
    },
    {
      department: "Product & Design",
      roles: ["UI/UX Designer", "Product Manager"]
    },
    {
      department: "Growth & Sales",
      roles: ["Business Development", "Customer Success Manager"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Build India's Email & AI Brain
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join the mission to empower millions of Indian businesses with smart, automated communication. 
            This isn't just a job—it's your chance to build foundational technology.
          </p>
        </motion.div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl">
              BS
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Bikas Sahu</h3>
              <p className="text-gray-500 mb-4">Founder & CEO</p>
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-blue-500 pl-6 py-2">
                "At Vaiket, we are solving a hard, meaningful problem: giving every Indian business the power of a smart communication engine. The world's best tech is built elsewhere; it's our time to build something massive from India, for the world."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core DNA</h2>
            <p className="text-xl text-gray-600">What makes a Vaikian tick? It's in our blood.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Grow With Us</h2>
            <p className="text-xl text-gray-600">We invest in you, so you can build the best work of your life.</p>
          </motion.div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.benefit}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why India Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why India? Why Now?</h2>
            <p className="text-xl text-gray-600">We are at a once-in-a-generation inflection point.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-blue-600 mb-3">🚀 The AI Revolution</h3>
                <p className="text-gray-600">AI is transforming how businesses communicate, and we are at the forefront of this shift.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-green-600 mb-3">💼 100M+ SMBs Market</h3>
                <p className="text-gray-600">Massive, underserved market craving intelligent, affordable tools.</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-purple-600 mb-3">📈 10x Startup Boom</h3>
                <p className="text-gray-600">India's ecosystem is booming. We're building the infrastructure that will power this growth.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-orange-600 mb-3">⚡ Fast-Track Career</h3>
                <p className="text-gray-600">Forget slow-moving corporate ladders. Your impact is visible, your growth accelerated.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Inner Circle</h2>
            <p className="text-xl text-gray-600 mb-8">We are in stealth building mode, crafting our core team.</p>
            
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
              ⭐ Founding Team Opportunities
            </div>
          </motion.div>

          <div className="grid gap-8 mb-12">
            {openRoles.map((department, index) => (
              <motion.div
                key={department.department}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{department.department}</h3>
                <div className="flex flex-wrap gap-3">
                  {department.roles.map((role) => (
                    <span
                      key={role}
                      className="bg-white text-gray-700 px-4 py-2 rounded-full border border-gray-200 font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-12 text-white"
          >
            <h3 className="text-3xl font-bold mb-4">No perfect role match?</h3>
            <p className="text-xl mb-8 opacity-90">
              We're always looking for exceptional talent. If our mission resonates, let's talk!
            </p>
            <div className="space-y-4">
              <p className="text-2xl font-semibold">careers@vaiket.com</p>
              <p className="opacity-80">We'll reach out when the right opportunity emerges</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Commitment</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm">
                🏅 Startup India Registered
              </div>
              <div className="bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm">
                🌐 Remote-First Policy
              </div>
              <div className="bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm">
                🔒 DPDP Compliant
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;