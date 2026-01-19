"use client";

import { Sparkles, Mail, Bot, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TemplateLibraryPage() {
  const templates = [
    {
      id: 1,
      title: "New Lead Auto Reply",
      category: "Sales",
      desc: "Boost sales speed & trust with instant replies.",
      icon: Mail,
      status: "Ready"
    },
    {
      id: 2,
      title: "Support Ticket Acknowledgement",
      category: "Support",
      desc: "Ensure customers feel valued from the first reply.",
      icon: ShieldCheck,
      status: "Ready"
    },
    {
      id: 3,
      title: "AI Follow Up – Auto Close Deals",
      category: "Automation",
      desc: "Never forget follow-ups. Auto smart reminders.",
      icon: Clock,
      status: "Coming soon"
    },
    {
      id: 4,
      title: "AI Smart Responses",
      category: "AI",
      desc: "AI writes replies in your business tone.",
      icon: Bot,
      status: "Coming soon"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Template Library</h1>
        <p className="mt-4 text-lg opacity-90">
          Copy & activate — automation in 30 seconds.
        </p>
      </section>

      {/* Template Cards */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((item) => (
          <div
            key={item.id}
            className="p-6 border rounded-2xl hover:shadow-lg transition"
          >
            <item.icon className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.category}</p>
            <p className="mt-3 text-gray-600">{item.desc}</p>

            <div className="mt-6">
              {item.status === "Ready" ? (
                <button className="text-blue-600 font-medium inline-flex items-center hover:underline">
                  Use Template <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              ) : (
                <span className="text-yellow-600 font-medium text-sm">
                  Coming Soon ⏳
                </span>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-blue-50 py-14 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Launch automation faster with Vaiket
        </h2>
        <p className="text-gray-600 mt-2">
          Increase productivity & close more revenue — automatically.
        </p>

        <Link
          href="/pricing"
          className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-medium mt-6 hover:bg-blue-700"
        >
          Get Started <Sparkles className="w-5 h-5 ml-2" />
        </Link>
      </section>
    </main>
  );
}
