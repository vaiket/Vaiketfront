export default function PaymentFailurePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-10 rounded-xl shadow-xl text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>

        <p className="mt-4 text-gray-600">
          Unfortunately, your payment could not be completed.
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Please try again or contact support if money was deducted.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/"
            className="px-6 py-3 bg-gray-700 text-white rounded-lg"
          >
            Go Home
          </a>

          <a
            href="/pricing"
            className="px-6 py-3 bg-red-600 text-white rounded-lg"
          >
            Try Again
          </a>
        </div>
      </div>
    </div>
  );
}
