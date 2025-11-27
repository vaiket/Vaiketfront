// components/Testimonials.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Founder & CEO",
    company: "StyleCart Fashion",
    image: "/avatars/priya-sharma.jpg",
    rating: 5,
    text: "Arte boosted our WhatsApp reply rate by 42% in the first month. The AI personalization made our campaigns feel human.",
    outcome: "42% higher reply rate",
    industry: "E-commerce"
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Growth Manager",
    company: "TechStack Solutions",
    image: "/avatars/rahul-mehta.jpg",
    rating: 5,
    text: "Content automation saved us ~10 hours weekly. Now we focus on strategy while Arte handles execution.",
    outcome: "10 hours saved weekly",
    industry: "SaaS"
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Marketing Director",
    company: "GrowthGenius Agency",
    image: "/avatars/ananya-patel.jpg",
    rating: 5,
    text: "Our agency client onboarding improved 67% using AI workflows. Faster setup, happier clients.",
    outcome: "67% faster onboarding",
    industry: "Agency"
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Sales Head",
    company: "SaaSPro India",
    image: "/avatars/vikram-singh.jpg",
    rating: 5,
    text: "+50% DMs converted to qualified leads with Arte's WhatsApp automation. Game-changer for our sales team.",
    outcome: "50% more qualified leads",
    industry: "SaaS"
  },
  {
    id: 5,
    name: "Neha Gupta",
    role: "E-commerce Founder",
    company: "UrbanCraft Stores",
    image: "/avatars/neha-gupta.jpg",
    rating: 5,
    text: "31% higher email open rates with AI-powered subject lines. Our campaigns finally stand out in crowded inboxes.",
    outcome: "31% higher open rates",
    industry: "E-commerce"
  },
  {
    id: 6,
    name: "Arjun Kumar",
    role: "Operations Lead",
    company: "ScaleFast Ventures",
    image: "/avatars/arjun-kumar.jpg",
    rating: 5,
    text: "Automated 80% of customer follow-ups. Our team now focuses on high-value conversations instead of repetitive tasks.",
    outcome: "80% automation rate",
    industry: "Startup"
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) => 
      current === totalSlides - 1 ? 0 : current + 1
    );
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex((current) => 
      current === 0 ? totalSlides - 1 : current - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerView,
    currentIndex * itemsPerView + itemsPerView
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      y: -50,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.4
      }
    }
  };

  // JSON-LD Schema for testimonials
  const testimonialSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": testimonials.map((testimonial, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": testimonial.name
        },
        "reviewBody": testimonial.text,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": testimonial.rating.toString(),
          "bestRating": "5"
        }
      }
    }))
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden" id="testimonials">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialSchema) }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-white font-medium">Rated 4.9/5 by 500+ Businesses</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by Businesses <span className="text-blue-400">Worldwide</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            See how companies like yours are achieving remarkable results with Arte
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div 
          className="relative mb-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevSlide}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Previous</span>
            </button>

            {/* Auto-play Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label={isAutoPlaying ? "Pause auto-play" : "Play auto-play"}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span className="text-sm font-medium">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-medium">Play</span>
                </>
              )}
            </button>

            <button
              onClick={nextSlide}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <span className="text-sm font-medium">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="wait">
                {currentTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    variants={cardVariants}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative"
                  >
                    {/* Main Card */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-full hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                      {/* Industry Badge */}
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                        <span className="text-xs font-medium text-blue-300">{testimonial.industry}</span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="mb-6">
                        <p className="text-gray-300 leading-relaxed text-lg">
                          "{testimonial.text}"
                        </p>
                      </blockquote>

                      {/* Outcome Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-xl mb-6">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-300 text-sm font-semibold">
                          {testimonial.outcome}
                        </span>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold truncate">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-400 text-sm truncate">
                            {testimonial.role}
                          </p>
                          <p className="text-gray-500 text-sm truncate">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                Slide {currentIndex + 1} of {totalSlides}
              </span>
              <span className="text-sm text-gray-400">
                {testimonials.length} testimonials
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { number: '500+', label: 'Businesses' },
            { number: '4.9/5', label: 'Rating' },
            { number: '98%', label: 'Satisfaction' },
            { number: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-gradient-to-r from-gray-900 to-blue-900/20 rounded-3xl p-8 border border-gray-800"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to join these success stories?
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Start your journey with Arte and see why businesses love our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              Start Free Trial
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-700">
              View Case Studies
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}