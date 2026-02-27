import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  BUSINESS_SESSION_COOKIE,
  createBusinessSessionToken,
  getBusinessCookieOptions,
  hashBusinessPassword,
} from "@/lib/business-auth";
import { normalizeReferralCode } from "@/lib/business-referral";

type RegisterPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  referralCode?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterPayload;
    const fullName = String(body.fullName ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const password = String(body.password ?? "");
    const referralCode = normalizeReferralCode(String(body.referralCode ?? ""));

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const { data: existingUser } = await supabase
      .from("business_users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Account already exists with this email." },
        { status: 409 }
      );
    }

    let referredByUserId: string | null = null;
    let referredByCode: string | null = null;

    if (referralCode) {
      const { data: referralOwner, error: referralOwnerError } = await supabase
        .from("business_users")
        .select("id, referral_code")
        .ilike("referral_code", referralCode)
        .maybeSingle();

      if (referralOwnerError || !referralOwner?.id) {
        return NextResponse.json(
          { success: false, error: "Referral code is invalid." },
          { status: 400 }
        );
      }

      const { data: eligibleListing } = await supabase
        .from("business_listings")
        .select("id")
        .eq("user_id", referralOwner.id)
        .eq("status", "approved")
        .eq("payment_status", "paid")
        .order("published_at", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!eligibleListing) {
        return NextResponse.json(
          { success: false, error: "Referral code is not active right now." },
          { status: 400 }
        );
      }

      referredByUserId = referralOwner.id;
      referredByCode = referralOwner.referral_code ?? referralCode;
    }

    const passwordHash = hashBusinessPassword(password);
    const { data, error } = await supabase
      .from("business_users")
      .insert({
        full_name: fullName,
        email,
        phone: phone || null,
        password_hash: passwordHash,
        is_active: true,
        referred_by_user_id: referredByUserId,
        referred_by_code: referredByCode,
        referred_at: referredByUserId ? new Date().toISOString() : null,
      })
      .select("id, full_name, email")
      .single();

    if (error || !data) {
      console.error("BUSINESS REGISTER INSERT ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Unable to create account right now." },
        { status: 500 }
      );
    }

    const token = createBusinessSessionToken({
      userId: data.id,
      email: data.email,
      name: data.full_name,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: data.id,
        name: data.full_name,
        email: data.email,
      },
    });
    response.cookies.set(BUSINESS_SESSION_COOKIE, token, getBusinessCookieOptions());
    return response;
  } catch (error) {
    console.error("BUSINESS REGISTER ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unable to register right now." },
      { status: 500 }
    );
  }
}
