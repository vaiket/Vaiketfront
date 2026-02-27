"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2 } from "lucide-react";
import {
  BUSINESS_VERIFICATION_BASE_FEE,
  BUSINESS_VERIFICATION_GST,
  BUSINESS_VERIFICATION_TOTAL,
  formatInr,
} from "@/lib/business-identity";

type Listing = {
  id: string;
  business_name: string;
  status: string | null;
  payment_status: string | null;
};

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
  theme?: { color?: string };
};

type RazorpayInstance = { open: () => void };
type RazorpayConstructor = new (options: RazorpayOptions) => RazorpayInstance;

const getRazorpayConstructor = () =>
  (window as Window & { Razorpay?: RazorpayConstructor }).Razorpay;

const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if (getRazorpayConstructor()) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function BusinessVerificationPaymentClient({ listing }: { listing: Listing | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const payNow = async () => {
    setError("");
    setInfo("");

    if (!listing?.id) {
      setError("Create your listing first.");
      return;
    }

    if (listing.payment_status === "paid") {
      setInfo("Verification payment already completed.");
      return;
    }

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      setError("Payment is not configured.");
      return;
    }

    setLoading(true);
    try {
      const startRes = await fetch("/api/business/payment/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId: listing.id }),
      });
      const startData = await startRes.json();
      if (!startRes.ok || !startData?.success) {
        throw new Error(startData?.error || "Could not start payment.");
      }

      const loaded = await loadRazorpay();
      const Razorpay = getRazorpayConstructor();
      if (!loaded || !Razorpay) {
        throw new Error("Unable to load payment gateway.");
      }

      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: Number(startData.amount),
        currency: String(startData.currency || "INR"),
        name: "Vaiket Business Identity Program",
        description: "Business verification fee",
        order_id: String(startData.razorpay_order_id),
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/business/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                listingId: listing.id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData?.success) {
              throw new Error(verifyData?.error || "Payment verification failed.");
            }
            setInfo("Payment successful. Listing moved to pending review.");
            router.refresh();
          } catch (verifyError) {
            const message =
              verifyError instanceof Error
                ? verifyError.message
                : "Verification failed. Please contact support.";
            setError(message);
          }
        },
        modal: {
          ondismiss: async () => {
            setInfo("Payment cancelled. You can retry anytime.");
            await fetch("/api/business/payment/fail", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                listingId: listing.id,
                razorpay_order_id: startData.razorpay_order_id,
                reason: "Payment dismissed by user",
              }),
            });
            router.refresh();
          },
        },
        theme: { color: "#0f172a" },
      };

      const instance = new Razorpay(options);
      instance.open();
    } catch (paymentError) {
      const message = paymentError instanceof Error ? paymentError.message : "Payment failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-xl font-bold text-slate-900">Verification Fee Payment</h2>
      <p className="mt-1 text-sm text-slate-600">
        Complete payment to move your listing into admin review queue.
      </p>

      <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Base fee</span>
          <span className="font-semibold text-slate-900">{formatInr(BUSINESS_VERIFICATION_BASE_FEE)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">GST (18%)</span>
          <span className="font-semibold text-slate-900">{formatInr(BUSINESS_VERIFICATION_GST)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-2">
          <span className="font-semibold text-slate-900">Total</span>
          <span className="text-lg font-extrabold text-slate-900">{formatInr(BUSINESS_VERIFICATION_TOTAL)}</span>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-700">
        <p>
          <span className="font-semibold">Current listing:</span>{" "}
          {listing?.business_name ?? "Not created"}
        </p>
        <p>
          <span className="font-semibold">Payment status:</span>{" "}
          {listing?.payment_status ?? "unpaid"}
        </p>
      </div>

      <button
        onClick={payNow}
        disabled={loading || !listing?.id}
        className="mt-5 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay {formatInr(BUSINESS_VERIFICATION_TOTAL)}
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}
      {info && (
        <div className="mt-4 rounded-lg border border-cyan-300 bg-cyan-50 px-3 py-2 text-sm text-cyan-800">
          {info}
        </div>
      )}
    </div>
  );
}
