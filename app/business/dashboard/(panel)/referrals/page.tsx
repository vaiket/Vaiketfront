import Link from "next/link";
import { requireBusinessSession } from "@/lib/business-guard";
import { supabase } from "@/lib/supabase";
import { getSiteUrl } from "@/lib/site-url";
import { createReferralCodeCandidate } from "@/lib/business-referral";
import ReferralDashboardClient, {
  type ReferralDashboardSummary,
  type ReferralEarningItem,
  type ReferralSignupItem,
  type ReferralWithdrawalItem,
} from "@/app/business/dashboard/(panel)/referrals/ReferralDashboardClient";

export const dynamic = "force-dynamic";

function toNumber(value: number | string | null | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? Number(parsed.toFixed(2)) : 0;
}

async function ensureReferralCode(userId: string, seed: string) {
  const { data: user, error: userError } = await supabase
    .from("business_users")
    .select("id, referral_code")
    .eq("id", userId)
    .single();

  if (userError || !user) {
    throw new Error("Could not load business user.");
  }

  if (user.referral_code) {
    return String(user.referral_code);
  }

  for (let index = 0; index < 40; index += 1) {
    const candidate = createReferralCodeCandidate(seed);
    const { data: existingCode } = await supabase
      .from("business_users")
      .select("id")
      .ilike("referral_code", candidate)
      .maybeSingle();

    if (existingCode) {
      continue;
    }

    const { data: updated } = await supabase
      .from("business_users")
      .update({ referral_code: candidate })
      .eq("id", userId)
      .is("referral_code", null)
      .select("referral_code")
      .maybeSingle();

    if (updated?.referral_code) {
      return String(updated.referral_code);
    }

    const { data: latest } = await supabase
      .from("business_users")
      .select("referral_code")
      .eq("id", userId)
      .maybeSingle();
    if (latest?.referral_code) {
      return String(latest.referral_code);
    }
  }

  throw new Error("Unable to generate referral code. Please retry.");
}

function getStartOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export default async function BusinessDashboardReferralPage() {
  const session = await requireBusinessSession();

  const { data: user } = await supabase
    .from("business_users")
    .select("id, full_name, referral_code")
    .eq("id", session.userId)
    .maybeSingle();

  const { data: listing } = await supabase
    .from("business_listings")
    .select("id, status, payment_status")
    .eq("user_id", session.userId)
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const isEligible = listing?.status === "approved" && listing?.payment_status === "paid";

  if (!listing) {
    return (
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Referral Wallet</h1>
        <p className="mt-1 text-sm text-slate-600">
          Add your business listing first to unlock referral benefits.
        </p>
        <Link
          href="/business/dashboard/add"
          className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Add Listing
        </Link>
      </div>
    );
  }

  if (!isEligible) {
    return (
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Referral Wallet</h1>
        <p className="mt-1 text-sm text-slate-600">
          Referral program unlocks after your listing is both paid and approved.
        </p>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-700">
            Current status: payment <span className="font-semibold">{listing.payment_status}</span>,
            approval <span className="font-semibold">{listing.status}</span>.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/business/dashboard/payment"
              className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Complete Payment
            </Link>
            <Link
              href="/business/dashboard"
              className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const referralCode = user?.referral_code || (await ensureReferralCode(session.userId, user?.full_name || session.name));
  const referralLink = `${getSiteUrl()}/business/dashboard/register?ref=${encodeURIComponent(
    referralCode
  )}`;

  const [{ data: earningsRows }, { data: withdrawalRows }, { data: referredUsersRows }] =
    await Promise.all([
      supabase
        .from("business_referral_earnings")
        .select("id, referred_user_id, commission_amount, currency, status, created_at")
        .eq("referrer_user_id", session.userId)
        .order("created_at", { ascending: false }),
      supabase
        .from("business_referral_withdrawals")
        .select("id, request_no, amount, currency, method, status, created_at, processed_at")
        .eq("user_id", session.userId)
        .order("created_at", { ascending: false }),
      supabase
        .from("business_users")
        .select("id, full_name, phone, created_at, referred_at")
        .eq("referred_by_user_id", session.userId)
        .order("created_at", { ascending: false })
        .limit(300),
    ]);

  const referredUsers = (referredUsersRows ?? []) as Array<{
    id: string;
    full_name: string;
    phone: string | null;
    created_at: string;
    referred_at: string | null;
  }>;

  let latestListingByUser = new Map<
    string,
    { city: string | null; payment_status: string | null; status: string | null }
  >();

  if (referredUsers.length > 0) {
    const userIds = referredUsers.map((item) => item.id);
    const { data: listingRows } = await supabase
      .from("business_listings")
      .select("user_id, city, payment_status, status, created_at")
      .in("user_id", userIds)
      .order("created_at", { ascending: false });

    latestListingByUser = new Map();
    for (const row of listingRows ?? []) {
      const userId = String(row.user_id ?? "");
      if (!userId || latestListingByUser.has(userId)) continue;
      latestListingByUser.set(userId, {
        city: row.city ?? null,
        payment_status: row.payment_status ?? null,
        status: row.status ?? null,
      });
    }
  }

  const signupItems: ReferralSignupItem[] = referredUsers.map((item) => {
    const listingInfo = latestListingByUser.get(item.id);
    const paymentStatus = listingInfo?.payment_status || "unpaid";
    return {
      id: item.id,
      name: item.full_name || "Business owner",
      phone: item.phone || "-",
      city: listingInfo?.city || "-",
      paymentStatus,
      listingStatus: listingInfo?.status || "not_created",
      joinedAt: item.created_at,
      referredAt: item.referred_at || item.created_at,
    };
  });

  const earnings = (earningsRows ?? []) as Array<{
    id: string;
    referred_user_id: string;
    commission_amount: number | string;
    currency: string;
    status: string;
    created_at: string;
  }>;

  const withdrawals = (withdrawalRows ?? []) as Array<{
    id: string;
    request_no: string;
    amount: number | string;
    currency: string;
    method: string;
    status: string;
    created_at: string;
    processed_at: string | null;
  }>;

  const totalEarned = Number(
    earnings
      .filter((item) => item.status === "credited")
      .reduce((sum, item) => sum + toNumber(item.commission_amount), 0)
      .toFixed(2)
  );
  const totalWithdrawn = Number(
    withdrawals
      .filter((item) => item.status === "paid")
      .reduce((sum, item) => sum + toNumber(item.amount), 0)
      .toFixed(2)
  );
  const lockedAmount = Number(
    withdrawals
      .filter((item) => item.status === "requested" || item.status === "processing")
      .reduce((sum, item) => sum + toNumber(item.amount), 0)
      .toFixed(2)
  );
  const availableBalance = Number(
    Math.max(0, totalEarned - totalWithdrawn - lockedAmount).toFixed(2)
  );
  const paidSignups = signupItems.filter((item) => item.paymentStatus === "paid").length;
  const todayStart = getStartOfToday();
  const todaySignups = signupItems.filter((item) => {
    const created = new Date(item.joinedAt);
    return !Number.isNaN(created.getTime()) && created >= todayStart;
  }).length;

  const summary: ReferralDashboardSummary = {
    totalSignups: signupItems.length,
    todaySignups,
    paidSignups,
    unpaidSignups: Math.max(0, signupItems.length - paidSignups),
    totalEarned,
    totalWithdrawn,
    lockedAmount,
    availableBalance,
  };

  const earningItems: ReferralEarningItem[] = earnings.map((item) => ({
    id: item.id,
    referredUserId: item.referred_user_id,
    amount: toNumber(item.commission_amount),
    currency: item.currency || "INR",
    status: item.status || "credited",
    createdAt: item.created_at,
  }));

  const withdrawalItems: ReferralWithdrawalItem[] = withdrawals.map((item) => ({
    id: item.id,
    requestNo: item.request_no,
    amount: toNumber(item.amount),
    currency: item.currency || "INR",
    method: item.method || "upi",
    status: item.status || "requested",
    createdAt: item.created_at,
    processedAt: item.processed_at,
  }));

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Referral Wallet</h1>
      <p className="mt-1 text-sm text-slate-600">
        Share your referral link, track signups, and request wallet withdrawals.
      </p>

      <div className="mt-5">
        <ReferralDashboardClient
          referralCode={referralCode}
          referralLink={referralLink}
          summary={summary}
          signups={signupItems}
          earnings={earningItems}
          withdrawals={withdrawalItems}
        />
      </div>
    </div>
  );
}
