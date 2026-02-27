const DEFAULT_SITE_URL = "https://www.vaiket.com";

function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function withProtocol(value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }
  return `https://${value}`;
}

export function getSeoSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.SITE_URL ||
    DEFAULT_SITE_URL;

  return trimTrailingSlash(withProtocol(raw.trim()));
}

export function toAbsoluteUrl(pathname: string) {
  if (/^https?:\/\//i.test(pathname)) {
    return pathname;
  }
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${getSeoSiteUrl()}${normalizedPath}`;
}
