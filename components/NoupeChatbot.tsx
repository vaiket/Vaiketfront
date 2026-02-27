"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const NOUPE_EMBED_SRC =
  "https://www.noupe.com/embed/019c305dccd17b379bf1a2354da849cd4a7f.js";

export default function NoupeChatbot() {
  const pathname = usePathname();

  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-noupe-embed="true"]',
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = NOUPE_EMBED_SRC;
      script.async = true;
      script.defer = true;
      script.setAttribute("data-noupe-embed", "true");
      document.body.appendChild(script);
    }

    const styleId = "noupe-widget-visibility-fix";

    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        iframe[src*="noupe.com"] {
          z-index: 75 !important;
          right: 20px !important;
          bottom: 20px !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [pathname]);

  return null;
}
