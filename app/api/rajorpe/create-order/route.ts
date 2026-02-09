import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const order = await razorpay.orders.create({
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    });

    return Response.json(order);
  } catch (err) {
    return Response.json(
      { error: "Order creation failed" },
      { status: 500 }
    );
  }
}
