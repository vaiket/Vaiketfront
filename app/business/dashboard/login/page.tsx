import { redirect } from "next/navigation";
import { getBusinessSession } from "@/lib/business-guard";
import BusinessLoginForm from "@/app/business/dashboard/login/BusinessLoginForm";

export const metadata = {
  title: "Business Login | Vaiket",
  description: "Login to manage your business listing on Vaiket.",
};

export default async function BusinessLoginPage() {
  const session = await getBusinessSession();
  if (session) {
    redirect("/business/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-14 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
          Vaiket Business Identity
        </p>
        <h1 className="mt-4 text-2xl font-extrabold">Business Owner Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to manage listing details, payment, approval, and certificate.
        </p>
        <BusinessLoginForm />
      </div>
    </main>
  );
}
