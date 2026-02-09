"use client";

import { Building2, FileCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function TrustStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const trustItems = [
    {
      icon: <Building2 className="h-5 w-5 text-blue-500" />,
      title: "Company Registered",
      description: "Fully Incorporated Entity"
    },
    {
      icon: <FileCheck className="h-5 w-5 text-emerald-500" />,
      title: "MSME / Udyam Registered",
      description: "Govt. Recognized Business"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="w-full border-y border-gray-100 bg-gradient-to-b from-gray-50/30 to-white py-8 md:py-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header with calmer badge - SECTION REVEAL */}
        <div 
          className={`mb-10 text-center transition-all duration-400 ease-out ${
            isInView 
              ? "translate-y-0 opacity-100" 
              : "translate-y-16 opacity-0"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-gray-50 to-gray-100 px-3.5 py-1.5 shadow-xs">
            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <p className="text-xs font-medium tracking-wide text-gray-600">
              VERIFIED & RECOGNIZED
            </p>
          </div>
          <h3 className="mt-5 text-xl font-semibold tracking-tight text-gray-800 sm:text-2xl">
            Registered & Recognized Business
          </h3>
        </div>

        {/* Trust Items - Clean & Minimal with SECTION REVEAL */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-400 ease-out ${
                isInView 
                  ? "translate-y-0 opacity-100" 
                  : "translate-y-16 opacity-0"
              }`}
              style={{ 
                transitionDelay: isInView ? `${index * 100 + 200}ms` : "0ms",
                transitionProperty: "opacity, transform"
              }}
            >
              {/* Card with HOVER MICRO-ANIMATION only */}
              <div className="group relative h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
                  {/* Icon Container */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 sm:mb-0 sm:mr-5">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="mb-1.5 text-base font-semibold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Subtle hover effect */}
                <div className="absolute inset-0 rounded-xl border border-transparent transition-colors duration-300 group-hover:border-gray-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Optional: Minimal subtle divider - SECTION REVEAL */}
        <div 
          className={`mt-10 flex items-center justify-center transition-all duration-400 ease-out ${
            isInView 
              ? "translate-y-0 opacity-100" 
              : "translate-y-16 opacity-0"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>
      </div>
    </section>
  );
}