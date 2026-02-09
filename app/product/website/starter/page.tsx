import Link from "next/link";

export default function StarterWebsitePage() {
  return (
    <main className="w-full">

      {/* HERO */}
      <section className="px-6 py-20 bg-gray-50 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Starter Website
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A clean, professional website to start your online presence —
          built fast and ready for future growth.
        </p>

        <Link
          href="/checkout/starter-website"
          className="inline-block mt-8 px-8 py-3 rounded-lg bg-black text-white font-medium"
        >
          Get Starter Website
        </Link>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Who is this for?</h2>
          <p className="mt-3 text-gray-600">
            Perfect for individuals and small businesses starting fresh.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="p-6 border rounded-xl">New businesses</div>
            <div className="p-6 border rounded-xl">Local services</div>
            <div className="p-6 border rounded-xl">First-time website owners</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center">
            What You Get
          </h2>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 text-gray-700">
            <li>✔ Up to 5 pages</li>
            <li>✔ Mobile responsive design</li>
            <li>✔ Contact form + WhatsApp chat</li>
            <li>✔ Basic SEO setup</li>
            <li>✔ Fast loading & secure</li>
            <li>✔ Automation-ready foundation</li>
          </ul>

          <p className="mt-6 text-center text-sm text-gray-500">
            Delivery time: 5–7 working days
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-16 bg-white text-center">
        <h2 className="text-2xl font-bold">How it works</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-4 text-sm text-gray-700">
          <div>Place order</div>
          <div>We contact you</div>
          <div>Website built</div>
          <div>Go live 🚀</div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold">
          Ready to start your website?
        </h2>

        <Link
          href="/checkout/starter-website"
          className="inline-block mt-6 px-8 py-3 rounded-lg bg-white text-black font-medium"
        >
          Get Starter Website
        </Link>
      </section>

    </main>
  );
}
