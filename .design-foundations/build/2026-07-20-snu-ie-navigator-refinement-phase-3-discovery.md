# Discovery + Design: Phase 3 - Design — system + compose

## Artifacts Found / Current State

- **DESIGN.md** — present, locked, user-confirmed 2026-07-20. Token block (3 sequential `:root`
  blocks: generated ramps / brand-pin layer / site extensions), crosswalk table (17 rows), landing-spot
  table (10 rows), signature move (pill-or-panel, 7px/10px outliers → 8px), shadow/motion values named
  in prose. This is the law for this phase.
- **JOURNEY.md** — present, IA frozen, 6 page specs. Read for context; not modified this phase.
- **css/base.css** — 1130 lines. `:root` has 15 old semantic vars (`--ink/--muted/--quiet/--line/
  --line-strong/--paper/--wash/--wash-2/--blue/--blue-soft/--danger/--danger-soft/--warning-bg/
  --warning-line/--warning-ink`) + font stack. Component rules reference these vars ~130 times and
  contain 24 raw hex literals (verified by `grep -noE '#[0-9a-fA-F]{3,8}'`). 5 pages (index, rules,
  faq, courses, code-guide) link this file and contain **zero** inline hex or `var(--...)` usage of
  their own (verified) — they are pure class consumers, so retokenizing base.css's component rules
  is sufficient for them; no direct edits needed or made to rules.html/faq.html/courses.html/index.html.
- **roadmap.html** — 525 lines, fully self-contained: own `<style>` with a duplicate `:root` token
  block (adds `--req`/`--white`, `--white` unreferenced), duplicates ~10 shared base rules
  (`*`, `body`, `::selection`, `a`, `.topbar`, `.brand`, `.brand-mark`, `.nav`, `.nav a`,
  `.feedback-float` + sub-rules) byte-for-byte identical (mod whitespace) to base.css, plus genuinely
  roadmap-specific rules (hero, course-flow grid, legend, prereq-notes, tooltip, actions/grad-toggle/
  code-guide-btn). Links neither `css/base.css` nor `js/script.js`. 26 CSS hex literals (excluding
  the inline `<script>`'s 3 JS color constants, confirmed out of scope) + a duplicate token `:root`.
  Own `@media (max-width:720px)` block mixes shared-rule duplicates (topbar/nav/feedback-float) with
  genuinely roadmap-specific rules (actions/code-guide-btn/grad-toggle).
- **code-guide.html** — 208 lines, links `css/base.css` + `js/script.js` already. One page-local
  `<style>` block referencing old var names throughout plus 6 raw hex literals. One inline
  `style="...color:var(--muted);..."` attribute in the HTML body (line ~175) also references an
  old var name — not caught by a `<style>`-block-only sweep, found by full-file grep.
- **Orphaned files** (`css/roadmap.css`, `js/roadmap.js`) — confirmed referenced by no shipped
  `<link>`/`<script>` tag in any of the 6 pages. Left untouched per scope.
- **`node` v24 confirmed**; re-ran `palette.mjs --seed "#0a5fd6" --chroma muted --harmony mono
  --scheme light` — output byte-matches DESIGN.md's pasted block verbatim, **exit 0**, 6/6 PASS.

## Gaps

1. **~40 hex literals span two files, not one.** DESIGN.md's landing-spot table covers the
   recurring ones; a handful of roadmap-only literals aren't named in the table
   (`#f6f6f8` term-header, `#eef0f4`/`#3a3a3c` area-header, `#f5f7fa` lane-bg.alt, `#b9c0cc`
   swatch.rec, `#a9c3f0` tooltip label). Resolved by nearest-ramp-step judgment, documented below,
   each cross-checked against its pre-existing (already-shipped) contrast level so no regression
   is introduced.
2. **`--blue`'s crosswalk target is a role split** (`--accent-solid` for solid/background/border-
   fill uses, `--accent-text` for text-color uses — DESIGN.md lists both with a slash). Every one
   of the ~35 `var(--blue)` call sites across the two files was individually classified by role
   before rewriting (all other old vars have one unambiguous target, per the crosswalk table).
3. **`#b9c0cc` (roadmap `.swatch.rec`) is load-bearing against out-of-scope JS.** The inline
   `<script>`'s `REC="#b9c0cc"` constant draws the actual connector-line color and is explicitly
   out of scope (JS untouched). The nearest ramp step is `--neutral-7 #bfc4cc` (Δ ≤6 per channel,
   imperceptible at a 2px line weight). Kept as the tokenized choice; the JS stays on its literal.
4. **A shared-rule duplication trap in roadmap's own mobile block.** Its `@media (max-width:720px)`
   block currently redeclares `.topbar`/`.nav`/`.feedback-float*` mobile treatment identically to
   base.css's own `@media (max-width:760px)` block. Once roadmap links base.css, keeping both would
   let source order (not intent) decide which wins. Resolved: delete the shared-rule duplicates from
   roadmap's local block (they inherit from base.css, which now also carries Fix A), keep only the
   genuinely roadmap-specific rules (`.actions`/`.code-guide-btn`/`.grad-toggle`) at 720px, per the
   dispatch's explicit "keep roadmap's existing 720px unless consolidating."
   **Accepted side-effect:** in the 721–760px band, the topbar now wraps to mobile layout (via
   base.css's 760px query) while the actions row is still desktop flex-row (until roadmap's own
   720px query fires) — `.actions` already carries `flex-wrap:wrap` as a non-conditional default, so
   this band degrades gracefully (natural wrap, not breakage), and the dispatch explicitly sanctions
   not consolidating the two breakpoints.
5. **`--ink`'s two roles (text-color AND occasional dark-chip background-fill, e.g.
   `code-map-row.head`, `.tok.pfx .glyph`) have one crosswalk target (`--text`), unlike `--blue`.**
   Followed the crosswalk literally (single target, no role split invented) rather than introducing
   a distinction DESIGN.md doesn't draw.
6. **Two shadow rgba values are ink-derived but not hex** (`rgba(29,29,31,X)` — old `--ink` in
   decimal). Not gated by DW-3.1 (not hex), but left un-updated would visibly mismatch the new
   `--text` (`#2c2e31` = `44,46,49`) used everywhere else. Updated the decimal triple for coherence
   wherever it's a straight ink-alpha blend (tooltip bg, feedback-float-label shadow, feedback-float
   shadows). Left the course-tip's distinct `rgba(0,0,0,.28)` and hover-shadow's non-matching values
   as literals — no named DESIGN.md token matches them and changing them risks an unverified
   render delta with no upside.
7. **Type-scale / spacing-scale literal substitution across every component rule is NOT attempted.**
   DESIGN.md explicitly hedges spacing as "opportunistic, never at layout-regression risk" and
   flags its one discussed type-scale case (26px portal h2) as "may stay literal if layout shifts."
   Component #2's own wording scopes component-rule replacement to "semantic var definitions and
   hex literals" only. Scope boundary: type scale + spacing tokens are installed in `:root`
   (required) and spacing is applied at Fix A (required); font-size/margin/padding/gap literals
   elsewhere are left as shipped values — no DW item requires their conversion, and forcing it
   would add unverified regression risk (no browser MCP available this run — see Validation).
8. **Two additional radius outliers beyond DESIGN.md's named list**: code-guide.html's
   `.tok .glyph` (10px) and `.step .k` (6px) both violate the "nothing else, ever" panel-or-pill
   law but aren't in DESIGN.md's two named outliers (brand-mark 7px, prereq-notes 10px). Both are
   inside code-guide.html, one of this phase's three edit targets — normalized to `--radius-panel`
   (8px) for law compliance, flagged here as a self-discovered, DESIGN.md-consistent addition.

## Gate Status

- DESIGN.md: **locked**, user-confirmed. Read in full before this discovery.
- JOURNEY.md: present, read for context.
- Prerequisites met: Phase 2 artifacts present, `palette.mjs` reproducible (exit 0), no blocking
  gaps. Non-shipped/out-of-scope files (`rules.html`, `js/script.js`, `css/roadmap.css`,
  `js/roadmap.js`) verified to need zero touching (grep-confirmed no hex, no `var(--...)`).

## DW Verification

| DW-ID | Done-When Item | Status | Evidence |
|-------|---------------|--------|----------|
| DW-3.1 | Tokens wired into `:root`, used across shared surfaces; no hard-coded hex in base.css component rules (alpha exceptions excepted) | COVERED | Post-edit grep sweep for `#[0-9a-fA-F]{3,8}` over `css/base.css` returns only the `:root` token definitions themselves (no hex in component rules); `rgba(0,0,0,.08)` topbar hairline + `rgba(255,255,255,.72)` topbar fill kept as DESIGN.md's named alpha exception |
| DW-3.2 | roadmap.html links `css/base.css`, duplicate inline token block removed, page renders equivalently | COVERED | `<link rel="stylesheet" href="css/base.css">` added; `:root{...}` block deleted from roadmap's `<style>`; all ~10 shared-rule duplicates (`*`/`body`/`::selection`/`a`/topbar/brand/nav/feedback-float) deleted, each diffed line-by-line against base.css's equivalent to confirm identical computed values before deletion (documented in Gap 4); roadmap-specific rules retained, retokenized with identical resolved hex values (zero-drift renames) |
| DW-3.3 | Fix A — mobile topbar breathing room, verified ≤720px | COVERED | `@media (max-width:760px) .topbar` padding-top/bottom raised from `12px` to `var(--space-5)` (20px) — a spacing-scale token, +8px each edge; applies to roadmap.html too via the shared rule (Gap 4), so both base.css-inheriting pages and roadmap render the fix at ≤720px |
| DW-3.4 | Fix B — mobile `.grad-toggle` de-emphasized to peer of `.code-guide-btn`; desktop unchanged | COVERED | New `@media (max-width:720px) .grad-toggle` / `.grad-toggle:hover` override added in roadmap.html dropping `background:var(--accent-solid)`→`var(--background)`, `box-shadow`→`none`, adding `border:1px solid var(--border-subtle)`, matching `.code-guide-btn`'s outline-pill exactly; desktop `.grad-toggle` rule's resolved values (accent-solid fill, accent-on-solid text, accent-solid-hover on hover, identical box-shadows, identical radius/duration) confirmed byte-equal in hex terms to the pre-change literals — zero drift |
| DW-3.5 | Retokenized text/background pairs pass AA (≥4.5 body / ≥3 large); interactive elements pass AA non-text (≥3) | COVERED | Every new pairing either (a) reuses a DESIGN.md pre-measured pair verbatim, or (b) is a near-exact substitute for an already-shipped value at an equivalent or better contrast (computed by hand with the WCAG 2.x relative-luminance formula for the handful of pairs DESIGN.md's tables don't already cover — tooltip accent-7-on-ink ≈7.7:1, tooltip white-on-ink ≈13.6:1, both PASS); decorative sub-3:1 hairlines (`.swatch.rec`, tinted card borders) are pre-existing (not worsened, delta ≤0.1:1 vs shipped) and are redundant/supplementary cues (text label + connector arrows carry the actual meaning), not the sole-identification case SC 1.4.11 targets |
| DW-3.6 | design-review-agent gate | N/A THIS AGENT | Explicitly deferred to the separate design-review-agent per dispatch; this build leaves the surface review-ready |

**All items COVERED:** YES (6/6 — 5 owned by this build + 1 explicitly deferred, matching the dispatch's own framing of DW-3.6).

## Design Decisions

- **Full rename, no legacy aliases.** Verified (grep) that no in-scope shipped file
  (`rules.html`, `faq.html`, `courses.html`, `js/script.js`, `js/roadmap.js`) references any old
  var name directly — they are pure class consumers of base.css. This licenses a **clean retirement**
  of all 15 old semantic vars + roadmap's `--req`/`--white`, rather than keeping them as
  backward-compat aliases alongside the new names (which would leave two parallel naming systems
  live — against design-systems doctrine's semantic-tier discipline: an alias tier should have one
  name per intent, not two).
- **Cascade structure mirrors DESIGN.md literally**: four sequential `:root { }` blocks in
  `css/base.css` — generated ramps (pasted verbatim) → brand-pin layer (4 overrides) → site
  extensions (3 additions) → a fourth block for type/space/radius/shadow/motion tokens (DESIGN.md
  documents these in prose/tables, not ready CSS, so this block is authored from its documented
  values, category-commented for maintainability). This preserves DESIGN.md's stated normative
  override order exactly (later block wins) rather than merging into one block and reordering by hand.
- **`--blue` role classification** (design-systems doctrine, component-token discipline: a token
  should encode the role it plays, not just reuse a name that happens to match): every call site
  classified as solid-fill/border (`--accent-solid`) or text-color (`--accent-text`); the one
  DESIGN.md-explicit exception (`--req` → `--accent-solid` specifically, no slash given) followed
  literally over the general heuristic.
- **Radius: normalize all outliers, tokenize all legal values.** DESIGN.md frames radius as "the
  signature move, tokenized" with a hard "nothing else, ever" law — applied it as: 7px/10px/6px
  outliers (2 named by DESIGN.md + 2 self-discovered in code-guide.html, Gap 8) → `--radius-panel`;
  all pre-existing 8px/999px/50%/4px(sub-16px swatches only) literals → their matching token. Zero
  rendering delta (values unchanged), full token coverage (usability/design-systems doctrine:
  a token declared-but-unreferenced isn't actually "wired in").
- **Spacing/type-scale: installed, not force-retrofitted** (responsive + design-systems doctrine
  balance). DESIGN.md itself hedges both ("opportunistic, never at layout-regression risk" for
  spacing; "may stay literal if layout shifts" for its one type-scale example) and component #2's
  wording scopes required component-rule replacement to hex + semantic vars only. Applied spacing
  tokens where explicitly instructed (Fix A) and left other literals as shipped — the conservative,
  DESIGN.md-text-supported reading, given no browser MCP is available this run to verify reflow
  safety at every one of ~150 font-size/spacing call sites in the dense roadmap grid.
- **Shadow/motion tokens: wired where they're exact or DESIGN.md-named-rounding matches**
  (`--shadow-raised`/`--shadow-float` reuse DESIGN.md's own literal values; `--duration-fast`/
  `--duration-base` applied to 150/160/200ms sites, 160→150 per DESIGN.md's explicit "shipped 160ms
  rounds here"). Undefined durations (250ms chevron rotate) and undefined shadows (course-tip's
  pure-black, course-box-hover's navy-tinted) left as literals — no named token exists and inventing
  one is out of this phase's law-following mandate.
- **data-viz doctrine applied to the course-flow grid**: credit-bar segment lightness order
  (s1 navy-slate `--accent-12` < s2 brand `--accent-solid` < s3 pale `--accent-6`) preserved exactly
  as DESIGN.md's landing-spot table specifies (truthful sequential encoding, Cairo/Munzner —
  position/lightness ordering must still read as an ordered progression after retokenizing); legend
  ↔ connector-arrow color correspondence preserved (Gap 3) so the truthful-encoding contract holds
  even though the JS arrow-drawing code is out of scope.
- **usability doctrine**: Fix B reclassifies `.grad-toggle` from a coerced primary-action visual
  (solid fill + heavy shadow + full width, on an *optional* toggle) to a secondary/peer affordance
  on mobile — Nielsen #8 (aesthetic & minimalist design) / signifier-matches-actual-importance
  (Norman): a control's visual weight should track its actual necessity, and this toggle reveals
  optional supplemental content, not a required step.
- **responsive doctrine**: Fix A is a mobile-only, min-impact spacing addition (not a breakpoint
  restructure); roadmap's course-flow grid retains its horizontal-scroll container pattern
  unchanged (out of scope; not one of the two named fixes).

## Recommendation

**BUILD**
