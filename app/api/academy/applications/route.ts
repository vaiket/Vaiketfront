import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  createInternshipApplicationNo,
  isAcademyApplicationType,
  isAcademyTrack,
} from "@/lib/academy";

type Payload = {
  applicationType?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  city?: string;
  education?: string;
  track?: string;
  experienceLevel?: string;
  resumeLink?: string;
  availability?: string;
  notes?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function safeText(value: unknown, max = 300) {
  return String(value ?? "").trim().slice(0, max);
}

async function createUniqueApplicationNo() {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const no = createInternshipApplicationNo();
    const { data } = await supabase
      .from("academy_applications")
      .select("id")
      .eq("application_no", no)
      .maybeSingle();

    if (!data) return no;
  }
  return createInternshipApplicationNo();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const applicationTypeRaw = safeText(body.applicationType, 40);
    const fullName = safeText(body.fullName, 120);
    const email = safeText(body.email, 140).toLowerCase();
    const phone = safeText(body.phone, 32);
    const city = safeText(body.city, 80);
    const education = safeText(body.education, 120);
    const trackRaw = safeText(body.track, 60);
    const experienceLevel = safeText(body.experienceLevel, 80);
    const resumeLink = safeText(body.resumeLink, 500);
    const availability = safeText(body.availability, 120);
    const notes = safeText(body.notes, 1000);

    const applicationType = isAcademyApplicationType(applicationTypeRaw)
      ? applicationTypeRaw
      : "internship";

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, email and phone are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (phone.length < 8) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    if (trackRaw && !isAcademyTrack(trackRaw)) {
      return NextResponse.json(
        { success: false, error: "Please select a valid track." },
        { status: 400 }
      );
    }

    const track = trackRaw && isAcademyTrack(trackRaw) ? trackRaw : "general";

    const applicationNo = await createUniqueApplicationNo();

    const { data, error } = await supabase
      .from("academy_applications")
      .insert({
        application_no: applicationNo,
        application_type: applicationType,
        track,
        full_name: fullName,
        email,
        phone,
        city: city || null,
        education: education || null,
        experience_level: experienceLevel || null,
        resume_link: resumeLink || null,
        availability: availability || null,
        notes: notes || null,
        status: "new",
      })
      .select("id, application_no, status")
      .single();

    if (error) {
      console.error("ACADEMY APPLICATION INSERT ERROR:", error);
      const message = error.message?.toLowerCase().includes("does not exist")
        ? "Academy applications table not found. Run migration 000004 first."
        : "Unable to submit application right now.";

      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      application_id: data.id,
      application_no: data.application_no,
      application_type: applicationType,
      status: data.status,
    });
  } catch (error) {
    console.error("ACADEMY APPLICATION API ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unable to submit application right now." },
      { status: 500 }
    );
  }
}
