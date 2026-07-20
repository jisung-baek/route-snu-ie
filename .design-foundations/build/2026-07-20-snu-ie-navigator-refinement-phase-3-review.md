# Design Review: Phase 3 - SNU IE Navigator Refinement (Token Retokenization)

## Rendered Evidence (Step 0)
- Screenshot: none — no browser MCP available in this environment (checked via tool search for
  browser/playwright/puppeteer/chrome-control tools; none found). Structure-level critique only.
- Surface: index.html, roadmap.html, rules.html, faq.html, courses.html, code-guide.html +
  css/base.css, reviewed against DESIGN.md and JOURNEY.md as the stated contract.

## Assessment B — Deterministic Detector
- Command: `node scripts/detect.mjs index.html roadmap.html rules.html faq.html courses.html code-guide.html > .design-foundations/build/2026-07-20-snu-ie-navigator-refinement-phase-3-detect.json`
- Exit: 0 ran
- Findings: 68 total — `nested-cards` ×66 (roadmap.html ×64, code-guide.html ×2, severity shipped
  "high"), `em-dash-overuse` ×1 (roadmap.html, "medium"), `numbered-section-markers` ×1 (index.html,
  "advisory")
- Opened only after Assessment A findings were frozen: YES

## Triage
- Baseline (always-on): visual (`design-dna` + `checklists` + `ai-tells`) + `usability`
- Dispatched: `design-systems` (token/component architecture is the direct subject of this phase),
  `responsive` (Fix A and Fix B both target ≤720px specifically), `data-viz` (roadmap.html's
  course-flow grid + SVG prerequisite arrows, and rules.html's credit-viz bars, are the site's only
  data-encoding surfaces)
- Not applicable: `content-design` (no new copy under review this phase), `journey` (IA explicitly
  frozen per DESIGN.md/JOURNEY.md), `behavioral`/`deceptive-patterns` (a reference utility, not a
  persuasion/conversion surface), `ai-native` (conventional screen UI, not an agent interface)
- Deferred: none — surface was small enough to cover every dispatched pillar in full

## Cross-Pillar Findings (ONE ranked report)

| Severity | Pillar | Problem | Principle | Fix |
|---|---|---|---|---|
| Major | design-systems | `.feedback-float` / `.feedback-float-label` in css/base.css (lines 1147, 1159 ×2, 1164, 1185) carry 4 hard-coded `rgba()` literals — border, two box-shadow layers, focus outline, label background — none covered by DESIGN.md's topbar-only alpha exception | Single-source-of-truth token discipline (design-systems doctrine: "changing global tokens means re-running palette.mjs, not editing hex values by hand") | Define tokens (e.g. `--overlay-strong`, a `--focus-ring` color, a `--shadow-float-hover` variant) in `:root`, reference via `var()` |
| Major | usability | `.filter`, `.year-chip`, `.code-guide-btn`, and the Fix-B mobile `.grad-toggle` idle state have no fill differentiating them from the page (`background: var(--background)`) and rely solely on a `1px solid var(--border-subtle)` (#ced2d9) edge — computed contrast vs `var(--background)` (#fcfdfd) = **1.488:1** against a 3:1 floor | WCAG 2.1 SC 1.4.11 Non-text Contrast | Darken `--border-subtle` for this use, or add a faint tinted fill so the pill doesn't depend on the hairline alone |
| Major | usability | `.feedback-float:focus-visible`'s `outline: 3px solid rgba(10,95,214,.28)`, alpha-blended over the page background, computes to **1.535:1** effective contrast — on the one control present on all 6 pages | WCAG 1.4.11 / 2.4.11 Focus Appearance (≥3:1) | Raise the outline alpha (≈0.55+) or switch to a solid `--accent-solid` ring |
| Minor — register-justified | detector + design-dna | Detector: `nested-cards`, 66 hits, e.g. `<span class="course-box foundation c1"> is a card inside a card ancestor` (roadmap.html:628); shipped severity "high" | ai-tells.md Layout Tells ("cards nested inside cards" = "no composition decisions made") | DESIGN.md names the roadmap grid as the site's one intentionally-dense "expressive moment" (truthful data encoding, not decoration); `.roadmap-wrapper`/`.anatomy-card` are functional scroll-viewport/explanatory frames (bordered for legibility), not decorative wrapping, and `.course-box` nodes are flowchart data-marks, not content cards. DOM nesting pre-dates Phase 3 (composition explicitly frozen). No action required this phase |
| Minor — false positive | detector | Detector: `em-dash-overuse`, roadmap.html, "76 em-dashes in body copy" | ai-tells.md copy tell (5+ em-dashes/double-hyphens) | The count is CSS custom-property syntax (`--accent-solid`, `--text-base`, …) inside roadmap.html's inline `<style>` block, not prose — a direct read of every visible copy string on the page found no em-dash-heavy passage. Detector limitation, not a content defect |
| Minor — register-justified | detector | Detector: `numbered-section-markers`, index.html, advisory, "01, 02, 03, 04, 07" | ai-tells.md ("01/02/03 as decoration with no functional ordering purpose") | The 01–04 portal-card numbers mirror the site's real 4-item nav order (verified in JOURNEY.md and the topbar markup) — functional, not decorative. "07" traces to the footer's `2026-07-13` date string, not a genuine 5th marker |
| Minor | usability / Gestalt | Fix-B mobile `.grad-toggle` (54px tall, 16px font) and `.code-guide-btn` (46px tall, `var(--text-md)`=15px font) match on color/border/background at ≤720px but not on height/type-size, so the two stacked "peer" buttons render at slightly different sizes | Gestalt law of similarity; Nielsen heuristic #4 (consistency) | Align `height`/`font-size` between the two mobile button rules |
| Minor | design-systems / data-viz | roadmap.html's inline `<script>` hard-codes SVG connector colors (`REQ="#0a5fd6"`, `REC="#b9c0cc"`, `SOLID="#c9cdd6"`) separately from the CSS tokens they mirror; `REC` doesn't exactly match its legend swatch's `var(--neutral-7)` (#bfc4cc) — the code's own comment concedes "within 1-2 hex units"; `SOLID` (used for the plain math1→math2 chain) has no legend entry at all | Munzner: a legend is a truthful-encoding contract with the marks it describes | Read `--accent-solid`/`--neutral-7` via `getComputedStyle` at draw time instead of duplicating hex; add a third legend swatch (or fold "solid" into "권장") |
| Minor | design-systems | `.course-box:hover`/`:focus-visible` box-shadow uses a literal `rgba(24,33,47,.18)` not traceable to any DESIGN.md token | Design-systems token-tier discipline | Route through a named token |
| Minor | design-systems / typography | code-guide.html's `.anatomy-card h2` uses hard-coded `font-size:20px`, off DESIGN.md's documented scale (`--text-xl`=18 / `--text-2xl`=22) | DESIGN.md: "no page may introduce... type sizes outside this file" | Round to `--text-xl` or `--text-2xl` per the file's own tie-breaking rule |
| Minor — out of scope, pre-existing | responsive | Sitewide CSS (base.css, roadmap.html, code-guide.html) is authored desktop-first via `max-width` media queries exclusively; responsive.md's own table classifies this pattern "Critical" in general | responsive.md Red Flags: "Max-width media queries as primary responsive strategy" | Downgraded here: pre-existing, sitewide architecture outside Phase 3's stated scope (rename-not-resize + two named mobile fixes only); no functionality is actually lost at narrow widths in this implementation. Flag for a future, explicitly-scoped responsive pass |
| Minor — out of scope, pre-existing | responsive | `.filter`/`.year-chip` are `min-height:38px`, under the 44×44px touch-target minimum | responsive.md Design Review Criteria (44×44px touch targets) | Pre-existing, sitewide, not named in any DW item; note for a future pass |

## Requirement Fulfillment

### DW-3.1
PREMISE: DESIGN.md tokens wired into `:root` and used across the shared surfaces — no hard-coded hex left in css/base.css component rules (functional/token vars only; DESIGN.md's explicit alpha exceptions — the sticky topbar's rgba hairline + translucent fill for backdrop-blur — excepted).
EVIDENCE: css/base.css's `:root` block (lines 1–136) matches DESIGN.md's three-layer cascade (generated ramps → brand-pin → site extensions) value-for-value. `grep -n '#[0-9a-fA-F]\{3,6\}'` and `grep -n 'rgba\?('` over css/base.css confirm zero hex/rgba literals outside `:root` except `.topbar` (lines 180–181 — exactly the named exception) and 4 unexempted `rgba()` literals in `.feedback-float`/`.feedback-float-label` (lines 1147, 1159 ×2, 1164, 1185).
VERDICT: PARTIAL

### DW-3.2
PREMISE: roadmap.html links css/base.css and its duplicated inline token block is removed; the page still renders equivalently (no layout regression).
EVIDENCE: roadmap.html line 9: `<link rel="stylesheet" href="css/base.css">`. Its `<style>` block (lines 10–560) contains no `:root{}` re-declaration — only roadmap-scoped component rules (`.roadmap-hero`, `.grad-toggle`, `.course-box`, etc.), all referencing `var(--...)` tokens, matching the block's own header comment ("shared base rules... now come from css/base.css"). `.topbar`/`.brand`/`.nav`/`.feedback-float` markup in roadmap.html carries no local CSS and its class names match base.css's shared selectors exactly, so the shared chrome inherits cleanly.
VERDICT: PASS (structural evidence only — no screenshot to confirm pixel-equivalence; see Notes)

### DW-3.3
PREMISE: Fix A — the mobile topbar has added vertical breathing room vs. the shipped 12px; verified at ≤720px.
EVIDENCE: css/base.css `@media (max-width: 760px) { .topbar { padding-top: var(--space-5); padding-bottom: var(--space-5); ... } }` (lines 1204–1211); `--space-5: 20px` (line 112). 760px ≥ 720px, so the rule is active throughout the stated ≤720px range, and 20px exceeds the stated 12px baseline.
VERDICT: PASS

### DW-3.4
PREMISE: Fix B — .grad-toggle on mobile (≤720px) no longer carries the blue-fill/heavy-shadow primary-CTA emphasis and reads as a peer to .code-guide-btn; the desktop .grad-toggle render is unchanged.
EVIDENCE: roadmap.html's `@media (max-width: 720px)` block (lines 529–559) sets `.grad-toggle { background: var(--background); color: var(--text); border: 1px solid var(--border-subtle); box-shadow: none; }` and a matching muted `:hover` — identical background/border/color values to `.code-guide-btn`'s own unconditional rule. The desktop `.grad-toggle` rule (lines 86–109: `background: var(--accent-solid)`, `box-shadow: 0 10px 26px rgba(10,95,214,.34)`) sits outside any media query, so it is mechanically unreachable by the ≤720px override — CSS media queries cannot affect wider viewports.
VERDICT: PASS (a Minor residual height/font-size mismatch between the two "peer" buttons is noted in Cross-Pillar Findings — it does not defeat the de-emphasis Fix B targets)

### DW-3.5
PREMISE: All retokenized text/background pairs pass WCAG AA (≥4.5:1 body, ≥3:1 large); interactive elements pass AA non-text (≥3:1).
EVIDENCE: DESIGN.md's own contrast report documents ≥4.5:1 for every generated/pinned/extension text pair; spot-checking actual usage in base.css (`.nav a.active`, `.badge.required`, `.notice`, `.filter.active`, default `.filter`/`.year-chip` text, `.course-count`, etc.) against that report confirms compliance in every case checked. However, computed contrast for the interactive-element non-text clause fails twice: `var(--border-subtle) #ced2d9` on `var(--background) #fcfdfd` = **1.488:1** (`.filter`/`.year-chip`/`.code-guide-btn`/mobile `.grad-toggle` idle-state boundary — verified by script, WCAG relative-luminance formula); `.feedback-float:focus-visible`'s `rgba(10,95,214,.28)` ring blended over the page = **1.535:1** effective (also script-verified). Both are well under the required 3:1, and DESIGN.md's contrast audit itself never covers non-text/border pairs — it verifies text pairs only.
VERDICT: PARTIAL

### DW-3.6
PREMISE: This cross-pillar review returns no Critical findings; Major findings resolved or explicitly accepted.
EVIDENCE: Zero Critical findings from either assessment — distinctiveness passes cleanly (see Notes) and all detector "high"-severity hits resolve to register-justified or false-positive Minor on inspection. Three Major findings stand (the `.feedback-float` rgba literals from DW-3.1, and the two non-text-contrast gaps from DW-3.5); none is named, discussed, or accepted anywhere in DESIGN.md's Open Questions section or elsewhere in the contract — DESIGN.md's alpha exception explicitly names only the topbar, and its contrast audit never addresses non-text pairs at all.
VERDICT: PARTIAL

**All requirements met:** NO

## Notes (non-blocking)
- No screenshot available — no browser MCP tool was found in this environment (searched for
  browser/playwright/puppeteer/chrome-control tooling). All findings above are structure-level:
  applied tokens, CSS rules, and hand/script-computed WCAG contrast ratios, not pixel observation.
  Fix A / Fix B / DW-3.2's "renders equivalently" / "reads as a peer" claims are verified via
  computed CSS values and DOM/selector cross-referencing, not visual confirmation. Run the browser
  MCP to capture pixels and close this gap.
- rules.html, faq.html, and courses.html render their core content (`#ruleOutput`, `#faqList`,
  `#courseGrid`) via `js/script.js` at runtime; that file was not in the reviewed file list, so the
  actual data-driven output (credit-viz bar proportions, FAQ answer text, course cards) could not be
  directly inspected — only the CSS that would style them, which is confirmed tokenized and
  contrast-clean wherever it was checked.
- Distinctiveness (ai-tells.md CHECKER mode): PASSES cleanly. A named, specific direction ("Quiet
  Registrar" — calm academic-bulletin authority, not "clean and modern"); a non-default typeface
  (Pretendard Variable, not Inter/Roboto/Open Sans/Arial); a monochromatic-blue palette with no
  purple-indigo-violet triplet and no cyan-on-dark; a genuine, consistently-applied signature move
  (the panel/pill radius rule — verified no stray radius values outside `--radius-micro`/`-panel`/
  `-pill`/`-round` anywhere in base.css); no gradients anywhere; backdrop-blur confined to the topbar
  exactly as DESIGN.md specifies. This is not competent-but-generic AI output.
- Positive data-viz evidence: prerequisite arrows encode 필수/권장 via color AND stroke-width AND a
  text-labeled legend (triple redundancy — colorblind-safe per Knaflic); credit-viz bar segment
  lightness order (s1<s2<s3) is preserved and self-documented in a code comment as intentional
  truthful sequential encoding.
- Positive responsive evidence: fluid `clamp()` typography is used correctly throughout (hero H1,
  section H1, body paragraphs, gutter); `.feedback-float` uses `env(safe-area-inset-bottom)`
  correctly for notched devices.

## Issues (if FAIL)
1. `.feedback-float`/`.feedback-float-label` in css/base.css carry 4 hard-coded `rgba()` color
   literals outside DESIGN.md's named topbar-only alpha exception — Major / design-systems /
   single-source-of-truth token discipline / define and reference dedicated tokens (blocks DW-3.1).
2. Default/idle-state pill borders (`.filter`, `.year-chip`, `.code-guide-btn`, mobile
   `.grad-toggle`) compute to 1.488:1 against their background, and `.feedback-float`'s focus ring
   computes to 1.535:1 effective — both under the WCAG 3:1 non-text-contrast floor DW-3.5 explicitly
   asks for — Major / usability / WCAG 1.4.11 / darken the border token or add a tinted fill;
   strengthen the focus-ring alpha (blocks DW-3.5).

**Verdict: FAIL — blockers: DW-3.1 (unexempted rgba literals in `.feedback-float`), DW-3.5
(non-text contrast under 3:1 on the `.filter`/`.year-chip`/`.code-guide-btn`/mobile `.grad-toggle`
idle borders and the sitewide feedback-button focus ring). DW-3.2, DW-3.3, and DW-3.4 all pass on
concrete structural evidence; distinctiveness passes cleanly; every detector finding resolves to
register-justified or false-positive Minor. Both blockers are narrow, precisely located, and
concretely fixable — see Cross-Pillar Findings for exact tokens and line numbers.**
