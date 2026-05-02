# Vision

## What "data master" means here

Not a dashboard with charts. A **command surface** for one operator running a real services business — Harry — who will track every lead, every conversation, every campaign send, every active build, every won deal, in one place. The admin must:

- Show **a lot of data** at a glance without feeling crowded.
- Let you **act on records inline** (status changes, notes, follow-ups) without leaving the page.
- Surface **what needs attention now** — stale leads, overdue calls, deals missing assets, unsent campaigns — above passive metrics.
- Hold its own as the volume grows from 10 leads/month to 1,000.
- Be navigable by keyboard (eventually with a Cmd+K palette).

## Brand language carried from the landing page

- **Plus Jakarta Sans** at every weight we already use (400/500/600/700/800).
- **Palette**: navy (`#0B1220`) for primary text and surfaces; slate (`#5B6472`) for secondary; soft-blue (`#EAF2FF`) for highlight backgrounds; blue (`#0B5FFF`) only for clickable accents and primary actions; teal (`#14B8A6`) used sparingly for positive deltas.
- **No emoji or decorative icons.** Text labels everywhere. The only acceptable icons are functional UI ones — chevrons, status dots, search glass — and even those should be sparing.
- **No all-caps, no em-dashes.** Sentence case. Always.
- **Hairlines, not boxes.** Tables and sections are separated by 1-px navy/10 borders rather than card containers with shadows.
- **Generous whitespace.** Density of *information* doesn't require density of *layout*.

## Reference brands

When in doubt, the order of inspiration is roughly:

1. **Linear** — pure efficiency, sentence-case, hairline tables, fast keyboard nav, dark-first but light-clean.
2. **Attio** — CRM done as a relational data tool. Records have detail pages with timelines and connected entities.
3. **Pylon** — formal support tool, ticket-list density.
4. **Hex** — analytical surfaces with lots of small numbers.
5. **Stripe Dashboard** — varied section rhythm without ever feeling marketing-y.

Avoid: Notion (too playful), Trello (too card-heavy), HubSpot (too marketing-y), Salesforce Lightning (too dense and ugly).

## Why no icons in the sidebar

Each module name carries the meaning. An icon adjacent to "Leads" or "Opportunities" adds visual noise and saves no comprehension time for an operator who knows their own data. Compare:

- Linear's left rail: text labels only ("Inbox", "My issues", "Active", "Backlog", "Triage").
- Vercel dashboard sidebar: text labels with project/env badges, no glyphs in nav.
- The Plynos landing-page header: no icons, just text + a CTA.

The admin should match.

## What "satisfying to use" means

- Hitting return on a search refines results immediately, no spinner flash.
- Clicking a status pill in a row reveals the dropdown without a modal.
- Adding a lead is one keystroke (Cmd+N) away from anywhere.
- A new lead lands in the table without a page refresh.
- Errors appear inline next to the field, not in a toast you have to dismiss.
- Empty states explain what should be there and offer the next action ("No leads yet. Send a campaign or share your contact link.").

These are aspirations for the multi-phase plan, not a v1 promise.
