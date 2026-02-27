export const ACADEMY_TRACK_OPTIONS = [
  { value: "web-development", label: "Web Development" },
  { value: "automation-crm", label: "Automation and CRM Ops" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "performance-marketing", label: "Performance Marketing" },
  { value: "ai-productivity", label: "AI Productivity" },
  { value: "general", label: "General (Need guidance)" },
] as const;

export const ACADEMY_COURSE_LEVEL_OPTIONS = [
  "Foundation",
  "Intermediate",
  "Advanced",
] as const;

export const ACADEMY_EXPERIENCE_OPTIONS = [
  "Beginner",
  "Learning basics",
  "Worked on small projects",
  "Intermediate",
  "Advanced",
] as const;

export type AcademyTrack = (typeof ACADEMY_TRACK_OPTIONS)[number]["value"];

export const ACADEMY_APPLICATION_TYPES = ["internship", "course"] as const;
export type AcademyApplicationType = (typeof ACADEMY_APPLICATION_TYPES)[number];

export function isAcademyTrack(value: string): value is AcademyTrack {
  return ACADEMY_TRACK_OPTIONS.some((item) => item.value === value);
}

export function isAcademyApplicationType(value: string): value is AcademyApplicationType {
  return ACADEMY_APPLICATION_TYPES.includes(value as AcademyApplicationType);
}

export function createInternshipApplicationNo(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `INT-${year}${month}${day}-${rand}`;
}
