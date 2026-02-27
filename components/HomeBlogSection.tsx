import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

const featuredPosts = [
  {
    slug: "why-every-business-needs-custom-email",
    title: "Why Every Business Needs a Custom Email",
    excerpt:
      "Build trust quickly with a branded email identity that improves replies and conversions.",
    category: "Business Growth",
    readTime: "5 min read",
    date: "Mar 15, 2024",
    image: "/01.jpg",
  },
  {
    slug: "how-ai-can-increase-sales-from-email",
    title: "How AI Can Increase Sales from Email",
    excerpt:
      "Use AI-assisted replies and follow-ups to close leads faster without increasing team load.",
    category: "AI Automation",
    readTime: "6 min read",
    date: "Mar 10, 2024",
    image: "/05.jpg",
  },
  {
    slug: "stop-losing-leads-because-of-late-replies",
    title: "Stop Losing Leads Because of Late Replies",
    excerpt:
      "Set response workflows that keep your pipeline active and prevent lead drop-off.",
    category: "Lead Generation",
    readTime: "4 min read",
    date: "Mar 08, 2024",
    image: "/logo.png",
  },
];

const quickCategories = [
  "Email Setup",
  "AI Automation",
  "Lead Generation",
  "Customer Support",
  "Case Studies",
];

export default function HomeBlogSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_42%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.2),_transparent_38%)]" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Resources
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Latest from Vaiket Blog
            </h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Startup automation, AI email systems, and growth playbooks in
              one clean resource hub.
            </p>
          </div>

          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-2 self-start rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
          {quickCategories.map((category) => (
            <Link
              key={category}
              href="/resources/blog"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
            >
              <Tag className="h-3.5 w-3.5" />
              {category}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-[0_1px_0_0_rgba(148,163,184,0.08)] backdrop-blur transition hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_18px_60px_-20px_rgba(34,211,238,0.45)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/35 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-slate-950">
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{post.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">
                  {post.excerpt}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
                  <div className="flex flex-col gap-1 text-xs text-slate-400 sm:flex-row sm:items-center sm:gap-3">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link
                    href={`/resources/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:mt-10 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm text-slate-300">
            Weekly practical content for founders and teams. No theory, only
            workflows that improve replies, conversions, and support speed.
          </p>
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/60 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/10"
          >
            Explore blog library
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
