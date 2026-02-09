import Link from "next/link";

export default function WebsitePage() {
  return (
    <main className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Website Development for Growing Businesses
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Don’t have a website? We build your website first — then help you grow
          with tools & automation.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#plans" className="px-8 py-3 rounded-lg bg-black text-white font-medium">
            Get Your Website
          </a>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-lg border border-gray-300 text-gray-800 font-medium"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>

      {/* ================= WHO THIS IS FOR ================= */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 text-center">
          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold text-lg">No Website Yet</h3>
            <p className="mt-2 text-sm text-gray-600">
              Perfect if you’re starting fresh and need a professional presence.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold text-lg">Outdated Website</h3>
            <p className="mt-2 text-sm text-gray-600">
              Upgrade to a modern, fast & conversion-ready website.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold text-lg">Business Growth</h3>
            <p className="mt-2 text-sm text-gray-600">
              Websites built to support tools, automation & lead generation.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PLANS SECTION ================= */}
      <section id="plans" className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Choose the Website That Fits Your Stage
          </h2>
          <p className="mt-3 text-gray-600">
            Simple options. Clear scope. Upgrade anytime.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">

          {/* Starter Website */}
          <div className="bg-white border rounded-2xl p-8 flex flex-col">
            <h3 className="text-xl font-semibold">Starter Website</h3>
            <p className="mt-2 text-sm text-gray-600">
              For just starting & local businesses
            </p>

            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>• Up to 5 pages</li>
              <li>• Mobile responsive</li>
              <li>• Contact + WhatsApp</li>
              <li>• Basic SEO ready</li>
              <li>• Automation-ready</li>
            </ul>

            <p className="mt-4 text-sm text-gray-500">
              Delivery: 5–7 working days
            </p>

            <Link
              href="/product/website/starter"
              className="mt-6 inline-block text-center px-6 py-3 rounded-lg bg-black text-white font-medium"
            >
              Get Starter Website
            </Link>
          </div>

          {/* Business Website (Highlighted) */}
          <div className="bg-white border-2 border-black rounded-2xl p-8 flex flex-col scale-[1.02]">
            <span className="text-xs uppercase tracking-wide text-black font-semibold">
              Recommended
            </span>

            <h3 className="mt-2 text-xl font-semibold">Business Website</h3>
            <p className="mt-2 text-sm text-gray-600">
              For businesses that want leads & growth
            </p>

            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>• 6–8 pages</li>
              <li>• Custom layout & branding</li>
              <li>• Lead forms + CTA</li>
              <li>• SEO structure</li>
              <li>• Analytics ready</li>
              <li>• Tools & automation ready</li>
            </ul>

            <p className="mt-4 text-sm text-gray-500">
              Delivery: 7–10 working days
            </p>

            <Link
              href="/product/website/business"
              className="mt-6 inline-block text-center px-6 py-3 rounded-lg bg-black text-white font-medium"
            >
              Choose Business Website
            </Link>
          </div>

          {/* Custom Website */}
          <div className="bg-white border rounded-2xl p-8 flex flex-col">
            <h3 className="text-xl font-semibold">Custom Website</h3>
            <p className="mt-2 text-sm text-gray-600">
              For advanced & system-based requirements
            </p>

            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>• Custom UI/UX</li>
              <li>• Unlimited pages (as needed)</li>
              <li>• Dashboard / integrations</li>
              <li>• E-commerce / payments</li>
              <li>• Full automation ecosystem</li>
            </ul>

            <p className="mt-4 text-sm text-gray-500">
              Timeline & pricing after discussion
            </p>

            <Link
              href="/product/website/custom"
              className="mt-6 inline-block text-center px-6 py-3 rounded-lg border border-gray-300 text-gray-800 font-medium"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHAT HAPPENS NEXT ================= */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            What Happens Next
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-5 text-sm text-gray-700">
            <div>Choose website</div>
            <div>Place request</div>
            <div>We contact you</div>
            <div>Website built</div>
            <div>Go live 🚀</div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="px-6 py-20 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold">
          Ready to build your website?
        </h2>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/product/website/starter" className="px-6 py-3 rounded-lg bg-white text-black font-medium">
            Get Starter Website
          </Link>
          <Link href="/product/website/business" className="px-6 py-3 rounded-lg border border-gray-400 font-medium">
            Choose Business Website
          </Link>
          <Link href="/product/website/custom" className="px-6 py-3 rounded-lg border border-gray-400 font-medium">
            Talk to an Expert
          </Link>
        </div>
      </section>

    </main>
  );
}
