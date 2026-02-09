import { Suspense } from "react";
import RecommendedPlanClient from "./RecommendedPlanClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10">Loading…</div>}>
      <RecommendedPlanClient />
    </Suspense>
  );
}
