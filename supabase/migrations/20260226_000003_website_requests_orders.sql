-- Website request + order tracking schema additions

create extension if not exists pgcrypto;

create table if not exists public.website_requests (
  id text primary key default gen_random_uuid()::text,
  request_no text not null,
  lead_id text,
  plan text not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  business_name text,
  website_status text,
  goals jsonb not null default '[]'::jsonb,
  add_ons jsonb not null default '[]'::jsonb,
  pages_needed text,
  notes text,
  base_price numeric(12, 2) not null default 0,
  add_on_amount numeric(12, 2) not null default 0,
  subtotal numeric(12, 2) not null default 0,
  gst numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  currency text not null default 'INR',
  latest_order_id text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists ux_website_requests_request_no
  on public.website_requests(request_no);
create index if not exists idx_website_requests_status
  on public.website_requests(status);
create index if not exists idx_website_requests_created_at
  on public.website_requests(created_at desc);
create index if not exists idx_website_requests_lead_id
  on public.website_requests(lead_id);

alter table public.orders add column if not exists order_no text;
alter table public.orders add column if not exists request_id text;
alter table public.orders add column if not exists order_type text not null default 'general';
alter table public.orders add column if not exists plan text;
alter table public.orders add column if not exists customer_name text;
alter table public.orders add column if not exists customer_email text;
alter table public.orders add column if not exists customer_phone text;

create unique index if not exists ux_orders_order_no
  on public.orders(order_no)
  where order_no is not null;
create index if not exists idx_orders_order_type
  on public.orders(order_type);
create index if not exists idx_orders_request_id
  on public.orders(request_id);

alter table public.payments add column if not exists order_no text;

create index if not exists idx_payments_order_no
  on public.payments(order_no);

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
    select 1 from pg_trigger where tgname = 'trg_website_requests_set_updated_at'
  ) then
    create trigger trg_website_requests_set_updated_at
    before update on public.website_requests
    for each row
    execute function public.set_updated_at();
  end if;
end $$;

alter table public.website_requests enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'website_requests'
      and policyname = 'service_role_full_website_requests'
  ) then
    create policy service_role_full_website_requests
      on public.website_requests
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

grant usage on schema public to service_role;
grant select, insert, update, delete on table public.website_requests to service_role;
