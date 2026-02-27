"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/ui/header-3";
import HomeAnnouncementBar from "@/components/HomeAnnouncementBar";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/FloatingWhatsappButton";
import NoupeChatbot from "@/components/NoupeChatbot";
import { RESERVED_BUSINESS_USERNAMES } from "@/lib/business-identity";

type Props = {
  children: ReactNode;
};

export default function AppFrame({ children }: Props) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isHomeRoute = pathname === "/";
  const segments = pathname?.split("/").filter(Boolean) ?? [];
  const firstSegment = segments[0]?.toLowerCase() ?? "";
  const isPublicBusinessUsernameRoute =
    segments.length === 1 &&
    firstSegment.length > 0 &&
    !RESERVED_BUSINESS_USERNAMES.includes(
      firstSegment as (typeof RESERVED_BUSINESS_USERNAMES)[number]
    );

  if (isAdminRoute || isPublicBusinessUsernameRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {isHomeRoute ? <HomeAnnouncementBar /> : null}
      <Header />
      <main className="flex-1 w-full overflow-x-hidden">{children}</main>
      <FloatingWhatsappButton />
      <NoupeChatbot />
      <Footer />
    </>
  );
}
