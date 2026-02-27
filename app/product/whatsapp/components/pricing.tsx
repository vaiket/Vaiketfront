"use client";

import Link from "next/link";
import { useState } from "react";

type BillingCycle = "monthly" | "yearly";

interface Plan {
  id: number;
  name: string;
  subLabel: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlight?: boolean;
}

const plans: Plan[] = [
  {
    id: 1,
    name: "Basic",
    subLabel: "Starter subscription",
    monthlyPrice: 1499,
    yearlyPrice: Math.round(1499 * 12 * 0.8),
    features: [
      "1 live chat agent",
      "Connect up to 2 WhatsApp numbers",
      "1 drag-and-drop chatbot flow",
      "Unlimited auto replies",
      "Lead and CRM flow support",
      "WhatsApp widget for website",
      "Campaign scheduler and greetings",
      "Unlimited template creation",
      "Unlimited chat automation",
      "API integration support",
      "Broadcast multimedia messages",
      "Broadcast flows and catalogs",
      "Access on mobile and web",
      "Dedicated onboarding support",
    ],
  },
  {
    id: 2,
    name: "Growth",
    subLabel: "Pro subscription",
    monthlyPrice: 2499,
    yearlyPrice: Math.round(2499 * 12 * 0.8),
    highlight: true,
    features: [
      "5 live chat agents",
      "Connect up to 5 WhatsApp numbers",
      "5 drag-and-drop chatbot flows",
      "Appointment booking module",
      "Product and quotation management",
      "Webhook integration",
      "Faster template approval support",
      "Campaign scheduler and greetings",
      "Unlimited chat automation",
      "Broadcast multimedia messages",
      "Broadcast flows, catalogs, and carousels",
      "Access on mobile and web",
      "Dedicated account and call support",
    ],
  },
  {
    id: 3,
    name: "Advance",
    subLabel: "Enterprise subscription",
    monthlyPrice: 4999,
    yearlyPrice: Math.round(4999 * 12 * 0.8),
    features: [
      "10 live chat agents",
      "Connect up to 10 WhatsApp numbers",
      "10 drag-and-drop chatbot flows",
      "WhatsApp shop and catalog management",
      "In-chat payment support",
      "AI-powered chatbot assistance",
      "Webhook and API integration",
      "Campaign scheduler and greetings",
      "Unlimited template creation",
      "24-hour conversation window support",
      "Broadcast multimedia and carousel messages",
      "Access on mobile and web",
      "Priority account management",
    ],
  },
];

export default function WhatsAppPricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const getPrice = (plan: Plan) =>
    billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

  const getDuration = () => (billingCycle === "monthly" ? "/ 30 days" : "/ year");

  return (
    <section className="bg-gray-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto mb-10 max-w-6xl text-center md:mb-16">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:mb-6 md:text-4xl lg:text-5xl">
          Prime Value Bundles
        </h2>
        <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl">
          Choose a plan based on your team size and automation depth. All plans
          are designed for practical rollout and scale.
        </p>
      </div>

      <div className="mx-auto mb-8 max-w-6xl text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-green-50 px-4 py-2">
          <div className="mr-2 h-3 w-3 rounded-full bg-green-500" />
          <span className="text-sm font-medium text-green-700 md:text-base">
            WhatsApp Business Platform
          </span>
        </div>
      </div>

      <div className="mx-auto mb-12 max-w-6xl md:mb-16">
        <div className="flex flex-col items-center">
          <div className="mb-3 flex items-center">
            <svg className="mr-2 h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">Choose your billing cycle</span>
          </div>

          <div className="flex rounded-full bg-gray-100 p-1.5">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 md:px-8 md:py-3 md:text-base ${
                billingCycle === "monthly"
                  ? "scale-105 bg-green-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 md:px-8 md:py-3 md:text-base ${
                billingCycle === "yearly"
                  ? "scale-105 bg-green-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              Yearly
            </button>
          </div>

          {billingCycle === "yearly" && (
            <div className="mt-3">
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Save 20% with yearly billing
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl ${
                plan.highlight ? "ring-2 ring-green-500 md:scale-105" : ""
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 transform">
                  <span className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6 md:p-8">
                <div className="mb-4">
                  <span className="mb-2 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {plan.subLabel}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900 md:text-5xl">
                      Rs. {getPrice(plan).toLocaleString()}
                    </span>
                    <span className="ml-2 text-lg text-gray-600 md:text-xl">{getDuration()}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">+18% GST applicable</p>
                </div>

                <Link
                  href="/get-started"
                  className={`mb-8 block w-full rounded-lg py-3 text-center font-semibold transition-all duration-200 md:py-4 ${
                    plan.highlight
                      ? "bg-green-600 text-white shadow-md hover:bg-green-700 hover:shadow-lg"
                      : "bg-green-500 text-white shadow-sm hover:bg-green-600 hover:shadow-md"
                  }`}
                >
                  Get Started
                  <svg className="ml-2 inline h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

                <div className="max-h-[500px] space-y-3 overflow-y-auto pr-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <svg
                        className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm leading-relaxed text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="mb-2 text-sm font-medium text-gray-900">Message Pricing (Per Message)</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Marketing</p>
                        <p className="text-lg font-bold text-green-600">Rs. 0.8631</p>
                      </div>
                      <div className="h-8 w-px bg-gray-300" />
                      <div>
                        <p className="text-xs text-gray-600">Utility</p>
                        <p className="text-lg font-bold text-green-600">Rs. 0.115</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl text-center">
        <div className="inline-flex items-center rounded-lg bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
          <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            <span className="font-medium">Zero Markup Fees</span> up to 10,000 messages per month on all plans
          </span>
        </div>
      </div>
    </section>
  );
}
