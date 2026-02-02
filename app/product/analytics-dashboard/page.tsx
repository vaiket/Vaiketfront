"use client";

import { BarChart3, Users, MailCheck, TrendingUp, PieChart, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AnalyticsDashboardPage() {
  const features = [
    {
      icon: BarChart3,
      title: "Real-time Email Analytics",
      description: "Track every open, click, bounce & conversion instantly",
    },
    {
      icon: TrendingUp,
      title: "Lead & Sales Performance",
      description: "See which campaigns deliver the highest ROI",
    },
    {
      icon: Users,
      title: "Customer Engagement Insights",
      description: "Measure which segments are most active",
    },
    {
      icon: Activity,
      title: "Reply Speed Tracking",
      description: "Track how fast your business replies — automated or manual",
    },
    {
      icon: MailCheck,
      title: "Inbox Health Score",
      description: "Detect spam issues & improve deliverability",
    },
    {
      icon: PieChart,
      title: "AI Reports & Predictions",
      description: "Smart insights to help increase conversions",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      
      {/* HERO */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Analytics Dashboard</h1>
        <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
          Make smarter decisions with clear, real-time business intelligence —
          powered by AI.
        </p>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((item, index) => (
          <div key={index} className="p-6 rounded-2xl border hover:shadow-xl transition bg-white">
            <item.icon className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </section>

      {/* LIVE PREVIEW MOCKUP */}
      <section className="py-16 bg-gray-50 border-t">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Visual Intelligence — At a glance</h2>
          <p className="text-gray-600 mb-10">
            Your inbox becomes a revenue & performance engine.
          </p>

          <div className="rounded-3xl border shadow-lg bg-white p-3">
            <div className="bg-gray-200 h-64 rounded-2xl flex items-center justify-center text-gray-500">
              📊 Dashboard Preview (Coming Soon)
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h3 className="text-3xl font-bold text-gray-900">
          Turn your emails into revenue insights
        </h3>
        <p className="mt-3 text-gray-600">
          Stop guessing. Start optimizing with data that matters.
        </p>

        <div className="mt-8">
          <Link
            href="/pricing"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
          >
            View Plans
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

    </main>
  );
}
