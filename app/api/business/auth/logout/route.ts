import { NextResponse } from "next/server";
import { BUSINESS_SESSION_COOKIE } from "@/lib/business-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: BUSINESS_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
