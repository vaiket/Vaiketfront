import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ADMIN_SESSION_COOKIE, readAdminSessionToken } from "@/lib/admin-auth";
import {
  fetchAdminReferralInsights,
  type AdminReferralWithdrawal,
} from "@/lib/admin-referrals";

const ALLOWED_WITHDRAWAL_STATUSES = [
  "requested",
  "processing",
  "paid",
  "rejected",
  "cancelled",
] as const;

type WithdrawalStatus = (typeof ALLOWED_WITHDRAWAL_STATUSES)[number];

function isAuthorized(req: NextRequest) {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return Boolean(readAdminSessionToken(token));
}

function cleanText(value: unknown, max = 200) {
  return String(value ?? "").trim().slice(0, max);
}

async function mapWithdrawalWithUser(
  withdrawal: {
    id: string;
    request_no: string;
    user_id: string;
    amount: number | string;
    currency: string | null;
    method: string | null;
    status: string | null;
    admin_note: string | null;
    created_at: string | null;
    processed_at: string | null;
    updated_at: string | null;
  },
  usersMap: Map<
    string,
    { full_name: string | null; email: string | null; phone: string | null; referral_code: string | null }
  >
): Promise<AdminReferralWithdrawal> {
  const user = usersMap.get(withdrawal.user_id);
  return {
    id: withdrawal.id,
    request_no: withdrawal.request_no,
    user_id: withdrawal.user_id,
    user_name: user?.full_name ?? null,
    user_email: user?.email ?? null,
    user_phone: user?.phone ?? null,
    user_referral_code: user?.referral_code ?? null,
    amount: Number(Number(withdrawal.amount ?? 0).toFixed(2)),
    currency: withdrawal.currency || "INR",
    method: withdrawal.method || "upi",
    status: withdrawal.status || "requested",
    admin_note: withdrawal.admin_note,
    created_at: withdrawal.created_at,
    processed_at: withdrawal.processed_at,
    updated_at: withdrawal.updated_at,
  };
}

export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const search = cleanText(req.nextUrl.searchParams.get("q"), 120);
    const withdrawalStatus = cleanText(req.nextUrl.searchParams.get("status"), 40);

    const insights = await fetchAdminReferralInsights({
      search,
      withdrawalStatus,
    });

    return NextResponse.json({
      success: true,
      summary: insights.summary,
      withdrawals: insights.withdrawals,
      top_referrers: insights.topReferrers,
      signups: insights.recentSignups,
      earnings: insights.recentEarnings,
    });
  } catch (error) {
    console.error("ADMIN REFERRALS GET ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load referral insights." },
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
    const withdrawalId = cleanText(body.withdrawalId, 80);
    const status = cleanText(body.status, 40).toLowerCase();
    const adminNote = cleanText(body.adminNote, 500);

    if (
      !withdrawalId ||
      !ALLOWED_WITHDRAWAL_STATUSES.includes(status as WithdrawalStatus)
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid payload." },
        { status: 400 }
      );
    }

    const { data: existing, error: existingError } = await supabase
      .from("business_referral_withdrawals")
      .select(
        "id, request_no, user_id, amount, currency, method, status, admin_note, created_at, processed_at, updated_at"
      )
      .eq("id", withdrawalId)
      .single();

    if (existingError || !existing) {
      return NextResponse.json(
        { success: false, error: "Withdrawal request not found." },
        { status: 404 }
      );
    }

    if (existing.status === "paid" && status !== "paid") {
      return NextResponse.json(
        { success: false, error: "Paid withdrawal cannot be moved to another status." },
        { status: 400 }
      );
    }

    const updatePayload: Record<string, unknown> = {
      status,
      admin_note: adminNote || null,
    };
    if (status === "paid") {
      updatePayload.processed_at = new Date().toISOString();
    } else if (status === "requested" || status === "processing") {
      updatePayload.processed_at = null;
    }

    const { data: updated, error: updatedError } = await supabase
      .from("business_referral_withdrawals")
      .update(updatePayload)
      .eq("id", withdrawalId)
      .select(
        "id, request_no, user_id, amount, currency, method, status, admin_note, created_at, processed_at, updated_at"
      )
      .single();

    if (updatedError || !updated) {
      console.error("ADMIN REFERRALS PATCH UPDATE ERROR:", updatedError);
      return NextResponse.json(
        { success: false, error: "Failed to update withdrawal request." },
        { status: 500 }
      );
    }

    const { data: users } = await supabase
      .from("business_users")
      .select("id, full_name, email, phone, referral_code")
      .eq("id", updated.user_id)
      .limit(1);

    const usersMap = new Map(
      (users ?? []).map((user) => [
        user.id,
        {
          full_name: user.full_name ?? null,
          email: user.email ?? null,
          phone: user.phone ?? null,
          referral_code: user.referral_code ?? null,
        },
      ])
    );

    const withdrawal = await mapWithdrawalWithUser(updated, usersMap);
    return NextResponse.json({ success: true, withdrawal });
  } catch (error) {
    console.error("ADMIN REFERRALS PATCH ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update withdrawal status." },
      { status: 500 }
    );
  }
}
