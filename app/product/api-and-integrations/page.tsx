"use client";

import {
  PlugZap,
  Link2,
  Mail,
  Globe,
  Webhook,
  ArrowRight,
  Server,
  Laptop,
} from "lucide-react";
import Link from "next/link";

export default function ApiIntegrationsPage() {
  const integrations = [
    {
      icon: PlugZap,
      name: "REST API",
      desc: "Access and control all business email features via secure API.",
    },
    {
      icon: Mail,
      name: "Email Routing API",
      desc: "Send, receive & track emails programmatically with automation.",
    },
    {
      icon: Globe,
      name: "Domain Management API",
      desc: "Connect domains & manage DNS validations with API requests.",
    },
    {
      icon: Webhook,
      name: "Webhook Triggers",
      desc: "Instant updates for lead capture, auto replies, ticketing & more.",
    },
    {
      icon: Link2,
      name: "Zapier + Make.com",
      desc: "2000+ supported no-code automation workflows.",
    },
    {
      icon: Laptop,
      name: "CRM Integrations",
      desc: "Sync data with HubSpot, Zoho, Salesforce and more.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HERO SECTION */}
      <section className="py-24 bg-gradient-to-r from-indigo-700 to-blue-600 text-white text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          API & Integrations
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg opacity-90">
          Connect Vaiket with your existing tools. Build automation without limits.
        </p>

        <Link
          href="/docs"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100"
        >
          View API Docs
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* INTEGRATION CARDS */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {integrations.map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white border hover:shadow-xl transition"
          >
            <item.icon className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* CONNECT ANYTHING SECTION */}
      <section className="py-24 bg-gray-50 border-t text-center px-6">
        <h2 className="text-3xl font-bold">Designed for Developers & Teams</h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Powerful events & secure endpoints give you complete automation
          flexibility for all workflows.
        </p>

        <div className="rounded-3xl border bg-white shadow-md p-4 mt-10 max-w-4xl mx-auto">
          <div className="bg-gray-200 h-60 rounded-xl flex items-center justify-center text-gray-600">
            🔌 API Console Preview (Coming Soon)
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h3 className="text-3xl font-bold">
          Integrate. Automate. Grow Faster.
        </h3>
        <p className="mt-3 text-gray-600">
          Build workflows that convert emails into business growth.
        </p>

        <Link
          href="/pricing"
          className="inline-flex items-center px-8 py-4 mt-8 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
        >
          See Pricing Plans
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </section>
    </main>
  );
}
