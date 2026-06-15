---
title: "Model Evaluation Gap"
type: risk
status: draft
quality_class: source-linked
review_status: mvp_validated
confidence: 0.71
risk_category: "Evaluation and Monitoring"
frameworks:
  - NIST AI RMF
  - NIST AI RMF Playbook
related_controls:
  - evaluation-and-monitoring
  - risk-inventory
source_count: 2
sources:
  - raw/ai_governance/nist-ai-rmf.md
  - raw/ai_governance/nist-ai-rmf-playbook.md
source_hashes: []
stale: false
created: 2026-06-04
updated: 2026-06-04
---

# Model Evaluation Gap

## Summary

Model evaluation gap is the risk that an AI system is deployed or used without clear evaluation criteria, quality gates, monitoring signals, or review evidence.

## Risk Definition

The gap appears when a system has claims about reliability or safety but lacks measurable tests, audit evidence, or ongoing monitoring.

## Why It Matters

An LLM Wiki can become stale or misleading if source claims are not reviewed. The wiki therefore needs maintenance checks and health reports.

## Related Controls

- [[evaluation-and-monitoring|Evaluation and Monitoring]]
- [[risk-inventory|Risk Inventory]]
- [[audit-logging|Audit Logging]]

## Evidence Map

| Claim | Evidence | Status |
| --- | --- | --- |
| AI risk management requires measurement and monitoring. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |
| Playbook-style actions help turn risk concepts into checks. | `raw/ai_governance/nist-ai-rmf-playbook.md` | mvp_validated |

## Detection Signals

- No health report exists.
- Evidence Map is missing.
- Source claims are marked stable without review.

## Mitigation Notes

- Run `run_maintenance_check`.
- Generate a wiki health report before submission.
- Keep `review_status` explicit.

## Open Questions

- What confidence threshold should allow a page to become stable?

## Maintenance Notes

- MVP_REVIEWED: Add rubric-aligned acceptance criteria after MVP validation.

File updated at: 2026-06-14 18:30:00 +09:00


