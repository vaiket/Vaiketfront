-- Business public profile username + product catalog

create extension if not exists pgcrypto;

alter table public.business_listings
  add column if not exists public_username text;

update public.business_listings
set public_username = trim(
  both '-' from regexp_replace(lower(coalesce(public_username, slug, '')), '[^a-z0-9-]+', '-', 'g')
)
where public_username is null;

do $$
declare
  rec record;
begin
  for rec in
    select id, public_username
    from public.business_listings
    where public_username is not null and public_username <> ''
    order by created_at asc, id asc
  loop
    if exists (
      select 1
      from public.business_listings other
      where other.id <> rec.id
        and lower(other.public_username) = lower(rec.public_username)
    ) then
      update public.business_listings
      set public_username = left(rec.public_username, 32) || '-' || right(id, 6)
      where id = rec.id;
    end if;
  end loop;
end $$;

create unique index if not exists ux_business_listings_public_username_lower
  on public.business_listings ((lower(public_username)))
  where public_username is not null and public_username <> '';

create table if not exists public.business_products (
  id text primary key default gen_random_uuid()::text,
  listing_id text not null references public.business_listings(id) on delete cascade,
  user_id text not null references public.business_users(id) on delete cascade,
  product_name text not null,
  short_description text,
  full_description text,
  price numeric(12, 2) not null default 0,
  currency text not null default 'INR',
  image_url text,
  purchase_url text,
  cta_label text not null default 'Buy Now',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_business_products_listing_id
  on public.business_products(listing_id);
create index if not exists idx_business_products_user_id
  on public.business_products(user_id);
create index if not exists idx_business_products_active
  on public.business_products(is_active);
create index if not exists idx_business_products_sort_order
  on public.business_products(sort_order asc, created_at desc);

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
    select 1 from pg_trigger where tgname = 'trg_business_products_set_updated_at'
  ) then
    create trigger trg_business_products_set_updated_at
    before update on public.business_products
    for each row
    execute function public.set_updated_at();
  end if;
end $$;

alter table public.business_products enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'business_products'
      and policyname = 'service_role_full_business_products'
  ) then
    create policy service_role_full_business_products
      on public.business_products
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

grant usage on schema public to service_role;
grant select, insert, update, delete on table public.business_products to service_role;
