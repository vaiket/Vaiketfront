'use client'
// pages/blog/index.js
import { useState } from 'react';
import Head from 'next/head';
import { Search, ArrowRight, Calendar, User, Tag, Clock, Send } from 'lucide-react';

export default function BlogHomepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'email-marketing', name: 'Email Marketing & Growth' },
    { id: 'ai-support', name: 'AI Customer Support' },
    { id: 'lead-generation', name: 'Lead Generation' },
    { id: 'automation-tips', name: 'Business Automation Tips' },
    { id: 'product-updates', name: 'Product Updates' },
    { id: 'case-studies', name: 'Case Studies' }
  ];

  const popularTags = [
    'AI Automation', 'Business Growth', 'Email Setup', 'DPDP & Security', 
    'Startup India', 'Email Marketing', 'Lead Capture', 'Customer Support'
  ];

  // Featured posts (your 8 launch articles)
  const featuredPosts = [
    {
      id: 1,
      title: "Why Every Business Needs a Custom Email",
      excerpt: "Discover how a professional email address can transform your business credibility and customer trust overnight.",
      category: "Business Growth",
      readTime: "5 min read",
      date: "2024-03-15",
      author: "Vaiket Team",
      image: "/blog/custom-email-benefits.jpg",
      featured: true
    },
    {
      id: 2,
      title: "How AI Can Increase Sales from Email",
      excerpt: "Learn how artificial intelligence is revolutionizing email communication and driving unprecedented sales growth.",
      category: "AI Automation",
      readTime: "6 min read",
      date: "2024-03-10",
      author: "Vaiket Team",
      image: "/blog/ai-sales-email.jpg",
      featured: true
    }
  ];

  // Latest articles (remaining 6 from your launch articles)
  const latestArticles = [
    {
      id: 3,
      title: "Stop Losing Leads Because of Late Replies",
      excerpt: "Automated response systems that ensure you never miss a potential customer again.",
      category: "Lead Generation",
      readTime: "4 min read",
      date: "2024-03-08",
      author: "Vaiket Team",
      image: "/blog/late-replies-leads.jpg"
    },
    {
      id: 4,
      title: "How to Setup Business Email Without IT Team",
      excerpt: "Step-by-step guide for non-technical business owners to set up professional email in minutes.",
      category: "Email Setup",
      readTime: "7 min read",
      date: "2024-03-05",
      author: "Vaiket Team",
      image: "/blog/email-setup-guide.jpg"
    },
    {
      id: 5,
      title: "Why Spam Happens & How to Prevent It",
      excerpt: "Understanding email authentication protocols and best practices to ensure inbox delivery.",
      category: "Email Setup",
      readTime: "8 min read",
      date: "2024-03-01",
      author: "Vaiket Team",
      image: "/blog/spam-prevention.jpg"
    },
    {
      id: 6,
      title: "Simple Email Automation Workflows",
      excerpt: "Beginner-friendly automation strategies that save time and boost customer engagement.",
      category: "AI Automation",
      readTime: "5 min read",
      date: "2024-02-28",
      author: "Vaiket Team",
      image: "/blog/automation-workflows.jpg"
    },
    {
      id: 7,
      title: "Smart Inbox: Organize & Prioritize Customers",
      excerpt: "How AI-powered inbox management helps you focus on what matters most - your customers.",
      category: "AI Customer Support",
      readTime: "6 min read",
      date: "2024-02-25",
      author: "Vaiket Team",
      image: "/blog/smart-inbox.jpg"
    },
    {
      id: 8,
      title: "Vaiket — Built for India's Business Growth",
      excerpt: "How we're solving unique communication challenges faced by Indian businesses.",
      category: "Product Updates",
      readTime: "4 min read",
      date: "2024-02-20",
      author: "Vaiket Team",
      image: "/blog/india-growth.jpg"
    }
  ];

  // Future articles structure
  const futureArticleIdeas = {
    'Email Automation': [
      "What is AI Email Automation? How Does It Work?",
      "10 Email Replies You Should Automate Today",
      "Smart Inbox: Stop Losing Customers from Missed Emails"
    ],
    'Lead Generation': [
      "How Email Can Help Local Businesses Get More Leads",
      "How to Capture Leads Directly from Inbox Automatically",
      "Boost Sales: Auto-Followups vs Manual Followups"
    ],
    'Setup & Delivery': [
      "Why SPF, DKIM, DMARC Matter for Business Email",
      "How to Fix Emails Going to Spam in Gmail",
      "Business Email Setup Guide for 2025 (India Edition)"
    ],
    'Business Growth': [
      "How Customer Response Time Impacts Sales",
      "Why Every Business Must Have Custom Email ID",
      "WhatsApp vs Email: What works for B2B in India?"
    ]
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (searchQuery.trim()) {
    // Implement search functionality
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Vaiket Blog - AI Communication & Email Automation Insights</title>
        <meta name="description" content="Learn how to scale your business with AI communication, automation, and email strategies. Expert tips for Indian businesses." />
      </Head>

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Vaiket Blog</h1>
                <p className="text-sm text-gray-600">AI Communication & Business Growth</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-purple-600 font-medium">Home</a>
              <a href="/blog" className="text-purple-600 font-medium border-b-2 border-purple-600 pb-1">Blog</a>
              <a href="/docs" className="text-gray-600 hover:text-purple-600 font-medium">Documentation</a>
              <a href="/pricing" className="text-gray-600 hover:text-purple-600 font-medium">Pricing</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Insights to scale your business with{' '}
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              AI communication, automation & email strategies
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Expert guides, case studies, and automation tips for Indian businesses to grow faster with smart email solutions.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, automation tips, guides…"
                className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
              />
            </div>
          </form>
        </section>

        {/* Category Navigation */}
        <section className="mb-12">
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-6 py-3 rounded-full font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-r from-purple-500 to-cyan-500"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">{post.category}</span>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                    </div>
                    <a href={`/blog/${post.id}`} className="text-purple-600 font-medium flex items-center hover:text-purple-700">
                      Read more <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Latest Articles Grid */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            <a href="#" className="text-purple-600 font-medium flex items-center hover:text-purple-700">
              View all articles <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-40 bg-gradient-to-r from-blue-500 to-green-500"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">{article.category}</span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{new Date(article.date).toLocaleDateString('en-IN')}</span>
                    <a href={`/blog/${article.id}`} className="text-purple-600 font-medium flex items-center">
                      Read <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl p-8 mb-16 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <Send className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Get Weekly Automation Tips</h2>
            <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
              Join 2,500+ Indian business owners who receive exclusive AI email strategies every Tuesday.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
              <button
                type="submit"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-purple-200 text-sm mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </section>

        {/* Popular Tags */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Topics</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {popularTags.map((tag, index) => (
              <a
                key={index}
                href="#"
                className="bg-white border border-gray-200 px-4 py-2 rounded-full hover:border-purple-300 hover:text-purple-600 transition-colors"
              >
                <Tag className="w-4 h-4 inline mr-2" />
                {tag}
              </a>
            ))}
          </div>
        </section>

        {/* Upcoming Topics Preview */}
        <section className="bg-white rounded-2xl p-8 mb-16 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What's Coming Next</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(futureArticleIdeas).map(([category, articles]) => (
              <div key={category}>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  {category}
                </h3>
                <ul className="space-y-3">
                  {articles.map((article, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <ArrowRight className="w-4 h-4 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                      {article}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer CTA */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Want help automating your business?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of Indian businesses already using Vaiket to supercharge their email communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
              >
                Try Vaiket Free Today 🚀
              </a>
              <a
                href="/demo"
                className="border border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                Book a Demo
              </a>
            </div>
            <p className="text-gray-400 mt-6">Start your 14-day free trial. No credit card required.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}