import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, readAdminSessionToken } from "@/lib/admin-auth";
import AdminLoginForm from "@/app/admin/login/AdminLoginForm";

export const metadata = {
  title: "Admin Login | Vaiket",
  description: "Secure admin login for Vaiket dashboard.",
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const session = readAdminSessionToken(token);

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-7 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.8)]">
          <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
            Vaiket Admin
          </p>
          <h1 className="mt-4 text-2xl font-extrabold">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage leads and monitor pipeline status.
          </p>
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
