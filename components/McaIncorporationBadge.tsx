import Image from "next/image";

export default function McaIncorporationBadge() {
  return (
    <div className="inline-flex w-full max-w-[420px] items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 backdrop-blur-sm shadow-[0_0_24px_rgba(148,163,184,0.2)]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.06]">
        <Image
          src="/logo/mca-emblem-grayscale.svg"
          alt="Ministry of Corporate Affairs emblem"
          width={26}
          height={26}
          className="h-7 w-7 object-contain grayscale"
        />
      </div>

      <div className="min-w-0">
        <p className="truncate text-[10px] font-semibold leading-4 text-slate-200/90 sm:text-[11px]">
          Incorporated under Ministry of Corporate Affairs, Govt. of India
        </p>
        <p className="mt-0.5 text-[10px] font-bold tracking-wide text-slate-300 sm:text-[11px]">
          CIN: U62012JH2025PTC024360
        </p>
      </div>
    </div>
  );
}
