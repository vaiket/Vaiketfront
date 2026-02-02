'use client'
// pages/investor-relations.js
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function InvestorRelations() {
  const [animatedStats, setAnimatedStats] = useState({
    msmes: 0,
    uptime: 0,
    businesses: 0
  });
  
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [roadmapVisible, setRoadmapVisible] = useState(false);

  // Animate statistics
  useEffect(() => {
    const animateValue = (
      start: number, 
      end: number, 
      duration: number, 
      callback: (value: number) => void, 
      isFloat: boolean = false
    ) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let value: number;
        if (isFloat) {
          value = parseFloat((progress * (end - start) + start).toFixed(1));
        } else {
          value = Math.floor(progress * (end - start) + start);
        }
        callback(value);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateValue(0, 63, 2000, (value: number) => {
      setAnimatedStats(prev => ({ ...prev, msmes: value }));
    });
    
    animateValue(0, 99.9, 2500, (value: number) => {
      setAnimatedStats(prev => ({ ...prev, uptime: value }));
    }, true);
    
    animateValue(0, 100, 3000, (value: number) => {
      setAnimatedStats(prev => ({ ...prev, businesses: value }));
    });
  }, []);

  // Roadmap intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRoadmapVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (roadmapRef.current) {
      observer.observe(roadmapRef.current);
    }

    return () => {
      if (roadmapRef.current) {
        observer.unobserve(roadmapRef.current);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Investor Relations | Vaiket - India&apos;s Most Reliable Business Email Infrastructure</title>
        <meta name="description" content="Invest in Vaiket - Building India's most reliable, sustainable business email infrastructure with AI-powered automation." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"1200\" height=\"400\" viewBox=\"0 0 1200 400\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 200 L200 150 L400 250 L600 180 L800 300 L1000 220 L1200 350 L1200 400 L0 400 Z\" fill=\"%230ea5e9\" opacity=\"0.1\"/%3E%3C/svg%3E")'
            }}
          ></div>
          
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/50 mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-blue-300 text-sm font-medium">Investor Relations</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Building India&apos;s Most Reliable
              <span className="block text-blue-400">Business Email Infrastructure</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              A sustainable, subscription-first SaaS company helping Indian businesses 
              automate customer communication with AI-powered email services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                Request Investor Deck
              </button>
              <button className="px-8 py-3 bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-900/30 rounded-lg font-semibold transition-all">
                Schedule a Call
              </button>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-8 bg-gray-800/50 border-y border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span>DPDP Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs">🇮🇳</span>
                </div>
                <span>India-First Infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span>SSL Encrypted</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Market Stats */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Empower {animatedStats.businesses}K+ Indian businesses with intelligent communication tools 
                that ensure zero missed leads and 24/7 customer response.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-500">
                <div className="text-5xl font-bold text-blue-400 mb-4">
                  {animatedStats.msmes}M+
                </div>
                <div className="text-gray-300">MSMEs in India</div>
                <div className="w-16 h-1 bg-blue-500 mt-4 rounded-full"></div>
              </div>
              
              <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-500">
                <div className="text-5xl font-bold text-green-400 mb-4">
                  {animatedStats.uptime}%
                </div>
                <div className="text-gray-300">Guaranteed Uptime</div>
                <div className="w-16 h-1 bg-green-500 mt-4 rounded-full"></div>
              </div>
              
              <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-500">
                <div className="text-5xl font-bold text-purple-400 mb-4">
                  ₹0
                </div>
                <div className="text-gray-300">Customer Acquisition Cost via Partners</div>
                <div className="w-16 h-1 bg-purple-500 mt-4 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Vaiket - Success Factors */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Why Vaiket is Built for <span className="text-blue-400">Long-Term Success</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Massive & Evergreen Market",
                  description: "63M+ MSMEs in India with recurring billing for predictable revenue",
                  icon: "📌"
                },
                {
                  title: "Sticky & Critical Product",
                  description: "High retention, low churn once business workflows are established",
                  icon: "🔒"
                },
                {
                  title: "Compliant & Secure",
                  description: "DPDP compliance, 99.9% uptime, India-first infrastructure",
                  icon: "🛡️"
                },
                {
                  title: "Sustainable Cost Structure",
                  description: "Lean team, organic acquisition, infrastructure optimized for scale",
                  icon: "💸"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Revenue Model */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Sustainable Revenue Model
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Low costs, high-margin SaaS driving long-term profitability
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  model: "Subscription Plans",
                  details: "Recurring email + AI automation",
                  color: "blue"
                },
                {
                  model: "Add-On AI Credits",
                  details: "Usage-based revenue",
                  color: "green"
                },
                {
                  model: "Business Upgrades",
                  details: "Team seats, access control, analytics",
                  color: "purple"
                },
                {
                  model: "Reseller Network",
                  details: "Expanding distribution with low CAC",
                  color: "orange"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-lg ${
                    item.color === 'blue' ? 'bg-blue-500/20' :
                    item.color === 'green' ? 'bg-green-500/20' :
                    item.color === 'purple' ? 'bg-purple-500/20' :
                    'bg-orange-500/20'
                  } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <div className={`${
                      item.color === 'blue' ? 'text-blue-400' :
                      item.color === 'green' ? 'text-green-400' :
                      item.color === 'purple' ? 'text-purple-400' :
                      'text-orange-400'
                    } font-bold`}>{index + 1}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.model}</h3>
                  <p className="text-gray-400">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Traction */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Current Traction
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-500/30"></div>
              
              <div className="space-y-12">
                {[
                  {
                    stage: "Product Development",
                    status: "Live: AI Business Email Suite",
                    completed: true
                  },
                  {
                    stage: "Security Layer", 
                    status: "IMAP/SMTP encryption",
                    completed: true
                  },
                  {
                    stage: "Early Interest",
                    status: "1st partner leads onboarding", 
                    completed: true
                  },
                  {
                    stage: "Market Focus",
                    status: "Starting with Indian SMBs, scaling globally later",
                    completed: true
                  }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className={`z-10 flex items-center justify-center w-8 h-8 rounded-full ${item.completed ? 'bg-green-500' : 'bg-gray-600'}`}>
                      {item.completed ? (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="ml-6 md:ml-8 bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex-1">
                      <h3 className="text-xl font-semibold mb-2">{item.stage}</h3>
                      <p className="text-gray-400">{item.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Roadmap */}
        <section ref={roadmapRef} className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Strategic Roadmap
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Measured expansion with vertical integration for higher ARPU
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  year: "2025",
                  focus: "Business email + AI automation stable & profitable",
                  delay: 0
                },
                {
                  year: "2026", 
                  focus: "CRM + WhatsApp integration + Partner ecosystem",
                  delay: 200
                },
                {
                  year: "2027",
                  focus: "Full business communication infrastructure", 
                  delay: 400
                },
                {
                  year: "2028",
                  focus: "Global rollout + enterprise-grade stack",
                  delay: 600
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`bg-gray-800/30 rounded-xl p-6 border border-gray-700 transition-all duration-700 ${
                    roadmapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${item.delay}ms` }}
                >
                  <div className="text-4xl font-bold text-blue-400 mb-4">{item.year}</div>
                  <p className="text-gray-300">{item.focus}</p>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Leadership</h2>
            
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700 max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                BS
              </div>
              <h3 className="text-2xl font-bold mb-2">Bikas Sahu</h3>
              <p className="text-blue-400 mb-6">Founder & Chief Executive Officer</p>
              <p className="text-gray-400 mb-6">
                Entrepreneur passionate about building essential Internet infrastructure
                for India&apos;s next generation of businesses.
              </p>
              <blockquote className="text-xl italic text-gray-300 border-l-4 border-blue-500 pl-4 py-2">
                &quot;We believe the most valuable companies of the decade
                will focus on trust, retention and fundamentals — not hype.&quot;
              </blockquote>
            </div>
          </div>
        </section>

        {/* Funding Approach */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Funding Approach
            </h2>
            <p className="text-gray-400 text-center mb-12">
              Thoughtfully Timed Investment for Sustainable Growth
            </p>
            
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  "Accelerates distribution sustainably",
                  "Strengthens product security & compliance", 
                  "Helps us scale profitably"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center p-6 bg-blue-900/20 rounded-xl border border-blue-700/50">
                <p className="text-lg">
                  <span className="font-semibold">Currently bootstrapped & revenue-dependent.</span>{' '}
                  Not funding for &quot;burn rates&quot; — but for long-term profit expansion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Connect With Us
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We welcome investor conversations aligned with trust-first business growth, 
              long-term SaaS value creation, and India&apos;s digital transformation opportunity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                investors@vaiket.com
              </button>
              <button className="px-8 py-3 bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-900/30 rounded-lg font-semibold transition-all flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                Schedule a Call
              </button>
            </div>
            
            <div className="text-gray-400">
              <p>📍 Ranchi, Jharkhand, India</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400">
              Vaiket — A Stable SaaS Powered by Recurring Revenue + Retention Moat
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}