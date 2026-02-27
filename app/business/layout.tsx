import { cookies } from "next/headers";
import BusinessRouteFrame from "@/components/business/BusinessRouteFrame";
import { BUSINESS_SESSION_COOKIE, readBusinessSessionToken } from "@/lib/business-auth";

type Props = {
  children: React.ReactNode;
};

export default async function BusinessLayout({ children }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get(BUSINESS_SESSION_COOKIE)?.value;
  const session = readBusinessSessionToken(token);

  return (
    <BusinessRouteFrame isLoggedIn={Boolean(session)} businessOwnerName={session?.name ?? null}>
      {children}
    </BusinessRouteFrame>
  );
}
