# CLAUDE.md - Plynos.dev Codebase Rules

## Project identity
Plynos.dev is a premium, fast website-development landing page and internal admin system. The public site sells custom 24-hour websites. The admin side tracks leads, niche experiments, campaigns, deals, and content.

## Non-negotiables
- Do not show prices publicly.
- Do not describe the offer as templates.
- Do not add public navigation to `/admin`.
- Never expose Supabase service-role keys in browser code.
- Use Supabase Auth and RLS for admin data.
- Keep the codebase simple enough to maintain quickly.

## Preferred stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth + Postgres + RLS
- shadcn/ui style primitives where useful
- Lucide React icons
- Vercel-compatible deployment

## Design tokens
- `--plynos-blue: #0B5FFF`
- `--plynos-navy: #0B1220`
- `--plynos-slate: #5B6472`
- `--plynos-soft-blue: #EAF2FF`
- `--plynos-white: #FFFFFF`
- `--plynos-teal: #14B8A6`

## Writing style
Use clear direct copy. Prefer:
- “A custom website for your business, built in 24 hours.”
- “No template feel. No agency delay. Clean handover.”
Avoid:
- “Digital transformation solutions”
- “We leverage cutting-edge technology”
- “Affordable websites for everyone”

## Architecture expectations
- Components in `components/`
- Admin-specific components in `components/admin/`
- Supabase clients in `lib/supabase/`
- Database types in `types/database.ts`
- Server actions/API routes must validate input.
- Keep lead form validation explicit and user-friendly.
- Build dashboard metrics from real database queries.

## Security checklist
- RLS enabled on all public schema tables.
- Admin role checked server-side.
- Inputs validated and sanitized.
- Rate-limit or bot-protect lead form when practical.
- Store unsubscribes and never send outreach to suppressed contacts.
- No secrets committed.

## Definition of done
- `npm run lint` passes.
- `npm run build` passes.
- Public landing page is fully responsive.
- Lead form writes to Supabase.
- Admin route requires login.
- Admin dashboard surfaces useful metrics.
- README explains setup, env vars, Supabase migration, and deployment.
