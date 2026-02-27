"use client";

import { useMemo, useState } from "react";
import { Loader2, RefreshCw, Search } from "lucide-react";
import type {
  AdminReferralEarning,
  AdminReferralSignup,
  AdminReferralSummary,
  AdminReferralWithdrawal,
  AdminTopReferrer,
} from "@/lib/admin-referrals";
import { formatInr } from "@/lib/website-request";

const WITHDRAWAL_STATUS_OPTIONS = [
  "all",
  "requested",
  "processing",
  "paid",
  "rejected",
  "cancelled",
] as const;

type WithdrawalStatusFilter = (typeof WITHDRAWAL_STATUS_OPTIONS)[number];

function readableStatus(value: string | null | undefined) {
  return String(value ?? "requested")
    .split("_")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDateTime(value: string | null | undefined) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ReferralsManager({
  initialSummary,
  initialWithdrawals,
  initialTopReferrers,
  initialSignups,
  initialEarnings,
}: {
  initialSummary: AdminReferralSummary;
  initialWithdrawals: AdminReferralWithdrawal[];
  initialTopReferrers: AdminTopReferrer[];
  initialSignups: AdminReferralSignup[];
  initialEarnings: AdminReferralEarning[];
}) {
  const [summary, setSummary] = useState(initialSummary);
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);
  const [topReferrers, setTopReferrers] = useState(initialTopReferrers);
  const [signups, setSignups] = useState(initialSignups);
  const [earnings, setEarnings] = useState(initialEarnings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<WithdrawalStatusFilter>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [statusDrafts, setStatusDrafts] = useState<Record<string, string>>({});
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const visibleWithdrawals = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return withdrawals.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (!searchValue) return true;

      const haystack = [
        item.request_no,
        item.user_name ?? "",
        item.user_email ?? "",
        item.user_phone ?? "",
        item.user_referral_code ?? "",
        item.status,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(searchValue);
    });
  }, [withdrawals, statusFilter, search]);

  const refreshData = async () => {
    setRefreshing(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("q", search.trim());
      if (statusFilter !== "all") params.set("status", statusFilter);

      const response = await fetch(`/api/admin/referrals?${params.toString()}`, {
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Failed to refresh referral data.");
      }

      setSummary(data.summary as AdminReferralSummary);
      setWithdrawals(data.withdrawals as AdminReferralWithdrawal[]);
      setTopReferrers(data.top_referrers as AdminTopReferrer[]);
      setSignups(data.signups as AdminReferralSignup[]);
      setEarnings(data.earnings as AdminReferralEarning[]);
    } catch (fetchError) {
      const message =
        fetchError instanceof Error ? fetchError.message : "Failed to refresh referral data.";
      setError(message);
    } finally {
      setRefreshing(false);
    }
  };

  const updateWithdrawal = async (withdrawal: AdminReferralWithdrawal) => {
    const targetStatus = statusDrafts[withdrawal.id] ?? withdrawal.status;
    const targetNote = noteDrafts[withdrawal.id] ?? withdrawal.admin_note ?? "";

    if (!targetStatus) return;
    setUpdatingId(withdrawal.id);
    setError("");

    try {
      const response = await fetch("/api/admin/referrals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          withdrawalId: withdrawal.id,
          status: targetStatus,
          adminNote: targetNote,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Unable to update withdrawal.");
      }

      const updated = data.withdrawal as AdminReferralWithdrawal;
      setWithdrawals((previous) =>
        previous.map((item) => (item.id === updated.id ? updated : item))
      );
      await refreshData();
    } catch (updateError) {
      const message =
        updateError instanceof Error ? updateError.message : "Unable to update withdrawal.";
      setError(message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Referral Program</h1>
          <p className="mt-1 text-sm text-slate-600">
            Review referral conversions, commissions, and withdrawal approvals.
          </p>
        </div>
        <button
          onClick={refreshData}
          disabled={refreshing}
          className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {refreshing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refreshing
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </>
          )}
        </button>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Referral Signups" value={String(summary.totalReferralSignups)} />
        <MetricCard title="Paid Conversions" value={String(summary.paidReferralConversions)} />
        <MetricCard title="Commission Credited" value={formatInr(summary.totalCommissionCredited)} />
        <MetricCard title="Withdrawn Amount" value={formatInr(summary.totalWithdrawn)} />
        <MetricCard title="Pending Withdrawals" value={String(summary.pendingWithdrawalCount)} />
        <MetricCard title="Pending Amount" value={formatInr(summary.pendingWithdrawalAmount)} />
        <MetricCard title="Unpaid Signups" value={String(summary.unpaidReferralSignups)} />
        <MetricCard
          title="Commission Pending"
          value={formatInr(
            Math.max(
              0,
              Number(
                (summary.totalCommissionCredited - summary.totalWithdrawn - summary.pendingWithdrawalAmount).toFixed(2)
              )
            )
          )}
        />
      </div>

      <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_220px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search request no, user, email, phone, referral code"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as WithdrawalStatusFilter)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        >
          {WITHDRAWAL_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {readableStatus(status)}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-base font-bold text-slate-900">Withdrawal Requests</h2>
        <p className="mt-1 text-xs text-slate-500">
          Visible requests: {visibleWithdrawals.length}
        </p>

        <div className="mt-3 space-y-3">
          {visibleWithdrawals.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 text-sm text-slate-500">
              No withdrawal requests found for current filter.
            </div>
          ) : (
            visibleWithdrawals.map((item) => (
              <article key={item.id} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="grid gap-3 lg:grid-cols-[1.05fr_1fr_260px]">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.request_no}</p>
                    <p className="text-xs text-slate-600">
                      {item.user_name ?? "Unknown"} | {item.user_email ?? "-"}
                    </p>
                    <p className="text-xs text-slate-600">{item.user_phone ?? "-"}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Ref code: {item.user_referral_code ?? "not set"}
                    </p>
                  </div>

                  <div className="space-y-1 text-sm">
                    <p className="text-slate-700">
                      Amount: <span className="font-semibold">{formatInr(item.amount)}</span>
                    </p>
                    <p className="text-slate-700">Method: {item.method.toUpperCase()}</p>
                    <p className="text-slate-700">Status: {readableStatus(item.status)}</p>
                    <p className="text-xs text-slate-500">
                      Created: {formatDateTime(item.created_at)}
                    </p>
                    <p className="text-xs text-slate-500">
                      Processed: {formatDateTime(item.processed_at)}
                    </p>
                  </div>

                  <div>
                    <select
                      value={statusDrafts[item.id] ?? item.status}
                      onChange={(event) =>
                        setStatusDrafts((prev) => ({ ...prev, [item.id]: event.target.value }))
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    >
                      {WITHDRAWAL_STATUS_OPTIONS.filter((status) => status !== "all").map((status) => (
                        <option key={status} value={status}>
                          {readableStatus(status)}
                        </option>
                      ))}
                    </select>
                    <textarea
                      rows={2}
                      value={noteDrafts[item.id] ?? item.admin_note ?? ""}
                      onChange={(event) =>
                        setNoteDrafts((prev) => ({ ...prev, [item.id]: event.target.value }))
                      }
                      placeholder="Admin note (optional)"
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                    <button
                      onClick={() => updateWithdrawal(item)}
                      disabled={updatingId === item.id}
                      className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {updatingId === item.id ? (
                        <>
                          <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Status"
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-900">Top Referrers</h2>
          <div className="mt-3 space-y-2">
            {topReferrers.length === 0 ? (
              <p className="text-sm text-slate-500">No referral activity yet.</p>
            ) : (
              topReferrers.slice(0, 12).map((item) => (
                <div key={item.user_id} className="rounded-lg border border-slate-200 bg-white p-2.5">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.user_name ?? "Unknown"} ({item.referral_code ?? "no code"})
                  </p>
                  <p className="text-xs text-slate-600">
                    Signups: {item.total_signups} | Paid: {item.paid_signups} | Earned:{" "}
                    {formatInr(item.total_earned)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-900">Recent Signups from Referral</h2>
          <div className="mt-3 space-y-2">
            {signups.length === 0 ? (
              <p className="text-sm text-slate-500">No referral signups yet.</p>
            ) : (
              signups.slice(0, 12).map((item) => (
                <div key={item.user_id} className="rounded-lg border border-slate-200 bg-white p-2.5">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.user_name ?? "Unknown"} | {item.city ?? "-"}
                  </p>
                  <p className="text-xs text-slate-600">
                    By: {item.referred_by_name ?? "Unknown"} ({item.referred_by_code ?? "no code"}) |{" "}
                    {item.payment_status === "paid" ? "Paid" : "Unpaid"} | {formatDateTime(item.created_at)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-base font-bold text-slate-900">Recent Commission Credits</h2>
        <div className="mt-3 space-y-2">
          {earnings.length === 0 ? (
            <p className="text-sm text-slate-500">No commission entries yet.</p>
          ) : (
            earnings.slice(0, 14).map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-2.5">
                <p className="text-sm font-semibold text-slate-900">
                  {item.referrer_name ?? "Unknown"} earned {formatInr(item.commission_amount)}
                </p>
                <p className="text-xs text-slate-600">
                  Referred: {item.referred_user_name ?? "Unknown"} | Order: {item.referred_order_no ?? "-"} |{" "}
                  {readableStatus(item.status)} | {formatDateTime(item.created_at)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-1 text-lg font-extrabold text-slate-900">{value}</p>
    </div>
  );
}
