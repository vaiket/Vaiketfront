import { Suspense } from "react";
import WebsiteRequestCheckoutClient from "@/app/product/website/request/WebsiteRequestCheckoutClient";

export const dynamic = "force-dynamic";

export default function WebsiteRequestPage() {
  return (
    <Suspense fallback={<div className="px-6 py-16 text-center text-sm text-slate-500">Loading...</div>}>
      <WebsiteRequestCheckoutClient />
    </Suspense>
  );
}
