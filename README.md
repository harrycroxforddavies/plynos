<p align="center">
  <img src="public/plynos.svg" alt="Plynos" width="96" height="96">
</p>

<h1 align="center">Plynos.dev</h1>

<p align="center">
  Premium custom websites, built fast.<br>
  Public marketing site + private admin panel for leads, opportunities, campaigns, niches and a suppression list.
</p>

<p align="center">
  <a href="https://nextjs.org/"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-000?logo=next.js&logoColor=white"></a>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white">
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Postgres-3ECF8E?logo=supabase&logoColor=white">
</p>

---

## Contents

- [About](#about)
- [Stack](#stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Supabase setup](#supabase-setup)
- [Email notifications](#email-notifications)
- [Project layout](#project-layout)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Security](#security)

## About

Plynos is a single-operator studio that builds custom websites for small and mid-sized businesses. This repo is the production marketing site and the admin tooling Harry uses to run the business.

The public site is bilingual-first (six locales) and contains: the home landing, contact, blogs, presentation (cold-outreach offer page) and legal pages. The admin lives at `/admin` and is hidden from search engines.

## Stack

- **Next.js 14** (App Router) + **TypeScript** in strict mode
- **Tailwind CSS** with custom Plynos design tokens, **Plus Jakarta Sans** via `next/font`
- **Supabase** (Postgres + Auth + RLS) using `@supabase/ssr`
- **Resend** for transactional new-lead notification emails (optional)
- **framer-motion** for scroll-driven motion (`Drift`, hero bridge)
- **lucide-react** icons, **Zod** validation, hand-rolled UI primitives

## Getting started

```bash
git clone <this-repo>
cd plynos
npm install
cp .env.example .env  # if you have one; otherwise create .env (see below)
npm run validate-env  # confirm your .env is complete
npm run dev
```

The dev server starts at <http://localhost:3000>.

## Environment variables

Create a `.env` at the repo root:

| Var | Where | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | server + client | yes |
| `NEXT_PUBLIC_SUPABASE_URL` | server + client | yes (for admin + lead form) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | server + client | yes |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | yes (for `/api/leads` insert past RLS) |
| `RESEND_API_KEY` | server only | optional |
| `LEAD_NOTIFICATION_TO` | server only | required if Resend is used |
| `LEAD_NOTIFICATION_FROM` | server only | required if Resend is used |

`npm run build` runs `scripts/validate-env.mjs` automatically and refuses to build if anything required is missing or malformed.

## Supabase setup

The admin and lead-capture flow require a Supabase project with the schema in `supabase/migrations/` applied (in order, in the SQL editor).

1. Create a Supabase project at <https://supabase.com>.
2. Copy the project URL and anon key into `.env`.
3. Copy the service-role key (Project Settings → API) — server only.
4. Run every file in `supabase/migrations/` in the Supabase SQL editor, in numeric order.
5. Create the admin user under **Auth → Users**. The `on_auth_user_created` trigger mints a `profiles` row with `role = 'admin'`.
6. Sign in at `/admin/login`.

Row-level security is enabled on every table; admin access is gated by an `is_admin()` policy. The service-role key bypasses RLS only on server-only API routes.

## Email notifications

If Resend is configured, every new lead from `/api/leads` triggers `sendLeadNotification` in `lib/mailer.ts`. The email is plain-text styled HTML with the Plynos icon, sentence-case labels, and `Reply-To` set to the lead's email so replying replies to them.

If `RESEND_API_KEY` is unset, the lead still saves to Supabase and the function returns `{ ok: false, reason: "not_configured" }` quietly.

## Project layout

```
app/                           Next.js App Router routes
  (public marketing pages)     /, /contact, /blogs, /blogs/[slug],
                               /presentation, /privacy, /legal,
                               /cookies, /unsubscribe
  admin/                       /admin/* (auth + protected layout)
  api/                         /api/leads, /api/unsubscribe
  robots.ts, sitemap.ts        SEO

components/site/               Public site components
components/admin/              Admin UI

lib/
  supabase/                    Server, browser and admin clients + auth guard
  i18n/                        Six-locale dictionary + cookie-based lang
  blogs.ts                     Hardcoded public blog posts (single source)
  validation.ts                Zod schemas for lead capture and CSV import
  rate-limit.ts                In-memory IP rate limiter
  mailer.ts                    Resend transactional email
  admin/metrics.ts             Real-time dashboard metrics

types/database.ts              Supabase row types + Database type
supabase/migrations/           SQL migrations
public/                        Static assets (logo, blog concept SVGs)
scripts/validate-env.mjs       Build-time env validator
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Validate env, then `next build` |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run validate-env` | Run the env validator on its own |

## Deployment

Designed for Vercel. Push the repo, set the env vars in the Vercel project, and `npm run build` will run automatically. Set `NEXT_PUBLIC_SITE_URL` to the production domain.

## Security

- Row Level Security on every Supabase table. Admin tables require `is_admin()`.
- Three-layer admin auth: edge middleware redirects unauthenticated `/admin/*` requests, the protected layout calls `requireAdminUser()`, and RLS gates every table.
- The service-role key is never imported into a `"use client"` file.
- Public POST endpoints (`/api/leads`, `/api/unsubscribe`) are Zod-validated and per-IP rate-limited.
- The contact form has a honeypot field.
- The suppression list is checked before any new lead is stored.
- `robots.ts` disallows `/admin`, `/api`, and `/unsubscribe`.

---

<sub>Operated by Harry Davies. All rights reserved.</sub>
