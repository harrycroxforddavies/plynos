# Data model

## Current schema (already in Supabase)

| Table | Purpose | Key fields |
| --- | --- | --- |
| `profiles` | Per-auth-user metadata. Trigger creates one with `role = 'admin'` on signup. | `id`, `email`, `role` |
| `leads` | Public form submissions + manually added leads. | `name`, `email`, `phone`, `company`, `website_url`, `niche`, `goal`, `source`, `status`, `notes` |
| `niches` | Niche experiments — what verticals we're testing. | `name`, `hypothesis`, `score`, `start_date`, `end_date`, `decision` |
| `campaigns` | Outbound campaigns with manually-edited counters. | `name`, `niche_id`, `channel`, `subject`, `variant`, `sent`, `replies`, `bounces`, `unsubscribes`, `booked_calls`, `wins` |
| `touchpoints` | Conversations / events tied to a lead. **Schema exists but no admin UI yet.** | `lead_id`, `channel`, `direction`, `summary`, `next_action_at` |
| `deals` | Open / won / lost opportunities. **Will be displayed as "Opportunities" in UI; DB stays `deals` for now.** | `lead_id`, `value_eur`, `status`, `payment_status`, `assets_received`, `build_started`, `review_sent`, `launched`, `handover_complete`, `deadline`, `final_url`, `notes` |
| `content_posts` | Blog / portfolio / testimonial entries. | `type`, `title`, `slug`, `excerpt`, `body`, `cover_url`, `published` |
| `unsubscribes` | Suppression list. | `email` (unique), `source`, `reason` |

All tables have RLS that requires `is_admin()`. Service role bypasses RLS for the public form ingest.

## Naming convention

The DB table `deals` will not be renamed — would require a destructive migration plus updating every reference in code, RLS policy, and the existing data. Instead, the **UI everywhere reads "Opportunities"** and the route is `/admin/opportunities`. Internal code paths and types can keep `deal` / `Deal`. This is consistent with the public-side rename of "Niche" → "Industry" we did earlier (DB column stayed `niche`; UI says "Industry").

## Proposed schema additions (planned, not yet built)

These come in later phases (see [phases.md](./phases.md)).

### Phase 3 — Lead detail page enables this

```sql
-- lead_notes: free-text notes attached to a lead, ordered chronologically.
create table public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  body text not null,
  author_id uuid references auth.users(id) on delete set null
);
```

(`touchpoints` already exists — that table stays for structured "I emailed them on Tuesday" event entries; `lead_notes` is for free-form internal notes.)

### Phase 4 — Pipeline view, lead lifecycle

```sql
-- tags: free-form labels attached to leads or opportunities.
create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table public.lead_tags (
  lead_id uuid not null references public.leads(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (lead_id, tag_id)
);

-- Add a `lost_reason` to deals so we can analyse drop-off.
alter table public.deals add column if not exists lost_reason text;
```

### Phase 5 — Tasks / follow-ups

```sql
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  due_at timestamptz,
  title text not null,
  body text,
  done boolean not null default false,
  done_at timestamptz,
  -- exactly one of these will be set; nullable so you can also have free-floating tasks.
  lead_id uuid references public.leads(id) on delete set null,
  deal_id uuid references public.deals(id) on delete set null,
  campaign_id uuid references public.campaigns(id) on delete set null,
  assigned_to uuid references auth.users(id) on delete set null
);
```

### Phase 6 — Campaign builder + Resend integration

```sql
-- Multi-step campaign sequences: a campaign has N steps each with content + delay.
create table public.campaign_steps (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  step_index int not null,
  delay_days int not null default 0,
  subject text,
  body text,
  unique (campaign_id, step_index)
);

-- Per-recipient send log (also lets us track replies via Resend webhooks).
create table public.campaign_sends (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  step_id uuid references public.campaign_steps(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,
  resend_id text,                   -- Resend's email id, used to query status
  sent_at timestamptz not null default now(),
  delivered_at timestamptz,
  opened_at timestamptz,
  replied_at timestamptz,
  bounced_at timestamptz,
  unsubscribed_at timestamptz
);
```

### Phase 7 — Activity / audit

```sql
-- Audit log of admin actions. Inserted by the server action wrapper.
create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  actor_id uuid references auth.users(id) on delete set null,
  entity_type text not null,        -- 'lead', 'deal', 'campaign', etc.
  entity_id uuid,
  action text not null,             -- 'created', 'updated', 'deleted', 'status_changed'
  diff jsonb                         -- before / after for updates
);
```

## RLS policies for new tables

Every new table follows the same `is_admin()` gate already used by the existing tables. See `supabase/migrations/0001_init.sql` for the pattern. The service-role client bypasses RLS for any path that needs to insert from the public form pipeline — but new admin-only tables don't need that exception.

## Migration order

Each phase adds a new numbered migration under `supabase/migrations/`. Phase 1 doesn't touch the schema (UI-only refactor). Schema changes start at Phase 3.

| File | Phase | Adds |
| --- | --- | --- |
| `0003_lead_notes.sql` | Phase 3 | `lead_notes` table |
| `0004_tags.sql` | Phase 4 | `tags`, `lead_tags`, `deals.lost_reason` |
| `0005_tasks.sql` | Phase 5 | `tasks` |
| `0006_campaign_steps.sql` | Phase 6 | `campaign_steps`, `campaign_sends` |
| `0007_audit_log.sql` | Phase 7 | `audit_log` |

Each migration is idempotent (`if not exists`). Update `phases.md` once a migration is written and run.
