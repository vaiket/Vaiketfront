function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";
  return trimTrailingSlash(siteUrl);
}

export function buildBusinessPublicUrl(publicUsername: string) {
  return `${getSiteUrl()}/${publicUsername}`;
}

export function buildQrCodeImageUrl(targetUrl: string, size = 240) {
  return `https://quickchart.io/qr?size=${size}&text=${encodeURIComponent(targetUrl)}`;
}
