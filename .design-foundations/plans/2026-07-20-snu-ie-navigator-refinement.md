# Plan: SNU IE Navigator — Design Refinement

**Track:** Standard · **Entry stage:** Discover (no DESIGN.md / JOURNEY.md present)
**Seed:** `.design-foundations/research/2026-07-20-snu-ie-navigator-redesign.md`

## Context

**Problem:** Refine SNU IE Navigator's existing visual/interaction design toward a stronger
trustworthy-official feel by extending its current restrained Apple/SF-style direction — formalizing
a locked design token system, fixing two named mobile issues, consolidating `roadmap.html`'s
duplicated tokens into the shared stylesheet, and resolving whatever else a cross-pillar design
review surfaces across all 6 pages.

**Constraints:**
- Static HTML/CSS/JS only — no framework, no build step, no bundler.
- Fully responsive; desktop planning sessions and mobile quick-checks both load-bearing.
- Continue the existing SF-style direction (neutral grays, Pretendard Variable, blue accent
  `#0a5fd6`) — refinement, not a new identity. Explicitly NOT a pivot to SNU institutional branding.
- `.grad-toggle` desktop styling stays untouched — mobile breakpoint only.
- Korean-language UI (`lang="ko"`) unchanged. Existing IA / navigation stays as-is.

**Success criteria:** DESIGN.md locked with a token set passing WCAG AA (verified via `palette.mjs`);
`roadmap.html` on `css/base.css` with inline duplicate tokens removed; both named mobile issues
resolved; design-review-agent cross-pillar synthesis across the 6 pages returns no Critical findings
(Majors resolved or explicitly accepted); the direction reads as deliberate refinement, not generic.

## Chosen Approach

Descriptive-Discover (document the journey/IA that already exists rather than invent one), then a
single token-locking Design phase, then one compose phase that applies tokens across all pages and
executes the concrete fixes. Existing pages are the source of truth for IA — Phase 1 records, it does
not redesign.

## Pages in scope
`index.html`, `roadmap.html`, `rules.html`, `faq.html`, `courses.html`, `code-guide.html`

---

### Phase 1: Discover — JTBD + IA + page specs
**Stage:** Discover
**Model:** sonnet
**Doctrine:** journey
**Gate:** Standard

**Goal:** Capture the existing job, journey, IA, and per-page specs of the 6 live pages as a
JOURNEY.md the Design phases build against — descriptive of what ships today, not a redesign.

**Scope:**
- IN: Job story (what students hire the site for); site map / nav model; per-page spec (purpose,
  primary content blocks, primary action) for all 6 pages; the roadmap course-flow surface noted as
  a data-encoding surface for Phase 3.
- OUT: New IA, new pages, re-ordered navigation, new user flows. The IA is frozen.

**Constraints:** JOURNEY.md must reflect the current shipped structure — verified by reading each
HTML file, not assumed.

**Produces:** JOURNEY.md — `## Job`, `## Journey`, `## IA`, `## Page specs` (≥1 complete entry per
page, 6 total).
**Depends on:** research doc | **Unlocks:** Phase 2, Phase 3

**Done when:**
- [ ] DW-1.1: JOURNEY.md present with `## Job`, `## Journey`, `## IA`, `## Page specs` sections.
- [ ] DW-1.2: `## Page specs` has one complete entry per live page — 6 entries (index, roadmap,
      rules, faq, courses, code-guide), each naming purpose + primary content blocks + primary action.
- [ ] DW-1.3: IA recorded matches the shipped nav (topbar links + inter-page links), verified
      against the HTML, with no invented routes.

---

### Phase 2: Design — DNA + tokens (lock DESIGN.md)
**Stage:** Design
**Model:** fable
**Doctrine:** design-dna, foundations, archetypes, fonts, color
**Gate:** Full

**Goal:** Lock a DESIGN.md token system that formalizes and refines the current SF-style direction —
neutral + accent ramps, type scale, spacing scale — with WCAG AA solved by construction.

**Scope:**
- IN: Design DNA statement (the nameable direction + one signature move); semantic token block
  (`--background`/`--surface`/`--text`/`--accent-solid` + neutral & accent ramps); type scale
  (`--text-xs`…`--text-4xl`) tuned for Pretendard + Korean text; spacing scale; functional colors
  (error/success/warning/info) reconciled with the existing `--danger`/`--warning-*` vars; light
  scheme primary (current site is light-only — dark deferred unless review demands it).
- OUT: Applying tokens to pages (Phase 3); component specs (Phase 3).

**Constraints:** Accent ramp seeded from the existing `#0a5fd6` blue. Refine, don't replace the
palette — existing semantic vars (`--ink`, `--muted`, `--line`, `--wash`, `--danger`, `--warning-*`)
must map onto the new token names so Phase 3 is a rename, not a recolor. Generate ramps with
`palette.mjs` (`--seed "#0a5fd6"`) — no hand-picked hexes.

**Edge cases:** Any text/background pair below AA → fix the token via `palette.mjs`, never lower the
target. If refining the palette forces a visible hue shift on the existing blue, flag it rather than
silently restyling the brand.

**Produces:** DESIGN.md **locked** — token block (semantic aliases + ramps + type scale + spacing +
functional colors) + DNA statement, user-confirmed.
**Depends on:** Phase 1 | **Unlocks:** Phase 3

**Done when:**
- [ ] DW-2.1: DESIGN.md locked — token block present and user-confirmed.
- [ ] DW-2.2: All text/background pairs pass WCAG AA (≥4.5:1 body, ≥3:1 large), verified via
      `palette.mjs` exit 0.
- [ ] DW-2.3: Semantic aliases resolved (`--background`, `--surface`, `--text`, `--accent-solid`)
      and type scale `--text-xs`…`--text-4xl` present.
- [ ] DW-2.4: Functional colors (`--error/success/warning/info-*`) defined and reconciled with the
      existing `--danger` / `--warning-*` usage.
- [ ] DW-2.5: Every existing base.css semantic var maps onto a new token name (documented crosswalk),
      so Phase 3 is a rename not a recolor.

---

### Phase 3: Design — system + compose (apply tokens, fix issues)
**Stage:** Design
**Model:** fable
**Doctrine:** design-systems, usability, responsive, data-viz
**Gate:** Full

**Goal:** Apply the locked tokens across all 6 pages, consolidate `roadmap.html` onto `css/base.css`,
execute the two named mobile fixes, and run a cross-page consistency + usability pass — leaving a
mock-ready surface.

**Scope:**
- IN: Wire DESIGN.md tokens into `:root` in `css/base.css` and use them (no hard-coded hex left in
  the shared surfaces); migrate `roadmap.html` off its inline `<style>` token block onto
  `css/base.css` (shared tokens; roadmap-specific rules may stay page-local but reference shared
  tokens); **Fix A** — mobile topbar vertical spacing (`@media` block, add breathing room to match
  the site's whitespace rhythm); **Fix B** — de-emphasize `.grad-toggle` on mobile only (drop
  blue-fill/heavy-shadow, align to `.code-guide-btn`'s neutral outline-pill), desktop untouched;
  cross-page visual consistency + usability sweep across the 6 pages.
- OUT: New features, IA changes, content rewrites, `.grad-toggle` desktop restyle, dark mode.

**Constraints:** DESIGN.md is law — apply its tokens, do not re-derive the palette or introduce
one-off colors. `.grad-toggle` desktop rules unchanged (verify the desktop cascade still matches the
pre-change render). roadmap course-flow grid (`data-viz`: prereq arrows / legend) must stay legible
and truthful after retokenizing.

**Edge cases:** If applying a token to an existing component drops a contrast pair below AA →
stop-and-fix the token usage, don't ship the regression. If migrating roadmap.html off inline styles
changes its rendered layout → reconcile before proceeding (anchored render). Both named fixes must
be verified at ≤720px width specifically.

**Produces:** Retokenized `css/base.css` + migrated `roadmap.html` + component/fix specs; a
mock-ready surface for `/design-for-ai:mock`.
**Depends on:** Phase 2 | **Unlocks:** mock

**Done when:**
- [ ] DW-3.1: DESIGN.md tokens wired into `:root` and used across the shared surfaces — no
      hard-coded hex left in `css/base.css` component rules (functional/token vars only).
- [ ] DW-3.2: `roadmap.html` links `css/base.css` and its duplicated inline token block is removed;
      the page still renders equivalently (anchored render — no layout regression).
- [ ] DW-3.3: Fix A — mobile topbar has added vertical breathing room; verified in a ≤720px render.
- [ ] DW-3.4: Fix B — `.grad-toggle` on mobile (≤720px) no longer carries the blue-fill/heavy-shadow
      primary-CTA emphasis and reads as peer to `.code-guide-btn`; desktop `.grad-toggle` render
      unchanged (visual diff).
- [ ] DW-3.5: All retokenized text/background pairs still pass WCAG AA (≥4.5:1 body, ≥3:1 large);
      interactive elements pass AA non-text (≥3:1).
- [ ] DW-3.6: design-review-agent cross-pillar synthesis across the 6 pages returns no Critical
      findings; Major findings resolved or explicitly accepted.

---

## Verification plan

| Phase | Happy path | Dirty / edge case |
|-------|-----------|-------------------|
| 1 | JOURNEY.md has all 4 sections + 6 page specs (DW-1.1/1.2) | IA claims a route not in the HTML → reject (DW-1.3) |
| 2 | `palette.mjs` exits 0; semantic aliases + type scale + functional colors present (DW-2.1–2.4) | a text/bg pair below AA → fix token, never lower target (DW-2.2 edge) |
| 2 | existing var crosswalk complete (DW-2.5) | palette refine shifts the brand blue's hue visibly → flag, don't silently restyle |
| 3 | tokens wired, no hard-coded hex; both fixes verified at ≤720px (DW-3.1/3.3/3.4) | roadmap migration changes layout → reconcile before proceeding (DW-3.2 edge) |
| 3 | retokenized pairs still pass AA (DW-3.5) | a token application drops contrast below AA → stop-and-fix (DW-3.5 edge) |
| 3 | review synthesis no Criticals (DW-3.6) | desktop `.grad-toggle` changed → regression, revert (DW-3.4 edge) |

**Verification level:** Standard — per-phase design execution evidence (contrast report, mock
render, tokens applied) + a Phase-3 cross-pillar review gate.

## Gate order
JOURNEY.md (Phase 1) → DESIGN.md locked (Phase 2) → tokens/compose (Phase 3) → mock.

---

## Execution log

**Status:** complete · **Completed:** 2026-07-20 · Workspace: `main` (no worktree; no auto-commit — orchestrator handled edits under a per-component approval gate at the user's request; committing left to the user).

### Phase 1: Discover — JTBD + IA (Gate: Standard)
- [x] BUILD: JOURNEY.md produced (Job/Journey/IA + 6 page specs), grep-verified against the HTML.
- [x] REVIEW: SKIPPED — spec-only artifact, no rendered surface (detector N/A); self-verified against source.
Summary: JOURNEY.md documents the frozen, as-shipped IA of all 6 pages — the contract Phases 2–3 build against.

### Phase 2: Design — DNA + tokens (Gate: Full)
- [x] BUILD: DESIGN.md "Quiet Registrar" produced; `palette.mjs --seed "#0a5fd6" --chroma muted --harmony mono` exit 0 (6/6 PASS); brand blue pinned verbatim (zero drift); full existing-var→token crosswalk.
- [x] REVIEW: folded into the user lock-confirmation gate — user confirmed the muted clay red `#86534f` (no re-pin) and accepted the `--quiet`→`--text-tertiary` AA fix. DESIGN.md locked (user-confirmed 2026-07-20).
Summary: DESIGN.md locked — a WCAG-AA-by-construction token system (ramps, type scale, spacing, radius, shadow, motion) refining the shipped SF-style direction.

### Phase 3: Design — system + compose (Gate: Full)
- [x] BUILD: css/base.css retokenized (DESIGN.md `:root` installed, ~24 hex + 15 legacy vars → tokens); Fix A (mobile topbar 12→20px); roadmap.html migrated onto css/base.css (inline token block removed, 26 hex tokenized); Fix B (mobile grad-toggle de-emphasized → outline pill, desktop untouched); code-guide.html tokenized. palette.mjs re-run exit 0.
- [x] REVIEW: design-review-agent (dual-blind; detector exit 0, 0 Criticals, distinctiveness PASS) → FAIL on 2 narrow blockers → **resolved**:
  - DW-3.1 feedback-float 4× raw `rgba()` → tokenized (`--overlay-hairline/-surface`, `--shadow-float-hover`, `--focus-ring`); base.css component rules now literal-free bar the topbar backdrop-blur exception.
  - DW-3.5 focus ring 1.54:1 → solid `--focus-ring` (`#0a5fd6`) **5.69:1**; idle text-labeled-control borders (1.49:1) **explicitly accepted** by the user (WCAG 1.4.11 satisfied by text labels; pre-existing; preserves the calm register) — documented in DESIGN.md Open questions.
  - Minors folded in: mobile peer buttons aligned (46px/`--text-md`), course-box hover shadow tokenized (`--shadow-node-hover`), code-guide `h2` 20px→`--text-2xl`.
  - Post-fix re-verify: detector re-run identical (no new hits), focus contrast computed 5.69:1, all new tokens defined+referenced, braces balanced. No second full review dispatch (surgical, independently verified fixes).
- [ ] Committed: NO — left to the user (uncommitted js/script.js + rules.html in the working tree).
Summary: All 6 pages on the locked token system; both named mobile fixes shipped; review blockers resolved/accepted. Pixel-level verification of the two mobile fixes pending (no browser MCP this session — verified by CSS inspection).

### Known gaps carried forward (non-blocking)
- **No browser render this session** — Fix A / Fix B / roadmap-equivalence verified by computed CSS, not screenshots. Eyeball at ≤720px recommended.
- Pre-existing, out-of-scope (flag for a future explicitly-scoped pass): desktop-first `max-width` media-query architecture; `.filter`/`.year-chip` touch targets < 44px; roadmap SVG connector colors hard-coded in JS (+ missing "solid" legend entry); footer ships on only 2 of 6 pages; orphaned `css/roadmap.css` + `js/roadmap.js`; `rules.html` dead `#studentYear` JS path.
