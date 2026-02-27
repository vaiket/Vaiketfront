"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Loader2, Wallet } from "lucide-react";
import { BUSINESS_REFERRAL_MIN_WITHDRAWAL } from "@/lib/business-referral";

export type ReferralDashboardSummary = {
  totalSignups: number;
  todaySignups: number;
  paidSignups: number;
  unpaidSignups: number;
  totalEarned: number;
  totalWithdrawn: number;
  lockedAmount: number;
  availableBalance: number;
};

export type ReferralSignupItem = {
  id: string;
  name: string;
  phone: string;
  city: string;
  paymentStatus: string;
  listingStatus: string;
  joinedAt: string;
  referredAt: string;
};

export type ReferralEarningItem = {
  id: string;
  referredUserId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
};

export type ReferralWithdrawalItem = {
  id: string;
  requestNo: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  createdAt: string;
  processedAt: string | null;
};

function formatInr(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
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

function readableStatus(value: string) {
  return value
    .split("_")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");
}

async function copyText(value: string) {
  if (!navigator?.clipboard) return false;
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export default function ReferralDashboardClient({
  referralCode,
  referralLink,
  summary,
  signups,
  earnings,
  withdrawals,
}: {
  referralCode: string;
  referralLink: string;
  summary: ReferralDashboardSummary;
  signups: ReferralSignupItem[];
  earnings: ReferralEarningItem[];
  withdrawals: ReferralWithdrawalItem[];
}) {
  const router = useRouter();
  const [copyInfo, setCopyInfo] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const topEarnings = useMemo(() => earnings.slice(0, 8), [earnings]);
  const topWithdrawals = useMemo(() => withdrawals.slice(0, 8), [withdrawals]);

  const onCopy = async (value: string, label: string) => {
    const copied = await copyText(value);
    setCopyInfo(copied ? `${label} copied.` : `Copy failed for ${label}.`);
    setTimeout(() => setCopyInfo(""), 2200);
  };

  const onWithdraw = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/business/referrals/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          method,
          upiId,
          accountHolderName,
          notes,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not submit withdrawal request.");
      }

      setSuccess(`Withdrawal request created: ${data.request_no}`);
      setAmount("");
      setNotes("");
      router.refresh();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Could not submit withdrawal request.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Your referral assets
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-xs font-semibold text-slate-500">Referral code</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <p className="text-lg font-extrabold tracking-wide text-slate-900">{referralCode}</p>
              <button
                type="button"
                onClick={() => onCopy(referralCode, "Code")}
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                Copy
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-xs font-semibold text-slate-500">Referral link</p>
            <p className="mt-1 break-all text-sm font-semibold text-cyan-700">{referralLink}</p>
            <button
              type="button"
              onClick={() => onCopy(referralLink, "Link")}
              className="mt-2 inline-flex items-center rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" />
              Copy Link
            </button>
          </div>
        </div>
        {copyInfo ? <p className="mt-2 text-xs font-semibold text-emerald-700">{copyInfo}</p> : null}
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Available Wallet" value={formatInr(summary.availableBalance)} />
        <MetricCard title="Total Earned" value={formatInr(summary.totalEarned)} />
        <MetricCard title="Pending Withdrawals" value={formatInr(summary.lockedAmount)} />
        <MetricCard title="Total Withdrawn" value={formatInr(summary.totalWithdrawn)} />
        <MetricCard title="Total Signups" value={String(summary.totalSignups)} />
        <MetricCard title="Paid Conversions" value={String(summary.paidSignups)} />
        <MetricCard title="Unpaid Signups" value={String(summary.unpaidSignups)} />
        <MetricCard title="Today Signups" value={String(summary.todaySignups)} />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-3">
            <h2 className="text-base font-bold text-slate-900">Referred Signup Tracker</h2>
          </div>
          {signups.length === 0 ? (
            <div className="px-4 py-5 text-sm text-slate-500">
              No signups from your referral link yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-2.5">Name</th>
                    <th className="px-4 py-2.5">Phone</th>
                    <th className="px-4 py-2.5">City</th>
                    <th className="px-4 py-2.5">Plan</th>
                    <th className="px-4 py-2.5">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.map((item) => (
                    <tr key={item.id} className="border-t border-slate-100">
                      <td className="px-4 py-2.5 font-semibold text-slate-900">{item.name}</td>
                      <td className="px-4 py-2.5 text-slate-700">{item.phone}</td>
                      <td className="px-4 py-2.5 text-slate-700">{item.city}</td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            item.paymentStatus === "paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {item.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-700">{formatDateTime(item.joinedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <form
            onSubmit={onWithdraw}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <h2 className="inline-flex items-center gap-1.5 text-base font-bold text-slate-900">
              <Wallet className="h-4 w-4 text-cyan-700" />
              Withdraw from wallet
            </h2>

            <label className="mt-3 block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-700">Amount</span>
              <input
                required
                type="number"
                min={BUSINESS_REFERRAL_MIN_WITHDRAWAL}
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Enter amount"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
              <p className="mt-1 text-xs text-slate-500">
                Minimum withdrawal: {formatInr(BUSINESS_REFERRAL_MIN_WITHDRAWAL)}
              </p>
            </label>

            <label className="mt-3 block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-700">Method</span>
              <select
                value={method}
                onChange={(event) => setMethod(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              >
                <option value="upi">UPI</option>
                <option value="bank">Bank Transfer</option>
                <option value="manual">Manual</option>
              </select>
            </label>

            <label className="mt-3 block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-700">UPI ID</span>
              <input
                value={upiId}
                onChange={(event) => setUpiId(event.target.value)}
                placeholder="name@upi"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </label>

            <label className="mt-3 block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                Account holder name
              </span>
              <input
                value={accountHolderName}
                onChange={(event) => setAccountHolderName(event.target.value)}
                placeholder="Name"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </label>

            <label className="mt-3 block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                Notes for admin
              </span>
              <textarea
                rows={2}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Optional payout notes"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </label>

            {error ? (
              <div className="mt-3 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {error}
              </div>
            ) : null}
            {success ? (
              <div className="mt-3 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                {success}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Request Withdrawal"
              )}
            </button>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-4 py-3">
              <h3 className="text-sm font-bold text-slate-900">Recent withdrawals</h3>
            </div>
            {topWithdrawals.length === 0 ? (
              <p className="px-4 py-4 text-sm text-slate-500">No withdrawal requests yet.</p>
            ) : (
              <div className="space-y-2 px-4 py-3">
                {topWithdrawals.map((item) => (
                  <div key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
                    <p className="text-xs font-semibold text-slate-900">{item.requestNo}</p>
                    <p className="mt-0.5 text-xs text-slate-700">
                      {formatInr(item.amount)} | {readableStatus(item.status)} |{" "}
                      {formatDateTime(item.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-3">
          <h2 className="text-base font-bold text-slate-900">Commission Ledger</h2>
        </div>
        {topEarnings.length === 0 ? (
          <p className="px-4 py-5 text-sm text-slate-500">No referral commission credited yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2.5">Amount</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5">Referred User ID</th>
                  <th className="px-4 py-2.5">Date</th>
                </tr>
              </thead>
              <tbody>
                {topEarnings.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-4 py-2.5 font-semibold text-slate-900">
                      {formatInr(item.amount)}
                    </td>
                    <td className="px-4 py-2.5 text-slate-700">{readableStatus(item.status)}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">{item.referredUserId}</td>
                    <td className="px-4 py-2.5 text-slate-700">{formatDateTime(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-1 text-lg font-extrabold text-slate-900">{value}</p>
    </div>
  );
}
