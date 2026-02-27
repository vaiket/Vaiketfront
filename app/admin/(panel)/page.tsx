import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  Building2,
  ClipboardList,
  CreditCard,
  FilePlus2,
  GraduationCap,
  HandCoins,
  ShoppingCart,
  UserCheck,
  Users,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatInr } from "@/lib/website-request";

export const dynamic = "force-dynamic";

async function fetchCount(table: string, status?: string) {
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  if (status) {
    query = query.eq("status", status);
  }
  const { count } = await query;
  return count ?? 0;
}

export default async function AdminDashboardPage() {
  const [
    totalLeads,
    newLeads,
    paidLeads,
    totalWebsiteRequests,
    pendingWebsiteRequests,
    totalAcademyApplications,
    totalBusinessListings,
    pendingBusinessReviews,
    approvedBusinessListings,
    totalReferralSignups,
    paidReferralSignups,
    pendingReferralWithdrawals,
    totalOrders,
    paidOrders,
    failedOrders,
    recentLeadsRes,
    recentOrdersRes,
    recentBusinessListingsRes,
  ] =
    await Promise.all([
      fetchCount("leads"),
      fetchCount("leads", "new"),
      fetchCount("leads", "paid"),
      fetchCount("website_requests"),
      fetchCount("website_requests", "pending"),
      fetchCount("academy_applications"),
      fetchCount("business_listings"),
      fetchCount("business_listings", "pending_review"),
      fetchCount("business_listings", "approved"),
      supabase
        .from("business_users")
        .select("*", { count: "exact", head: true })
        .not("referred_by_user_id", "is", null)
        .then((res) => res.count ?? 0),
      supabase
        .from("business_users")
        .select("id")
        .not("referred_by_user_id", "is", null)
        .limit(2000)
        .then(async (res) => {
          const ids = (res.data ?? []).map((item) => item.id);
          if (ids.length === 0) return 0;
          const listingRes = await supabase
            .from("business_listings")
            .select("user_id, payment_status")
            .in("user_id", ids);
          const paidUserSet = new Set<string>();
          for (const listing of listingRes.data ?? []) {
            if (listing.payment_status === "paid") {
              paidUserSet.add(String(listing.user_id ?? ""));
            }
          }
          return paidUserSet.size;
        }),
      fetchCount("business_referral_withdrawals", "requested"),
      fetchCount("orders"),
      fetchCount("orders", "paid"),
      fetchCount("orders", "failed"),
      supabase
        .from("leads")
        .select("id, name, email, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("orders")
        .select("id, order_no, customer_name, total, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("business_listings")
        .select("id, business_name, city, status, payment_status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  const recentLeads = recentLeadsRes.data ?? [];
  const recentOrders = recentOrdersRes.data ?? [];
  const recentBusinessListings = recentBusinessListingsRes.data ?? [];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            Quick snapshot of latest leads, website requests, and order status.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ShortcutLink href="/admin/leads" label="Manage Leads" />
          <ShortcutLink href="/admin/academy" label="Academy Dashboard" />
          <ShortcutLink href="/admin/website-requests" label="Website Requests" />
          <ShortcutLink href="/admin/business-listings" label="Business Listings" />
          <ShortcutLink href="/admin/referrals" label="Referral Panel" />
          <ShortcutLink href="/admin/orders" label="Manage Orders" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <MetricCard title="Total Leads" value={totalLeads} icon={Users} />
        <MetricCard title="New Leads" value={newLeads} icon={FilePlus2} />
        <MetricCard title="Paid Leads" value={paidLeads} icon={UserCheck} />
        <MetricCard title="Website Requests" value={totalWebsiteRequests} icon={ClipboardList} />
        <MetricCard title="Pending Requests" value={pendingWebsiteRequests} icon={ClipboardList} />
        <MetricCard title="Academy Applications" value={totalAcademyApplications} icon={GraduationCap} />
        <MetricCard title="Business Listings" value={totalBusinessListings} icon={Building2} />
        <MetricCard title="Pending Reviews" value={pendingBusinessReviews} icon={Building2} />
        <MetricCard title="Approved Listings" value={approvedBusinessListings} icon={Building2} />
        <MetricCard title="Referral Signups" value={totalReferralSignups} icon={HandCoins} />
        <MetricCard title="Paid Referrals" value={paidReferralSignups} icon={HandCoins} />
        <MetricCard
          title="Pending Withdrawals"
          value={pendingReferralWithdrawals}
          icon={HandCoins}
        />
        <MetricCard title="Total Orders" value={totalOrders} icon={ShoppingCart} />
        <MetricCard title="Paid Orders" value={paidOrders} icon={CreditCard} />
        <MetricCard title="Failed Orders" value={failedOrders} icon={CreditCard} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Latest Leads</h2>
            <Link href="/admin/leads" className="text-xs font-semibold text-cyan-700 hover:underline">
              View all
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <p className="text-sm text-slate-500">No leads found yet.</p>
          ) : (
            <div className="space-y-2.5">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.email}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {lead.status ?? "new"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Latest Orders</h2>
            <Link href="/admin/orders" className="text-xs font-semibold text-cyan-700 hover:underline">
              View all
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-sm text-slate-500">No orders found yet.</p>
          ) : (
            <div className="space-y-2.5">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {order.order_no ?? order.id}
                    </p>
                    <p className="text-xs text-slate-500">
                      {order.customer_name ?? "Unknown"} | {formatInr(Number(order.total ?? 0))}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {order.status ?? "pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Latest Business Listings</h2>
            <Link
              href="/admin/business-listings"
              className="text-xs font-semibold text-cyan-700 hover:underline"
            >
              View all
            </Link>
          </div>

          {recentBusinessListings.length === 0 ? (
            <p className="text-sm text-slate-500">No business listings found yet.</p>
          ) : (
            <div className="space-y-2.5">
              {recentBusinessListings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{listing.business_name}</p>
                    <p className="text-xs text-slate-500">
                      {listing.city} | {listing.payment_status ?? "unpaid"}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {listing.status ?? "draft"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ShortcutLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
    >
      {label}
      <ArrowRight className="ml-1.5 h-4 w-4" />
    </Link>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-2 inline-flex rounded-lg bg-cyan-100 p-2 text-cyan-700">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-extrabold text-slate-900">{value}</p>
    </div>
  );
}
