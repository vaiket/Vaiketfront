import Link from "next/link";

export default function SmsAndRcsPage() {
  return (
    <main className="w-full">

      {/* ================= HERO ================= */}
      <section className="px-6 py-24 bg-gradient-to-b from-gray-50 to-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          SMS & RCS Automation
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
          Instant, reliable messaging for alerts, reminders, and follow-ups —
          fully automated and DLT compliant.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/get-started"
            className="px-8 py-3 rounded-lg bg-black text-white font-medium"
          >
            Activate SMS Automation
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-lg border border-gray-300 text-gray-800 font-medium"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>

      {/* ================= WHY SMS & RCS ================= */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Why SMS & RCS?
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            When speed and delivery matter, SMS and RCS outperform every channel.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3 text-gray-700">
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold">Instant Delivery</h3>
              <p className="mt-2 text-sm">
                Messages reach users within seconds — ideal for time-critical updates.
              </p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold">DLT Compliant</h3>
              <p className="mt-2 text-sm">
                Fully compliant with Indian DLT regulations for transactional & promotional SMS.
              </p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold">Automation Ready</h3>
              <p className="mt-2 text-sm">
                Trigger messages automatically from leads, actions, or events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            What We Offer
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* SMS */}
            <div className="p-8 bg-white border rounded-2xl">
              <h3 className="text-xl font-semibold">SMS Automation</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>✔ Transactional SMS (OTP, alerts, confirmations)</li>
                <li>✔ Promotional SMS (DLT approved)</li>
                <li>✔ Auto-triggered messages</li>
                <li>✔ Delivery & usage tracking</li>
                <li>✔ Works with WhatsApp & Email flows</li>
              </ul>
            </div>

            {/* RCS */}
            <div className="p-8 bg-white border rounded-2xl">
              <h3 className="text-xl font-semibold">RCS Messaging</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>✔ Branded messages with logo & name</li>
                <li>✔ Images, buttons & rich cards</li>
                <li>✔ Interactive CTAs</li>
                <li>✔ Higher engagement than SMS</li>
                <li>✔ Premium customer experience</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            How Automation Works
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-5 text-sm text-gray-700">
            <div className="p-4 border rounded-lg">Event Trigger</div>
            <div className="p-4 border rounded-lg">Automation Rule</div>
            <div className="p-4 border rounded-lg">SMS / RCS Sent</div>
            <div className="p-4 border rounded-lg">User Action</div>
            <div className="p-4 border rounded-lg">Conversion 🚀</div>
          </div>
        </div>
      </section>

      {/* ================= WHO THIS IS FOR ================= */}
      <section className="px-6 py-16 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Who Should Use SMS & RCS Automation?
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3 text-sm text-gray-700">
          <div className="p-5 border rounded-xl">
            Businesses sending alerts & notifications
          </div>
          <div className="p-5 border rounded-xl">
            Lead-driven & service businesses
          </div>
          <div className="p-5 border rounded-xl">
            Brands needing instant customer communication
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-24 bg-black text-white text-center">
        <h2 className="text-3xl font-bold">
          Ready for Instant Customer Communication?
        </h2>

        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Start with SMS or upgrade to RCS for a richer, branded experience —
          fully automated with Vaiket.
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
