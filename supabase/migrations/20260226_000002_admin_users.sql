-- Admin users table for /admin login
-- Default seed login (change password immediately after first login):
-- email: admin@vaiket.com
-- password: Admin@12345

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id text primary key default gen_random_uuid()::text,
  email text not null,
  name text not null default 'Vaiket Admin',
  password_hash text not null,
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists ux_admin_users_email_lower
  on public.admin_users ((lower(email)));

grant usage on schema public to service_role;
grant select, insert, update, delete on table public.admin_users to service_role;

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
    select 1 from pg_trigger where tgname = 'trg_admin_users_set_updated_at'
  ) then
    create trigger trg_admin_users_set_updated_at
    before update on public.admin_users
    for each row
    execute function public.set_updated_at();
  end if;
end $$;

alter table public.admin_users enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'admin_users'
      and policyname = 'service_role_full_admin_users'
  ) then
    create policy service_role_full_admin_users
      on public.admin_users
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

insert into public.admin_users (email, name, password_hash, is_active)
select
  'admin@vaiket.com',
  'Vaiket Admin',
  'pbkdf2$120000$HKgGF8geVu7vhJt6VeIrvw==$TXvaz9ElwoEkkEx9ASWf7EqMe4n999JliKB/pnsIZlxq+rY9uLLX9x8ZDlq6m7x1lrRXrKp+DhUWmVe17k+YcA==',
  true
where not exists (
  select 1 from public.admin_users
);
