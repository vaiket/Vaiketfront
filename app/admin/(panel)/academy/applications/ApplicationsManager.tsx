"use client";

import { useMemo, useState } from "react";
import { Loader2, RefreshCw, Search } from "lucide-react";

const STATUS_OPTIONS = [
  "all",
  "new",
  "shortlisted",
  "interview_scheduled",
  "selected",
  "rejected",
  "on_hold",
] as const;

const TYPE_OPTIONS = ["all", "internship", "course"] as const;
const TRACK_OPTIONS = [
  "all",
  "web-development",
  "automation-crm",
  "digital-marketing",
  "performance-marketing",
  "ai-productivity",
  "general",
] as const;

type ApplicationStatus = (typeof STATUS_OPTIONS)[number];
type ApplicationType = (typeof TYPE_OPTIONS)[number];
type ApplicationTrack = (typeof TRACK_OPTIONS)[number];

export type AdminAcademyApplication = {
  id: string;
  application_no: string | null;
  application_type: string | null;
  track: string | null;
  full_name: string;
  email: string;
  phone: string;
  city: string | null;
  education: string | null;
  experience_level: string | null;
  resume_link: string | null;
  availability: string | null;
  notes: string | null;
  internal_notes: string | null;
  status: string | null;
  assigned_to: string | null;
  follow_up_at: string | null;
  last_contacted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export default function ApplicationsManager({
  initialApplications,
}: {
  initialApplications: AdminAcademyApplication[];
}) {
  const [applications, setApplications] = useState<AdminAcademyApplication[]>(initialApplications);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus>("all");
  const [typeFilter, setTypeFilter] = useState<ApplicationType>("all");
  const [trackFilter, setTrackFilter] = useState<ApplicationTrack>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filteredApplications = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return applications.filter((application) => {
      if (statusFilter !== "all" && (application.status ?? "new") !== statusFilter) return false;
      if (typeFilter !== "all" && (application.application_type ?? "internship") !== typeFilter) {
        return false;
      }
      if (trackFilter !== "all" && (application.track ?? "general") !== trackFilter) return false;
      if (!searchValue) return true;

      return (
        String(application.application_no ?? "").toLowerCase().includes(searchValue) ||
        String(application.full_name ?? "").toLowerCase().includes(searchValue) ||
        String(application.email ?? "").toLowerCase().includes(searchValue) ||
        String(application.phone ?? "").toLowerCase().includes(searchValue)
      );
    });
  }, [applications, search, statusFilter, typeFilter, trackFilter]);

  const refreshApplications = async () => {
    setRefreshing(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (typeFilter !== "all") params.set("type", typeFilter);
      if (trackFilter !== "all") params.set("track", trackFilter);
      if (search.trim()) params.set("q", search.trim());

      const response = await fetch(`/api/admin/academy/applications?${params.toString()}`, {
        method: "GET",
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not refresh applications");
      }

      setApplications(data.applications as AdminAcademyApplication[]);
    } catch (fetchError) {
      const message =
        fetchError instanceof Error ? fetchError.message : "Failed to refresh applications";
      setError(message);
    } finally {
      setRefreshing(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    setError("");
    setUpdatingId(applicationId);

    try {
      const response = await fetch("/api/admin/academy/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, status }),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Failed to update application");
      }

      setApplications((previous) =>
        previous.map((application) =>
          application.id === applicationId
            ? (data.application as AdminAcademyApplication)
            : application
        )
      );
    } catch (updateError) {
      const message = updateError instanceof Error ? updateError.message : "Update failed";
      setError(message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Academy Applications</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage internship and course applications with status pipeline.
          </p>
        </div>
        <button
          onClick={refreshApplications}
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

      <div className="mb-4 grid gap-3 xl:grid-cols-[1fr_180px_160px_180px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by app no, name, email, phone"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as ApplicationStatus)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value as ApplicationType)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        >
          {TYPE_OPTIONS.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={trackFilter}
          onChange={(event) => setTrackFilter(event.target.value as ApplicationTrack)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        >
          {TRACK_OPTIONS.map((track) => (
            <option key={track} value={track}>
              {track}
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
          Total visible: {filteredApplications.length}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
          New: {filteredApplications.filter((item) => (item.status ?? "") === "new").length}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
          Selected: {filteredApplications.filter((item) => (item.status ?? "") === "selected").length}
        </span>
      </div>

      <div className="space-y-3">
        {filteredApplications.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No academy applications found for current filters.
          </div>
        ) : (
          filteredApplications.map((application) => (
            <article
              key={application.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="grid gap-3 lg:grid-cols-[1.15fr_1fr_220px]">
                <div>
                  <p className="text-base font-semibold text-slate-900">
                    {application.application_no ?? application.id}
                  </p>
                  <p className="text-sm text-slate-600">
                    {application.full_name} | {application.email}
                  </p>
                  <p className="text-sm text-slate-600">{application.phone}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Type: {application.application_type ?? "internship"} | Track:{" "}
                    {application.track ?? "general"}
                  </p>
                  <p className="text-xs text-slate-500">
                    City: {application.city ?? "-"} | Education: {application.education ?? "-"}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <p>
                    Experience: <span className="font-semibold text-slate-900">{application.experience_level ?? "-"}</span>
                  </p>
                  <p>
                    Availability: <span className="font-semibold text-slate-900">{application.availability ?? "-"}</span>
                  </p>
                  <p>
                    Assigned: <span className="font-semibold text-slate-900">{application.assigned_to ?? "-"}</span>
                  </p>
                  <p>
                    Follow-up:{" "}
                    <span className="font-semibold text-slate-900">
                      {application.follow_up_at ? new Date(application.follow_up_at).toLocaleString() : "-"}
                    </span>
                  </p>
                  {application.resume_link && (
                    <a
                      href={application.resume_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-md border border-cyan-300 bg-cyan-50 px-2 py-1 font-semibold text-cyan-700 hover:bg-cyan-100"
                    >
                      Open Resume
                    </a>
                  )}
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </p>
                  <select
                    value={application.status ?? "new"}
                    onChange={(event) => updateApplicationStatus(application.id, event.target.value)}
                    disabled={updatingId === application.id}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 disabled:opacity-70"
                  >
                    {STATUS_OPTIONS.filter((status) => status !== "all").map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <p className="mt-2 text-xs text-slate-500">
                    Created:{" "}
                    {application.created_at ? new Date(application.created_at).toLocaleString() : "-"}
                  </p>

                  {updatingId === application.id && (
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
