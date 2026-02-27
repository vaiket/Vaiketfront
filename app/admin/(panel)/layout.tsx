import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { requireAdminSession } from "@/lib/admin-guard";
import AdminLogoutButton from "@/app/admin/(panel)/AdminLogoutButton";
import AdminNavigation from "@/app/admin/(panel)/AdminNavigation";

type Props = {
  children: React.ReactNode;
};

export default async function AdminPanelLayout({ children }: Props) {
  const session = await requireAdminSession();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-100 to-cyan-50/30 px-3 py-4 text-slate-900 sm:px-5 sm:py-6">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mb-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-700">
                Vaiket Admin
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span>
                  Signed in as <span className="font-semibold">{session.name}</span>
                </span>
                <Link
                  href="/"
                  target="_blank"
                  className="inline-flex items-center gap-1 font-semibold text-cyan-700 hover:underline"
                >
                  Open Site
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <AdminLogoutButton />
          </div>
        </header>

        <AdminNavigation mobile />

        <div className="mt-4 grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
          <AdminNavigation />
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
