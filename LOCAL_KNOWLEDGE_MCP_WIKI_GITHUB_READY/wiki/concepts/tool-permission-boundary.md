---
title: "Tool Permission Boundary"
type: control
status: draft
quality_class: source-linked
review_status: mvp_validated
confidence: 0.76
control_category: "Agent Tool Governance"
mitigates:
  - prompt-injection
  - excessive-agency
frameworks:
  - OWASP LLM Top 10
  - NIST AI RMF
source_count: 2
sources:
  - raw/ai_governance/owasp-llm-top10.md
  - raw/ai_governance/nist-ai-rmf.md
source_hashes: []
stale: false
created: 2026-06-04
updated: 2026-06-04
---

# Tool Permission Boundary

## Summary

Tool Permission Boundary is a control that separates read-only tools from write-capable or high-impact tools, and makes tool permissions explicit for agents.

## Control Objective

Reduce prompt injection and excessive agency risk by ensuring agents can only call tools that match the user's goal and the agent's role.

## Related Risks

- [[prompt-injection|Prompt Injection]]
- [[excessive-agency|Excessive Agency]]

## Evidence Map

| Claim | Evidence | Status |
| --- | --- | --- |
| Tool permissions should be explicit for agentic systems. | `raw/ai_governance/owasp-llm-top10.md` | mvp_validated |
| Governance controls should define responsibilities and risk management actions. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |

## Implementation Notes

- `search_wiki`, `read_page`, `list_pages`, and `get_wiki_graph` are read-only.
- `save_query_note` writes to `wiki/queries/`.
- Raw source files are immutable.

## Open Questions

- Should write tools be disabled by default in the MCP server?

## Maintenance Notes

- MVP_REVIEWED: Align with final README tool table.

File updated at: 2026-06-14 18:30:00 +09:00


