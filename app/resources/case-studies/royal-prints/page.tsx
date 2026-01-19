// pages/resources/case-studies/royal-prints.js
import Head from 'next/head';
import Link from 'next/link';

export default function RoyalPrintsCaseStudy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Head>
        <title>Royal Prints Case Study - 60% Less Email Workload | Vaiket</title>
        <meta name="description" content="See how Royal Prints reduced email workload by 60% and increased repeat customers by 18% with Vaiket's smart inbox automation" />
      </Head>

      {/* Back Navigation */}
      <nav className="pt-24 pb-8 px-4">
        <div className="container mx-auto">
          <Link href="/resources/case-studies" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors">
            ← Back to Case Studies
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Printing & Branding Success
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How Royal Prints Reduced Email Workload by 60% with Smart Inbox
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transforming chaotic customer communication into an organized, efficient system
            </p>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
            <div className="text-center bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-purple-400">-60%</div>
              <div className="text-gray-400 text-sm">Email Time</div>
            </div>
            <div className="text-center bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-green-400">+18%</div>
              <div className="text-gray-400 text-sm">Repeat Customers</div>
            </div>
            <div className="text-center bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-blue-400">100%</div>
              <div className="text-gray-400 text-sm">Inbox Organization</div>
            </div>
            <div className="text-center bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-orange-400">2.5hrs</div>
              <div className="text-gray-400 text-sm">Daily Time Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* About Royal Prints */}
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-2xl mr-6">
                    🎨
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">About Royal Prints</h2>
                    <p className="text-gray-400">Printing Services • Branding Studio • Custom Orders</p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg">
                  Royal Prints is a premium print and branding studio that handles visiting cards, 
                  flex banners, wedding cards, and corporate branding orders primarily through 
                  email and WhatsApp communications.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span className="text-gray-400">Services:</span>
                    <span className="ml-2 text-white">Printing & Branding</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span className="text-gray-400">Channels:</span>
                    <span className="ml-2 text-white">Email & WhatsApp</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span className="text-gray-400">Order Types:</span>
                    <span className="ml-2 text-white">B2B & B2C</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span className="text-gray-400">Team Size:</span>
                    <span className="ml-2 text-white">8 people</span>
                  </div>
                </div>
              </div>

              {/* The Challenge */}
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-2xl text-red-400 mr-4">
                    🚨
                  </div>
                  <h2 className="text-2xl font-bold text-red-400">The Challenge</h2>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="text-red-400 mr-3 mt-1">•</div>
                    <div>
                      <p className="text-gray-300 font-medium">Too many small inquiries, corrections, and confirmations</p>
                      <p className="text-gray-400 text-sm mt-1">Daily flood of emails about pricing, design changes, and order status</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-red-400 mr-3 mt-1">•</div>
                    <div>
                      <p className="text-gray-300 font-medium">Team was spending hours daily inside inbox</p>
                      <p className="text-gray-400 text-sm mt-1">3-4 hours per team member spent on email management alone</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-red-400 mr-3 mt-1">•</div>
                    <div>
                      <p className="text-gray-300 font-medium">High stress, low organization, delayed answers</p>
                      <p className="text-gray-400 text-sm mt-1">Important emails getting buried under routine inquiries</p>
                    </div>
                  </div>
                </div>

                {/* Problem Visualization */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                  <h4 className="font-bold text-red-400 mb-3">The Email Chaos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-red-300 font-medium mb-2">Before Vaiket:</div>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Mixed inquiry types in one inbox</li>
                        <li>• Manual sorting of every email</li>
                        <li>• Repetitive answers to same questions</li>
                        <li>• No follow-up system</li>
                        <li>• Missed design change requests</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-green-300 font-medium mb-2">Impact on Business:</div>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Delayed order processing</li>
                        <li>• Customer frustration</li>
                        <li>• Team burnout</li>
                        <li>• Lost repeat business</li>
                        <li>• Inconsistent communication</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Royal Prints Chose Vaiket */}
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl text-blue-400 mr-4">
                    🎯
                  </div>
                  <h2 className="text-2xl font-bold text-blue-400">Why They Chose Vaiket</h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mr-4 flex-shrink-0">
                      📧
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Centralized Business Email</h4>
                      <p className="text-gray-300">Needed a unified professional email system to manage all customer communications in one place</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mr-4 flex-shrink-0">
                      🏷️
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Auto-Categorization</h4>
                      <p className="text-gray-300">Automatic tagging and organization of emails into New Leads, Existing Customers, and Vendor communications</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mr-4 flex-shrink-0">
                      🤖
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">AI-Powered Responses</h4>
                      <p className="text-gray-300">Smart replies for common questions about pricing, working hours, delivery timelines, and basic FAQs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Implementation */}
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl text-purple-400 mr-4">
                    ⚙️
                  </div>
                  <h2 className="text-2xl font-bold text-purple-400">Implementation Process</h2>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Email Migration & Setup</h4>
                      <p className="text-gray-300 mb-3">Migrated all business communications to Vaiket's centralized professional email system with their custom domain</p>
                      <div className="bg-gray-900/50 p-3 rounded-lg">
                        <p className="text-purple-400 text-sm font-medium">Setup Time: 2 days</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Smart Categorization Rules</h4>
                      <p className="text-gray-300 mb-3">Configured intelligent rules to automatically tag incoming emails into categories:</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-gray-900/50 p-3 rounded-lg border border-blue-500/30">
                          <div className="text-blue-400 font-bold">New Lead</div>
                          <div className="text-gray-400 text-sm">First-time inquiries & quotes</div>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg border border-green-500/30">
                          <div className="text-green-400 font-bold">Design Change</div>
                          <div className="text-gray-400 text-sm">Revisions & modifications</div>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg border border-orange-500/30">
                          <div className="text-orange-400 font-bold">Order Status</div>
                          <div className="text-gray-400 text-sm">Tracking & delivery updates</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">AI Response Configuration</h4>
                      <p className="text-gray-300 mb-3">Enabled AI-powered automatic responses for frequently asked questions:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                          <div className="text-white font-medium">Pricing & Quotes</div>
                          <div className="text-gray-400 text-sm">Instant price estimates</div>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                          <div className="text-white font-medium">Delivery Timelines</div>
                          <div className="text-gray-400 text-sm">Standard production times</div>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                          <div className="text-white font-medium">Working Hours</div>
                          <div className="text-gray-400 text-sm">Business hours & contact info</div>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                          <div className="text-white font-medium">Reprinting Process</div>
                          <div className="text-gray-400 text-sm">Re-order instructions</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 mt-1">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Daily Summary System</h4>
                      <p className="text-gray-300">Implemented automated daily email summaries for owners, replacing constant inbox checking with scheduled, organized updates</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-2xl text-green-400 mr-4">
                    📊
                  </div>
                  <h2 className="text-2xl font-bold text-green-400">The Results</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div className="text-center bg-gray-900/50 p-6 rounded-xl border border-green-500/30">
                      <div className="text-3xl font-bold text-green-400 mb-2">-60%</div>
                      <div className="text-white font-medium mb-2">Reduction in Email Time</div>
                      <div className="text-gray-400 text-sm">Time spent managing emails</div>
                    </div>
                    <div className="text-center bg-gray-900/50 p-6 rounded-xl border border-green-500/30">
                      <div className="text-3xl font-bold text-green-400 mb-2">+18%</div>
                      <div className="text-white font-medium mb-2">Increase in Repeat Customers</div>
                      <div className="text-gray-400 text-sm">Due to consistent follow-ups</div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="text-center bg-gray-900/50 p-6 rounded-xl border border-green-500/30">
                      <div className="text-3xl font-bold text-green-400 mb-2">2.5hrs</div>
                      <div className="text-white font-medium mb-2">Daily Time Saved</div>
                      <div className="text-gray-400 text-sm">Per team member</div>
                    </div>
                    <div className="text-center bg-gray-900/50 p-6 rounded-xl border border-green-500/30">
                      <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                      <div className="text-white font-medium mb-2">Staff Focus Shift</div>
                      <div className="text-gray-400 text-sm">To production instead of emails</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                  <h4 className="font-bold text-green-400 mb-3">Business Impact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white font-medium mb-2">Operational Improvements:</div>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Faster order processing</li>
                        <li>• Reduced team stress</li>
                        <li>• Better work-life balance</li>
                        <li>• Streamlined workflows</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-medium mb-2">Customer Experience:</div>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Instant responses to common queries</li>
                        <li>• Consistent communication</li>
                        <li>• Professional brand image</li>
                        <li>• Timely order updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Quote */}
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-purple-500/50">
                <div className="text-center">
                  <div className="text-6xl mb-4">"</div>
                  <p className="text-xl text-gray-300 italic mb-6">
                    Earlier, email felt like a headache. Now it's a controlled system. 
                    Vaiket brought discipline to how we talk to customers and gave us back 
                    hours every day to focus on what we do best - creating beautiful prints.
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      AV
                    </div>
                    <div>
                      <div className="font-bold text-white">Aditi Verma</div>
                      <div className="text-gray-400">Marketing Manager, Royal Prints</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Facts */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 text-sm">Industry</div>
                    <div className="font-medium">Printing & Branding</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Team Size</div>
                    <div className="font-medium">8 people</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Email Volume</div>
                    <div className="font-medium">50-100/day</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Implementation</div>
                    <div className="font-medium">1 week</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Vaiket Plan</div>
                    <div className="font-medium text-indigo-400">Growth</div>
                  </div>
                </div>
              </div>

              {/* Features Used */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Features Used</h3>
                <div className="space-y-3">
                  {[
                    'Smart Inbox',
                    'Auto Categorization',
                    'AI Auto-Reply',
                    'Business Email',
                    'Daily Summaries',
                    'Team Collaboration'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs mr-3">
                        ✓
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Savings Breakdown */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Time Savings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Manual Sorting</span>
                    <span className="text-green-400">-45 min/day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Repetitive Replies</span>
                    <span className="text-green-400">-60 min/day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Follow-ups</span>
                    <span className="text-green-400">-30 min/day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Inbox Management</span>
                    <span className="text-green-400">-15 min/day</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-white">Total Saved</span>
                      <span className="text-green-400">2.5 hrs/day</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold mb-3">Reclaim Your Time</h3>
                <p className="text-purple-100 mb-4 text-sm">
                  Stop drowning in emails and start focusing on your business
                </p>
                <button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 rounded-lg transition-colors mb-3">
                  Start Free Trial
                </button>
                <button className="w-full bg-transparent border border-white text-white hover:bg-white/10 font-medium py-3 rounded-lg transition-colors">
                  See Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Email Chaos?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join Royal Prints and hundreds of service businesses using Vaiket to automate customer communication
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-purple-500/20">
              Start Your 14-Day Trial
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-8 py-4 rounded-xl font-bold text-lg transition-colors">
              📞 Get Personalized Demo
            </button>
          </div>
          <p className="text-gray-400 mt-6 text-sm">
            Perfect for printing services, agencies, and service businesses
          </p>
        </div>
      </section>
    </div>
  );
}