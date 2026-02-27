import { supabase } from "@/lib/supabase";

export type AdminReferralSummary = {
  totalReferralSignups: number;
  paidReferralConversions: number;
  unpaidReferralSignups: number;
  totalCommissionCredited: number;
  totalWithdrawn: number;
  pendingWithdrawalCount: number;
  pendingWithdrawalAmount: number;
};

export type AdminReferralWithdrawal = {
  id: string;
  request_no: string;
  user_id: string;
  user_name: string | null;
  user_email: string | null;
  user_phone: string | null;
  user_referral_code: string | null;
  amount: number;
  currency: string;
  method: string;
  status: string;
  admin_note: string | null;
  created_at: string | null;
  processed_at: string | null;
  updated_at: string | null;
};

export type AdminTopReferrer = {
  user_id: string;
  user_name: string | null;
  user_email: string | null;
  user_phone: string | null;
  referral_code: string | null;
  total_signups: number;
  paid_signups: number;
  total_earned: number;
};

export type AdminReferralSignup = {
  user_id: string;
  user_name: string | null;
  user_email: string | null;
  user_phone: string | null;
  city: string | null;
  payment_status: string | null;
  listing_status: string | null;
  referred_by_user_id: string;
  referred_by_name: string | null;
  referred_by_code: string | null;
  created_at: string | null;
};

export type AdminReferralEarning = {
  id: string;
  referrer_user_id: string;
  referrer_name: string | null;
  referred_user_id: string;
  referred_user_name: string | null;
  referred_order_no: string | null;
  commission_amount: number;
  currency: string;
  status: string;
  created_at: string | null;
};

export type AdminReferralInsights = {
  summary: AdminReferralSummary;
  withdrawals: AdminReferralWithdrawal[];
  topReferrers: AdminTopReferrer[];
  recentSignups: AdminReferralSignup[];
  recentEarnings: AdminReferralEarning[];
};

type InsightFilters = {
  search?: string;
  withdrawalStatus?: string;
};

type BusinessUserRecord = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  referral_code: string | null;
};

const OPEN_WITHDRAWAL_STATUSES = new Set(["requested", "processing"]);

function cleanText(value: unknown, max = 120) {
  return String(value ?? "").trim().slice(0, max);
}

function toNumber(value: unknown) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? Number(parsed.toFixed(2)) : 0;
}

function normalizeSearch(value: string) {
  return cleanText(value, 120).toLowerCase();
}

function matchesSearch(value: string, search: string) {
  if (!search) return true;
  return value.toLowerCase().includes(search);
}

function getSumFromRows(
  rows: Array<{ amount: unknown; status?: string | null }>,
  allowedStatuses: string[]
) {
  const statusSet = new Set(allowedStatuses);
  return Number(
    rows
      .filter((item) => statusSet.has(String(item.status ?? "")))
      .reduce((sum, item) => sum + toNumber(item.amount), 0)
      .toFixed(2)
  );
}

function mapUserRecord(record: BusinessUserRecord | undefined | null) {
  return {
    user_name: record?.full_name ?? null,
    user_email: record?.email ?? null,
    user_phone: record?.phone ?? null,
    user_referral_code: record?.referral_code ?? null,
  };
}

export async function fetchAdminReferralInsights(
  filters: InsightFilters = {}
): Promise<AdminReferralInsights> {
  const search = normalizeSearch(filters.search ?? "");
  const withdrawalStatus = cleanText(filters.withdrawalStatus ?? "", 40).toLowerCase();

  let withdrawalsQuery = supabase
    .from("business_referral_withdrawals")
    .select(
      "id, request_no, user_id, amount, currency, method, status, admin_note, created_at, processed_at, updated_at"
    )
    .order("created_at", { ascending: false })
    .limit(500);

  if (withdrawalStatus && withdrawalStatus !== "all") {
    withdrawalsQuery = withdrawalsQuery.eq("status", withdrawalStatus);
  }

  const [withdrawalsRes, earningsRes, referredUsersRes] = await Promise.all([
    withdrawalsQuery,
    supabase
      .from("business_referral_earnings")
      .select(
        "id, referrer_user_id, referred_user_id, referred_order_no, commission_amount, currency, status, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(2000),
    supabase
      .from("business_users")
      .select("id, referred_by_user_id, created_at")
      .not("referred_by_user_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(2000),
  ]);

  if (withdrawalsRes.error) {
    throw new Error("Failed to fetch referral withdrawals.");
  }
  if (earningsRes.error) {
    throw new Error("Failed to fetch referral earnings.");
  }
  if (referredUsersRes.error) {
    throw new Error("Failed to fetch referral signups.");
  }

  const withdrawalsRaw =
    withdrawalsRes.data ??
    ([] as Array<{
      id: string;
      request_no: string;
      user_id: string;
      amount: number | string;
      currency: string | null;
      method: string | null;
      status: string | null;
      admin_note: string | null;
      created_at: string | null;
      processed_at: string | null;
      updated_at: string | null;
    }>);

  const earningsRaw =
    earningsRes.data ??
    ([] as Array<{
      id: string;
      referrer_user_id: string;
      referred_user_id: string;
      referred_order_no: string | null;
      commission_amount: number | string;
      currency: string | null;
      status: string | null;
      created_at: string | null;
    }>);

  const referredUsersRaw =
    referredUsersRes.data ??
    ([] as Array<{
      id: string;
      referred_by_user_id: string;
      created_at: string | null;
    }>);

  const allUserIds = new Set<string>();
  withdrawalsRaw.forEach((item) => {
    if (item.user_id) allUserIds.add(item.user_id);
  });
  earningsRaw.forEach((item) => {
    if (item.referrer_user_id) allUserIds.add(item.referrer_user_id);
    if (item.referred_user_id) allUserIds.add(item.referred_user_id);
  });
  referredUsersRaw.forEach((item) => {
    if (item.id) allUserIds.add(item.id);
    if (item.referred_by_user_id) allUserIds.add(item.referred_by_user_id);
  });

  const allUserIdsList = Array.from(allUserIds);
  const usersMap = new Map<string, BusinessUserRecord>();

  if (allUserIdsList.length > 0) {
    const { data: users, error: usersError } = await supabase
      .from("business_users")
      .select("id, full_name, email, phone, referral_code")
      .in("id", allUserIdsList);

    if (usersError) {
      throw new Error("Failed to fetch referral users.");
    }

    (users ?? []).forEach((record) => {
      usersMap.set(record.id, record);
    });
  }

  const referredUserIds = referredUsersRaw.map((item) => item.id).filter(Boolean);
  const latestListingMap = new Map<
    string,
    { city: string | null; payment_status: string | null; status: string | null }
  >();

  if (referredUserIds.length > 0) {
    const { data: listingRows, error: listingRowsError } = await supabase
      .from("business_listings")
      .select("user_id, city, payment_status, status, created_at")
      .in("user_id", referredUserIds)
      .order("created_at", { ascending: false });

    if (listingRowsError) {
      throw new Error("Failed to fetch referral listing statuses.");
    }

    for (const row of listingRows ?? []) {
      const userId = String(row.user_id ?? "");
      if (!userId || latestListingMap.has(userId)) continue;
      latestListingMap.set(userId, {
        city: row.city ?? null,
        payment_status: row.payment_status ?? null,
        status: row.status ?? null,
      });
    }
  }

  const summary: AdminReferralSummary = {
    totalReferralSignups: referredUsersRaw.length,
    paidReferralConversions: referredUsersRaw.filter((item) => {
      const listing = latestListingMap.get(item.id);
      return listing?.payment_status === "paid";
    }).length,
    unpaidReferralSignups: 0,
    totalCommissionCredited: getSumFromRows(
      earningsRaw.map((item) => ({
        amount: item.commission_amount,
        status: item.status,
      })),
      ["credited"]
    ),
    totalWithdrawn: getSumFromRows(
      withdrawalsRaw.map((item) => ({
        amount: item.amount,
        status: item.status,
      })),
      ["paid"]
    ),
    pendingWithdrawalCount: withdrawalsRaw.filter((item) =>
      OPEN_WITHDRAWAL_STATUSES.has(String(item.status ?? ""))
    ).length,
    pendingWithdrawalAmount: Number(
      withdrawalsRaw
        .filter((item) => OPEN_WITHDRAWAL_STATUSES.has(String(item.status ?? "")))
        .reduce((sum, item) => sum + toNumber(item.amount), 0)
        .toFixed(2)
    ),
  };
  summary.unpaidReferralSignups = Math.max(
    0,
    summary.totalReferralSignups - summary.paidReferralConversions
  );

  const withdrawalsMapped: AdminReferralWithdrawal[] = withdrawalsRaw
    .map((item) => {
      const user = usersMap.get(item.user_id);
      return {
        id: item.id,
        request_no: item.request_no,
        user_id: item.user_id,
        amount: toNumber(item.amount),
        currency: item.currency || "INR",
        method: item.method || "upi",
        status: item.status || "requested",
        admin_note: item.admin_note,
        created_at: item.created_at,
        processed_at: item.processed_at,
        updated_at: item.updated_at,
        ...mapUserRecord(user),
      };
    })
    .filter((item) => {
      if (!search) return true;
      const haystack = [
        item.request_no,
        item.user_name ?? "",
        item.user_email ?? "",
        item.user_phone ?? "",
        item.user_referral_code ?? "",
        item.status,
      ].join(" ");
      return matchesSearch(haystack, search);
    });

  const signupsByReferrer = new Map<string, number>();
  const paidSignupsByReferrer = new Map<string, number>();

  const recentSignups: AdminReferralSignup[] = referredUsersRaw.map((row) => {
    const referredUser = usersMap.get(row.id);
    const referrer = usersMap.get(row.referred_by_user_id);
    const listing = latestListingMap.get(row.id);

    signupsByReferrer.set(
      row.referred_by_user_id,
      (signupsByReferrer.get(row.referred_by_user_id) ?? 0) + 1
    );
    if (listing?.payment_status === "paid") {
      paidSignupsByReferrer.set(
        row.referred_by_user_id,
        (paidSignupsByReferrer.get(row.referred_by_user_id) ?? 0) + 1
      );
    }

    return {
      user_id: row.id,
      user_name: referredUser?.full_name ?? null,
      user_email: referredUser?.email ?? null,
      user_phone: referredUser?.phone ?? null,
      city: listing?.city ?? null,
      payment_status: listing?.payment_status ?? "unpaid",
      listing_status: listing?.status ?? "not_created",
      referred_by_user_id: row.referred_by_user_id,
      referred_by_name: referrer?.full_name ?? null,
      referred_by_code: referrer?.referral_code ?? null,
      created_at: row.created_at,
    };
  });

  const earnedByReferrer = new Map<string, number>();
  const recentEarnings: AdminReferralEarning[] = earningsRaw.map((item) => {
    const amount = toNumber(item.commission_amount);
    if (item.status === "credited") {
      earnedByReferrer.set(
        item.referrer_user_id,
        Number(((earnedByReferrer.get(item.referrer_user_id) ?? 0) + amount).toFixed(2))
      );
    }
    return {
      id: item.id,
      referrer_user_id: item.referrer_user_id,
      referrer_name: usersMap.get(item.referrer_user_id)?.full_name ?? null,
      referred_user_id: item.referred_user_id,
      referred_user_name: usersMap.get(item.referred_user_id)?.full_name ?? null,
      referred_order_no: item.referred_order_no,
      commission_amount: amount,
      currency: item.currency || "INR",
      status: item.status || "credited",
      created_at: item.created_at,
    };
  });

  const topReferrerIds = Array.from(
    new Set([...signupsByReferrer.keys(), ...earnedByReferrer.keys()])
  );

  const topReferrers: AdminTopReferrer[] = topReferrerIds
    .map((referrerId) => {
      const user = usersMap.get(referrerId);
      return {
        user_id: referrerId,
        user_name: user?.full_name ?? null,
        user_email: user?.email ?? null,
        user_phone: user?.phone ?? null,
        referral_code: user?.referral_code ?? null,
        total_signups: signupsByReferrer.get(referrerId) ?? 0,
        paid_signups: paidSignupsByReferrer.get(referrerId) ?? 0,
        total_earned: earnedByReferrer.get(referrerId) ?? 0,
      };
    })
    .sort((a, b) => {
      if (b.total_earned !== a.total_earned) return b.total_earned - a.total_earned;
      if (b.total_signups !== a.total_signups) return b.total_signups - a.total_signups;
      return (a.user_name ?? "").localeCompare(b.user_name ?? "");
    })
    .slice(0, 30);

  return {
    summary,
    withdrawals: withdrawalsMapped,
    topReferrers,
    recentSignups: recentSignups.slice(0, 300),
    recentEarnings: recentEarnings.slice(0, 300),
  };
}
