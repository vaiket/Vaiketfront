import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminCookieOptions,
  verifyAdminPassword,
} from "@/lib/admin-auth";

type AdminUserRow = {
  id: string;
  email: string;
  name: string | null;
  password_hash: string;
  is_active: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const { data, error } = await supabase
      .from("admin_users")
      .select("id, email, name, password_hash, is_active")
      .eq("email", normalizedEmail)
      .single<AdminUserRow>();

    if (error) {
      console.error("ADMIN LOGIN QUERY ERROR:", error);
      if (error.message?.toLowerCase().includes("permission denied")) {
        return NextResponse.json(
          { success: false, error: "Admin table permission issue. Run admin permissions SQL." },
          { status: 500 }
        );
      }
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }

    if (!data.is_active || !verifyAdminPassword(String(password), data.password_hash)) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken({
      adminId: data.id,
      email: data.email,
      name: data.name ?? "Admin",
    });

    await supabase
      .from("admin_users")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", data.id);

    const response = NextResponse.json({
      success: true,
      admin: {
        id: data.id,
        email: data.email,
        name: data.name ?? "Admin",
      },
    });

    response.cookies.set(ADMIN_SESSION_COOKIE, token, getAdminCookieOptions());
    return response;
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unable to login right now." },
      { status: 500 }
    );
  }
}
