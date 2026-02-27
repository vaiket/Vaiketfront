import { redirect } from "next/navigation";
import { getBusinessSession } from "@/lib/business-guard";
import BusinessRegisterForm from "@/app/business/dashboard/register/BusinessRegisterForm";
import { normalizeReferralCode } from "@/lib/business-referral";

export const metadata = {
  title: "Business Register | Vaiket",
  description: "Create your business owner account to list your business on Vaiket.",
};

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function BusinessRegisterPage({ searchParams }: PageProps) {
  const session = await getBusinessSession();
  if (session) {
    redirect("/business/dashboard");
  }

  const params = (await searchParams) ?? {};
  const initialReferralCode = normalizeReferralCode(pickParam(params.ref));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-14 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
          Vaiket Business Identity
        </p>
        <h1 className="mt-4 text-2xl font-extrabold">Create Business Account</h1>
        <p className="mt-2 text-sm text-slate-600">
          Register to submit your business listing, pay verification fee, and track approval.
        </p>
        <BusinessRegisterForm initialReferralCode={initialReferralCode} />
      </div>
    </main>
  );
}
