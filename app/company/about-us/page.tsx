'use client'
import React, { useEffect, useRef } from 'react';
import { 
  Shield, 
  Zap, 
  Globe, 
  Mail, 
  Users, 
  Clock, 
  Target, 
  ArrowRight,
  MessageCircle,
  CheckCircle,
  Star,
  Award,
  Eye,
  TrendingUp
} from 'lucide-react';

const AboutVaiket = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    if (statsRef.current) {
      statsRef.current.querySelectorAll('.stat-item').forEach(el => {
        observer.observe(el);
      });
    }

    if (featuresRef.current) {
      featuresRef.current.querySelectorAll('.feature-card').forEach(el => {
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  const trustBadges = [
    { 
      icon: <Shield className="w-6 h-6" />, 
      label: "Enterprise Security",
      description: "Bank-grade encryption & compliance"
    },
    { 
      icon: <Zap className="w-6 h-6" />, 
      label: "99.9% Uptime",
      description: "Enterprise-grade reliability"
    },
    { 
      icon: <Award className="w-6 h-6" />, 
      label: "AI-Powered",
      description: "Cutting-edge artificial intelligence"
    }
  ];

  const missionStats = [
    { number: "100,000+", label: "Businesses to Empower", icon: <Users className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime Guaranteed", icon: <Zap className="w-6 h-6" /> },
    { number: "24/7", label: "AI Communication", icon: <Clock className="w-6 h-6" /> },
    { number: "0", label: "Missed Leads", icon: <Eye className="w-6 h-6" /> }
  ];

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "AI Response Engine",
      description: "Smart contextual replies in seconds",
      benefits: ["Instant responses", "Context-aware", "Multi-language"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Smart Lead Capture",
      description: "Automatically identify customer intent",
      benefits: ["Intent detection", "Lead scoring", "CRM integration"]
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Auto Follow-ups",
      description: "Close deals with intelligent nurturing",
      benefits: ["Timed sequences", "Personalized content", "Performance tracking"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "End-to-end encrypted communication",
      benefits: ["Data encryption", "Access controls", "Audit logs"]
    }
  ];

  const timeline = [
    { 
      year: "2025", 
      goal: "AI Email Suite Launch", 
      icon: <Mail className="w-5 h-5" />,
      description: "Complete AI-powered email automation platform"
    },
    { 
      year: "2026", 
      goal: "Multi-channel Automation", 
      icon: <Globe className="w-5 h-5" />,
      description: "Expand to WhatsApp, Instagram, and voice channels"
    },
    { 
      year: "2027", 
      goal: "Full Business Automation", 
      icon: <Target className="w-5 h-5" />,
      description: "Complete business workflow automation ecosystem"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Vaiket
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors font-medium">Features</a>
            <a href="#mission" className="text-gray-400 hover:text-white transition-colors font-medium">Mission</a>
            <a href="#timeline" className="text-gray-400 hover:text-white transition-colors font-medium">Roadmap</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors font-medium">Contact</a>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 text-sm">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gray-900 rounded-full px-4 py-2 mb-8 border border-gray-800">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Enterprise-Grade AI Communication</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              About Vaiket
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-gray-200">
            Powering Smart Business Communication
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            AI-powered email automation that responds faster, captures leads, and boosts trust. 
            Transform your customer communication with enterprise-grade AI.
          </p>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {trustBadges.map((badge, index) => (
              <div 
                key={index}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl mb-4 mx-auto group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
                  <div className="text-purple-400">
                    {badge.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-white mb-2 text-center text-lg">{badge.label}</h3>
                <p className="text-gray-400 text-sm text-center">{badge.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20">
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold border border-gray-700 hover:bg-gray-800 transition-all">
              Book Demo
            </button>
          </div>
        </div>
      </section>

      {/* Mission Stats Section */}
      <section id="mission" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Empower Businesses Worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              With AI-driven communication that never sleeps. Join the revolution in business communication.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionStats.map((stat, index) => (
              <div 
                key={index}
                className="stat-item bg-black rounded-2xl p-8 border border-gray-800 hover:border-blue-500/30 transition-all duration-500 opacity-0 translate-y-10 group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-xl mb-4 mx-auto">
                  <div className="text-blue-400">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 text-center">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium text-center">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                AI-Powered Features
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transform how you communicate with customers using cutting-edge AI technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="feature-card bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-pink-500/50 transition-all duration-500 hover:transform hover:scale-105 opacity-0 translate-y-10 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-pink-500/30 group-hover:to-purple-500/30 transition-all">
                  <div className="text-pink-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Timeline */}
      <section id="timeline" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Vision Timeline
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Building the World's Most Trusted Business Communication Platform
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>
            
            {timeline.map((item, index) => (
              <div 
                key={index}
                className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start mb-16`}
              >
                {/* Content */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-16 md:ml-0`}>
                  <div className="bg-black rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 group">
                    <div className="text-2xl font-bold text-purple-400 mb-2">{item.year}</div>
                    <h3 className="text-white font-semibold text-lg mb-2">{item.goal}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-black z-10 top-6"></div>

                {/* Icon */}
                <div className={`hidden md:flex md:w-2/12 justify-center ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-gray-700 group-hover:border-purple-500/50 transition-all">
                    <div className="text-purple-400">
                      {item.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl p-8 md:p-12 border border-gray-800">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center border-4 border-gray-900">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  Bikas Sahu
                </h3>
                <p className="text-gray-400 mb-4 font-medium">
                  Founder & CEO - Vision Builder
                </p>
                <blockquote className="text-xl text-gray-200 italic leading-relaxed mb-6">
                  "Every business deserves fast, intelligent, customer-first communication. 
                  Vaiket is here to make that the new standard for modern businesses worldwide."
                </blockquote>
                <div className="text-gray-500 text-sm">
                  <p>📍 Ranchi, Jharkhand</p>
                  <p>🏢 Vikas Web Development Pvt. Ltd.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Business Communication?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already using Vaiket to automate their customer communication and drive growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-transparent text-white px-8 py-4 rounded-full font-bold border-2 border-white/30 hover:bg-white/10 transition-all">
                  Book Enterprise Demo
                </button>
              </div>
              
              <div className="text-white/80 text-sm">
                <p>📧 enterprise@vaiket.com</p>
                <p className="mt-2">🌍 www.vaiket.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-lg font-bold text-gray-300">Vaiket</span>
            </div>
            
            <div className="flex space-x-6 text-gray-500 text-sm">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
            
            <div className="mt-4 md:mt-0 text-gray-600 text-sm">
              © 2024 Vaiket. Powering Smart Business Communication.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .stat-item:nth-child(1) { animation-delay: 0.1s; }
        .stat-item:nth-child(2) { animation-delay: 0.2s; }
        .stat-item:nth-child(3) { animation-delay: 0.3s; }
        .stat-item:nth-child(4) { animation-delay: 0.4s; }
        
        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default AboutVaiket;