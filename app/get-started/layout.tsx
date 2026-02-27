import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Get Started - Vaiket";
const description =
  "Start with Vaiket to set up AI-powered communication automation for your business.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/get-started",
  },
  openGraph: {
    type: "website",
    url: "/get-started",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function GetStartedLayout({ children }: { children: ReactNode }) {
  return children;
}
