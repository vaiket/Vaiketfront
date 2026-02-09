import Link from "next/link";

export default function CrmLeadManagementPage() {
  return (
    <main className="w-full">

      {/* ================= HERO ================= */}
      <section className="px-6 py-24 bg-gradient-to-b from-gray-50 to-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          CRM & Lead Management
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
          One system to track every lead, manage follow-ups,
          and automate daily sales communication — without missing anything.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/get-started"
            className="px-8 py-3 rounded-lg bg-black text-white font-medium"
          >
            Setup My CRM
          </Link>
          <Link
            href="/how-it-works"
            className="px-8 py-3 rounded-lg border border-gray-300 text-gray-800 font-medium"
          >
            How It Works
          </Link>
        </div>
      </section>

      {/* ================= WHAT THIS SOLVES ================= */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Problems This Solves
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3 text-gray-700">
            <div className="p-6 border rounded-xl">
              Missed follow-ups & forgotten leads
            </div>
            <div className="p-6 border rounded-xl">
              Leads scattered across WhatsApp & Excel
            </div>
            <div className="p-6 border rounded-xl">
              No visibility on sales progress
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT YOU GET ================= */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            What You Get
          </h2>

          <ul className="mt-12 grid gap-4 md:grid-cols-2 text-gray-700">
            <li>✔ Centralized lead dashboard</li>
            <li>✔ Lead stages & pipeline (New → Follow-up → Converted)</li>
            <li>✔ Daily follow-up reminders</li>
            <li>✔ WhatsApp, Email, SMS & RCS automation</li>
            <li>✔ Team lead assignment & tracking</li>
            <li>✔ Notes, tasks & activity history</li>
            <li>✔ Lead source & conversion visibility</li>
            <li>✔ Automation logs synced with CRM</li>
          </ul>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            How the System Works
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-5 text-sm text-gray-700">
            <div className="p-4 border rounded-lg">Lead Captured</div>
            <div className="p-4 border rounded-lg">Stored in CRM</div>
            <div className="p-4 border rounded-lg">Automation Triggered</div>
            <div className="p-4 border rounded-lg">Follow-ups Sent</div>
            <div className="p-4 border rounded-lg">Lead Converted 🚀</div>
          </div>
        </div>
      </section>

      {/* ================= IMPORTANT CLARITY ================= */}
      <section className="px-6 py-16 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Data Ownership & Security
        </h2>

        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Your CRM data stays securely inside your own Zoho CRM account.
          Vaiket connects to it via secure APIs and runs automation on top —
          your data is never locked in.
        </p>
      </section>

      {/* ================= PRICING SNAPSHOT ================= */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Simple Pricing Model
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 text-gray-700">
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold">One-Time Setup</h3>
              <p className="mt-2 text-sm">
                CRM configuration, pipeline, automation & integration
              </p>
              <p className="mt-2 font-medium">₹4,999 – ₹17,999</p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold">Monthly Automation & Support</h3>
              <p className="mt-2 text-sm">
                Follow-ups, monitoring, optimization & support
              </p>
              <p className="mt-2 font-medium">₹1,999 – ₹4,999 / month</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            *CRM software license is paid directly to Zoho.
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-24 bg-black text-white text-center">
        <h2 className="text-3xl font-bold">
          Want Zero Missed Follow-ups?
        </h2>

        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Let us set up a CRM system that works daily for your business —
          not just a dashboard you never open.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/get-started"
            className="px-8 py-3 rounded-lg bg-white text-black font-medium"
          >
            Get Started
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
