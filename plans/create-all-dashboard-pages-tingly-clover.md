# UPDATE — Sidebar Nav, Production Polish & Design System Docs

## Context (this phase)
The dashboard suite is built and working. The user now wants three things:
1. **Move module navigation from the top bar into a left sidebar** following standard B2B sidebar patterns — collapsible to an icon rail (toggle), off-canvas on mobile, with a **slim top bar retained** for org switcher / search / help / avatar + contextual page actions.
2. **Production polish** — remove "AI design pattern" tells and make the UI feel shipped, not generated.
3. **New page: Brand Guidelines & Design System documentation** in a clean **bento grid** — colors, type scale, icon style, corner radius, spacing, shadows, components.

### Decisions
- Sidebar uses the existing **design-system primitive** `src/app/components/ui/sidebar.tsx` (`SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarGroup`, `SidebarMenu/Item/Button`, `SidebarTrigger`, `SidebarInset`, `SidebarRail`) — it already supports collapsible `icon` mode, mobile `Sheet`, cookie persistence, and `⌘/Ctrl+B`. Do **not** hand-roll a sidebar.
- **KPI cards (assumption, flip if desired):** keep a subtle **monochrome** leading icon for scannability, **remove the invented up/down trend pills** (fabricated deltas on mock data are the clearest AI tell). The `KpiTrend`/`TrendPill` code and all `trend={...}` props get removed.

### "AI design pattern" tells to remove (production polish checklist)
- `backdrop-blur` translucent header (`AppShell` top bar) → solid `bg-card`.
- Tinted `bg-secondary` icon chips behind every KPI icon → flat monochrome icon (`text-neutral-400/500`), no colored chip.
- Invented colored trend pills with made-up percentages → removed.
- Over-rounded `rounded-full` pills on filter chips / badges → consistent `rounded-md` to match enterprise density (keep `rounded-full` only for avatar & status dots).
- Decorative gradient on KPI/empty states; keep ONLY the subtle area-chart fills in `charts.tsx` (they match the source mockups).
- Generic `EmptyState` "Inbox in a circle" → plain, quieter empty text (less templated).
- Brand mark: drop the generic `Activity`-in-a-pink-square logo cliché in favor of the wordmark used in the source ("ACME DPC / Your Logo Here"), placed in the sidebar header.

## Approach (this phase)

### 1. Layout refactor → sidebar + slim top bar
- **New `src/app/components/layout/AppSidebar.tsx`**: wraps `Sidebar collapsible="icon"`.
  - `SidebarHeader`: brand wordmark (collapses to monogram in icon mode).
  - `SidebarContent`: a `SidebarGroup` "Analytics" listing the 9 `NAV_ITEMS` (from `src/app/lib/navigation.tsx`) as `SidebarMenuButton asChild` + `NavLink`, using `isActive` for `data-active`; tooltips show labels when collapsed. Add a second group "System" containing the new **Design System** link.
  - `SidebarFooter`: the "Feedback" action + user/avatar block (replaces the floating vertical Feedback tab and the avatar from the old top bar).
- **Rewrite `src/app/components/layout/AppShell.tsx`**: `SidebarProvider` → `<AppSidebar/>` + `SidebarInset` containing a slim sticky `TopBar` (now: `SidebarTrigger`, a search input, org dropdown, help, avatar) + `<main><Outlet/></main>` + `Footer`. Remove the centered icon nav and the floating Feedback tab. Keep `max-w` content width but let the inset own scrolling.
- `src/app/lib/navigation.tsx`: add `{ key: "design-system", label: "Design System", icon: Palette, path: "/design-system" }` (kept separate so it renders in the "System" group, not "Analytics").

### 2. Production polish (component-level, propagates everywhere)
- `KpiCard.tsx`: remove `KpiTrend`/`TrendPill`/`ArrowUp/DownRight` imports & the trend branch; icon becomes flat monochrome (no `bg-secondary` chip); keep value→caption hierarchy, hover/focus for clickable cards.
- Remove every `trend={...}` prop usage across pages (Engagement `Overview.tsx`, `ClaimsUtilization.tsx`, `Marketing.tsx`, `Survey.tsx`).
- `FilterBar.tsx`: chips `rounded-md`; keep the "Filters" label + divider.
- `PageHeader.tsx`: keep dark title; tighten action buttons; ensure the "NEW" badge is restrained.
- `AppShell` top bar: solid surface, no blur.
- `EmptyState.tsx`: simpler, quieter empty state (drop the circular icon motif).
- Sweep for stray gradients in `CoordinatedCare.tsx` / `KpiCard.tsx` / `EmptyState.tsx` flagged by grep and neutralize any decorative ones.

### 3. New page — Brand Guidelines & Design System (`src/app/pages/DesignSystem.tsx`)
A documentation page rendered inside the standard `Page` scaffold (title "Design System", no filter chips), laid out as a **bento grid** (`grid-cols-12` with varied `col-span`/`row-span` tiles, each a `Panel`/`Card`). Content is driven by the **actual tokens** in `src/styles/theme.css` so the docs stay truthful:
- **Brand / intro tile** — product name, one-line design principles (clarity, density, restraint).
- **Color tiles** — swatch grids for Primary scale (`--primary`, `--chart-1..5` = the pink ramp `#fb5b87→#890037`), Neutrals, and Semantic (`--secondary`, `--accent`, `--destructive`, success). Each swatch shows token name + hex; click-to-copy nicety optional.
- **Typography tile** — the type scale actually used (display 1.85rem, h2 1.4rem, panel 0.95rem, body, caption 11px) with font name **Geist**; show weights and `--font-mono` (JetBrains Mono) sample.
- **Iconography tile** — lucide-react, 18–20px, `1.5` stroke; show a representative icon set.
- **Corner radius tile** — visual chips for `--radius` (0.7rem) and derived `sm/md/lg/xl`.
- **Spacing tile** — base unit (`--spacing` 0.25rem / 4px) shown as a 4/8/12/16/24/32 ramp.
- **Elevation/shadow tile** — `--shadow-xs/sm/md/lg` sample cards.
- **Components tile(s)** — live examples: Button variants, Badge, KPI card, table row, filter chip, tabs/toggle.
- Add route `{ path: "design-system", Component: DesignSystem }` in `src/app/routes.tsx`.

## Critical files
- New: `src/app/components/layout/AppSidebar.tsx`, `src/app/pages/DesignSystem.tsx`.
- Edit: `src/app/components/layout/AppShell.tsx` (sidebar provider + slim top bar + remove icon nav/feedback tab), `src/app/lib/navigation.tsx` (add Design System), `src/app/routes.tsx` (add route), `src/app/components/dashboard/KpiCard.tsx` (drop trends/chips), `src/app/components/layout/FilterBar.tsx`, `src/app/components/layout/PageHeader.tsx`, `src/app/components/dashboard/EmptyState.tsx`, and pages removing `trend=` props (`pages/engagement/Overview.tsx`, `pages/ClaimsUtilization.tsx`, `pages/Marketing.tsx`, `pages/Survey.tsx`).
- Reuse: `src/app/components/ui/sidebar.tsx`, `ui/input.tsx`, `ui/dropdown-menu.tsx`, `ui/avatar.tsx`, `ui/button.tsx`, `ui/badge.tsx`, `ui/card.tsx`, `ui/tabs.tsx`; existing `Panel` from `dashboard/EmptyState.tsx`.

## Verification (this phase)
- App boots, no console errors; default `/engagement` renders inside the new sidebar layout.
- Sidebar: lists all 9 analytics modules + Design System; active route highlighted; `SidebarTrigger` (and ⌘/Ctrl+B) toggles to icon rail with label tooltips; on a narrow viewport it opens as an off-canvas sheet.
- Slim top bar shows trigger, search, org dropdown, help, avatar; page action buttons still reachable.
- Polish: no `backdrop-blur` chrome, no trend pills, no tinted icon chips; filter chips `rounded-md`; quieter empty state.
- `/design-system` renders the bento grid; swatch hexes match `theme.css`; Geist + JetBrains Mono samples render; component examples are live.
- Parse-check all changed/new `.tsx` via the esbuild transform sweep used previously; expect "ALL OK".

---

# Create All Dashboard Pages — HealthCompiler / ACME DPC Analytics Suite

## Context

The user imported a Figma frame (`src/imports/Group2/index.tsx`) that is a stack of **39 raster PNG mockups** — not structured component code. These mockups depict a complete, multi-module **healthcare analytics SaaS** (branded "ACME DPC", "Powered by HealthCompiler"). The goal is to rebuild every dashboard page as real, production-quality React + Tailwind code that faithfully matches the mockups, uses the **provided theme** (pink/magenta `--primary: #e32168`), and uses **Geist** as the primary font throughout.

The imported `index.tsx` only positions the PNGs absolutely (overlapping at `top-0 left-0`); it carries no structural information. We therefore **rebuild from the visual mockups**, not from that file. The 39 images are distinct pages, sub-tabs, and states across ~8 modules.

### Design system
There is **no `@make-kits` package**. The design system in this project is the **shadcn/ui component library** at `src/app/components/ui/*` (Button, Card, Table, Tabs, Select, Badge, Input, Tooltip, DropdownMenu, Avatar, Separator, RadioGroup, etc.). All UI primitives MUST come from there. Charts use `recharts` (already installed, and `ui/chart.tsx` exists).

### Observed shared chrome (every page)
- **Top bar**: left = "ACME DPC / Your Logo Here" wordmark (pink); center = horizontal icon nav of **9 module icons** (lucide-react), active item underlined in pink; right = grid/apps icon, "ACME Health ▾" org dropdown, "?" help, circular "HS" avatar.
- **Page header row**: pink page title (sometimes with breadcrumb e.g. "Engagement and Utilization / Total # Encounters", sometimes a left toggle group like CSAT/NPS or "Total Active Patients / Patients with Encounter(s)"); right = download icon, share icon, "Generate Report" button (with green **NEW** badge), "Filters" button.
- **Filter chip bar**: pill chips — Start Date, End Date, Employer, Division, DPC, Physician, Sender, Patient Category (varies per page).
- **Footer**: AICPA-SOC2 + HIPAA badges (left), "©2025 Healthcompiler, Inc. · Privacy Policy · Terms of Service · Help" (center), "Powered by HealthCompiler" (right).
- **Right edge**: vertical black "Feedback" tab; floating circular help/widget button bottom-right.

### Module + page map (derived from the 39 mockups)
1. **Engagement & Utilization** — KPI-card grid (Active Patients, Encounters, Encounter Types Breakdown, Care Episodes, After-Hours, Prescription Orders, Messages, Digital Engagement, etc.). Drill-down detail pages with KPI summary + area chart + data table: *Total # Encounters*, *Prescription Orders*, *Prescription Orders – Breakdown* (Overall/Refills tabs), *Digital Engagement* (Overall/AfterHours tabs), *Total # After Hours*.
2. **Utilization Gaps** — full-width patient data table (Patient ID, Name, Age, Phone, Medical Condition, Spruce App, Last Encounter/Message dates, Employer, DPC, Physician) + a small "Patients with Utilization Gaps" KPI; pagination.
3. **Chronic Risk** ("Calculate Chronic Risk By") — top toggle (Total Active Patients / Patients with Encounter(s)); KPI (Chronic Condition Patients); two horizontal bar charts (Top Chronic Conditions, Chronic Condition Distribution); click-to-drill detail table.
4. **Claims Utilization** — KPI cards (Total/DPC/Non-DPC Patients, Member Months); "Claims Costs – Per Member Per Month / Total Amount" radio toggle + grouped bar chart (DPC vs Non-DPC); High Cost Claims section; includes empty "No data available" state.
5. **Claims Billing Report** — data table (Patient ID, Name, CPT Code, CPT Description, Date of Service, Rate Charged); pagination.
6. **Coordinated Care** — KPI cards (Total # of Claims, Total Amount on Claims, Coordinated Care count/amount, Cost Savings, Cost as % of Medicaid); tab bar: *Coordinated Care Categories* (bar + pie of sub-categories), *Care Coordination Savings*, *Claims Categorization* (4 bar charts), *Cost Analysis*, *Volume & Patterns*.
7. **Communication** — dense grid: inbound/outbound voice-call response-rate bar charts, hourly heat-map style tables (green intensity cells), per-team-member call tables; date/event/comm-type filters.
8. **Marketing** — KPI cards (SEO Performance, Email Campaign Overview, Google Analytics Summary, Google Search Console); SEO Performance keyword table with grouped "Google Rank" (Apr/May/Jun) columns + sparkline "Rank Analysis" column.
9. **Survey** — top CSAT/NPS toggle; tabs: *Recent Encounters*, *Survey Sent*, *Completed Surveys*, *Survey Dashboard* (KPI cards CSAT score/Satisfied %/Response Rate/Needs Improvement, CSAT Distribution bar chart, CSAT Score Trend line chart, Top Physicians + Top Employers tables).

## Approach

Build a routed React app where shared chrome lives in a layout and each module/page is a route. Use shadcn/ui primitives + recharts. Seed realistic healthcare mock data (the screenshots contain real-looking values/names we transcribe where legible). Filters, tabs, toggles, and pagination are wired to be interactive on the mock data; the date/employer/physician filter chips render as functional dropdowns (UI) but need not actually re-query.

### 1. Foundation
- **Theme**: Replace `src/styles/theme.css` contents with the **provided** theme.css (pink palette, Geist `--font-sans`, radius `0.7rem`, shadow tokens). Keep the `@theme inline` token mapping so Tailwind utilities (`bg-primary`, `text-primary`, `border-border`, etc.) resolve. Confirm `globals.css`/`index.css` still import it.
- **Font**: Add Geist import to the **top** of `src/styles/fonts.css` only (e.g. Fontsource/Google `@import` for Geist), so `--font-sans: Geist` resolves app-wide. Ensure body uses `font-sans`.
- **Routing**: Use `react-router` (v7, installed). Define routes under a shared layout. Default route → Engagement & Utilization dashboard.

### 2. Shared layout & components (`src/app/components/`)
- `layout/AppShell.tsx` — top bar + center icon nav + footer + side Feedback tab + `<Outlet/>`. Icon nav from a config array `[{ key, label, icon, path }]` (9 modules) using lucide-react icons; active state from current route.
- `layout/PageHeader.tsx` — title/breadcrumb (left), optional toggle/tab slot, action buttons (download, share, Generate Report + NEW badge, Filters) via `ui/button`, `ui/badge`.
- `layout/FilterBar.tsx` — configurable array of filter chips rendered with `ui/select`/`ui/dropdown-menu` (Start/End Date, Employer, Division, DPC, Physician, Sender, Patient Category).
- `dashboard/KpiCard.tsx` — `ui/card` based metric card (title + info `ⓘ` tooltip, big value, sub-values, optional split metrics, "No data available" empty state).
- `dashboard/DataTable.tsx` — generic table on `ui/table` with column config, optional cell renderers (links, badges, sparklines, heat-map cells), and a `ui/pagination`-style footer ("Showing X to Y of Z", records-per-page select, page buttons, Jump to).
- `dashboard/charts/` — thin recharts wrappers themed with chart tokens: `HorizontalBar`, `GroupedBar`, `AreaTrend`, `LineTrend`, `PieBreakdown`, `Sparkline`.
- `dashboard/EmptyState.tsx` — centered "No data available".

### 3. Mock data (`src/app/data/`)
- One file per module exporting typed mock datasets (patients, encounters, claims, CPT rows, chronic conditions, survey responses, SEO keywords, communication grids, chart series). Transcribe legible real-looking values from the mockups; generate the rest consistently. Provide shared option lists (employers, DPCs, physicians) for filter dropdowns and table columns.

### 4. Pages (`src/app/pages/<module>/`)
Compose each page from the shared components above:
- `engagement/` — `Overview.tsx` (KPI grid) + drill-downs `Encounters.tsx`, `PrescriptionOrders.tsx`, `PrescriptionBreakdown.tsx`, `DigitalEngagement.tsx`, `AfterHours.tsx`.
- `utilization-gaps/Index.tsx`
- `chronic-risk/Index.tsx` (toggle + 2 bar charts + drill table)
- `claims/Utilization.tsx`, `claims/BillingReport.tsx`
- `coordinated-care/Index.tsx` (with internal `Tabs` for the 5 sub-tabs)
- `communication/Index.tsx`
- `marketing/Index.tsx`
- `survey/Index.tsx` (CSAT/NPS toggle + 4 sub-tabs incl. Survey Dashboard).

### 5. Assembly
- `src/app/App.tsx` (default export) renders `<BrowserRouter>` (or `createBrowserRouter`) with `AppShell` layout wrapping the module routes. KPI cards on the Engagement overview link to their drill-down routes; "back" breadcrumbs return to the module.

## Critical files
- `src/styles/theme.css` (replace with provided), `src/styles/fonts.css` (add Geist import at top).
- `src/app/App.tsx` (router + layout assembly; default export).
- New: `src/app/components/layout/*`, `src/app/components/dashboard/*`, `src/app/data/*`, `src/app/pages/**`.
- Reuse existing `src/app/components/ui/*` (button, card, table, tabs, select, badge, dropdown-menu, tooltip, avatar, separator, radio-group, input, pagination, chart) — do **not** recreate these.

## Notes / constraints
- Do **not** render the imported PNGs in the app; they are references only. Do not edit `src/imports/Group2/index.tsx`.
- Use lucide-react for all icons, recharts for all charts (chart colors from `--chart-1..5`).
- No font-size/weight/line-height Tailwind utilities unless matching a clearly different mockup size; rely on `theme.css` heading styles.
- Responsive: grids collapse on narrow widths; tables scroll horizontally. The mockups are desktop-first (1920px), so default to a wide desktop layout.
- Given the volume, implement in module order (Engagement first, as the default landing), verifying the shell + shared components render before fanning out to remaining modules.

## Verification
- App boots with no console errors; default route shows the Engagement & Utilization KPI dashboard with correct pink theme and Geist font.
- Click each of the 9 nav icons → correct module page loads with shared chrome (header, filter bar, footer, Feedback tab) and active-nav highlighting.
- Tabs (Coordinated Care, Survey), toggles (Chronic Risk, Claims PMPM/Total, CSAT/NPS, Prescription Overall/Refills) switch content.
- Tables paginate and the records-per-page select changes page size; KPI drill-down links navigate and breadcrumb returns.
- Empty-state ("No data available") renders on the Claims Utilization variant.
- Spot-check against mockups: KPI labels/values, table columns, chart types, and footer/badges match.
