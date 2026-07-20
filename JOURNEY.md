# JOURNEY.md

<!-- The structural and temporal design spec for SNU IE Navigator. Pairs with DESIGN.md (visual
tokens) once Phase 2 of .design-foundations/plans/2026-07-20-snu-ie-navigator-refinement.md locks
it — DESIGN.md does not exist yet. For visual tokens, see DESIGN.md when it lands.

This is a DESCRIPTIVE document: it records the job, journey, IA, and page specs of the 6 pages as
they ship today, verified by reading each HTML file directly. It is not a redesign proposal — the
IA is frozen per the design-refinement plan. `## Flows` and `## Marketing spine` (from the full
journey template) are intentionally omitted: new user flows are out of this phase's scope, and this
product is a reference utility, not a marketing/landing site. -->

## Job

**Job story:** When I need to decide which courses to take next, or check whether I've actually met
my major/graduation requirements, I want one organized, cohort-aware reference instead of scattered
department PDFs, old notices, and word-of-mouth from other students, so I can plan my semester and
multi-year schedule with confidence and avoid a graduation-requirement or prerequisite mistake.

**Functional job:** Identify which course to take in which term (`roadmap.html`), confirm the
degree-completion rules that apply to my specific entry cohort — 입학 학번 (`rules.html`), resolve an
edge case the standard rule doesn't obviously cover (`faq.html`), and confirm a course is actually
offered in the term I plan to take it (`courses.html`).

**Emotional job:** Feel prepared and in control of a fragmented, cohort-dependent bureaucratic
process, rather than anxious about missing a requirement, a prerequisite, or a rule that changed
between entry years.

**Social job:** Not be dependent on advisors or senior students for basic answers — and be able to
answer a fellow student's question directly (several FAQ entries read as exactly the kind of
question a junior would ask a senior: multi-major credit rules, cross-listed-department credit,
grad/undergrad cross-registration).

**Switch interview (four forces — inferred, not interview-conducted):** No Switch interview was run
for this project; the forces below are inferred from verified on-page evidence, not elicited from
users. Flagged per `journey-caveats.md` rather than presented as validated research.
- **Push:** Official information is scattered across per-학번 PDFs, sporadic department notices, and
  informal word-of-mouth; rules genuinely differ by entry cohort (교양 구조 changed at 21학번, 24학번,
  and again at 25학번 per `ruleData` in `js/script.js`; the "산업공학의 이해" B+ grade-cap rule only
  binds 26학번 and later per `faq.html`'s FAQ #3) — a rule read in the wrong place can be wrong for a
  given student's own 학번.
- **Pull:** One page, organized by 학번 and by task, with plain-language synthesis, an old/new
  course-code crosswalk, and a visual course-flow map with prerequisite arrows.
- **Anxiety:** The site repeatedly self-labels as "비공식" (unofficial) and instructs the reader to
  verify against the actual PDF, the department office, or the registration system (`rules.html`'s
  notice banner, `code-guide.html`'s closing notice, `index.html`/`code-guide.html`'s footer) — the
  site manages this anxiety by being explicit about its own authority limits rather than presenting
  itself as the system of record.
- **Habit:** Falling back on asking classmates/seniors directly, or digging through the department's
  own PDFs/notices — especially for anything the FAQ doesn't already cover, which is exactly what
  `faq.html`'s "찾는 답변이 없나요?" escalation banner and the sitewide feedback button are for.

**JTBD school used:** Klement (job-story statement format) for the write-up shape, with Moesta
four-forces framing for supporting context — a pairing `journey-caveats.md` names explicitly as
compatible. Not mixed with Ulwick/Christensen vocabulary.

---

## Journey

**Actor:** An SNU Industrial Engineering undergraduate — single-major, multi-major (복수전공/부전공),
or a 자유전공학부 student who has entered IE as their primary major (`rules.html` states this group
receives identical treatment to single-major IE students).

**Scenario:** Planning which courses to take, confirming degree-completion status against personal
입학 학번 rules, and checking real-term course availability — both as a deliberate desktop planning
session and as a fast mobile lookup between classes (both load-bearing per the seed research brief).

**Scope:** Current-state, single-actor, site-only touchpoints (the 6 live pages + the external
Google Forms and department/university pages they link to). No multi-actor service blueprint.

| Phase | Actions | Mindset | Emotion | Touchpoints | Opportunities |
|-------|---------|---------|---------|-------------|---------------|
| Arrival / orient | Land on `index.html` (bookmark, direct link, or a link shared by a classmate); scan the 4 portal cards | "Where do I find X — the roadmap, the rules, an answer, a schedule?" | Neutral, slightly rushed | `index.html` topbar + hero + portal grid | Portal-card copy is the only orientation signal; no search entry point site-wide |
| Plan the sequence | Open `roadmap.html`; hover/focus course boxes for old/new code tooltips; optionally toggle "대학원 교과목 이어보기" | "What feeds into what, and where am I in the sequence?" | Engaged, occasionally uncertain about arrow meaning (필수 vs 권장 선수과목) | `roadmap.html` (+ `code-guide.html` if the course-code format is unfamiliar) | Legend + tooltip already carry most of the cognitive load here |
| Verify requirements | Open `rules.html`; pick the 입학 학번 chip; read credit bars, required/elective pill lists, 타과 전선 인정 과목; optionally preview the source PDF | "Have I actually met this rule for my cohort — not just in general?" | Lowest point of the curve if their 학번 sits near a rule-change boundary (e.g., the 24/25학번 교양 restructure, or the 26학번 B+ cap) | `rules.html` (+ linked PDF originals) | The notice banner and cohort chips already exist to reduce this specific anxiety |
| Resolve doubts | Open `faq.html`; expand the relevant question; if unanswered, use the "문의 및 제보 폼 바로가기" CTA | "My situation isn't obviously covered by the standard rule — is there a citation?" | Recovers once a cited, specific answer is found (peak-end rule: the FAQ's inline citations to department notices are the emotional payoff of this phase) | `faq.html` (+ external Google Form, + linked department notice pages) | Escalation path already exists and is explicit |
| Confirm timing | Open `courses.html`; search/filter by keyword, type, or 학기 | "Is the course I planned actually offered when I need it?" | Neutral-to-relieved (fast, self-serve filter) | `courses.html` | The update-note already tells the student when to re-check for the most accurate confirmation |
| Recurring check-in (loyalty-loop analog) | Return directly to one specific bookmarked page each term/advising cycle, skipping the homepage; use the sitewide feedback button if something looks stale or wrong | "I already know this site — I just need one number/date" | Low-friction, brief | Any page's topbar/floating feedback button (present on all 6 pages) | This is inferred, not measured — see Research basis |

**Decision model:** Not a purchase funnel — this is a recurring-utility loop, not a conversion path,
so the persuasion-spine/AIDA models don't apply. Framed as a loyalty-loop analog (McKinsey CDJ 2009):
a first visit explores multiple sections from the homepage; a returning, time-pressured visit
(the "mobile quick-check between classes" context named in the seed research brief) is hypothesized
to skip the homepage/exploration step and land directly on one remembered page — the loop that
matters most is repeat use of `roadmap.html`/`rules.html`/`courses.html`, not a single linear path
through all 4 sections in order.

**Emotion curve:** Starts neutral at Arrival, dips at Verify-requirements (cohort-boundary rules are
the site's most legible source of anxiety — visible directly in how many disclaimer/notice blocks
cluster around `rules.html` and `code-guide.html`), and recovers at Resolve-doubts when a cited
answer lands. The residual "비공식" disclaimer running through every page keeps a low-level caution
present throughout rather than fully resolving it.

**Research basis:** UNGROUNDED / hypothesized — inferred from site structure, on-page copy, and the
seed research brief's stated JTBD (`.design-foundations/research/2026-07-20-snu-ie-navigator-redesign.md`).
No user interviews, diary studies, or analytics were reviewed. Per `journey-caveats.md`'s
journey-map-theater guidance: no owner or review cadence is assigned to this map — it is a design
input for the current plan's 3 phases, not a standing organizational artifact.

---

## IA

**Organization scheme:** Task-based (Rosenfeld/Morville ambiguous scheme) — the 4 top-level sections
map to 4 distinct student tasks (plan the course sequence / verify completion rules / resolve an
edge-case question / confirm term-by-term offering), not to an alphabetical, chronological, or
department-internal grouping.

**Structure type:** Tree — shallow and mostly flat (home + 4 siblings, all one level deep), with one
2-deep branch: `code-guide.html` hangs off `roadmap.html` and is reachable only contextually.

**Sitemap** (verified against every page's shipped `<nav>` and inter-page links — nothing invented):

```
Home (index.html)
├── 전공 로드맵 (roadmap.html)
│   └── 신 교과목 코드 읽는 방법 (code-guide.html)   — reached only via roadmap.html's hero button;
│                                                      not in the global nav; has its own
│                                                      "← 전공 로드맵으로 돌아가기" back-link
├── 이수규정 (rules.html)
├── 자주 묻는 질문 (faq.html)
└── 개설 과목 검색 (courses.html)
```

External touchpoints linked from inside this tree (real, verified, not part of the site's own IA):
official 산업공학과 homepage (`https://ie.snu.ac.kr/`, footer on `index.html`/`code-guide.html`),
two distinct Google Forms (sitewide floating feedback button:
`forms.gle/vGcq96qUARLFE2fM7`; `faq.html`-local CTA banner: `forms.gle/vJERnANYC6p6e3FY9`),
department notice pages and the SNU academic-curriculum page (inline citations inside `faq.html`
answers), and per-학번 requirement PDFs + a 2024 공과대학 공통교과목 PDF (`docs/requirements/*.pdf`,
`docs/college_common_courses_2024.pdf`, linked from `rules.html`/`faq.html`).

**Global navigation labels:** Brand mark ("IE" + "SNU IE Navigator", `aria-label="SNU IE Navigator
홈"`) functions as the Home link on every page, including `index.html` itself. Beside it, an
identical 4-item nav appears on all 6 pages, same order, same labels, verified verbatim:
"전공 로드맵" → `roadmap.html`, "이수규정" → `rules.html`, "자주 묻는 질문" → `faq.html`, "개설 과목 검색" →
`courses.html`. `index.html`'s portal-card grid repeats the same 4 items in the same order (numbered
01–04), so the homepage's own content reinforces the topbar's IA rather than proposing a different
one.

**Per-page active state (verified, not assumed):**

| Page | Nav item marked `active` | Notes |
|------|--------------------------|-------|
| `index.html` | none | No "홈" nav item exists; home is reached only via the brand mark |
| `roadmap.html` | 전공 로드맵 | Own inline-styled header; same 4 labels/order as the shared nav |
| `rules.html` | 이수규정 | |
| `faq.html` | 자주 묻는 질문 | |
| `courses.html` | 개설 과목 검색 | |
| `code-guide.html` | none | Not one of the 4 top-level sections; wayfinding is via its own back-link instead |

**Navigation model:** Global nav (sticky topbar, `position:sticky;top:0`, identical on all 6 pages)
+ one contextual forward link (`roadmap.html`'s "신 교과목 코드 읽는 방법" button) + one contextual
back-link (`code-guide.html`'s "← 전공 로드맵으로 돌아가기", the site's only breadcrumb-like element) +
a sitewide persistent floating action link (문의·제보 feedback button, present on all 6 pages — see
page specs for exactly how each page gets it) + assorted inline in-content external links (department
notices, SNU pages, PDFs) scattered through `faq.html` answers and `rules.html`'s rendered output.
No sitewide search exists; `courses.html`'s search box filters only that page's own course data.

**Validation:** NOT VALIDATED — no card sort or tree test was run. This section documents the
already-shipped structure; the design-refinement plan explicitly freezes the IA ("OUT: New IA, new
pages, re-ordered navigation, new user flows"), so validating a structure that isn't changing was
judged out of scope rather than skipped by oversight.

---

## Page specs

### index.html — Home

**Purpose:** Orient an arriving student in one glance and route them into one of the 4 task-specific
sections.

**Entry points:** Direct URL / bookmark; the brand-mark link from any other page (this page IS that
destination); no topbar nav item points here (home has no self-referencing nav entry — only the
brand mark reaches it).

**Content blocks (in order):**
1. Topbar — brand mark/home link + 4-item global nav (no item marked active).
2. Home hero — eyebrow "서울대학교 산업공학과 학업 가이드", H1 "SNU IE Navigator", one short paragraph
   naming the site's 4 areas and its promise ("필요한 정보를 빠르게 찾아 학업 계획을 세워보세요").
3. Portal grid — 4 numbered cards (01–04), one per section: 전공 로드맵 / 이수규정 / 자주 묻는 질문 /
   개설 과목 검색, each with a title, one-sentence description, and a "자세히 보기 →" affordance, in
   the same order as the topbar nav.
4. Footer — one-line "Unofficial SNU IE academic navigator" disclaimer + "Last source check:
   2026-07-13." + outbound link to the official 산업공학과 homepage.
5. Floating feedback button (fixed overlay, sitewide) — injected by `js/script.js`'s
   `initFeedbackButton()` since this page has no hardcoded one; links to an external Google Form.

**States:** Default only — static markup; no loading/empty/error state on this page itself.

**Primary CTA:** No single CTA — 4 parallel entry points (the portal cards' "자세히 보기 →"), each
routing to one of the 4 sections; picking one of them is the page's real job.

**Exit / next:** Any of the 4 section pages, or the official 산업공학과 site via the footer link.

---

### roadmap.html — 전공 로드맵 (Major Roadmap)

**Purpose:** Show the recommended undergraduate IE course sequence by term and 전공영역 (subject
area) with prerequisite relationships, so a student can decide what to take next; optionally extends
into related graduate courses.

**Entry points:** Global nav ("전공 로드맵"), homepage portal card 01, direct bookmark.

**Content blocks (in order):**
1. Topbar — same brand/nav pattern as every other page, but defined in this page's own inline
   `<style>` rather than `css/base.css` (see Gaps in the discovery doc); "전공 로드맵" marked active.
2. Roadmap hero head — eyebrow "Roadmap", H1 "산업공학과 전공 로드맵", one-line subtitle noting the
   graduate-course extension.
3. Actions row — two peer buttons: "신 교과목 코드 읽는 방법" (`code-guide.html`, quiet white
   outline-pill) and "대학원 교과목 이어보기" (`#gradToggle`, filled-blue button with a heavy box-shadow
   that expands the grid rightward to reveal 기초/심화/응용 graduate columns). The plan's Fix B targets
   this button's mobile-only over-emphasis relative to its neighbor.
4. Legend — 5-item key: 필수 선수과목 / 권장 선수과목 (arrow styles), 전공필수 / 교양필수 / 대학원 (box
   styles).
5. Prereq-notes callout — one "추가 권장 선수과목" tagged sentence covering relationships the grid's
   arrows don't otherwise encode.
6. Roadmap grid (core surface) — a horizontally scrollable CSS-grid table: 1 corner cell + 8
   term-header columns (1학년 1학기 … 4학년 2학기, +기초/심화/응용 grad columns when expanded) × 10
   전공영역 row-lanes (교양필수, 공통, 시스템설계, 시스템운영, 최적화, 확률모형, 데이터과학, 인간공학,
   기술경영, 금융공학). An absolutely-positioned SVG layer draws prerequisite connector arrows
   (required vs. recommended; direct/branch/merge/vertical routings) between course boxes. Hovering
   or focusing a course box (except 6 general-education boxes marked `data-notip` — 수학1/수학2/
   통계학및실험/공학수학1/공학수학2/컴퓨터의개념및실습) raises a tooltip with that course's old (구) and
   new (신) course codes.
   *Data-viz note for Phase 3:* this grid + SVG overlay is the site's one data-encoding surface —
   prerequisite-arrow truthfulness and legibility must survive retokenization.
7. Floating feedback button (fixed overlay, sitewide) — hardcoded directly in this page's HTML (the
   only page where it isn't JS-injected, consistent with this page loading neither `css/base.css`
   nor `js/script.js`).

**States:** Default (collapsed, undergrad-only grid) / Expanded (`aria-expanded="true"`, grid widens
to show grad columns, wrapper auto-scrolls right, chevron rotates, label swaps to "대학원 교과목
접기") / per-box tooltip show/hide on hover or focus. No empty/loading/error state — fully static
data rendered synchronously by this page's own inline `<script>`.

**Primary CTA:** The "대학원 교과목 이어보기" toggle is styled as the visually dominant action (filled,
shadow, full-width on mobile) despite being an optional reveal, not a required step — the plan
explicitly names this a hierarchy defect (Fix B), not a description of intended emphasis.

**Exit / next:** `code-guide.html` (code-literacy detail), any of the 4 global-nav sections, or the
external feedback form via the floating button.

---

### rules.html — 이수규정 (Completion Requirements)

**Purpose:** Let a student pick their 입학 학번 (entry cohort year) and see that cohort's full
graduation/major-completion requirement set assembled in one place.

**Entry points:** Global nav ("이수규정"), homepage portal card 02.

**Content blocks (in order):**
1. Topbar — shared pattern, "이수규정" marked active.
2. Section head — eyebrow "Requirements", H1 "학번별 이수규정", explanatory paragraph (states that
   자유전공학부→산업공학과 주전공 진입 students receive identical treatment to direct IE majors).
3. Notice callout (⚠) — "PDF로 확인하기": this page is an unofficial synthesis of the per-학번 PDFs;
   final graduation judgment, course-equivalence, and exceptions route through the actual PDF and the
   department office.
4. Year-picker chips — 7 quick-select buttons, 20학번–26학번; "25학번" active by default.
5. Selected-PDF link row + collapsible inline PDF preview (iframe) with a "새 탭에서 열기" fallback.
6. Rule output (JS-rendered; fully re-renders on each year-chip click) — ordered stack: summary tiles
   (졸업학점/교양/주전공/전공필수/학과 전선) → 추가 이수 요건 (+ 외국어진행강좌 기준 table) → 교양
   이수학점 table → 전공 이수학점 table + a two-row 전공 학점 구성비 bar visualization (단전공 vs.
   다전공 산업공학과 주전공생) → 전공필수 과목 pill list (구/신 코드) → 학과 전공선택 과목 pill list →
   타과 전선 인정 과목 (grouped by department, with credit badges) → 복수전공·부전공 rule list.
7. Floating feedback button (fixed overlay, sitewide) — JS-injected by `js/script.js` (this page
   links `js/script.js` in its `<head>`).

No `<footer>` element exists in this page's shipped markup (see Gaps).

**States:** Default (25학번 preselected) / Selected (any of the 7 chips re-renders the full rule
output) / PDF-preview open vs. collapsed (label swaps "미리보기" ↔ "미리보기 닫기") / out-of-range
guard exists in the render function ("지원 범위 밖 학번입니다") but its trigger input (`#studentYear`)
has no corresponding element in this page's markup, so it is currently unreachable through the
shipped UI (see Gaps — dead code path, not a user-facing state).

**Primary CTA:** Selecting a 입학 학번 chip — the entire rule-output block is gated on this choice.

**Exit / next:** The per-학번 PDF (inline preview or new-tab), or any of the 4 global-nav sections.

---

### faq.html — 자주 묻는 질문 (FAQ)

**Purpose:** Answer a fixed set of specific, citation-backed edge-case questions (credit-counting
exceptions, cohort-specific rule cutoffs, cross-program equivalence) that `rules.html`/`roadmap.html`
can't fully resolve on their own, and route unanswered questions to a feedback form.

**Entry points:** Global nav ("자주 묻는 질문"), homepage portal card 03.

**Content blocks (in order):**
1. Topbar — shared pattern, "자주 묻는 질문" marked active.
2. Section head (narrow-width section) — eyebrow "Academic FAQ", H1 "학업 관련 FAQ", one-line scope
   statement.
3. FAQ CTA banner — "찾는 답변이 없나요?" prompt + description ("사이트 오류 제보, 정보 업데이트 요청,
   학업 관련 질문을 문의 폼으로 보내주세요.") + outbound button "문의 및 제보 폼 바로가기 ↗" — a second,
   distinct Google Form from the sitewide floating button's (see IA — External touchpoints).
4. FAQ accordion list (`#faqList`, JS-rendered from a 12-item data array) — each item is a question
   button with a "+" icon plus a collapsible answer panel; the first item starts pre-opened; multiple
   items can be open simultaneously (each toggle is independent, not a mutually-exclusive accordion —
   confirmed from `initFaqs()`'s per-item `classList.toggle`). Answers cite department notices, SNU
   academic-curriculum pages, and a locally hosted PDF.
5. Floating feedback button (fixed overlay, sitewide) — JS-injected by `js/script.js`.

No `<footer>` element exists in this page's shipped markup (see Gaps).

**States:** Default (item 1 open, rest collapsed) / Toggled (any item opens/closes independently on
click). No loading/empty/error state — static data array, synchronous render.

**Primary CTA:** "문의 및 제보 폼 바로가기 ↗" — the page's explicit escalation path when the FAQ list
itself doesn't cover a student's question.

**Exit / next:** The external Google Form (page-local CTA or the sitewide floating button — two
separate forms), or any of the 4 global-nav sections.

---

### courses.html — 개설 과목 검색 (Course Search)

**Purpose:** Let a student search and filter which courses will be offered over roughly the next 2
academic years, so they can time their planned course-taking against real offering windows.

**Entry points:** Global nav ("개설 과목 검색"), homepage portal card 04.

**Content blocks (in order):**
1. Topbar — shared pattern, "개설 과목 검색" marked active.
2. Section head — eyebrow "Courses", H1 "개설 과목 탐색", explanatory paragraph + an update-note line
   citing the data's source date (2026년 3월 30일 학과 홈페이지 게시 자료) and an accuracy caveat
   (개설 여부는 해당 학기 한 학기 전 확정 자료로 확인이 가장 정확).
3. Search toolbar — one text input (magnifier glyph, placeholder examples: "데이터, 인간공학, 2026-1,
   연합전공"), filters live with a 150ms debounce.
4. Filter toolbar — 10 single-select toggle buttons: 전체 (default active) / 전공필수 / 전공선택 /
   대학원, then 6 explicit-term filters (2025-2 … 2028-1).
5. Course-count line (`aria-live="polite"`) — live "N개 과목" result count.
6. Course grid — one card per matching course: category/학년 tag, course name, a 전필/전선/교과목
   badge (omitted for 대학원 rows), and a wrapped list of "학기 · 비고" offering chips.
7. Floating feedback button (fixed overlay, sitewide) — JS-injected by `js/script.js`.

No `<footer>` element exists in this page's shipped markup (see Gaps).

**States:** Default (all courses, no query, filter = 전체) / Filtered (search text and/or filter
button narrows the grid and updates the live count) / Empty-result (an unmatched query silently
renders zero cards and "0개 과목" — no dedicated empty-state illustration or copy exists). No
loading/error state — synchronous client-side filter over an inline JS data literal.

**Primary CTA:** None — a self-serve lookup/filter tool, not a conversion page; the search input is
the primary interaction.

**Exit / next:** No page-local exit link; leaves via global nav or the sitewide floating feedback
button.

---

### code-guide.html — 신 교과목 코드 읽는 방법 (Course Code Guide)

**Purpose:** Teach a student how to decode the department's `IE.####` / `IE.G###` course-code scheme
(what each digit position means) so the codes surfaced throughout `roadmap.html` are legible, plus
provide an old→new code lookup table for known courses.

**Entry points:** Contextual only — the "신 교과목 코드 읽는 방법" button inside `roadmap.html`'s hero
actions row. Not reachable from the homepage portal grid, and although the shared 4-item topbar nav
is present, no nav item targets this page (it isn't one of the 4 top-level sections).

**Content blocks (in order):**
1. Topbar — shared pattern; no nav item marked active (this page sits outside the 4 top-level
   sections).
2. Back-link — "← 전공 로드맵으로 돌아가기", the site's only breadcrumb-style element, placed above the
   section head.
3. Section head — eyebrow "Course Code Guide", H1 "신 교과목 코드 읽는 방법", explanatory paragraph.
4. Undergraduate anatomy card — a worked example ("최적화모형 및 응용" → `IE.3351`) broken into 5
   labeled token chips (학과 코드/학년/분야/일련번호/수강순서) plus a plain-language readout sentence.
5. Undergraduate position-legend grid (2×2 cards) — one card per code position: 학년 (1–4),
   학문 분야 (9 values, 0–8), 일련번호 (기초 1–4 / 심화 5–9), 수강 순서 (0/1/2, each explained as a
   prerequisite step).
6. Graduate anatomy card — the `IE.G[분야][일련][성격]` pattern, its own 2-card grid (일련번호 borrows
   the linked undergrad course's number; 성격 = 기초/심화/응용) + a tip line restating the 9 학문분야
   digit map.
7. Old-code → new-code mapping table — 13 named example rows (과목명 / 구 교과목코드 / 신 교과목코드).
8. Notice callout (⚠) — the same "비공식 안내, 실제 수강신청 시 수강편람·수강신청 시스템에서 확인해야
   한다" disclaimer pattern used on `rules.html`.
9. Footer — "Unofficial SNU IE academic navigator." + outbound link to the official 산업공학과
   homepage (no "Last source check" date here, unlike `index.html`'s footer).

**States:** Default only — fully static; the only dynamic behavior is the sitewide feedback-button
injection guard.

**Primary CTA:** The back-link functions as the page's real "next step" (return and apply the decoded
scheme on the live roadmap) even though it's positioned as an entry breadcrumb rather than a
closing CTA.

**Exit / next:** Back to `roadmap.html` (explicit back-link), the official 산업공학과 site (footer),
or any of the 4 global-nav sections.
