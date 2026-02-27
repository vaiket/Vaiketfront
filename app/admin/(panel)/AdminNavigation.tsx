"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import {
  Building2,
  ClipboardCheck,
  GraduationCap,
  HandCoins,
  LayoutDashboard,
  ShoppingCart,
  Users,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  match: (pathname: string) => boolean;
};

const navItems: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    match: (pathname) => pathname === "/admin",
  },
  {
    href: "/admin/academy",
    label: "Academy",
    icon: GraduationCap,
    match: (pathname) => pathname.startsWith("/admin/academy"),
  },
  {
    href: "/admin/leads",
    label: "Leads",
    icon: Users,
    match: (pathname) => pathname.startsWith("/admin/leads"),
  },
  {
    href: "/admin/website-requests",
    label: "Website Requests",
    icon: ClipboardCheck,
    match: (pathname) => pathname.startsWith("/admin/website-requests"),
  },
  {
    href: "/admin/business-listings",
    label: "Business Listings",
    icon: Building2,
    match: (pathname) => pathname.startsWith("/admin/business-listings"),
  },
  {
    href: "/admin/referrals",
    label: "Referrals",
    icon: HandCoins,
    match: (pathname) => pathname.startsWith("/admin/referrals"),
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: ShoppingCart,
    match: (pathname) => pathname.startsWith("/admin/orders"),
  },
];

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function AdminNavigation({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <nav className="-mx-1 overflow-x-auto pb-1 lg:hidden">
        <div className="flex w-max min-w-full gap-2 px-1">
          {navItems.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                  active
                    ? "border-cyan-300 bg-cyan-50 text-cyan-700"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <p className="mb-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
          Control Center
        </p>
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition",
                  active
                    ? "border-cyan-200 bg-cyan-50 text-cyan-800"
                    : "border-slate-200 text-slate-700 hover:bg-slate-100"
                )}
              >
                <item.icon className={cn("h-4 w-4", active ? "text-cyan-700" : "text-slate-500")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
