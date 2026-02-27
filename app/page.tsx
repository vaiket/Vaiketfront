import type { Metadata } from "next";
import Hero from "../components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProblemSolution from "@/components/ProblemSolution";
import Services from "@/components/Services";
import Features from "../components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTA from "../components/CTA";
import HomeBlogSection from "@/components/HomeBlogSection";
import { toAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Vaiket - AI Email, WhatsApp and Lead Automation Platform",
  description:
    "Vaiket helps Indian businesses automate email, WhatsApp and lead follow-up workflows to improve response speed and conversions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Vaiket - AI Email, WhatsApp and Lead Automation Platform",
    description:
      "Automate communication workflows and convert more leads with Vaiket's AI-powered platform.",
    siteName: "Vaiket",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaiket - AI Email, WhatsApp and Lead Automation Platform",
    description:
      "Automate communication workflows and convert more leads with Vaiket's AI-powered platform.",
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vaiket",
    url: toAbsoluteUrl("/"),
    logo: toAbsoluteUrl("/logo/vaiket-premium.svg"),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@vaiket.com",
        telephone: "+91-70046-14077",
        availableLanguage: ["en", "hi"],
        areaServed: "IN",
      },
    ],
    sameAs: [
      "https://facebook.com/vaiket",
      "https://instagram.com/vaiket",
      "https://linkedin.com/company/vaiket",
      "https://youtube.com/vaiket",
      "https://twitter.com/vaiket",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vaiket",
    url: toAbsoluteUrl("/"),
    inLanguage: "en-IN",
  };

  const siteLinksSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Get Started", url: toAbsoluteUrl("/get-started") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pricing",
        url: toAbsoluteUrl("/resources/pricing"),
      },
      { "@type": "ListItem", position: 3, name: "Blog", url: toAbsoluteUrl("/resources/blog") },
      {
        "@type": "ListItem",
        position: 4,
        name: "Case Studies",
        url: toAbsoluteUrl("/resources/case-studies"),
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "About Us",
        url: toAbsoluteUrl("/company/about-us"),
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Contact Support",
        url: toAbsoluteUrl("/company/contact-support"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema, siteLinksSchema]),
        }}
      />
      <Hero />
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "760px" }}>
        <TrustStrip />
      </div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "860px" }}>
        <ProblemSolution />
      </div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}>
        <Services />
      </div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "820px" }}>
        <Features />
      </div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "820px" }}>
        <HowItWorks />
      </div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "980px" }}>
        <HomeBlogSection />
      </div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "460px" }}>
        <CTA />
      </div>
    </>
  );
}
