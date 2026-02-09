"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Shield, CreditCard, Zap, Building2 } from "lucide-react";

/* ================= GLOBAL ================= */
declare global {
  interface Window {
    Razorpay: any;
  }
}

/* ================= CONFIG ================= */
const GST_RATE = 0.18;

const SERVICES = [
  { id: "email", title: "AI Email Automation", price: 499, icon: "📧" },
  { id: "whatsapp", title: "WhatsApp Automation", price: 2999, icon: "💬" },
  { id: "website", title: "Website Development", price: 4999, icon: "🌐" },
  { id: "sms", title: "SMS & RCS", price: 999, icon: "📱" },
  { id: "marketing", title: "Digital Marketing", price: 2999, icon: "📈" },
  { id: "crm", title: "CRM & Lead Management", price: 1999, icon: "👥" },
];

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

/* ================= RAZORPAY LOADER (IMPORTANT) ================= */
const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function RecommendedPlanPage() {
  const router = useRouter();
  const params = useSearchParams();
  const leadId = params.get("lead_id");

  const [lead, setLead] = useState<Lead | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  /* ================= FETCH LEAD ================= */
  useEffect(() => {
    if (!leadId) return;

    fetch("/api/leads/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lead_id: leadId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setLead(data.lead);
      })
      .catch(console.error);
  }, [leadId]);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  /* ================= HELPERS ================= */
  const toggleService = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedServices = SERVICES.filter((s) =>
    selected.includes(s.id)
  );

  const subtotal = selectedServices.reduce(
    (sum, s) => sum + s.price,
    0
  );
  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + gst;

  /* ================= PAY NOW ================= */
  const payNow = async () => {
    if (!leadId || selectedServices.length === 0) {
      alert("Please select at least one service");
      return;
    }

    setLoading(true);

    try {
      /* 1️⃣ CREATE ORDER */
      const startRes = await fetch("/api/checkout/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: leadId,
          services: selectedServices.map((s) => s.id),
          subtotal,
          gst,
          total,
        }),
      });

      const startData = await startRes.json();
      if (!startData.success) throw new Error("Order creation failed");

      /* 2️⃣ LOAD RAZORPAY (CRITICAL FIX) */
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        alert("Razorpay SDK failed to load");
        return;
      }

      /* 3️⃣ OPEN RAZORPAY */
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
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

        handler: async function (response: any) {
          alert("RAZORPAY HANDLER CALLED ✅");

          await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              order_id: startData.order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          alert("Payment Successful 🎉");
          router.push("/thank-you");
        },

        modal: {
          ondismiss: function () {
            alert("Payment cancelled");
          },
        },

        theme: { color: "#000000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GUARD ================= */
  if (!leadId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Invalid Session</h2>
          <p className="text-gray-600 mb-6">Please restart the onboarding process</p>
          <button
            onClick={() => router.push("/get-started")}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            Restart Onboarding
          </button>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Custom Growth Plan
              </h1>
              <p className="text-gray-600">
                Select the services you need to grow your business
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live prices</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services Grid - Left Column */}
          <div className="lg:col-span-2">
            {/* Trust Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-8 transform transition-all duration-500 hover:shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Secure Checkout</h3>
                  <p className="text-gray-700 text-sm">
                    All payments are encrypted and secure. 256-bit SSL encryption with Razorpay.
                  </p>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div 
              className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 transition-all duration-700 ${
                pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {SERVICES.map((service, index) => {
                const active = selected.includes(service.id);
                return (
                  <div
                    key={service.id}
                    className={`relative border-2 rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${
                      active 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => toggleService(service.id)}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: pageLoaded ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
                    }}
                  >
                    {active && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center animate-bounce">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                    
                    <div className="text-3xl mb-4">{service.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">{service.title}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-2xl font-bold text-gray-900">₹{service.price}</span>
                      <span className="text-gray-500 text-sm ml-2">/month</span>
                    </div>
                    
                    <div className={`py-3 px-4 rounded-xl text-center font-medium transition-all duration-300 ${
                      active 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      {active ? "Selected ✓" : "Add to Plan"}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payment Summary Card */}
            {selectedServices.length > 0 && (
              <div className={`bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg transform transition-all duration-500 ${
                pageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium">₹{gst}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total Payable</span>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">₹{total}</div>
                        <div className="text-sm text-gray-500">Inclusive of all taxes</div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={payNow}
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed ${
                    loading ? 'animate-pulse' : ''
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Processing Payment...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <CreditCard className="mr-3 w-5 h-5" />
                      Pay Now • ₹{total}
                    </span>
                  )}
                </button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    By proceeding, you agree to our Terms & Privacy Policy
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Customer Details & Selection Summary - Right Column */}
          <div className="space-y-8">
            {/* Customer Details Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Customer Details</h3>
              </div>

              {lead ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">Full Name</div>
                    <div className="font-medium text-gray-900">{lead.name}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">Email Address</div>
                    <div className="font-medium text-gray-900">{lead.email}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">Phone Number</div>
                    <div className="font-medium text-gray-900">{lead.phone}</div>
                  </div>
                </div>
              ) : (
                <div className="animate-pulse space-y-4">
                  <div className="bg-gray-200 h-12 rounded-xl"></div>
                  <div className="bg-gray-200 h-12 rounded-xl"></div>
                  <div className="bg-gray-200 h-12 rounded-xl"></div>
                </div>
              )}
            </div>

            {/* Selected Services Summary */}
            {selectedServices.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Selected Services</h3>
                  <span className="ml-auto bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                    {selectedServices.length} services
                  </span>
                </div>

                <div className="space-y-4">
                  {selectedServices.map((service) => (
                    <div 
                      key={service.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{service.icon}</span>
                        <span className="font-medium text-gray-900">{service.title}</span>
                      </div>
                      <span className="font-bold text-gray-900">₹{service.price}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">₹{total}</div>
                      <div className="text-xs text-gray-500">monthly</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Security */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6">
              <div className="text-center">
                <div className="flex justify-center space-x-4 mb-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Secure Payment</h4>
                <p className="text-sm text-gray-600">
                  Powered by Razorpay. Your payment information is encrypted and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      {selectedServices.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Payable</div>
              <div className="text-2xl font-bold text-gray-900">₹{total}</div>
            </div>
            <button
              onClick={payNow}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}