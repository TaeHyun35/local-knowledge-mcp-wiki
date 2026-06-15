# Governance Control Schema

## Page Types

| Type | Purpose |
| --- | --- |
| `risk` | AI governance risk page |
| `control` | Mitigation or governance control page |
| `framework` | Source framework or regulation page |
| `source_summary` | Raw source summary page |
| `query` | User query note |

## Risk Page Fields

```yaml
risk_category: "LLM Application Security"
frameworks:
  - OWASP LLM Top 10
related_controls:
  - tool-permission-boundary
```

## Control Page Fields

```yaml
control_category: "Agent Tool Governance"
mitigates:
  - prompt-injection
frameworks:
  - NIST AI RMF
```

## Required Sections

- Summary
- Evidence Map
- Related Risks or Related Controls
- Open Questions
- Maintenance Notes

파일 갱신 시각: 2026-06-04 03:05:00 +09:00
