import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  FileBadge2,
  Gift,
  MessageSquare,
  Package,
  PencilLine,
} from "lucide-react";
import { requireBusinessSession } from "@/lib/business-guard";
import { supabase } from "@/lib/supabase";
import { formatInr, BUSINESS_VERIFICATION_TOTAL } from "@/lib/business-identity";
import { buildBusinessPublicUrl, buildQrCodeImageUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

function formatDateTime(value: string | null | undefined) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function BusinessDashboardHomePage() {
  const session = await requireBusinessSession();
  const { data: listing } = await supabase
    .from("business_listings")
    .select(
      "id, business_name, public_username, slug, category, city, status, payment_status, certificate_id, created_at, updated_at, rejection_reason"
    )
    .eq("user_id", session.userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { count: activeProductsCount } = listing
    ? await supabase
        .from("business_products")
        .select("*", { count: "exact", head: true })
        .eq("listing_id", listing.id)
        .eq("user_id", session.userId)
        .eq("is_active", true)
    : { count: 0 };

  const { count: totalEnquiriesCount } = listing
    ? await supabase
        .from("business_enquiries")
        .select("*", { count: "exact", head: true })
        .eq("listing_id", listing.id)
    : { count: 0 };

  const { data: recentEnquiries } = listing
    ? await supabase
        .from("business_enquiries")
        .select("id, customer_name, customer_phone, service_name, status, created_at")
        .eq("listing_id", listing.id)
        .order("created_at", { ascending: false })
        .limit(6)
    : { data: [] };

  const publicProfilePath = listing?.public_username
    ? `/${listing.public_username}`
    : listing
      ? `/business/${listing.slug}`
      : null;
  const publicProfileUrl =
    listing?.public_username && listing.status === "approved" && listing.payment_status === "paid"
      ? buildBusinessPublicUrl(listing.public_username)
      : null;
  const qrCodeUrl = publicProfileUrl ? buildQrCodeImageUrl(publicProfileUrl) : null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Business Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage listing details, enquiries, payment status, approval, and certificate.
          </p>
        </div>
        <Link
          href="/business/dashboard/add"
          className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {listing ? "Edit Listing" : "Add Listing"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      {!listing ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-700">
            You have not created a listing yet. Start by adding your business details.
          </p>
          <Link
            href="/business/dashboard/add"
            className="mt-3 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add Business Listing
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <InfoCard title="Listing Status" value={listing.status ?? "draft"} icon={BadgeCheck} />
            <InfoCard
              title="Payment Status"
              value={listing.payment_status ?? "unpaid"}
              icon={CreditCard}
            />
            <InfoCard title="Verification Fee" value={formatInr(BUSINESS_VERIFICATION_TOTAL)} icon={CreditCard} />
            <InfoCard
              title="Certificate"
              value={listing.certificate_id ? "Available" : "Not available"}
              icon={FileBadge2}
            />
            <InfoCard
              title="Active Products"
              value={String(activeProductsCount ?? 0)}
              icon={Package}
            />
            <InfoCard
              title="Total Enquiries"
              value={String(totalEnquiriesCount ?? 0)}
              icon={MessageSquare}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-base font-bold text-slate-900">Current Listing Snapshot</h2>
            <div className="mt-3 space-y-1.5 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-900">Business:</span> {listing.business_name}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Slug:</span> /business/{listing.slug}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Public username:</span>{" "}
                {listing.public_username ? `/${listing.public_username}` : "not set"}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Category:</span> {listing.category}
              </p>
              <p>
                <span className="font-semibold text-slate-900">City:</span> {listing.city}
              </p>
              {listing.rejection_reason && (
                <p className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-sm text-rose-700">
                  Rejection note: {listing.rejection_reason}
                </p>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/business/dashboard/add"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <PencilLine className="mr-2 h-4 w-4" />
                Edit Listing
              </Link>
              <Link
                href="/business/dashboard/payment"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payment
              </Link>
              <Link
                href="/business/dashboard/certificate"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <FileBadge2 className="mr-2 h-4 w-4" />
                Certificate
              </Link>
              <Link
                href="/business/dashboard/products"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <Package className="mr-2 h-4 w-4" />
                Products
              </Link>
              <Link
                href="/business/dashboard/enquiries"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Enquiries
              </Link>
              <Link
                href="/business/dashboard/referrals"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <Gift className="mr-2 h-4 w-4" />
                Referral Wallet
              </Link>
              {listing.status === "approved" && (
                <Link
                  href={publicProfilePath || `/business/${listing.slug}`}
                  target="_blank"
                  className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View Public Profile
                </Link>
              )}
            </div>
          </div>

          {publicProfileUrl && qrCodeUrl ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-base font-bold text-slate-900">Public Profile and QR</h2>
              <p className="mt-1 text-sm text-slate-600">
                Share this URL and QR code to get direct customer traffic on your profile page.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCodeUrl}
                  alt="Business profile QR code"
                  className="h-28 w-28 rounded-lg border border-slate-200 bg-white p-1"
                />
                <div className="min-w-0 flex-1">
                  <p className="break-all text-sm font-semibold text-cyan-700">{publicProfileUrl}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Link
                      href={publicProfilePath || "/business"}
                      target="_blank"
                      className="inline-flex rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                    >
                      Open Profile
                    </Link>
                    <a
                      href={qrCodeUrl}
                      download={`vaiket-${listing.public_username}-qr.png`}
                      className="inline-flex rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Download QR
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-base font-bold text-slate-900">Latest Enquiries</h2>
              <Link
                href="/business/dashboard/enquiries"
                className="text-xs font-semibold text-cyan-700 hover:underline"
              >
                Open enquiry inbox
              </Link>
            </div>
            {(recentEnquiries ?? []).length === 0 ? (
              <p className="text-sm text-slate-500">
                No enquiries yet. Share your public profile URL to start receiving leads.
              </p>
            ) : (
              <div className="space-y-2">
                {(recentEnquiries ?? []).map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.customer_name} | {item.customer_phone}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.service_name || "General enquiry"} | {formatDateTime(item.created_at)}
                      </p>
                    </div>
                    <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                      {item.status || "new"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-2 inline-flex rounded-lg bg-cyan-100 p-2 text-cyan-700">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-1 text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}
