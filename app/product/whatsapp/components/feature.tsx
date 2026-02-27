"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const WhatsAppMarketingHero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      {/* Hero Section */}
      <section className="px-4 py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32">
        <div className="container mx-auto max-w-7xl">
          {/* Top Area - Center Aligned */}
          <div className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20">
            {/* Platform Toggle */}
            <div className="inline-flex bg-gray-100/80 backdrop-blur-sm rounded-full p-1 mb-8 sm:mb-10 md:mb-12 shadow-sm">
              <button className="bg-gray-900 text-white px-7 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:bg-black active:scale-[0.98]">
                WhatsApp
              </button>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-5 md:mb-7 tracking-tight">
              10x Your WhatsApp Marketing
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600/90 max-w-4xl mx-auto px-4 leading-relaxed md:leading-relaxed font-light">
              Send WhatsApp Messages to 1000+ people without any restrictions & boost your business 10x with WA Bridge WhatsApp Verify API Platform
            </p>
          </div>

          {/* Hero Content Layout - Two Columns */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-16 xl:gap-20">
            {/* LEFT SIDE - Visual Stack */}
            <div className="lg:w-1/2 relative w-full max-w-xl mx-auto lg:mx-0">
              <div className="relative h-[420px] sm:h-[480px] md:h-[560px] lg:h-[600px] xl:h-[640px]">
                {/* Background Decorative Element */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 to-blue-50/30 rounded-3xl blur-2xl -z-10" />
                
                {/* Base Mobile Mockup - Centered */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px] z-10">
                  <div className="relative w-full h-auto">
                    <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-3xl blur-xl opacity-70" />
                    <Image
                      src="https://wabridge.com/_next/static/media/hero01.7c3219ac.png"
                      alt="WhatsApp Marketing Dashboard"
                      width={420}
                      height={840}
                      className="relative w-full h-auto drop-shadow-2xl rounded-2xl"
                      priority
                      quality={95}
                    />
                  </div>
                </div>

                {/* Floating Card 1 - Top Right */}
                <div className="absolute right-4 sm:right-8 md:right-12 top-12 w-[190px] sm:w-[210px] md:w-[230px] lg:w-[250px] z-20 animate-float">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                    <div className="relative bg-white rounded-xl p-2 shadow-2xl ring-1 ring-gray-900/5">
                      <Image
                        src="https://wabridge.com/_next/static/media/hero03.2e68bd62.png"
                        alt="Message Analytics"
                        width={250}
                        height={180}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Floating Card 2 - Bottom Left */}
                <div className="absolute left-4 sm:left-8 md:left-12 bottom-12 w-[170px] sm:w-[190px] md:w-[210px] lg:w-[230px] z-20 animate-float-delayed">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-green-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                    <div className="relative bg-white rounded-xl p-2 shadow-2xl ring-1 ring-gray-900/5">
                      <Image
                        src="https://wabridge.com/_next/static/media/hero04.5ca5e4cc.png"
                        alt="Message Interface"
                        width={230}
                        height={160}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Floating Card 3 - Top Left */}
                <div className="absolute left-8 sm:left-12 top-20 w-[150px] sm:w-[170px] md:w-[190px] lg:w-[210px] z-0">
                  <div className="relative bg-white rounded-xl p-2 shadow-xl ring-1 ring-gray-900/5">
                    <Image
                      src="https://wabridge.com/_next/static/media/hero05.8b832e1a.png"
                      alt="Chat Preview"
                      width={210}
                      height={140}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -right-2 top-1/4 w-24 h-24 bg-green-300/10 rounded-full blur-3xl" />
                <div className="absolute -left-2 bottom-1/4 w-32 h-32 bg-blue-300/10 rounded-full blur-3xl" />
              </div>
            </div>

            {/* RIGHT SIDE - Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left max-w-xl lg:max-w-none">
              {/* Section Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
                Your Premier Platform for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700 ml-2">
                  WhatsApp Marketing
                </span>
              </h2>

              {/* Short Description */}
              <p className="text-gray-600/90 mb-8 md:mb-10 text-xl sm:text-2xl leading-relaxed font-light">
                All-in-one solution for notifications, chats, and user engagement.
              </p>

              {/* Feature Bullet Points */}
              <div className="space-y-5 sm:space-y-6 mb-10 sm:mb-12">
                {[
                  'Send broadcasts',
                  'Automate notifications', 
                  'Automate surveys'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center justify-center lg:justify-start gap-4 group">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center ring-2 ring-green-100 group-hover:ring-4 group-hover:ring-green-200 transition-all duration-300">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-medium text-lg sm:text-xl group-hover:text-gray-900 transition-colors duration-200">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center lg:items-start">
                <Link
                  href="/get-started"
                  className="group relative bg-gradient-to-r from-green-600 to-green-700 px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:from-green-700 hover:to-green-800 hover:shadow-xl hover:shadow-green-200/50 active:scale-[0.98] rounded-xl shadow-lg"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Free Trial
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                <Link
                  href="/resources/demo-booking"
                  className="group rounded-xl border border-gray-200 px-8 py-4 text-lg font-medium text-gray-700 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50/80 hover:text-gray-900"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch Demo
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="px-4 pb-20 md:pb-24 lg:pb-28 xl:pb-32">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-100 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center mb-8 ring-2 ring-green-50 group-hover:ring-4 group-hover:ring-green-100 transition-all duration-300">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Develop WhatsApp Catalogs Easily</h3>
                <p className="text-gray-600/90 leading-relaxed text-lg">
                  Set up WhatsApp catalogs easily for products and automate customer browsing and ordering.
                </p>
                <div className="mt-8 pt-6 border-t border-gray-100 group-hover:border-green-100 transition-colors duration-300">
                  <Link href="/company/contact-support" className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 transition-colors duration-200">
                    Learn more
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-100 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center mb-8 ring-2 ring-green-50 group-hover:ring-4 group-hover:ring-green-100 transition-all duration-300">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Interactive Message</h3>
                <p className="text-gray-600/90 leading-relaxed text-lg">
                  Customize quick replies, call-to-actions, and rich buttons in WhatsApp chat threads.
                </p>
                <div className="mt-8 pt-6 border-t border-gray-100 group-hover:border-green-100 transition-colors duration-300">
                  <Link href="/company/contact-support" className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 transition-colors duration-200">
                    Learn more
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-100 hover:-translate-y-2 md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center mb-8 ring-2 ring-green-50 group-hover:ring-4 group-hover:ring-green-100 transition-all duration-300">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Automate Workflows</h3>
                <p className="text-gray-600/90 leading-relaxed text-lg">
                  Build and automate engaging conversations easily with our drag-and-drop chatbot builder.
                </p>
                <div className="mt-8 pt-6 border-t border-gray-100 group-hover:border-green-100 transition-colors duration-300">
                  <Link href="/company/contact-support" className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 transition-colors duration-200">
                    Learn more
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Animations and Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-12px) rotate(-1deg);
          }
          66% {
            transform: translateY(-3px) rotate(1deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out 0.3s infinite;
        }
      `}</style>
    </div>
  );
};

export default WhatsAppMarketingHero;
