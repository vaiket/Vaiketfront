import Link from "next/link";
import { requireBusinessSession } from "@/lib/business-guard";
import { supabase } from "@/lib/supabase";
import BusinessVerificationPaymentClient from "@/app/business/dashboard/(panel)/payment/BusinessVerificationPaymentClient";

export const dynamic = "force-dynamic";

export default async function BusinessDashboardPaymentPage() {
  const session = await requireBusinessSession();

  const { data: listing } = await supabase
    .from("business_listings")
    .select("id, business_name, status, payment_status, certificate_id")
    .eq("user_id", session.userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Verification Payment</h1>
      <p className="mt-1 text-sm text-slate-600">
        Pay Rs. 99 + GST to submit your listing for approval.
      </p>

      {!listing ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-700">
            You do not have a listing yet. Create your listing first.
          </p>
          <Link
            href="/business/dashboard/add"
            className="mt-3 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add Business Listing
          </Link>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <BusinessVerificationPaymentClient listing={listing} />

          {listing.payment_status === "paid" && (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Payment completed. Admin review is in progress.
              {listing.status === "approved" && listing.certificate_id ? (
                <>
                  {" "}
                  Your listing is approved.{" "}
                  <Link href="/business/dashboard/certificate" className="font-semibold underline">
                    Open certificate
                  </Link>
                  .
                </>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
