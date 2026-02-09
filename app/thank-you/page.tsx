import Link from "next/link";

export const metadata = {
  title: "Payment Successful | Vaiket",
  description: "Thank you for your payment. Your order has been confirmed.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your payment.  
          Your order has been confirmed and our team will contact you shortly.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition"
          >
            Go to Home
          </Link>

          <Link
            href="/get-started"
            className="block w-full border border-gray-300 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Start Another Order
          </Link>
        </div>
      </div>
    </main>
  );
}
