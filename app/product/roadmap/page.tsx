"use client";

import { CheckCircle, Clock, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RoadmapPage() {
  const roadmap = [
    {
      quarter: "Q1 - 2025",
      items: [
        {
          title: "AI Auto Replies 2.0",
          status: "Live",
          desc: "Smarter replies that analyze sentiment & urgency.",
        },
        {
          title: "Smart Inbox Automation",
          status: "In Progress",
          desc: "Tags, folders, and priority sorting with AI.",
        },
      ],
    },
    {
      quarter: "Q2 - 2025",
      items: [
        {
          title: "WhatsApp + Instagram CRM",
          status: "Planned",
          desc: "Manage social DMs along with business emails.",
        },
        {
          title: "Lead CRM Dashboard",
          status: "Planned",
          desc: "Complete sales pipeline status inside Vaiket.",
        },
      ],
    },
    {
      quarter: "Q3 - 2025",
      items: [
        {
          title: "API Console",
          status: "Planned",
          desc: "Run API requests directly from dashboard.",
        },
        {
          title: "Workflow Builder",
          status: "Planned",
          desc: "Drag-and-drop automations for business workflows.",
        },
      ],
    },
  ];

  const getBadge = (status: string) => {
    if (status === "Live")
      return (
        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full gap-1">
          <CheckCircle className="w-3 h-3" /> Live
        </span>
      );
    if (status === "In Progress")
      return (
        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full gap-1">
          <Clock className="w-3 h-3" /> In Progress
        </span>
      );
    return (
      <span className="inline-flex items-center px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full gap-1">
        <Rocket className="w-3 h-3" /> Planned
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HERO */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Vaiket Roadmap</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">
          We're building India's most trusted AI-powered email & communication platform.
        </p>
      </section>

      {/* ROADMAP LIST */}
      <section className="max-w-5xl mx-auto px-6 py-20 space-y-16">
        {roadmap.map((block, i) => (
          <div key={i}>
            <h2 className="text-2xl font-bold mb-6">{block.quarter}</h2>
            <div className="space-y-6">
              {block.items.map((item, j) => (
                <div
                  key={j}
                  className="border rounded-xl p-6 hover:shadow-xl transition bg-white"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    {getBadge(item.status)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-100 text-center">
        <h3 className="text-3xl font-bold">Want to Request a Feature?</h3>
        <p className="text-gray-600 mt-3">
          Help us shape what we build next for India’s business growth.
        </p>

        <Link
          href="/resources/contact-support"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow"
        >
          Request Feature
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </main>
  );
}
