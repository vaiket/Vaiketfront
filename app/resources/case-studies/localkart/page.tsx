// pages/resources/case-studies/localkart.js
import Head from 'next/head';
import Link from 'next/link';

export default function LocalKartCaseStudy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Head>
        <title>LocalKart Case Study - 40% More Leads with Vaiket | Vaiket</title>
        <meta name="description" content="See how LocalKart increased qualified leads by 40% and reduced response times by 3.2x with Vaiket's AI email automation" />
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
            <span className="inline-block bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Ecommerce Success Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How LocalKart Increased Qualified Leads by 40% with AI Email Automation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transforming customer communication from a bottleneck into a competitive advantage
            </p>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
            <div className="text-center bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-indigo-400">40%</div>
              <div className="text-gray-400 text-sm">More Leads</div>
            </div>
            <div className="text-center bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-green-400">3.2×</div>
              <div className="text-gray-400 text-sm">Faster Response</div>
            </div>
            <div className="text-center bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-blue-400">0</div>
              <div className="text-gray-400 text-sm">Missed Emails</div>
            </div>
            <div className="text-center bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-gray-400 text-sm">AI Support</div>
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
              {/* About LocalKart */}
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-2xl mr-6">
                    🛒
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">About LocalKart</h2>
                    <p className="text-gray-400">Ecommerce • Local Products • India-wide</p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg">
                  LocalKart is a growing ecommerce brand that sells curated local products across India. 
                  They receive dozens of product enquiry emails every day related to price, shipping, 
                  bulk orders, and custom requests.
                </p>
              </div>

              {/* The Challenge */}
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-2xl text-red-400 mr-4">
                    ⚠️
                  </div>
                  <h2 className="text-2xl font-bold text-red-400">The Challenge</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-red-400 mr-3 mt-1">•</div>
                    <p className="text-gray-300">Many emails were replied to late or completely missed</p>
                  </div>
                  <div className="flex items-start">
                    <div className="text-red-400 mr-3 mt-1">•</div>
                    <p className="text-gray-300">Sales team was busy, support inbox was overflowing</p>
                  </div>
                  <div className="flex items-start">
                    <div className="text-red-400 mr-3 mt-1">•</div>
                    <p className="text-gray-300">Leads were slipping away to faster competitors</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-300 italic">
                    "We were losing business just because we couldn't answer on time."
                  </p>
                </div>

                {/* Problem Visualization */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-red-500/30">
                    <h4 className="font-bold text-red-400 mb-2">Before Vaiket</h4>
                    <ul className="text-gray-400 text-sm space-y-2">
                      <li>• 6-24 hour response times</li>
                      <li>• 60% of leads missed during peak</li>
                      <li>• Manual email sorting</li>
                      <li>• No follow-up system</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-green-500/30">
                    <h4 className="font-bold text-green-400 mb-2">After Vaiket</h4>
                    <ul className="text-gray-400 text-sm space-y-2">
                      <li>• Instant AI responses</li>
                      <li>• 0% missed leads</li>
                      <li>• Automated categorization</li>
                      <li>• Smart follow-up sequences</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Why LocalKart Chose Vaiket */}
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl text-blue-400 mr-4">
                    🎯
                  </div>
                  <h2 className="text-2xl font-bold text-blue-400">Why LocalKart Chose Vaiket</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mr-3 flex-shrink-0">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Business Email</h4>
                        <p className="text-gray-400 text-sm">Professional email with their own domain</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mr-3 flex-shrink-0">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-bold text-white">AI Reply Suggestions</h4>
                        <p className="text-gray-400 text-sm">Smart responses for common queries</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mr-3 flex-shrink-0">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Auto Follow-ups</h4>
                        <p className="text-gray-400 text-sm">Automatic reminders for unanswered emails</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mr-3 flex-shrink-0">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Secure & Reliable</h4>
                        <p className="text-gray-400 text-sm">IMAP/SMTP with guaranteed delivery</p>
                      </div>
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
                  <h2 className="text-2xl font-bold text-purple-400">Implementation</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Connected Domain</h4>
                      <p className="text-gray-300">Set up professional business email with their own domain on Vaiket</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">AI Response Engine</h4>
                      <p className="text-gray-300">Enabled AI-powered responses for frequently asked questions about pricing, delivery timelines, stock availability, and bulk orders</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Smart Lead Capture</h4>
                      <p className="text-gray-300">Configured automatic tagging system to identify and prioritize "hot leads" based on customer intent and urgency</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 mt-1">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Auto Follow-ups</h4>
                      <p className="text-gray-300">Set up intelligent follow-up sequences at 24 hours and 72 hours for customers who didn't respond to initial messages</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-2xl text-green-400 mr-4">
                    📈
                  </div>
                  <h2 className="text-2xl font-bold text-green-400">The Results</h2>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 text-lg mb-4">
                    After 30-45 days of implementing Vaiket, LocalKart achieved remarkable improvements:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center bg-gray-900/50 p-6 rounded-xl border border-green-500/30">
                    <div className="text-3xl font-bold text-green-400 mb-2">3.2×</div>
                    <div className="text-white font-medium mb-2">Faster Response Time</div>
                    <div className="text-gray-400 text-sm">On new enquiries</div>
                  </div>
                  <div className="text-center bg-gray-900/50 p-6 rounded-xl border border-green-500/30">
                    <div className="text-3xl font-bold text-green-400 mb-2">+40%</div>
                    <div className="text-white font-medium mb-2">More Qualified Leads</div>
                    <div className="text-gray-400 text-sm">From email channels</div>
                  </div>
                  <div className="text-center bg-gray-900/50 p-6 rounded-xl border border-green-500/30">
                    <div className="text-3xl font-bold text-green-400 mb-2">0</div>
                    <div className="text-white font-medium mb-2">Missed Enquiry Emails</div>
                    <div className="text-gray-400 text-sm">Thanks to smart inbox rules</div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                  <h4 className="font-bold text-green-400 mb-2">Additional Benefits</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li>• 15+ hours per week saved on manual email management</li>
                    <li>• Improved customer satisfaction scores from 3.2★ to 4.7★</li>
                    <li>• 28% increase in repeat customer rate</li>
                    <li>• Sales team can focus on closing instead of admin work</li>
                  </ul>
                </div>
              </div>

              {/* Customer Quote */}
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-indigo-500/50">
                <div className="text-center">
                  <div className="text-6xl mb-4">"</div>
                  <p className="text-xl text-gray-300 italic mb-6">
                    Now, even if we are busy fulfilling orders, our email is still working for us in the background. 
                    Vaiket made our inbox feel like a smart salesperson.
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      RS
                    </div>
                    <div>
                      <div className="font-bold text-white">Rohan Sharma</div>
                      <div className="text-gray-400">Founder, LocalKart</div>
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
                    <div className="font-medium">Ecommerce Retail</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Team Size</div>
                    <div className="font-medium">12 people</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Implementation</div>
                    <div className="font-medium">2 weeks</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Results Seen</div>
                    <div className="font-medium">Within 30 days</div>
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
                    'AI Auto-Reply',
                    'Smart Inbox',
                    'Auto Follow-ups',
                    'Lead Capture',
                    'Business Email',
                    'Team Collaboration'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs mr-3">
                        ✓
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold mb-3">Get Similar Results</h3>
                <p className="text-indigo-100 mb-4 text-sm">
                  Start transforming your customer communication today
                </p>
                <button className="w-full bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 rounded-lg transition-colors mb-3">
                  Start Free Trial
                </button>
                <button className="w-full bg-transparent border border-white text-white hover:bg-white/10 font-medium py-3 rounded-lg transition-colors">
                  Book Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Email Communication?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join LocalKart and hundreds of other businesses using Vaiket to never miss a lead again
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-indigo-500/20">
              Start Your 14-Day Trial
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-8 py-4 rounded-xl font-bold text-lg transition-colors">
              📞 Speak with Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}