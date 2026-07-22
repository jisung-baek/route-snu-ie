# Designer review — round 1

**Date:** 2026-07-22
**Artifact:** index.html (+ css/base.css)
**DESIGN.md:** ./DESIGN.md (re-read at review time, 2026-07-22)
**Viewport:** desktop (≥1120px) + mobile (≤560px)
**Scope:** 히어로 문단 ↔ portal-grid 수직 여백, 카드 내부 수직 리듬

## Summary

- BLOCK: 0
- WARN: 5
- FYI: 2

## Issues

### [WARN] 히어로↔그리드 간격을 3개 소스가 나눠 소유 — 총 96px가 아무도 의도하지 않은 합계
- **Location:** [css/base.css:274](css/base.css#L274), [css/base.css:240](css/base.css#L240), [css/base.css:294](css/base.css#L294)
- **Rule:** § Space, shape, depth — 4px 스케일, "generous **calm** spacing"
- **Evidence:** `.home-copy p` `margin: 0 0 36px` + `.home-hero` `padding-bottom: 40px` + `.portal-section` `padding-top: 20px` = **96px**. 세 값 모두 서로를 모르는 상태로 누적된 값이고, 36px은 스케일에 없는 값(32/40 사이). 우연히 `--space-24`(96px)와 같아진 것이지 설계된 값이 아님.
- **Fix suggestion:** 간격 소유권을 **한 곳**으로 통일 — `.home-copy p` margin-bottom `0`, `.home-hero` padding-bottom `0`, `.portal-section` padding-top `var(--space-16)` (64px). 히어로 문단은 이미 문장이 끝났다는 신호를 주므로 96px은 과함.

### [WARN] `.portal-card h2 { margin: auto 0 10px }` — 카드 안에 74px 빈 공허가 생김
- **Location:** [css/base.css:333-337](css/base.css#L333-L337), [css/base.css:311](css/base.css#L311)
- **Rule:** § Space — 인접 요소 간 일관성 / proximity
- **Evidence:** `min-height: 260px` + h2의 `margin-top: auto` 조합. 카드 1(본문 1줄) 실측 콘텐츠 높이 ≈186px → auto가 **약 74px**을 "01"과 제목 사이에 밀어 넣음. 번호가 천장에 홀로 떠 있고 나머지 블록이 바닥에 붙는 두 덩어리 레이아웃이 됨. 사용자가 느낀 불편의 실제 주범은 이쪽 — 문단→첫 제목까지 체감 공백이 96 + 30(카드 패딩) + 19 + 74 ≈ **219px**.
- **Fix suggestion:** `margin-top: auto`를 h2에서 떼어 `.more`로 이동(CTA만 바닥 정렬), `.num`에 `margin-bottom: var(--space-6)`, h2는 `margin: 0 0 var(--space-3)`. 카드가 내용 위→아래로 자연스럽게 흐르고 높이 정렬은 유지됨.

### [WARN] 카드 간 공백(20px)보다 카드 **내부** 공백(74px)이 3.7배 크다 — 근접성 위계 역전
- **Location:** [css/base.css:300](css/base.css#L300), [css/base.css:333](css/base.css#L333)
- **Rule:** § Direction — "authority carried by typographic order"
- **Evidence:** `.portal-grid gap: 20px` vs 카드 내부 auto 갭 ≈74px. 시각적으로 "01"과 "전공 로드맵"이 서로 다른 카드처럼 읽히고, 반대로 이웃 카드끼리는 붙어 보임.
- **Fix suggestion:** 위 항목 수정 시 자동 해소. 추가로 `gap`을 `var(--space-6)`(24px)로 올려 카드 경계를 더 분명히.

### [WARN] 스케일 밖 리터럴 다수
- **Location:** [css/base.css:240](css/base.css#L240) `92px`, [css/base.css:274](css/base.css#L274) `36px`, [css/base.css:313](css/base.css#L313) `30px`, [css/base.css:334](css/base.css#L334) `10px`, [css/base.css:294](css/base.css#L294) `100px`
- **Rule:** § Space — 4px base 스케일이 "governs tokens, new work"
- **Evidence:** 92 / 36 / 30 / 10 / 100 모두 토큰 미대응. DESIGN.md는 "기존 page-scale 리터럴은 기회가 될 때 마이그레이션"을 허용하지만, 지금 손대는 히어로/카드가 바로 그 기회.
- **Fix suggestion:** 92→`--space-24`(96), 36→0(위 항목), 30→`--space-8`(32), 10→`--space-3`(12), 100→`--space-24`(96).

### [WARN] `.portal-card` 폰트 리터럴 `26px` (h2)
- **Location:** [css/base.css:335](css/base.css#L335)
- **Rule:** § Typography — 타이포 스케일 토큰 사용
- **Evidence:** 다른 모든 크기는 `--text-*`인데 여기만 하드코딩. `--text-2xl` 계열과 동기화 안 됨.
- **Fix suggestion:** 대응 `--text-*` 토큰으로 교체(또는 토큰 신설 없이 가장 가까운 기존 단계 사용).

### [FYI] `min-height: 260px`의 목적이 "카드 높이 정렬"이라면 grid가 이미 해줌
- **Location:** [css/base.css:311](css/base.css#L311)
- **Evidence:** `grid` 기본 `align-items: stretch`로 같은 행 카드는 이미 동일 높이. `min-height`는 내용이 짧을 때 바닥을 억지로 늘리는 역할만 하며, 이번 공허의 공범.
- **Fix suggestion:** 220px로 낮추거나 제거하고 자연 높이 + stretch에 맡기기.

### [FYI] 모바일(≤560px)에서는 이 문제가 완화됨
- **Location:** [css/base.css:303-307](css/base.css#L303-L307), [css/base.css:1228-1231](css/base.css#L1228-L1231)
- **Evidence:** 1열 전환 + 본문 줄바꿈 증가로 카드 콘텐츠가 260px를 채워 auto 갭이 거의 0. 즉 **데스크톱 전용 결함**이고, 좁은 화면만 보고 테스트하면 놓친다.

## Verdict

**REVISION** (BLOCK=0, WARN=5) — 출간 차단은 아니지만 사용자가 체감한 불편이 실재하며 원인이 특정됨. 상위 2개(간격 소유권 통일, h2 auto margin 제거)만 고쳐도 체감 공백 219px → 약 120px로 정상화.
