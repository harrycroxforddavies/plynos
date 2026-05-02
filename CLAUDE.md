# CLAUDE.md — Plynos.dev codebase rules

## Project identity
Plynos.dev is a premium custom website service. The public site sells custom websites built fast (no specific delivery-window claim — older drafts said "24 hours", that framing has been removed across the public copy and should not be reintroduced). The admin at `/admin` tracks leads, niche experiments, campaigns, deals, content, and a suppression list. Operated by Harry Davies.

## Non-negotiables
- Do not show prices publicly.
- Do not describe the offer as templates. Plynos = custom-built.
- Do not reintroduce the "built in 24 hours" claim. The current copy says "built fast" without committing to a specific timeline.
- Do not add public navigation to `/admin`.
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` in browser code (or any `"use client"` file).
- Admin must require Supabase Auth — no demo-mode bypass.
- Keep the codebase small enough to maintain alone.

## Stack (in use, not aspirational)
- **Next.js 14 App Router**, TypeScript
- **Tailwind CSS** with custom Plynos tokens
- **Plus Jakarta Sans** via `next/font/google` — the only font, EN and ES
- **Supabase** (Postgres, Auth, RLS) via `@supabase/ssr`
- **Resend** for transactional new-lead notification emails (optional — gracefully no-ops if unconfigured)
- **framer-motion** for the scroll-driven `Drift` parallax wrapper and the dark hero-bridge effect
- **lucide-react** icons
- **Zod** validation
- Hand-rolled UI primitives (no shadcn dependency)
- Vercel-compatible

## Design tokens
- `--plynos-blue: #0B5FFF`
- `--plynos-navy: #0B1220`
- `--plynos-slate: #5B6472`
- `--plynos-soft-blue: #EAF2FF`
- `--plynos-white: #FFFFFF`
- `--plynos-teal: #14B8A6`

## Writing style
Direct, confident, lower-key. Prefer:
- "A custom website for your business, built fast."
- "No template feel. Clean handover, fully owned by you."
- "Built to last. Owned by you."
- "Get in touch."

Avoid:
- All-caps text ("PLYNOS — NEW LEAD" style); use sentence case.
- Em-dashes (`—`) and en-dashes (`–`) in new copy. The codebase has been scrubbed; use a period or comma.
- Generic agency phrasing ("digital transformation solutions", "leverage cutting-edge technology", "affordable websites").
- Templates language. Plynos is not a template seller.
- Specific delivery-window claims ("24 hours", "next-day", etc.).

## Internationalisation
- The whole public site is bilingual (EN/ES) via a cookie-based locale.
- Server components read the locale via `getLang()` from `lib/i18n/lang.ts`.
- Client components receive translated strings as props from their server parent.
- Translations live in `lib/i18n/translations.ts` (one `UI` shape, two dicts: `en`, `es`).
- Blog posts use `I18nString` (`{ en, es }`) for every translatable field; helper `localize(field, lang)` reads the right one.
- The `LanguageSwitcher` writes a `plynos-lang` cookie and calls `router.refresh()` — no full page reload.
- Admin UI is English-only.
- When adding any new public-facing copy: add both EN and ES. Don't ship EN-only strings to public components.

## Architecture expectations
- Public-site components in `components/site/`, admin in `components/admin/`.
- Supabase clients in `lib/supabase/` — `client.ts` (browser), `server.ts` (server + admin/service-role), `middleware.ts` (session updater), `admin-guard.ts` (auth + role check).
- DB row types in `types/database.ts`.
- Blog data in `lib/blogs.ts` (single source of truth; both home teaser and `/blogs/*` consume from it).
- i18n in `lib/i18n/`.
- Transactional email helpers in `lib/mailer.ts`.
- Server actions in `app/admin/(protected)/<module>/actions.ts`.
- API routes (`/api/leads`, `/api/unsubscribe`) validate via Zod, rate-limit per IP, run on the Node runtime, and use the service-role client to insert past RLS.
- Dashboard metrics come from real Supabase queries via `lib/admin/metrics.ts` — no mock data.

## Public site sections
1. `Hero` — pill, headline, subhead, primary + secondary CTA.
2. `HeroBridge` — dark navy→slate gradient card, "Built to last. Owned by you." with a CTA pill.
3. `Blogs` — light teaser of three posts; "View all ↗" links to `/blogs`.
4. `FinalCta` — same content as `/contact`: "Get in touch." headline, three-field `ContactForm`.

Plus dedicated routes: `/contact`, `/blogs`, `/blogs/[slug]`, `/privacy`, `/legal`, `/cookies`, `/unsubscribe`.

## Admin auth (three layers)
1. **Edge middleware** (`middleware.ts` → `lib/supabase/middleware.ts`) redirects unauthenticated `/admin/*` requests to `/admin/login` before any server component runs.
2. **Server-side guard** (`lib/supabase/admin-guard.ts:requireAdminUser`) used by the protected layout — refuses to render if Supabase isn't configured, re-checks `auth.getUser()`, and reads `profiles.role`. Non-admin → `/admin/login?error=forbidden`.
3. **Row Level Security** — every admin table requires `is_admin()` in its RLS policies. Service-role bypasses RLS only on server-only API routes.

There is no demo / preview mode. With no Supabase env, the admin shows a "Supabase is not configured" notice and refuses to render the UI.

## Environment variables
| Var | Server/client | Required? |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | both | yes for admin |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | both | yes for admin |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | yes for storing leads |
| `RESEND_API_KEY` | server only | optional (no-ops if missing) |
| `LEAD_NOTIFICATION_TO` | server only | required if Resend used |
| `LEAD_NOTIFICATION_FROM` | server only | required if Resend used |
| `NEXT_PUBLIC_SITE_URL` | metadata | yes |

The user uses a single `.env` file for all of these; no `.env.example` (intentionally — they don't want a template).

## Supabase
- Schema in `supabase/migrations/0001_init.sql` (all tables, RLS, `is_admin()`, `on_auth_user_created` trigger).
- Phone column added in `supabase/migrations/0002_lead_phone.sql`.
- Both must be run in the Supabase SQL editor for the admin and lead form to work.
- Admin user is created via Auth → Users; the trigger mints a `profiles` row with `role = 'admin'`.

## Security checklist
- RLS enabled on every table; admin-gated by `is_admin()`.
- Service-role key never imported into a `"use client"` file.
- Inputs validated by Zod on `/api/leads` and `/api/unsubscribe`.
- Per-IP rate limiting on public POSTs (`lib/rate-limit.ts`).
- Honeypot field on the contact form.
- Suppression-list lookup happens before any new lead is stored.
- `robots.ts` disallows `/admin`, `/api`, and `/unsubscribe`.

## Email notifications
- New leads trigger `sendLeadNotification` in `lib/mailer.ts` (Resend).
- Email is plain-text-styled minimal HTML with the Plynos icon at the top, sentence-case labels, no all-caps, no fancy template branding.
- `Reply-To` is set to the lead's address so hitting reply replies to them.
- If Resend isn't configured, the lead still saves to Supabase and the function returns `{ ok: false, reason: "not_configured" }` quietly.

## Definition of done
- `npm run lint` passes.
- `npm run build` passes.
- All public-facing copy has both EN and ES translations.
- Public landing page is fully responsive.
- Lead form writes to Supabase **and** sends a notification email when Resend is configured.
- `/admin/*` redirects unauthenticated users to `/admin/login`.
- Admin dashboard surfaces real metrics from Supabase queries.
- README explains Supabase setup, Resend setup, and deployment.
