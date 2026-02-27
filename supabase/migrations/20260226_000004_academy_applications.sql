-- Academy applications schema (internship + future courses)

create extension if not exists pgcrypto;

create table if not exists public.academy_applications (
  id text primary key default gen_random_uuid()::text,
  application_no text not null,
  application_type text not null default 'internship',
  track text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  city text,
  education text,
  experience_level text,
  resume_link text,
  availability text,
  notes text,
  internal_notes text,
  status text not null default 'new',
  assigned_to text,
  follow_up_at timestamptz,
  last_contacted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists ux_academy_applications_application_no
  on public.academy_applications(application_no);
create index if not exists idx_academy_applications_status
  on public.academy_applications(status);
create index if not exists idx_academy_applications_type
  on public.academy_applications(application_type);
create index if not exists idx_academy_applications_track
  on public.academy_applications(track);
create index if not exists idx_academy_applications_created_at
  on public.academy_applications(created_at desc);

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
    select 1 from pg_trigger where tgname = 'trg_academy_applications_set_updated_at'
  ) then
    create trigger trg_academy_applications_set_updated_at
    before update on public.academy_applications
    for each row
    execute function public.set_updated_at();
  end if;
end $$;

alter table public.academy_applications enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'academy_applications'
      and policyname = 'service_role_full_academy_applications'
  ) then
    create policy service_role_full_academy_applications
      on public.academy_applications
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

grant usage on schema public to service_role;
grant select, insert, update, delete on table public.academy_applications to service_role;
