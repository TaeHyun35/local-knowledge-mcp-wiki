---
title: "Audit Logging"
type: control
status: draft
quality_class: source-linked
review_status: mvp_validated
confidence: 0.72
control_category: "Traceability"
mitigates:
  - sensitive-information-disclosure
  - excessive-agency
  - model-evaluation-gap
frameworks:
  - NIST AI RMF
  - ISO/IEC 42001
source_count: 2
sources:
  - raw/ai_governance/nist-ai-rmf.md
  - raw/ai_governance/iso-iec-42001-overview.md
source_hashes: []
stale: false
created: 2026-06-04
updated: 2026-06-04
---

# Audit Logging

## Summary

Audit Logging records important wiki and agent actions so that source changes, query notes, and maintenance results can be reviewed later.

## Control Objective

Provide traceability for agent actions and wiki quality changes.

## Related Risks

- [[sensitive-information-disclosure|Sensitive Information Disclosure]]
- [[excessive-agency|Excessive Agency]]
- [[model-evaluation-gap|Model Evaluation Gap]]

## Evidence Map

| Claim | Evidence | Status |
| --- | --- | --- |
| Governance systems need documentation and accountability evidence. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |
| Management-system framing supports process records and improvement. | `raw/ai_governance/iso-iec-42001-overview.md` | mvp_validated |

## Implementation Notes

- `logs/ingest-log.md` records source ingestion.
- `logs/maintenance-log.md` records maintenance checks.
- `wiki/queries/` stores user query notes.

## Open Questions

- Should tool-call logs be separated from maintenance logs?

## Maintenance Notes

- MVP_REVIEWED: Add MCP tool-call examples after smoke testing.

File updated at: 2026-06-14 18:30:00 +09:00


