import Hero from "./components/hero";
import Feature from "./components/feature";
import Pricing from "./components/pricing";

export const metadata = {
  title: "WhatsApp Automation | Vaiket",
  description:
    "Automate your business with WhatsApp API workflows, broadcasts, chatbots, and conversion-focused follow-ups.",
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
