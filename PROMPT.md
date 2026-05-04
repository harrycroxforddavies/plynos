# PROMPT — Client onboarding survey

Build a client-onboarding feature for plynos.dev. Each opportunity (the admin's "client" record) gets a unique, shareable onboarding link. The client opens it, fills in a short survey, uploads any photos or files they want on the site, and submits. The admin sees the answers and uploaded files inline on that opportunity's detail panel.

Read [CLAUDE.md](CLAUDE.md) and [docs/admin/](docs/admin/) before starting. Follow every non-negotiable in CLAUDE.md (no prices, no "24 hours" claim, no em/en-dashes in new copy, no service-role key in client code, EN+ES on every public-facing string, sentence case, no `lucide-react` icons in admin nav labels, hairline borders in admin tables/tiles).

---

## 1. Data model

Add migration `supabase/migrations/0004_client_onboarding.sql` containing:

- Table `client_onboarding`:
  - `id uuid primary key default gen_random_uuid()`
  - `opportunity_id uuid not null references opportunities(id) on delete cascade`
  - `token text not null unique` (URL-safe random, 32+ chars; generated server-side)
  - `created_at timestamptz not null default now()`
  - `submitted_at timestamptz` (null until the client submits)
  - `business_name text`
  - `tagline text` (one-line description of what they do)
  - `about text` (a few sentences about the business)
  - `services jsonb` (array of `{ title, description }`)
  - `target_audience text`
  - `tone text` (e.g. friendly, professional, bold — free text)
  - `brand_colors text` (free text; hex values or descriptive)
  - `existing_logo_url text` (Supabase Storage path; nullable)
  - `existing_website text`
  - `social_links jsonb` (object: instagram, facebook, tiktok, linkedin, x, youtube — all optional)
  - `contact_email text`
  - `contact_phone text`
  - `business_address text`
  - `opening_hours text`
  - `pages_wanted jsonb` (array of strings: home, about, services, contact, gallery, etc.)
  - `inspiration_links text` (free text, one URL per line)
  - `extra_notes text`
  - Unique constraint: one `client_onboarding` row per `opportunity_id` (use `unique (opportunity_id)`).
- RLS:
  - Enable RLS.
  - Admin policy: `is_admin()` for select/insert/update/delete (mirror the existing admin tables).
  - **No** anon select policy on the table itself. The public submit flow goes through a server route that uses the service-role client and validates the token, so RLS does not need to allow anon reads.
- Supabase Storage bucket: `onboarding` (private). Files are stored under `onboarding/<token>/<filename>`. Server route is the only thing that writes; reads happen server-side and admin-side via signed URLs. No public bucket policy.
- Add a `file_uploads` JSON column on `client_onboarding` of shape `[{ path, original_name, content_type, size_bytes }]` for the list of uploaded objects, OR a separate `client_onboarding_files` table — pick the simpler one (single JSON column is fine here; there is no need for per-file metadata queries).

Add the matching TypeScript type to [types/database.ts](types/database.ts) (`ClientOnboarding`) and register it in the `Database` interface.

---

## 2. Public onboarding page

Route: `/onboarding/[token]`. Server component. Treat it like a public page — fully bilingual (EN/ES via `getLang()` and `lib/i18n/translations.ts`), uses the same Plus Jakarta Sans font, the same `--plynos-*` tokens, and matches the look of [app/page.tsx](app/page.tsx) (light surface, navy headlines, blue accents, hairline borders, subtle shadows only where the landing already uses them).

Behavior:
- On load, the server resolves the token → `client_onboarding` row + parent opportunity + linked lead. If the token is unknown, render a quiet "This link is no longer active" message with a link back to the home page (translated).
- If `submitted_at` is set, render a "Thanks, we have what we need" confirmation instead of the form (translated).
- Otherwise render the form.

Layout:
- Reuse `SiteHeader` and `SiteFooter` so the page feels native to the site.
- Hero band at the top: small pill ("Onboarding" / "Onboarding"), headline ("Tell us about your business." / "Cuéntanos sobre tu negocio."), one-sentence subhead explaining this takes ~5 minutes and helps us build the site.
- Form card below: white surface, `rounded-2xl`, hairline border `border-plynos-navy/10`, generous padding. Inputs styled to match `ContactForm` ([components/site/ContactForm.tsx](components/site/ContactForm.tsx)) — same focus ring, same label sizing, same error treatment.
- Group the form into short sections with small navy headings:
  1. **About your business** — business name, tagline, about, target audience.
  2. **What you offer** — services (repeater, up to 6 rows of `{ title, description }`; "Add another" button; remove button on each row).
  3. **Look and feel** — tone, brand colors, existing logo upload (single file), inspiration links (textarea).
  4. **Pages you want** — checkbox group: Home, About, Services, Gallery, Contact, Blog, plus a free-text "Other" field.
  5. **Contact details** — contact email, phone, business address, opening hours, social links (six labelled inputs, all optional).
  6. **Files and photos** — multi-file upload (images and PDFs), drag-and-drop area styled like the rest of the form, with a list of selected files and remove buttons.
  7. **Anything else** — free-text textarea.
- Big primary submit button at the bottom matching the landing-page CTA ("Send onboarding" / "Enviar").

Form mechanics:
- Client component for the form (because of file uploads and the services repeater); server component for the page wrapper.
- Submit goes to `POST /api/onboarding/[token]` (Node runtime).
- Validate with Zod. All fields except `business_name`, `tagline`, `about`, `contact_email` are optional — keep validation light so the client never gets stuck.
- File upload constraints: max 10 files, max 20 MB each, allow `image/*`, `application/pdf`. Reject anything else with a friendly inline error.
- Honeypot field, per-IP rate limiting via `lib/rate-limit.ts` (mirror `/api/leads`).
- The route uses the service-role client to:
  1. Look up the row by token. 404 if missing.
  2. Refuse if `submitted_at` is already set (return a 409 with a translated message).
  3. Upload files to the `onboarding` bucket under `onboarding/<token>/<uuid>-<safe-original-name>`.
  4. Update the row with all answers + `file_uploads` + `submitted_at = now()`.
- After success, redirect the client to `/onboarding/[token]` (which then renders the thank-you state).

Translations: add a new `onboarding` block to the `UI` shape in [lib/i18n/translations.ts](lib/i18n/translations.ts) covering every label, placeholder, helper line, error, and success message. Both `en` and `es` must be filled.

Copy guidance:
- Short and direct. No marketing fluff.
- Sentence case throughout. No all-caps.
- No em-dashes (`—`) or en-dashes (`–`); use a period or comma.
- Examples of question framing:
  - "What's the name of your business?"
  - "In one line, what do you do?"
  - "Tell us a bit about the business. A few sentences is enough."
  - "Who's your typical customer?"
  - "What services should we list? Add as many as you want."
  - "What feel are you after? E.g. friendly, professional, premium."
  - "Got brand colors? Hex codes or just describe them."
  - "Any sites you like the look of? One per line."
  - "What pages should the site have?"
  - "Anything else we should know?"

`robots.ts`: add `/onboarding` to the disallow list so onboarding URLs are never indexed.

---

## 3. Admin: opportunity panel changes

Edit [components/admin/opportunities/OpportunityDetailPanel.tsx](components/admin/opportunities/OpportunityDetailPanel.tsx) to add an **Onboarding** section. Keep it consistent with the rest of the panel (same `Field`/`DetailList` patterns, hairline dividers, no shadows, no icons next to the section heading).

Two states:

**State A — no link generated yet** (no `client_onboarding` row exists for this opportunity):
- A single primary button labelled "Generate onboarding link". On click, call a server action `createOnboardingLink(opportunityId)` that:
  - Inserts a `client_onboarding` row with a fresh token.
  - Returns the row.
- After it returns, switch to state B without reloading.

**State B — link exists**:
- Show the public URL: `https://plynos.dev/onboarding/<token>` (use `NEXT_PUBLIC_SITE_URL`).
- "Copy link" button (writes to clipboard, brief inline confirmation).
- Status pill: "Awaiting submission" (slate) or "Submitted <relative time>" (teal accent), matching the existing tile styling.
- "Regenerate link" button (slate, secondary) — invalidates the old token by replacing it. Use sparingly, confirm with a small inline `Are you sure?` toggle, not a `window.confirm`.
- If `submitted_at` is set, render every answer below in a clean read-only layout:
  - Sectioned exactly like the public form (About, Services, Look and feel, Pages, Contact, Files, Notes).
  - Use the same `Field` component already in this file for label styling.
  - Services render as a small list.
  - File uploads render as a list of links. Each link goes through a server action that returns a short-lived signed URL from the storage bucket (don't expose raw paths, don't make the bucket public).
  - Empty fields show "-" not blank.

Server actions for the admin live in `app/admin/(protected)/opportunities/actions.ts` alongside the existing ones. Add:
- `createOnboardingLink(opportunityId)`
- `regenerateOnboardingLink(opportunityId)`
- `getOnboardingFileUrl(opportunityId, path)` (returns signed URL)

`OpportunitiesPage` (server) needs to also fetch the `client_onboarding` row for each opportunity (or fetch lazily when the detail panel opens — pick the simpler option that doesn't slow the table render; lazy-fetch on panel open is fine and probably better).

---

## 4. Email (optional, only if Resend is configured)

When a client submits the onboarding form, fire `sendOnboardingNotification` in [lib/mailer.ts](lib/mailer.ts) (new function modelled on `sendLeadNotification`). Same minimal HTML, sentence case, `Reply-To` set to the client's contact email if they provided one. If Resend isn't configured, no-op quietly. This is nice-to-have — if it adds noise, leave it for a follow-up.

---

## 5. Security checklist (must all be true at the end)

- Service-role key never imported into a `"use client"` file.
- `/onboarding/[token]` page never renders the token as a hidden form value alongside service-role usage on the client; submission goes through `/api/onboarding/[token]` which is server-only.
- `onboarding` storage bucket is private; admin reads happen via short-lived signed URLs only.
- RLS on `client_onboarding` admin-only; no anon policies.
- `/api/onboarding/[token]` validates with Zod, rate-limits per IP, runs on Node runtime.
- Honeypot on the public form.
- Files validated by MIME and size on both the client (UX) and server (truth).
- `robots.ts` disallows `/onboarding`.

---

## 6. Definition of done

- `npm run lint` passes.
- `npm run build` passes.
- Public onboarding page is fully responsive and matches the landing-page design language.
- Both EN and ES translations are present for every visible string on the public page.
- Admin opportunity panel shows the Generate / Copy / Regenerate flow and the read-only submitted answers + file links.
- Migration `0004_client_onboarding.sql` runs cleanly in a fresh Supabase project.
- No new public navigation links to `/onboarding` (it is link-only via the token).
- README updated with a short "Client onboarding" subsection explaining the flow and the new bucket.

## 7. Out of scope

- No public listing or index of onboarding links.
- No editing of submitted onboarding answers from the admin (read-only is fine for v1).
- No client login. The token is the auth.
- No reminder emails / nudges. Just the link.
