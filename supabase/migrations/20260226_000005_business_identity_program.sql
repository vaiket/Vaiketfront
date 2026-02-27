-- Business Identity Program schema

create extension if not exists pgcrypto;

create table if not exists public.business_users (
  id text primary key default gen_random_uuid()::text,
  full_name text not null,
  email text not null,
  phone text,
  password_hash text not null,
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists ux_business_users_email_lower
  on public.business_users ((lower(email)));

create table if not exists public.business_listings (
  id text primary key default gen_random_uuid()::text,
  user_id text not null,
  business_name text not null,
  slug text not null,
  category text not null,
  title text not null,
  details text not null,
  city text not null,
  address text not null,
  phone text not null,
  website text,
  whatsapp text,
  logo_url text,
  status text not null default 'draft',
  payment_status text not null default 'unpaid',
  verification_fee numeric(12, 2) not null default 99,
  verification_gst numeric(12, 2) not null default 17.82,
  verification_total numeric(12, 2) not null default 116.82,
  certificate_id text,
  rejection_reason text,
  approved_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists ux_business_listings_slug
  on public.business_listings(slug);
create unique index if not exists ux_business_listings_certificate_id
  on public.business_listings(certificate_id)
  where certificate_id is not null;
create index if not exists idx_business_listings_user_id
  on public.business_listings(user_id);
create index if not exists idx_business_listings_status
  on public.business_listings(status);
create index if not exists idx_business_listings_payment_status
  on public.business_listings(payment_status);
create index if not exists idx_business_listings_city
  on public.business_listings(city);
create index if not exists idx_business_listings_category
  on public.business_listings(category);
create index if not exists idx_business_listings_created_at
  on public.business_listings(created_at desc);

create table if not exists public.business_listing_payments (
  id text primary key default gen_random_uuid()::text,
  listing_id text not null,
  user_id text not null,
  order_no text not null,
  razorpay_order_id text,
  razorpay_payment_id text,
  status text not null default 'initiated',
  amount numeric(12, 2) not null default 0,
  currency text not null default 'INR',
  failure_reason text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists ux_business_listing_payments_order_no
  on public.business_listing_payments(order_no);
create unique index if not exists ux_business_listing_payments_razorpay_order_id
  on public.business_listing_payments(razorpay_order_id)
  where razorpay_order_id is not null;
create index if not exists idx_business_listing_payments_listing_id
  on public.business_listing_payments(listing_id);
create index if not exists idx_business_listing_payments_user_id
  on public.business_listing_payments(user_id);
create index if not exists idx_business_listing_payments_status
  on public.business_listing_payments(status);

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
    select 1 from pg_trigger where tgname = 'trg_business_users_set_updated_at'
  ) then
    create trigger trg_business_users_set_updated_at
    before update on public.business_users
    for each row
    execute function public.set_updated_at();
  end if;

  if not exists (
    select 1 from pg_trigger where tgname = 'trg_business_listings_set_updated_at'
  ) then
    create trigger trg_business_listings_set_updated_at
    before update on public.business_listings
    for each row
    execute function public.set_updated_at();
  end if;

  if not exists (
    select 1 from pg_trigger where tgname = 'trg_business_listing_payments_set_updated_at'
  ) then
    create trigger trg_business_listing_payments_set_updated_at
    before update on public.business_listing_payments
    for each row
    execute function public.set_updated_at();
  end if;
end $$;

alter table public.business_users enable row level security;
alter table public.business_listings enable row level security;
alter table public.business_listing_payments enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'business_users'
      and policyname = 'service_role_full_business_users'
  ) then
    create policy service_role_full_business_users
      on public.business_users
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'business_listings'
      and policyname = 'service_role_full_business_listings'
  ) then
    create policy service_role_full_business_listings
      on public.business_listings
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'business_listing_payments'
      and policyname = 'service_role_full_business_listing_payments'
  ) then
    create policy service_role_full_business_listing_payments
      on public.business_listing_payments
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

grant usage on schema public to service_role;
grant select, insert, update, delete on table public.business_users to service_role;
grant select, insert, update, delete on table public.business_listings to service_role;
grant select, insert, update, delete on table public.business_listing_payments to service_role;
