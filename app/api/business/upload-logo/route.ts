import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { BUSINESS_SESSION_COOKIE, readBusinessSessionToken } from "@/lib/business-auth";

const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024; // 3MB
const DEFAULT_BUCKET = "business-assets";
const ALLOWED_FOLDERS = ["logos", "covers", "gallery", "portfolio", "certificates"] as const;

function getSession(req: NextRequest) {
  const token = req.cookies.get(BUSINESS_SESSION_COOKIE)?.value;
  return readBusinessSessionToken(token);
}

function getExtension(fileName: string, mimeType: string) {
  const extFromName = fileName.split(".").pop()?.toLowerCase();
  if (extFromName && /^[a-z0-9]+$/.test(extFromName)) {
    return extFromName;
  }

  if (mimeType === "image/png") return "png";
  if (mimeType === "image/jpeg") return "jpg";
  if (mimeType === "image/webp") return "webp";
  if (mimeType === "image/svg+xml") return "svg";
  return "png";
}

function resolveFolder(value: string) {
  const normalized = String(value || "").trim().toLowerCase();
  if (
    ALLOWED_FOLDERS.includes(normalized as (typeof ALLOWED_FOLDERS)[number])
  ) {
    return normalized;
  }
  return "logos";
}

async function ensureBucket(bucketName: string) {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    throw listError;
  }

  const exists = (buckets ?? []).some((bucket) => bucket.name === bucketName);
  if (exists) return;

  const { error: createError } = await supabase.storage.createBucket(bucketName, {
    public: true,
    fileSizeLimit: `${MAX_FILE_SIZE_BYTES}`,
  });
  if (createError && !createError.message.toLowerCase().includes("already exists")) {
    throw createError;
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.formData();
    const file = body.get("file");
    const requestedFolder = body.get("folder");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "Image file is required." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Only image files are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, error: "Image size should be less than 3MB." },
        { status: 400 }
      );
    }

    const bucket = process.env.BUSINESS_ASSETS_BUCKET || DEFAULT_BUCKET;
    await ensureBucket(bucket);

    const extension = getExtension(file.name, file.type);
    const folder = resolveFolder(
      typeof requestedFolder === "string" ? requestedFolder : ""
    );
    const objectPath = `${folder}/${session.userId}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(objectPath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("BUSINESS LOGO UPLOAD ERROR:", uploadError);
      return NextResponse.json(
        { success: false, error: "Could not upload logo right now." },
        { status: 500 }
      );
    }

    const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(objectPath);
    return NextResponse.json({
      success: true,
      bucket,
      path: objectPath,
      url: publicData.publicUrl,
    });
  } catch (error) {
    console.error("BUSINESS LOGO API ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unable to upload logo right now." },
      { status: 500 }
    );
  }
}
