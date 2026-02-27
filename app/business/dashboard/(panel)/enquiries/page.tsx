import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { requireBusinessSession } from "@/lib/business-guard";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type BusinessListingLite = {
  id: string;
  business_name: string;
  public_username: string | null;
};

type BusinessEnquiry = {
  id: string;
  listing_id: string;
  service_name: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  message: string | null;
  status: string;
  source: string | null;
  created_at: string;
};

function toTelUrl(phone: string) {
  const digits = String(phone ?? "").replace(/[^\d+]/g, "");
  return `tel:${digits || phone}`;
}

function toWhatsappUrl(phone: string) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (!digits) return "";
  return `https://wa.me/${digits}`;
}

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

function readableStatus(value: string | null | undefined) {
  return String(value || "new")
    .split("_")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function BusinessDashboardEnquiriesPage() {
  const session = await requireBusinessSession();

  const { data: listingRows } = await supabase
    .from("business_listings")
    .select("id, business_name, public_username")
    .eq("user_id", session.userId)
    .order("created_at", { ascending: false });

  const listings = (listingRows ?? []) as BusinessListingLite[];

  if (listings.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Enquiries</h1>
        <p className="mt-1 text-sm text-slate-600">
          Create your listing first. Public profile enquiries will appear here.
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

  const listingMap = new Map(listings.map((item) => [item.id, item]));
  const listingIds = listings.map((item) => item.id);

  const { data: enquiryRows } = await supabase
    .from("business_enquiries")
    .select(
      "id, listing_id, service_name, customer_name, customer_phone, customer_email, message, status, source, created_at"
    )
    .in("listing_id", listingIds)
    .order("created_at", { ascending: false })
    .limit(500);

  const enquiries = (enquiryRows ?? []) as BusinessEnquiry[];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const summary = {
    total: enquiries.length,
    newCount: enquiries.filter((item) => item.status === "new").length,
    todayCount: enquiries.filter((item) => new Date(item.created_at) >= today).length,
    respondedCount: enquiries.filter((item) => ["contacted", "resolved", "closed"].includes(item.status))
      .length,
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Enquiries</h1>
          <p className="mt-1 text-sm text-slate-600">
            Every quick enquiry from your public username page is tracked here.
          </p>
        </div>
        <Link
          href="/business/dashboard/add"
          className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Edit Listing
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Total Enquiries" value={String(summary.total)} />
        <SummaryCard label="New" value={String(summary.newCount)} />
        <SummaryCard label="Today" value={String(summary.todayCount)} />
        <SummaryCard label="Responded" value={String(summary.respondedCount)} />
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
          <MessageSquare className="h-4 w-4 text-cyan-700" />
          <h2 className="text-base font-bold text-slate-900">Latest Enquiry Inbox</h2>
        </div>

        {enquiries.length === 0 ? (
          <div className="px-4 py-5 text-sm text-slate-500">
            No enquiries yet. Share your public URL to start receiving leads.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2.5">Customer</th>
                  <th className="px-4 py-2.5">Contact</th>
                  <th className="px-4 py-2.5">Requirement</th>
                  <th className="px-4 py-2.5">Business</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5">Received</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((item) => {
                  const listing = listingMap.get(item.listing_id);
                  const whatsappUrl = toWhatsappUrl(item.customer_phone);
                  return (
                    <tr key={item.id} className="border-t border-slate-100 align-top">
                      <td className="px-4 py-2.5">
                        <p className="font-semibold text-slate-900">{item.customer_name}</p>
                        {item.customer_email ? (
                          <p className="text-xs text-slate-500">{item.customer_email}</p>
                        ) : null}
                      </td>
                      <td className="px-4 py-2.5">
                        <p className="font-medium text-slate-700">{item.customer_phone}</p>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          <a
                            href={toTelUrl(item.customer_phone)}
                            className="inline-flex rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            Call
                          </a>
                          {whatsappUrl ? (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 transition hover:bg-emerald-100"
                            >
                              WhatsApp
                            </a>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <p className="font-medium text-slate-800">{item.service_name || "General enquiry"}</p>
                        {item.message ? (
                          <p className="mt-0.5 max-w-xs text-xs text-slate-500">{item.message}</p>
                        ) : null}
                      </td>
                      <td className="px-4 py-2.5">
                        <p className="font-medium text-slate-800">
                          {listing?.business_name || "Your business"}
                        </p>
                        {listing?.public_username ? (
                          <p className="text-xs text-cyan-700">/{listing.public_username}</p>
                        ) : null}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex rounded-full bg-cyan-100 px-2 py-1 text-xs font-semibold text-cyan-700">
                          {readableStatus(item.status)}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-slate-600">
                        {formatDateTime(item.created_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-extrabold text-slate-900">{value}</p>
    </div>
  );
}
