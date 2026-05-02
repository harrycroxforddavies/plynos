# Plynos.dev

Premium custom website service. Public landing page plus a private admin/CRM at `/admin`.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (custom Plynos tokens)
- Supabase (Postgres, Auth, RLS) via `@supabase/ssr`
- Plus Jakarta Sans, Lucide icons, Zod validation, framer-motion

## Quick start

```bash
npm install
cp .env.example .env.local      # fill in the Supabase values
npm run dev                     # http://localhost:3000
```

The public site at `/` runs without any backend. The admin at `/admin/*` requires Supabase to be configured (see below); without it the admin route shows a clear "configure Supabase" notice and refuses to render the UI.

## Environment variables

| Variable | Used in | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server | Public anon key (browser-safe; gated by RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Used by `/api/leads` and `/api/unsubscribe` to write public-form submissions. Bypasses RLS. **Never** import from a `"use client"` file |
| `RESEND_API_KEY` | server only, optional | Resend API key for new-lead email notifications. If unset, leads are still saved to Supabase but no email is sent |
| `LEAD_NOTIFICATION_TO` | server only | Where to send the new-lead email (default: `harry@plynos.dev`) |
| `LEAD_NOTIFICATION_FROM` | server only | Sender address. Must use a domain verified in Resend (e.g. `Plynos <leads@plynos.dev>`). Use `onboarding@resend.dev` while testing before domain verification |
| `NEXT_PUBLIC_SITE_URL` | metadata | Canonical site URL for OpenGraph / sitemap |

## Supabase setup (one-time)

1. **Create the project** at [database.new](https://database.new). Pick the closest region.
2. **Run the migrations** — open the SQL editor and execute these in order:
   - [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) — every table, the `is_admin()` helper, the `on_auth_user_created` trigger that creates a `profiles` row with `role = 'admin'`, and the RLS policies that gate everything.
   - [`supabase/migrations/0002_lead_phone.sql`](supabase/migrations/0002_lead_phone.sql) — adds the `phone` column to `leads` (idempotent; safe to re-run).
3. **Create the admin user** in **Auth → Users → Add user → Send invite link** (or "Add user (manually)" with email+password). The trigger from step 2 will create a matching `profiles` row with `role = 'admin'`.
4. **Confirm the role**: in **Table editor → profiles**, the row for your user should have `role = 'admin'`. If not, set it manually — the layout's role check refuses anything else.
5. **Copy the keys** from **Settings → API**:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`
6. **Restart `npm run dev`** so Next picks up the new env vars.

After that, http://localhost:3000/admin will redirect to `/admin/login`. Sign in with the user you created in step 3.

## Email notifications (Resend)

Every lead submitted through `/contact` or the home page form is saved to Supabase. To also get an email when a new lead arrives:

1. Sign up at [resend.com](https://resend.com) (free tier: 3,000/month, 100/day).
2. Create an API key in **API keys** → set `RESEND_API_KEY` in `.env.local`.
3. Set `LEAD_NOTIFICATION_TO=harry@plynos.dev` (or wherever you want them sent).
4. Set `LEAD_NOTIFICATION_FROM` — this must be a sender on a verified domain, **otherwise emails will fail or only deliver to your own signup address**:
   - **Testing**: `LEAD_NOTIFICATION_FROM=onboarding@resend.dev` (delivers only to the address you used to sign up).
   - **Production**: verify `plynos.dev` in **Resend → Domains** by adding the DNS records they generate (SPF, DKIM, optional DMARC). Once verified, use `LEAD_NOTIFICATION_FROM="Plynos <leads@plynos.dev>"`.
5. Restart `npm run dev` and submit the form. You'll get a styled HTML email with the lead's name, email, phone, industry, message, and a `Reply-To` set to the lead's address — so hitting reply replies straight to them.

If any of the three Resend env vars is missing, the API silently skips the email step and the lead form still succeeds. No partial failures.

## Admin auth — three layers of defence

1. **Edge middleware** ([middleware.ts](middleware.ts)) — every request to `/admin/*` (except `/admin/login`) is checked for a session cookie. Unauthenticated requests redirect to `/admin/login` *before* any server component runs.
2. **Server-side guard** ([lib/supabase/admin-guard.ts](lib/supabase/admin-guard.ts)) — the protected layout calls `requireAdminUser()`, which:
   - Refuses to render if Supabase env is missing.
   - Re-checks `auth.getUser()` (the middleware redirect could be bypassed if cookies are spoofed).
   - Reads the user's `role` from `public.profiles` and redirects to `/admin/login?error=forbidden` if it isn't `'admin'`.
3. **Row Level Security** — every admin-data table has policies that require `is_admin()`. Even if a session leaks somewhere, RLS prevents reads/writes for non-admin users.

## Architecture notes

- The browser **never** receives the service-role key. Public form submissions go through `/api/leads` and `/api/unsubscribe`, which run on the Node runtime and use the service-role client (RLS-bypass) to insert.
- The login page is **not** linked from the public navigation. It's reachable only by typing `/admin` (which redirects to `/admin/dashboard`, which the layout redirects to `/admin/login` when there's no session).
- `robots.ts` disallows `/admin`, `/api`, and `/unsubscribe`.

## Scripts

```bash
npm run dev        # local dev server
npm run lint       # next lint
npm run typecheck  # tsc --noEmit
npm run build      # next build (production)
npm run start      # serve the built app
```

## Deployment (Vercel)

1. Push the repo to GitHub (or any git provider Vercel supports).
2. Import into Vercel.
3. Add the four env vars from the table above to Vercel's **Settings → Environment Variables** (Production + Preview).
4. In your Supabase project, **Authentication → URL Configuration**, add the production domain to the allowed redirect URLs.
5. Deploy.

## Public site sections

`app/page.tsx` composes:

1. **Hero** — pill, big headline, dual CTAs (Request a website / Read the blogs).
2. **HeroBridge** — dark gradient card ("Built to last. Owned by you.") with a Request-a-website pill.
3. **Blogs teaser** — 3 latest posts; "View all ↗" links to `/blogs`.
4. **FinalCta** — same layout as `/contact`: "Get in touch." headline + 3-field form (Name, Email, Message).

Plus dedicated pages: `/contact`, `/blogs`, `/blogs/[slug]`, `/privacy`, `/legal`, `/cookies`, `/unsubscribe`.

## Admin modules

- `/admin/dashboard` — leads (today/7d/30d), conversion, calls booked, proposals sent, AOV, revenue 30d, campaign reply rate, leads-by-niche bar chart, recent leads table.
- `/admin/leads` — CRUD with status pipeline. Phone column included.
- `/admin/niches` — niche experiments with score and decision.
- `/admin/campaigns` — outbound campaigns with editable per-row counters and reply-rate calculation.
- `/admin/content` — blog/news/portfolio/testimonial entries with publish toggle.
- `/admin/deals` — payment status, asset readiness, build/review/launch/handover toggles, EUR value.
- `/admin/suppression` — unsubscribe list with one-click add/remove; lead form rejects matching emails.

## Internationalisation

The whole public site supports EN/ES via a cookie-based locale (see [lib/i18n/lang.ts](lib/i18n/lang.ts) and [lib/i18n/translations.ts](lib/i18n/translations.ts)). The language switcher in the header sets a `plynos-lang` cookie and calls `router.refresh()` so server components re-render with the chosen locale. Admin UI is English-only.

## Security checklist

- RLS enabled on every public schema table; admin-gated by `is_admin()`.
- Service-role key never imported into client components.
- Input validation via Zod on `/api/leads` and `/api/unsubscribe`.
- Per-IP rate limiting on public POSTs.
- Honeypot field on lead/contact forms.
- Admin role re-checked server-side on every protected layout render.
- Suppression-list lookups happen before any new lead is stored.
- `robots.ts` disallows `/admin`, `/api`, and `/unsubscribe`.
