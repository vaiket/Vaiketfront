import { fetchAdminReferralInsights } from "@/lib/admin-referrals";
import ReferralsManager from "@/app/admin/(panel)/referrals/ReferralsManager";

export const dynamic = "force-dynamic";

export default async function AdminReferralsPage() {
  const insights = await fetchAdminReferralInsights();

  return (
    <ReferralsManager
      initialSummary={insights.summary}
      initialWithdrawals={insights.withdrawals}
      initialTopReferrers={insights.topReferrers}
      initialSignups={insights.recentSignups}
      initialEarnings={insights.recentEarnings}
    />
  );
}
