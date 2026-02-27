import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function InternshipApplySuccessPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const applicationNo = pickParam(params.application_no);

  return (
    <main className="min-h-screen bg-emerald-50 px-4 py-14 text-slate-900">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-emerald-200 bg-white p-7 shadow-sm sm:p-9">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-900">Application submitted</h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Thanks for applying. Our academy team will review your profile and contact you soon.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <p>
            <span className="font-semibold text-slate-700">Application No:</span>{" "}
            <span className="font-bold text-slate-900">{applicationNo || "Generated"}</span>
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/academy/internship"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Internship Page
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
