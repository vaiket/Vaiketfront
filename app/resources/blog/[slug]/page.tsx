import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog-posts";
import { toAbsoluteUrl } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function toIsoDate(value: string) {
  return new Date(`${value}T00:00:00.000Z`).toISOString();
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found | Vaiket",
      description: "The requested blog article was not found.",
      alternates: {
        canonical: "/resources/blog",
      },
    };
  }

  const articlePath = `/resources/blog/${post.slug}`;

  return {
    title: `${post.title} | Vaiket Blog`,
    description: post.excerpt,
    alternates: {
      canonical: articlePath,
    },
    openGraph: {
      type: "article",
      url: articlePath,
      title: post.title,
      description: post.excerpt,
      publishedTime: toIsoDate(post.publishedAt),
      modifiedTime: toIsoDate(post.publishedAt),
      section: post.category,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleUrl = toAbsoluteUrl(`/resources/blog/${post.slug}`);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: toIsoDate(post.publishedAt),
    dateModified: toIsoDate(post.publishedAt),
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Vaiket",
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteUrl("/logo/vaiket-premium.svg"),
      },
    },
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Resources",
        item: toAbsoluteUrl("/resources/blog"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: articleUrl,
      },
    ],
  };

  const otherPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />

      <section className={`bg-gradient-to-br px-4 py-14 text-white md:px-6 ${post.coverClassName}`}>
        <div className="mx-auto w-full max-w-4xl">
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <p className="mt-4 inline-flex rounded-full border border-white/35 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {post.category}
          </p>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl md:leading-[1.05]">
            {post.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/90 md:text-base">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6">
        <article className="mx-auto w-full max-w-3xl">
          <div className="space-y-10">
            {post.content.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold text-slate-900">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-slate-700 md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((item) => (
                      <li key={item} className="text-sm leading-7 text-slate-700 md:text-base">
                        - {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 px-4 py-12 md:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-900">More from Vaiket Blog</h2>
            <Link
              href="/resources/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 transition hover:text-cyan-600"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {otherPosts.map((item) => (
              <article key={item.slug} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="inline-flex rounded-full border border-slate-300 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                  {item.category}
                </p>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.excerpt}</p>
                <Link
                  href={`/resources/blog/${item.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-700 transition hover:text-cyan-600"
                >
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
