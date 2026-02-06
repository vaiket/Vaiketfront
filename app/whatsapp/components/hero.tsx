import { Check } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-50 to-green-50 opacity-70 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 h-60 w-60 rounded-full bg-gradient-to-tr from-emerald-50/50 to-transparent opacity-50"></div>
        <div className="absolute top-1/3 left-1/4 h-40 w-40 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50/30 opacity-40"></div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <div className="text-left">
            {/* Headline */}
            <h1 className="font-poppins text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Automate{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-green-600">Your</span>
                <span className="absolute bottom-2 left-0 right-0 z-0 h-3 bg-green-100/70"></span>
              </span>{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-green-600">Business</span>
                <span className="absolute bottom-2 left-0 right-0 z-0 h-3 bg-green-100/70"></span>
              </span>{' '}
              with Reliable WhatsApp Business API & RCS (Rich Communication Services)
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
              Enterprise-grade messaging automation platform trusted by 5000+ businesses worldwide.
              Scale your customer engagement with verified WhatsApp Business API and RCS solutions.
            </p>

            {/* Features List */}
            <ul className="mt-10 space-y-4">
              {[
                'Broadcast Promotional Offers to Unlimited Users',
                'Sell your Products on WhatsApp using Catalogs',
                'Build chatbots for 24/7 customer support availability',
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <span className="text-lg font-bold text-green-600">✓</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Meta Verified</p>
                  <p className="text-xs text-gray-500">Official Partner</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <span className="text-lg font-bold text-green-600">99%</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Delivery Rate</p>
                  <p className="text-xs text-gray-500">Guaranteed</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-100 transition-all duration-300 hover:shadow-xl hover:shadow-green-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Get Started for Free
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 transition-opacity group-hover:opacity-100 -z-10"></div>
              </button>

              <button className="rounded-xl border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-800 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                Contact Us
              </button>
            </div>

            {/* Additional Info */}
            <p className="mt-6 text-sm text-gray-500">
              No credit card required • Free trial includes 100 messages • Cancel anytime
            </p>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative lg:pl-8">
            <div className="relative mx-auto max-w-2xl lg:mx-0">
              {/* Main Image Container */}
              <div className="relative rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-2xl shadow-green-100/50 ring-1 ring-gray-200/50">
                {/* WABridge Branding */}
                <div className="absolute -top-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg ring-1 ring-gray-200">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-600 to-emerald-500"></div>
                  <span className="font-bold text-gray-900">WABridge</span>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                    Verified
                  </span>
                </div>

                {/* Image with smartphone mockups */}
                <div className="relative">
                  {/* Main Image - Using the exact same image from reference */}
                  <img
                    src="https://wabridge.com/_next/static/media/wabridg-rcs.4b3dbf10.png"
                    alt="WhatsApp Business API & RCS Automation Platform Dashboard"
                    className="w-full rounded-xl shadow-lg"
                  />

                  {/* Overlay Elements */}
                  <div className="absolute -bottom-4 -right-4 hidden rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-200 sm:block">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-100"></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">AI Chatbot Active</p>
                        <p className="text-xs text-green-600">✓ 24/7 Support Enabled</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-gray-50/80 p-4 backdrop-blur-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">5000+</p>
                    <p className="text-xs text-gray-600">Businesses</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">99.8%</p>
                    <p className="text-xs text-gray-600">Delivery Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">24/7</p>
                    <p className="text-xs text-gray-600">Support</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -left-6 top-1/3 hidden rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-200 sm:block">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-gray-700">RCS Enabled</span>
                </div>
              </div>

              <div className="absolute -bottom-6 right-8 hidden rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-200 sm:block">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-400"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Product Cards</p>
                    <p className="text-xs text-gray-500">WhatsApp Catalogs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}