'use client'
// pages/press-media-kit.js
import { useState } from 'react';
import Head from 'next/head';

export default function PressMediaKit() {
  const [activeTab, setActiveTab] = useState('logos');
  const [downloadAllLoading, setDownloadAllLoading] = useState(false);

  const handleDownloadAll = () => {
    setDownloadAllLoading(true);
    // Simulate download process
    setTimeout(() => {
      setDownloadAllLoading(false);
      alert('Download started! All media assets will be downloaded as a ZIP file.');
    }, 1500);
  };

  const brandColors = [
    { name: 'Primary Purple', value: '#8B5CF6', class: 'bg-purple-500' },
    { name: 'Accent Cyan', value: '#22D3EE', class: 'bg-cyan-400' },
    { name: 'Background Black', value: '#000000', class: 'bg-black border border-gray-700' },
    { name: 'Neutral Gray', value: '#A1A1AA', class: 'bg-gray-400' }
  ];

  const productScreenshots = [
    'Vaiket Dashboard – Overview',
    'AI Reply Composer Screen', 
    'Lead Capture & Smart Inbox View',
    'Automation / Workflow View'
  ];

  const keyMessages = [
    "Vaiket automates customer email replies using AI — reducing response time dramatically.",
    "Businesses using Vaiket can avoid missed leads and delayed responses.",
    "Built in India, for Indian SMBs – with DPDP-compliant data handling.",
    "99.9% uptime email infrastructure with AI at the core."
  ];

  return (
    <>
      <Head>
        <title>Press & Media Kit | Vaiket - AI-Powered Business Email Platform</title>
        <meta name="description" content="Official brand assets, company information, and product visuals for journalists, creators, and partners featuring Vaiket." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/10"></div>
          
          <div className="relative max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-900/30 border border-purple-700/50 mb-6">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-purple-300 text-sm font-medium">Press & Media Kit</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Press & Media Kit
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Official brand assets, company information, and product visuals for journalists, creators, and partners featuring Vaiket.
            </p>
            
            <div className="bg-gray-800/50 rounded-xl p-4 inline-block border border-gray-700">
              <p className="text-gray-300">
                For press inquiries or interview requests, contact:{' '}
                <span className="text-cyan-400 font-semibold">press@vaiket.com</span>
              </p>
            </div>
          </div>
        </section>

        {/* Quick Company Snapshot */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Company Snapshot</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Company', value: 'Vikas Web Development Pvt. Ltd.' },
                { label: 'Brand', value: 'Vaiket' },
                { label: 'Founded', value: '2025' },
                { label: 'HQ', value: 'Ranchi, Jharkhand, India 🇮🇳' },
                { label: 'Product', value: 'AI-powered Business Email & Automation Platform' },
                { label: 'Focus', value: 'Indian SMBs & growing digital businesses' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/30 rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition-all duration-300"
                >
                  <div className="text-sm text-gray-400 mb-1">{item.label}</div>
                  <div className="font-medium">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Assets Navigation */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 border-y border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { id: 'logos', label: 'Logos' },
                { id: 'branding', label: 'Brand Identity' },
                { id: 'screenshots', label: 'Product Screenshots' },
                { id: 'founder', label: 'Founder Profile' },
                { id: 'story', label: 'Brand Story' },
                { id: 'messages', label: 'Key Messages' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Logos Section */}
            {activeTab === 'logos' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Official Logos</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Use these official Vaiket logos for media articles, videos, and mentions. 
                    Please do not modify colors, stretch, rotate, or edit the logo without written permission.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { name: 'Primary Logo', type: 'PNG', background: 'transparent', variant: 'primary' },
                    { name: 'Dark Background', type: 'PNG', background: 'dark', variant: 'dark' },
                    { name: 'Light Background', type: 'PNG', background: 'light', variant: 'light' },
                    { name: 'Vector Logo', type: 'SVG', background: 'transparent', variant: 'vector' }
                  ].map((logo, index) => (
                    <div key={index} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 text-center">
                      {/* Logo Preview */}
                      <div className={`w-32 h-32 mx-auto mb-4 rounded-lg flex items-center justify-center ${
                        logo.background === 'dark' ? 'bg-gray-900' : 
                        logo.background === 'light' ? 'bg-white' : 'bg-transparent'
                      }`}>
                        <div className={`text-xl font-bold ${
                          logo.background === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          VAIKET
                        </div>
                      </div>
                      
                      <h3 className="font-semibold mb-2">{logo.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{logo.type} Format</p>
                      
                      <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
                        Download {logo.type}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button 
                    onClick={handleDownloadAll}
                    disabled={downloadAllLoading}
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center mx-auto"
                  >
                    {downloadAllLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Preparing Download...
                      </>
                    ) : (
                      'Download All Assets (.zip)'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Brand Identity Section */}
            {activeTab === 'branding' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Brand Identity</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Vaiket's brand identity is designed to feel modern, reliable, and AI-driven, 
                    with a strong India-first foundation.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Brand Colors */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Brand Colors</h3>
                    <div className="space-y-4">
                      {brandColors.map((color, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                          <div className={`w-16 h-16 rounded-lg ${color.class} border border-gray-600`}></div>
                          <div>
                            <div className="font-semibold">{color.name}</div>
                            <div className="text-gray-400">{color.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typography */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Typography</h3>
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                        <div className="text-2xl font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Heading Font: Inter
                        </div>
                        <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Used for all headings and display text
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                        <div className="text-lg mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          Body Font: System UI
                        </div>
                        <p className="text-gray-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          Used for body text and interface elements
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-700/50">
                  <p className="text-center text-gray-300">
                    <strong>Note:</strong> Please avoid changing core colors or fonts in official co-branded material.
                  </p>
                </div>
              </div>
            )}

            {/* Product Screenshots */}
            {activeTab === 'screenshots' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Product Screenshots</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Use these screenshots to showcase how Vaiket works — including the dashboard, 
                    AI email automation, inbox, and analytics.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {productScreenshots.map((screenshot, index) => (
                    <div key={index} className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300">
                      {/* Screenshot placeholder */}
                      <div className="h-48 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📱</div>
                          <div className="font-semibold">{screenshot}</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
                          Download Screenshot
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors">
                    Download All Screenshots (.zip)
                  </button>
                  <button className="px-6 py-3 bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 rounded-lg font-semibold transition-colors">
                    View Sample Screens
                  </button>
                </div>
              </div>
            )}

            {/* Founder Profile */}
            {activeTab === 'founder' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Founder Profile</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Founder Photo & Basic Info */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 text-center">
                      {/* Founder Photo Placeholder */}
                      <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                        BS
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Bikas Sahu</h3>
                      <p className="text-cyan-400 font-semibold mb-4">Founder & CEO, Vaiket</p>
                      <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
                        Download Founder Photo
                      </button>
                    </div>
                  </div>

                  {/* Bio Information */}
                  <div className="lg:col-span-2 space-y-8">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                      <h4 className="text-xl font-semibold mb-4">Short Bio</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Bikas Sahu is the founder of Vaiket, an AI-powered business email and automation platform 
                        built in India for growing businesses. He is focused on building sustainable SaaS products 
                        that help Indian companies communicate smarter, faster, and more securely.
                      </p>
                    </div>

                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                      <h4 className="text-xl font-semibold mb-4">Long Bio</h4>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Vaiket is built under Vikas Web Development Pvt. Ltd., headquartered in Ranchi, Jharkhand. 
                        Under the leadership of founder Bikas Sahu, Vaiket aims to become India's most trusted 
                        communication infrastructure for businesses — starting with AI-powered email automation, 
                        lead capture from inbox, and enterprise-grade email security.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Built for SMEs, agencies, and fast-growing businesses, Vaiket's mission is to ensure no 
                        business ever loses a customer due to delayed replies or unorganized communication.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Brand Story */}
            {activeTab === 'story' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Brand Story & Mission</h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700">
                    <h3 className="text-2xl font-semibold mb-4 text-cyan-400">About Vaiket</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Vaiket is an AI-powered business email and automation platform helping Indian businesses 
                      respond faster, capture more leads, and build trust with every conversation.
                    </p>
                    <p className="text-gray-300 leading-relaxed mt-4">
                      With features like AI-generated email replies, smart lead extraction from inbox, automated 
                      follow-ups, and secure IMAP/SMTP hosting, Vaiket transforms email from a basic communication 
                      tool into a powerful growth engine for modern businesses.
                    </p>
                  </div>

                  <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-700/50 text-center">
                    <blockquote className="text-2xl font-semibold italic text-purple-200">
                      "We're on a mission to enable 100,000+ Indian businesses to scale with AI-powered communication."
                    </blockquote>
                  </div>
                </div>
              </div>
            )}

            {/* Key Messages */}
            {activeTab === 'messages' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Press-Ready Key Messages</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Key messaging points for journalists and media coverage.
                  </p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {keyMessages.map((message, index) => (
                      <div 
                        key={index}
                        className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white font-bold text-sm">✓</span>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Press Contact Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Press & Media Contact</h2>
            <p className="text-xl text-gray-300 mb-8">
              For interviews, quotes, or media coverage, please contact our press team.
            </p>

            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700 max-w-2xl mx-auto">
              <div className="space-y-4 text-lg">
                <div className="flex items-center justify-center gap-3">
                  <span>📩</span>
                  <span className="text-cyan-400 font-semibold">press@vaiket.com</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span>📩</span>
                  <span className="text-gray-300">support@vaiket.com</span>
                  <span className="text-sm text-gray-500">(secondary)</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span>🌐</span>
                  <span className="text-gray-300">www.vaiket.com</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span>📍</span>
                  <span className="text-gray-300">Ranchi, Jharkhand, India</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors">
                  Request Press Kit as ZIP
                </button>
                <button className="px-6 py-3 bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 rounded-lg font-semibold transition-colors">
                  Request Interview with Founder
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p>Vaiket Press & Media Kit • For official use by journalists and partners</p>
            <p className="text-sm mt-2">© 2024 Vaiket by Vikas Web Development Pvt. Ltd. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}