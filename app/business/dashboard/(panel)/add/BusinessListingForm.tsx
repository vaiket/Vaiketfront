"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { CheckCircle2, ImagePlus, Loader2, Sparkles } from "lucide-react";
import { BUSINESS_CATEGORIES } from "@/lib/business-identity";

type JsonRecord = Record<string, unknown>;

export type BusinessListing = {
  id: string;
  business_name: string;
  public_username: string | null;
  category: string;
  title: string;
  details: string;
  city: string;
  address: string;
  phone: string;
  website: string | null;
  whatsapp: string | null;
  logo_url: string | null;
  cover_banner_url?: string | null;
  owner_name?: string | null;
  contact_email?: string | null;
  google_maps_url?: string | null;
  years_experience?: number | null;
  about_short?: string | null;
  about_long?: string | null;
  social_links?: unknown;
  key_highlights?: unknown;
  gallery_images?: unknown;
  portfolio_images?: unknown;
  certificates?: unknown;
  testimonials?: unknown;
  faqs?: unknown;
  status: string;
  payment_status: string;
};

type FormState = {
  id?: string;
  businessName: string;
  category: string;
  title: string;
  details: string;
  city: string;
  address: string;
  phone: string;
  website: string;
  whatsapp: string;
  logoUrl: string;
  coverBannerUrl: string;
  publicUsername: string;
  ownerName: string;
  contactEmail: string;
  googleMapsUrl: string;
  yearsExperience: string;
  aboutShort: string;
  aboutLong: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  xUrl: string;
  keyHighlightsText: string;
  galleryImagesText: string;
  portfolioImagesText: string;
  certificatesText: string;
  testimonialsText: string;
  faqsText: string;
};

type MultiAssetField = "galleryImagesText" | "portfolioImagesText" | "certificatesText";
type UploadField = "logo" | "cover" | MultiAssetField;

function toStringList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item ?? "").trim())
    .filter(Boolean);
}

function toTestimonialsText(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return String(item ?? "").trim();
      }
      const record = item as JsonRecord;
      const name = String(record.name ?? "").trim();
      const text = String(record.text ?? "").trim();
      if (!name && !text) return "";
      if (!text) return name;
      return `${name || "Customer"} | ${text}`;
    })
    .filter(Boolean)
    .join("\n");
}

function toFaqText(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return "";
      const record = item as JsonRecord;
      const question = String(record.question ?? "").trim();
      const answer = String(record.answer ?? "").trim();
      if (!question || !answer) return "";
      return `${question} | ${answer}`;
    })
    .filter(Boolean)
    .join("\n");
}

function fromSocialLinks(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {
      instagramUrl: "",
      facebookUrl: "",
      linkedinUrl: "",
      youtubeUrl: "",
      xUrl: "",
    };
  }

  const record = value as JsonRecord;
  return {
    instagramUrl: String(record.instagram ?? "").trim(),
    facebookUrl: String(record.facebook ?? "").trim(),
    linkedinUrl: String(record.linkedin ?? "").trim(),
    youtubeUrl: String(record.youtube ?? "").trim(),
    xUrl: String(record.x ?? record.twitter ?? "").trim(),
  };
}

function parseLineList(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseTestimonials(value: string) {
  return parseLineList(value).map((line) => {
    const [name, text] = line.split("|").map((part) => part.trim());
    return { name: name || "Customer", text: text || name || "" };
  });
}

function parseFaqs(value: string) {
  return parseLineList(value)
    .map((line) => {
      const [question, answer] = line.split("|").map((part) => part.trim());
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter(Boolean);
}

function mapFromListing(listing: BusinessListing | null): FormState {
  if (!listing) {
    return {
      businessName: "",
      category: BUSINESS_CATEGORIES[0],
      title: "",
      details: "",
      city: "",
      address: "",
      phone: "",
      website: "",
      whatsapp: "",
      logoUrl: "",
      coverBannerUrl: "",
      publicUsername: "",
      ownerName: "",
      contactEmail: "",
      googleMapsUrl: "",
      yearsExperience: "",
      aboutShort: "",
      aboutLong: "",
      instagramUrl: "",
      facebookUrl: "",
      linkedinUrl: "",
      youtubeUrl: "",
      xUrl: "",
      keyHighlightsText: "",
      galleryImagesText: "",
      portfolioImagesText: "",
      certificatesText: "",
      testimonialsText: "",
      faqsText: "",
    };
  }

  const social = fromSocialLinks(listing.social_links);
  return {
    id: listing.id,
    businessName: listing.business_name,
    category: listing.category,
    title: listing.title,
    details: listing.details,
    city: listing.city,
    address: listing.address,
    phone: listing.phone,
    website: listing.website ?? "",
    whatsapp: listing.whatsapp ?? "",
    logoUrl: listing.logo_url ?? "",
    coverBannerUrl: listing.cover_banner_url ?? "",
    publicUsername: listing.public_username ?? "",
    ownerName: listing.owner_name ?? "",
    contactEmail: listing.contact_email ?? "",
    googleMapsUrl: listing.google_maps_url ?? "",
    yearsExperience: listing.years_experience ? String(listing.years_experience) : "",
    aboutShort: listing.about_short ?? "",
    aboutLong: listing.about_long ?? "",
    instagramUrl: social.instagramUrl,
    facebookUrl: social.facebookUrl,
    linkedinUrl: social.linkedinUrl,
    youtubeUrl: social.youtubeUrl,
    xUrl: social.xUrl,
    keyHighlightsText: toStringList(listing.key_highlights).join("\n"),
    galleryImagesText: toStringList(listing.gallery_images).join("\n"),
    portfolioImagesText: toStringList(listing.portfolio_images).join("\n"),
    certificatesText: toStringList(listing.certificates).join("\n"),
    testimonialsText: toTestimonialsText(listing.testimonials),
    faqsText: toFaqText(listing.faqs),
  };
}

async function uploadBusinessImage(file: File, folder: string) {
  const body = new FormData();
  body.append("file", file);
  body.append("folder", folder);

  const response = await fetch("/api/business/upload-logo", {
    method: "POST",
    body,
  });
  const data = await response.json();
  if (!response.ok || !data?.success || !data?.url) {
    throw new Error(data?.error || "Could not upload image.");
  }
  return String(data.url);
}

export default function BusinessListingForm({ initialListing }: { initialListing: BusinessListing | null }) {
  const [form, setForm] = useState<FormState>(() => mapFromListing(initialListing));
  const [loading, setLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState<UploadField | null>(null);
  const [showManualBrandUrls, setShowManualBrandUrls] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const actionLabel = useMemo(() => (form.id ? "Update Listing" : "Create Listing"), [form.id]);

  const profileChecks = useMemo(() => {
    const checks = [
      Boolean(form.businessName.trim()),
      Boolean(form.title.trim()),
      Boolean(form.aboutShort.trim()),
      Boolean(form.city.trim()),
      Boolean(form.phone.trim()),
      Boolean(form.logoUrl.trim()),
      Boolean(form.coverBannerUrl.trim()),
      parseLineList(form.keyHighlightsText).length > 0,
      parseLineList(form.galleryImagesText).length > 0,
      parseLineList(form.testimonialsText).length > 0,
      Boolean(form.address.trim()),
      Boolean(form.publicUsername.trim()),
    ];
    const completed = checks.filter(Boolean).length;
    return {
      completed,
      total: checks.length,
      percent: Math.round((completed / checks.length) * 100),
    };
  }, [form]);

  const onSingleImageUpload =
    (target: "logo" | "cover", folder: "logos" | "covers") =>
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) return;

      setUploadingField(target);
      setError("");
      setSuccess("");
      try {
        const url = await uploadBusinessImage(file, folder);
        setForm((prev) =>
          target === "logo" ? { ...prev, logoUrl: url } : { ...prev, coverBannerUrl: url }
        );
        setSuccess(target === "logo" ? "Logo uploaded successfully." : "Cover uploaded successfully.");
      } catch (uploadError) {
        const message = uploadError instanceof Error ? uploadError.message : "Could not upload image.";
        setError(message);
      } finally {
        setUploadingField(null);
      }
    };

  const onMultipleImageUpload =
    (target: MultiAssetField, folder: "gallery" | "portfolio" | "certificates") =>
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files ?? []);
      event.target.value = "";
      if (files.length === 0) return;

      setUploadingField(target);
      setError("");
      setSuccess("");
      try {
        const urls: string[] = [];
        for (const file of files.slice(0, 10)) {
          const uploadedUrl = await uploadBusinessImage(file, folder);
          urls.push(uploadedUrl);
        }

        setForm((prev) => {
          const existing = parseLineList(prev[target]);
          const merged = Array.from(new Set([...existing, ...urls]));
          return { ...prev, [target]: merged.join("\n") };
        });
        setSuccess(`${urls.length} image${urls.length > 1 ? "s" : ""} uploaded successfully.`);
      } catch (uploadError) {
        const message = uploadError instanceof Error ? uploadError.message : "Could not upload images.";
        setError(message);
      } finally {
        setUploadingField(null);
      }
    };

  const onRemoveMediaUrl = (target: MultiAssetField, url: string) => {
    setForm((prev) => {
      const remaining = parseLineList(prev[target]).filter((item) => item !== url);
      return { ...prev, [target]: remaining.join("\n") };
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const payload = {
        ...form,
        socialLinks: {
          instagram: form.instagramUrl,
          facebook: form.facebookUrl,
          linkedin: form.linkedinUrl,
          youtube: form.youtubeUrl,
          x: form.xUrl,
        },
        keyHighlights: parseLineList(form.keyHighlightsText),
        galleryImages: parseLineList(form.galleryImagesText),
        portfolioImages: parseLineList(form.portfolioImagesText),
        certificates: parseLineList(form.certificatesText),
        testimonials: parseTestimonials(form.testimonialsText),
        faqs: parseFaqs(form.faqsText),
      };

      const response = await fetch("/api/business/listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not save listing");
      }

      const listing = data.listing as BusinessListing;
      setForm(mapFromListing(listing));
      if (listing.status === "approved" && listing.payment_status === "paid") {
        setSuccess("Profile updated successfully. Changes are live on your public landing page.");
      } else if (listing.payment_status !== "paid") {
        setSuccess(
          "Profile saved. Next step: complete verification payment to submit for approval."
        );
      } else {
        setSuccess("Profile saved. Update is in review workflow.");
      }
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Could not save listing.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <section className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-700">
              <Sparkles className="h-3.5 w-3.5" />
              Profile conversion score
            </p>
            <h2 className="mt-1 text-lg font-extrabold text-slate-900">
              Build a lead-conversion mini website
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Fill more details to increase trust and enquiry conversion on your public profile.
            </p>
          </div>
          <p className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            {profileChecks.completed}/{profileChecks.total} completed
          </p>
        </div>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-cyan-100">
          <div
            className="h-full rounded-full bg-cyan-600 transition-all"
            style={{ width: `${profileChecks.percent}%` }}
          />
        </div>
        <div className="mt-3 grid gap-2 text-xs text-slate-600 md:grid-cols-3">
          <p className="rounded-lg border border-cyan-200 bg-white px-2.5 py-2">
            Upload logo and cover to improve first impression and trust.
          </p>
          <p className="rounded-lg border border-cyan-200 bg-white px-2.5 py-2">
            Add 6+ gallery images and 3+ testimonials for stronger conversion.
          </p>
          <p className="rounded-lg border border-cyan-200 bg-white px-2.5 py-2">
            Keep phone and WhatsApp updated for faster lead response.
          </p>
        </div>
      </section>

      <SectionCard title="Basic Identity" subtitle="Core brand details shown above the fold">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            required
            label="Business name"
            value={form.businessName}
            onChange={(value) => setForm((prev) => ({ ...prev, businessName: value }))}
          />
          <label>
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">Category *</span>
            <select
              required
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            >
              {BUSINESS_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Input
            required
            label="Headline"
            value={form.title}
            onChange={(value) => setForm((prev) => ({ ...prev, title: value }))}
          />
          <Input
            label="Owner name"
            value={form.ownerName}
            onChange={(value) => setForm((prev) => ({ ...prev, ownerName: value }))}
          />
        </div>

        <div className="mt-4">
          <Input
            required
            label="Public username"
            value={form.publicUsername}
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                publicUsername: value.toLowerCase().replace(/\s+/g, "-"),
              }))
            }
          />
          <p className="mt-1 text-xs text-slate-500">
            Public landing page URL:{" "}
            <span className="font-semibold">vaiket.com/{form.publicUsername || "your-username"}</span>
          </p>
          {form.publicUsername ? (
            <Link
              href={`/${form.publicUsername}`}
              target="_blank"
              className="mt-1.5 inline-flex text-xs font-semibold text-cyan-700 hover:underline"
            >
              Open public profile preview
            </Link>
          ) : null}
        </div>
      </SectionCard>

      <SectionCard title="Contact and Location" subtitle="Make it easy for customers to reach you">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            required
            label="Phone"
            value={form.phone}
            onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
          />
          <Input
            label="WhatsApp"
            value={form.whatsapp}
            onChange={(value) => setForm((prev) => ({ ...prev, whatsapp: value }))}
          />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Input
            label="Business email"
            type="email"
            value={form.contactEmail}
            onChange={(value) => setForm((prev) => ({ ...prev, contactEmail: value }))}
          />
          <Input
            label="Website URL"
            value={form.website}
            onChange={(value) => setForm((prev) => ({ ...prev, website: value }))}
          />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Input
            required
            label="City / location"
            value={form.city}
            onChange={(value) => setForm((prev) => ({ ...prev, city: value }))}
          />
          <Input
            label="Google Maps link"
            value={form.googleMapsUrl}
            onChange={(value) => setForm((prev) => ({ ...prev, googleMapsUrl: value }))}
          />
        </div>
        <div className="mt-4">
          <TextArea
            required
            label="Full address"
            rows={2}
            value={form.address}
            onChange={(value) => setForm((prev) => ({ ...prev, address: value }))}
          />
        </div>
      </SectionCard>

      <SectionCard title="Branding and Story" subtitle="Hero section assets and about copy">
        <p className="text-xs text-slate-500">
          Image upload is recommended. Direct URLs are optional.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <label className="inline-flex cursor-pointer items-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800">
            {uploadingField === "logo" ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Uploading logo...
              </>
            ) : (
              <>
                <ImagePlus className="mr-1.5 h-3.5 w-3.5" />
                Upload Logo
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={Boolean(uploadingField)}
              onChange={onSingleImageUpload("logo", "logos")}
            />
          </label>

          <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100">
            {uploadingField === "cover" ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Uploading cover...
              </>
            ) : (
              <>
                <ImagePlus className="mr-1.5 h-3.5 w-3.5" />
                Upload Cover
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={Boolean(uploadingField)}
              onChange={onSingleImageUpload("cover", "covers")}
            />
          </label>
          <button
            type="button"
            onClick={() => setShowManualBrandUrls((prev) => !prev)}
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            {showManualBrandUrls ? "Hide Manual URLs" : "Add URLs Manually"}
          </button>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <ImagePreviewCard label="Current Logo" url={form.logoUrl} />
          <ImagePreviewCard label="Current Cover Banner" url={form.coverBannerUrl} />
        </div>

        {showManualBrandUrls ? (
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <Input
              label="Logo URL (optional)"
              value={form.logoUrl}
              onChange={(value) => setForm((prev) => ({ ...prev, logoUrl: value }))}
            />
            <Input
              label="Cover banner URL (optional)"
              value={form.coverBannerUrl}
              onChange={(value) => setForm((prev) => ({ ...prev, coverBannerUrl: value }))}
            />
          </div>
        ) : null}

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Input
            label="Years of experience"
            type="number"
            value={form.yearsExperience}
            onChange={(value) => setForm((prev) => ({ ...prev, yearsExperience: value }))}
          />
          <Input
            required
            label="Short about"
            value={form.aboutShort}
            onChange={(value) => setForm((prev) => ({ ...prev, aboutShort: value }))}
          />
        </div>

        <div className="mt-4">
          <TextArea
            required
            label="Business details"
            rows={4}
            value={form.details}
            onChange={(value) => setForm((prev) => ({ ...prev, details: value }))}
            placeholder="Describe services, strengths, and business overview."
          />
        </div>

        <div className="mt-4">
          <TextArea
            label="Long about / story"
            rows={5}
            value={form.aboutLong}
            onChange={(value) => setForm((prev) => ({ ...prev, aboutLong: value }))}
            placeholder="Share your journey, process, and trust factors."
          />
        </div>
      </SectionCard>

      <SectionCard title="Social and Proof Sections" subtitle="Build trust through social proof and media">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Instagram URL"
            value={form.instagramUrl}
            onChange={(value) => setForm((prev) => ({ ...prev, instagramUrl: value }))}
          />
          <Input
            label="Facebook URL"
            value={form.facebookUrl}
            onChange={(value) => setForm((prev) => ({ ...prev, facebookUrl: value }))}
          />
          <Input
            label="LinkedIn URL"
            value={form.linkedinUrl}
            onChange={(value) => setForm((prev) => ({ ...prev, linkedinUrl: value }))}
          />
          <Input
            label="YouTube URL"
            value={form.youtubeUrl}
            onChange={(value) => setForm((prev) => ({ ...prev, youtubeUrl: value }))}
          />
          <Input
            label="X / Twitter URL"
            value={form.xUrl}
            onChange={(value) => setForm((prev) => ({ ...prev, xUrl: value }))}
          />
        </div>

        <div className="mt-4">
          <TextArea
            label="Why choose bullets (one per line)"
            value={form.keyHighlightsText}
            onChange={(value) => setForm((prev) => ({ ...prev, keyHighlightsText: value }))}
            placeholder="Trusted in your city&#10;Fast response time&#10;Experienced team"
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <MediaListEditor
            label="Gallery Images"
            value={form.galleryImagesText}
            onChange={(value) => setForm((prev) => ({ ...prev, galleryImagesText: value }))}
            onUpload={onMultipleImageUpload("galleryImagesText", "gallery")}
            onRemoveUrl={(url) => onRemoveMediaUrl("galleryImagesText", url)}
            uploading={uploadingField === "galleryImagesText"}
            helperText="Upload multiple images directly. URL entry is optional."
          />
          <MediaListEditor
            label="Portfolio Images"
            value={form.portfolioImagesText}
            onChange={(value) => setForm((prev) => ({ ...prev, portfolioImagesText: value }))}
            onUpload={onMultipleImageUpload("portfolioImagesText", "portfolio")}
            onRemoveUrl={(url) => onRemoveMediaUrl("portfolioImagesText", url)}
            uploading={uploadingField === "portfolioImagesText"}
            helperText="Add your best project visuals for conversion."
          />
          <MediaListEditor
            label="Certificates"
            value={form.certificatesText}
            onChange={(value) => setForm((prev) => ({ ...prev, certificatesText: value }))}
            onUpload={onMultipleImageUpload("certificatesText", "certificates")}
            onRemoveUrl={(url) => onRemoveMediaUrl("certificatesText", url)}
            uploading={uploadingField === "certificatesText"}
            helperText="Optional trust documents and recognitions."
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextArea
            label="Testimonials (Name | Feedback per line)"
            value={form.testimonialsText}
            onChange={(value) => setForm((prev) => ({ ...prev, testimonialsText: value }))}
            placeholder="Rohit | Great support and quality."
          />
          <TextArea
            label="FAQs (Question | Answer per line)"
            value={form.faqsText}
            onChange={(value) => setForm((prev) => ({ ...prev, faqsText: value }))}
            placeholder="Do you offer urgent delivery? | Yes, based on scope and slot."
          />
        </div>
      </SectionCard>

      {error ? (
        <div className="mt-4 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {success}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex items-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {actionLabel}
          </>
        )}
      </button>
    </form>
  );
}

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-base font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
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
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
        {required ? " *" : ""}
      </span>
      <textarea
        rows={rows}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
      />
    </label>
  );
}

function MediaListEditor({
  label,
  value,
  onChange,
  onUpload,
  onRemoveUrl,
  uploading,
  helperText,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveUrl: (url: string) => void;
  uploading: boolean;
  helperText: string;
}) {
  const urls = parseLineList(value);
  const [showManualUrls, setShowManualUrls] = useState(false);
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      <p className="mt-1 text-[11px] text-slate-500">{helperText}</p>

      <div className="mt-2 flex flex-wrap gap-2">
        <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100">
          {uploading ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <ImagePlus className="mr-1.5 h-3.5 w-3.5" />
              Upload Images
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={onUpload}
          />
        </label>
        <button
          type="button"
          onClick={() => setShowManualUrls((prev) => !prev)}
          className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          {showManualUrls ? "Hide Manual URLs" : "Add URLs Manually"}
        </button>
      </div>

      {showManualUrls ? (
        <textarea
          rows={5}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          placeholder="One image URL per line (optional)"
        />
      ) : null}

      {urls.length > 0 ? (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {urls.slice(0, 6).map((url) => (
            <div key={url} className="group relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={label}
                className="h-16 w-full rounded-md border border-slate-200 bg-white object-cover"
              />
              <button
                type="button"
                onClick={() => onRemoveUrl(url)}
                className="absolute right-1 top-1 rounded bg-slate-900/75 px-1.5 py-0.5 text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-[11px] text-slate-500">
          No images yet. Upload files to auto-attach them here.
        </p>
      )}
    </div>
  );
}

function ImagePreviewCard({ label, url }: { label: string; url: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-semibold text-slate-600">{label}</p>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={label}
          className="mt-2 h-28 w-full rounded-lg border border-slate-200 bg-white object-cover"
        />
      ) : (
        <p className="mt-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-6 text-center text-xs text-slate-500">
          No image uploaded yet.
        </p>
      )}
    </div>
  );
}
