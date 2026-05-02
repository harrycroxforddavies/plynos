# Plynos.dev

Premium custom website service. Public landing page plus a private admin/CRM at `/admin`.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (custom Plynos tokens)
- Supabase (Postgres, Auth, RLS) via `@supabase/ssr`
- Lucide icons, Zod validation

## Getting started

```bash
npm install
cp .env.example .env.local
# fill in the Supabase values, then
npm run dev
```

Open http://localhost:3000 for the public site, http://localhost:3000/admin for the (gated) admin login.

### Environment variables

| Variable | Used in | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server | Public anon key for auth/SSR |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | Used by `/api/leads` and `/api/unsubscribe` to write public submissions; **never** exposed to the browser |
| `NEXT_PUBLIC_SITE_URL` | metadata | Canonical site URL for OpenGraph/sitemap |

The site builds without Supabase configured — public pages render fine and the lead form will display a "received" message but skip storage. Configure Supabase before going live.

## Supabase setup

1. Create a new Supabase project.
2. Open the SQL editor and run `supabase/migrations/0001_init.sql`. This creates every table the admin needs, the `is_admin()` helper, an `on_auth_user_created` trigger that mints a `profiles` row with `role = 'admin'`, and Row Level Security policies that lock everything to admins (with a public-read policy for published content).
3. In **Auth → Users**, create your admin user with email + password.
4. Confirm a row exists in `public.profiles` for that user with `role = 'admin'`.
5. Add the project URL, anon key and service-role key to `.env.local`.

### Architecture notes

- The browser **never** receives the service-role key. Public form submissions go through `/api/leads` and `/api/unsubscribe`, which run on the Node runtime and use the service-role client.
- Admin pages use the standard `@supabase/ssr` server client. RLS plus the `is_admin()` predicate keeps non-admins out even if they obtain a session somehow.
- `middleware.ts` redirects unauthenticated users from `/admin/*` to `/admin/login`, and signed-in users away from `/admin/login` to the dashboard.
- The login page is **not** linked from the public navigation. It's reachable only by typing `/admin` (which redirects to `/admin/dashboard`, which redirects to `/admin/login` when there's no session).

## Scripts

```bash
npm run dev        # local dev server
npm run lint       # next lint
npm run typecheck  # tsc --noEmit
npm run build      # next build (production)
npm run start      # serve the built app
```

## Deployment

This project is Vercel-ready. Set the four env vars in your project settings, deploy, and point your domain at the Vercel project. Make sure to also keep the Supabase project's allowed redirect URLs set to your production domain.

## Public site sections

`app/page.tsx` composes:

1. Hero — single benefit-first headline, dual CTAs, no pricing.
2. Trust strip — solo-operator credibility tags.
3. Problem — three cards on the cost of a stale site.
4. Offer — six pillars of what's included.
5. Process — four-step send → build → review → handover.
6. Sample concepts — clearly labelled placeholder portfolio.
7. Ownership — domain/hosting/source belong to the client.
8. FAQ. Covers delivery window, revisions, hosting, complex builds.
9. Notes (blog teaser) — three starter article cards.
10. Final CTA + lead form — Zod-validated, rate-limited.

## Admin modules

- `/admin/dashboard` — leads (today/7d/30d), conversion, calls booked, proposals sent, AOV, revenue 30d, campaign reply rate, leads-by-niche bar chart, recent leads table.
- `/admin/leads` — CRUD with status pipeline.
- `/admin/niches` — niche experiments with score and decision.
- `/admin/campaigns` — outbound campaigns with editable per-row counters and reply-rate calculation.
- `/admin/content` — blog/news/portfolio/testimonial entries with publish toggle.
- `/admin/deals` — payment status, asset readiness, build/review/launch/handover toggles, EUR value.
- `/admin/suppression` — unsubscribe list with one-click add/remove; lead form rejects matching emails.

## Security checklist

- RLS enabled on every public schema table; admin-gated by `is_admin()`.
- Service-role key never imported into client components.
- Input validation via Zod on `/api/leads` and `/api/unsubscribe`.
- Per-IP rate limiting on public POSTs.
- Honeypot field on the lead form.
- Admin role re-checked server-side on every protected layout render.
- Suppression-list lookups happen before any new lead is stored.
- `robots.ts` disallows `/admin`, `/api`, and `/unsubscribe`.

## Style guarantees

- No public pricing anywhere.
- No "templates" language — Plynos is custom-built.
- No public link to `/admin`.
