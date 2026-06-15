---
title: "Human Oversight Gate"
type: control
status: draft
quality_class: source-linked
review_status: mvp_validated
confidence: 0.73
control_category: "Governance Process"
mitigates:
  - prompt-injection
  - sensitive-information-disclosure
  - excessive-agency
frameworks:
  - EU AI Act
  - NIST AI RMF
source_count: 2
sources:
  - raw/ai_governance/eu-ai-act.md
  - raw/ai_governance/nist-ai-rmf.md
source_hashes: []
stale: false
created: 2026-06-04
updated: 2026-06-04
---

# Human Oversight Gate

## Summary

Human Oversight Gate is a control that requires human review before high-impact actions, stable knowledge promotion, or sensitive updates.

## Control Objective

Keep accountability in the loop when an agent proposes changes that affect governance knowledge, permissions, or source interpretation.

## Related Risks

- [[prompt-injection|Prompt Injection]]
- [[sensitive-information-disclosure|Sensitive Information Disclosure]]
- [[excessive-agency|Excessive Agency]]

## Evidence Map

| Claim | Evidence | Status |
| --- | --- | --- |
| Oversight is part of AI governance and risk management. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |
| Regulatory frameworks discuss human oversight for AI systems. | `raw/ai_governance/eu-ai-act.md` | mvp_validated |

## Implementation Notes

- Pages can remain `draft` until reviewed.
- `quality_class: stable` requires explicit review.
- The MVP uses review queue counts to make oversight visible.

## Open Questions

- Which actions should require mandatory approval in a production version?

## Maintenance Notes

- MVP_REVIEWED: Add final Agent Role SPEC references.

File updated at: 2026-06-14 18:30:00 +09:00


