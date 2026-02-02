import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";

// FAQ DATA
const faqCategories = {
  general: "General",
  pricing: "Pricing",
  support: "Support",
};

const faqData = {
  general: [
    {
      question: "What is Vaiket?",
      answer:
        "Vaiket is a modern SaaS platform that helps businesses design, launch, and scale digital products faster.",
    },
    {
      question: "Who is Vaiket for?",
      answer:
        "Vaiket is built for startups, developers, designers, and growing teams.",
    },
  ],
  pricing: [
    {
      question: "Is there a free plan available?",
      answer:
        "Yes, we offer flexible pricing plans so you can start small and scale as you grow.",
    },
    {
      question: "Can I upgrade my plan later?",
      answer:
        "Absolutely. You can upgrade or downgrade your plan at any time.",
    },
  ],
  support: [
    {
      question: "How can I contact support?",
      answer:
        "Our support team is available via email and live chat to assist you.",
    },
    {
      question: "Do you provide onboarding help?",
      answer:
        "Yes, we provide onboarding and documentation to help you get started smoothly.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
    </>
  );
}
