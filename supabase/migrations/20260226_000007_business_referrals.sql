-- Business referral code, earnings ledger, and withdrawal requests

create extension if not exists pgcrypto;

alter table public.business_users
  add column if not exists referral_code text,
  add column if not exists referred_by_user_id text,
  add column if not exists referred_by_code text,
  add column if not exists referred_at timestamptz;

create unique index if not exists ux_business_users_referral_code_lower
  on public.business_users ((lower(referral_code)))
  where referral_code is not null and referral_code <> '';

create index if not exists idx_business_users_referred_by_user_id
  on public.business_users(referred_by_user_id);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'fk_business_users_referred_by_user_id'
  ) then
    alter table public.business_users
      add constraint fk_business_users_referred_by_user_id
      foreign key (referred_by_user_id)
      references public.business_users(id)
      on delete set null;
  end if;
end $$;

create table if not exists public.business_referral_earnings (
  id text primary key default gen_random_uuid()::text,
  referrer_user_id text not null references public.business_users(id) on delete cascade,
  referred_user_id text not null references public.business_users(id) on delete cascade,
  referred_listing_id text references public.business_listings(id) on delete set null,
  referred_payment_id text references public.business_listing_payments(id) on delete set null,
  referred_order_no text,
  commission_rate numeric(6, 4) not null default 0.25,
  commission_amount numeric(12, 2) not null default 0,
  currency text not null default 'INR',
  status text not null default 'credited',
  note text,
  credited_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists ux_business_referral_earnings_referred_user_id
  on public.business_referral_earnings(referred_user_id);
create unique index if not exists ux_business_referral_earnings_referred_payment_id
  on public.business_referral_earnings(referred_payment_id)
  where referred_payment_id is not null;
create index if not exists idx_business_referral_earnings_referrer_user_id
  on public.business_referral_earnings(referrer_user_id);
create index if not exists idx_business_referral_earnings_created_at
  on public.business_referral_earnings(created_at desc);
create index if not exists idx_business_referral_earnings_status
  on public.business_referral_earnings(status);

create table if not exists public.business_referral_withdrawals (
  id text primary key default gen_random_uuid()::text,
  request_no text not null,
  user_id text not null references public.business_users(id) on delete cascade,
  amount numeric(12, 2) not null default 0,
  currency text not null default 'INR',
  method text not null default 'upi',
  payout_details jsonb not null default '{}'::jsonb,
  status text not null default 'requested',
  admin_note text,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists ux_business_referral_withdrawals_request_no
  on public.business_referral_withdrawals(request_no);
create index if not exists idx_business_referral_withdrawals_user_id
  on public.business_referral_withdrawals(user_id);
create index if not exists idx_business_referral_withdrawals_status
  on public.business_referral_withdrawals(status);
create index if not exists idx_business_referral_withdrawals_created_at
  on public.business_referral_withdrawals(created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_trigger where tgname = 'trg_business_referral_earnings_set_updated_at'
  ) then
    create trigger trg_business_referral_earnings_set_updated_at
    before update on public.business_referral_earnings
    for each row
    execute function public.set_updated_at();
  end if;

  if not exists (
    select 1 from pg_trigger where tgname = 'trg_business_referral_withdrawals_set_updated_at'
  ) then
    create trigger trg_business_referral_withdrawals_set_updated_at
    before update on public.business_referral_withdrawals
    for each row
    execute function public.set_updated_at();
  end if;
end $$;

alter table public.business_referral_earnings enable row level security;
alter table public.business_referral_withdrawals enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'business_referral_earnings'
      and policyname = 'service_role_full_business_referral_earnings'
  ) then
    create policy service_role_full_business_referral_earnings
      on public.business_referral_earnings
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'business_referral_withdrawals'
      and policyname = 'service_role_full_business_referral_withdrawals'
  ) then
    create policy service_role_full_business_referral_withdrawals
      on public.business_referral_withdrawals
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

grant usage on schema public to service_role;
grant select, insert, update, delete on table public.business_referral_earnings to service_role;
grant select, insert, update, delete on table public.business_referral_withdrawals to service_role;
