export default function PaymentSuccessPage({ searchParams }: any) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
        <p className="mt-4 text-gray-600">
          Thank you! Your payment was completed successfully.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Transaction ID: {searchParams?.txnid}
        </p>

        <a
          href="/dashboard"
          className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded-lg"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
