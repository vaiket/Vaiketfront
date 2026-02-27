import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  BUSINESS_SESSION_COOKIE,
  createBusinessSessionToken,
  getBusinessCookieOptions,
  verifyBusinessPassword,
} from "@/lib/business-auth";

type LoginPayload = {
  email?: string;
  password?: string;
};

type BusinessUserRow = {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  is_active: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginPayload;
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("business_users")
      .select("id, full_name, email, password_hash, is_active")
      .eq("email", email)
      .single<BusinessUserRow>();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }

    if (!data.is_active || !verifyBusinessPassword(password, data.password_hash)) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = createBusinessSessionToken({
      userId: data.id,
      email: data.email,
      name: data.full_name,
    });

    await supabase
      .from("business_users")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", data.id);

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
    console.error("BUSINESS LOGIN ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unable to login right now." },
      { status: 500 }
    );
  }
}
