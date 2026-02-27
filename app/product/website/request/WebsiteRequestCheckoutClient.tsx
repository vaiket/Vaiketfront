"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  calculateWebsiteQuote,
  formatInr,
  isWebsitePlanId,
  WEBSITE_ADDON_CATALOG,
  WEBSITE_GOAL_OPTIONS,
  WEBSITE_PLAN_CATALOG,
  WEBSITE_STATUS_OPTIONS,
  type WebsiteAddonId,
  type WebsitePlanId,
} from "@/lib/website-request";

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
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
  theme?: {
    color?: string;
  };
};

type RazorpayInstance = {
  open: () => void;
};

type RazorpayConstructor = new (options: RazorpayOptions) => RazorpayInstance;

const getRazorpayConstructor = () =>
  (window as Window & { Razorpay?: RazorpayConstructor }).Razorpay;

type FormState = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  businessName: string;
  websiteStatus: string;
  goals: string[];
  addOns: WebsiteAddonId[];
  pagesNeeded: string;
  notes: string;
};

const CHECKOUT_PLANS = (Object.keys(WEBSITE_PLAN_CATALOG) as WebsitePlanId[]).filter(
  (planId) => WEBSITE_PLAN_CATALOG[planId].paymentEnabled
);

const ADDON_IDS = Object.keys(WEBSITE_ADDON_CATALOG) as WebsiteAddonId[];

const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if (getRazorpayConstructor()) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

function toggleString(values: string[], target: string) {
  if (values.includes(target)) {
    return values.filter((value) => value !== target);
  }
  return [...values, target];
}

function toggleAddon(values: WebsiteAddonId[], target: WebsiteAddonId) {
  if (values.includes(target)) {
    return values.filter((value) => value !== target);
  }
  return [...values, target];
}

export default function WebsiteRequestCheckoutClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<WebsitePlanId>("starter");
  const [form, setForm] = useState<FormState>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    businessName: "",
    websiteStatus: "",
    goals: [],
    addOns: [],
    pagesNeeded: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    const rawPlan = String(searchParams.get("plan") ?? "").toLowerCase();
    if (!isWebsitePlanId(rawPlan)) return;
    if (!WEBSITE_PLAN_CATALOG[rawPlan].paymentEnabled) return;
    setPlan(rawPlan);
  }, [searchParams]);

  const quote = useMemo(() => calculateWebsiteQuote(plan, form.addOns), [plan, form.addOns]);

  const selectedPlan = WEBSITE_PLAN_CATALOG[plan];

  const submitCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setInfo("");

    if (!form.websiteStatus) {
      setError("Please select your website status.");
      return;
    }

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      setError("Payment is not configured yet. Please contact support.");
      return;
    }

    setSubmitting(true);
    let createdOrderId = "";

    try {
      const startResponse = await fetch("/api/website-requests/start-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          customerPhone: form.customerPhone,
          businessName: form.businessName,
          websiteStatus: form.websiteStatus,
          goals: form.goals,
          addOns: form.addOns,
          pagesNeeded: form.pagesNeeded,
          notes: form.notes,
        }),
      });

      const startData = await startResponse.json();
      if (!startResponse.ok || !startData?.success) {
        throw new Error(startData?.error || "Could not start checkout.");
      }

      createdOrderId = String(startData.order_id);

      const razorpayLoaded = await loadRazorpay();
      const Razorpay = getRazorpayConstructor();
      if (!razorpayLoaded || !Razorpay) {
        throw new Error("Unable to load Razorpay checkout.");
      }

      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: Number(startData.amount),
        currency: String(startData.currency || "INR"),
        name: "Vaiket",
        description: `${selectedPlan.label} - Website Package`,
        order_id: String(startData.razorpay_order_id),
        prefill: {
          name: form.customerName,
          email: form.customerEmail,
          contact: form.customerPhone,
        },
        handler: async (response) => {
          setVerifying(true);
          setError("");
          setInfo("");
          try {
            const verifyResponse = await fetch("/api/website-requests/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: startData.order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            if (!verifyResponse.ok || !verifyData?.success) {
              throw new Error(verifyData?.error || "Payment verification failed.");
            }

            const orderNo = encodeURIComponent(
              String(verifyData.order_no || startData.order_no || "")
            );
            const requestNo = encodeURIComponent(String(startData.request_no || ""));
            router.push(`/product/website/request/success?order_no=${orderNo}&request_no=${requestNo}`);
          } catch {
            setError("Payment captured but verification failed. Please contact support.");
            await fetch("/api/website-requests/checkout-event", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: startData.order_id,
                event: "failed",
                reason: "Verification failed on callback",
              }),
            });
          } finally {
            setVerifying(false);
          }
        },
        modal: {
          ondismiss: () => {
            setInfo("Checkout closed. Your request is saved as pending in admin panel.");
            void fetch("/api/website-requests/checkout-event", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: startData.order_id,
                event: "dismissed",
                reason: "Customer closed payment modal",
              }),
            });
          },
        },
        theme: { color: "#0f172a" },
      };

      const payment = new Razorpay(options);
      payment.open();
    } catch (checkoutError) {
      const message =
        checkoutError instanceof Error ? checkoutError.message : "Checkout failed. Please retry.";
      setError(message);

      if (createdOrderId) {
        void fetch("/api/website-requests/checkout-event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: createdOrderId,
            event: "failed",
            reason: message,
          }),
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-4 py-14 md:px-6 md:py-16">
        <div className="pointer-events-none absolute -left-20 -top-10 h-64 w-64 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-1.5 text-xs font-semibold text-cyan-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Website Request Checkout
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Start your website project and secure your slot today
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Submit your project details, choose your package, and pay securely through Razorpay.
              Your order number and latest payment status will be tracked in Vaiket admin.
            </p>

            <div className="mt-6 space-y-2.5">
              {[
                "Plan pricing is one-time project fee",
                "GST is automatically calculated at checkout",
                "Extra scope is handled via separate approved quotation",
              ].map((point) => (
                <div
                  key={point}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {point}
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.55)]">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current selection</p>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">{selectedPlan.label}</h2>
            <p className="mt-1 text-sm text-slate-600">
              {selectedPlan.pages} | Delivery: {selectedPlan.delivery}
            </p>

            <div className="mt-5 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Estimated total</p>
              <p className="mt-1 text-3xl font-extrabold text-slate-900">{formatInr(quote.total)}</p>
              <p className="text-xs text-slate-600">Includes GST</p>
            </div>

            <div className="mt-4 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>Base package</span>
                <span className="font-semibold text-slate-900">{formatInr(quote.basePrice)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Add-ons</span>
                <span className="font-semibold text-slate-900">{formatInr(quote.addOnAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>GST (18%)</span>
                <span className="font-semibold text-slate-900">{formatInr(quote.gst)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-extrabold text-slate-900">
                <span>Total payable</span>
                <span>{formatInr(quote.total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-10 md:px-6 md:py-14">
        <form onSubmit={submitCheckout} className="mx-auto grid w-full max-w-6xl gap-7 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-bold text-slate-900">1. Select your package</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {CHECKOUT_PLANS.map((planId) => {
                  const config = WEBSITE_PLAN_CATALOG[planId];
                  const active = planId === plan;
                  return (
                    <button
                      key={planId}
                      type="button"
                      onClick={() => setPlan(planId)}
                      className={`rounded-xl border p-4 text-left transition ${
                        active
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-300 bg-white text-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <p className="text-sm font-semibold">{config.label}</p>
                      <p className={`mt-1 text-2xl font-extrabold ${active ? "text-cyan-200" : "text-slate-900"}`}>
                        {formatInr(config.basePrice)}
                      </p>
                      <p className={`mt-1 text-xs ${active ? "text-slate-200" : "text-slate-600"}`}>
                        {config.pages} | {config.delivery}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                Need Enterprise scope?{" "}
                <Link href="/product/website/custom" className="font-semibold underline">
                  Request custom quote
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-bold text-slate-900">2. Business details</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  required
                  value={form.customerName}
                  onChange={(event) => setForm((prev) => ({ ...prev, customerName: event.target.value }))}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
                <input
                  required
                  type="email"
                  value={form.customerEmail}
                  onChange={(event) => setForm((prev) => ({ ...prev, customerEmail: event.target.value }))}
                  placeholder="Work email"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
                <input
                  required
                  value={form.customerPhone}
                  onChange={(event) => setForm((prev) => ({ ...prev, customerPhone: event.target.value }))}
                  placeholder="Phone number"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
                <input
                  value={form.businessName}
                  onChange={(event) => setForm((prev) => ({ ...prev, businessName: event.target.value }))}
                  placeholder="Business name (optional)"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
              </div>

              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-slate-700">Current website status</p>
                <div className="grid gap-2">
                  {WEBSITE_STATUS_OPTIONS.map((status) => (
                    <label
                      key={status}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                        form.websiteStatus === status
                          ? "border-cyan-500 bg-cyan-50"
                          : "border-slate-300 hover:border-cyan-300 hover:bg-cyan-50/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="website_status"
                        checked={form.websiteStatus === status}
                        onChange={() => setForm((prev) => ({ ...prev, websiteStatus: status }))}
                      />
                      {status}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-bold text-slate-900">3. Project scope and add-ons</h2>

              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-slate-700">Main goals</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {WEBSITE_GOAL_OPTIONS.map((goal) => (
                    <label
                      key={goal}
                      className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                        form.goals.includes(goal)
                          ? "border-emerald-400 bg-emerald-50"
                          : "border-slate-300 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.goals.includes(goal)}
                        onChange={() =>
                          setForm((prev) => ({ ...prev, goals: toggleString(prev.goals, goal) }))
                        }
                      />
                      <span>{goal}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-slate-700">Optional add-ons</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {ADDON_IDS.map((addOnId) => {
                    const addOn = WEBSITE_ADDON_CATALOG[addOnId];
                    return (
                      <label
                        key={addOnId}
                        className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 transition ${
                          form.addOns.includes(addOnId)
                            ? "border-amber-400 bg-amber-50"
                            : "border-slate-300 hover:border-amber-300 hover:bg-amber-50/50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.addOns.includes(addOnId)}
                          onChange={() =>
                            setForm((prev) => ({
                              ...prev,
                              addOns: toggleAddon(prev.addOns, addOnId),
                            }))
                          }
                        />
                        <span>
                          <span className="block text-sm font-semibold text-slate-800">{addOn.label}</span>
                          <span className="block text-xs text-slate-600">{addOn.description}</span>
                          <span className="block text-xs font-semibold text-slate-900">
                            +{formatInr(addOn.price)}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  value={form.pagesNeeded}
                  onChange={(event) => setForm((prev) => ({ ...prev, pagesNeeded: event.target.value }))}
                  placeholder="Approx pages needed (optional)"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
                <input
                  value={form.notes}
                  onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                  placeholder="Any special notes (optional)"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
              </div>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 lg:h-fit">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Checkout summary</h2>
              <p className="mt-1 text-sm text-slate-600">{selectedPlan.label}</p>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Package</span>
                  <span className="font-semibold text-slate-900">{formatInr(quote.basePrice)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Add-ons</span>
                  <span className="font-semibold text-slate-900">{formatInr(quote.addOnAmount)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>GST</span>
                  <span className="font-semibold text-slate-900">{formatInr(quote.gst)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-extrabold text-slate-900">
                  <span>Total</span>
                  <span>{formatInr(quote.total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || verifying}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting || verifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {verifying ? "Verifying payment..." : "Starting checkout..."}
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Proceed to secure payment
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure checkout powered by Razorpay
              </p>
            </div>

            {error && (
              <div className="rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {error}
              </div>
            )}

            {info && (
              <div className="rounded-xl border border-cyan-300 bg-cyan-50 px-3 py-2 text-sm text-cyan-800">
                {info}
              </div>
            )}
          </aside>
        </form>
      </section>
    </main>
  );
}
