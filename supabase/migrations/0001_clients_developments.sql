-- 0001_clients_developments.sql
-- Adds the Clients and Developments tables, indexes, RLS policies, grants.
-- Run once in Supabase SQL editor.
--
-- Admin gating uses an inline subquery against public.profiles rather than the
-- is_admin() function. This avoids the EXECUTE-permission pitfall we hit on
-- profiles earlier and keeps the policy self-contained.

-- =====================================
-- Clients
-- =====================================

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  primary_contact_name text,
  primary_contact_email text,
  primary_contact_phone text,
  country text,
  locale text,
  website_url text,
  status text not null default 'active'
    check (status in ('active', 'paused', 'archived')),
  source_lead_id uuid references public.leads(id) on delete set null,
  source_opportunity_id uuid references public.opportunities(id) on delete set null,
  notes text,
  archived_at timestamptz
);

create index clients_status_idx on public.clients (status);
create index clients_created_at_idx on public.clients (created_at desc);
create index clients_name_idx on public.clients (lower(name));

-- =====================================
-- Developments
-- =====================================

create table public.developments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_id uuid not null references public.clients(id) on delete cascade,
  title text not null,
  stage text not null default 'kickoff'
    check (stage in ('kickoff', 'discovery', 'design', 'dev', 'staging', 'live', 'maintenance')),
  stage_changed_at timestamptz not null default now(),
  owner_id uuid references public.profiles(id) on delete set null,
  template text,
  tech_stack text,
  domain text,
  repo_url text,
  preview_url text,
  staging_url text,
  live_url text,
  started_at timestamptz,
  expected_live_at timestamptz,
  actual_live_at timestamptz,
  progress_pct integer not null default 0 check (progress_pct between 0 and 100),
  notes text,
  archived_at timestamptz
);

create index developments_client_id_idx on public.developments (client_id);
create index developments_stage_idx on public.developments (stage);
create index developments_owner_id_idx on public.developments (owner_id);
create index developments_created_at_idx on public.developments (created_at desc);

-- =====================================
-- RLS
-- =====================================

alter table public.clients enable row level security;
alter table public.developments enable row level security;

create policy "clients admin all"
on public.clients
for all
to authenticated
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

create policy "developments admin all"
on public.developments
for all
to authenticated
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- =====================================
-- Grants (RLS still applies on top)
-- =====================================

grant select, insert, update, delete on public.clients to authenticated;
grant select, insert, update, delete on public.developments to authenticated;
