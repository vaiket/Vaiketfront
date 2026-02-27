import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

type PageProps = {
  params: Promise<{ certificateId: string }>;
};

type CertificateListing = {
  business_name: string;
  public_username: string | null;
  slug: string;
  category: string;
  city: string;
  certificate_id: string;
  approved_at: string | null;
  published_at: string | null;
  updated_at: string | null;
};

function formatDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function BusinessCertificateVerificationPage({ params }: PageProps) {
  const { certificateId } = await params;

  const { data } = await supabase
    .from("business_listings")
    .select(
      "business_name, public_username, slug, category, city, certificate_id, approved_at, published_at, updated_at"
    )
    .eq("certificate_id", certificateId)
    .eq("status", "approved")
    .eq("payment_status", "paid")
    .maybeSingle();

  if (!data) {
    notFound();
  }

  const listing = data as CertificateListing;
  const issueDate = formatDate(listing.approved_at ?? listing.published_at ?? listing.updated_at);

  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        <BadgeCheck className="h-3.5 w-3.5" />
        Certificate Verified
      </p>

      <h1 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
        Vaiket Business Recognition Certificate
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        This page verifies the certificate details for the listed business.
      </p>

      <div className="mt-6 rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
          Certificate ID
        </p>
        <p className="mt-1 text-xl font-extrabold text-slate-900">{listing.certificate_id}</p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <InfoRow label="Business Name" value={listing.business_name} />
          <InfoRow label="Issue Date" value={issueDate} />
          <InfoRow label="Category" value={listing.category} />
          <InfoRow label="City" value={listing.city} />
        </div>

        <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          <ShieldCheck className="h-3.5 w-3.5 text-cyan-700" />
          Issued by Vaiket - Vikas Web Development Pvt. Ltd.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href={listing.public_username ? `/${listing.public_username}` : `/business/${listing.slug}`}
          className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          View Business Profile
        </Link>
        <Link
          href="/business"
          className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Back to Directory
        </Link>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
