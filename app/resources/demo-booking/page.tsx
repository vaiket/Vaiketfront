// ❌ No "use client" here (server page!)

// 📩 Nodemailer email sender (server action)
import nodemailer from "nodemailer";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams?: Promise<{ success?: string }>;
};

// ✉️ Server Action for form submit (runs on server)
export async function sendDemoRequest(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const business = formData.get("business") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const industry = formData.get("industry") as string;
  const challenge = formData.get("challenge") as string;
  const preferredTime = formData.get("preferredTime") as string;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Vaiket Demo" <${process.env.SMTP_USER}>`,
      to: "support@vaiket.com",
      subject: `Demo Booking Request - ${name}`,
      text: `
Full Name: ${name}
Business: ${business}
Email: ${email}
Phone: ${phone}
Industry: ${industry}
Challenge: ${challenge}
Preferred Demo Time: ${preferredTime}
      `,
    });

    redirect("/resources/demo-booking?success=1");
  } catch (error) {
    console.error("Email Error:", error);
    redirect("/resources/demo-booking?success=0");
  }
}

// 📌 MAIN PAGE
export default async function DemoBookingPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const isSuccess = params?.success === "1";
  const isError = params?.success === "0";

  return (
    <section className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-bold mb-6">
          Schedule Your Free Demo
        </h1>
        <p className="text-gray-400 mb-10">
          See how AI-powered email automation replies instantly and captures more leads for your business.
        </p>

        {/* Success - Error Messages */}
        {isSuccess && (
          <div className="bg-green-500/20 border border-green-500 px-4 py-3 rounded-lg mb-6">
            🎉 Demo request submitted successfully! <br />
            Our team will contact you shortly on WhatsApp.
          </div>
        )}

        {isError && (
          <div className="bg-red-500/20 border border-red-500 px-4 py-3 rounded-lg mb-6">
            ❌ Something went wrong. Please try again.
          </div>
        )}

        {/* FORM */}
        <form action={sendDemoRequest} className="grid gap-5">

          <input name="name" required placeholder="Full Name *"
            className="px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700" />

          <input name="business" placeholder="Business Name"
            className="px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700" />

          <input type="email" name="email" required placeholder="Work Email *"
            className="px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700" />

          <input type="tel" name="phone" required placeholder="WhatsApp / Phone *"
            className="px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700" />

          <select name="industry"
            className="px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700">
            <option value="General">Select Industry</option>
            <option value="Retail">Retail</option>
            <option value="Services">Services</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Other">Other</option>
          </select>

          <textarea name="challenge" rows={3} placeholder="Main Challenge You Face"
            className="px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700" />

          <select name="preferredTime"
            className="px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700">
            <option value="Morning">Morning (10AM – 12PM)</option>
            <option value="Afternoon">Afternoon (12PM – 4PM)</option>
            <option value="Evening">Evening (4PM – 7PM)</option>
          </select>

          <button type="submit"
            className="bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition-all">
            ⚡ Book Live Demo
          </button>
        </form>

        {/* Bottom Help */}
        <p className="text-gray-500 text-sm mt-6">
          Need help? Email us → support@vaiket.com
        </p>

      </div>
    </section>
  );
}
