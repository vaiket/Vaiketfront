"use client";

import { useMemo, useState } from "react";
import { Loader2, RefreshCw, Search } from "lucide-react";
import { formatInr } from "@/lib/website-request";

const ORDER_STATUS_OPTIONS = ["all", "initiated", "pending", "paid", "failed", "cancelled"] as const;
const ORDER_TYPE_OPTIONS = ["all", "website", "general"] as const;

type OrderStatus = (typeof ORDER_STATUS_OPTIONS)[number];
type OrderType = (typeof ORDER_TYPE_OPTIONS)[number];

export type AdminOrder = {
  id: string;
  order_no: string | null;
  request_id: string | null;
  order_type: string | null;
  plan: string | null;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  lead_id: string | null;
  services: unknown;
  subtotal: number | string | null;
  gst: number | string | null;
  total: number | string | null;
  status: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  failure_reason: string | null;
  created_at: string | null;
  paid_at: string | null;
};

function money(value: number | string | null) {
  const numericValue = Number(value ?? 0);
  return formatInr(Number.isFinite(numericValue) ? numericValue : 0);
}

export default function OrdersManager({ initialOrders }: { initialOrders: AdminOrder[] }) {
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("all");
  const [typeFilter, setTypeFilter] = useState<OrderType>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filteredOrders = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return orders.filter((order) => {
      const currentStatus = order.status ?? "pending";
      const currentType = order.order_type ?? "general";
      if (statusFilter !== "all" && currentStatus !== statusFilter) return false;
      if (typeFilter !== "all" && currentType !== typeFilter) return false;
      if (!searchValue) return true;

      return (
        String(order.order_no ?? "").toLowerCase().includes(searchValue) ||
        String(order.customer_name ?? "").toLowerCase().includes(searchValue) ||
        String(order.customer_email ?? "").toLowerCase().includes(searchValue) ||
        String(order.customer_phone ?? "").toLowerCase().includes(searchValue) ||
        String(order.razorpay_order_id ?? "").toLowerCase().includes(searchValue)
      );
    });
  }, [orders, search, statusFilter, typeFilter]);

  const refreshOrders = async () => {
    setRefreshing(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (typeFilter !== "all") params.set("order_type", typeFilter);
      if (search.trim()) params.set("q", search.trim());

      const response = await fetch(`/api/admin/orders?${params.toString()}`, {
        method: "GET",
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not refresh orders");
      }

      setOrders(data.orders as AdminOrder[]);
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : "Failed to refresh orders";
      setError(message);
    } finally {
      setRefreshing(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    setError("");
    setUpdatingOrderId(orderId);

    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Failed to update order");
      }

      setOrders((previous) =>
        previous.map((order) => (order.id === orderId ? (data.order as AdminOrder) : order))
      );
    } catch (updateError) {
      const message = updateError instanceof Error ? updateError.message : "Update failed";
      setError(message);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Orders</h1>
          <p className="mt-1 text-sm text-slate-600">
            Track order number, payment status, and customer order details.
          </p>
        </div>
        <button
          onClick={refreshOrders}
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
            placeholder="Search order no, customer, phone, or Razorpay id"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as OrderStatus)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        >
          {ORDER_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value as OrderType)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        >
          {ORDER_TYPE_OPTIONS.map((type) => (
            <option key={type} value={type}>
              {type}
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
          Total visible: {filteredOrders.length}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
          Paid: {filteredOrders.filter((order) => (order.status ?? "") === "paid").length}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
          Pending: {filteredOrders.filter((order) => (order.status ?? "") === "pending").length}
        </span>
      </div>

      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No orders found for current filters.
          </div>
        ) : (
          filteredOrders.map((order) => (
            <article key={order.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr_220px]">
                <div>
                  <p className="text-base font-semibold text-slate-900">
                    {order.order_no ?? order.id}
                  </p>
                  <p className="text-sm text-slate-600">
                    {order.customer_name ?? "Unknown customer"} | {order.customer_email ?? "-"}
                  </p>
                  <p className="text-sm text-slate-600">{order.customer_phone ?? "-"}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Type: {order.order_type ?? "general"} | Plan: {order.plan ?? "n/a"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Razorpay Order: {order.razorpay_order_id ?? "-"}
                  </p>
                </div>

                <div className="space-y-1.5 text-sm">
                  <p className="text-slate-600">
                    Subtotal: <span className="font-semibold text-slate-900">{money(order.subtotal)}</span>
                  </p>
                  <p className="text-slate-600">
                    GST: <span className="font-semibold text-slate-900">{money(order.gst)}</span>
                  </p>
                  <p className="text-slate-600">
                    Total: <span className="font-semibold text-slate-900">{money(order.total)}</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    Request ID: {order.request_id ?? "N/A"}
                  </p>
                  {order.failure_reason && (
                    <p className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-700">
                      {order.failure_reason}
                    </p>
                  )}
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </p>
                  <select
                    value={order.status ?? "pending"}
                    onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                    disabled={updatingOrderId === order.id}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 disabled:opacity-70"
                  >
                    {ORDER_STATUS_OPTIONS.filter((status) => status !== "all").map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <p className="mt-2 text-xs text-slate-500">
                    Created: {order.created_at ? new Date(order.created_at).toLocaleString() : "-"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Paid: {order.paid_at ? new Date(order.paid_at).toLocaleString() : "-"}
                  </p>

                  {updatingOrderId === order.id && (
                    <p className="mt-1 inline-flex items-center text-xs font-medium text-cyan-700">
                      <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                      Updating...
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
