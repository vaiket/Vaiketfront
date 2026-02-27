import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Case Studies - Vaiket";
const description =
  "See real case studies of businesses improving response speed, lead conversion, and revenue with Vaiket.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/resources/case-studies",
  },
  openGraph: {
    type: "website",
    url: "/resources/case-studies",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function CaseStudiesLayout({ children }: { children: ReactNode }) {
  return children;
}
