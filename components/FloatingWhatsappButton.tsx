"use client";

import Lottie from "lottie-react";
import whatsappAnimation from "@/public/whatsapp-icon-animation.json";

export default function FloatingWhatsappButton() {
  return (
    <a
      href="https://wa.me/+917004614077"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-[calc(1.25rem+4cm)] right-5 z-[45] flex h-[82px] w-[82px] items-center justify-center rounded-full bg-transparent transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <Lottie
        animationData={whatsappAnimation}
        loop
        autoplay
        className="h-[74px] w-[74px]"
      />
    </a>
  );
}

