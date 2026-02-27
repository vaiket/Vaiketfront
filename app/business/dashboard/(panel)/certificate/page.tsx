import Link from "next/link";
import { requireBusinessSession } from "@/lib/business-guard";
import { supabase } from "@/lib/supabase";
import CertificateActions from "@/app/business/dashboard/(panel)/certificate/CertificateActions";
import { buildBusinessPublicUrl, buildQrCodeImageUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

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

export default async function BusinessDashboardCertificatePage() {
  const session = await requireBusinessSession();

  const { data: listing } = await supabase
    .from("business_listings")
    .select(
      "id, business_name, public_username, slug, category, city, status, payment_status, certificate_id, approved_at, published_at, updated_at"
    )
    .eq("user_id", session.userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!listing) {
    return (
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Certificate</h1>
        <p className="mt-1 text-sm text-slate-600">
          Create and submit your business listing first.
        </p>
        <Link
          href="/business/dashboard/add"
          className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Add Listing
        </Link>
      </div>
    );
  }

  const isApproved = listing.status === "approved";
  const isPaid = listing.payment_status === "paid";
  const hasCertificate = Boolean(listing.certificate_id);
  const verifyUrl = hasCertificate
    ? `/business/certificate/${listing.certificate_id}`
    : null;
  const publicPath = listing.public_username ? `/${listing.public_username}` : `/business/${listing.slug}`;
  const publicUrl = listing.public_username ? buildBusinessPublicUrl(listing.public_username) : null;
  const qrCodeUrl = publicUrl ? buildQrCodeImageUrl(publicUrl, 220) : null;
  const issueDate = formatDate(listing.approved_at ?? listing.published_at ?? listing.updated_at);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Certificate</h1>
      <p className="mt-1 text-sm text-slate-600">
        Download your recognition certificate after approval.
      </p>

      {!isPaid || !isApproved || !hasCertificate ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-700">Certificate is not available yet.</p>
          <ul className="mt-3 space-y-1 text-sm text-slate-600">
            <li>Payment status: {listing.payment_status ?? "unpaid"}</li>
            <li>Approval status: {listing.status ?? "draft"}</li>
            <li>Certificate id: {listing.certificate_id ?? "not generated"}</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/business/dashboard/payment"
              className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Go to Payment
            </Link>
            <Link
              href="/business/dashboard"
              className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
              Vaiket Business Identity Program
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
              Business Recognition Certificate
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              This is to certify that{" "}
              <span className="font-bold text-slate-900">{listing.business_name}</span> is a
              verified listing under Vaiket Business Identity Program.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <Info label="Certificate ID" value={listing.certificate_id ?? "-"} />
              <Info label="Issue Date" value={issueDate} />
              <Info label="Category" value={listing.category} />
              <Info label="City" value={listing.city} />
            </div>

            <p className="mt-5 text-xs font-semibold text-slate-600">
              Issued by Vaiket - Vikas Web Development Pvt. Ltd.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <CertificateActions />
            {verifyUrl ? (
              <Link
                href={verifyUrl}
                target="_blank"
                className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Open Verification Page
              </Link>
            ) : null}
            <Link
              href={publicPath}
              target="_blank"
              className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Open Public Profile
            </Link>
            {qrCodeUrl ? (
              <a
                href={qrCodeUrl}
                download={`vaiket-${listing.public_username}-qr.png`}
                className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Download QR
              </a>
            ) : null}
          </div>
          {publicUrl && qrCodeUrl ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Public URL</p>
              <p className="mt-1 break-all text-sm font-semibold text-cyan-700">{publicUrl}</p>
              <div className="mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCodeUrl}
                  alt="Business public profile QR code"
                  className="h-24 w-24 rounded-md border border-slate-200 bg-white p-1"
                />
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
