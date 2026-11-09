# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** SNU Industrial Engineering undergraduates, whether single-major, 복수전공/부전공, or 자유전공학부 students who entered IE as their primary major. They use the site to plan which courses to take in which term and to check that they meet the graduation requirements for their own 입학 학번. Use happens in two settings: a deliberate desktop planning session (especially around 수강신청), and a quick phone lookup between classes.
- **Secondary (confirmed 2026-11-08):**
  - Freshmen and 자유전공 students still deciding whether to choose IE, who want to see what the major involves.
  - Students from other departments taking IE as a 복수전공/부전공, for whom the multi-major rules matter most.
  - Advisors, 학생회, and seniors who link students to the site to answer a question, rather than using it themselves.

## Product Purpose

The department's official information is spread across per-학번 PDFs, occasional notices, and word of mouth, and the rules really do differ by entry cohort. Route SNU IE gathers it into one cohort-aware reference: a major roadmap with prerequisite flow, 학번-specific 이수규정, upcoming course offerings, a 교양 guide, a course-code crosswalk, and an FAQ.

Success means (all confirmed):
- **Fewer repeated questions:** students answer their own questions instead of asking seniors, 학생회, or the department office.
- **No requirement mistakes:** nobody misses a graduation requirement or prerequisite because of the site, so accuracy outranks everything else.
- **A per-semester bookmark:** students come back steadily during 수강신청 periods, measured through PostHog (see `ANALYTICS.md`).
- **Low-effort upkeep:** future 학술부 members can keep the data current without design or development skills.

## Positioning

A student-made, explicitly unofficial guide maintained by the 학술부 of unit.ie, the SNU IE student club. Unlike the department site, it is organized by task and by 입학 학번, puts plain-language summaries next to the source PDFs, and draws the course sequence as a single map. It is a reference for interpreting the rules, not the system of record, and it says so on every page.

## Operating Context

- Static multi-page site with 7 pages: `index`, `roadmap`, `rules`, `courses`, `liberal-arts`, `code-guide`, and `faq`. It deploys on Vercel from `main`.
- Course offerings regenerate automatically from the department post's Excel file (uid=1613) through a daily GitHub Action, which opens a PR or, when the file can't be parsed, an Issue for a human to review (`docs/개설과목-자동업데이트-운영.md`). The department office has agreed to keep that format and tell 학술부 before changing it.
- Students arrive through bookmarks, links shared by classmates, and links from 학생회 or seniors.
- Questions the site doesn't answer go to an external Google Form through the sitewide feedback entry and the FAQ's "찾는 답변이 없나요?" banner.
- Maintenance passes from one 학술부 cohort to the next.

## Capabilities and Constraints

- Rules are cohort-dependent: the 교양 structure changed at 21, 24, and 25학번, and some rules apply only from a given 학번 onward (e.g. the 산업공학의 이해 B+ cap from 26학번). Any content must state which cohorts it applies to.
- Offering data comes from a plan made about two years in advance and can change (sabbaticals, leave). The site must never imply an offering is guaranteed.
- Every page carries a source date and points to official material as the final authority.
- Analytics stays anonymous: no `identify()`, and inputs are masked in session replay.
- The IA of the 7 pages is established (`JOURNEY.md`). New flows are outside the current scope unless the user opens them.
- Maintainability is a product requirement. Data updates should stay possible for a non-developer, using generated files and PR review rather than hand-editing markup.

## Brand Commitments

- Name: **Route SNU IE**.
- It is a unit.ie 학술부 project. It must not pass as an official department or university site, so no SNU crest or institutional pivot.
- Voice is plain and factual (담백): no slogan headlines, no hype such as "한 번에/한눈에", and no rhetorical questions. The home H1 stays "Route SNU IE".
- The "비공식 / 최종 기준은 학과 공식 자료" disclaimer is a standing commitment.
- Cut padding, never information (user correction, 2026-11-08). Remove decorative or AI-style filler (English eyebrows, hype, captions that repeat the title). Keep every sentence that tells the student something. The home page may stay minimal (title, one factual line, line pictogram, no big numbers), but rules pages keep the live site's full level of detail, and the course filters must not lose any capability the live site has.
- Visual standard (2026-11-08 redesign round): the familiar Korean service-guide layout, built to Toss's level of finish. Mock: `.design-foundations/mocks/v7/`.

## Evidence on Hand

- Source documents: `docs/requirements/` (per-학번 rules PDFs), `docs/college_common_courses_2024.pdf`, `docs/ie_codes.xlsx` (old/new code crosswalk), `docs/roadmap_images/`.
- Live course data: `js/courses-data.js`, generated from the department Excel.
- Job, journey, and page specs: `JOURNEY.md`. Its Switch forces are inferred, not interview-based.
- Analytics taxonomy: `ANALYTICS.md`.
- **Absent, do not fabricate:** user testimonials, usage numbers, survey results, or any department endorsement beyond the office's agreement on the course-data format.

## Product Principles

1. **Accuracy over completeness.** A missing answer is better than a wrong one. When unsure, link to the source and say so.
2. **Cohort first.** Every rule is read through the student's 입학 학번, never as a general statement.
3. **Honest about authority.** State the source, the date, and the unofficial status plainly, without hedging the content into uselessness.
4. **Answer the question a junior would ask a senior.** Prioritize real repeated questions over exhaustive coverage.
5. **Maintainable by the next cohort.** Prefer generated data, reviewable PRs, and simple static pages over cleverness one maintainer understands.

## Accessibility & Inclusion

- WCAG 2.x AA contrast across the site (already engineered into `DESIGN.md`).
- Korean-first readability (prose line height of at least 1.5, no letter-spaced 한글).
- Mobile lookups must work fully at phone width; this is a load-bearing use case, not a fallback.
