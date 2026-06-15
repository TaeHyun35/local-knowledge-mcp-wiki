---
title: "Risk Inventory"
type: control
status: draft
quality_class: source-linked
review_status: mvp_validated
confidence: 0.73
control_category: "Risk Management"
mitigates:
  - sensitive-information-disclosure
  - model-evaluation-gap
frameworks:
  - NIST AI RMF
  - NIST AI RMF Playbook
source_count: 2
sources:
  - raw/ai_governance/nist-ai-rmf.md
  - raw/ai_governance/nist-ai-rmf-playbook.md
source_hashes: []
stale: false
created: 2026-06-04
updated: 2026-06-04
---

# Risk Inventory

## Summary

Risk Inventory is a control that keeps track of identified risks, related controls, frameworks, evidence, and review status.

## Control Objective

Make AI governance knowledge searchable and auditable instead of leaving risk decisions in chat history.

## Related Risks

- [[sensitive-information-disclosure|Sensitive Information Disclosure]]
- [[model-evaluation-gap|Model Evaluation Gap]]

## Evidence Map

| Claim | Evidence | Status |
| --- | --- | --- |
| AI risk management needs documented risk context. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |
| A playbook can turn governance questions into maintainable records. | `raw/ai_governance/nist-ai-rmf-playbook.md` | mvp_validated |

## Implementation Notes

- Risks are stored as `type: risk` concept pages.
- Controls are stored as `type: control` concept pages.
- `map_risk_to_controls` reads `related_controls` from risk pages.

## Open Questions

- Should risks be scored by severity and likelihood in the MVP?

## Maintenance Notes

- MVP_REVIEWED: Add scoring fields only if needed for final demo.

File updated at: 2026-06-14 18:30:00 +09:00


