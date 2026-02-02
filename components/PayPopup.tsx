"use client";

import { useState, useEffect, useRef } from "react";

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
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  const isValid =
    form.name.length >= 3 &&
    form.email.includes("@") &&
    form.phone.length >= 10;

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-gray-900 text-white w-[380px] rounded-xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4">{planName}</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-3 p-3 rounded bg-gray-800"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 rounded bg-gray-800"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="tel"
          placeholder="Phone"
          className="w-full mb-4 p-3 rounded bg-gray-800"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400">Total</span>
          <span className="text-lg font-bold text-green-400">
            ₹{amount}
          </span>
        </div>

        <button
          onClick={handlePay}
          disabled={!isValid || loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            isValid
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
