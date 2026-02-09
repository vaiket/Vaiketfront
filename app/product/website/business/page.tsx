import Link from "next/link";

export default function BusinessWebsitePage() {
  return (
    <main className="w-full">

      {/* HERO */}
      <section className="px-6 py-20 bg-gray-50 text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-black">
          Recommended
        </span>

        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          Business Website
        </h1>

        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A conversion-focused website designed to generate leads,
          build trust, and support automation tools.
        </p>

        <Link
          href="/checkout/business-website"
          className="inline-block mt-8 px-8 py-3 rounded-lg bg-black text-white font-medium"
        >
          Choose Business Website
        </Link>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Who should choose this?</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="p-6 border rounded-xl">Growing businesses</div>
            <div className="p-6 border rounded-xl">Lead-driven services</div>
            <div className="p-6 border rounded-xl">Startups & professionals</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center">
            Everything You Need to Grow
          </h2>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 text-gray-700">
            <li>✔ 6–8 pages</li>
            <li>✔ Custom layout & branding</li>
            <li>✔ Lead capture forms & CTAs</li>
            <li>✔ SEO-friendly structure</li>
            <li>✔ Google Analytics integration</li>
            <li>✔ WhatsApp, email & automation ready</li>
          </ul>

          <p className="mt-6 text-center text-sm text-gray-500">
            Delivery time: 7–10 working days
          </p>
        </div>
      </section>

      {/* WHY UPGRADE */}
      <section className="px-6 py-16 bg-white text-center">
        <h2 className="text-2xl font-bold">
          Why Business Website?
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Unlike a basic website, this is built to convert visitors into leads
          and work seamlessly with automation tools.
        </p>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-16 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold">How it works</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-5 text-sm text-gray-700">
          <div>Choose plan</div>
          <div>Requirement call</div>
          <div>Design & build</div>
          <div>Review</div>
          <div>Launch 🚀</div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold">
          Want a website that brings leads?
        </h2>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/checkout/business-website"
            className="px-8 py-3 rounded-lg bg-white text-black font-medium"
          >
            Choose Business Website
          </Link>

          <Link
            href="/website/custom"
            className="px-8 py-3 rounded-lg border border-gray-400 font-medium"
          >
            Need Something Custom?
          </Link>
        </div>
      </section>

    </main>
  );
}
