# Discovery + Design: Phase 2 - Design — DNA + tokens (lock DESIGN.md)

## Artifacts Found / Current State

- **JOURNEY.md** — present at project root (Phase 1 output). Job/Journey/IA/Page specs for all 6
  pages; IA frozen, descriptive-not-validated. Read as context; this phase is tokens, not pages.
- **DESIGN.md** — absent. This phase creates and locks it (the protocol's "when this phase IS the
  one that establishes DESIGN.md" case).
- **css/base.css `:root`** — 15 semantic vars confirmed exactly as the dispatch lists them
  (`--ink #1d1d1f`, `--muted #6e6e73`, `--quiet #86868b`, `--line #e5e5e7`, `--line-strong #d2d2d7`,
  `--paper #fff`, `--wash #f5f5f7`, `--wash-2 #eef0f3`, `--blue #0a5fd6`, `--blue-soft #eef2fb`,
  `--danger #b3261e`, `--danger-soft #fbeceb`, `--warning-bg #fff8ec`, `--warning-line #f3e3c0`,
  `--warning-ink #7a5a1e`) + the Pretendard/SF font stack.
- **roadmap.html inline `:root`** — duplicates the neutral/blue set and adds `--req: #0a5fd6`
  (used once — the required-course star) and `--white: #fff` (declared, **never referenced** —
  `var(--white)` appears nowhere in the file).
- **Pretendard Variable** — loaded via jsdelivr `<link>` on **all 6 pages** (verified by grep), so
  the type system rides one real variable font sitewide.
- **Light-only** — no dark scheme anywhere; matches the plan's light-primary scope.
- **Shipped contrast audit** (measured, WCAG 2.x): brand blue is healthy — white on `#0a5fd6`
  5.80:1, `#0a5fd6` on white 5.80:1, on `--blue-soft` 5.17:1; `--muted` on white 5.07:1;
  warning ink on warning bg 6.01:1; danger on danger-soft 5.70:1. **One shipped failure:**
  `--quiet #86868b` on white = **3.62:1**, used at 13–14px body-size text (course-count,
  rule-summary labels, footer) — below the 4.5:1 AA floor.
- **Shipped radius grammar**: 8px on content panels (cards, rule rows, roadmap boxes, tooltips),
  999px on every pressable/pickable element (filters, chips, CTAs, toggles, code/badge pills),
  50% on the feedback float. Outliers: brand-mark 7px, prereq-notes 10px, 13px legend
  mini-swatches 4px.
- **Shipped motion**: `ease` keyword everywhere; 150ms (nav/links), 160ms (feedback float),
  200ms (cards, FAQ icon). Blue-tinted shadows already in use (`rgba(10,95,214,.28)`).

## Gaps

1. **The generator's solid step cannot reproduce the brand blue.** `palette.mjs` pins the accent
   solid (step 9) at the hue's cusp lightness (~L 0.585); the brand `#0a5fd6` is a deeper
   oklch(0.52 0.197 259.4). Result: at `balanced` the run **fails** contrast
   (accent-on-solid 4.46:1, exit 2), at `vivid` it fails worse (4.35:1) and goes neon; at `muted`
   it **passes (exit 0)** but its accent-9 `#557bb7` is a slate far from the brand. Resolution
   (see Design Decisions): generated `muted` ramps as the tonal system + the seed itself pinned
   verbatim into the solid/text alias slots — the seed independently passes every shipped pair.
2. **Shipped `--quiet` fails AA (3.62:1).** The token system must fix it by construction:
   `--quiet` maps to `--text-tertiary` = `neutral-10 #636973` (5.24:1 on surface). Visible
   darkening — intentional accessibility repair, flagged in the crosswalk.
3. **`--warning-line` (a border) has no landing spot in the script's functional 3/9/11 contract.**
   Resolved by harvesting the border-grade step from a full ramp run at the script's own warning
   hue (`--seed 85 --chroma muted`, exit 0): step 5 `#e8ddc5` is the fidelity match for shipped
   `#f3e3c0`.
4. **Functional ink drift**: `--danger #b3261e` → `--error-11 #86534f` is a visible desaturation
   of the 전공필수 badge red (still AA: 5.92 on surface, 5.44 on error-3). Register-consistent
   ("one vivid blue, everything else muted") but flagged for the user's lock-confirmation.
5. **Hard-coded hexes across base.css/roadmap** (`#0a54c0/#094fb3/#084fb5` hover darks,
   `#cdd9f0/#dbe6fb/#d5e0f5` tinted borders, `#0b3d91` bar navy, `#4b4b50` gray, `#f7faff`,
   `#dde7fb`…) — Phase 3 scope (DW-3.1), but DESIGN.md provides a landing-spot table so Phase 3
   has a target for every one of them.
6. Minor: half-pixel font sizes (12.5/13.5/14.5), sub-12px data labels (10.5/11.5), three
   near-duplicate hover darks — all absorbed by the type/spacing scale rules + one consolidated
   hover pin.

## Gate Status

- DESIGN.md: absent → **this phase establishes and locks it** (permitted; it is the phase's
  Produces contract). User lock-confirmation handled by the orchestrator after return.
- JOURNEY.md: present (Phase 1 complete).
- Prerequisites: met — plan file read, doctrine read, seed fixed, `node` v24 available,
  `palette.mjs` runs clean.

## DW Verification

| DW-ID | Done-When Item | Status | Evidence |
|-------|---------------|--------|----------|
| DW-2.1 | DESIGN.md locked — token block present (user confirmation orchestrated post-return) | COVERED | DESIGN.md at project root with full token block + DNA; "Status: locked — pending user lock-confirmation" header line |
| DW-2.2 | All text/background pairs pass WCAG AA (≥4.5 body, ≥3 large) via palette.mjs exit 0 | COVERED | `palette.mjs --seed "#0a5fd6" --chroma muted --harmony mono --scheme light` → **exit 0**, 6/6 PASS report pasted in DESIGN.md; + 25 supplementary measured pairs (pinned-brand and functional-on-functional) all ≥4.5, table in DESIGN.md |
| DW-2.3 | Semantic aliases (`--background`/`--surface`/`--text`/`--accent-solid`) + type scale `--text-xs`…`--text-4xl` present | COVERED | Aliases emitted by the script verbatim in the token block; type scale defined with 10 steps (2xs–4xl) mapped 1:1 onto shipped sizes |
| DW-2.4 | Functional colors (`--error/success/warning/info-*`) defined, reconciled with `--danger`/`--warning-*` | COVERED | error/success/warning/info 3/9/11 from the exit-0 run + `--warning-5` border grade from the seed-85 exit-0 run; reconciliation rows in the crosswalk (danger→error-11/error-3, warning-bg/line/ink→warning-3/5/11) |
| DW-2.5 | Every existing base.css semantic var maps onto a new token name (documented crosswalk) | COVERED | 17-row crosswalk table in DESIGN.md (15 base.css vars + roadmap `--req`/`--white`), each with old hex → new token → new hex → visual delta note; + landing-spot table for recurring hard-coded hexes |

**All items COVERED:** YES (5/5 — count matches the dispatch).

## Design Decisions

- **Archetype: Sage, Caregiver-inflected** (archetypes.md Part C: "smart, precise, rigorous,
  credible" → Sage; the site's anxiety-managing notices/cohort chips are the Caregiver
  inflection). Product register throughout — a reference utility, not a marketing surface.
- **Family: Swiss/International base** (one grotesque family = Pretendard; ONE accent; hierarchy
  from scale and placement) **+ borrowed soft-surface calm** (Apple-style wash panels, pill
  radii, generous whitespace) — the shipped direction, named. **Dominant axis: color strategy**
  — monochromatic blue discipline. Borrow count = 1, per remix rules.
- **Chroma `muted`, harmony `mono`, scheme `light`** — the decision triangle:
  (a) `muted` is the **only chroma whose run exits 0** (balanced 4.46 FAIL / vivid 4.35 FAIL on
  accent-on-solid) and the target may never be lowered; (b) shipped support colors are
  low-chroma (`#eef2fb`, `#cdd9f0` ≈ muted steps, not balanced ones) so `muted` is the fidelity
  choice; (c) ch09's "muted/sophisticated = mostly desaturated + one strong accent" is exactly
  the trustworthy-official register. `mono` because the shipped palette is literally
  monochromatic blue (ch09: monochromatic = quiet/focused); no secondary accents introduced.
  `light` per the plan (dark deferred).
- **The brand-pin layer** (the load-bearing decision): ramps are 100% generated; the alias layer
  then pins **three pre-existing shipped constants** — `--accent-solid: #0a5fd6` (the seed
  itself, verbatim — 5.80/5.50/5.10 measured on its shipped backgrounds), `--accent-on-solid:
  #ffffff` (shipped text-on-blue, 5.80), `--accent-solid-hover: #0a54c0` (the lightest of the
  three near-duplicate shipped hover darks, consolidated to one; 6.90 white-on / 6.77 on bg).
  No invented hexes: every pinned value already ships today. This makes `--blue → --accent-solid`
  a **true rename with zero brand drift** — the strongest possible reading of DW-2.5 — and
  honors the plan's edge case (hue shift Δ = 0 by construction; the generated accent-9's
  lightness drift is confined to the ramp, where it belongs, and disclosed). Per design-dna
  Pins doctrine: pinned values are user law (the plan fixed the seed).
- **Functional reconciliation**: generated muted functional set; `--danger`→`error-11` drift
  flagged (Gap 4) rather than pinned — pin budget is the seed and its two direct dependents
  only, anything more would hand-pick the palette.
- **Type**: Pretendard Variable kept with the shipped fallback stack verbatim (ch03 medium-form:
  a Korean-first variable grotesque designed for screens — the correct medium match; one family
  sitewide = Swiss discipline, no pairing risk). Scale `--text-2xs`(11)…`--text-4xl`(clamp 32–64)
  mapped 1:1 onto shipped sizes so Phase 3 renames rather than resizes; Korean tuning: body
  leading 1.5–1.7 preserved, no positive tracking on 한글 body, wide tracking reserved for
  Latin/uppercase eyebrow labels, `font-variant-numeric: tabular-nums` recommended for credit
  tables.
- **Signature move: the pill-or-panel rule** — already 100% shipped, now formalized as law:
  content sits in square-shouldered 8px panels; anything you can press or pick is a full pill.
  Subtle, checkable, template-never as a strict grammar — the deliberate move within restraint
  the dispatch asks for (not a reinvention).
- **DNA name: "Quiet Registrar"** — the trustworthy-official direction in two words: the calm
  typographic authority of an academic registrar's office, minus institutional heraldry.
- **Tools over hand-rolling**: all ramps from `palette.mjs` (two runs, both exit 0); supplementary
  pairs measured with a 15-line WCAG checker in the scratchpad (same formula as the script), not
  eyeballed. No dealer run — composition is shipped and frozen (refinement, not a new deal);
  recorded as such in DESIGN.md.

## Recommendation

**BUILD**

