// components/PayPopup.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface PayPopupProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  planName: string;
}

export default function PayPopup({ isOpen, onClose, amount, planName }: PayPopupProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    phone: "",
    name: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const isValid =
    form.email.includes("@") &&
    form.phone.length >= 10 &&
    form.name.trim().length >= 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePay = async () => {
    if (!isValid) return;
    setLoading(true);

    try {
      const res = await fetch("/api/payu/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: amount,
          plan: planName,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!data.actionUrl) {
        console.error("No action URL received");
        return;
      }

      const payForm = document.createElement("form");
      payForm.method = "POST";
      payForm.action = data.actionUrl;

      Object.keys(data.params).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data.params[key];
        payForm.appendChild(input);
      });

      document.body.appendChild(payForm);
      payForm.submit();
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
    }
  };

  // Reset form when popup closes
  useEffect(() => {
    if (!isOpen) {
      setForm({ email: "", phone: "", name: "" });
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-gradient-to-br from-gray-900 to-black w-full max-w-md rounded-3xl shadow-2xl text-white border border-gray-700 overflow-hidden animate-modal-in"
      >
        {/* Enhanced Header with Gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse delay-1000" />
          
          <div className="relative z-10 flex items-center space-x-4">
            <button
              onClick={onClose}
              className="text-white/90 hover:text-white transition-all duration-300 transform hover:scale-110 p-2 hover:bg-white/10 rounded-full"
              aria-label="Close form"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg animate-bounce-slow flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AI</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{planName}</h2>
                <p className="text-white/80 text-sm">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Inputs with Enhanced Design */}
        <div className="p-8 space-y-6 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
          {/* Email Field */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-300 mb-2 ml-1 transition-all duration-300 group-focus-within:text-purple-400">
              Email *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-gray-800 border-2 border-gray-700 rounded-2xl outline-none placeholder-gray-500 text-white focus:border-purple-500 transition-all duration-300 transform focus:scale-[1.02] shadow-lg"
                required
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-focus-within:opacity-100 -z-10 blur-md transition-opacity duration-300" />
            </div>
          </div>

          {/* Phone Field */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-300 mb-2 ml-1 transition-all duration-300 group-focus-within:text-purple-400">
              Phone *
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-gray-800 border-2 border-gray-700 rounded-2xl outline-none placeholder-gray-500 text-white focus:border-purple-500 transition-all duration-300 transform focus:scale-[1.02] shadow-lg"
                required
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-focus-within:opacity-100 -z-10 blur-md transition-opacity duration-300" />
            </div>
          </div>

          {/* Name Field */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-300 mb-2 ml-1 transition-all duration-300 group-focus-within:text-purple-400">
              Name *
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-gray-800 border-2 border-gray-700 rounded-2xl outline-none placeholder-gray-500 text-white focus:border-purple-500 transition-all duration-300 transform focus:scale-[1.02] shadow-lg"
                required
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-focus-within:opacity-100 -z-10 blur-md transition-opacity duration-300" />
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div className="flex justify-between items-center pt-6 mt-4 border-t border-gray-700">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">Total Amount</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                ₹{amount}
              </span>
            </div>

            <button
              onClick={handlePay}
              disabled={!isValid || loading}
              className={`relative px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transform transition-all duration-300 overflow-hidden group ${
                isValid && !loading
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:scale-105 text-white"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <span className="relative z-10 flex items-center">
                    Proceed to Pay
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </>
              )}
            </button>
          </div>

          {/* Security Badge */}
          <div className="text-center pt-4">
            <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>256-bit SSL Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations to Tailwind config */}
      <style jsx global>{`
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-modal-in {
          animation: modal-in 0.5s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
    </div>
  );
}