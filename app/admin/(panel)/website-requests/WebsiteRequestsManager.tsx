"use client";

import { useMemo, useState } from "react";
import { Loader2, RefreshCw, Search } from "lucide-react";
import { formatInr } from "@/lib/website-request";

const REQUEST_STATUS_OPTIONS = ["all", "new", "pending", "in_progress", "success", "failed"] as const;
const PLAN_OPTIONS = ["all", "starter", "business", "enterprise"] as const;

type RequestStatus = (typeof REQUEST_STATUS_OPTIONS)[number];
type PlanFilter = (typeof PLAN_OPTIONS)[number];

export type AdminWebsiteRequest = {
  id: string;
  request_no: string | null;
  lead_id: string | null;
  plan: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  business_name: string | null;
  website_status: string | null;
  goals: unknown;
  add_ons: unknown;
  pages_needed: string | null;
  notes: string | null;
  base_price: number | string | null;
  add_on_amount: number | string | null;
  subtotal: number | string | null;
  gst: number | string | null;
  total: number | string | null;
  currency: string | null;
  latest_order_id: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
};

function listFromUnknown(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item));
}

function money(value: number | string | null) {
  const numericValue = Number(value ?? 0);
  return formatInr(Number.isFinite(numericValue) ? numericValue : 0);
}

export default function WebsiteRequestsManager({
  initialRequests,
}: {
  initialRequests: AdminWebsiteRequest[];
}) {
  const [requests, setRequests] = useState<AdminWebsiteRequest[]>(initialRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus>("all");
  const [planFilter, setPlanFilter] = useState<PlanFilter>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [updatingRequestId, setUpdatingRequestId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filteredRequests = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return requests.filter((request) => {
      const currentStatus = request.status ?? "pending";
      const currentPlan = request.plan ?? "starter";
      if (statusFilter !== "all" && currentStatus !== statusFilter) return false;
      if (planFilter !== "all" && currentPlan !== planFilter) return false;
      if (!searchValue) return true;

      return (
        String(request.request_no ?? "").toLowerCase().includes(searchValue) ||
        String(request.customer_name ?? "").toLowerCase().includes(searchValue) ||
        String(request.customer_email ?? "").toLowerCase().includes(searchValue) ||
        String(request.customer_phone ?? "").toLowerCase().includes(searchValue) ||
        String(request.business_name ?? "").toLowerCase().includes(searchValue)
      );
    });
  }, [requests, search, statusFilter, planFilter]);

  const refreshRequests = async () => {
    setRefreshing(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (planFilter !== "all") params.set("plan", planFilter);
      if (search.trim()) params.set("q", search.trim());

      const response = await fetch(`/api/admin/website-requests?${params.toString()}`, {
        method: "GET",
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not refresh requests");
      }

      setRequests(data.requests as AdminWebsiteRequest[]);
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : "Failed to refresh requests";
      setError(message);
    } finally {
      setRefreshing(false);
    }
  };

  const updateRequestStatus = async (requestId: string, status: string) => {
    setError("");
    setUpdatingRequestId(requestId);
    try {
      const response = await fetch("/api/admin/website-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, status }),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Failed to update request");
      }

      setRequests((previous) =>
        previous.map((request) =>
          request.id === requestId ? (data.request as AdminWebsiteRequest) : request
        )
      );
    } catch (updateError) {
      const message = updateError instanceof Error ? updateError.message : "Update failed";
      setError(message);
    } finally {
      setUpdatingRequestId(null);
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Website Requests</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage latest website requests, statuses, and linked order ids.
          </p>
        </div>
        <button
          onClick={refreshRequests}
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

      <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_200px_170px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search request no, name, email, phone"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as RequestStatus)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        >
          {REQUEST_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          value={planFilter}
          onChange={(event) => setPlanFilter(event.target.value as PlanFilter)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        >
          {PLAN_OPTIONS.map((plan) => (
            <option key={plan} value={plan}>
              {plan}
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
          Total visible: {filteredRequests.length}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
          Success: {filteredRequests.filter((request) => (request.status ?? "") === "success").length}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
          Pending: {filteredRequests.filter((request) => (request.status ?? "") === "pending").length}
        </span>
      </div>

      <div className="space-y-3">
        {filteredRequests.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No website requests found for current filters.
          </div>
        ) : (
          filteredRequests.map((request) => {
            const goals = listFromUnknown(request.goals);
            const addOns = listFromUnknown(request.add_ons);
            return (
              <article key={request.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr_220px]">
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {request.request_no ?? request.id}
                    </p>
                    <p className="text-sm text-slate-600">
                      {request.customer_name} | {request.customer_email}
                    </p>
                    <p className="text-sm text-slate-600">{request.customer_phone}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Plan: {request.plan ?? "-"} | Website: {request.website_status ?? "-"}
                    </p>
                    <p className="text-xs text-slate-500">
                      Latest Order ID: {request.latest_order_id ?? "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Goals
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {goals.length === 0 ? (
                          <span className="text-xs text-slate-400">No goals</span>
                        ) : (
                          goals.map((goal) => (
                            <span
                              key={goal}
                              className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700"
                            >
                              {goal}
                            </span>
                          ))
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Add-ons
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {addOns.length === 0 ? (
                          <span className="text-xs text-slate-400">No add-ons</span>
                        ) : (
                          addOns.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700"
                            >
                              {item}
                            </span>
                          ))
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500">
                      Total: <span className="font-semibold text-slate-900">{money(request.total)}</span>
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </p>
                    <select
                      value={request.status ?? "pending"}
                      onChange={(event) => updateRequestStatus(request.id, event.target.value)}
                      disabled={updatingRequestId === request.id}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 disabled:opacity-70"
                    >
                      {REQUEST_STATUS_OPTIONS.filter((status) => status !== "all").map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <p className="mt-2 text-xs text-slate-500">
                      Created:{" "}
                      {request.created_at ? new Date(request.created_at).toLocaleString() : "-"}
                    </p>

                    {updatingRequestId === request.id && (
                      <p className="mt-1 inline-flex items-center text-xs font-medium text-cyan-700">
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        Updating...
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
