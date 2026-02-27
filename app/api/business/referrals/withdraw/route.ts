import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { BUSINESS_SESSION_COOKIE, readBusinessSessionToken } from "@/lib/business-auth";
import {
  BUSINESS_REFERRAL_CURRENCY,
  BUSINESS_REFERRAL_MIN_WITHDRAWAL,
  BUSINESS_REFERRAL_OPEN_WITHDRAWAL_STATUSES,
  createReferralWithdrawalRequestNo,
} from "@/lib/business-referral";

type WithdrawalPayload = {
  amount?: number | string;
  method?: string;
  upiId?: string;
  accountHolderName?: string;
  notes?: string;
};

const ALLOWED_METHODS = ["upi", "bank", "manual"] as const;

function getSession(req: NextRequest) {
  const token = req.cookies.get(BUSINESS_SESSION_COOKIE)?.value;
  return readBusinessSessionToken(token);
}

function text(value: unknown, max = 200) {
  return String(value ?? "").trim().slice(0, max);
}

function toNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Number(parsed.toFixed(2)) : 0;
}

function sumAmounts(
  rows: Array<{ amount: number | string; status: string | null }>,
  statusList: string[]
) {
  return rows
    .filter((row) => statusList.includes(String(row.status ?? "")))
    .reduce((total, row) => total + toNumber(row.amount), 0);
}

async function getReferralWalletSnapshot(userId: string) {
  const { data: earningRows, error: earningError } = await supabase
    .from("business_referral_earnings")
    .select("amount:commission_amount, status")
    .eq("referrer_user_id", userId);

  if (earningError) {
    throw new Error("Could not fetch referral earnings.");
  }

  const { data: withdrawalRows, error: withdrawalError } = await supabase
    .from("business_referral_withdrawals")
    .select("amount, status")
    .eq("user_id", userId);

  if (withdrawalError) {
    throw new Error("Could not fetch withdrawal data.");
  }

  const earnings = (earningRows ?? []) as Array<{ amount: number | string; status: string | null }>;
  const withdrawals = (withdrawalRows ?? []) as Array<{
    amount: number | string;
    status: string | null;
  }>;

  const totalEarned = sumAmounts(earnings, ["credited"]);
  const totalWithdrawn = sumAmounts(withdrawals, ["paid"]);
  const lockedAmount = sumAmounts(withdrawals, ["requested", "processing"]);
  const availableBalance = Number(
    Math.max(0, totalEarned - totalWithdrawn - lockedAmount).toFixed(2)
  );

  return {
    totalEarned: Number(totalEarned.toFixed(2)),
    totalWithdrawn: Number(totalWithdrawn.toFixed(2)),
    lockedAmount: Number(lockedAmount.toFixed(2)),
    availableBalance,
  };
}

async function createUniqueRequestNo() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const candidate = createReferralWithdrawalRequestNo();
    const { data } = await supabase
      .from("business_referral_withdrawals")
      .select("id")
      .eq("request_no", candidate)
      .maybeSingle();
    if (!data) return candidate;
  }
  throw new Error("Unable to create withdrawal request number.");
}

export async function POST(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as WithdrawalPayload;
    const amount = toNumber(body.amount);
    const methodRaw = text(body.method, 20).toLowerCase();
    const method = ALLOWED_METHODS.includes(
      methodRaw as (typeof ALLOWED_METHODS)[number]
    )
      ? methodRaw
      : "upi";
    const upiId = text(body.upiId, 120);
    const accountHolderName = text(body.accountHolderName, 120);
    const notes = text(body.notes, 400);

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Enter a valid withdrawal amount." },
        { status: 400 }
      );
    }

    if (amount < BUSINESS_REFERRAL_MIN_WITHDRAWAL) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum withdrawal amount is Rs. ${BUSINESS_REFERRAL_MIN_WITHDRAWAL}.`,
        },
        { status: 400 }
      );
    }

    if (method === "upi" && !upiId) {
      return NextResponse.json(
        { success: false, error: "UPI ID is required for UPI withdrawal." },
        { status: 400 }
      );
    }

    const { data: listing } = await supabase
      .from("business_listings")
      .select("id")
      .eq("user_id", session.userId)
      .eq("status", "approved")
      .eq("payment_status", "paid")
      .order("published_at", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!listing) {
      return NextResponse.json(
        { success: false, error: "Referral wallet unlocks after paid and approved listing." },
        { status: 400 }
      );
    }

    const { data: pendingRequests, error: pendingRequestsError } = await supabase
      .from("business_referral_withdrawals")
      .select("id")
      .eq("user_id", session.userId)
      .in("status", [...BUSINESS_REFERRAL_OPEN_WITHDRAWAL_STATUSES])
      .limit(1);

    if (pendingRequestsError) {
      throw new Error("Could not check pending withdrawal request.");
    }

    if ((pendingRequests ?? []).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "You already have a pending withdrawal request. Wait for admin action.",
        },
        { status: 400 }
      );
    }

    const wallet = await getReferralWalletSnapshot(session.userId);
    if (amount > wallet.availableBalance) {
      return NextResponse.json(
        {
          success: false,
          error: `Available referral balance is Rs. ${wallet.availableBalance.toFixed(2)}.`,
        },
        { status: 400 }
      );
    }

    const requestNo = await createUniqueRequestNo();
    const { error: insertError } = await supabase
      .from("business_referral_withdrawals")
      .insert({
        request_no: requestNo,
        user_id: session.userId,
        amount,
        currency: BUSINESS_REFERRAL_CURRENCY,
        method,
        payout_details: {
          upi_id: upiId || null,
          account_holder_name: accountHolderName || null,
          notes: notes || null,
        },
        status: "requested",
        admin_note: null,
      });

    if (insertError) {
      console.error("BUSINESS REFERRAL WITHDRAW INSERT ERROR:", insertError);
      return NextResponse.json(
        { success: false, error: "Unable to submit withdrawal request." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      request_no: requestNo,
    });
  } catch (error) {
    console.error("BUSINESS REFERRAL WITHDRAW ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unable to submit withdrawal request." },
      { status: 500 }
    );
  }
}
