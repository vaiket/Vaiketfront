import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  BUSINESS_SESSION_COOKIE,
  readBusinessSessionToken,
  type BusinessSessionPayload,
} from "@/lib/business-auth";

export async function getBusinessSession(): Promise<BusinessSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(BUSINESS_SESSION_COOKIE)?.value;
  return readBusinessSessionToken(token);
}

export async function requireBusinessSession(): Promise<BusinessSessionPayload> {
  const session = await getBusinessSession();
  if (!session) {
    redirect("/business/dashboard/login");
  }
  return session;
}
