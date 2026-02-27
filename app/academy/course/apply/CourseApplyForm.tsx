"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import {
  ACADEMY_COURSE_LEVEL_OPTIONS,
  ACADEMY_TRACK_OPTIONS,
} from "@/lib/academy";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  education: string;
  track: string;
  courseLevel: string;
  availability: string;
  notes: string;
};

export default function CourseApplyForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    education: "",
    track: "web-development",
    courseLevel: "Foundation",
    availability: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/academy/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationType: "course",
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          city: form.city,
          education: form.education,
          track: form.track,
          experienceLevel: form.courseLevel,
          availability: form.availability,
          notes: form.notes,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not submit application");
      }

      router.push(
        `/academy/course/apply/success?application_no=${encodeURIComponent(
          String(data.application_no ?? "")
        )}`
      );
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Unable to submit application.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Course Enrollment Form</h1>
      <p className="mt-2 text-sm text-slate-600">
        Submit your details to reserve your seat in the next course cohort.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input
          required
          label="Full name"
          value={form.fullName}
          onChange={(value) => setForm((prev) => ({ ...prev, fullName: value }))}
          placeholder="Your full name"
        />
        <Input
          required
          type="email"
          label="Email"
          value={form.email}
          onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
          placeholder="you@example.com"
        />
        <Input
          required
          label="Phone"
          value={form.phone}
          onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
          placeholder="Phone number"
        />
        <Input
          label="City"
          value={form.city}
          onChange={(value) => setForm((prev) => ({ ...prev, city: value }))}
          placeholder="Current city"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Input
          label="Education"
          value={form.education}
          onChange={(value) => setForm((prev) => ({ ...prev, education: value }))}
          placeholder="Current qualification"
        />
        <Input
          label="Availability"
          value={form.availability}
          onChange={(value) => setForm((prev) => ({ ...prev, availability: value }))}
          placeholder="Example: Weekends / 15 hrs week"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Select
          label="Course track"
          value={form.track}
          onChange={(value) => setForm((prev) => ({ ...prev, track: value }))}
          options={ACADEMY_TRACK_OPTIONS.map((item) => ({ value: item.value, label: item.label }))}
        />
        <Select
          label="Target level"
          value={form.courseLevel}
          onChange={(value) => setForm((prev) => ({ ...prev, courseLevel: value }))}
          options={ACADEMY_COURSE_LEVEL_OPTIONS.map((value) => ({ value, label: value }))}
        />
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Notes (optional)</label>
        <textarea
          value={form.notes}
          onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
          rows={4}
          placeholder="Share your goals, current skill level, or any question..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Enrollment Request"
          )}
        </button>
        <Link
          href="/academy/course"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
        >
          Back to Course Page
        </Link>
      </div>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
