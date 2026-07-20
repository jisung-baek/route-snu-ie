# SNU IE Navigator — Design Refinement Brief

Refine the existing SNU IE Navigator site's visual/interaction design (not a rebuild) — restrained Apple/SF-style direction, official-but-approachable feel, plus two named mobile fixes.

**Date:** 2026-07-20
**Status:** draft

## What

A static site (HTML/CSS/JS, no framework) for SNU Industrial Engineering students: an unofficial academic navigator covering major roadmap, credit/completion rules, FAQ, and course search. 6 pages: `index.html`, `roadmap.html`, `rules.html`, `faq.html`, `courses.html`, `code-guide.html`. This is a design-quality pass on a real, already-shipping product — not a from-scratch design.

## Who

SNU IE students. Two usage contexts, both load-bearing:
- **Desktop sit-down** — deliberate course/degree planning sessions
- **Mobile quick-check** — fast lookups between classes

Fully responsive is a hard requirement; no primary-device tradeoff to design around.

## Brand & Mood

**Feel target: trustworthy-official.**

Current visual identity: neutral Apple/SF-system-UI palette (`--ink:#1d1d1f`, grays, single accent `--blue:#0a5fd6`), Pretendard Variable font, restrained/minimal — reads correctly-but-plain right now, no strong personality.

**Direction confirmed: refine this existing restrained SF-style further.** Explicitly NOT pivoting to SNU institutional branding (crest, deeper navy, academic-serif) — the Apple-clean minimalism IS the "official" signal here, not an institutional one.

## JTBD

Students hire this to answer: "what do I need to take, and have I met the rules?" — replacing scattered department PDFs / word-of-mouth. No specific top-level frustration prompting this pass beyond the two named mobile issues below; otherwise this is an open "let the review agent find what's wrong" pass.

## Known Pain Points (user-reported, both mobile-only — desktop confirmed fine as-is)

1. **Topbar spacing (`.topbar`, mobile breakpoint `max-width:720px`)** — vertical padding is only `12px` top/bottom on mobile; reads pinched right at the top compared to the generous whitespace rhythm used elsewhere on the site. Fix: add mobile-appropriate breathing room around the topbar.

2. **`.grad-toggle` over-emphasis (`roadmap.html`, "대학원 교과목 이어보기")** — filled blue background + heavy box-shadow (`0 10px 26px rgba(10,95,214,.34)`), full-width on mobile. Sits next to `.code-guide-btn` (quiet white outline pill) and visually reads as *the* mandatory primary action, when it's actually an optional toggle to reveal supplemental grad-course columns — distracts and misleads on hierarchy.
   - **User confirmed desktop version is fine** — the two buttons sit side by side there and the emphasis doesn't read as jarring.
   - **Fix is scoped to the mobile breakpoint only** (CSS override inside the existing `@media (max-width:720px)` block) — either drop the blue/shadow emphasis or match `.code-guide-btn`'s neutral outline-pill treatment. Do NOT change the desktop styling of `.grad-toggle`.

## Device + Constraints

- Static HTML/CSS/JS only — no build step, no framework (React/Vue/etc.), no bundler observed in the repo.
- `roadmap.html` currently duplicates design tokens in an inline `<style>` block instead of linking `css/base.css` (the other pages link `css/base.css`) — a design-systems inconsistency worth flagging to the plan/DESIGN.md step, not something the user raised directly.
- Korean-language UI (`lang="ko"`), Pretendard Variable as primary typeface — keep.

## Open Questions

- Visual identity / design DNA beyond "refine the current SF-style direction" is not yet locked to specific tokens (exact type scale, spacing scale, motion vocabulary) — resolve in the plan's design DNA step.
- Whether `roadmap.html`'s inline-style duplication of `css/base.css` tokens should be consolidated as part of this pass, or left alone — flag for plan scoping.
- Full scope of "design problems" beyond the two named mobile issues is intentionally open — `design-review-agent` will surface the rest during the mock/build phases.

## Taste Signals

- Leans toward continued restraint/minimalism over added visual weight — the objection to `.grad-toggle` is specifically that added emphasis (color + shadow + full width) reads as false urgency, not that the button needs *more* presence.
- Whitespace/breathing room is a stated value — "웹사이트 전체적으로 여백이 많은데" (the site overall has generous whitespace) was used as the reference standard the topbar should match, not an area to compress.
- No preference stated yet for locking the current `--blue: #0a5fd6` accent vs. adjusting it — open for the plan's design DNA step.
