"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  email: string;
  phone: string;
  websiteStatus: string;
  goals: string[];
  channels: string[];
};

export default function GetStartedPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    websiteStatus: "",
    goals: [],
    channels: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleValue = (
    key: "goals" | "channels",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Lead save failed");
      }

      // ✅ redirect with lead_id
      router.push(`/recommended-plan?lead_id=${data.lead_id}`);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <div 
        className={`max-w-2xl w-full transition-all duration-700 ease-out ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Header Card */}
        <div 
          className={`bg-white rounded-2xl shadow-lg mb-6 p-8 transform transition-all duration-500 hover:shadow-xl ${
            mounted ? 'scale-100' : 'scale-95'
          }`}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
            Let's Build the Right System for Your Business
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Answer a few questions and we'll recommend the best setup.
          </p>
          
          {/* Progress Indicators */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Quick setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">No credit card</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Free plan</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <form 
          onSubmit={submitForm}
          className={`bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-700 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
              </div>
              
              <div className="space-y-4">
                <input
                  required
                  placeholder="Your Full Name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <input
                  required
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Website status */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Do you already have a website?
                </h3>
              </div>
              
              <div className="space-y-3">
                {[
                  "Yes, I have a website",
                  "No, I need a website",
                  "I want to try tools without a website",
                ].map((opt, index) => (
                  <label 
                    key={opt} 
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm ${
                      form.websiteStatus === opt 
                        ? 'border-blue-500 bg-blue-50 shadow-sm' 
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="website"
                      required
                      className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
                      onChange={() =>
                        setForm({ ...form, websiteStatus: opt })
                      }
                    />
                    <span className="text-gray-900 font-medium">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-orange-600 font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Your main goals</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Get more leads",
                  "Automate follow-ups",
                  "Manage leads properly",
                  "Run ads",
                ].map((g, index) => (
                  <label 
                    key={g} 
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:border-orange-400 hover:bg-orange-50 hover:shadow-sm ${
                      form.goals.includes(g)
                        ? 'border-orange-500 bg-orange-50 shadow-sm' 
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-3 h-5 w-5 text-orange-600 focus:ring-orange-500"
                      onChange={() => toggleValue("goals", g)}
                    />
                    <span className="text-gray-900 font-medium">{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Channels */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Which channels do you want to use?
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "WhatsApp Automation",
                  "AI Email Automation",
                  "SMS",
                  "RCS",
                ].map((c, index) => (
                  <label 
                    key={c} 
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:border-purple-400 hover:bg-purple-50 hover:shadow-sm ${
                      form.channels.includes(c)
                        ? 'border-purple-500 bg-purple-50 shadow-sm' 
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-3 h-5 w-5 text-purple-600 focus:ring-purple-500"
                      onChange={() => toggleValue("channels", c)}
                    />
                    <span className="text-gray-900 font-medium">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div 
                className="bg-red-50 border border-red-200 rounded-xl p-4 animate-pulse"
              >
                <p className="text-red-700 font-medium flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed ${
                loading ? 'animate-pulse' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "See My Recommended Plan →"
              )}
            </button>

            {/* Trust Note */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500 flex items-center justify-center">
                <span className="mr-2">🔒</span>
                Your information is secure and private
              </p>
            </div>
          </div>
        </form>

        {/* Steps Indicator */}
        <div className="mt-8 flex justify-center space-x-2">
          {[1, 2, 3, 4].map((step) => (
            <div 
              key={step}
              className={`h-2 rounded-full transition-all duration-500 ${
                mounted ? 'w-8' : 'w-2'
              } ${
                step === 1 ? 'bg-blue-500' : 
                step === 2 ? 'bg-green-500' : 
                step === 3 ? 'bg-orange-500' : 
                'bg-purple-500'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}