# PROMPT.md - Plynos.dev Initial Build Prompt

You are Claude Code working inside Visual Studio Code. Build `plynos.dev`, a modern productized website-development landing page with a protected admin backend.

## Business context
Plynos is a simple, premium, fast website studio operated by Harry Davies. The offer is custom, no-template, fully functional websites delivered within 24 hours after the client provides the required information. Do not show pricing publicly. Internal target AOV is EUR 600. The model is sell -> build -> hand over -> exit; no implied hosting/maintenance management.

## Design direction
- Primary colours: #0B5FFF blue, #FFFFFF white, #0B1220 navy, #5B6472 slate, #EAF2FF soft blue.
- Feel: Apple-like white space, modern forward, premium, minimal, not generic agency.
- Similar spirit to the Tinstra landing page style, but without AI marketplace messaging.
- Typography: Inter/Geist/system stack. Use large confident headlines, spacious layouts, clean cards, subtle borders.
- Avoid generic agency clichés: “digital solutions”, stock blob graphics, overused gradients, cheap template language.

## Public landing page requirements
Create a high-converting sales-first landing page for `plynos.dev`.

Sections:
1. Hero
   - Headline around: “A custom website for your business, built in 24 hours.”
   - Subheadline: no templates, no agency delay, clean handover.
   - CTA: “Request a 24-hour website”
   - Secondary CTA: “See how it works”
   - Do not disclose pricing.
2. Trust/positioning strip
   - “Built by Harry Davies”
   - “Custom front-end”
   - “Client-owned handover”
   - “No hidden retainer”
3. Problem section
   - Outdated/missing websites lose trust, make calls harder, and slow down referrals.
4. Offer section
   - Website structure, copy layout, responsive design, contact form, basic SEO metadata, launch/handover.
5. Process section
   - Send details -> build -> review -> launch/handover.
6. Sample work / concept portfolio
   - Use placeholder/sample concept cards until real client work exists. Label clearly as sample concepts.
7. Ownership section
   - Client owns domain, hosting, and assets. Plynos advises but does not lock clients into management.
8. FAQ
   - 24-hour clock starts after required content/payment.
   - One revision round.
   - Hosting/domain recommended but not managed by default.
   - Complex apps/e-commerce are separate quotes.
9. Blog/news teaser
   - Three starter article cards.
10. Final CTA
   - Short lead form.

## Lead form fields
- Name
- Email
- Company name
- Current website URL, optional
- Business type / niche
- What do you need the website to achieve?
- Desired deadline
- Consent checkbox for being contacted about the request

## Admin backend
Route: `/admin` must not be linked from public navigation. If typed manually, it shows a login page.

Security requirements:
- Do not rely on hidden URL security. Protect admin with Supabase Auth and server-side checks.
- Use Supabase Row Level Security on all tables.
- Never expose service-role keys in client code.
- Use environment variables.
- Add middleware/server checks so unauthenticated users cannot access dashboard routes.

Admin modules:
1. Dashboard
   - Today/7-day/30-day leads
   - Conversion rate
   - Leads by niche
   - Campaign reply rate
   - Calls booked
   - Proposals sent
   - Closed deals and AOV
2. Leads CRM
   - CRUD leads
   - status: new, contacted, replied, call_booked, proposal_sent, won, lost, unsubscribed
   - source: website, resend, fiverr, referral, cold_call, whatsapp, other
3. Niche experiments
   - Niche name, hypothesis, start date, end date, score, decision: testing/narrow/kill/keep
4. Campaigns
   - Track outbound campaigns and variants
   - sent, replies, bounces, unsubscribes, booked_calls, wins
5. Content manager
   - blog/news posts
   - portfolio/sample concept items
   - testimonials
6. Deal/build tracker
   - payment status, required assets received, build started, review sent, launched, handover complete
7. Suppression list
   - unsubscribed emails/domains and reason

## Suggested routes
- `/` public landing page
- `/privacy` privacy policy
- `/legal` legal notice / terms
- `/cookies` cookie policy
- `/admin` login redirect/dashboard gate
- `/admin/login`
- `/admin/dashboard`
- `/admin/leads`
- `/admin/niches`
- `/admin/campaigns`
- `/admin/content`
- `/admin/deals`
- `/api/leads`
- `/api/unsubscribe`

## Supabase schema draft
Create migrations for:
- profiles(id uuid primary key references auth.users, email text, role text default 'admin')
- leads(id uuid, created_at timestamptz, name text, email text, company text, website_url text, niche text, goal text, deadline text, source text, status text, notes text)
- niches(id uuid, created_at timestamptz, name text, hypothesis text, status text, score int, start_date date, end_date date, decision_notes text)
- campaigns(id uuid, created_at timestamptz, name text, niche_id uuid, channel text, subject text, variant text, sent int, replies int, bounces int, unsubscribes int, booked_calls int, wins int)
- touchpoints(id uuid, created_at timestamptz, lead_id uuid, channel text, direction text, summary text, next_action_at timestamptz)
- deals(id uuid, created_at timestamptz, lead_id uuid, value_eur numeric, status text, payment_status text, assets_received boolean, deadline timestamptz, final_url text)
- content_posts(id uuid, created_at timestamptz, type text, title text, slug text, excerpt text, body text, published boolean)
- unsubscribes(id uuid, created_at timestamptz, email text unique, source text, reason text)

## Acceptance criteria
- Landing page looks premium and conversion-focused.
- No public pricing shown.
- `/admin` is protected.
- Supabase integration is clean, typed, and uses RLS.
- Lead form stores submissions and shows a clean success state.
- Admin dashboard has real tables and useful metrics, not placeholder-only UI.
- Code is clean, modular, responsive, accessible, and production-ready.
- Include a README with setup instructions and environment variables.
