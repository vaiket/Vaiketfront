"use client";

import { useState, useEffect, useRef } from "react";
import { 
  IndianRupee, Lock, CheckCircle, X,
  AlertCircle, Phone, User, Mail, Loader2
} from "lucide-react";

interface PayPopupProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  planName: string;
}

export default function PayPopup({
  isOpen,
  onClose,
  amount,
  planName,
}: PayPopupProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Handle modal open/close with animation
  useEffect(() => {
    if (isOpen) {
      // Show modal after a tiny delay to trigger animation
      setTimeout(() => setShowModal(true), 10);
      document.body.style.overflow = 'hidden';
      
      // Focus on first input when modal opens
      setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 300);
    } else {
      setShowModal(false);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Close handlers
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleEsc);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handlePay = async () => {
    if (!isValid || loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/payu/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          amount,
          plan: planName,
        }),
      });

      const data = await res.json();

      if (!data?.actionUrl) {
        alert("Payment initialization failed");
        return;
      }

      // Create PayU Form
      const payForm = document.createElement("form");
      payForm.method = "POST";
      payForm.action = data.actionUrl;

      Object.entries(data.params).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        payForm.appendChild(input);
      });

      document.body.appendChild(payForm);
      payForm.submit();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen && !showModal) return null;

  const isValid = 
    form.name.length >= 3 &&
    form.email.includes('@') &&
    form.phone.length >= 10;

  return (
    <>
      {/* Blurred Background Overlay - 25% blur */}
      <div className={`fixed inset-0 bg-black/30 backdrop-blur-md z-50 p-4 font-sans flex items-center justify-center transition-all duration-300 ${
        showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div
          ref={modalRef}
          className={`
            bg-white w-full max-w-md rounded-xl shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto
            transform transition-all duration-260 ease-custom
            ${showModal ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-98'}
            relative z-50
          `}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 sticky top-0 bg-white border-b border-gray-100 z-10">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="text-2xl font-bold text-[#1a237e]">Payment Details</h1>
                <div className="w-12 h-1 bg-blue-600 mt-3"></div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors"
                aria-label="Close payment modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 text-sm mt-6">Complete your payment securely</p>
          </div>

          {/* Form Container */}
          <div className="px-6 py-6 space-y-6">
            {/* Amount Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <IndianRupee className="w-5 h-5 text-blue-600" />
                </div>
                <input
                  type="text"
                  disabled
                  value={`₹ ${amount.toFixed(2)}`}
                  className="w-full p-4 pl-12 rounded-lg border border-blue-200 bg-blue-50 text-gray-900 font-medium text-lg cursor-not-allowed"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <input
                  ref={firstInputRef}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  onBlur={() => handleBlur('email')}
                  className={`w-full p-4 rounded-lg border ${touched.email && !form.email.includes('@') ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
                />
                {touched.email && !form.email.includes('@') && (
                  <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                )}
                {form.email.includes('@') && (
                  <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {touched.email && !form.email.includes('@') && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span>This field is required</span>
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={(e) => setForm({...form, phone: e.target.value.replace(/\D/g, '')})}
                  onBlur={() => handleBlur('phone')}
                  className={`w-full p-4 rounded-lg border ${touched.phone && form.phone.length < 10 ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
                  maxLength={10}
                />
                {touched.phone && form.phone.length < 10 && (
                  <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                )}
                {form.phone.length >= 10 && (
                  <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {touched.phone && form.phone.length < 10 && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span>This field is required</span>
                </p>
              )}
            </div>

            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  onBlur={() => handleBlur('name')}
                  className={`w-full p-4 rounded-lg border ${touched.name && form.name.length < 3 ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
                />
                {touched.name && form.name.length < 3 && (
                  <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                )}
                {form.name.length >= 3 && (
                  <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {touched.name && form.name.length < 3 && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span>This field is required</span>
                </p>
              )}
            </div>

            {/* Payment Method Icons - Razorpay Image (35% smaller) */}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <div className="text-center">
                <img 
                  src="https://cdn.razorpay.com/static/assets/pay_methods_branding.png" 
                  alt="Accepted Payment Methods: UPI, VISA, RuPay, Mastercard"
                  className="h-8 w-auto mx-auto object-contain" // 35% smaller (was h-12)
                  loading="lazy"
                />
              </div>
            </div>

            {/* Pay Button */}
            <div className="pt-6">
              <button
                onClick={handlePay}
                disabled={!isValid || loading}
                className={`w-full py-4 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center gap-3 ${
                  isValid && !loading
                    ? "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Pay ₹{amount.toFixed(2)}
                  </>
                )}
              </button>
            </div>

            {/* Security Footer */}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>Secure payment powered by</span>
                <span className="font-semibold text-blue-600">PayU</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}