export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  coverClassName: string;
  coverLabel: string;
  content: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-every-business-needs-custom-email",
    title: "Why Every Business Needs a Custom Email",
    excerpt:
      "A branded email creates instant trust, improves deliverability, and helps customers take your business seriously from the first interaction.",
    category: "Business Growth",
    author: "Vaiket Team",
    publishedAt: "2026-02-05",
    readTime: "5 min read",
    coverClassName: "from-cyan-500 to-blue-700",
    coverLabel: "Trust and Branding",
    content: [
      {
        heading: "First impression decides conversion",
        paragraphs: [
          "When customers receive messages from free email addresses, trust drops. A domain email like hello@yourbusiness.com signals that your business is active, structured, and reliable.",
          "This one change directly impacts reply rates, especially for first-time leads who are comparing multiple providers.",
        ],
      },
      {
        heading: "Custom email helps inbox placement",
        paragraphs: [
          "Mail providers use domain reputation for filtering. With proper setup, branded domains perform better than random free addresses.",
          "A healthy sender reputation means fewer messages in spam and more responses from real buyers.",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "Set up one official inbox for sales and another for support. Keep response times low and use templates for common questions.",
        ],
        bullets: [
          "Use one domain for all customer communication.",
          "Set up SPF, DKIM, and DMARC from day one.",
          "Track reply time and missed enquiries weekly.",
        ],
      },
    ],
  },
  {
    slug: "how-ai-can-increase-sales-from-email",
    title: "How AI Can Increase Sales from Email",
    excerpt:
      "AI helps businesses respond faster, qualify leads better, and follow up consistently so more conversations turn into paying customers.",
    category: "AI Automation",
    author: "Vaiket Team",
    publishedAt: "2026-01-24",
    readTime: "6 min read",
    coverClassName: "from-emerald-500 to-teal-700",
    coverLabel: "AI Sales Workflows",
    content: [
      {
        heading: "Speed wins deals",
        paragraphs: [
          "Most leads go cold because replies are delayed. AI-powered routing and drafted replies reduce first-response time from hours to minutes.",
          "Fast response creates momentum and keeps intent high while the prospect is still ready to buy.",
        ],
      },
      {
        heading: "Consistency beats manual follow-up",
        paragraphs: [
          "Sales teams often miss reminders. AI can trigger timely follow-ups based on no-reply windows, message intent, and lifecycle stage.",
          "This keeps every lead moving without overloading your team.",
        ],
        bullets: [
          "Auto-tag hot, warm, and cold leads by intent.",
          "Trigger follow-up after 24h, 72h, and 7 days.",
          "Escalate high-intent leads to human instantly.",
        ],
      },
      {
        heading: "Human + AI is the best model",
        paragraphs: [
          "AI should handle repetitive communication, while humans focus on objections, negotiation, and closing.",
          "With this model, teams increase throughput without losing quality in critical conversations.",
        ],
      },
    ],
  },
  {
    slug: "stop-losing-leads-because-of-late-replies",
    title: "Stop Losing Leads Because of Late Replies",
    excerpt:
      "Late replies are one of the biggest hidden revenue leaks. A simple response workflow can recover lost enquiries and increase monthly closures.",
    category: "Lead Generation",
    author: "Vaiket Team",
    publishedAt: "2026-01-10",
    readTime: "4 min read",
    coverClassName: "from-violet-500 to-indigo-700",
    coverLabel: "Lead Conversion",
    content: [
      {
        heading: "The hidden cost of delay",
        paragraphs: [
          "If your average reply takes more than 30 minutes, many prospects will move to the next provider. The lead did not fail, the process did.",
          "Reply speed is now a conversion metric, not only a support metric.",
        ],
      },
      {
        heading: "Build a simple lead response system",
        paragraphs: [
          "Start with one inbox, one owner, and one SLA. Every new enquiry should get instant acknowledgment and a clear next step.",
        ],
        bullets: [
          "Auto-reply in under 60 seconds.",
          "Assign lead owner automatically.",
          "Send second message within 10 minutes.",
          "Track unanswered leads every evening.",
        ],
      },
      {
        heading: "Measure what matters",
        paragraphs: [
          "Track response time, follow-up completion, and conversion by source. These numbers show exactly where your funnel breaks.",
          "Once you automate reminders and ownership, conversion rate improves without increasing ad spend.",
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

