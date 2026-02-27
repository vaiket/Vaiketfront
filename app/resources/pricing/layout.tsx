import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Pricing - Vaiket";
const description =
  "Compare Vaiket plans for AI email automation, lead management, and business communication workflows.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/resources/pricing",
  },
  openGraph: {
    type: "website",
    url: "/resources/pricing",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return children;
}
