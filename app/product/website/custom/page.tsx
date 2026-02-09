import Link from "next/link";

export default function CustomWebsitePage() {
  return (
    <main className="w-full">

      {/* HERO */}
      <section className="px-6 py-24 bg-gray-900 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Custom Website Development
        </h1>
        <p className="mt-5 text-lg text-gray-300 max-w-2xl mx-auto">
          For businesses that don’t need a simple website —
          but a complete system built around their goals.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-3 rounded-lg bg-white text-black font-medium"
          >
            Talk to an Expert
          </Link>
          <Link
            href="/website"
            className="px-8 py-3 rounded-lg border border-gray-500 font-medium"
          >
            See Other Website Options
          </Link>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Who Should Choose a Custom Website?
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3 text-gray-700">
            <div className="p-6 border rounded-xl">
              Businesses with complex requirements
            </div>
            <div className="p-6 border rounded-xl">
              Startups building platforms or dashboards
            </div>
            <div className="p-6 border rounded-xl">
              Companies needing integrations & automation
            </div>
          </div>
        </div>
      </section>

      {/* WHAT MAKES IT CUSTOM */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            What Makes This Custom?
          </h2>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 text-gray-700">
            <li>✔ Custom UI/UX (not templates)</li>
            <li>✔ Unlimited pages (as required)</li>
            <li>✔ Custom user flows & logic</li>
            <li>✔ Dashboard / admin panels</li>
            <li>✔ API & third-party integrations</li>
            <li>✔ E-commerce / payment systems (if needed)</li>
            <li>✔ Role-based access (optional)</li>
            <li>✔ Built for automation & scaling</li>
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            How the Custom Process Works
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-5 text-sm text-gray-700">
            <div className="p-4 border rounded-lg">Discovery & Goals</div>
            <div className="p-4 border rounded-lg">Planning & Structure</div>
            <div className="p-4 border rounded-lg">Design & Development</div>
            <div className="p-4 border rounded-lg">Testing & Review</div>
            <div className="p-4 border rounded-lg">Launch & Scale 🚀</div>
          </div>
        </div>
      </section>

      {/* PRICING CLARITY */}
      <section className="px-6 py-16 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Pricing & Timeline
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Custom websites don’t have fixed pricing.
          Cost and timeline depend on features, complexity, and integrations.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Typical projects start from ₹25,000 and go upwards.
        </p>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 bg-black text-white text-center">
        <h2 className="text-3xl font-bold">
          Let’s Discuss Your Requirements
        </h2>

        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Share your idea, and we’ll help you design the right system —
          not just a website.
        </p>

        <Link
          href="/contact"
          className="inline-block mt-8 px-8 py-3 rounded-lg bg-white text-black font-medium"
        >
          Book a Free Discussion
        </Link>
      </section>

    </main>
  );
}
