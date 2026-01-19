"use client";
import { useState } from "react";
import Head from "next/head";
import {
  Search,
  Mail,
  Settings,
  Zap,
  CreditCard,
  Shield,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Clock,
  MessageCircle,
} from "lucide-react";

export default function DocumentationPortal() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // implement search
    }
  };

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Mail className="w-6 h-6" />,
      description:
        "Create your business email, connect your domain & launch quickly.",
      color: "bg-purple-50 border-purple-200 text-purple-700",
      links: [
        "What is Vaiket?",
        "Create your first business email",
        "Setup wizard: Quick Start",
        "Dashboard overview",
        "Team member roles & permissions",
      ],
    },
    {
      id: "email-setup",
      title: "Email Setup & Delivery",
      icon: <Settings className="w-6 h-6" />,
      description:
        "Configure IMAP/SMTP + DNS for fast and reliable email delivery",
      color: "bg-blue-50 border-blue-200 text-blue-700",
      links: [
        "Domain verification",
        "MX records setup (step-by-step)",
        "SPF, DKIM & DMARC configuration",
        "Add email to: Gmail, iPhone Mail, Outlook",
        "Troubleshooting delivery issues",
      ],
    },
    {
      id: "ai-automation",
      title: "Smart AI Automation",
      icon: <Zap className="w-6 h-6" />,
      description:
        "Automate replies, follow-ups & lead tracking without effort",
      color: "bg-yellow-50 border-yellow-200 text-yellow-700",
      links: [
        "Enable AI auto-reply",
        "Create follow-up workflow",
        "Lead capture from inbox",
        "Smart priority sorting",
        "Tagging & customer profiles",
      ],
    },
    {
      id: "billing",
      title: "Billing & Subscription",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Plans, renewals, invoices, payment methods",
      color: "bg-green-50 border-green-200 text-green-700",
      links: [
        "View/change plan",
        "Cancel subscription",
        "Download invoices",
        "Update payment method",
        "Payment failed? What to do",
      ],
    },
    {
      id: "security",
      title: "Security & Data Protection",
      icon: <Shield className="w-6 h-6" />,
      description:
        "Best-in-class protection for business email & customer data",
      color: "bg-indigo-50 border-indigo-200 text-indigo-700",
      links: [
        "DPDP compliance overview",
        "TLS & encryption standards",
        "Two-Factor Authentication",
        "Password policy",
        "Backup & retention",
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting & Support",
      icon: <HelpCircle className="w-6 h-6" />,
      description: "Quick fixes for common issues",
      color: "bg-red-50 border-red-200 text-red-700",
      links: [
        "Can send but not receive?",
        "Domain not verifying?",
        "Emails going to spam?",
        "AI reply not working?",
        "Contact Support team",
      ],
    },
  ];

  const shortcuts = [
    "IMAP Setup",
    "SPF/DKIM",
    "AI Auto-Reply",
    "Billing Issue",
    "Lead Capture",
    "Email Not Delivering",
  ];

  const futureSections = [
    {
      title: "Developer API",
      description: "Comprehensive API documentation for developers",
      status: "Available",
    },
    {
      title: "Features Coming Soon",
      description: "Preview of upcoming features and improvements",
      status: "In Development",
    },
    {
      title: "Integrations",
      description: "Connect Vaiket with your favorite tools",
      status: "Coming Soon",
    },
    {
      title: "WhatsApp CRM",
      description: "Seamless WhatsApp integration",
      status: "Coming Soon",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Vaiket Documentation Portal</title>
      </Head>

      {/* Search */}
      <main className="container mx-auto px-4 py-8">
        <section className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How can we help you today?
          </h1>

          <form onSubmit={handleSearch} className="relative mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, setup, or FAQs…"
              className="w-full px-6 py-4 border rounded-2xl text-lg focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-3">
            {shortcuts.map((s, i) => (
              <button
                key={i}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm"
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Documentation Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  className="border rounded-xl p-6 shadow-sm bg-white hover:shadow-md cursor-pointer"
                  onClick={() =>
                    setActiveCategory(isActive ? null : cat.id)
                  }
                >
                  <div className="flex items-start mb-4">
                    <div className={`p-3 rounded-lg mr-4 ${cat.color}`}>
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{cat.title}</h3>
                      <p className="text-sm text-gray-600">{cat.description}</p>
                    </div>
                  </div>

                  {isActive ? (
                    <ul className="mt-4 space-y-2 border-t pt-4">
                      {cat.links.map((link, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-700 hover:text-purple-600"
                        >
                          <ChevronRight className="w-4 h-4 mr-2 text-purple-500" />
                          <a href="#">{link}</a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex justify-between text-sm text-gray-500 mt-4">
                      <span>{cat.links.length} articles</span>
                      <span className="text-purple-600 font-medium">
                        View all
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
