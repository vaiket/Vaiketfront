"use client";

import { motion } from "framer-motion";
import { Star, Quote, TrendingUp, Users, Zap } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Rohan Sharma",
      role: "Founder, LocalKart",
      review: "Support replies are instant — customers feel we are always online now.",
      stat: "+40% Leads",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&q=80",
    },
    {
      id: 2,
      name: "Aditi Verma",
      role: "Marketing Manager, Royal Prints",
      review: "Lead follow-ups run automatically… our sales team is finally relaxed!",
      stat: "3× Faster Replies",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face&q=80",
    },
  ];

  const stats = [
    { value: "3.2x", label: "Faster Response Time", icon: TrendingUp },
    { value: "92%", label: "Cost Reduction", icon: Zap },
    { value: "+40%", label: "Lead Generation", icon: Users },
    { value: "500+", label: "Happy Customers", icon: Users },
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
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  };

  return (
    <section className="relative bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Trusted by Growing Businesses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            See how companies are transforming their customer communication with AI-powered automation
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="bg-gray-900 rounded-xl p-6 text-center border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="flex justify-center mb-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <stat.icon className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={item}
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border border-gray-700"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <Quote className="w-6 h-6 text-gray-600" />
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-gray-300 text-lg leading-relaxed mb-6">
                "{testimonial.review}"
              </blockquote>

              {/* Stat Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-medium border border-green-500/20">
                <TrendingUp className="w-4 h-4" />
                {testimonial.stat}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-6">
            TRUSTED BY INDUSTRY LEADERS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {["Forbes", "TechCrunch", "Business Today", "Entrepreneur", "Inc Magazine"].map((company) => (
              <div
                key={company}
                className="text-gray-400 font-medium text-lg hover:text-gray-300 transition-colors cursor-pointer"
              >
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}