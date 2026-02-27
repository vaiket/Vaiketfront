"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Loader2, RefreshCw, Search, XCircle } from "lucide-react";
import { formatInr } from "@/lib/business-identity";

const LISTING_STATUS_OPTIONS = ["all", "draft", "pending_review", "approved", "rejected"] as const;
const PAYMENT_STATUS_OPTIONS = ["all", "unpaid", "pending", "paid", "failed"] as const;

type ListingStatus = (typeof LISTING_STATUS_OPTIONS)[number];
type PaymentStatus = (typeof PAYMENT_STATUS_OPTIONS)[number];

export type AdminBusinessListing = {
  id: string;
  user_id: string;
  business_name: string;
  public_username: string | null;
  slug: string;
  category: string;
  title: string;
  details: string;
  city: string;
  address: string;
  phone: string;
  website: string | null;
  whatsapp: string | null;
  logo_url: string | null;
  status: string | null;
  payment_status: string | null;
  verification_fee: number | string | null;
  verification_gst: number | string | null;
  verification_total: number | string | null;
  certificate_id: string | null;
  rejection_reason: string | null;
  approved_at: string | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  owner_name: string | null;
  owner_email: string | null;
  owner_phone: string | null;
};

function normalizeMoney(value: number | string | null) {
  const amount = Number(value ?? 0);
  return formatInr(Number.isFinite(amount) ? amount : 0);
}

export default function BusinessListingsManager({
  initialListings,
}: {
  initialListings: AdminBusinessListing[];
}) {
  const [listings, setListings] = useState<AdminBusinessListing[]>(initialListings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ListingStatus>("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [updatingListingId, setUpdatingListingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filteredListings = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return listings.filter((listing) => {
      const currentStatus = listing.status ?? "draft";
      const currentPaymentStatus = listing.payment_status ?? "unpaid";
      if (statusFilter !== "all" && currentStatus !== statusFilter) return false;
      if (paymentFilter !== "all" && currentPaymentStatus !== paymentFilter) return false;
      if (!searchValue) return true;

      return (
        listing.business_name.toLowerCase().includes(searchValue) ||
        listing.title.toLowerCase().includes(searchValue) ||
        listing.city.toLowerCase().includes(searchValue) ||
        String(listing.public_username ?? "").toLowerCase().includes(searchValue) ||
        String(listing.owner_name ?? "").toLowerCase().includes(searchValue) ||
        String(listing.owner_email ?? "").toLowerCase().includes(searchValue)
      );
    });
  }, [listings, search, statusFilter, paymentFilter]);

  const refreshListings = async () => {
    setRefreshing(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (paymentFilter !== "all") params.set("payment_status", paymentFilter);
      if (search.trim()) params.set("q", search.trim());

      const response = await fetch(`/api/admin/business-listings?${params.toString()}`, {
        method: "GET",
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not refresh business listings");
      }

      setListings(data.listings as AdminBusinessListing[]);
    } catch (fetchError) {
      const message =
        fetchError instanceof Error ? fetchError.message : "Failed to refresh business listings";
      setError(message);
    } finally {
      setRefreshing(false);
    }
  };

  const reviewListing = async (listingId: string, action: "approve" | "reject") => {
    setError("");
    setUpdatingListingId(listingId);

    try {
      const rejectionReason =
        action === "reject"
          ? (window.prompt("Optional rejection note for business owner:") ?? "").trim()
          : "";

      const response = await fetch("/api/admin/business-listings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, action, rejectionReason }),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Failed to update listing");
      }

      const updated = data.listing as AdminBusinessListing;
      setListings((previous) =>
        previous.map((listing) => (listing.id === listingId ? updated : listing))
      );
    } catch (updateError) {
      const message = updateError instanceof Error ? updateError.message : "Update failed";
      setError(message);
    } finally {
      setUpdatingListingId(null);
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Business Listings</h1>
          <p className="mt-1 text-sm text-slate-600">
            Review paid listings and approve or reject for public directory.
          </p>
        </div>
        <button
          onClick={refreshListings}
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

      <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_200px_180px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search business, owner, city"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as ListingStatus)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        >
          {LISTING_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          value={paymentFilter}
          onChange={(event) => setPaymentFilter(event.target.value as PaymentStatus)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        >
          {PAYMENT_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-3 text-xs text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
          Total visible: {filteredListings.length}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
          Pending review:{" "}
          {filteredListings.filter((listing) => (listing.status ?? "") === "pending_review").length}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
          Approved: {filteredListings.filter((listing) => (listing.status ?? "") === "approved").length}
        </span>
      </div>

      <div className="space-y-3">
        {filteredListings.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No business listings found for current filters.
          </div>
        ) : (
          filteredListings.map((listing) => (
            <article key={listing.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_230px]">
                <div>
                  <p className="text-base font-semibold text-slate-900">{listing.business_name}</p>
                  <p className="text-sm text-slate-600">{listing.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Category: {listing.category} | City: {listing.city}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Slug: /business/{listing.slug}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Public URL:{" "}
                    {listing.public_username ? `/${listing.public_username}` : "not configured"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Owner: {listing.owner_name ?? "-"} | {listing.owner_email ?? "-"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Verification fee: {normalizeMoney(listing.verification_total)}
                  </p>
                  {listing.rejection_reason ? (
                    <p className="mt-2 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-700">
                      Rejection note: {listing.rejection_reason}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-1.5 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-900">Listing status:</span>{" "}
                    {listing.status ?? "draft"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Payment status:</span>{" "}
                    {listing.payment_status ?? "unpaid"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Certificate ID:</span>{" "}
                    {listing.certificate_id ?? "-"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Created:</span>{" "}
                    {listing.created_at ? new Date(listing.created_at).toLocaleString() : "-"}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => reviewListing(listing.id, "approve")}
                      disabled={
                        updatingListingId === listing.id ||
                        listing.payment_status !== "paid"
                      }
                      className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {updatingListingId === listing.id ? (
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                      )}
                      Approve
                    </button>
                    <button
                      onClick={() => reviewListing(listing.id, "reject")}
                      disabled={updatingListingId === listing.id}
                      className="inline-flex items-center rounded-lg border border-rose-300 bg-white px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <XCircle className="mr-1.5 h-3.5 w-3.5" />
                      Reject
                    </button>
                  </div>

                  <div className="mt-3 space-y-1 text-xs">
                    <Link
                      href={listing.public_username ? `/${listing.public_username}` : `/business/${listing.slug}`}
                      target="_blank"
                      className="inline-flex font-semibold text-cyan-700 hover:underline"
                    >
                      Open public profile
                    </Link>
                    {listing.certificate_id ? (
                      <Link
                        href={`/business/certificate/${listing.certificate_id}`}
                        target="_blank"
                        className="block font-semibold text-cyan-700 hover:underline"
                      >
                        Open certificate verify page
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
