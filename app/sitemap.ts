import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { getSeoSiteUrl } from "@/lib/seo";

const siteUrl = getSeoSiteUrl();

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/get-started", changeFrequency: "weekly", priority: 0.9 },
  { path: "/resources/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/resources/pricing", changeFrequency: "weekly", priority: 0.9 },
  { path: "/resources/case-studies", changeFrequency: "weekly", priority: 0.8 },
  { path: "/resources/video-tutorials", changeFrequency: "weekly", priority: 0.8 },
  { path: "/resources/documentation", changeFrequency: "weekly", priority: 0.8 },
  { path: "/resources/demo-booking", changeFrequency: "weekly", priority: 0.8 },
  { path: "/resources/system-changelog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/company/about-us", changeFrequency: "monthly", priority: 0.7 },
  { path: "/company/contact-support", changeFrequency: "monthly", priority: 0.6 },
  { path: "/legal/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/legal/termsconditions", changeFrequency: "yearly", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${siteUrl}/resources/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}
