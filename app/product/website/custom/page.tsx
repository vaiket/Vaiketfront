import Link from "next/link";

const enterpriseInclusions = [
  "Custom UI and tailored user journeys",
  "Complex workflows, admin panels, and dashboards",
  "API and third-party integrations",
  "E-commerce and payment system support",
  "Scalable architecture for long-term growth",
  "Dedicated planning and technical consultation",
];

export default function CustomWebsitePage() {
  return (
    <main className="w-full">
      <section className="bg-gray-900 px-6 py-24 text-center text-white">
        <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
          Enterprise Plan
        </p>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Enterprise Website (Custom)
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-300">
          Built for companies that need more than a standard website, with custom
          systems, integrations, and business-specific workflows.
        </p>

        <div className="mx-auto mt-6 w-fit rounded-2xl border border-white/20 bg-white/10 px-8 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-200">
            Pricing model
          </p>
          <p className="mt-1 text-3xl font-extrabold">Custom Quote</p>
          <p className="mt-1 text-xs text-gray-300">
            Final proposal after discovery call and scope lock
          </p>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/company/contact-support"
            className="rounded-lg bg-white px-8 py-3 font-medium text-black"
          >
            Request Enterprise Quote
          </Link>
          <Link
            href="/product/website"
            className="rounded-lg border border-gray-500 px-8 py-3 font-medium text-white"
          >
            See All Website Plans
          </Link>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            What Is Included in Enterprise Scope
          </h2>

          <ul className="mt-10 grid gap-4 text-gray-700 md:grid-cols-2">
            {enterpriseInclusions.map((item) => (
              <li key={item} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <p className="font-semibold">Separate quotation for extra scope</p>
            <p className="mt-1">
              Additional modules, extra integrations, paid licenses, premium
              assets, and newly added requirements are quoted separately and
              approved before implementation.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
