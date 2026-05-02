# Routes

## Current routes

```
app/admin/
├─ login/
│  └─ page.tsx                        unauthenticated; sign in form
├─ page.tsx                           server-redirect to /admin/dashboard
└─ (protected)/
   ├─ layout.tsx                      requireAdminUser() gate + AdminShell
   ├─ dashboard/
   │  └─ page.tsx                     metrics + recent leads
   ├─ leads/
   │  ├─ page.tsx                     CRUD list
   │  └─ actions.ts                   server actions
   ├─ niches/
   │  ├─ page.tsx
   │  └─ actions.ts
   ├─ campaigns/
   │  ├─ page.tsx
   │  └─ actions.ts
   ├─ content/
   │  ├─ page.tsx
   │  └─ actions.ts
   ├─ deals/                          will be removed in Phase 1, replaced by opportunities/
   │  ├─ page.tsx
   │  └─ actions.ts
   └─ suppression/
      ├─ page.tsx
      └─ actions.ts
```

## Phase 1 — restructure

```
app/admin/(protected)/
├─ dashboard/                          unchanged path, restyled
├─ leads/                              unchanged path, restyled
├─ opportunities/                      NEW — moved from /admin/deals; same DB table
│  ├─ page.tsx
│  └─ actions.ts
├─ campaigns/
├─ niches/
├─ content/
└─ suppression/
```

Note: the route `/admin/deals` is removed entirely. No need to keep a redirect — the admin panel has no production traffic on it yet, and the sidebar / internal links will all point at `/admin/opportunities`.

## Phase 3 onward — record detail pages

Each list page gains a clickable row that opens a detail page. Pattern:

```
app/admin/(protected)/leads/
├─ page.tsx                           list view
├─ [id]/
│  ├─ page.tsx                        detail view
│  └─ actions.ts                      lead-scoped server actions (notes, status, etc.)
└─ actions.ts                         list-scoped server actions (create, bulk delete)
```

Same pattern for `opportunities/[id]`, `campaigns/[id]`, `content/[id]`. `niches`, `suppression` stay flat (no detail page needed).

## Phase 5 — tasks module

```
app/admin/(protected)/tasks/
├─ page.tsx                           "My follow-ups" — overdue + due today + upcoming
└─ actions.ts
```

Tasks attach to a lead/deal/campaign but are surfaced in their own queue.

## Phase 6 — campaign builder

```
app/admin/(protected)/campaigns/
├─ page.tsx                           list (existing)
├─ new/
│  └─ page.tsx                        wizard: name, niche, channel, audience, sequence
├─ [id]/
│  ├─ page.tsx                        overview + sends timeline + per-step metrics
│  ├─ steps/
│  │  ├─ page.tsx                     edit sequence
│  │  └─ actions.ts
│  └─ actions.ts
└─ actions.ts
```

## Phase 8 — settings

```
app/admin/(protected)/settings/
├─ page.tsx                           profile, integrations (Resend, Supabase), API keys
└─ actions.ts
```

## API routes (admin-side, server-only)

We'll add admin-side API routes only when something needs to be called from a client-side component without going through a server action. Currently there are none planned — server actions are sufficient.

The existing public API routes (`/api/leads`, `/api/unsubscribe`) stay where they are.

## Webhooks (Phase 6)

```
app/api/resend/webhook/
└─ route.ts                           POST — receives Resend delivery events,
                                      updates campaign_sends.delivered_at /
                                      opened_at / replied_at / bounced_at.
```

Resend's webhook signing secret will live in `.env` as `RESEND_WEBHOOK_SECRET`.

## Conventions

- `/admin/<module>/[id]` is always a detail page when present. Never use it for "edit" — edits happen inline on the list or on the detail page.
- `actions.ts` lives next to the page that owns the actions. List-scoped actions in `<module>/actions.ts`; record-scoped actions in `<module>/[id]/actions.ts`.
- Every action is a `"use server"` function that takes a `FormData` (or typed args) and returns `{ ok: true } | { error: string }`. After mutations, call `revalidatePath` for the affected route.
- Every protected page does `const supabase = createSupabaseServerClient(); if (!supabase) return null;` at the top — the layout has already enforced auth, but this keeps the page resilient and makes the type narrow.
