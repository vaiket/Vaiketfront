export const BUSINESS_REFERRAL_COMMISSION_RATE = 0.25;
export const BUSINESS_REFERRAL_CURRENCY = "INR";
export const BUSINESS_REFERRAL_MIN_WITHDRAWAL = 100;
export const BUSINESS_REFERRAL_OPEN_WITHDRAWAL_STATUSES = [
  "requested",
  "processing",
] as const;

const REFERRAL_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomFromCharset(length: number, charset: string) {
  let output = "";
  for (let index = 0; index < length; index += 1) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    output += charset[randomIndex];
  }
  return output;
}

export function normalizeReferralCode(input: string) {
  return input
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 16);
}

export function createReferralCodeCandidate(seed?: string) {
  const seedPart = normalizeReferralCode(seed ?? "")
    .replace(/[0-9]/g, "")
    .slice(0, 4);
  const prefix = seedPart || "VK";
  const randomPart = randomFromCharset(6, REFERRAL_CODE_CHARS);
  return `${prefix}${randomPart}`.slice(0, 12);
}

export function calculateReferralCommission(amount: number) {
  const safeAmount = Number.isFinite(amount) ? Math.max(0, amount) : 0;
  return Number((safeAmount * BUSINESS_REFERRAL_COMMISSION_RATE).toFixed(2));
}

function randomDigits(length = 6) {
  const start = Math.pow(10, length - 1);
  const end = Math.pow(10, length) - 1;
  return Math.floor(start + Math.random() * (end - start + 1));
}

export function createReferralWithdrawalRequestNo(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `RWD-${year}${month}${day}-${randomDigits(6)}`;
}
