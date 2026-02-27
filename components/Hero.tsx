"use client";

import Link from "next/link";
import Image from "next/image";
import { Manrope, Sora } from "next/font/google";
import { ArrowRight } from "lucide-react";

const headingFont = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function Hero() {
  return (
    <section
      className={`${bodyFont.className} relative isolate overflow-hidden bg-[#f4f9ff] pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(34,211,238,0.24),transparent_34%),radial-gradient(circle_at_88%_14%,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_72%_85%,rgba(59,130,246,0.16),transparent_32%)]">
        <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-cyan-300/35 blur-3xl" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[76vh] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="inline-flex items-center rounded-full border border-cyan-200/85 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-800 shadow-sm backdrop-blur">
              LIMITED BUSINESSES ARE BEING VERIFIED ON VAIKET
            </p>

            <h1
              className={`${headingFont.className} mt-6 max-w-2xl text-4xl font-extrabold leading-[1.06] text-slate-950 sm:text-5xl lg:text-[3.45rem]`}
            >
              Get your business verified on Vaiket and start receiving customer
              enquiries
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Early businesses on Vaiket are already getting visibility, a
              verified business certificate, and enquiries from customers
              searching for their services. Secure your spot before your
              competitors join.
            </p>

            <div className="mt-10">
              <Link
                href="/business/identity"
                className="group relative inline-flex h-16 min-w-[320px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-700 px-7 shadow-[0_10px_24px_-16px_rgba(6,182,212,0.58)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="inline-flex items-center gap-2 text-base font-extrabold text-white">
                  Get Listed Now - Rs. 99 + GST
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>

            <p className="mt-4 max-w-2xl text-xs font-semibold text-slate-500 sm:text-sm">
              One-time payment | Lifetime listing access | Includes
              verification certificate | Enquiries continue after listing |
              Setup takes only 2 minutes
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-cyan-300/25 via-emerald-200/20 to-blue-300/25 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-100/80 bg-white/85 p-3 shadow-[0_36px_70px_-35px_rgba(14,116,144,0.45)] backdrop-blur">
              <div className="relative overflow-hidden rounded-[1.55rem] border border-slate-100 bg-gradient-to-br from-[#f6fcff] via-[#eef8ff] to-[#f5fffb]">
                <Image
                  src="/hero/list-your-business-proof-v4.png"
                  alt="Vaiket business listing onboarding and directory proof visual"
                  width={1152}
                  height={928}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
