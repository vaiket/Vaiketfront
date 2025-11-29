"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

type PlanKey = "starter" | "growth" | "business";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const plans: Record<
    PlanKey,
    {
      name: string;
      description: string;
      monthlyPrice: number;
      yearlyPrice: number;
      popular: boolean;
      features: string[];
    }
  > = {
    starter: {
      name: "Starter",
      description: "Perfect for small & new businesses",
      monthlyPrice: 1499,
      yearlyPrice: 1079,
      popular: false,
      features: [
        "Custom Business Email",
        "Secure IMAP + SMTP",
        "Smart Inbox",
        "AI Auto-Reply",
        "Lead Capture",
        "Basic Support",
        "10GB Storage",
        "1 Team Account",
      ],
    },
    growth: {
      name: "Growth",
      description: "Best value - AI Superpowers for growing teams",
      monthlyPrice: 2999,
      yearlyPrice: 2159,
      popular: true,
      features: [
        "Everything in Starter",
        "AI Auto-followup",
        "AI Insights Dashboard",
        "Multi-team roles (5)",
        "Priority Support",
        "50GB Storage",
        "Advanced Analytics",
        "Custom Branding",
      ],
    },
    business: {
      name: "Business",
      description: "High volume + SLA for scaling organizations",
      monthlyPrice: 5999,
      yearlyPrice: 4319,
      popular: false,
      features: [
        "Everything in Growth",
        "Unlimited Team Accounts",
        "SLA Guarantee",
        "Dedicated Support",
        "Custom Integrations",
        "Advanced Security",
        "Custom Storage",
        "Onboarding Assistance",
      ],
    },
  };

  const savings: Record<PlanKey, number> = {
    starter: Math.round(
      ((plans.starter.monthlyPrice * 12 -
        plans.starter.yearlyPrice * 12) /
        (plans.starter.monthlyPrice * 12)) *
        100
    ),
    growth: Math.round(
      ((plans.growth.monthlyPrice * 12 - plans.growth.yearlyPrice * 12) /
        (plans.growth.monthlyPrice * 12)) *
        100
    ),
    business: Math.round(
      ((plans.business.monthlyPrice * 12 -
        plans.business.yearlyPrice * 12) /
        (plans.business.monthlyPrice * 12)) *
        100
    ),
  };

  const faqs = [
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes, you can cancel your subscription at any time without any cancellation fees.",
    },
    {
      question: "What happens if payment fails?",
      answer:
        "We'll notify you and give you a 7-day grace period to update your payment method before service interruption.",
    },
    {
      question: "How do I upgrade or downgrade?",
      answer:
        "You can change your plan anytime from your account settings. Changes take effect immediately.",
    },
    {
      question: "Are there any hidden charges?",
      answer:
        "No, the price you see is what you pay. No setup fees, no hidden charges.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Absolutely — enterprise-grade security with encryption + DPDP compliance.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Head>
        <title>Pricing | Vaiket</title>
      </Head>

      {/* Hero + Toggle */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose the Plan That Grows Your Business
          </h1>

          <div className="inline-flex bg-gray-800 p-1 rounded-lg mb-16">
            <button
              className={`px-6 py-2 rounded-md ${
                billingCycle === "monthly"
                  ? "bg-indigo-600"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-md flex items-center ${
                billingCycle === "yearly"
                  ? "bg-indigo-600"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
              <span className="ml-2 bg-green-500 text-green-900 text-xs font-bold px-2 py-1 rounded-full">
                Save up to {savings.growth}%
              </span>
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(plans).map(([key, plan]) => {
              const typedKey = key as PlanKey;
              return (
                <div
                  key={key}
                  className={`rounded-2xl p-8 transition-all ${
                    plan.popular
                      ? "bg-gray-800 border-2 border-indigo-500 shadow-lg"
                      : "bg-gray-800/50 border border-gray-700"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      ₹
                      {billingCycle === "monthly"
                        ? plan.monthlyPrice
                        : plan.yearlyPrice}
                    </span>
                    <span className="text-gray-400">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>

                    {billingCycle === "yearly" && (
                      <div className="mt-2 text-green-400 text-sm">
                        Save {savings[typedKey]}% vs monthly
                      </div>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg font-medium mb-8 ${
                      plan.popular
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    Get Started
                  </button>

                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-800/30 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
