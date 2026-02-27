"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Compass,
  LayoutDashboard,
  LogIn,
  ShieldCheck,
  Sparkles,
  Tags,
  UserPlus,
} from "lucide-react";
import { BUSINESS_CATEGORY_SLUGS } from "@/lib/business-identity";

type Props = {
  children: React.ReactNode;
  isLoggedIn: boolean;
  businessOwnerName: string | null;
};

const categoryButtons = [
  ...BUSINESS_CATEGORY_SLUGS.map((item) => ({
    label: item.category,
    href: `/business?category=${item.slug}`,
  })),
  { label: "All Categories", href: "/business" },
];

export default function BusinessRouteFrame({ children, isLoggedIn, businessOwnerName }: Props) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/business/dashboard");
  const isCertificateRoute = pathname?.startsWith("/business/certificate/");
  const isDiscoverRoute = pathname === "/business";
  const isIdentityRoute = pathname === "/business/identity";

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  if (isCertificateRoute) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 md:px-6">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
            <Building2 className="h-3.5 w-3.5" />
            Business Growth Hub
          </p>

          <div className="mt-4 space-y-2">
            <Link
              href="/business"
              className={`inline-flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                isDiscoverRoute
                  ? "border-cyan-300 bg-cyan-50 text-cyan-800"
                  : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Compass className="h-4 w-4 text-cyan-700" />
              Discover
            </Link>
            <Link
              href="/business/identity"
              className={`inline-flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                isIdentityRoute
                  ? "border-cyan-300 bg-cyan-50 text-cyan-800"
                  : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Sparkles className="h-4 w-4 text-cyan-700" />
              Why Join
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/business/dashboard"
                  className="inline-flex w-full items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                {businessOwnerName ? (
                  <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                    Logged in as <span className="font-semibold text-slate-800">{businessOwnerName}</span>
                  </p>
                ) : null}
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/business/dashboard/register"
                  className="inline-flex items-center justify-center gap-1 rounded-lg bg-slate-900 px-2 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  List Now
                </Link>
                <Link
                  href="/business/dashboard/login"
                  className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-2 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Login
                </Link>
              </div>
            )}
          </div>

          <div className="mt-5">
            <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <Tags className="h-3.5 w-3.5 text-cyan-700" />
              Browse by category
            </p>
            <div className="space-y-2">
              {categoryButtons.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Trust and quality policy
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
              Only approved and paid listings are public. Misleading profiles are removed from
              directory.
            </p>
          </div>
        </aside>

        <section className="min-w-0">{children}</section>
      </div>
    </main>
  );
}
