import Link from "next/link";
import {
  Building2,
  CreditCard,
  FileBadge2,
  Gift,
  LayoutDashboard,
  MessageSquare,
  Package,
  PencilLine,
} from "lucide-react";
import { requireBusinessSession } from "@/lib/business-guard";
import BusinessLogoutButton from "@/app/business/dashboard/BusinessLogoutButton";

type Props = {
  children: React.ReactNode;
};

const navItems = [
  { href: "/business/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/business/dashboard/add", label: "Add or Edit Listing", icon: PencilLine },
  { href: "/business/dashboard/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/business/dashboard/products", label: "Manage Products", icon: Package },
  { href: "/business/dashboard/payment", label: "Verification Payment", icon: CreditCard },
  { href: "/business/dashboard/certificate", label: "Certificate", icon: FileBadge2 },
  { href: "/business/dashboard/referrals", label: "Referral Wallet", icon: Gift },
];

export default async function BusinessDashboardPanelLayout({ children }: Props) {
  const session = await requireBusinessSession();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
                Business Dashboard
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Signed in as <span className="font-semibold">{session.name}</span>
              </p>
            </div>
            <BusinessLogoutButton />
          </div>
        </header>

        <div className="grid gap-5 md:grid-cols-[250px_1fr]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-3 flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-white">
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-semibold">Business Identity</span>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex w-full items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  <item.icon className="h-4 w-4 text-cyan-700" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
