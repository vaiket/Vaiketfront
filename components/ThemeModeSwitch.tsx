"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import themeToggleAnimation from "@/public/theme-toggle-animation.json";

const STORAGE_KEY = "vaiket-theme";

export default function ThemeModeSwitch() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);

    const totalFrames = lottieRef.current?.getDuration(true) ?? 0;
    if (totalFrames > 0) {
      lottieRef.current?.goToAndStop(isDark ? totalFrames : 0, true);
    }
  }, [isDark]);

  const toggleTheme = () => {
    const totalFrames = lottieRef.current?.getDuration(true) ?? 0;
    if (totalFrames > 0) {
      lottieRef.current?.playSegments([0, totalFrames], true);
    }
    setIsDark((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white/90 p-1.5 shadow-sm transition hover:scale-105 hover:bg-white dark:border-slate-700 dark:bg-slate-900"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={themeToggleAnimation}
        loop={false}
        autoplay={false}
        className="h-6 w-6"
      />
    </button>
  );
}
