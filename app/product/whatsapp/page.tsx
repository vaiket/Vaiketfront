import Hero from "./components/hero";
import Feature from "./components/feature";
import Pricing from "./components/pricing";

export const metadata = {
  title: "WhatsApp Business API | WABridge",
  description:
    "Automate your business with WhatsApp Business API & RCS. Send broadcasts, build chatbots, automate workflows, and boost conversions.",
};

export default function WhatsAppPage() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <Feature />
      <Pricing />
    </main>
  );
}
