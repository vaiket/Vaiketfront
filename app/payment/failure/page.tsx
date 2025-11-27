export default function PaymentFailure() {
  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <h1>❌ Payment Failed!</h1>
      <p>Please try again or contact support.</p>
      <a href="/" style={{ marginTop: 20, display: "inline-block" }}>
        Go Back →
      </a>
    </div>
  );
}
