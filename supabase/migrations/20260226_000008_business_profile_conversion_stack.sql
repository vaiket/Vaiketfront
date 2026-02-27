-- Business profile conversion stack: richer fields, public enquiries, and trust counters

create extension if not exists pgcrypto;

alter table public.business_products
  alter column cta_label set default 'Enquire Now';

update public.business_products
set cta_label = 'Enquire Now'
where cta_label is null or cta_label = '' or lower(cta_label) = 'buy now';

alter table public.business_listings
  add column if not exists cover_banner_url text,
  add column if not exists owner_name text,
  add column if not exists contact_email text,
  add column if not exists google_maps_url text,
  add column if not exists years_experience integer,
  add column if not exists about_short text,
  add column if not exists about_long text,
  add column if not exists social_links jsonb not null default '{}'::jsonb,
  add column if not exists key_highlights jsonb not null default '[]'::jsonb,
  add column if not exists gallery_images jsonb not null default '[]'::jsonb,
  add column if not exists portfolio_images jsonb not null default '[]'::jsonb,
  add column if not exists certificates jsonb not null default '[]'::jsonb,
  add column if not exists testimonials jsonb not null default '[]'::jsonb,
  add column if not exists faqs jsonb not null default '[]'::jsonb,
  add column if not exists profile_views bigint not null default 0,
  add column if not exists enquiry_count bigint not null default 0;

create table if not exists public.business_enquiries (
  id text primary key default gen_random_uuid()::text,
  listing_id text not null references public.business_listings(id) on delete cascade,
  public_username text,
  service_name text,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  message text,
  status text not null default 'new',
  source text not null default 'public_profile',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_business_enquiries_listing_id
  on public.business_enquiries(listing_id);
create index if not exists idx_business_enquiries_created_at
  on public.business_enquiries(created_at desc);
create index if not exists idx_business_enquiries_status
  on public.business_enquiries(status);
create index if not exists idx_business_enquiries_public_username
  on public.business_enquiries(public_username);

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
    select 1 from pg_trigger where tgname = 'trg_business_enquiries_set_updated_at'
  ) then
    create trigger trg_business_enquiries_set_updated_at
    before update on public.business_enquiries
    for each row
    execute function public.set_updated_at();
  end if;
end $$;

create or replace function public.increment_business_listing_enquiry_count()
returns trigger
language plpgsql
as $$
begin
  update public.business_listings
  set enquiry_count = coalesce(enquiry_count, 0) + 1
  where id = new.listing_id;

  return new;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_trigger where tgname = 'trg_business_enquiries_increment_count'
  ) then
    create trigger trg_business_enquiries_increment_count
    after insert on public.business_enquiries
    for each row
    execute function public.increment_business_listing_enquiry_count();
  end if;
end $$;

create or replace function public.increment_business_profile_views(p_listing_id text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  next_count bigint;
begin
  update public.business_listings
  set profile_views = coalesce(profile_views, 0) + 1
  where id = p_listing_id
    and status = 'approved'
    and payment_status = 'paid'
  returning profile_views into next_count;

  return coalesce(next_count, 0);
end;
$$;

alter table public.business_enquiries enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'business_enquiries'
      and policyname = 'service_role_full_business_enquiries'
  ) then
    create policy service_role_full_business_enquiries
      on public.business_enquiries
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

grant usage on schema public to service_role;
grant select, insert, update, delete on table public.business_enquiries to service_role;
grant execute on function public.increment_business_profile_views(text) to service_role;
