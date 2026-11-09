# Design: Route SNU IE v7

**Date:** 2026-11-09 · **Status:** shipped (user-confirmed mock round, 2026-11-08 → 11-09)
**Replaces:** "Quiet Registrar" (2026-07-20). That system's 8px panel / pill-only radius rule,
generated palette ramp, and spacing-token law no longer apply.
**Source of truth in code:** `css/site.css` (all pages) · `css/liberal-arts.css` (교양 page only).
Approved mocks: `.design-foundations/mocks/v7/` (screenshots in `screenshots/`).

> Scope: this file is the visual law. Product context lives in PRODUCT.md, page structure in
> JOURNEY.md, analytics in ANALYTICS.md.

---

## Direction

The familiar Korean service-guide layout (흔한 정석), finished to Toss's level: white field, grey
filled cards, one working blue, big confident headings, and nothing decorative. Students already
know how to read this layout, so the design gets out of the way of cohort-specific facts.

Two rules govern every change:

1. **Cut padding, never information.** Remove English eyebrows, hype, captions that repeat the
   title, and "← 홈으로" back links. Keep every sentence that tells a student something. Rules
   pages keep their full detail; course filters must never lose a capability.
2. **Voice is 담백.** No slogans, no "한 번에/한눈에", no rhetorical questions. The home H1 is
   "Route SNU IE".

## Page frame (every page)

- **Top bar** `.bar` — sticky, solid `#fff`, 64px tall, 1px `--gray-100` bottom rule. Brand mark
  (30px blue tile, 9px radius) + "Route SNU IE", then the 5-item nav, then "문의·제보" (Google Form)
  pushed right. The current page's nav item is blue via `aria-current="page"`.
  The floating feedback button is retired; the bar link replaces it.
- **Content column** — `width: min(1200px, calc(100% - 48px))`. The roadmap page adds
  `body.wide` and widens bar + footer to 1500px.
- **Footer** `.foot` — the unofficial disclaimer + official-site link. Pages that load
  `courses-data.js` (home, courses) append "(자료 확인 <date>)" through `data-source-date`.
- **Breakpoints:** 1100px (3→2 card columns), 900px (bar wraps; nav scrolls horizontally; H1
  34px; most 2-column layouts collapse), 640px (1 column).

## Color

Flat fills only. No gradients, no dark mode (not designed yet).

| Token | Value | Use |
|---|---|---|
| `--bg` | `#ffffff` | page field, card fill for course cards |
| `--gray-50` | `#f9fafb` | emphasis panels, hover on outlined chips |
| `--gray-100` | `#f2f4f6` | filled cards, chips, search field, hairlines |
| `--gray-200` | `#e5e8eb` | card hover, borders on white cards, outlined chips |
| `--gray-300` | `#d1d6db` | stronger rules (table heads) |
| `--gray-600` | `#6b7684` | tertiary text **on white only** (4.62:1) |
| `--gray-700` | `#4e5968` | secondary text, body copy on grey (6.45:1 on gray-100) |
| `--ink` | `#191f28` | headings and primary text (16.6:1) |
| `--blue` | `#0a5fd6` | the one accent: links, selected state, current nav, credit figures |
| `--blue-hover` | `#0a54c0` | hover on blue fills |
| `--blue-50` | `#e8f1ff` | "next term" pill, selected-term wash (blue text on it 5.10:1) |
| `--clay` | `#b3261e` on `#fdeceb` | 전공필수 badge only (5.72:1) |
| notice | `#6b4e16` on `#fff8e6` | the PDF / cohort warning notice (7.27:1) |

Rules:
- **One blue.** It marks what is selected, current, next, or clickable. It is never a section
  background.
- `--gray-600` is not allowed as text on `--gray-100` (4.19:1). On grey surfaces use
  `--gray-700`, or put the element on white with a 1px `--gray-200` inset (the "past" style).
- White on blue is 5.80:1. Every pair above passes WCAG AA for its use.
- Pages built on the old `base.css` bodies (FAQ, 코드 가이드, 교양, 로드맵) get `body.v7p`, which
  remaps base.css tokens to these values (`--surface: #f2f4f6`, `--text: #191f28`,
  `--text-tertiary: #59636f`, `--radius-panel: 16px`…). New work uses the v7 tokens directly.

## Type

- **Family:** Pretendard Variable (jsdelivr), system Korean fallbacks. Real weights only:
  500, 600, 700.
- `body { word-break: keep-all; overflow-wrap: anywhere; }` — Korean breaks between words.
- Never letter-space Korean body text. Headings use small negative tracking (−.02em to −.03em).
- `font-variant-numeric: tabular-nums` on terms, years, credits, and counts.

| Size | Role |
|---|---|
| 56px | home H1 only |
| 44px (34px ≤900px) | page H1 |
| 40px | 교양 section credit figure |
| 24px | home card titles, rule-section h2 |
| 20–22px | group headings (course year groups, liberal-arts section names) |
| 17–19px | lede and sub lines (17px, line-height 1.7), home sub (19px) |
| 15–16px | body, chips, list rows |
| 13–14px | labels, notes, pill text |
| 12px | badges and the "연합" mark |

Korean prose line height is at least 1.5; reading text uses 1.6–1.75.

## Shape

Radius follows the size of the object, not a two-shape rule:

| Radius | Objects |
|---|---|
| `999px` | everything you pick: filter chips, 학번 chips, term pills |
| `20px` (`--r-card`) | large cards and panels: home cards, emphasis sections, FAQ CTA |
| `16px` | course cards, search field, notices, summary tiles, PDF frame |
| `12px` (`--r-field`) | buttons, credit-bar segments |
| `10px` | nav links, PDF link buttons |
| `6–8px` | badges, small tags |

Elevation is colour, not shadow: grey cards on white, darker grey on hover. Borders are 1px
hairlines. Old `border-left` accent stripes are reduced to 1px.

## Components

- **Home** — H1, one factual sub line, 학번 chips (links to `rules.html?year=N`), then a 2+3 grid
  of `.card.home-card` links: title, one-line description, and a 56px line pictogram
  (`stroke: #8fa9cc`, blue on hover). No statistics. `.home-card` is the selector analytics
  uses for `guide_opened`/`home_card`.
- **Chips** `.chip` — 40px pill, `--gray-100` fill; `aria-pressed="true"` → blue fill, white text.
  `.chip.past` (past terms) is white with a 1px `--gray-200` inset. The current term carries a
  6px blue `.now-dot`.
- **Filter rows** `.frow` — a 36px bold label (구분 / 학기) + a chip row. Filters on separate rows
  combine (AND). On mobile the term row scrolls sideways.
- **Course cards** — grouped under year headings ("3학년 13"), 3/2/1 columns. A white card,
  1px `--gray-200` border, 16px radius: name + type badge, then two rows:
  - **예정**: 30px pills, `--gray-100`; the first future term is `--blue-50`/blue.
  - **지난**: 26px outlined pills in `--gray-600`.
  - A term chosen in the filter becomes solid blue (the "next" tint turns off so only one
    blue state shows). The only note shown is 연합전공, as a small "연합" mark inside the pill.
- **Rules output** (rendered by `initRulesPage()`): yellow `.notice`, 학번 chips, PDF buttons,
  a 5-tile `.rule-summary`, `.rule-section` blocks with 1px-ruled `.rule-list` rows,
  `.credit-row` (name · blue credit · explanation), and `.credit-viz` segment bars
  (`#0a5fd6` / `#dbe9ff` / `--gray-200`).
- **교양 52학점 map** (`css/liberal-arts.css`) — a sticky bar under the top bar whose segments
  are sized by credits (7/6/16/8/3/9/3), grouped under 학문의 토대 40 / 지성의 열쇠 9 / 베리타스 3.
  When stuck it shrinks to a 40px bar and the current section's segment turns blue (scrollspy
  in the page's inline script). Sections below are a 2-column grid: a sticky left column with
  the 40px blue credit figure and the area name, and the original content on the right.

## Motion

State changes only: background/colour swaps at 150–200ms, `cubic-bezier(.2,.8,.2,1)`; home card
icons lift 2px on hover; cards scale to .985 on press. No load or ambient animation.
`prefers-reduced-motion` turns transitions off.

## Spacing

Spacing is set per component in `css/site.css` (vertical rhythm: 8/12/16/24/32/40/48/56/64/96px
for block gaps; card padding 20–28px). There is no token scale to enforce. Match the nearest
existing component rather than inventing a new value, and keep one owner per vertical gap
(don't stack a margin-bottom, padding-bottom, and the next block's padding-top).

## Never

- A second accent hue, gradients, glassmorphism, or blue section backgrounds.
- Big-number hero statistics on the home page.
- English eyebrows, slogan headlines, or captions that restate the heading.
- Removing information to make a page look cleaner.
- `--gray-600` text on a grey surface.
- An SNU crest, institutional navy, or an academic serif: the site must not pass as official.

## Known debts

- The design checker still flags tight padding in tables and cards inherited from the old page
  bodies (`liberal-arts.html` total/breakdown/merge tables, `code-guide.html` code map) and a
  light-blue line (`#5892e3`, 3.2:1) plus a border-top accent in the roadmap grid. They predate
  v7; fix them when those components are next edited.
- FAQ, 코드 가이드, 교양, and 로드맵 still load `base.css` under `body.v7p` overrides. Moving their
  components into `site.css` and dropping `base.css` is the clean end state.
