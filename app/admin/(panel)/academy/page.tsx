import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowRight, BookOpen, CalendarClock, GraduationCap, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function fetchCount(status?: string) {
  let query = supabase
    .from("academy_applications")
    .select("*", { count: "exact", head: true });
  if (status) {
    query = query.eq("status", status);
  }
  const { count } = await query;
  return count ?? 0;
}

export default async function AdminAcademyPage() {
  const [
    totalApplications,
    newApplications,
    shortlistedApplications,
    interviewApplications,
    selectedApplications,
    recentApplicationsRes,
  ] = await Promise.all([
    fetchCount(),
    fetchCount("new"),
    fetchCount("shortlisted"),
    fetchCount("interview_scheduled"),
    fetchCount("selected"),
    supabase
      .from("academy_applications")
      .select("id, application_no, full_name, email, track, status, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const recentApplications = recentApplicationsRes.data ?? [];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Academy Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            Separate admin view for internship and course application pipeline.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/academy/applications"
            className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            Manage Applications
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
          <Link
            href="/academy/internship"
            className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-auto"
          >
            View Internship Page
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Total Applications" value={totalApplications} icon={GraduationCap} />
        <MetricCard title="New Applications" value={newApplications} icon={Users} />
        <MetricCard title="Shortlisted" value={shortlistedApplications} icon={BookOpen} />
        <MetricCard title="Interview Scheduled" value={interviewApplications} icon={CalendarClock} />
        <MetricCard title="Selected" value={selectedApplications} icon={Users} />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Latest Academy Applications</h2>
          <Link
            href="/admin/academy/applications"
            className="text-xs font-semibold text-cyan-700 hover:underline"
          >
            View all
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <p className="text-sm text-slate-500">No academy applications found yet.</p>
        ) : (
          <div className="space-y-2.5">
            {recentApplications.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.application_no ?? item.id}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.full_name} | {item.email}
                  </p>
                  <p className="text-xs text-slate-500">Track: {item.track}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {item.status ?? "new"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
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
