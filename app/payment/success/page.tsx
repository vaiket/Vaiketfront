"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      const params = Object.fromEntries([...searchParams.entries()]);
      
      const res = await fetch("/api/payu/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("🎉 Payment Successful! Subscription Activated.");
      } else {
        setMessage("⚠ Payment verification failed. Contact support.");
      }

      setLoading(false);
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div style={{ padding: 50, textAlign: "center", color: "white" }}>
      <h1>{loading ? "Verifying..." : message}</h1>
      <a href="/" style={{ marginTop: 20, display: "inline-block", color: "#4ade80" }}>
        Go to Home →
      </a>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div style={{ color: "white", padding: 50 }}>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
