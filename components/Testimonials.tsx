"use client";

import { motion, Variants } from "framer-motion";
import { Star, Quote, TrendingUp, Users, Zap, ChevronRight, CheckCircle, Award, Globe } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Rohan Sharma",
      role: "Founder, LocalKart",
      company: "E-commerce Platform",
      review: "The AI-powered response system reduced our customer response time from 4 hours to under 2 minutes. Customer satisfaction scores increased by 68% within the first quarter of implementation.",
      stat: "+40% Lead Conversion",
      statChange: "+25% MoM Growth",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&q=80",
      rating: 5,
      verified: true,
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      id: 2,
      name: "Aditi Verma",
      role: "Marketing Director",
      company: "Royal Prints",
      review: "Automated lead qualification and follow-up workflows saved our team 25 hours per week. We're now handling 3x more inquiries without additional staff.",
      stat: "3× Faster Response Time",
      statChange: "92% Cost Reduction",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face&q=80",
      rating: 5,
      verified: true,
      gradient: "from-purple-600 to-pink-600"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Operations Lead",
      company: "TechScale Inc.",
      review: "Enterprise-grade security and seamless integration with our existing CRM eliminated manual data entry completely. The dashboard provides actionable insights we never had before.",
      stat: "99.9% Uptime",
      statChange: "Zero Downtime",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=80",
      rating: 5,
      verified: true,
      gradient: "from-emerald-600 to-teal-600"
    },
  ];

  const performanceStats = [
    { 
      value: "3.2x", 
      label: "Faster Response Time", 
      icon: TrendingUp,
      description: "Average customer response improvement",
      change: "+142%",
      trend: "up"
    },
    { 
      value: "92%", 
      label: "Cost Reduction", 
      icon: Zap,
      description: "On customer support operations",
      change: "Year-over-year",
      trend: "down"
    },
    { 
      value: "+40%", 
      label: "Lead Generation", 
      icon: Users,
      description: "Increase in qualified leads",
      change: "+15% MoM",
      trend: "up"
    },
    { 
      value: "4.8/5", 
      label: "Customer Satisfaction", 
      icon: Star,
      description: "Average platform rating",
      change: "+1.2 points",
      trend: "up"
    },
  ];

  const industries = [
    { name: "SaaS", count: 245, color: "bg-blue-500" },
    { name: "E-commerce", count: 189, color: "bg-purple-500" },
    { name: "Finance", count: 142, color: "bg-emerald-500" },
    { name: "Healthcare", count: 98, color: "bg-cyan-500" },
    { name: "Education", count: 76, color: "bg-amber-500" },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      },
    },
  };

  const item: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-950 via-black to-gray-950 py-28 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Rated 4.8/5 by Customers</span>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-sm text-gray-400">Trusted by 10,000+ businesses</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Trusted by Industry
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Leaders & Innovators
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses that have transformed their customer communication 
            with AI-powered automation and enterprise-grade reliability.
          </p>
        </motion.div>

        {/* Performance Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {performanceStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={item}
              whileHover={{ 
                y: -6,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 
                         hover:border-white/20 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  stat.trend === 'up' ? 'bg-green-500/10' : 'bg-blue-500/10'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-blue-400'
                  }`} />
                </div>
                <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  stat.trend === 'up' 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {stat.change}
                </div>
              </div>
              
              <div className="mb-2">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-lg font-semibold text-white">{stat.label}</div>
              </div>
              
              <p className="text-sm text-gray-400">{stat.description}</p>
              
              {/* Progress indicator */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Performance</span>
                  <span className="text-green-400 font-medium">Optimal</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                  <div className={`h-full rounded-full ${
                    stat.trend === 'up' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  }`} style={{ width: '85%' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={item}
              whileHover={{
                y: -8,
                transition: { 
                  duration: 0.4, 
                  ease: [0.22, 1, 0.36, 1]
                },
              }}
              className="group relative"
            >
              {/* Card background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 
                            group-hover:border-white/20 transition-all duration-500" />
              
              {/* Gradient accent */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${testimonial.gradient}/5 opacity-0 
                            group-hover:opacity-100 transition-all duration-700`} />
              
              <div className="relative z-10 p-8">
                {/* Header with avatar and verification */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-14 h-14 rounded-full border-2 border-white/10"
                      />
                      {testimonial.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-gray-950">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                      <p className="text-xs text-gray-500 mt-1">{testimonial.company}</p>
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-gray-600 group-hover:text-gray-500 transition-colors" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">Verified Customer</span>
                </div>

                {/* Review */}
                <blockquote className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.review}"
                </blockquote>

                {/* Stats badge */}
                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="font-semibold text-white">{testimonial.stat}</div>
                      <div className="text-sm text-gray-400">{testimonial.statChange}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom border accent */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Industry Adoption */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Trusted Across Industries</h3>
            <p className="text-gray-400">Global adoption by leading companies</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {industries.map((industry) => (
              <div 
                key={industry.name} 
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-3 h-3 rounded-full ${industry.color}`} />
                  <Globe className="w-4 h-4 text-gray-500 group-hover:text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{industry.count}+</div>
                <div className="text-sm text-gray-400">{industry.name}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-xl" />
          
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 
                        overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Customer Communication?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of successful businesses already using our platform to drive growth and efficiency.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold
                                 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 group">
                  Start Free Trial
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold
                                 hover:bg-white/10 transition-all duration-300">
                  Schedule a Demo
                </button>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  No credit card required
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-600" />
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  14-day free trial
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-600" />
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Enterprise-grade security
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}