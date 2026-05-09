# CLAUDE.md — Plynos.dev codebase rules

## Project identity
Plynos.dev is a premium custom website service. The public site sells custom websites built fast (no specific delivery-window claim — older drafts said "24 hours", that framing has been removed across the public copy and should not be reintroduced). The admin at `/admin` tracks leads, niche experiments, campaigns, opportunities, and a suppression list. Operated by Harry Davies.

## Non-negotiables
- The only public page that names a price is `/presentation` (the blue-collar landing offer at "From €300"). Don't surface prices anywhere else — home, blogs, contact, hero, bridge, etc. stay price-free.
- Do not describe the offer as templates. Plynos = custom-built.
- Do not reintroduce the "built in 24 hours" claim. The current copy says "built fast" without committing to a specific timeline.
- Do not add public navigation to `/admin`.
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` in browser code (or any `"use client"` file).
- Admin must require Supabase Auth — no demo-mode bypass.
- Keep the codebase small enough to maintain alone.

## Stack (in use, not aspirational)
- **Next.js 14 App Router**, TypeScript (strict)
- **Tailwind CSS** with custom Plynos tokens
- **Plus Jakarta Sans** via `next/font/google` — the only font
- **Supabase** (Postgres, Auth, RLS) via `@supabase/ssr`. Row types are hand-rolled in `types/database.ts`. The Supabase clients are not yet wired to the `Database` generic — that requires `supabase gen types typescript` output, not the hand-rolled shape, since recent postgrest-js generics are incompatible with manually written `TableDef`s.
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
- The whole public site is multilingual via a cookie-based locale.
- Six locales are shipped: `en_us`, `en_gb`, `es`, `fr`, `nl`, `de`.
- Server components read the locale via `getLang()` from `lib/i18n/lang.ts`.
- Client components receive translated strings as props from their server parent.
- Translations live in `lib/i18n/translations.ts` (one `UI` shape, six dicts).
- Blog posts use `I18nString` (`{ en_us, en_gb, es, fr, nl, de }`) for every translatable field; helper `localize(field, lang)` reads the right one.
- The `LanguageSwitcher` writes a `plynos-lang` cookie and calls `router.refresh()` — no full page reload.
- Admin UI is English-only.
- When adding any new public-facing copy: add all six locale strings. Don't ship partial-locale strings to public components.

## Architecture expectations
- Public-site components in `components/site/`, admin in `components/admin/`.
- Supabase clients in `lib/supabase/` — `client.ts` (browser), `server.ts` (server + admin/service-role), `middleware.ts` (session updater), `admin-guard.ts` (auth + role check).
- DB row types in `types/database.ts` (hand-rolled). Cast query results to these types at the call site (e.g. `as Lead[]`).
- Blog posts live in `lib/blogs.ts` as the single source of truth — typed `I18nString` for all six locales and structured `BlogBlock[]` body. The home teaser, `/blogs`, `/blogs/[slug]` and the sitemap all consume from it. Publishing a post is a code change. Don't reintroduce a DB-backed blogs admin without first expanding it to handle six locales and structured blocks; the previous `/admin/blogs` module was removed because it never matched the typed shape the public site needs.
- i18n in `lib/i18n/`.
- Transactional email helpers in `lib/mailer.ts`.
- Server actions in `app/admin/(protected)/<module>/actions.ts`.
- API routes (`/api/leads`, `/api/unsubscribe`) validate via Zod, rate-limit per IP, run on the Node runtime, and use the service-role client to insert past RLS.
- `/api/unsubscribe` accepts both POST (JSON) and GET (one-click link). The GET handler validates the query string with Zod and 303-redirects to `/unsubscribe?email=…&status=ok` so direct link clicks produce visible feedback.
- Dashboard metrics come from real Supabase queries via `lib/admin/metrics.ts` — no mock data.
- Build-time env validation lives at `scripts/validate-env.mjs` and runs via the `prebuild` npm hook.

## Public site sections
1. `Hero` — pill, headline, subhead, primary + secondary CTA.
2. `HeroBridge` — dark navy→slate gradient card, "Built to last. Owned by you." with a CTA pill.
3. `Blogs` — light teaser of three posts; "View all ↗" links to `/blogs`.
4. `FinalCta` — same content as `/contact`: "Get in touch." headline, three-field `ContactForm`.

Plus dedicated routes: `/contact`, `/blogs`, `/blogs/[slug]`, `/presentation`, `/privacy`, `/legal`, `/cookies`, `/unsubscribe`.

`/unsubscribe` is intentionally a **standalone full page** — no `SiteHeader` or `SiteFooter`, just a logo top-left and a thin footer link. Email recipients reach it via the unsubscribe link and shouldn't be re-marketed to.

`/presentation` is a single-page offer landing, aimed at blue-collar businesses (plumbers, electricians, builders, etc.). It is the only public page that quotes a price ("From €300") and is the destination for cold outreach to that segment. Headline copy ("A website built for the work you do.") and structure (hero → why → how we work → investment callout → closing CTA) are intentionally minimalist; the page uses the existing `Drift`, `SiteHeader`, `SiteFooter`, and `container-page` primitives so it stays visually consistent with the rest of the public site. There is no public nav link to it — it lives off direct outreach links.

## Admin

The admin panel lives at `/admin/*`. There is no separate admin design doc — the rules below plus the code itself are the source of truth.

Key admin rules:
- The route is `/admin/opportunities`. The DB table is `opportunities` (renamed from `deals`); the TypeScript type is `Opportunity`.
- "Industry" is the user-facing label for what the DB calls `niche` (the column on `leads`). The internal experiment-tracking module is still called "Niches".
- Sidebar nav is **text-only** — no `lucide-react` icons next to nav labels. Functional icons (chevron, X, search glass, loader spinner, mobile menu) are still allowed where they actually convey meaning.
- Tables and stat tiles use **hairline borders**, not rounded cards or shadows.
- All admin pages live under the `(protected)` route group whose layout calls `requireAdminUser()`.
- CSV lead imports validate every row through `leadCsvRowSchema` from `lib/validation.ts`. Per-row errors are returned to the import UI and shown to the operator.

## Admin auth (three layers)
1. **Edge middleware** (`middleware.ts` → `lib/supabase/middleware.ts`) redirects unauthenticated `/admin/*` requests to `/admin/login` before any server component runs.
2. **Server-side guard** (`lib/supabase/admin-guard.ts:requireAdminUser`) used by the protected layout — refuses to render if Supabase isn't configured, re-checks `auth.getUser()`, and reads `profiles.role`. Non-admin → `/admin/login?error=forbidden`.
3. **Row Level Security** — every admin table requires `is_admin()` in its RLS policies. Service-role bypasses RLS only on server-only API routes.

There is no demo / preview mode. With no Supabase env, the admin shows a "Supabase is not configured" notice and refuses to render the UI.

## Environment variables
| Var | Server/client | Required? |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | metadata | yes |
| `NEXT_PUBLIC_SUPABASE_URL` | both | yes for admin |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | both | yes for admin |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | yes for storing leads |
| `RESEND_API_KEY` | server only | optional (no-ops if missing) |
| `LEAD_NOTIFICATION_TO` | server only | required if Resend used |
| `LEAD_NOTIFICATION_FROM` | server only | required if Resend used |

The user uses a single `.env` file for all of these; no `.env.example` (intentionally — they don't want a template). `npm run build` blocks if required vars are missing or malformed.

## Supabase
- Schema migrations live in `supabase/migrations/` and must be run in numeric order in the Supabase SQL editor for the admin and lead form to work.
- Admin user is created via **Auth → Users**; the `on_auth_user_created` trigger mints a `profiles` row with `role = 'admin'`.

## Security checklist
- RLS enabled on every table; admin-gated by `is_admin()`.
- Service-role key never imported into a `"use client"` file.
- Inputs validated by Zod on `/api/leads` (POST) and `/api/unsubscribe` (POST and GET query string).
- Per-IP rate limiting on public POSTs and the unsubscribe GET (`lib/rate-limit.ts`, with periodic bucket sweep to prevent unbounded growth).
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
- `npm run build` passes (which also runs the env validator).
- All public-facing copy has translations for all six shipped locales.
- Public landing page is fully responsive.
- Lead form writes to Supabase **and** sends a notification email when Resend is configured.
- `/admin/*` redirects unauthenticated users to `/admin/login`.
- Admin dashboard surfaces real metrics from Supabase queries.
- README explains Supabase setup, Resend setup, and deployment.
