import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { toAbsoluteUrl } from "@/lib/seo";

const BLOG_TITLE = "Business Growth and Automation Blog";
const BLOG_DESCRIPTION =
  "Read the latest Vaiket insights on business growth, AI automation, and lead conversion.";

export const metadata: Metadata = {
  title: `${BLOG_TITLE} | Vaiket`,
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: "/resources/blog",
  },
  openGraph: {
    type: "website",
    url: "/resources/blog",
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  },
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Vaiket Blog Posts",
    itemListElement: BLOG_POSTS.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.title,
      url: toAbsoluteUrl(`/resources/blog/${post.slug}`),
    })),
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 px-4 py-14 text-white md:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <p className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
            Vaiket Resources
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl md:leading-[1.05]">
            {BLOG_TITLE}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
            Explore practical articles focused on trust, faster response systems, and automation
            workflows that help businesses convert more enquiries.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6">
        <div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className={`bg-gradient-to-br px-5 py-8 text-white ${post.coverClassName}`}>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/85">
                  {post.coverLabel}
                </p>
                <h2 className="mt-2 text-lg font-bold leading-snug">{post.title}</h2>
              </div>

              <div className="p-5">
                <p className="inline-flex rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                  {post.category}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <Link
                  href={`/resources/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-cyan-700 transition hover:text-cyan-600"
                >
                  View More
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
