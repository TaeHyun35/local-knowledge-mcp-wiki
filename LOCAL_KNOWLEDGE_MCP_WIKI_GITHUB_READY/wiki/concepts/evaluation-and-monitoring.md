---
title: "Evaluation and Monitoring"
type: control
status: draft
quality_class: source-linked
review_status: mvp_validated
confidence: 0.74
control_category: "Quality Assurance"
mitigates:
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

# Evaluation and Monitoring

## Summary

Evaluation and Monitoring is a control that checks wiki quality, source coverage, evidence completeness, and review queue status.

## Control Objective

Ensure that governance claims remain source-linked, reviewed, and visible in health reports.

## Related Risks

- [[model-evaluation-gap|Model Evaluation Gap]]

## Evidence Map

| Claim | Evidence | Status |
| --- | --- | --- |
| Measurement and monitoring are core to risk management. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |
| Playbook actions can be operationalized as quality checks. | `raw/ai_governance/nist-ai-rmf-playbook.md` | mvp_validated |

## Implementation Notes

- `run_maintenance_check` checks missing sources and missing Evidence Map sections.
- `wiki_health_report` summarizes page quality and review queue status.

## Open Questions

- Should the GUI show per-framework quality coverage?

## Maintenance Notes

- MVP_REVIEWED: Add health report screenshot evidence to submission.

File updated at: 2026-06-14 18:30:00 +09:00


