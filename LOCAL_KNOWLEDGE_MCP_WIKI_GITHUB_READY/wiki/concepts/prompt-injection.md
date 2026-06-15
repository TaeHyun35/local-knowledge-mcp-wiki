---
title: "Prompt Injection"
type: risk
status: draft
quality_class: source-linked
review_status: mvp_validated
confidence: 0.76
risk_category: "LLM Application Security"
frameworks:
  - OWASP LLM Top 10
  - MITRE ATLAS
related_controls:
  - tool-permission-boundary
  - human-oversight-gate
  - audit-logging
source_count: 2
sources:
  - raw/ai_governance/owasp-llm-top10.md
  - raw/ai_governance/mitre-atlas.md
source_hashes: []
stale: false
created: 2026-06-04
updated: 2026-06-04
---

# Prompt Injection

## Summary

Prompt injection is an LLM application risk where untrusted instructions attempt to override the intended task, policy, or tool-use boundary. In this wiki, it is treated as a risk that must be mapped to explicit controls before an agent can use tools or update knowledge.

## Risk Definition

Prompt injection can occur when user input, retrieved documents, web pages, or tool outputs contain instructions that conflict with the trusted system or project policy.

## Why It Matters

Wiki tools often read external sources. Without clear boundaries, an agent may treat malicious source text as an instruction instead of data.

## Related Controls

- [[tool-permission-boundary|Tool Permission Boundary]]
- [[human-oversight-gate|Human Oversight Gate]]
- [[audit-logging|Audit Logging]]

## Evidence Map

| Claim | Evidence | Status |
| --- | --- | --- |
| Prompt injection is a major LLM application risk. | `raw/ai_governance/owasp-llm-top10.md` | mvp_validated |
| Adversarial AI techniques can target model behavior and tool use. | `raw/ai_governance/mitre-atlas.md` | mvp_validated |
| Tool boundaries reduce the blast radius of malicious instructions. | [[tool-permission-boundary]] | mvp_validated |

## Detection Signals

- Source text contains instructions to ignore prior rules.
- Retrieved content asks the agent to call tools or reveal secrets.
- Tool request is unrelated to the user's trusted task.

## Mitigation Notes

- Treat raw documents as data, not instructions.
- Use `run_maintenance_check` before accepting generated wiki changes.
- Require human approval for high-impact tool actions.

## Open Questions

- Should indirect prompt injection examples be stored as separate source pages?

## Maintenance Notes

- MVP_REVIEWED: Add specific OWASP section references during source review.

File updated at: 2026-06-14 18:30:00 +09:00


