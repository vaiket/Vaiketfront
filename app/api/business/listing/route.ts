import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { BUSINESS_SESSION_COOKIE, readBusinessSessionToken } from "@/lib/business-auth";
import {
  BUSINESS_CATEGORIES,
  BUSINESS_VERIFICATION_BASE_FEE,
  BUSINESS_VERIFICATION_GST,
  BUSINESS_VERIFICATION_TOTAL,
  isReservedBusinessUsername,
  normalizeBusinessUsername,
  slugifyBusinessName,
} from "@/lib/business-identity";

type ListingPayload = {
  id?: string;
  businessName?: string;
  category?: string;
  title?: string;
  details?: string;
  city?: string;
  address?: string;
  phone?: string;
  website?: string;
  whatsapp?: string;
  logoUrl?: string;
  publicUsername?: string;
  ownerName?: string;
  contactEmail?: string;
  googleMapsUrl?: string;
  yearsExperience?: number | string;
  coverBannerUrl?: string;
  aboutShort?: string;
  aboutLong?: string;
  socialLinks?: unknown;
  keyHighlights?: unknown;
  galleryImages?: unknown;
  portfolioImages?: unknown;
  certificates?: unknown;
  testimonials?: unknown;
  faqs?: unknown;
};

const LISTING_SELECT =
  "id, user_id, business_name, public_username, slug, category, title, details, city, address, phone, website, whatsapp, logo_url, cover_banner_url, owner_name, contact_email, google_maps_url, years_experience, about_short, about_long, social_links, key_highlights, gallery_images, portfolio_images, certificates, testimonials, faqs, profile_views, enquiry_count, status, payment_status, verification_fee, verification_gst, verification_total, certificate_id, rejection_reason, approved_at, published_at, created_at, updated_at";

function isAuthorized(req: NextRequest) {
  const token = req.cookies.get(BUSINESS_SESSION_COOKIE)?.value;
  return readBusinessSessionToken(token);
}

function cleanText(value: unknown, max = 1000) {
  return String(value ?? "").trim().slice(0, max);
}

function cleanEmail(value: unknown) {
  const normalized = cleanText(value, 160).toLowerCase();
  if (!normalized) return "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) ? normalized : "";
}

function cleanUrlList(value: unknown, maxItems = 20, maxLength = 1000) {
  let rawValues: string[] = [];

  if (Array.isArray(value)) {
    rawValues = value.map((item) => cleanText(item, maxLength));
  } else if (typeof value === "string") {
    rawValues = value
      .split(/\r?\n|,/)
      .map((item) => cleanText(item, maxLength));
  }

  const deduped = Array.from(new Set(rawValues.filter(Boolean)));
  return deduped.slice(0, maxItems);
}

function cleanStringList(value: unknown, maxItems = 12, maxLength = 160) {
  let rawValues: string[] = [];

  if (Array.isArray(value)) {
    rawValues = value.map((item) => cleanText(item, maxLength));
  } else if (typeof value === "string") {
    rawValues = value
      .split(/\r?\n|,/)
      .map((item) => cleanText(item, maxLength));
  }

  const deduped = Array.from(new Set(rawValues.filter(Boolean)));
  return deduped.slice(0, maxItems);
}

type TestimonialItem = {
  name: string;
  text: string;
  rating?: number;
};

function cleanTestimonials(value: unknown, maxItems = 12): TestimonialItem[] {
  const results: TestimonialItem[] = [];
  const pushItem = (nameValue: unknown, textValue: unknown, ratingValue?: unknown) => {
    const name = cleanText(nameValue, 80) || "Customer";
    const text = cleanText(textValue, 320);
    if (!text) return;
    const ratingRaw = Number(ratingValue);
    const rating = Number.isFinite(ratingRaw)
      ? Math.max(1, Math.min(5, Math.round(ratingRaw)))
      : undefined;
    results.push({ name, text, ...(rating ? { rating } : {}) });
  };

  if (Array.isArray(value)) {
    for (const item of value) {
      if (results.length >= maxItems) break;
      if (item && typeof item === "object" && !Array.isArray(item)) {
        pushItem((item as Record<string, unknown>).name, (item as Record<string, unknown>).text, (item as Record<string, unknown>).rating);
      } else {
        const text = cleanText(item, 320);
        if (text) pushItem("Customer", text);
      }
    }
  } else if (typeof value === "string") {
    const lines = value.split(/\r?\n/).map((line) => cleanText(line, 400)).filter(Boolean);
    for (const line of lines.slice(0, maxItems)) {
      const [namePart, textPart] = line.split("|").map((part) => cleanText(part, 320));
      if (textPart) {
        pushItem(namePart || "Customer", textPart);
      } else if (namePart) {
        pushItem("Customer", namePart);
      }
    }
  }

  return results;
}

type FaqItem = { question: string; answer: string };

function cleanFaqs(value: unknown, maxItems = 12): FaqItem[] {
  const results: FaqItem[] = [];

  const pushFaq = (questionValue: unknown, answerValue: unknown) => {
    const question = cleanText(questionValue, 180);
    const answer = cleanText(answerValue, 500);
    if (!question || !answer) return;
    results.push({ question, answer });
  };

  if (Array.isArray(value)) {
    for (const item of value) {
      if (results.length >= maxItems) break;
      if (item && typeof item === "object" && !Array.isArray(item)) {
        pushFaq((item as Record<string, unknown>).question, (item as Record<string, unknown>).answer);
      }
    }
  } else if (typeof value === "string") {
    const lines = value.split(/\r?\n/).map((line) => cleanText(line, 700)).filter(Boolean);
    for (const line of lines.slice(0, maxItems)) {
      const [question, answer] = line.split("|").map((part) => cleanText(part, 500));
      if (question && answer) pushFaq(question, answer);
    }
  }

  return results;
}

function cleanSocialLinks(value: unknown) {
  const links = {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    x: "",
  };

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return links;
  }

  const source = value as Record<string, unknown>;
  links.instagram = cleanText(source.instagram, 280);
  links.facebook = cleanText(source.facebook, 280);
  links.linkedin = cleanText(source.linkedin, 280);
  links.youtube = cleanText(source.youtube, 280);
  links.x = cleanText(source.x ?? source.twitter, 280);
  return links;
}

async function ensureUniqueSlug(base: string, listingId?: string) {
  const normalizedBase = base || "business";
  let slug = normalizedBase;
  let index = 1;

  while (true) {
    const { data } = await supabase
      .from("business_listings")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (!data || (listingId && data.id === listingId)) {
      return slug;
    }

    slug = `${normalizedBase}-${index}`;
    index += 1;
  }
}

function withSuffix(base: string, index: number, maxLength = 40) {
  if (index <= 0) return base.slice(0, maxLength);
  const suffix = `-${index}`;
  const safeBase = base.slice(0, Math.max(3, maxLength - suffix.length));
  return `${safeBase}${suffix}`;
}

async function ensureUniquePublicUsername(base: string, listingId?: string) {
  const normalizedBase = normalizeBusinessUsername(base) || "business";
  let index = 0;

  while (index < 200) {
    const candidate = withSuffix(normalizedBase, index);
    if (!candidate || isReservedBusinessUsername(candidate)) {
      index += 1;
      continue;
    }

    const { data } = await supabase
      .from("business_listings")
      .select("id")
      .ilike("public_username", candidate)
      .maybeSingle();

    if (!data || (listingId && data.id === listingId)) {
      return candidate;
    }

    index += 1;
  }

  throw new Error("Unable to reserve public username.");
}

export async function GET(req: NextRequest) {
  try {
    const session = isAuthorized(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("business_listings")
      .select(LISTING_SELECT)
      .eq("user_id", session.userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("BUSINESS LISTING GET ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Could not fetch listing." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, listing: data ?? null });
  } catch (error) {
    console.error("BUSINESS LISTING API GET ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = isAuthorized(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as ListingPayload;
    const listingId = cleanText(body.id, 80);
    const businessName = cleanText(body.businessName, 140);
    const category = cleanText(body.category, 80);
    const title = cleanText(body.title, 160);
    const details = cleanText(body.details, 2000);
    const city = cleanText(body.city, 120);
    const address = cleanText(body.address, 220);
    const phone = cleanText(body.phone, 32);
    const website = cleanText(body.website, 280);
    const whatsapp = cleanText(body.whatsapp, 32);
    const logoUrl = cleanText(body.logoUrl, 1000);
    const publicUsernameInput = cleanText(body.publicUsername, 80);

    const ownerName = cleanText(body.ownerName, 120);
    const contactEmail = cleanEmail(body.contactEmail);
    const googleMapsUrl = cleanText(body.googleMapsUrl, 1200);
    const coverBannerUrl = cleanText(body.coverBannerUrl, 1000);
    const aboutShort = cleanText(body.aboutShort, 320);
    const aboutLong = cleanText(body.aboutLong, 4000);
    const yearsExperienceRaw = Number(body.yearsExperience);
    const yearsExperience = Number.isFinite(yearsExperienceRaw)
      ? Math.max(0, Math.min(80, Math.round(yearsExperienceRaw)))
      : null;

    const socialLinks = cleanSocialLinks(body.socialLinks);
    const keyHighlights = cleanStringList(body.keyHighlights, 10, 120);
    const galleryImages = cleanUrlList(body.galleryImages, 24, 1000);
    const portfolioImages = cleanUrlList(body.portfolioImages, 24, 1000);
    const certificates = cleanUrlList(body.certificates, 12, 1000);
    const testimonials = cleanTestimonials(body.testimonials, 12);
    const faqs = cleanFaqs(body.faqs, 12);

    if (!businessName || !category || !title || !details || !city || !address || !phone) {
      return NextResponse.json(
        { success: false, error: "Please fill all required business fields." },
        { status: 400 }
      );
    }

    if (!BUSINESS_CATEGORIES.includes(category as (typeof BUSINESS_CATEGORIES)[number])) {
      return NextResponse.json(
        { success: false, error: "Please select a valid category." },
        { status: 400 }
      );
    }

    const baseSlug = slugifyBusinessName(businessName);
    if (!baseSlug) {
      return NextResponse.json(
        { success: false, error: "Business name is not valid for slug generation." },
        { status: 400 }
      );
    }

    const slug = await ensureUniqueSlug(baseSlug, listingId || undefined);
    const normalizedUsername = normalizeBusinessUsername(publicUsernameInput || businessName);
    if (!normalizedUsername || normalizedUsername.length < 3) {
      return NextResponse.json(
        { success: false, error: "Public username must be at least 3 characters." },
        { status: 400 }
      );
    }

    if (isReservedBusinessUsername(normalizedUsername)) {
      return NextResponse.json(
        { success: false, error: "This public username is reserved. Please choose another one." },
        { status: 400 }
      );
    }

    const publicUsername = await ensureUniquePublicUsername(
      normalizedUsername,
      listingId || undefined
    );

    const listingPayload = {
      business_name: businessName,
      public_username: publicUsername,
      slug,
      category,
      title,
      details,
      city,
      address,
      phone,
      website: website || null,
      whatsapp: whatsapp || null,
      logo_url: logoUrl || null,
      cover_banner_url: coverBannerUrl || null,
      owner_name: ownerName || null,
      contact_email: contactEmail || null,
      google_maps_url: googleMapsUrl || null,
      years_experience: yearsExperience,
      about_short: aboutShort || title,
      about_long: aboutLong || details,
      social_links: socialLinks,
      key_highlights: keyHighlights,
      gallery_images: galleryImages,
      portfolio_images: portfolioImages,
      certificates,
      testimonials,
      faqs,
    };

    if (listingId) {
      const { data: existingListing, error: existingListingError } = await supabase
        .from("business_listings")
        .select("id, status, payment_status, approved_at, published_at")
        .eq("id", listingId)
        .eq("user_id", session.userId)
        .maybeSingle();

      if (existingListingError || !existingListing) {
        return NextResponse.json(
          { success: false, error: "Listing not found." },
          { status: 404 }
        );
      }

      const keepLiveWithoutReapproval =
        existingListing.status === "approved" &&
        existingListing.payment_status === "paid";

      const { data, error } = await supabase
        .from("business_listings")
        .update({
          ...listingPayload,
          status: keepLiveWithoutReapproval ? "approved" : "draft",
          rejection_reason: keepLiveWithoutReapproval ? null : undefined,
          approved_at: keepLiveWithoutReapproval
            ? existingListing.approved_at || new Date().toISOString()
            : undefined,
          published_at: keepLiveWithoutReapproval
            ? existingListing.published_at || new Date().toISOString()
            : undefined,
        })
        .eq("id", listingId)
        .eq("user_id", session.userId)
        .select(LISTING_SELECT)
        .single();

      if (error || !data) {
        console.error("BUSINESS LISTING UPDATE ERROR:", error);
        return NextResponse.json(
          { success: false, error: "Could not update business listing." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, listing: data });
    }

    const { data, error } = await supabase
      .from("business_listings")
      .insert({
        user_id: session.userId,
        ...listingPayload,
        status: "draft",
        payment_status: "unpaid",
        verification_fee: BUSINESS_VERIFICATION_BASE_FEE,
        verification_gst: BUSINESS_VERIFICATION_GST,
        verification_total: BUSINESS_VERIFICATION_TOTAL,
      })
      .select(LISTING_SELECT)
      .single();

    if (error || !data) {
      console.error("BUSINESS LISTING INSERT ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Could not create business listing." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, listing: data });
  } catch (error) {
    console.error("BUSINESS LISTING API POST ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
