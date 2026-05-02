-- Plynos initial schema with Row Level Security
-- Run this in the Supabase SQL editor or via the CLI.

create extension if not exists "pgcrypto";

-- ===== profiles ======
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- ===== leads ======
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  company text,
  website_url text,
  niche text,
  goal text,
  deadline text,
  source text default 'website',
  status text not null default 'new',
  notes text
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_email_idx on public.leads (lower(email));

-- ===== niches ======
create table if not exists public.niches (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  hypothesis text,
  status text default 'testing',
  score int,
  start_date date,
  end_date date,
  decision text default 'testing',
  decision_notes text
);
create index if not exists niches_created_at_idx on public.niches (created_at desc);

-- ===== campaigns ======
create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  niche_id uuid references public.niches(id) on delete set null,
  channel text,
  subject text,
  variant text,
  sent int not null default 0,
  replies int not null default 0,
  bounces int not null default 0,
  unsubscribes int not null default 0,
  booked_calls int not null default 0,
  wins int not null default 0
);
create index if not exists campaigns_created_at_idx on public.campaigns (created_at desc);

-- ===== touchpoints ======
create table if not exists public.touchpoints (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  channel text,
  direction text,
  summary text,
  next_action_at timestamptz
);
create index if not exists touchpoints_lead_idx on public.touchpoints (lead_id, created_at desc);

-- ===== deals ======
create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid references public.leads(id) on delete set null,
  value_eur numeric(12,2),
  status text not null default 'open',
  payment_status text not null default 'unpaid',
  assets_received boolean not null default false,
  build_started boolean not null default false,
  review_sent boolean not null default false,
  launched boolean not null default false,
  handover_complete boolean not null default false,
  deadline timestamptz,
  final_url text,
  notes text
);
create index if not exists deals_created_at_idx on public.deals (created_at desc);

-- ===== content_posts ======
create table if not exists public.content_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null default 'blog',
  title text not null,
  slug text not null unique,
  excerpt text,
  body text,
  cover_url text,
  published boolean not null default false
);
create index if not exists content_published_idx on public.content_posts (published, created_at desc);

-- ===== unsubscribes ======
create table if not exists public.unsubscribes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique,
  source text,
  reason text
);
create index if not exists unsubscribes_email_idx on public.unsubscribes (lower(email));

-- ===== Auto-create profile on signup ======
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'admin')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ===== Helper: is_admin() ======
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql stable security definer;

-- ===== Row Level Security ======
alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.niches enable row level security;
alter table public.campaigns enable row level security;
alter table public.touchpoints enable row level security;
alter table public.deals enable row level security;
alter table public.content_posts enable row level security;
alter table public.unsubscribes enable row level security;

-- profiles: users can read/update their own row; admins can read all
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "profiles admin all" on public.profiles;
create policy "profiles admin all" on public.profiles
  for all using (public.is_admin());

-- Admin-only access for all CRM tables
drop policy if exists "leads admin all" on public.leads;
create policy "leads admin all" on public.leads
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "niches admin all" on public.niches;
create policy "niches admin all" on public.niches
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "campaigns admin all" on public.campaigns;
create policy "campaigns admin all" on public.campaigns
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "touchpoints admin all" on public.touchpoints;
create policy "touchpoints admin all" on public.touchpoints
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "deals admin all" on public.deals;
create policy "deals admin all" on public.deals
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "content admin all" on public.content_posts;
create policy "content admin all" on public.content_posts
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "unsubscribes admin all" on public.unsubscribes;
create policy "unsubscribes admin all" on public.unsubscribes
  for all using (public.is_admin()) with check (public.is_admin());

-- Public can read published content (used for blog/news/portfolio rendering)
drop policy if exists "content public published read" on public.content_posts;
create policy "content public published read" on public.content_posts
  for select using (published = true);

-- NOTE: The public lead form and public unsubscribe endpoint use the
-- service-role key on the server (never the browser) to insert rows
-- without granting anonymous insert privileges via RLS.
