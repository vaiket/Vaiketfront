'use client'
// pages/resources/case-studies/index.js
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Case Studies', icon: '📊' },
    { id: 'ecommerce', name: 'Ecommerce', icon: '🍱' },
    { id: 'offline', name: 'Offline Business', icon: '🛍️' },
    { id: 'agency', name: 'Agency / Freelancer', icon: '🎯' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'service', name: 'Service Business', icon: '🛠️' }
  ];

  const caseStudies = [
    {
      id: 'localkart',
      company: 'LocalKart',
      type: 'ecommerce',
      industry: 'E-commerce Retail',
      logo: '🛒',
      problem: 'Missed 60% of leads due to delayed email responses during peak hours',
      solution: 'Implemented AI auto-replies + smart follow-up sequences',
      metrics: [
        { icon: '⚡', value: '3.2×', label: 'Faster Response Time' },
        { icon: '📈', value: '+40%', label: 'More Leads' },
        { icon: '💰', value: '+28%', label: 'Revenue Growth' }
      ],
      story: 'LocalKart struggled with customer inquiries during flash sales. After implementing Vaiket, they automated 85% of initial responses and saw immediate improvement in customer satisfaction.',
      featured: true
    },
    {
      id: 'royal-prints',
      company: 'Royal Prints',
      type: 'offline',
      industry: 'Printing Services',
      logo: '🎨',
      problem: 'Too many customer messages, no time for personalized replies',
      solution: 'Smart inbox + auto tagging + AI-powered responses',
      metrics: [
        { icon: '🙌', value: '-60%', label: 'Team Stress' },
        { icon: '💵', value: '+18%', label: 'Conversions' },
        { icon: '⏱️', value: '2.5hrs/day', label: 'Time Saved' }
      ],
      story: 'Royal Prints was drowning in customer queries about pricing and turnaround times. Vaiket helped them automate responses while maintaining their brand voice.',
      featured: true
    },
    {
      id: 'learngen',
      company: 'LearnGen Academy',
      type: 'education',
      industry: 'Education & Coaching',
      logo: '🏫',
      problem: 'High student inquiry volume during admission season',
      solution: '24/7 AI responses + lead qualification + appointment scheduling',
      metrics: [
        { icon: '🎓', value: '+65%', label: 'Admission Inquiries' },
        { icon: '📅', value: '45%', label: 'Auto-scheduled Demos' },
        { icon: '⏰', value: '24/7', label: 'Response Coverage' }
      ],
      story: 'LearnGen Academy automated their admission process, qualifying leads and scheduling demo classes automatically, freeing up their counselors for high-value conversations.',
      featured: false
    },
    {
      id: 'techfix',
      company: 'TechFix Solutions',
      type: 'service',
      industry: 'Electronics Repair',
      logo: '🔧',
      problem: 'Customers frustrated with slow response times for service queries',
      solution: 'Instant service quotes + appointment booking + status updates',
      metrics: [
        { icon: '👍', value: '4.8★', label: 'Customer Rating' },
        { icon: '🚀', value: '+52%', label: 'Service Bookings' },
        { icon: '💬', value: '89%', label: 'Satisfied Customers' }
      ],
      story: 'TechFix transformed their customer service from reactive to proactive, automatically updating customers on repair status and capturing new service opportunities.',
      featured: false
    },
    {
      id: 'designhub',
      company: 'DesignHub Studio',
      type: 'agency',
      industry: 'Creative Agency',
      logo: '🎨',
      problem: 'Lost potential clients due to delayed proposal responses',
      solution: 'AI-powered proposal generator + client onboarding automation',
      metrics: [
        { icon: '📝', value: '15min', label: 'Proposal Time' },
        { icon: '🤝', value: '+35%', label: 'Client Acquisition' },
        { icon: '💼', value: '3×', label: 'Project Capacity' }
      ],
      story: 'DesignHub automated their client intake process, instantly sending personalized proposals and capturing leads that would have been lost to slower competitors.',
      featured: false
    },
    {
      id: 'urbangrocers',
      company: 'Urban Grocers',
      type: 'ecommerce',
      industry: 'Online Grocery',
      logo: '🍎',
      problem: 'High cart abandonment due to delivery timing confusion',
      solution: 'Automated delivery updates + slot confirmation + reminder system',
      metrics: [
        { icon: '🛒', value: '-42%', label: 'Cart Abandonment' },
        { icon: '📦', value: '+31%', label: 'Repeat Orders' },
        { icon: '⭐', value: '4.9★', label: 'App Store Rating' }
      ],
      story: 'Urban Grocers used Vaiket to create a seamless post-purchase communication system, reducing customer anxiety about delivery times and building loyalty.',
      featured: false
    }
  ];

  const beforeAfterMetrics = [
    {
      metric: 'Avg. Response Time',
      before: '6–24 hours',
      after: 'Under 1 hour',
      improvement: '94% faster'
    },
    {
      metric: 'Missed Customer Leads',
      before: '40–60%',
      after: 'Under 5%',
      improvement: '90% reduction'
    },
    {
      metric: 'Inbox Organization',
      before: 'Manual sorting',
      after: 'Fully automated',
      improvement: '100% automated'
    },
    {
      metric: 'Customer Satisfaction',
      before: 'Low (2.8★)',
      after: 'High (4.7★)',
      improvement: '68% increase'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Founder, LocalKart',
      image: '👩',
      quote: 'Support replies are instant now — customers feel we are always online. Our sales increased by 40% in just 2 months!',
      company: 'LocalKart'
    },
    {
      name: 'Rohan Mehta',
      role: 'Operations Manager, Royal Prints',
      image: '👨',
      quote: 'Lead follow-ups run automatically. Our sales team is finally relaxed and focused on closing deals instead of chasing leads.',
      company: 'Royal Prints'
    },
    {
      name: 'Anita Desai',
      role: 'Director, LearnGen Academy',
      image: '👩',
      quote: 'During admission season, we handle 3x more inquiries without hiring extra staff. The AI understands context perfectly!',
      company: 'LearnGen Academy'
    }
  ];

  const filteredStudies = activeFilter === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.type === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Head>
        <title>Case Studies | Vaiket - Real Business Results</title>
        <meta name="description" content="See how businesses achieved remarkable growth with Vaiket's AI email automation" />
      </Head>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Real Results. Real Businesses.
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            See how AI automation helps companies grow faster with Vaiket.
          </p>
          <p className="text-gray-400 mb-10">
            Trusted by businesses across India — 24/7 automation, zero missed leads.
          </p>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { value: '40%', label: 'Avg. Lead Increase' },
              { value: '3.2×', label: 'Faster Response' },
              { value: '94%', label: 'Time Saved' },
              { value: '4.8★', label: 'Avg. Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-indigo-400">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 px-4 border-b border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${
                  activeFilter === filter.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudies.map((study) => (
              <div 
                key={study.id}
                className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl mr-4">
                    {study.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{study.company}</h3>
                    <p className="text-gray-400 text-sm">{study.industry}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-start mb-3">
                    <span className="text-red-400 mr-2">❌</span>
                    <p className="text-gray-300 text-sm"><strong>Problem:</strong> {study.problem}</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">✅</span>
                    <p className="text-gray-300 text-sm"><strong>Solution:</strong> {study.solution}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {study.metrics.map((metric, index) => (
                    <div key={index} className="text-center bg-gray-900/50 rounded-lg p-2">
                      <div className="text-lg">{metric.icon}</div>
                      <div className="font-bold text-indigo-400">{metric.value}</div>
                      <div className="text-xs text-gray-400">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-gray-300 text-sm mb-6 line-clamp-3">{study.story}</p>

                <Link href={`/resources/case-studies/${study.id}`}>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 group-hover:bg-indigo-600 transition-colors py-2 rounded-lg font-medium">
                    View Case Study →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After Metrics */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">Transformation Metrics</h2>
          <p className="text-gray-400 text-center mb-12">See the measurable impact Vaiket delivers</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beforeAfterMetrics.map((item, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">{item.metric}</h3>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-center">
                    <div className="text-red-400 font-bold text-sm">Before</div>
                    <div className="text-lg">{item.before}</div>
                  </div>
                  <div className="text-2xl mx-4">→</div>
                  <div className="text-center">
                    <div className="text-green-400 font-bold text-sm">After</div>
                    <div className="text-lg">{item.after}</div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-green-900 text-xs font-bold px-3 py-1 rounded-full">
                    {item.improvement}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">What Our Customers Say</h2>
          <p className="text-gray-400 text-center mb-12">Real stories from businesses using Vaiket</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-xl mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <div className="text-indigo-400 text-sm font-medium">{testimonial.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Want the Same Results for Your Business?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join hundreds of businesses already transforming their customer communication with AI
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-indigo-500/20">
              Try Vaiket Today →
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-8 py-4 rounded-xl font-bold text-lg transition-colors">
              📞 Book a Demo
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-8 py-4 rounded-xl font-bold text-lg transition-colors">
              📩 Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}