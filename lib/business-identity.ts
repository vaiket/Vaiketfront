export const BUSINESS_GST_RATE = 0.18;
export const BUSINESS_VERIFICATION_BASE_FEE = 99;
export const BUSINESS_VERIFICATION_GST = Number(
  (BUSINESS_VERIFICATION_BASE_FEE * BUSINESS_GST_RATE).toFixed(2)
);
export const BUSINESS_VERIFICATION_TOTAL = Number(
  (BUSINESS_VERIFICATION_BASE_FEE + BUSINESS_VERIFICATION_GST).toFixed(2)
);
export const BUSINESS_VERIFICATION_TOTAL_PAISE = Math.round(
  BUSINESS_VERIFICATION_TOTAL * 100
);

export const BUSINESS_CATEGORIES = [
  "Printing and Branding",
  "Healthcare Services",
  "Interior Design",
  "Digital Marketing",
  "Education and Training",
  "Local Services",
] as const;

function randomDigits(length = 6) {
  const start = Math.pow(10, length - 1);
  const end = Math.pow(10, length) - 1;
  return Math.floor(start + Math.random() * (end - start + 1));
}

export function createBusinessPaymentOrderNo(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `BLP-${year}${month}${day}-${randomDigits(6)}`;
}

export function createBusinessCertificateId(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `VBIP-${year}${month}${day}-${randomDigits(6)}`;
}

export function slugifyBusinessName(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function toBusinessCategorySlug(category: string) {
  return slugifyBusinessName(category);
}

export function resolveBusinessCategoryFromSlug(slug: string) {
  const normalizedSlug = slugifyBusinessName(slug);
  if (!normalizedSlug) return null;
  return (
    BUSINESS_CATEGORIES.find(
      (category) => toBusinessCategorySlug(category) === normalizedSlug
    ) ?? null
  );
}

export const BUSINESS_CATEGORY_SLUGS = BUSINESS_CATEGORIES.map((category) => ({
  category,
  slug: toBusinessCategorySlug(category),
}));

export const RESERVED_BUSINESS_USERNAMES = [
  "academy",
  "admin",
  "api",
  "business",
  "checkout",
  "company",
  "favicon",
  "get-started",
  "legal",
  "payment",
  "product",
  "resources",
  "sitemap",
  "term",
  "thank-you",
] as const;

export function normalizeBusinessUsername(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function isReservedBusinessUsername(username: string) {
  const normalized = normalizeBusinessUsername(username);
  if (!normalized) return true;
  return RESERVED_BUSINESS_USERNAMES.includes(
    normalized as (typeof RESERVED_BUSINESS_USERNAMES)[number]
  );
}

export function formatInr(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
