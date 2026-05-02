# Phased rollout

This is the single source of truth for what's done, in progress, and to do. Update the **status** column when you complete a phase. Each phase is small enough to ship as one commit (or a small series of commits) and large enough to be worth doing.

## Status legend

- `done` — shipped and verified.
- `wip` — in progress in the current session.
- `todo` — scoped but not started.

| # | Phase | Status |
| --- | --- | --- |
| 1 | Foundation: brand-aligned shell + Deals → Opportunities rename | done |
| 2 | List-table polish: search, filters, pagination, sortable columns | todo |
| 3 | Lead detail page + notes + touchpoint timeline | todo |
| 4 | Opportunities pipeline view (kanban + list) | todo |
| 5 | Tasks / follow-ups module | todo |
| 6 | Campaign builder + Resend send + webhook ingest | todo |
| 7 | Activity / audit log | todo |
| 8 | Settings page (profile, integrations, API keys) | todo |
| 9 | Cmd+K command palette + keyboard shortcuts | todo |
| 10 | Reports / export / saved views | todo |

---

## Phase 1 — Foundation: brand-aligned shell + Deals → Opportunities rename

**Goal:** the admin should look and feel like the same product as the public site — same font, same restraint, same colour discipline — and the "Deals" module becomes "Opportunities" everywhere a user sees it.

**Scope:**

- AdminShell sidebar:
  - Remove all `lucide-react` icons next to nav labels.
  - Tighten typography (sentence case, plynos-navy / slate, Plus Jakarta Sans is already inherited from layout).
  - Sign-out is a text button, not an icon.
  - Mobile drawer keeps the same simplification.
- PageHeader:
  - Title in `text-2xl md:text-3xl font-semibold tracking-tightish`.
  - Description in slate, no decoration.
  - Right-side actions slot for one primary button.
  - Bottom border hairline.
- Stat cards (`Stat` component):
  - Replace the rounded card with a hairline-only box matching the rest of the brand.
  - Remove icon support entirely.
- Tables (`Table` component):
  - Hairline outer border, `bg-plynos-soft/40` header (light) / `bg-white/5` (dark), `text-xs font-medium text-plynos-slate`.
  - Row hover `bg-plynos-soft/20` (subtle).
  - All admin pages get text-only "Delete" / "Edit" buttons — no `<Trash2>` or `<Edit>` icons.
- Status pills (`StatusBadge`): keep a small filled pill but drop colour heavy variants in favour of subtle slate / navy / soft-blue.
- Deals → Opportunities:
  - Move route from `app/admin/(protected)/deals/` to `app/admin/(protected)/opportunities/`.
  - Update sidebar nav label to "Opportunities".
  - Update page header copy.
  - Update internal links from `/admin/deals` to `/admin/opportunities`.
  - Keep the DB table as `deals`, types as `Deal`, action functions can keep their names (`createDeal`, etc.). Only the user-facing strings change.
  - Keep the action file path `actions.ts` — the import paths inside the new opportunities directory stay clean.

**Files touched:**

- `components/admin/AdminShell.tsx` — strip icons, tighten styling.
- `components/admin/PageHeader.tsx` — restyle.
- `components/admin/Stat.tsx` — restyle (hairline, no icons).
- `components/admin/Table.tsx` — restyle.
- `components/admin/StatusBadge.tsx` — toned-down palette.
- All `components/admin/<module>/...Controls.tsx` and `New...Form.tsx` — replace icon buttons with text buttons.
- `app/admin/(protected)/dashboard/page.tsx` — restyle stat grid + recent-leads card.
- `app/admin/(protected)/leads/page.tsx` — restyle.
- `app/admin/(protected)/niches/page.tsx` — restyle.
- `app/admin/(protected)/campaigns/page.tsx` — restyle.
- `app/admin/(protected)/content/page.tsx` — restyle.
- **Delete** `app/admin/(protected)/deals/`.
- **Create** `app/admin/(protected)/opportunities/page.tsx` and `actions.ts` (copied from deals/, with all UI strings replaced).
- `app/admin/(protected)/suppression/page.tsx` — restyle.

**Acceptance:**

- `npx tsc --noEmit` and `npx next lint` pass.
- `next build` produces a `/admin/opportunities` route, no `/admin/deals`.
- Sidebar shows: `Dashboard`, `Leads`, `Niches`, `Campaigns`, `Content`, `Opportunities`, `Suppression` — text only, no icons.
- Dashboard, list pages all render with hairline borders rather than soft cards.
- Dark mode works on every restyled surface.
- No lucide icons in the admin sidebar nav.
- No uppercase utility classes in any admin file.

---

### Notes from Phase 1 (completed)

- Sidebar nav is text-only — no `lucide-react` imports remain in `AdminShell.tsx`.
- Sign-out is a plain text link, not a bordered icon button.
- `Stat`, `Table`, `PageHeader` all use hairline borders only — no rounded cards or shadows.
- Module Controls/Forms had Trash2 / Plus icon buttons replaced with text buttons. `Loader2` (spinner) was kept where used inside primary submit buttons.
- The DB table is still `deals`. The route is `/admin/opportunities`. Server-action exports were renamed (`createOpportunity`, `deleteOpportunity`, etc.). Component class names were renamed (`OpportunityControls`, `NewOpportunityForm`). The TypeScript `Deal` interface was kept as-is.
- The dashboard now groups the 8 stat tiles into two labelled rows ("Lead volume", "Pipeline") with a divide-x flat row.
- The "Industry" rename from `niche` is consistent in admin: leads page and dashboard now use the label "Industry".

---

## Phase 2 — List-table polish

**Goal:** the leads / opportunities tables are usable when there are 200+ rows.

**Scope:**

- Add a single search input above each table — fuzzy match across name, email, company.
- Filter chips for status / source (leads), status / payment status (opportunities).
- Sortable columns (created_at, value, status). Default sort: created_at desc.
- Pagination — 50 per page, simple "Older" / "Newer" links at the bottom.
- Persist filter / sort state in the URL (search params) so a refresh keeps your view.

**Schema changes:** none.

**Files touched:**

- `components/admin/Table.tsx` — extract a sortable header helper.
- New `components/admin/TableToolbar.tsx` — search + filter chips + reset.
- All list pages — read URL search params, pass to the Supabase query, render TableToolbar.

---

## Phase 3 — Lead detail page

**Goal:** clicking a lead row opens a full-detail view with timeline, notes, and inline-editable fields.

**Scope:**

- New route `app/admin/(protected)/leads/[id]/page.tsx`.
- Server-fetch the lead + related touchpoints + notes + (single) opportunity.
- Two-column layout (desktop): main column with editable lead fields, side column with activity timeline (newest first).
- Add a free-text Note input at the top of the timeline that posts a new `lead_notes` row.
- Each touchpoint shows its channel, direction, summary, and `next_action_at` if present.
- Inline edit on lead fields — save on blur, optimistic UI.
- "Convert to opportunity" button: creates a `deals` row pre-populated with the lead's id and value €600 (the brand's target AOV).

**Schema changes:** add `lead_notes` table — see [data-model.md](./data-model.md).

**Files touched:**

- `supabase/migrations/0003_lead_notes.sql` — new table + RLS.
- `app/admin/(protected)/leads/[id]/page.tsx`, `[id]/actions.ts`.
- `components/admin/leads/LeadDetail.tsx` — main column.
- `components/admin/leads/LeadTimeline.tsx` — side column (touchpoints + notes merged, sorted by created_at).
- `components/admin/leads/LeadNoteForm.tsx` — note composer.
- `app/admin/(protected)/leads/page.tsx` — wrap each row in `<Link href={`/admin/leads/${l.id}`}>`.
- `lib/admin/leads.ts` — shared fetchers for lead-with-relations.

---

## Phase 4 — Opportunities pipeline

**Goal:** a kanban-style view of open opportunities by stage, with a list-view toggle.

**Scope:**

- New columns on the opportunities page: pipeline view + list view, toggled by URL param.
- Pipeline stages mapped from the existing booleans:
  - `Briefing` — none of the stage flags set yet.
  - `Build` — `assets_received && build_started && !review_sent`.
  - `Review` — `review_sent && !launched`.
  - `Live` — `launched && !handover_complete`.
  - `Closed` — `handover_complete` or `status = 'won'` / `'lost'`.
- Drag-and-drop between columns — but only adjacent stages, with confirmation. (HTML5 DnD; if it gets gnarly, fall back to "Move to" dropdown per card.)
- Per-card: lead name + email, value, deadline countdown, two most recent stage flags.
- "Forecast" header above the pipeline: sum of open `value_eur`, count of opportunities.

**Schema changes:** add `lost_reason text` column on `deals`. Optional tags table.

**Files touched:**

- `supabase/migrations/0004_tags.sql` — see [data-model.md](./data-model.md).
- `app/admin/(protected)/opportunities/page.tsx` — branch on `?view=pipeline|list`.
- `components/admin/opportunities/Pipeline.tsx` — kanban columns.
- `components/admin/opportunities/OpportunityCard.tsx` — single card.

---

## Phase 5 — Tasks / follow-ups

**Goal:** every lead, opportunity, and campaign can have an attached follow-up with a due date. A central `/admin/tasks` page surfaces what's overdue or due today.

**Scope:**

- New route `/admin/tasks` with three sections: overdue, today, upcoming.
- Quick-add input at the top of each detail page ("Follow up with Aoife on Tuesday") that creates a task linked to the current record.
- Task completion toggle on every task. Done tasks fall away after a day.
- Sidebar adds a "Tasks" item with a number badge of overdue tasks (text only — `Tasks · 3` rather than a coloured pip).

**Schema changes:** add `tasks` table.

**Files touched:**

- `supabase/migrations/0005_tasks.sql`.
- `app/admin/(protected)/tasks/page.tsx`, `actions.ts`.
- `components/admin/tasks/TaskList.tsx`, `TaskQuickAdd.tsx`, `TaskRow.tsx`.
- Detail pages for leads / opportunities / campaigns get a Tasks section in their side column.

---

## Phase 6 — Campaign builder + Resend send + webhook ingest

**Goal:** outbound campaigns can be authored, sent, and tracked end to end inside Plynos. This is the largest phase by far.

**Scope:**

- Campaign builder wizard at `/admin/campaigns/new`:
  - Step 1 — name + niche + channel (`email` or `whatsapp`; we'll start with email only).
  - Step 2 — audience: a Supabase query against `leads` (filter by industry + status). Show count.
  - Step 3 — sequence: 1..N steps each with subject + body + delay-after-previous-step (in days).
  - Step 4 — review + send (or schedule for later).
- Per-recipient sends recorded in `campaign_sends`. We track `delivered_at`, `opened_at`, `replied_at`, `bounced_at`, `unsubscribed_at`.
- Resend webhook receiver at `/api/resend/webhook` that updates `campaign_sends` rows. Configure a webhook in Resend → secret in `.env` as `RESEND_WEBHOOK_SECRET`.
- Reply detection: when Resend reports a reply, automatically:
  - Mark the lead's status as `replied` if it was `contacted` or `new`.
  - Create a touchpoint row.
- Suppression integration: any send respects the `unsubscribes` table.
- Per-campaign detail page (`/admin/campaigns/[id]`):
  - Sequence editor.
  - Sends table (paginated) with each lead's `last_event`.
  - Aggregate metrics (sent / opened / replied / bounced / unsubscribed) computed from `campaign_sends` instead of the manually-edited integers.

**Schema changes:** `campaign_steps`, `campaign_sends`. Migrate the manually-tracked counters on `campaigns` to be derived from `campaign_sends`. Don't drop the columns yet — keep both as a fallback for v0 manual campaigns.

**Files touched:**

- `supabase/migrations/0006_campaign_steps.sql`.
- `app/admin/(protected)/campaigns/new/page.tsx`, plus per-step pages or a single multi-step React state machine.
- `app/admin/(protected)/campaigns/[id]/...`.
- `app/api/resend/webhook/route.ts`.
- `lib/mailer.ts` — generalise `sendLeadNotification` into a shared `sendEmail` helper that returns the Resend id; reuse for both lead notifications and campaign sends.
- `lib/campaigns/send.ts` — orchestrator: walks the sequence, schedules `campaign_sends` rows, fires Resend.

---

## Phase 7 — Activity / audit log

**Goal:** every meaningful change in the admin is recorded so a single operator can answer "what did I do last Tuesday?"

**Scope:**

- New `audit_log` table.
- Wrap every server action with a logger that records the entity, action, and a `before/after` diff.
- Surface activity in two places:
  - Per-record: a section on every detail page showing recent activity for that entity.
  - Global: `/admin/activity` paged list of every action across the system.

**Schema changes:** `audit_log`.

**Files touched:**

- `supabase/migrations/0007_audit_log.sql`.
- `lib/admin/audit.ts` — `logAudit({ entity_type, entity_id, action, diff })`.
- All server actions wrapped to call `logAudit`.
- `app/admin/(protected)/activity/page.tsx`.

---

## Phase 8 — Settings

**Goal:** centralise everything that's currently fiddled with in `.env` or in someone else's dashboard.

**Scope:**

- Profile: change display name, password (Supabase auth flow).
- Integrations: visible status of Supabase, Resend, plus an "are these env vars set?" health check.
- API keys: rotation log + (eventually) a way to copy current values.

**Files touched:**

- `app/admin/(protected)/settings/page.tsx`, `actions.ts`.
- `lib/admin/health.ts` — runtime check (does Supabase respond? Does Resend respond?).

---

## Phase 9 — Cmd+K palette + keyboard

**Goal:** zero-mouse navigation.

**Scope:**

- Cmd+K opens a search palette: leads, opportunities, campaigns, content, all queryable by title or email.
- `g d` jumps to dashboard, `g l` to leads, `g o` to opportunities — vim-style sequences.
- `c` on the leads page opens the "new lead" form. `e` on a row enables inline edit. `Escape` closes.

**Files touched:**

- `components/admin/CommandPalette.tsx`.
- `lib/admin/search.ts` — `searchAll(query)` returning unified results.
- A hotkey hook in the AdminShell.

---

## Phase 10 — Reports / export / saved views

**Goal:** weekly KPI snapshot + ad-hoc data extraction.

**Scope:**

- Saved views: store filter+sort state per user under a name, e.g. "Won this month", "High intent leads".
- CSV export from any list view.
- A `/admin/reports/weekly` page showing the same metrics as the dashboard but for a chosen week range.

This is the last phase. After this, the admin is a real CRM-class tool for one operator.

---

## How to update this file

When you finish a phase:

1. Change the row in the status table from `wip` to `done`.
2. Update CLAUDE.md if the phase introduced new conventions.
3. Mark the next phase `wip` if you're starting it immediately, otherwise leave at `todo`.
4. Note any deviations in a short "Notes" subsection at the bottom of that phase's section.
