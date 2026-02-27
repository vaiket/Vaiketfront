-- Vaiket core schema migration
-- Run in Supabase SQL Editor or via Supabase CLI

create extension if not exists pgcrypto;

-- If an old singular table exists, rename it to the canonical plural table.
do $$
begin
  if to_regclass('public.lead') is not null
     and to_regclass('public.leads') is null then
    alter table public.lead rename to leads;
  end if;
end $$;

create table if not exists public.leads (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  email text not null,
  phone text not null,
  websitestatus text,
  goals jsonb not null default '[]'::jsonb,
  channels jsonb not null default '[]'::jsonb,
  source text not null default 'get-started',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id text primary key default gen_random_uuid()::text,
  lead_id text,
  services jsonb not null default '[]'::jsonb,
  subtotal numeric(12, 2) not null default 0,
  gst numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  status text not null default 'initiated',
  razorpay_order_id text,
  razorpay_payment_id text,
  failure_reason text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id text primary key default gen_random_uuid()::text,
  order_id text,
  lead_id text,
  name text,
  email text,
  phone text,
  plan text,
  txnid text,
  payment_type text,
  payment_status text,
  status text,
  razorpay_order_id text,
  razorpay_payment_id text,
  amount numeric(12, 2) not null default 0,
  currency text not null default 'INR',
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure columns exist for older schemas.
alter table public.leads add column if not exists websitestatus text;
alter table public.leads add column if not exists goals jsonb not null default '[]'::jsonb;
alter table public.leads add column if not exists channels jsonb not null default '[]'::jsonb;
alter table public.leads add column if not exists source text not null default 'get-started';
alter table public.leads add column if not exists status text not null default 'new';
alter table public.leads add column if not exists created_at timestamptz not null default now();
alter table public.leads add column if not exists updated_at timestamptz not null default now();

alter table public.orders add column if not exists services jsonb not null default '[]'::jsonb;
alter table public.orders add column if not exists subtotal numeric(12, 2) not null default 0;
alter table public.orders add column if not exists gst numeric(12, 2) not null default 0;
alter table public.orders add column if not exists total numeric(12, 2) not null default 0;
alter table public.orders add column if not exists status text not null default 'initiated';
alter table public.orders add column if not exists razorpay_order_id text;
alter table public.orders add column if not exists razorpay_payment_id text;
alter table public.orders add column if not exists failure_reason text;
alter table public.orders add column if not exists paid_at timestamptz;
alter table public.orders add column if not exists created_at timestamptz not null default now();
alter table public.orders add column if not exists updated_at timestamptz not null default now();

alter table public.payments add column if not exists order_id text;
alter table public.payments add column if not exists lead_id text;
alter table public.payments add column if not exists name text;
alter table public.payments add column if not exists email text;
alter table public.payments add column if not exists phone text;
alter table public.payments add column if not exists plan text;
alter table public.payments add column if not exists txnid text;
alter table public.payments add column if not exists payment_type text;
alter table public.payments add column if not exists payment_status text;
alter table public.payments add column if not exists status text;
alter table public.payments add column if not exists razorpay_order_id text;
alter table public.payments add column if not exists razorpay_payment_id text;
alter table public.payments add column if not exists amount numeric(12, 2) not null default 0;
alter table public.payments add column if not exists currency text not null default 'INR';
alter table public.payments add column if not exists paid_at timestamptz;
alter table public.payments add column if not exists created_at timestamptz not null default now();
alter table public.payments add column if not exists updated_at timestamptz not null default now();

-- Helpful indexes.
create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_created_at on public.leads(created_at desc);
create index if not exists idx_orders_lead_id on public.orders(lead_id);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create unique index if not exists ux_orders_razorpay_order_id
  on public.orders(razorpay_order_id)
  where razorpay_order_id is not null;

create index if not exists idx_payments_lead_id on public.payments(lead_id);
create index if not exists idx_payments_status on public.payments(status);
create index if not exists idx_payments_created_at on public.payments(created_at desc);
create index if not exists idx_payments_razorpay_order_id on public.payments(razorpay_order_id);
create unique index if not exists ux_payments_order_id
  on public.payments(order_id)
  where order_id is not null;
create unique index if not exists ux_payments_txnid
  on public.payments(txnid)
  where txnid is not null;

-- Keep updated_at fresh automatically.
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
  if not exists (select 1 from pg_trigger where tgname = 'trg_leads_set_updated_at') then
    create trigger trg_leads_set_updated_at
    before update on public.leads
    for each row
    execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'trg_orders_set_updated_at') then
    create trigger trg_orders_set_updated_at
    before update on public.orders
    for each row
    execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'trg_payments_set_updated_at') then
    create trigger trg_payments_set_updated_at
    before update on public.payments
    for each row
    execute function public.set_updated_at();
  end if;
end $$;

-- RLS
alter table public.leads enable row level security;
alter table public.orders enable row level security;
alter table public.payments enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'leads' and policyname = 'service_role_full_leads'
  ) then
    create policy service_role_full_leads
      on public.leads
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'orders' and policyname = 'service_role_full_orders'
  ) then
    create policy service_role_full_orders
      on public.orders
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'payments' and policyname = 'service_role_full_payments'
  ) then
    create policy service_role_full_payments
      on public.payments
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;
