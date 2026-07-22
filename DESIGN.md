# Design: Quiet Registrar

**Date:** 2026-07-20 · **Status:** locked (user-confirmed 2026-07-20)
**Archetype:** Sage, Caregiver-inflected · **Register:** product/calm structure · expressive at: roadmap course-flow grid, home-hero display H1, feedback float
**Grounding:** Apple KR spec-page's typographic calm + a university 수강편람(학사요람)'s cohort-tabled authority
**DNA:** Swiss/International base (one grotesque, one accent, hierarchy by scale) + soft-surface calm borrowed from Apple-style washes · **Dominant axis:** color strategy (monochromatic blue discipline)
**Composition:** not dealt — refinement of a shipped surface. As-built composition retained: shallow task-tree IA, 1120px content column, portal-card grid, and the roadmap course-flow data grid. Recorded, not rolled.
**Pins:** seed `#0a5fd6` (plan-fixed, hue Δ = 0 by construction) · Pretendard Variable + shipped fallback stack · light scheme only (dark deferred) · IA frozen · brand constants preserved verbatim in the pin layer (`#0a5fd6`, `#ffffff`, `#0a54c0` — all pre-existing shipped values, zero invented hexes)

> Scope note: this file is the visual-token law. Structure/journey lives in JOURNEY.md.
> Phase 3 applies these tokens (rename, not recolor — see §Crosswalk); no page may introduce
> colors, radii, or type sizes outside this file.

---

## Direction

A quietly official reference — the feeling of a well-set academic bulletin that happens to be a
website. Neutral field, one working blue, generous calm spacing: authority carried by typographic
order and restraint, not by heraldry. It serves an anxious, time-pressed student who needs to
trust cohort-specific numbers at a glance, on a desktop planning session or a phone between
classes. The refinement formalizes what already ships (SF-style neutrals + `#0a5fd6`) into a
generated, WCAG-solved system — recognizably the same site, now with the palette engineered
instead of accumulated.

## Signature move

**The pill-or-panel rule.** Content sits in square-shouldered panels (`--radius-panel`, 8px);
anything you can press or pick — filters, cohort chips, CTAs, toggles, code/badge marks — is a
full pill (`--radius-pill`). Two shapes, strictly assigned: shape alone tells you what is
information and what is a choice. No radius between 8px and full-round ever appears.
(Already ~100% shipped; outliers 7px brand-mark / 10px prereq-notes normalize to 8px in Phase 3.)

## Expressive moments

Everything holds the calm structure register except:

1. **Roadmap course-flow grid** — the data moment. Density, prerequisite arrows, and the solid
   brand blue turn up here; it is the one surface allowed to be visually busy, because the
   busyness *is* the content (truthful encoding per the Phase-3 data-viz pass).
2. **Home hero H1** — the one display-type moment (`--text-4xl`, up to 64px). Nothing else on
   the site uses display scale.
3. **Feedback float** — the one floating, shadowed, solid-blue object; its lift
   (`--shadow-float`) is the largest shadow in the system.

---

## Type

- **Family (only one, sitewide):** `"Pretendard Variable", -apple-system, BlinkMacSystemFont,
  "SF Pro Display", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif` — shipped stack kept
  verbatim; loaded on all 6 pages via jsdelivr. Korean-first variable grotesque, screen-designed
  (correct medium-form match); real weights only, never faux bold/italic.
- **Scale** (mapped 1:1 onto shipped sizes so Phase 3 renames, not resizes):

| Token | Value | Role (shipped sizes it absorbs) |
|---|---|---|
| `--text-2xs` | 11px | data-bar labels ONLY (10.5/11.5 round here); Korean floor — never for prose |
| `--text-xs` | 12px | badges, code pills, roadmap course boxes, term heads (12) |
| `--text-sm` | 13px | captions, footer, summary labels, tooltip meta (13; 12.5→13) |
| `--text-base` | 14px | default UI — nav, buttons, chips, tables, notices (14; 13.5→14) |
| `--text-md` | 15px | elevated UI — brand, eyebrow, card copy (15; 14.5→15) |
| `--text-lg` | 16px | reading body — FAQ answers, long prose; search inputs (16px also prevents iOS focus-zoom) |
| `--text-xl` | 18px | card titles, FAQ question buttons (18; 17→18, ties round up) |
| `--text-2xl` | 22px | panel headings — rule-section h2 (22) |
| `--text-3xl` | clamp(28px, 4.4vw, 48px) | section-head H1 |
| `--text-4xl` | clamp(32px, 5.2vw, 64px) | home hero H1 only |

  Rounding rule: off-scale sizes round to the nearest step, ties up. One-off 26px (portal h2)
  → `--text-3xl` floor (28px) pending a Phase-3 render check; may stay literal if layout shifts.
- **Leading:** `--leading-display: 1.06` (1–2-line heads only; use 1.15+ if a head wraps to 3
  lines — hangul fills the em-box) · `--leading-tight: 1.3` (card titles, box labels) ·
  `--leading-ui: 1.5` (UI strings) · `--leading-body: 1.6` (default Korean prose) ·
  `--leading-loose: 1.7` (FAQ answers). Korean body never below 1.5.
- **Weights:** `--weight-regular: 400` · `--weight-medium: 500` (nav) · `--weight-semibold: 600`
  (labels, chips, links) · `--weight-bold: 700` (headings) · `--weight-black: 900` (roadmap
  required-star only).
- **Tracking:** `--tracking-none: 0` (all 한글 — never positive-track hangul body) ·
  `--tracking-wide: 0.02em` / `--tracking-wider: 0.04em` (Latin/uppercase eyebrow labels and
  numeric tags only).
- **Numerals:** use `font-variant-numeric: tabular-nums` on credit tables, year chips, and the
  credit-bar figures (Pretendard supports it) so cohort numbers align.
- Naming note: `--text` / `--text-secondary` / `--text-tertiary` are **colors**;
  `--text-<size>` steps are **sizes**. Both families are contract-fixed; don't rename either.

---

## Color tokens

Generated output pasted verbatim, then the brand-pin layer, then site extensions. The cascade
order below is normative: pins and extensions load **after** the generated block.

### 1 · Generated ramps — `palette.mjs`, exit 0

Command: `node palette.mjs --seed "#0a5fd6" --chroma muted --harmony mono --scheme light`

```css
/* Generated by design-for-ai palette.mjs */
/* seed: derived from #0a5fd6 (oklch 0.52 0.197 259.4) · chroma: muted · harmony: mono */

:root {
  --neutral-1: #fcfdfd;
  --neutral-2: #f8f9fa;
  --neutral-3: #eff0f3;
  --neutral-4: #e6e8ec;
  --neutral-5: #dbdee3;
  --neutral-6: #ced2d9;
  --neutral-7: #bfc4cc;
  --neutral-8: #a5abb4;
  --neutral-9: #747b85;
  --neutral-10: #636973;
  --neutral-11: #60636a;
  --neutral-12: #2c2e31;
  --accent-1: #fbfdff;
  --accent-2: #f5f9ff;
  --accent-3: #e8f1ff;
  --accent-4: #dbe9ff;
  --accent-5: #cddffd;
  --accent-6: #bcd4f9;
  --accent-7: #a9c5f2;
  --accent-8: #8bace1;
  --accent-9: #557bb7;
  --accent-10: #4669a1;
  --accent-11: #4e6487;
  --accent-12: #232e40;
  --accent-on-solid: #080d16;
  --error-3: #ffebe9;
  --error-9: #c56c65;
  --error-11: #86534f;
  --success-3: #e6f6e6;
  --success-9: #84cc86;
  --success-11: #486e49;
  --warning-3: #f6f0e4;
  --warning-9: #ceb47e;
  --warning-11: #6f6144;
  --info-3: #e7f2fa;
  --info-9: #7aabce;
  --info-11: #4c677a;
  --background: var(--neutral-1);
  --surface: var(--neutral-2);
  --surface-hover: var(--neutral-3);
  --surface-active: var(--neutral-4);
  --border-subtle: var(--neutral-6);
  --border: var(--neutral-7);
  --border-strong: var(--neutral-8);
  --text-secondary: var(--neutral-11);
  --text: var(--neutral-12);
  --accent-bg-subtle: var(--accent-3);
  --accent-solid: var(--accent-9);
  --accent-solid-hover: var(--accent-10);
  --accent-text: var(--accent-11);
}

/* Contrast report (WCAG 2.x)
   PASS  [light] neutral-11 on neutral-2: 5.68:1 (target 4.5:1)
   PASS  [light] neutral-12 on neutral-2: 12.91:1 (target 7:1)
   PASS  [light] neutral-12 on neutral-3: 12:1 (target 4.5:1)
   PASS  [light] accent-11 on neutral-2: 5.69:1 (target 4.5:1)
   PASS  [light] accent-11 on accent-2: 5.69:1 (target 4.5:1)
   PASS  [light] accent-on-solid on accent-9: 4.51:1 (target 4.5:1)
*/
```

Exit code: **0** (6/6 PASS). `balanced` (4.46:1) and `vivid` (4.35:1) both fail the
accent-on-solid pair — `muted` is the only passing chroma and also the fidelity match for the
shipped low-chroma support colors (`#eef2fb`, `#cdd9f0`).

### 2 · Brand-pin layer (overrides three aliases; loads after the block above)

The generator pins its solid at cusp lightness (~L 0.585); the brand blue is a deeper
oklch(0.52 0.197 259.4). Rather than let the ramp restyle the brand, the alias layer pins the
seed itself — every pinned hex already ships today; none is invented:

```css
:root {
  /* the seed, verbatim — the site's one vivid object */
  --accent-solid: #0a5fd6;
  --accent-text: #0a5fd6;        /* blue-as-text: same single brand constant */
  --accent-on-solid: #ffffff;    /* shipped text-on-blue */
  --accent-solid-hover: #0a54c0; /* shipped hover dark; consolidates #0a54c0/#094fb3/#084fb5 → one token */
}
```

Measured evidence for every pinned pair (same WCAG 2.x formula as the script):

| Pair | Ratio | Target | Verdict |
|---|---|---|---|
| `#ffffff` on `--accent-solid #0a5fd6` | 5.80:1 | 4.5 | PASS |
| `--accent-text #0a5fd6` on `--background #fcfdfd` | 5.69:1 | 4.5 | PASS |
| `--accent-text` on `--surface #f8f9fa` | 5.50:1 | 4.5 | PASS |
| `--accent-text` on `--accent-3 #e8f1ff` | 5.10:1 | 4.5 | PASS |
| `--accent-text` on `--accent-4 #dbe9ff` | 4.73:1 | 4.5 | PASS (boundary — prefer `--accent-11/12` on tints deeper than accent-4) |
| `#ffffff` on `--accent-solid-hover #0a54c0` | 6.90:1 | 4.5 | PASS |
| `--accent-solid` on `--background` (non-text UI) | 5.69:1 | 3.0 | PASS |
| `--accent-solid-hover` on `--background` (non-text UI) | 6.77:1 | 3.0 | PASS |

The generated `--accent-9/-10` remain in the ramp as structural steps (data-viz mid-tones,
future dark-scheme anchors) — they are **not** brand surrogates; UI solids always use the pin.

### 3 · Site extensions (all values are ramp steps — no new hexes)

```css
:root {
  /* third text tier — fixes shipped --quiet's 3.62:1 AA failure by construction */
  --text-tertiary: var(--neutral-10);   /* #636973 · 5.24:1 on --surface, 5.42:1 on --background */

  /* the site's hairline weights sit lighter than the generator's border aliases */
  --border-faint: var(--neutral-4);     /* shipped --line #e5e5e7 grade */
  /* shipped --line-strong maps to the generated --border-subtle (neutral-6) */

  /* warning border grade — generated by the same engine at the script's own warning hue:
     node palette.mjs --seed 85 --chroma muted --harmony mono --scheme light  (exit 0), step 5 */
  --warning-5: #e8ddc5;
}
```

Supplementary measured pairs (beyond the script's report — all PASS):

| Pair | Ratio | Target |
|---|---|---|
| `--error-11 #86534f` on `--error-3 #ffebe9` | 5.44:1 | 4.5 |
| `--error-11` on `--surface` | 5.92:1 | 4.5 |
| `--warning-11 #6f6144` on `--warning-3 #f6f0e4` | 5.33:1 | 4.5 |
| `--warning-11` on `--surface` | 5.74:1 | 4.5 |
| `--success-11 #486e49` on `--success-3 #e6f6e6` | 5.19:1 | 4.5 |
| `--info-11 #4c677a` on `--info-3 #e7f2fa` | 5.24:1 | 4.5 |
| `--text-secondary #60636a` on `--surface-hover #eff0f3` | 5.28:1 | 4.5 |
| `--text-tertiary #636973` on `--surface-hover` | 4.85:1 | 4.5 |
| `--text #2c2e31` on `--accent-3` | 11.97:1 | 4.5 |

### Color budget (usage law)

- **One vivid object:** `#0a5fd6` (solid + text via the pin) is the only saturated color in the
  chrome. It marks wayfinding (active nav, eyebrows, links), actions, and requirement-critical
  data (필수 marks, prerequisite arrows, credit segments) — never ambient decoration.
- Everything else is muted: neutrals for structure, accent 1–8 for tinted washes/borders,
  functional 3/5/11 for notice surfaces. Functional **9** steps are reserved for future
  solid-fill status chips; current pages use only 3/5/11 grades.
- Red conventions: `--error-*` carries the required/danger semantics (전공필수 badge, future
  error states). Never red for success, never blue text that isn't a link/label affordance on
  prose surfaces, no color-only meaning — required badges keep their text label, arrows keep
  their legend (redundant cues).

---

## Space, shape, depth

- **Spacing scale** (4px base; governs tokens, new work, and Fix A — untouched legacy literals
  migrate opportunistically, never at layout-regression risk, but any block you edit migrates
  in the same pass):
  `--space-1: 4px` · `--space-2: 8px` · `--space-3: 12px` · `--space-4: 16px` ·
  `--space-5: 20px` · `--space-6: 24px` · `--space-7: 28px` · `--space-8: 32px` ·
  `--space-10: 40px` · `--space-12: 48px` · `--space-16: 64px` · `--space-18: 72px` ·
  `--space-24: 96px` · page gutter: `--gutter: clamp(20px, 5vw, 48px)` (shipped, formalized).
  Every margin, padding, and `gap` resolves to a token — an off-scale literal is a defect, not
  a fine-tune.
- **One owner per gap** — the vertical space between two blocks belongs to exactly one element,
  never to a sum. A trailing `margin-bottom` plus a section `padding-bottom` plus the next
  section's `padding-top` produces a number nobody chose (the home hero shipped 36+40+20=96px
  that way, reading as a dead band). Prefer the *receiving* section's `padding-top` as the owner
  and zero the others; inside a flex/grid container, `gap` owns it. Corollary: `margin-top: auto`
  belongs on the element you actually want pinned to the bottom (the CTA), never mid-stack where
  it inflates into a void on short content.
- **Radius** (the signature move, tokenized):
  `--radius-micro: 4px` (sub-16px swatches only) · `--radius-panel: 8px` (all content panels) ·
  `--radius-pill: 999px` (all pressable/pickable) · `--radius-round: 50%` (feedback float).
  Nothing else, ever. Shipped 7px/10px outliers normalize to `--radius-panel` in Phase 3.
- **Borders:** 1px hairlines only — `--border-faint` (card/list hairline), `--border-subtle`
  (stronger hairline: chips, pdf frame, footer rule), `--accent-6` (tinted emphasis borders),
  `--warning-5` (notice border). The 2px white separators inside credit bars stay
  `--background`-colored (data separators, not borders). Alpha exception: the sticky topbar's
  `rgba(0,0,0,.08)` hairline and translucent white fill may keep alpha (backdrop-blur surfaces
  need it); everything opaque uses tokens.
- **Shadows** (hue-true — blue-tinted from the pinned brand, never pure black; all shipped,
  now tokenized against the new ink `#2c2e31`):
  `--shadow-raised: 0 8px 22px rgba(44, 46, 49, 0.12)` (tooltip/label lift) ·
  `--shadow-float: 0 14px 34px rgba(10, 95, 214, 0.28), 0 4px 10px rgba(44, 46, 49, 0.12)`
  (feedback float only — the system's largest shadow, one per page) ·
  `--shadow-float-hover: 0 16px 38px rgba(10, 95, 214, 0.34), 0 5px 12px rgba(44, 46, 49, 0.14)`
  (the float's hover lift) · `--shadow-node-hover: 0 8px 20px rgba(24, 33, 47, 0.18)`
  (roadmap course-box hover — a data-node lift, deeper/neutral vs the brand-tinted float) ·
  `--shadow-mark: 0 2px 8px rgba(10, 95, 214, 0.24)` (the 28px topbar brand tile — the smallest
  shadow in the system; a soft blue halo, not a lift. It is the *only* shadow allowed on a
  non-interactive object, licensed because the mark is a brand asset rather than chrome).
- **Overlay + focus** (added Phase 3 — the alpha layer the token set initially missed):
  `--overlay-hairline: rgba(255, 255, 255, 0.38)` (the float's translucent white rim) ·
  `--overlay-surface: rgba(255, 255, 255, 0.94)` (the floating label's near-opaque white fill).
  Alpha is intentional and confined to the one floating object (the DESIGN.md expressive moment) —
  a second sanctioned alpha use alongside the topbar's backdrop-blur exception, not a general licence.
  `--focus-ring: var(--accent-solid)` — the single focus indicator; a **solid** `#0a5fd6` ring at
  `outline-offset` clears 3:1 non-text (5.69:1 on the page field), replacing the shipped faint
  `rgba(10,95,214,.28)` ring (1.54:1) that failed WCAG 1.4.11 / 2.4.11 focus-appearance.

---

## Motion

- **Timing:** `--duration-fast: 150ms` (links, chips, color/hover swaps; shipped 160ms rounds
  here) · `--duration-base: 200ms` (card lift, FAQ icon rotate, tooltip fade).
  **Easing:** `ease` (shipped keyword, kept — no springs).
- **Allowed:** state-change only — opacity fades, ≤4px translateY hovers, the FAQ "+" 45°
  rotate, tooltip show/hide, the roadmap grad-column expand (+ its auto-scroll).
- **Never:** ambient/looping motion, parallax, bounce/spring easing, movement on page load.
- **prefers-reduced-motion:** collapse transform hovers to opacity-only; grad-expand
  auto-scroll becomes an instant jump; tooltip transitions drop to 0ms. (Not yet shipped —
  Phase 3+ wiring guidance.)

---

## Crosswalk — existing var → new token (DW-2.5: Phase 3 is a rename, not a recolor)

Every `css/base.css` semantic var + roadmap.html's two extras. Δ names the visual shift honestly.

| Shipped var (value) | New token | New value | Δ / note |
|---|---|---|---|
| `--ink #1d1d1f` | `--text` | `#2c2e31` | near-black softens one step; 12.91:1 held |
| `--muted #6e6e73` | `--text-secondary` | `#60636a` | slightly darker; AA margin 5.07→5.68 |
| `--quiet #86868b` | `--text-tertiary` | `#636973` | **intentional AA fix**: 3.62→5.24 — visibly darker; tiers 2/3 nearly converge (accepted) |
| `--line #e5e5e7` | `--border-faint` | `#e6e8ec` | imperceptible |
| `--line-strong #d2d2d7` | `--border-subtle` | `#ced2d9` | minor cool shift |
| `--paper #ffffff` | `--background` | `#fcfdfd` | field goes off-white (~1% dimmer) |
| `--wash #f5f5f7` | `--surface` | `#f8f9fa` | cards a hair lighter |
| `--wash-2 #eef0f3` | `--surface-hover` | `#eff0f3` | near-exact |
| `--blue #0a5fd6` | `--accent-solid` / `--accent-text` | `#0a5fd6` | **exact — zero brand drift** (pinned seed; hue Δ = 0) |
| `--blue-soft #eef2fb` | `--accent-bg-subtle` | `#e8f1ff` | slightly bluer wash |
| `--danger #b3261e` | `--error-11` | `#86534f` | **flagged**: visible desaturation of the 전공필수 red (register-consistent; AA 5.92/5.44) — user call at lock-confirmation |
| `--danger-soft #fbeceb` | `--error-3` | `#ffebe9` | near-exact |
| `--warning-bg #fff8ec` | `--warning-3` | `#f6f0e4` | slightly deeper cream |
| `--warning-line #f3e3c0` | `--warning-5` | `#e8ddc5` | minor; same visibility delta vs its bg |
| `--warning-ink #7a5a1e` | `--warning-11` | `#6f6144` | slightly deeper olive; 5.33 on its bg |
| roadmap `--req #0a5fd6` | `--accent-solid` | `#0a5fd6` | exact (duplicate of `--blue` — collapses) |
| roadmap `--white #fff` | — retire | — | declared but never referenced; roles covered by `--background` / `--accent-on-solid` |

### Landing spots for recurring hard-coded hexes (Phase 3 / DW-3.1 guidance)

| Shipped literal(s) | Token | Note |
|---|---|---|
| `#0a54c0`, `#094fb3`, `#084fb5` (hover darks) | `--accent-solid-hover` | 3 ad-hoc darks → 1 pinned token |
| `#cdd9f0`, `#d5e0f5`, `#dbe6fb`, `#c9d7f2` (tinted borders) | `--accent-6` | emphasis/tinted border grade |
| `#f7faff` (tinted card bg) | `--accent-2` | near-exact |
| `#dde7fb` (pdf-link hover bg) | `--accent-4` | close |
| `rgba(10,95,214,.08)` (nav hover/active wash) | `--accent-3` | or keep alpha-of-pin; pick once in Phase 3 |
| `#0b3d91` (credit-bar segment s1) | `--accent-12` | navy desaturates to slate-navy; lightness order s1 < s2 < s3 preserved (truthful sequential encoding) |
| `#4b4b50` (list text on wash) | `--text-secondary` | slight lighten; AA held on all washes |
| `#4b6ca8` (roadmap foundation-box text) | `--accent-11` | the reserved deep-accent text step |
| `#fafafa` (roadmap lane bg) | `--surface` | near-exact |
| `#fff` fills / `color:#fff` on blue | `--background` / `--accent-on-solid` | by role |

---

## Never (this project's tells at risk)

- **No second accent hue.** One blue. Success/info/warning solids exist as tokens, not as chrome.
- **No gradients, anywhere.** Flat fills only — the vivid pin does the work.
- **Never substitute the ramp's `--accent-9 #557bb7` slate for the pinned brand solid** (or
  vice versa). The pin is the brand; the ramp is structure.
- **No dark-mode improvisation.** Dark is a deferred, separate `palette.mjs` run + pin re-verify.
- **No glassmorphism spread** — backdrop blur stays confined to the shipped topbar.
- **No third radius** between panel and pill; no mixed-radius decoration (the signature is the law).
- **No stacked gap ownership** — margin + padding + padding across a seam is always a bug, even
  when the sum happens to land on a token.
- **Blue never ambient** — no blue washes behind long prose, no blue section backgrounds.
- **Don't re-vivid the functional colors** — the muted register is the system.
- **No letterspaced 한글 body; no faux bold/italic** (Pretendard Variable has real weights).
- **No SNU-institutional pivot** — no crest navy, no academic serif (plan constraint).

## Open questions

- Dark scheme: deferred by plan. When warranted, run the same command with `--scheme dark` and
  re-verify all three pins against dark surfaces (the white on-solid pin will need re-solving).
- `--danger` → `--error-11` desaturation: **RESOLVED (user, 2026-07-20) — accept the calmer muted
  clay red `#86534f`.** Register-consistent; 전공필수 badge keeps its text label. No re-pin.
- `--info-*` (hue 240) sits near the brand hue (259): reserved for future informational
  callouts; today's update-note stays a neutral surface. Revisit only if info-chrome appears.
- 26px portal h2 → `--text-3xl` floor (28px): confirm in a Phase-3 render before committing.
- **Idle non-text contrast on text-labeled controls: RESOLVED (user, 2026-07-20) — accepted.**
  The idle 1px `--border-subtle` boundary on `.filter` / `.year-chip` / `.code-guide-btn` /
  mobile `.grad-toggle` computes to 1.49:1 on `--background`, under the 3:1 non-text floor. Kept
  deliberately: each control is identified by its text label at ≥4.5:1, so WCAG 1.4.11 is
  satisfied by the label — the hairline is decorative, not the sole affordance. Pre-existing and
  not worsened by retokenizing (shipped value was ~1.28:1). Preserves the restrained "Quiet
  Registrar" calm. **Scope note:** the 3:1 non-text rule applies where a boundary/indicator is a
  control's *sole* affordance — e.g. the focus ring (fixed this phase to 5.69:1). It is not
  applied to decorative borders on text-labeled controls. A future explicitly-scoped a11y pass may
  add a tinted idle fill if stronger affordance is wanted (touch targets < 44px noted there too).
