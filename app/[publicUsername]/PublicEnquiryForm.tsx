"use client";

import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";

export default function PublicEnquiryForm({
  listingId,
  publicUsername,
  businessName,
  defaultServiceName = "",
}: {
  listingId: string;
  publicUsername: string;
  businessName: string;
  defaultServiceName?: string;
}) {
  const [serviceName, setServiceName] = useState(defaultServiceName);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/business/public-enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId,
          publicUsername,
          serviceName,
          name,
          phone,
          email,
          message,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not send enquiry.");
      }

      setSuccess(`Enquiry sent to ${businessName}. Team will contact you soon.`);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setServiceName("");
    } catch (submitError) {
      const msg = submitError instanceof Error ? submitError.message : "Could not send enquiry.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} id="quick-enquiry" className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-bold text-slate-900">Quick Enquiry</h3>
      <p className="mt-1 text-sm text-slate-600">
        Share your requirement and {businessName} will contact you.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Field required label="Your name" value={name} onChange={setName} />
        <Field required label="Phone number" value={phone} onChange={setPhone} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Field label="Email (optional)" type="email" value={email} onChange={setEmail} />
        <Field
          label="Service (optional)"
          value={serviceName}
          onChange={setServiceName}
          placeholder="Website design, branding, etc."
        />
      </div>

      <label className="mt-3 block">
        <span className="mb-1.5 block text-sm font-semibold text-slate-700">Message</span>
        <textarea
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell your requirement, budget, and timeline."
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </label>

      {error ? (
        <div className="mt-3 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="mt-3 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {success}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Enquiry"
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
      />
    </label>
  );
}
