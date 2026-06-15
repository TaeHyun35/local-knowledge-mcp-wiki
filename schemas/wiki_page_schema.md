# Wiki Page Schema

Every wiki page uses Markdown with YAML-like frontmatter.

Required common fields:

```yaml
---
title: "Page Title"
type: risk | control | framework | source_summary | query
status: draft | reviewed | stable
quality_class: source-needed | source-linked | reviewed | contradicted | stale | stable
review_status: needs_review | reviewed | rejected
confidence: 0.0
source_count: 1
sources:
  - raw/ai_governance/source.md
source_hashes: []
stale: false
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

Required sections:

- Summary
- Source Links or Related Risks/Controls
- Evidence Map
- Open Questions
- Maintenance Notes

파일 갱신 시각: 2026-06-04 03:05:00 +09:00
