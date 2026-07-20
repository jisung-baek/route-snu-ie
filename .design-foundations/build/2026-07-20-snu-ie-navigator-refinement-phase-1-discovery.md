# Discovery + Design: Phase 1 - Discover — JTBD + IA + page specs

## Artifacts Found / Current State

- No `JOURNEY.md` and no `DESIGN.md` at the project root — confirmed by directory listing. This phase produces the former; the latter is Phase 2's job.
- No project-root `CLAUDE.md` / `AGENTS.md` exists to carry a `## Design Context` link line (the journey doctrine's suggested cross-link target). Nothing to edit there yet; noted as a gap, not fixed here (out of this phase's `Produces:` contract).
- Plan file read in full: `.design-foundations/plans/2026-07-20-snu-ie-navigator-refinement.md`. Seed research doc read in full: `.design-foundations/research/2026-07-20-snu-ie-navigator-redesign.md`.
- All 6 live pages read in full, byte-for-byte, from the project root: `index.html`, `roadmap.html`, `rules.html`, `faq.html`, `courses.html`, `code-guide.html`. Supporting files also read: `css/base.css` (token/footer/component rules), `js/script.js` (852 lines — all data + render logic for courses/FAQ/rules pages), `roadmap.html`'s inline `<style>`/`<script>` (roadmap is fully self-contained).

## Gaps

Surfaced while verifying the artifact against the HTML — none block DW-1.1–1.3, all are forward notes for later phases or plain observations:

1. **Footer inconsistency.** `.footer` is a real, styled component (`css/base.css` lines 994–1011) but ships on only 2 of 6 pages (`index.html`, `code-guide.html`). `roadmap.html`, `rules.html`, `faq.html`, `courses.html` have no `<footer>` at all. Verified by reading every page's closing markup, not assumed. Relevant to Phase 3's "cross-page visual consistency... sweep."
2. **`roadmap.html` is fully self-contained.** It has its own inline `<style>` (duplicating `--ink`/`--blue`/etc.) and its own inline `<script>` (tooltips, connector-SVG drawing, grad-toggle) — it links neither `css/base.css` nor `js/script.js`. This confirms the plan's Context note verbatim and is exactly what Phase 3 DW-3.2 targets.
3. **Orphaned files.** `css/roadmap.css` and `js/roadmap.js` exist on disk but zero of the 6 shipped HTML files reference them (grep-verified). They are not part of the live IA or any page spec below — flagged so Phase 3 doesn't assume they're load-bearing.
4. **Two distinct feedback forms.** The sitewide floating button (`forms.gle/vGcq96qUARLFE2fM7`, present on all 6 pages) and `faq.html`'s local CTA banner (`forms.gle/vJERnANYC6p6e3FY9`) point to two different Google Forms. Both are real/live, not invented; flagged as an observation only.
5. **Dead code path.** `js/script.js`'s `initRulesPage()` reads `#studentYear` (a free-input year field); no such element exists anywhere in `rules.html`'s shipped markup, so that branch is inert. Not listed as a page-spec content block below since nothing renders from it.
6. **`code-guide.html` is nav-invisible.** All 4 topbar links are present on the page (same shared markup as everywhere else) but none carries `class="active"`, and no homepage portal card points to it — its only inbound link, sitewide, is the "신 교과목 코드 읽는 방법" button inside `roadmap.html`'s hero. Recorded in the sitemap as a child of `roadmap.html`, not a sibling of the 4 top-level sections.

None of these require plan changes — they're within the "descriptive, not redesign" mandate and are handed forward as notes.

## Gate Status

- DESIGN.md: not present. Expected — this Discover phase precedes Phase 2, which locks it.
- JOURNEY.md: did not exist before this phase; produced below.
- Prerequisites for Phase 1: research doc present and read. No upstream phase artifact is required (Phase 1 is first in the plan's Gate order: `JOURNEY.md (Phase 1) → DESIGN.md locked (Phase 2) → tokens/compose (Phase 3) → mock`).

## DW Verification

| DW-ID | Done-When Item | Status | Evidence |
|-------|---------------|--------|----------|
| DW-1.1 | JOURNEY.md present with `## Job`, `## Journey`, `## IA`, `## Page specs` sections | COVERED | `JOURNEY.md` written at the project root with exactly those four `##` headings (structural check: grep the four literal heading strings post-write). |
| DW-1.2 | `## Page specs` has one complete entry per live page — 6 entries, each naming purpose + primary content blocks + primary action | COVERED | 6 `###` entries under `## Page specs` (index, roadmap, rules, faq, courses, code-guide), each carrying Purpose / Entry points / Content blocks (ordered) / States / Primary CTA / Exit-next — every field sourced from the verbatim HTML/JS read above, not assumed. |
| DW-1.3 | IA recorded matches the shipped nav (topbar links + inter-page links), verified against the HTML, with no invented routes | COVERED | Nav label/href/order/active-class cross-checked verbatim across all 6 files (identical 4-item nav + brand-as-home link on every page; per-page `active` class confirmed present/absent exactly where the shipped markup has it). Sitemap in `## IA` contains only the 6 shipped files plus the verified real inter-page/external links (roadmap↔code-guide back-link, footer link, two feedback-form links) — no page or route invented. |

**All items COVERED:** YES

This is a spec-only Discover phase per the dispatch's explicit framing: evidence is artifact-presence + structural verification against the HTML (no `palette.mjs`, no render — both N/A; no tokens or mock exist yet to validate).

**Verification pass (post-write, before final report):** Ran `grep`/`wc` counts against the live HTML for every specific number cited in `JOURNEY.md` (nav item count/order/active-class per page, `data-notip` course-box count, `courses.html` filter-button count, `rules.html` year-chip count, `faq.html` item count, `code-guide.html` token-chip and old→new mapping-row counts, both `forms.gle` URLs, both footer strings). This caught and fixed two drafting errors before finalizing: the roadmap grid's tooltip-exempt course-box count was written as 4 and is actually 6 (`math1`/`math2`/`stat`/`emath1`/`emath2`/`comp`), and `courses.html`'s filter-button count was written as 9 and is actually 10 (4 type filters + 6 term filters). All other cited counts matched on the first check. This is the concrete form "verified by reading each HTML file, not assumed" took in practice.

## Design Decisions

- **JTBD school:** Klement job-story statement format ("When… I want… so I can…") as the write-up shape, with Moesta four-forces (push/pull/anxiety/habit) used as supporting context. `journey-caveats.md`'s JTBD-school-mixing section explicitly names this pairing as compatible ("The job story format (Klement) pairs cleanly with Moesta's constructs"), so this isn't a forbidden mix. No Switch interview was actually conducted — the four forces are inferred from verified on-page evidence (repeated 비공식/disclaimer copy, cohort-specific rule deltas visible in `ruleData`), and are labeled "inferred, not interview-conducted" in the artifact rather than presented as validated research. This follows `journey-caveats.md`'s journey-map-theater guidance: flag ungrounded material rather than dressing it up as research.
- **Altitude scope:** the plan names 4 of the 6 stack layers (JTBD, journey map, IA, page specs); Flows and the Marketing-persuasion-spine altitudes are explicitly out of scope ("OUT: new user flows," and this product is a reference utility, not a landing page). `JOURNEY.md` therefore ships exactly the 4 `##` sections DW-1.1 names — no 5th section invented to pad out the template.
- **Decision model:** rather than force a linear AIDA/purchase funnel onto a non-commerce reference tool, the Journey section frames repeat use as a loyalty-loop analog (McKinsey CDJ 2009: first visit explores broadly across sections, later visits under time pressure jump straight to one bookmarked page, skipping re-exploration) — cited per the doctrine's "no linear funnel" rule. Flagged as inferred; no analytics were available to confirm actual repeat-visit behavior.
- **Organization scheme:** IA is characterized as task-based (Rosenfeld/Morville ambiguous scheme) — the 4 top-level sections map to 4 distinct student tasks (plan sequence / verify rules / resolve edge cases / confirm timing), not to an alphabetical, chronological, or department-internal grouping.
- **Validation:** IA validation is explicitly marked NOT VALIDATED (no card sort, no tree test) — correct for a phase that documents an already-shipped, frozen IA rather than proposing a new one to be tested before visual design.
- **Tooling:** `palette.mjs` and the `prototype` skill are N/A this phase (no tokens, no mock in a spec-only Discover phase) — noted rather than skipped silently.

## Recommendation

BUILD — proceed to Production. No CANNOT_MEET items, no scope conflicts, no missing prerequisites.
