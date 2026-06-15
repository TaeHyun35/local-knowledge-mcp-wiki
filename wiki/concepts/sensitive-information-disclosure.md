---
title: "Sensitive Information Disclosure"
type: risk
status: draft
quality_class: source-linked
review_status: mvp_validated
confidence: 0.72
risk_category: "Information Protection"
frameworks:
  - OWASP LLM Top 10
  - EU AI Act
related_controls:
  - audit-logging
  - human-oversight-gate
source_count: 2
sources:
  - raw/ai_governance/owasp-llm-top10.md
  - raw/ai_governance/eu-ai-act.md
source_hashes: []
stale: false
created: 2026-06-04
updated: 2026-06-04
---

# Sensitive Information Disclosure

## Summary

Sensitive information disclosure is the risk that an AI system exposes secrets, personal data, confidential records, or internal project material through model output, logs, or connected tools.

## Risk Definition

The risk includes both direct output leakage and indirect leakage through saved query notes, logs, source summaries, or copied raw content.

## Why It Matters

An MCP-served wiki can accumulate data from raw sources and user questions. It needs explicit boundaries for what can be stored, displayed, and passed to agents.

## Related Controls

- [[audit-logging|Audit Logging]]
- [[human-oversight-gate|Human Oversight Gate]]
- [[risk-inventory|Risk Inventory]]

## Evidence Map

| Claim | Evidence | Status |
| --- | --- | --- |
| LLM applications need controls for sensitive information disclosure. | `raw/ai_governance/owasp-llm-top10.md` | mvp_validated |
| Governance frameworks emphasize documentation and oversight for AI systems. | `raw/ai_governance/eu-ai-act.md` | mvp_validated |

## Detection Signals

- Output contains API keys, tokens, personal data, or confidential identifiers.
- Query notes contain raw private content.
- Logs include more data than needed for audit.

## Mitigation Notes

- Redact secrets from wiki pages.
- Keep raw source paths visible, but avoid copying sensitive raw content into concept pages.
- Store the minimum answer draft needed for review.

## Open Questions

- Should the MVP include automated secret scanning?

## Maintenance Notes

- MVP_REVIEWED: Add a separate control page for data minimization if scope expands.

File updated at: 2026-06-14 18:30:00 +09:00


