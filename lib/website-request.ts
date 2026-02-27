export const GST_RATE = 0.18 as const;

export const WEBSITE_PLAN_CATALOG = {
  starter: {
    id: "starter",
    label: "Starter Website",
    slug: "starter",
    basePrice: 4999,
    paymentEnabled: true,
    pages: "Up to 5 pages",
    delivery: "5-7 working days",
  },
  business: {
    id: "business",
    label: "Business Website",
    slug: "business",
    basePrice: 19999,
    paymentEnabled: true,
    pages: "6-8 pages",
    delivery: "7-10 working days",
  },
  enterprise: {
    id: "enterprise",
    label: "Enterprise Website",
    slug: "enterprise",
    basePrice: 0,
    paymentEnabled: false,
    pages: "Flexible scope",
    delivery: "Custom timeline",
  },
} as const;

export type WebsitePlanId = keyof typeof WEBSITE_PLAN_CATALOG;

export const WEBSITE_ADDON_CATALOG = {
  extra_pages: {
    id: "extra_pages",
    label: "Extra pages pack",
    description: "Add 2 additional website pages",
    price: 2500,
  },
  blog_setup: {
    id: "blog_setup",
    label: "Blog setup",
    description: "Blog module with category and listing page",
    price: 3500,
  },
  booking_flow: {
    id: "booking_flow",
    label: "Booking workflow",
    description: "Appointment or callback booking flow",
    price: 4000,
  },
  crm_integration: {
    id: "crm_integration",
    label: "CRM integration",
    description: "Lead push to CRM with stage mapping",
    price: 6000,
  },
  ecommerce_lite: {
    id: "ecommerce_lite",
    label: "E-commerce lite",
    description: "Simple catalog and payment-ready setup",
    price: 9500,
  },
} as const;

export type WebsiteAddonId = keyof typeof WEBSITE_ADDON_CATALOG;

export const WEBSITE_GOAL_OPTIONS = [
  "Generate more qualified leads",
  "Increase WhatsApp and call enquiries",
  "Build trust with premium online presence",
  "Improve conversion from paid traffic",
  "Prepare for CRM and automation integration",
] as const;

export const WEBSITE_STATUS_OPTIONS = [
  "No website yet",
  "Have a basic website",
  "Need redesign of existing website",
] as const;

function pickUnique<T extends string>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export function isWebsitePlanId(value: string): value is WebsitePlanId {
  return value in WEBSITE_PLAN_CATALOG;
}

export function sanitizeWebsiteAddons(input: unknown): WebsiteAddonId[] {
  if (!Array.isArray(input)) return [];
  const keys = Object.keys(WEBSITE_ADDON_CATALOG) as WebsiteAddonId[];

  return pickUnique(
    input
      .map((item) => String(item))
      .filter((item): item is WebsiteAddonId => keys.includes(item as WebsiteAddonId))
  );
}

export function sanitizeStringList(input: unknown, maxItems = 8): string[] {
  if (!Array.isArray(input)) return [];

  return pickUnique(
    input
      .map((item) => String(item).trim())
      .filter(Boolean)
      .slice(0, maxItems)
  );
}

export function calculateWebsiteQuote(plan: WebsitePlanId, addOns: WebsiteAddonId[]) {
  const planConfig = WEBSITE_PLAN_CATALOG[plan];
  const basePrice = planConfig.basePrice;
  const addOnAmount = addOns.reduce((sum, addOnId) => {
    return sum + WEBSITE_ADDON_CATALOG[addOnId].price;
  }, 0);
  const subtotal = basePrice + addOnAmount;
  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + gst;

  return {
    basePrice,
    addOnAmount,
    subtotal,
    gst,
    total,
  };
}

export function toPaise(amountInInr: number) {
  return Math.round(amountInInr * 100);
}

export function formatInr(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

function buildNo(prefix: "WR" | "ORD", date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${year}${month}${day}-${rand}`;
}

export function createWebsiteRequestNo(date?: Date) {
  return buildNo("WR", date);
}

export function createOrderNo(date?: Date) {
  return buildNo("ORD", date);
}
