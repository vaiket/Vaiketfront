"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Manrope, Sora } from "next/font/google";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  CreditCard,
  Globe,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const headingFont = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type ServiceId =
  | "email"
  | "whatsapp"
  | "website"
  | "sms"
  | "marketing"
  | "crm";

type Service = {
  id: ServiceId;
  title: string;
  description: string;
  price: number;
  icon: React.ComponentType<{ className?: string }>;
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

const GST_RATE = 0.18;

const SERVICES: Service[] = [
  {
    id: "email",
    title: "AI Email Automation",
    description: "Smart replies, routing, and response workflows.",
    price: 499,
    icon: Mail,
  },
  {
    id: "whatsapp",
    title: "WhatsApp Automation",
    description: "Automate customer journeys on WhatsApp.",
    price: 2999,
    icon: MessageSquare,
  },
  {
    id: "website",
    title: "Website Development",
    description: "Fast, conversion-ready business website.",
    price: 4999,
    icon: Globe,
  },
  {
    id: "sms",
    title: "SMS and RCS",
    description: "Reliable campaigns for reach and reminders.",
    price: 999,
    icon: RadioTower,
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description: "Lead generation and growth campaigns.",
    price: 2999,
    icon: Sparkles,
  },
  {
    id: "crm",
    title: "CRM and Lead Management",
    description: "Centralized pipeline and follow-up tracking.",
    price: 1999,
    icon: Users,
  },
];

const formatInr = (value: number) => `Rs. ${value.toLocaleString("en-IN")}`;

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

export default function RecommendedPlanClient() {
  const router = useRouter();
  const params = useSearchParams();
  const leadId = params.get("lead_id");

  const [lead, setLead] = useState<Lead | null>(null);
  const [selected, setSelected] = useState<ServiceId[]>([]);
  const [leadLoading, setLeadLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (!leadId) {
      setLeadLoading(false);
      return;
    }

    const fetchLead = async () => {
      try {
        const res = await fetch("/api/leads/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lead_id: leadId }),
        });

        const data = await res.json();
        if (res.ok && data?.success && data?.lead) {
          setLead(data.lead as Lead);
        }
      } catch {
        setError("Could not load customer details. You can still continue.");
      } finally {
        setLeadLoading(false);
      }
    };

    void fetchLead();
  }, [leadId]);

  const selectedServices = useMemo(
    () => SERVICES.filter((service) => selected.includes(service.id)),
    [selected]
  );

  const subtotal = useMemo(
    () => selectedServices.reduce((sum, service) => sum + service.price, 0),
    [selectedServices]
  );

  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + gst;

  const toggleService = (id: ServiceId) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const payNow = async () => {
    setError("");
    setInfo("");

    if (!leadId) {
      setError("Session expired. Please restart onboarding.");
      return;
    }

    if (selectedServices.length === 0) {
      setError("Select at least one service to continue.");
      return;
    }

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      setError("Payment is not configured yet. Please contact support.");
      return;
    }

    setPaymentLoading(true);

    try {
      const startRes = await fetch("/api/checkout/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: leadId,
          services: selectedServices.map((service) => service.id),
          subtotal,
          gst,
          total,
        }),
      });

      const startData = await startRes.json();
      if (!startRes.ok || !startData?.success) {
        throw new Error("Order creation failed");
      }

      const razorpayLoaded = await loadRazorpay();
      const Razorpay = getRazorpayConstructor();
      if (!razorpayLoaded || !Razorpay) {
        throw new Error("Unable to load payment gateway");
      }

      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: startData.amount,
        currency: "INR",
        name: "Vaiket",
        description: "Custom Service Plan",
        order_id: startData.razorpay_order_id,
        prefill: {
          name: lead?.name,
          email: lead?.email,
          contact: lead?.phone,
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: startData.order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData?.success) {
              throw new Error("Payment verification failed");
            }

            router.push("/thank-you");
          } catch {
            setError("Payment received but verification failed. Contact support.");
          }
        },
        modal: {
          ondismiss: () => {
            setInfo("Payment cancelled. You can continue when ready.");
          },
        },
        theme: {
          color: "#0f172a",
        },
      };

      const instance = new Razorpay(options);
      instance.open();
    } catch {
      setError("Payment failed. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (!leadId) {
    return (
      <main
        className={`${bodyFont.className} min-h-screen bg-[#0b1220] px-4 py-10 text-slate-100 sm:px-6`}
      >
        <div className="mx-auto max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
          <h1 className={`${headingFont.className} text-3xl font-extrabold text-white`}>
            Invalid session
          </h1>
          <p className="mt-3 text-slate-300">
            We could not find your onboarding details.
          </p>
          <button
            onClick={() => router.push("/get-started")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-400"
          >
            Restart onboarding
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`${bodyFont.className} relative min-h-screen overflow-hidden bg-[#0b1220] text-slate-100`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.24),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.2),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.15),_transparent_35%)]" />

      <section className="relative mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-3 py-2 transition hover:border-cyan-300/60 hover:bg-white/15"
              aria-label="Vaiket Home"
            >
              <Image
                src="/logo/vaiket-premium.svg"
                alt="Vaiket"
                width={520}
                height={140}
                priority
                className="h-12 w-auto sm:h-14"
              />
              <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 sm:inline">
                Recommended Plan
              </span>
            </Link>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-cyan-300/70 hover:text-cyan-200 sm:text-sm"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to onboarding
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            Trusted and secure checkout
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Recommended Plan
            </p>
            <h1 className={`${headingFont.className} mt-2 text-3xl font-extrabold text-white sm:text-4xl`}>
              Choose your growth services
            </h1>
            <p className="mt-2 text-slate-300">
              Pick the services you need now. You can always add more later.
            </p>
          </div>

          {lead && (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              For <span className="font-bold text-white">{lead.name}</span>
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] xl:gap-8">
          <div className="space-y-5">
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
              Prices shown are monthly. Taxes are calculated at checkout.
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {SERVICES.map((service) => {
                const active = selected.includes(service.id);
                const Icon = service.icon;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`group relative rounded-2xl border p-5 text-left transition ${
                      active
                        ? "border-cyan-400 bg-cyan-400/10 shadow-[0_12px_40px_-24px_rgba(34,211,238,0.9)]"
                        : "border-white/10 bg-white/5 hover:border-cyan-300/70 hover:bg-white/10"
                    }`}
                  >
                    {active && (
                      <span className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-slate-900">
                        <Check className="h-4 w-4" />
                      </span>
                    )}

                    <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-white/10 p-2.5">
                      <Icon className="h-5 w-5 text-cyan-200" />
                    </div>

                    <h3 className="text-base font-extrabold text-white">{service.title}</h3>
                    <p className="mt-2 min-h-10 text-sm text-slate-300">{service.description}</p>

                    <div className="mt-4 flex items-end justify-between gap-2">
                      <div>
                        <p className="text-xl font-extrabold text-white">{formatInr(service.price)}</p>
                        <p className="text-xs font-semibold text-slate-400">per month</p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          active
                            ? "bg-cyan-300 text-slate-900"
                            : "bg-white/10 text-slate-200"
                        }`}
                      >
                        {active ? "Selected" : "Select"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-2xl border border-white/10 bg-white/95 p-5 text-slate-900">
              <div className="mb-3 flex items-center justify-between">
                <h2 className={`${headingFont.className} text-lg font-extrabold`}>
                  Billing summary
                </h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                  {selectedServices.length} selected
                </span>
              </div>

              {selectedServices.length === 0 ? (
                <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-4 text-sm text-slate-500">
                  Select services from the left to build your plan.
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-start justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5"
                    >
                      <p className="text-sm font-semibold text-slate-700">{service.title}</p>
                      <p className="text-sm font-bold text-slate-900">{formatInr(service.price)}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatInr(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-slate-900">{formatInr(gst)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-extrabold text-slate-900">
                  <span>Total</span>
                  <span>{formatInr(total)}</span>
                </div>
              </div>

              <button
                onClick={payNow}
                disabled={paymentLoading || selectedServices.length === 0}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {paymentLoading ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4.5 w-4.5" />
                    Pay now {selectedServices.length > 0 ? `- ${formatInr(total)}` : ""}
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-xs font-semibold text-slate-500">
                Secure checkout powered by Razorpay
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <h3 className="mb-2 text-sm font-bold text-white">Customer details</h3>

              {leadLoading ? (
                <p className="text-slate-300">Loading details...</p>
              ) : lead ? (
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold text-slate-400">Name:</span> {lead.name}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-400">Email:</span> {lead.email}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-400">Phone:</span> {lead.phone}
                  </p>
                </div>
              ) : (
                <p className="text-slate-300">Details unavailable</p>
              )}
            </div>

            <div className="rounded-2xl border border-emerald-300/25 bg-emerald-300/10 p-4 text-sm text-emerald-100">
              <p className="inline-flex items-center gap-2 font-semibold">
                <Lock className="h-4 w-4" />
                Your payment data is encrypted end-to-end.
              </p>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-300/35 bg-red-300/10 px-4 py-3 text-sm font-semibold text-red-100">
                {error}
              </div>
            )}

            {info && (
              <div className="rounded-2xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100">
                {info}
              </div>
            )}
          </aside>
        </div>
      </section>

      {selectedServices.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/15 bg-slate-950/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate-300">Total payable</p>
              <p className="text-lg font-extrabold text-white">{formatInr(total)}</p>
            </div>
            <button
              onClick={payNow}
              disabled={paymentLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-extrabold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
            >
              {paymentLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  Pay now
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
