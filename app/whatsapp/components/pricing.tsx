"use client";
import React, { useState } from 'react';

type BillingCycle = 'monthly' | 'yearly';

interface Plan {
  id: number;
  name: string;
  subLabel: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlight?: boolean;
}

const WhatsAppPricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  const plans: Plan[] = [
    {
      id: 1,
      name: 'Basic',
      subLabel: 'Starter subscription',
      monthlyPrice: 1499,
      yearlyPrice: Math.round(1499 * 12 * 0.8), // 20% discount for yearly
      features: [
        '1 Live Chat Agent',
        'Connect 2 WhatsApp Number',
        '1 Drag & Drop Chatbot Flow',
        'Unlimited Auto Replies',
        'Lead & IVR Manage CRM',
        'Create WhatsApp Widget for Website',
        'Manage Flows',
        'Zero Markup Fees till 10000 Messages Monthly',
        'Marketing: ₹0.8631 | Utility: ₹0.115',
        'Pay Directly to Facebook',
        'Postpaid Meta Bill Payments',
        'Unlimited Free Incoming Messages',
        'Access on Mobile & Web',
        'Create WhatsApp Scanner',
        'API Integration (Free)',
        'Campaign Scheduler & Greetings',
        'Unlimited Template Creation',
        'Unlimited Chat Automation',
        'Free Shopify & WordPress Plugin',
        'Contact Manager (Import & Export)',
        'Customer Response (Import & Export)',
        'Broadcast Multimedia Messages',
        'Broadcast Flows & Catalogs',
        'Broadcast Carousel Messages',
        'Free Green Tick Application Guidance',
        'Dedicated AM',
        'Call Support & Trainer'
      ]
    },
    {
      id: 2,
      name: 'Growth',
      subLabel: 'Pro subscription',
      monthlyPrice: 2499,
      yearlyPrice: Math.round(2499 * 12 * 0.8), // 20% discount for yearly
      highlight: true,
      features: [
        '5 Live Chat Agents',
        '5 Drag & Drop Chatbot Flows',
        'Connect 5 WhatsApp Numbers',
        'Appointment Booking Module',
        'Product & Quotation Management',
        'Lead & IVR Manage CRM',
        'Zero Markup Fees till 10000 Messages Monthly',
        'Pay Directly to Facebook',
        'Marketing: ₹0.8631 | Utility: ₹0.115',
        'Postpaid Meta Bill Payments',
        'Unlimited Free Incoming Messages',
        'Create WhatsApp Widget for Website',
        'Create WhatsApp Scanner',
        'API Integration (Free)',
        'Webhook Integration',
        'Campaign Scheduler & Greetings',
        'Unlimited Template Creation',
        '24-Hour Conversation Window',
        'Unlimited Chat Automation',
        'Free Shopify & WordPress Plugin',
        'Access on Mobile & Web',
        'Faster Template Approval (30 Seconds)',
        'Broadcast Multimedia Messages',
        'Broadcast Flows & Catalogs',
        'Broadcast Carousel Messages',
        'Free Green Tick Application Guidance',
        'Dedicated AM & Call Support'
      ]
    },
    {
      id: 3,
      name: 'Advance',
      subLabel: 'Enterprise subscription',
      monthlyPrice: 4999,
      yearlyPrice: Math.round(4999 * 12 * 0.8), // 20% discount for yearly
      features: [
        '10 Live Chat Agents',
        '10 Drag & Drop Chatbot Flows',
        'Connect 10 WhatsApp Numbers',
        'Appointment Booking Module',
        'Catalog Management',
        'WhatsApp Shop Creation',
        'E-commerce Management',
        'In-Chat Payments',
        'Free AI-Powered Chatbot',
        'Zero Markup Fees till 10000 Messages Monthly',
        'Lead & IVR Manage CRM',
        'Product & Quotation Management',
        'Pay Directly to Facebook',
        'Marketing: ₹0.8631 | Utility: ₹0.115',
        'Postpaid Meta Bill Payments',
        'Unlimited Free Incoming Messages',
        'Create WhatsApp Scanner',
        'Create WhatsApp Widget for Website',
        'API Integration (Free)',
        'Webhook Integration',
        'Campaign Scheduler & Greetings',
        'Unlimited Template Creation',
        '24-Hour Conversation Window',
        'Unlimited Chat Automation',
        'Free Shopify & WordPress Plugin',
        'Access on Mobile & Web',
        'Broadcast Multimedia Messages',
        'Broadcast Flows & Catalogs',
        'Broadcast Carousel Messages',
        'Free Green Tick Application Guidance',
        'Dedicated AM & Call Support'
      ]
    }
  ];

  const getPrice = (plan: Plan) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getDuration = () => {
    return billingCycle === 'monthly' ? '/ 30 days' : '/ year';
  };

  const getYearlySavings = () => {
    return 'Save 20% with yearly billing';
  };

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
          Prime Value Bundles
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          The epitome of convenience and affordability bundled into one irresistible package. 
          Designed with your needs in mind, our Prime Value Bundles offer a curated selection 
          of top-quality products or services.
        </p>
      </div>

      {/* WhatsApp Only Indicator */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center justify-center px-4 py-2 bg-green-50 rounded-full">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm md:text-base font-medium text-green-700">
            WhatsApp Business Platform
          </span>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="max-w-6xl mx-auto mb-12 md:mb-16">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-3">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              Choose your billing cycle
            </span>
          </div>
          
          <div className="flex bg-gray-100 rounded-full p-1.5">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-green-600 text-white shadow-sm transform scale-105'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                billingCycle === 'yearly'
                  ? 'bg-green-600 text-white shadow-sm transform scale-105'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              Yearly
            </button>
          </div>
          
          {billingCycle === 'yearly' && (
            <div className="mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {getYearlySavings()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.highlight ? 'ring-2 ring-green-500 transform md:scale-105' : ''
              }`}
            >
              {/* Highlight Badge */}
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card Content */}
              <div className="p-6 md:p-8">
                {/* Plan Header */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold mb-2">
                    {plan.subLabel}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {plan.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900">
                      ₹{getPrice(plan).toLocaleString()}
                    </span>
                    <span className="text-lg md:text-xl text-gray-600 ml-2">
                      {getDuration()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    +18% GST applicable
                  </p>
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 md:py-4 rounded-lg font-semibold transition-all duration-200 mb-8 ${
                  plan.highlight 
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg' 
                    : 'bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-md'
                }`}>
                  Get Started
                  <svg className="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                {/* Features List */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Message Pricing (Per Message)</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Marketing</p>
                        <p className="text-lg font-bold text-green-600">₹0.8631</p>
                      </div>
                      <div className="h-8 w-px bg-gray-300"></div>
                      <div>
                        <p className="text-xs text-gray-600">Utility</p>
                        <p className="text-lg font-bold text-green-600">₹0.115</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-6xl mx-auto mt-12 text-center">
        <div className="inline-flex items-center text-sm text-gray-600 bg-white rounded-lg px-4 py-3 shadow-sm">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            <span className="font-medium">Zero Markup Fees</span> up to 10,000 messages/month on all plans
          </span>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppPricingSection;