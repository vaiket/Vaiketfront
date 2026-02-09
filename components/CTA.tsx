export default function CTA() {
  return (
    <section className="w-full bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold text-white">
          Ready to grow your business with Vaiket?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Start automating conversations, managing leads, and increasing
          conversions — all from one platform.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/get-started"
            className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
          >
            Get Started
          </a>

          <a
            href="https://wa.me/+917004614077"
            className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}
