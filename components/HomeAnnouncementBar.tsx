"use client";

import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

export default function HomeAnnouncementBar() {
  return (
    <section className="w-full border-b border-cyan-200/70 bg-gradient-to-r from-cyan-50 via-white to-emerald-50 text-slate-800">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 py-2 text-xs sm:text-sm">
        <span className="inline-flex items-center gap-1 rounded-full border border-cyan-200 bg-cyan-100 px-2.5 py-1 font-semibold text-cyan-800">
          <Building2 className="h-3.5 w-3.5" />
          New
        </span>
        <p className="font-semibold text-slate-700">
          Vaiket Business Identity Program is live for local businesses.
        </p>
        <Link
          href="/business/identity"
          className="inline-flex items-center gap-1 font-extrabold text-cyan-700 transition hover:text-cyan-800"
        >
          List Your Business
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
