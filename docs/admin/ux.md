# UX rules

These are the concrete conventions every admin component follows. If you're adding a new admin component or page, this document is the spec.

## Typography

- Page titles (`<h1>` of an admin page): `text-2xl md:text-3xl font-semibold tracking-tightish text-plynos-navy dark:text-white`.
- Section titles (within a page): `text-base md:text-lg font-semibold text-plynos-navy dark:text-white`.
- Stat numbers: `text-2xl md:text-3xl font-semibold tracking-tightish text-plynos-navy dark:text-white`.
- Stat labels above the number: `text-xs font-medium text-plynos-slate dark:text-white/60`. **Never uppercase.**
- Body / row text: `text-sm text-plynos-navy dark:text-white`.
- Secondary row text (timestamps, secondary fields): `text-sm text-plynos-slate dark:text-white/60`.
- Muted hints (helper text, table footnotes): `text-xs text-plynos-slate dark:text-white/50`.

## Colour usage

- Primary text: `text-plynos-navy dark:text-white`.
- Secondary text: `text-plynos-slate dark:text-white/60`.
- Borders / dividers: `border-plynos-navy/10 dark:border-white/10`.
- Primary action button: navy in light mode, white in dark mode (the existing `.btn-primary` already does this). Reserved for the most important affordance per page (e.g. "Add lead").
- Blue (`text-plynos-blue` / `dark:text-plynos-soft`) only on inline links and active-state highlights.
- Teal only for positive deltas in metrics ("+12% week on week"). Red for negative deltas. Default to slate for neutral.

## No icons in chrome

- Sidebar nav: text labels only. No `lucide-react` icons next to the module names.
- Page headers: no icon next to the page title.
- Permitted icons: status dots in pill chips, the chevron in a dropdown trigger, a search glass inside a search input, an `X` to close a panel, a loader spinner. Anything else needs to earn its place.

## Buttons

- **Primary** (`.btn-primary`): one per visible region. "Add lead", "Send campaign", "New opportunity".
- **Secondary** (`.btn-secondary`): for less-prominent actions sitting next to the primary.
- **Ghost / text**: for tertiary actions. Use a plain `<button>` with `text-sm font-medium text-plynos-slate hover:text-plynos-navy dark:text-white/70 dark:hover:text-white`.
- **Destructive**: same shape as ghost but `hover:text-red-600 dark:hover:text-red-400`.
- **Inline-row actions** (e.g. "Delete" on a row): use the ghost/text style. Don't render `<Trash2>` icons.

## Tables

- One table = one wrapper with `rounded-2xl border border-plynos-navy/10 dark:border-white/10` and `overflow-hidden overflow-x-auto`.
- Header row: `bg-plynos-soft/40 dark:bg-white/5 text-xs font-medium text-plynos-slate dark:text-white/60`. **Sentence case headers.**
- Body rows: separated by `border-t border-plynos-navy/10 dark:border-white/10`.
- Numeric columns: right-align.
- Date columns: `whitespace-nowrap` and use `formatDateTime` from `lib/utils.ts`.
- Empty state: a single centered row spanning all columns, slate text, with a one-line description and a primary CTA underneath.
- Long text columns get `max-w-[XXch] truncate` with `title=` set to the full value.
- Row hover: `hover:bg-plynos-soft/20 dark:hover:bg-white/5` (subtle).

## Forms (in admin)

- Same `.input-field` and `.label-field` classes as the public site so font-size, padding and dark-mode all match.
- Labels in sentence case ("Email address", not "EMAIL ADDRESS").
- Required-field marker: a small blue asterisk after the label, only when the field is genuinely required.
- Errors: red text under the field. Top-of-form error only when the failure isn't field-specific.

## Page header pattern

Every admin page starts with the same `PageHeader` component:

- Left: title (`<h1>`) and one-line description (`<p>`).
- Right: zero or one primary action button.
- Below the header: a thin border separator (`border-b border-plynos-navy/10 dark:border-white/10 pb-6`).

## Filter bar pattern (Phase 2+)

When tables get filters, they sit between the page header and the table:

- Left: a single search input (icon-free placeholder text "Search leads…").
- Centre: filter chips (status, source, date range). Each chip is a small button that pops a tiny picker on click.
- Right: a "Reset" link in slate text when any filter is active.

## Detail pages (Phase 3+)

Clicking into a row from a list takes you to `/admin/<module>/<id>` with:

- Header: record name + status badge + back link to the list.
- Two-column layout on desktop:
  - Main column (60%): editable fields, notes, related records.
  - Side column (40%): activity timeline (newest first), tags, assignment.
- All edits inline; save on blur. No "Edit / Save / Cancel" modal flow.

## Loading and empty states

- Skeleton rows for table loading (`animate-pulse` slate blocks).
- Empty state: pictureless. Just text — what should be here, and the action that gets it there.

## Dark mode

Every admin surface must work in both light and dark. Default to navy text on white in light, white text on navy in dark. Borders flip from `plynos-navy/10` to `white/10`.

## What we explicitly avoid

- Cards with heavy shadows. We use hairline borders.
- Coloured section backgrounds (apart from `bg-plynos-soft` for hover/highlight).
- Avatars / profile pictures (single-operator tool — no need for them yet).
- Decorative illustrations.
- Toasts that auto-dismiss. If something matters, it stays visible until acknowledged or scrolled past.
- Clever animations beyond the existing `Drift` parallax (which doesn't apply to admin anyway).
