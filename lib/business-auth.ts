import crypto from "crypto";

export const BUSINESS_SESSION_COOKIE = "vaiket_business_session";
export const BUSINESS_SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

const PASSWORD_SCHEME = "pbkdf2";
const PASSWORD_DIGEST = "sha512";
const PASSWORD_ITERATIONS = 120000;
const PASSWORD_KEY_LENGTH = 64;

export type BusinessSessionPayload = {
  userId: string;
  email: string;
  name: string;
  exp: number;
};

type SessionBody = Omit<BusinessSessionPayload, "exp">;

function getSessionSecret() {
  const secret =
    process.env.BUSINESS_SESSION_SECRET ||
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error(
      "Missing BUSINESS_SESSION_SECRET (or ADMIN_SESSION_SECRET / SUPABASE_SERVICE_ROLE_KEY fallback)"
    );
  }
  return secret;
}

function sign(value: string) {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("base64url");
}

function safeJsonParse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function hashBusinessPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const digest = crypto
    .pbkdf2Sync(password, salt, PASSWORD_ITERATIONS, PASSWORD_KEY_LENGTH, PASSWORD_DIGEST)
    .toString("base64");

  return `${PASSWORD_SCHEME}$${PASSWORD_ITERATIONS}$${salt.toString("base64")}$${digest}`;
}

export function verifyBusinessPassword(password: string, storedHash: string): boolean {
  try {
    const [scheme, iterRaw, saltRaw, expectedRaw] = storedHash.split("$");
    if (scheme !== PASSWORD_SCHEME) return false;

    const iterations = Number(iterRaw);
    if (!Number.isInteger(iterations) || iterations <= 0) return false;

    const salt = Buffer.from(saltRaw, "base64");
    const expected = Buffer.from(expectedRaw, "base64");

    if (salt.length === 0 || expected.length === 0) return false;

    const actual = crypto.pbkdf2Sync(password, salt, iterations, expected.length, PASSWORD_DIGEST);
    if (actual.length !== expected.length) return false;

    return crypto.timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export function createBusinessSessionToken(
  payload: SessionBody,
  maxAgeSeconds = BUSINESS_SESSION_TTL_SECONDS
) {
  const exp = Math.floor(Date.now() / 1000) + maxAgeSeconds;
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString("base64url");
  const signature = sign(body);
  return `${body}.${signature}`;
}

export function readBusinessSessionToken(token?: string | null): BusinessSessionPayload | null {
  if (!token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expectedSignature = sign(body);
  const receivedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (receivedBuffer.length !== expectedBuffer.length) return null;
  if (!crypto.timingSafeEqual(receivedBuffer, expectedBuffer)) return null;

  const payload = safeJsonParse<BusinessSessionPayload>(
    Buffer.from(body, "base64url").toString("utf8")
  );

  if (!payload?.userId || !payload?.email || !payload?.name || !payload?.exp) return null;
  if (payload.exp <= Math.floor(Date.now() / 1000)) return null;

  return payload;
}

export function getBusinessCookieOptions(maxAgeSeconds = BUSINESS_SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
