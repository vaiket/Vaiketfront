"use client";

export default function CertificateActions() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
    >
      Print / Save PDF
    </button>
  );
}
