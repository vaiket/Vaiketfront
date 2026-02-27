import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Contact Support - Vaiket";
const description =
  "Get help from Vaiket support for onboarding, product setup, and technical issues.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/company/contact-support",
  },
  openGraph: {
    type: "website",
    url: "/company/contact-support",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function ContactSupportLayout({ children }: { children: ReactNode }) {
  return children;
}
