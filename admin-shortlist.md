# Admin shortlist — v2

Refined from the wider [admin-brainstorm.md](admin-brainstorm.md). Reflects your latest direction: the **Pipeline manager** is absorbed into the **LLM assistant** (the LLM *is* the pipeline manager, querying leads + opportunities); **Voice-to-action** is deferred; new sections added for **Resources (SOPs)**, **Profile**, and **Settings**.

Each entry: **why**, **key views**, **notable features**, **data implications**, **open questions**.

Order below mirrors how the left sidebar would read.

---

## Sidebar map (target)

```
─────────────────────
  Plynos admin
─────────────────────
  Dashboard
  Clients
  Developments
  Finance
  Teams
  Reporting
  Resources                ← SOPs
  Ask Plynos               ← LLM assistant
  ─ (existing) ─
  Leads
  Opportunities
  Campaigns
  Niches
  Suppression
─────────────────────
  Settings                 ← bottom row
  harry@plynos.dev  ↗      ← profile (clickable)
─────────────────────
```

The LLM assistant ("Ask Plynos") lives in the sidebar for now and probably promotes to a global header surface later (header field or Cmd+K palette). The bottom block — Settings + Profile — is anchored to the bottom of the sidebar so it doesn't scroll.

---

## A. Clients

**Why.** Today the admin has `leads`, `opportunities`, `campaigns`, `niches`, `suppression` — but no concept of a *customer relationship*. Once a deal closes (`won`), the story ends. Everything after that (developments, files, billing, ongoing comms) has no home. Clients is the natural anchor for the rest of the shortlist.

**Lifecycle.**
`lead → opportunity → client → has_many(developments, invoices, files, comms)`

**Key views.**
- **Clients list** — table: name, primary contact, country, # active developments, MRR (if any), last activity, total invoiced.
- **Client detail** — tabs: *Overview*, *Developments*, *Documents*, *Activity*, *Billing*, *Notes*.

**Notable features.**
- Auto-promote: when an opportunity becomes `won`, spin up a client record (or reuse existing if lead is repeat).
- Files tab backed by Supabase Storage (contracts, briefs, brand assets, design exports).
- Activity feed: every record event (email sent, status changed, file uploaded, invoice marked paid) chronologically.
- Notes: timestamped, `@mention` ready, never-deleted.
- Soft-link to lead/opportunity origin so you can trace "this 18-month relationship started from the Aug 2024 cold email".

**Data implications.**
- `clients` (id, name, primary_contact, country, locale, status, source_lead_id, source_opportunity_id, created_at, archived_at).
- `client_activity` (timestamps, actor, kind, target_type, target_id, summary, payload jsonb).
- `client_files` (storage_path, kind, uploaded_by, ...).
- `client_notes`.

**Open questions.**
- One client = one company, or one client = one billing entity? (matters for multi-site groups)
- Do leads/opportunities also keep a `client_id` once converted, or do we cut the link?
- Public client portal (separate login) — yes / not yet?

---

## B. Developments

**Why.** Once a client exists, the actual *work* needs a home. You called out Fusion Solar / Vercel deployments — both let you scan many parallel things at once and drill in. For a custom-build studio this is the operational nerve centre.

**Inspiration mix.**
- *Vercel deployments*: vertical list, status badges, timestamps, click for logs.
- *Fusion Solar plant layout*: cards on a grid showing health/state with key metrics inline.
- *Linear cycle view*: stages with WIP counts.

**Key views.**
- **Developments overview** — grid or stacked list. Each card:
  - Client name + project title.
  - Status badge: `kickoff → discovery → design → dev → staging → live → maintenance`.
  - Progress bar (% of checklist done).
  - Owner avatar.
  - Last activity timestamp.
  - Days in current stage.
  - Quick-actions: open, advance stage, attach note.
- **Development detail** — per project:
  - Header: client, dates, owner, stage, days-in-stage.
  - Pinned "build log" timeline.
  - Stage checklist (configurable per project, defaulted from template).
  - Tech stack (Next/Astro/static), domain, registrar, hosting.
  - Preview / staging / live URLs.
  - Linked invoices.
  - Linked assets.
- **Stage board (optional)** — Kanban grouped by stage with WIP limits.

**Notable features.**
- *Templates* — "blue-collar landing", "boutique fitness", "full custom" — each pre-fills the stage checklist.
- *Smoke checks* — scheduled job runs Lighthouse + form-submit smoke test against live URL once a week. Flag regressions.
- *Days-in-stage* surfaced as a soft-warning badge after N days.
- *Hosting summary* — "8 projects on Vercel, 2 on Netlify, all SSL renewing within 30 days".
- *Quick handover* — generate a handover doc (admin creds list, DNS, registrar, repo URLs) any time.

**Data implications.**
- `developments` (id, client_id, title, stage, owner_id, template, tech_stack, domain, repo_url, preview_url, live_url, started_at, expected_live_at, actual_live_at, ...).
- `development_checklist_items` (development_id, key, label, group, done_at, done_by).
- `development_events` (timestamps, actor, kind, summary, payload).
- `development_assets` (storage_path, kind: brief, logo, copy, photo, export).

**Open questions.**
- Maintenance = a stage, or its own recurring entity?
- Capture *time spent* per development (for niche P&L)?
- Public preview URL — basic auth, or long unguessable slug?

---

## C. Finance

**Why.** Today there's nothing tracking money. Revenue, invoices, who's paid. Even solo this is the difference between "I think we had a good month" and "we had a good month, here's the receipt".

**Key views.**
- **Money overview** — tiles: this-month revenue, outstanding receivables, overdue, MRR (if retainers), YTD net.
- **Invoices** — table: client, amount, status (draft / sent / paid / overdue / refunded), due date, payment method.
- **Invoice detail** — line items, taxes, PDF preview, payment link, audit trail.
- **Subscriptions / retainers** — recurring billing rows for maintenance plans (later).
- **Expenses** — domain renewals, tool subscriptions, ad spend; optionally attributable to a client / development for true margin.

**Notable features.**
- Generate PDF invoices in the right locale (six locales already shipped — use them).
- Stripe / Mollie integration for "pay now" links; webhook on paid → auto-mark.
- VAT-aware: capture VAT rate per invoice, generate Spanish/EU-compliant invoice numbers, quarterly summary export.
- Auto-reminder: gentle nudge at +3, +7, +14 days past due.
- Margin view per development = invoiced − attributable expenses − (optional) time × rate.

**Data implications.**
- `invoices` (id, client_id, development_id?, number, issued_at, due_at, currency, subtotal, tax, total, status, paid_at, payment_provider, payment_id, locale).
- `invoice_lines` (invoice_id, description, qty, unit_price, tax_rate, line_total).
- `expenses` (date, vendor, category, amount, attributable_client_id, attributable_development_id, payment_method, receipt_url).
- `subscriptions` (client_id, plan, monthly_amount, started_at, ended_at, provider_id).

**Open questions.**
- Solo-Harry only, or do clients ever see / pay invoices in a portal?
- Stripe vs. Mollie vs. neither (just IBAN + manual mark-paid)?
- Which jurisdictions for VAT right now?

---

## D. Teams

**Why.** Even solo, having the shape in place pays off the day the team is two people. Today there's `profiles.role` and that's the entire team concept.

**Key views.**
- **Team overview** — members table: name, role, joined, last active, current workload (open opportunities + active developments + days in stage), capacity setting.
- **Member detail** — calendar of their week, assigned records, recent activity, personal scorecard, 1:1 notes (private to manager).
- **Performance dashboard** — per-member: leads handled, proposals sent, win rate, average response time, average cycle time, projects shipped, on-time rate.
- **Capacity planner** — bar chart: open work vs. nominal capacity per member, next 4 weeks.

**Notable features.**
- "Days since last activity" surfaced.
- Skill matrix (Next / Astro / SEO / copy / Spanish-speaking) — useful for routing.
- Personal weekly digest email: "you closed X, you're stuck on Y, here's tomorrow".
- Even solo: shows *you* the same picture and forces honest tracking.

**Data implications.**
- Extend `profiles` (or new `team_members`) with: full_name, avatar_url, timezone, weekly_capacity_hours, skills jsonb, status (active / paused / left).
- Lean on `client_activity` / `development_events` / opportunity events for the metrics (uniform actor field).

**Open questions.**
- Where do contractors fit (paid but not in-house)?
- Hourly rates per member (for margin calc)?
- 1:1 notes — manager-only read?

---

## E. Reporting

**Why.** The home for everything quantitative. Today the dashboard is the *only* place numbers live. A proper reporting page lets you stop staring at the dashboard and start asking questions. Complements the LLM (G) — Reporting answers fixed questions; LLM answers ad-hoc ones.

**Key views.**
- **Reports list** — saved reports (name + query + viz type + parameters).
- **Report detail** — chart + data table + parameter inputs + export.
- **Custom dashboards** — grid of report tiles, multiple dashboards per user.
- **Scheduled deliveries** — email a dashboard PDF Monday 8am.

**Out-of-the-box reports.**
- Lead volume by source, by week.
- Conversion funnel (lead → call → proposal → won) with drop-off %.
- Average cycle time by stage.
- Revenue by month (relies on Finance).
- Margin by niche / by client.
- Smoke-test pass rate over time.
- Team scorecard (relies on Teams).

**Notable features.**
- Reports are SQL under the hood (or SQL generated from the LLM — link to G).
- "Pin to dashboard" / "Export CSV" / "Share read-only link".
- Time-window selector applies globally to a dashboard.
- Anomaly callouts ("leads ↓ 40% week-over-week").

**Data implications.**
- `reports` (name, owner, sql, viz_type, params jsonb).
- `dashboards` (name, owner, tiles jsonb).
- `report_subscriptions` (report_id or dashboard_id, cadence, channel, recipient).

**Open questions.**
- Free SQL (power user) or constrained query builder only?
- Sharing: anyone-with-link, or always require auth?

---

## F. Resources (SOPs)

**Why.** Knowledge that lives in your head doesn't scale. SOPs (Standard Operating Procedures) capture *how we do things here* — onboarding a client, kicking off a development, handling a refund, replying to a "your prices are too high" email. Two payoffs: future-Harry doesn't reinvent; future-team-member ramps fast. Also a natural retrieval source for the LLM (G) so it can answer "how do we handle X" with citations to your own SOPs.

**Key views.**
- **Resources index** — folder/tag tree: *Sales*, *Onboarding*, *Build*, *Handover*, *Maintenance*, *Finance*, *Comms*, *Compliance*, *Tools*.
- **SOP detail** — versioned markdown with sidebar TOC, last-updated metadata, owner, related SOPs, "used by N automations / templates".
- **Templates library (adjacent)** — email templates, proposal sections, checklist seeds — versioned alongside SOPs.

**Notable features.**
- Markdown source of truth, six-locale optional but English-first.
- Version history (diff view).
- "Mark as read" per user (so onboarding doesn't miss anything).
- Embeddable in other pages: a Development can pin "Kickoff SOP" so you don't have to navigate away.
- Indexed for LLM retrieval (G) — when you ask "Ask Plynos" how to handle a thing, it cites the SOP and shows you the section.
- Stale-content flag: SOPs not touched in 12 months get a "review me" badge.

**Data implications.**
- `resources` (id, slug, title, body_markdown, kind: sop|template|checklist, owner_id, locale, status, created_at, updated_at).
- `resource_versions` (resource_id, version, body_markdown, edited_by, edited_at).
- `resource_tags` (m:n).
- Vector embeddings index for retrieval (later, when LLM ships).

**Open questions.**
- Storage: in Supabase table (simpler, queryable) or markdown files in repo (versioned via Git, but slower to edit)?
- Templates live alongside SOPs in the same model, or separate?
- Public-facing subset? (e.g. a "how we work" page using a curated SOP)

---

## G. Ask Plynos — LLM assistant

**Why.** The most aligned with execution speed. Replaces five-minutes-of-SQL or five-minutes-of-clicking with a question. Absorbs what the old "Pipeline manager" page was supposed to do — querying leads, opportunities, conversion, stalls — because that's exactly what an LLM with read access does best. Pairs with Reporting (G ↔ E) and grounds answers in Resources (F).

**Where it lives.**
Sidebar nav item ("Ask Plynos") for now. Future: also surfaced as a header field or `Cmd+K` global palette so you can hit it from anywhere without a route change.

**Key views.**
- **Chat surface** — main pane is the conversation; side panel of pinned answers and recent prompts.
- **Suggested prompts** — surfaced contextually (on the Clients page → "clients with no activity in 30 days"; on a development → "summarise the build log").

**How it works.**
- Read-only DB access via a tool that runs whitelisted SELECTs against safe tables/views.
- Retrieval over Resources (F) — SOPs cited inline in answers.
- Returns: short prose answer + structured data + auto-generated table / chart.
- "Pin to dashboard" promotes any answer into a Reporting tile (E).

**Notable features.**
- Audit log of every prompt + the SQL it ran.
- Monthly cost ceiling.
- "Why this answer" — show the SQL and the SOP excerpts the model used.
- Pipeline-focused prompt presets out of the box (replaces standalone Pipeline manager):
  - "Stalled deals — anything in same stage > 7 days."
  - "Win rate by niche, last 90 days."
  - "Who am I owing a follow-up to right now?"
  - "Forecast next 30 days, weighted by stage."
  - "Top three reasons we lost in Q1."
- Local-only fallback (Ollama) for free, offline drafts.

**Data implications.**
- `llm_queries` (user, prompt, sql, result_summary, tokens, cost_cents, created_at, pinned_to_dashboard).
- Read-only Postgres role with grants on a *subset* of tables/views — `auth.users` is out of bounds.
- Embeddings index over `resources` for retrieval.

**Open questions.**
- Anthropic vs. OpenAI vs. local. Most likely Anthropic given CLAUDE.md ergonomics and prompt-cache support.
- Should the model also *propose* schema changes (suggest a view) for an operator to approve?
- Hard cap or soft cap on cost?

---

## H. Profile

**Why.** The bottom-left email currently exists but isn't navigable. Making it a button → profile page is a small change that opens up personalisation, security settings, and a place for "your stuff" (saved views, pinned reports, scheduled digests).

**Key views.**
- **Profile detail** — single page, sections:
  - *Identity* — name, email, avatar, timezone, locale, working hours.
  - *Security* — change password, signed-in devices, 2FA setup (later).
  - *Preferences* — default landing page on sign-in, theme (light / dark / system), notification preferences.
  - *Your stuff* — pinned records, saved filters, scheduled digests.
  - *Connected accounts* — Gmail, Cal.com, Slack, etc. (later).

**Notable features.**
- Avatar upload (Supabase Storage).
- "Sign out everywhere" for stolen-device case.
- Email cannot be changed inline — it's the Supabase Auth identity. Requires verification flow.

**Data implications.**
- Extend `profiles` (already exists): full_name, avatar_url, timezone, locale_preference, default_landing_route, theme_preference, notif_preferences jsonb.
- `user_pinned` (user_id, target_type, target_id, pinned_at).
- `user_saved_views` (user_id, page, filters jsonb, name).

**Open questions.**
- Avatar fallback — initials, gravatar, or Plynos blue mono?
- Where do per-user API tokens live — Profile or Settings?

---

## I. Settings

**Why.** Org-wide configuration that isn't per-user. Lives at the bottom of the sidebar, alongside Profile. Today there's no settings surface at all — locales are a code file, branding is implicit, integrations don't exist.

**Key views.**
- **Settings index** — left sub-nav inside the settings page:
  - *Organisation* — name, default currency, base locale, timezone, working hours.
  - *Branding* — logo, primary colour, email signature HTML.
  - *Locales* — view active locales (en_us, en_gb, es, fr, nl, de), surface translation coverage gaps.
  - *Integrations* — Resend, Stripe / Mollie, Gmail, Slack, Cal.com (connect / disconnect).
  - *API keys* — generate scoped tokens for external use.
  - *Webhooks* — outbound subscriptions to org events.
  - *Email* — sending domains, signatures, deliverability.
  - *Billing (of Plynos itself)* — your own Supabase / Resend / Vercel costs surfaced.
  - *Danger zone* — export everything, archive/delete org.

**Notable features.**
- Surfaces but doesn't duplicate the env-var validator — environment is canonical.
- Locale page links to the translations source and shows which keys are missing per locale.
- Integration cards show health: last successful call, last failure, error count.

**Data implications.**
- `org_settings` (singleton row, jsonb config).
- `org_integrations` (provider, config jsonb encrypted, status, last_seen, error_count).
- `org_api_keys` (id, name, hashed_token, scopes, created_by, last_used_at).
- `org_webhooks` (event_kinds, url, secret, status, last_delivery).

**Open questions.**
- Locale management — purely read-only viewer of the code file, or full edit-in-UI (requires rethinking translations as a DB-backed thing)?
- Surface env validation results in-page, or keep that as a build-time gate?

---

## Cross-cutting (not pages, but underpins everything)

### Events log (foundation)

Almost every shortlist item depends on a uniform event stream:
- Clients "Activity" tab → reads from it.
- Developments build log → reads from it.
- Teams performance metrics → reads from it.
- Automation triggers → writes / reads from it (when Automation lands).
- LLM (G) → queries over it.

Worth modelling once as `events` (actor, kind, target_type, target_id, payload jsonb, created_at) and projecting per-context views, rather than reinventing per page.

### Storage abstraction (foundation)

Clients "Documents", Developments "Assets", Finance "Invoice PDFs", Profile "Avatar", Resources "Attachments" — all want Supabase Storage with a consistent path / permissions model. Design once.

### Command palette (`Cmd+K`)

Pairs with Ask Plynos (G). Becomes the single *input* surface: type to navigate, type to query the LLM, run actions. Without it, Ask Plynos is a route you have to navigate to — with it, it's a keystroke from anywhere.

---

## Deferred (good ideas, not now)

- **Voice-to-action** — 30-second voice memo → transcribe → propose actions → confirm → apply. Strongest on mobile, depends on Ask Plynos (G) being live so the action-extraction layer exists. Park until G is shipped.
- **Automation page (workflow builder)** — strongest after foundations exist (events log) and after enough domain events are flowing through the system to be worth reacting to. Until then, ad-hoc cron jobs cover the recurring needs.
- **Mobile-polished PWA** — high value, but the work is continuous and pairs best with whatever you build next. Treat mobile responsiveness as a quality bar on each new page rather than its own milestone.
- **Public client portal** — separate (non-admin) login for clients to view status, upload assets, approve drafts. Wait until Clients (A) and Developments (B) settle, then evaluate.

---

## Suggested ordering

A defensible order that doesn't paint into corners:

1. **Events log** + **Storage abstraction** — invisible plumbing. Cheap to do first, expensive to retrofit.
2. **A. Clients** — anchor record. Everything else attaches.
3. **B. Developments** — biggest day-to-day workflow upgrade.
4. **H. Profile** + **I. Settings** — small but unlocks per-user/org config used by every page after.
5. **F. Resources (SOPs)** — captures knowledge before the next two need to draw on it.
6. **C. Finance** — money picks up.
7. **G. Ask Plynos (LLM)** — depends on enough data + SOPs to be useful. Replaces pipeline manager.
8. **E. Reporting** — pairs with G; fixed dashboards complement ad-hoc chat.
9. **D. Teams** — pays off when headcount changes or solo-tracking gets serious.
10. **Command palette** — once 1–9 exist, the value of a unified input surface is highest.
11. **Deferred items** as a rolling backlog.

Reorderable. Steps 1–4 are the highest-leverage foundation; steps 5–11 are increasingly optional but compounding.
