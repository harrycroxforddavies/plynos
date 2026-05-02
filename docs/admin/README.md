# Plynos Admin — refactor plan

This directory is the living plan for refactoring the admin panel into a serious, formal, data-dense control room that nonetheless feels like the public Plynos site (Plus Jakarta Sans, navy / slate / blue palette, sentence case, no caps, no decoration). It must survive chat restarts — every decision lives in markdown so future-you (or future-Claude) can pick up exactly where we left off.

## Read these in order

1. [vision.md](./vision.md) — the brand-led design language for the admin and what "data master" means.
2. [ux.md](./ux.md) — concrete UX rules (typography, layout, no-icon policy, table conventions, loading/empty states).
3. [data-model.md](./data-model.md) — current schema, proposed additions, migration order.
4. [routes.md](./routes.md) — current routes, planned routes, and route-structure conventions.
5. [phases.md](./phases.md) — the numbered phased rollout. **The single source of truth for what's done and what's next.** Update this as you complete each phase.

## What problem we're solving

The current admin is functional but visually generic and shallow:
- It uses `lucide-react` icons everywhere, which clashes with the landing page's restrained, icon-free aesthetic.
- Each module is a flat CRUD table with a single inline create-form. There are no detail pages, no filters, no saved views, no lead timeline, no pipeline, no follow-up tasks, no email composition, no audit trail.
- The dashboard is a static grid of summary stats with one recent-leads table — fine for v0, useless once volume picks up.
- "Deals" should be **Opportunities** — sales-CRM language, more accurate to the model.

Plynos is supposed to read as a serious operator's tool. Linear, Attio, Pylon, Hex are the references — quiet, dense, fast, formal — not Notion or Trello-style cuteness.

## Non-negotiables (carried over from CLAUDE.md)

- Sentence case only. No `uppercase` utilities anywhere.
- No em-dashes (`—`) or en-dashes (`–`) in copy. Use periods or commas.
- Plus Jakarta Sans throughout. Same colour tokens as the landing page.
- Dark mode parity with the landing site.
- Admin requires Supabase auth. No demo/preview bypass.
- All admin data flows through Row Level Security, gated by `is_admin()`.
- Service-role key never imported into a `"use client"` file.

## Current status

See [phases.md](./phases.md). Phase 1 is in progress.
