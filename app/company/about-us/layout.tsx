import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "About Us - Vaiket";
const description =
  "Learn about Vaiket, our mission, and how we help businesses grow with automation and faster customer communication.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/company/about-us",
  },
  openGraph: {
    type: "website",
    url: "/company/about-us",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
