---
title: "Excessive Agency"
type: risk
status: draft
quality_class: source-linked
review_status: mvp_validated
confidence: 0.74
risk_category: "Agentic Tool Use"
frameworks:
  - OWASP LLM Top 10
  - NIST AI RMF
related_controls:
  - tool-permission-boundary
  - human-oversight-gate
  - audit-logging
source_count: 2
sources:
  - raw/ai_governance/owasp-llm-top10.md
  - raw/ai_governance/nist-ai-rmf.md
source_hashes: []
stale: false
created: 2026-06-04
updated: 2026-06-04
---

# Excessive Agency

## Summary

Excessive agency is the risk that an AI agent can perform actions beyond the user's intended scope, especially when it can call tools, edit files, or trigger external systems.

## Risk Definition

The risk grows when an agent has broad tool permissions, unclear goals, weak approval boundaries, or no audit trail.

## Why It Matters

The project itself exposes MCP tools to agents. Therefore the wiki must document which tools are read-only, which tools write files, and which tools require human approval.

## Related Controls

- [[tool-permission-boundary|Tool Permission Boundary]]
- [[human-oversight-gate|Human Oversight Gate]]
- [[audit-logging|Audit Logging]]

## Evidence Map

| Claim | Evidence | Status |
| --- | --- | --- |
| Agentic systems require explicit tool-use boundaries. | `raw/ai_governance/owasp-llm-top10.md` | mvp_validated |
| Risk management requires governance and management functions. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |

## Detection Signals

- Agent requests write actions when a read action would suffice.
- Tool calls are not traceable to a user goal.
- Agent tries to modify raw source files.

## Mitigation Notes

- Separate read-only and write-capable MCP tools.
- Keep `raw/` immutable.
- Use review queues for any generated concept page update.

## Open Questions

- Should `save_query_note` require explicit user confirmation in a full implementation?

## Maintenance Notes

- MVP_REVIEWED: Connect this risk to the final Agent Role SPEC.

File updated at: 2026-06-14 18:30:00 +09:00


