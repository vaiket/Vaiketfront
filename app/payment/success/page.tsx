"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
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
        setMessage("⚠ Failed to verify payment. Contact support.");
      }

      setLoading(false);
    };

    verifyPayment();
  }, []);

  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <h1>{loading ? "Verifying..." : message}</h1>
      <a href="/" style={{ marginTop: 20, display: "inline-block" }}>
        Go to Home →
      </a>
    </div>
  );
}
