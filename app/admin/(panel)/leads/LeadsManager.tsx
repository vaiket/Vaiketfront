"use client";

import { useMemo, useState } from "react";
import { Loader2, RefreshCw, Search } from "lucide-react";

const STATUS_OPTIONS = [
  "all",
  "new",
  "contacted",
  "qualified",
  "proposal_sent",
  "won",
  "lost",
  "paid",
] as const;

type LeadStatus = (typeof STATUS_OPTIONS)[number];

export type AdminLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  websitestatus: string | null;
  goals: unknown;
  channels: unknown;
  source: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
};

function toStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item));
}

export default function LeadsManager({ initialLeads }: { initialLeads: AdminLead[] }) {
  const [leads, setLeads] = useState<AdminLead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filteredLeads = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const statusOk = statusFilter === "all" || (lead.status ?? "new") === statusFilter;
      if (!statusOk) return false;
      if (!searchValue) return true;

      return (
        lead.name.toLowerCase().includes(searchValue) ||
        lead.email.toLowerCase().includes(searchValue) ||
        lead.phone.toLowerCase().includes(searchValue)
      );
    });
  }, [leads, search, statusFilter]);

  const refreshLeads = async () => {
    setRefreshing(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (search.trim()) params.set("q", search.trim());

      const response = await fetch(`/api/admin/leads?${params.toString()}`, {
        method: "GET",
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not refresh leads");
      }

      setLeads(data.leads as AdminLead[]);
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : "Failed to refresh leads";
      setError(message);
    } finally {
      setRefreshing(false);
    }
  };

  const updateLeadStatus = async (leadId: string, status: string) => {
    setError("");
    setUpdatingLeadId(leadId);

    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status }),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Failed to update lead");
      }

      setLeads((previous) =>
        previous.map((lead) => (lead.id === leadId ? { ...lead, status: data.lead.status } : lead))
      );
    } catch (updateError) {
      const message = updateError instanceof Error ? updateError.message : "Update failed";
      setError(message);
    } finally {
      setUpdatingLeadId(null);
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Lead Management</h1>
          <p className="mt-1 text-sm text-slate-600">
            Search, filter, and update lead status from one panel.
          </p>
        </div>
        <button
          onClick={refreshLeads}
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

      <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_220px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email, or phone"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as LeadStatus)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        >
          {STATUS_OPTIONS.map((status) => (
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
          Total visible: {filteredLeads.length}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
          New: {filteredLeads.filter((lead) => (lead.status ?? "new") === "new").length}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
          Paid: {filteredLeads.filter((lead) => (lead.status ?? "new") === "paid").length}
        </span>
      </div>

      <div className="space-y-3">
        {filteredLeads.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No leads found for current filters.
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const goals = toStringList(lead.goals);
            const channels = toStringList(lead.channels);
            const currentStatus = lead.status ?? "new";

            return (
              <article key={lead.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_220px]">
                  <div>
                    <p className="text-base font-semibold text-slate-900">{lead.name}</p>
                    <p className="text-sm text-slate-600">{lead.email}</p>
                    <p className="text-sm text-slate-600">{lead.phone}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Source: {lead.source ?? "get-started"} | Website:{" "}
                      {lead.websitestatus ?? "not provided"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <TagList title="Goals" items={goals} />
                    <TagList title="Channels" items={channels} />
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </p>
                    <select
                      value={currentStatus}
                      onChange={(event) => updateLeadStatus(lead.id, event.target.value)}
                      disabled={updatingLeadId === lead.id}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 disabled:opacity-70"
                    >
                      {STATUS_OPTIONS.filter((status) => status !== "all").map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <p className="mt-2 text-xs text-slate-500">
                      Created: {lead.created_at ? new Date(lead.created_at).toLocaleString() : "-"}
                    </p>

                    {updatingLeadId === lead.id && (
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

function TagList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      {items.length === 0 ? (
        <p className="text-xs text-slate-400">No data</p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
