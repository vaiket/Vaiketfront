import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Book a Demo - Vaiket";
const description =
  "Book a Vaiket demo to see how AI automation can improve your lead response and communication workflows.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/resources/demo-booking",
  },
  openGraph: {
    type: "website",
    url: "/resources/demo-booking",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function DemoBookingLayout({ children }: { children: ReactNode }) {
  return children;
}
