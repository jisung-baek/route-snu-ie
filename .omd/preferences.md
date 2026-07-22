---
schema: omd.preferences/v1
design_md_hash_at_creation: 3f8c5fe65ca7d5f6
---

# Preference Log

## 2026-07-22T01:31:35.533Z — vertical-space-between-two-blocks-is-own

```omd-meta
id: pref_mrvepmy9_708371a3
timestamp: 2026-07-22T01:31:35.533Z
scope: spacing
signal: review
confidence: explicit
status: applied
applied_at: 2026-07-22T01:42:18.994Z
applied_design_md_hash: 47616155bcfc
source_agent: claude-code
source_context: ".reviews/designer-review-round-1.md"
```

Vertical space between two blocks is owned by exactly one element — never stack margin-bottom + padding-bottom + padding-top into an unintended sum.

Evidence: on index.html the home hero → portal-grid gap was `36px` (paragraph margin) + `40px` (hero padding-bottom) + `20px` (section padding-top) = 96px that nobody chose.

## 2026-07-22T01:31:35.533Z — no-spacing-literals-outside-the-4px-spac

```omd-meta
id: pref_mrvepmyb_753ebb5b
timestamp: 2026-07-22T01:31:35.533Z
scope: spacing
signal: review
confidence: explicit
status: applied
applied_at: 2026-07-22T01:42:18.994Z
applied_design_md_hash: 47616155bcfc
source_agent: claude-code
source_context: ".reviews/designer-review-round-1.md"
```

No spacing literals outside the 4px `--space-*` scale — every margin/padding/gap resolves to a token.

Evidence: `92px` / `36px` / `30px` / `22px` / `18px` / `10px` / `100px` found across the home hero and portal cards in css/base.css.
