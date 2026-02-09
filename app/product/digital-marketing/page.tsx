import Link from "next/link";

export default function DigitalMarketingPage() {
  return (
    <main className="w-full">

      {/* ================= HERO ================= */}
      <section className="px-6 py-24 bg-gradient-to-b from-gray-50 to-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Performance Digital Marketing
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
          We don’t just run ads.  
          We build lead-generation systems connected with automation.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/get-started"
            className="px-8 py-3 rounded-lg bg-black text-white font-medium"
          >
            Start Lead Campaign
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-lg border border-gray-300 text-gray-800 font-medium"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            What We Actually Do
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Focused, measurable, and automation-ready digital marketing.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3 text-gray-700">
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold">Paid Ads</h3>
              <p className="mt-2 text-sm">
                Google Search Ads & Meta (Facebook / Instagram) Ads
              </p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold">Landing Pages</h3>
              <p className="mt-2 text-sm">
                Conversion-focused pages built for lead capture
              </p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold">Automation</h3>
              <p className="mt-2 text-sm">
                Instant WhatsApp & Email follow-ups after lead submission
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            How the Lead System Works
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-5 text-sm text-gray-700">
            <div className="p-4 border rounded-lg">Ads Run</div>
            <div className="p-4 border rounded-lg">Landing Page</div>
            <div className="p-4 border rounded-lg">Lead Captured</div>
            <div className="p-4 border rounded-lg">Auto Follow-up</div>
            <div className="p-4 border rounded-lg">Conversion 🚀</div>
          </div>
        </div>
      </section>

      {/* ================= WHAT YOU GET ================= */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            What You Get
          </h2>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 text-gray-700">
            <li>✔ Campaign setup (Google / Meta)</li>
            <li>✔ Landing page (if required)</li>
            <li>✔ Lead tracking & reporting</li>
            <li>✔ WhatsApp automation integration</li>
            <li>✔ Email automation workflows</li>
            <li>✔ Monthly optimization & support</li>
          </ul>

          <p className="mt-6 text-center text-sm text-gray-500">
            Ad spend is separate. No fake guarantees. Only measurable growth.
          </p>
        </div>
      </section>

      {/* ================= WHO THIS IS FOR ================= */}
      <section className="px-6 py-16 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Who Should Choose This?
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3 text-sm text-gray-700">
          <div className="p-5 border rounded-xl">
            Service-based businesses
          </div>
          <div className="p-5 border rounded-xl">
            Local & regional brands
          </div>
          <div className="p-5 border rounded-xl">
            Startups looking for fast leads
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-24 bg-black text-white text-center">
        <h2 className="text-3xl font-bold">
          Ready to Generate Quality Leads?
        </h2>

        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Let’s build a lead system that connects ads with automation —
          not just clicks.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/get-started"
            className="px-8 py-3 rounded-lg bg-white text-black font-medium"
          >
            Start Lead Campaign
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-lg border border-gray-500 font-medium"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>

    </main>
  );
}
