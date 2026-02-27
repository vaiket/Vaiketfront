import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ADMIN_SESSION_COOKIE, readAdminSessionToken } from "@/lib/admin-auth";

const ALLOWED_STATUSES = [
  "new",
  "shortlisted",
  "interview_scheduled",
  "selected",
  "rejected",
  "on_hold",
] as const;

function isAuthorized(req: NextRequest) {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return Boolean(readAdminSessionToken(token));
}

function escapeForIlike(value: string) {
  return value.replace(/[%_,]/g, " ").trim();
}

export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const search = escapeForIlike(req.nextUrl.searchParams.get("q") ?? "");
    const status = req.nextUrl.searchParams.get("status") ?? "";
    const type = req.nextUrl.searchParams.get("type") ?? "";
    const track = req.nextUrl.searchParams.get("track") ?? "";

    let query = supabase
      .from("academy_applications")
      .select(
        "id, application_no, application_type, track, full_name, email, phone, city, education, experience_level, resume_link, availability, notes, internal_notes, status, assigned_to, follow_up_at, last_contacted_at, created_at, updated_at"
      )
      .order("created_at", { ascending: false })
      .limit(500);

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (type && type !== "all") {
      query = query.eq("application_type", type);
    }

    if (track && track !== "all") {
      query = query.eq("track", track);
    }

    if (search) {
      query = query.or(
        `application_no.ilike.%${search}%,full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
      );
    }

    const { data, error } = await query;
    if (error) {
      console.error("ADMIN ACADEMY APPLICATIONS FETCH ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch academy applications." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, applications: data ?? [] });
  } catch (error) {
    console.error("ADMIN ACADEMY APPLICATIONS GET ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const applicationId = String(body.applicationId ?? "").trim();
    const status = String(body.status ?? "").trim();
    const assignedTo = String(body.assignedTo ?? "").trim();
    const internalNotes = String(body.internalNotes ?? "").trim();
    const followUpAt = String(body.followUpAt ?? "").trim();
    const lastContactedAt = String(body.lastContactedAt ?? "").trim();

    if (
      !applicationId ||
      !status ||
      !ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const updatePayload: Record<string, unknown> = {
      status,
      assigned_to: assignedTo || null,
      internal_notes: internalNotes || null,
    };

    if (followUpAt) {
      updatePayload.follow_up_at = followUpAt;
    }
    if (lastContactedAt) {
      updatePayload.last_contacted_at = lastContactedAt;
    }

    const { data, error } = await supabase
      .from("academy_applications")
      .update(updatePayload)
      .eq("id", applicationId)
      .select(
        "id, application_no, application_type, track, full_name, email, phone, city, education, experience_level, resume_link, availability, notes, internal_notes, status, assigned_to, follow_up_at, last_contacted_at, created_at, updated_at"
      )
      .single();

    if (error || !data) {
      console.error("ADMIN ACADEMY APPLICATION UPDATE ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Failed to update application." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, application: data });
  } catch (error) {
    console.error("ADMIN ACADEMY APPLICATIONS PATCH ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
