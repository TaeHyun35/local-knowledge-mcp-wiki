window.WIKI_DATA = {
  "project": "AI Governance Control Wiki",
  "summary": {
    "page_count": 13,
    "risk_count": 4,
    "control_count": 5,
    "needs_review": 0
  },
  "pages": [
    {
      "slug": "audit-logging",
      "title": "Audit Logging",
      "type": "control",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.72",
      "path": "wiki/concepts/audit-logging.md"
    },
    {
      "slug": "eu-ai-act",
      "title": "EU AI Act",
      "type": "framework",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.72",
      "path": "wiki/concepts/eu-ai-act.md"
    },
    {
      "slug": "evaluation-and-monitoring",
      "title": "Evaluation and Monitoring",
      "type": "control",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.74",
      "path": "wiki/concepts/evaluation-and-monitoring.md"
    },
    {
      "slug": "excessive-agency",
      "title": "Excessive Agency",
      "type": "risk",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.74",
      "path": "wiki/concepts/excessive-agency.md"
    },
    {
      "slug": "human-oversight-gate",
      "title": "Human Oversight Gate",
      "type": "control",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.73",
      "path": "wiki/concepts/human-oversight-gate.md"
    },
    {
      "slug": "mitre-atlas",
      "title": "MITRE ATLAS",
      "type": "framework",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.73",
      "path": "wiki/concepts/mitre-atlas.md"
    },
    {
      "slug": "model-evaluation-gap",
      "title": "Model Evaluation Gap",
      "type": "risk",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.71",
      "path": "wiki/concepts/model-evaluation-gap.md"
    },
    {
      "slug": "nist-ai-rmf",
      "title": "NIST AI RMF",
      "type": "framework",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.78",
      "path": "wiki/concepts/nist-ai-rmf.md"
    },
    {
      "slug": "owasp-llm-top10",
      "title": "OWASP LLM Top 10",
      "type": "framework",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.77",
      "path": "wiki/concepts/owasp-llm-top10.md"
    },
    {
      "slug": "prompt-injection",
      "title": "Prompt Injection",
      "type": "risk",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.76",
      "path": "wiki/concepts/prompt-injection.md"
    },
    {
      "slug": "risk-inventory",
      "title": "Risk Inventory",
      "type": "control",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.73",
      "path": "wiki/concepts/risk-inventory.md"
    },
    {
      "slug": "sensitive-information-disclosure",
      "title": "Sensitive Information Disclosure",
      "type": "risk",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.72",
      "path": "wiki/concepts/sensitive-information-disclosure.md"
    },
    {
      "slug": "tool-permission-boundary",
      "title": "Tool Permission Boundary",
      "type": "control",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.76",
      "path": "wiki/concepts/tool-permission-boundary.md"
    }
  ],
  "pageDetails": {
    "audit-logging": {
      "slug": "audit-logging",
      "title": "Audit Logging",
      "type": "control",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.72",
      "path": "wiki/concepts/audit-logging.md",
      "meta": {
        "title": "Audit Logging",
        "type": "control",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.72",
        "control_category": "Traceability",
        "mitigates": [
          "sensitive-information-disclosure",
          "excessive-agency",
          "model-evaluation-gap"
        ],
        "frameworks": [
          "NIST AI RMF",
          "ISO/IEC 42001"
        ],
        "source_count": "2",
        "sources": [
          "raw/ai_governance/nist-ai-rmf.md",
          "raw/ai_governance/iso-iec-42001-overview.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"Audit Logging\"\ntype: control\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.72\ncontrol_category: \"Traceability\"\nmitigates:\n  - sensitive-information-disclosure\n  - excessive-agency\n  - model-evaluation-gap\nframeworks:\n  - NIST AI RMF\n  - ISO/IEC 42001\nsource_count: 2\nsources:\n  - raw/ai_governance/nist-ai-rmf.md\n  - raw/ai_governance/iso-iec-42001-overview.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# Audit Logging\n\n## Summary\n\nAudit Logging records important wiki and agent actions so that source changes, query notes, and maintenance results can be reviewed later.\n\n## Control Objective\n\nProvide traceability for agent actions and wiki quality changes.\n\n## Related Risks\n\n- [[sensitive-information-disclosure|Sensitive Information Disclosure]]\n- [[excessive-agency|Excessive Agency]]\n- [[model-evaluation-gap|Model Evaluation Gap]]\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| Governance systems need documentation and accountability evidence. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |\n| Management-system framing supports process records and improvement. | `raw/ai_governance/iso-iec-42001-overview.md` | mvp_validated |\n\n## Implementation Notes\n\n- `logs/ingest-log.md` records source ingestion.\n- `logs/maintenance-log.md` records maintenance checks.\n- `wiki/queries/` stores user query notes.\n\n## Open Questions\n\n- Should tool-call logs be separated from maintenance logs?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: Add MCP tool-call examples after smoke testing.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    },
    "eu-ai-act": {
      "slug": "eu-ai-act",
      "title": "EU AI Act",
      "type": "framework",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.72",
      "path": "wiki/concepts/eu-ai-act.md",
      "meta": {
        "title": "EU AI Act",
        "type": "framework",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.72",
        "source_count": "1",
        "sources": [
          "raw/ai_governance/eu-ai-act.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"EU AI Act\"\ntype: framework\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.72\nsource_count: 1\nsources:\n  - raw/ai_governance/eu-ai-act.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# EU AI Act\n\n## Summary\n\nThe EU AI Act provides regulatory vocabulary for risk classification, documentation, transparency, human oversight, and monitoring.\n\n## Key Points\n\n- Useful for regulatory framing.\n- Connects to oversight and documentation controls.\n- Helps explain why governance evidence matters.\n\n## Source Links\n\n- `raw/ai_governance/eu-ai-act.md`\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| The EU AI Act supports risk-based AI governance vocabulary. | `raw/ai_governance/eu-ai-act.md` | mvp_validated |\n\n## Related Concepts\n\n- [[human-oversight-gate|Human Oversight Gate]]\n- [[sensitive-information-disclosure|Sensitive Information Disclosure]]\n\n## Open Questions\n\n- Should specific articles be tracked in a later version?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: MVP uses this page as a regulatory anchor only.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    },
    "evaluation-and-monitoring": {
      "slug": "evaluation-and-monitoring",
      "title": "Evaluation and Monitoring",
      "type": "control",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.74",
      "path": "wiki/concepts/evaluation-and-monitoring.md",
      "meta": {
        "title": "Evaluation and Monitoring",
        "type": "control",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.74",
        "control_category": "Quality Assurance",
        "mitigates": [
          "model-evaluation-gap"
        ],
        "frameworks": [
          "NIST AI RMF",
          "NIST AI RMF Playbook"
        ],
        "source_count": "2",
        "sources": [
          "raw/ai_governance/nist-ai-rmf.md",
          "raw/ai_governance/nist-ai-rmf-playbook.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"Evaluation and Monitoring\"\ntype: control\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.74\ncontrol_category: \"Quality Assurance\"\nmitigates:\n  - model-evaluation-gap\nframeworks:\n  - NIST AI RMF\n  - NIST AI RMF Playbook\nsource_count: 2\nsources:\n  - raw/ai_governance/nist-ai-rmf.md\n  - raw/ai_governance/nist-ai-rmf-playbook.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# Evaluation and Monitoring\n\n## Summary\n\nEvaluation and Monitoring is a control that checks wiki quality, source coverage, evidence completeness, and review queue status.\n\n## Control Objective\n\nEnsure that governance claims remain source-linked, reviewed, and visible in health reports.\n\n## Related Risks\n\n- [[model-evaluation-gap|Model Evaluation Gap]]\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| Measurement and monitoring are core to risk management. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |\n| Playbook actions can be operationalized as quality checks. | `raw/ai_governance/nist-ai-rmf-playbook.md` | mvp_validated |\n\n## Implementation Notes\n\n- `run_maintenance_check` checks missing sources and missing Evidence Map sections.\n- `wiki_health_report` summarizes page quality and review queue status.\n\n## Open Questions\n\n- Should the GUI show per-framework quality coverage?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: Add health report screenshot evidence to submission.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    },
    "excessive-agency": {
      "slug": "excessive-agency",
      "title": "Excessive Agency",
      "type": "risk",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.74",
      "path": "wiki/concepts/excessive-agency.md",
      "meta": {
        "title": "Excessive Agency",
        "type": "risk",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.74",
        "risk_category": "Agentic Tool Use",
        "frameworks": [
          "OWASP LLM Top 10",
          "NIST AI RMF"
        ],
        "related_controls": [
          "tool-permission-boundary",
          "human-oversight-gate",
          "audit-logging"
        ],
        "source_count": "2",
        "sources": [
          "raw/ai_governance/owasp-llm-top10.md",
          "raw/ai_governance/nist-ai-rmf.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"Excessive Agency\"\ntype: risk\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.74\nrisk_category: \"Agentic Tool Use\"\nframeworks:\n  - OWASP LLM Top 10\n  - NIST AI RMF\nrelated_controls:\n  - tool-permission-boundary\n  - human-oversight-gate\n  - audit-logging\nsource_count: 2\nsources:\n  - raw/ai_governance/owasp-llm-top10.md\n  - raw/ai_governance/nist-ai-rmf.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# Excessive Agency\n\n## Summary\n\nExcessive agency is the risk that an AI agent can perform actions beyond the user's intended scope, especially when it can call tools, edit files, or trigger external systems.\n\n## Risk Definition\n\nThe risk grows when an agent has broad tool permissions, unclear goals, weak approval boundaries, or no audit trail.\n\n## Why It Matters\n\nThe project itself exposes MCP tools to agents. Therefore the wiki must document which tools are read-only, which tools write files, and which tools require human approval.\n\n## Related Controls\n\n- [[tool-permission-boundary|Tool Permission Boundary]]\n- [[human-oversight-gate|Human Oversight Gate]]\n- [[audit-logging|Audit Logging]]\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| Agentic systems require explicit tool-use boundaries. | `raw/ai_governance/owasp-llm-top10.md` | mvp_validated |\n| Risk management requires governance and management functions. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |\n\n## Detection Signals\n\n- Agent requests write actions when a read action would suffice.\n- Tool calls are not traceable to a user goal.\n- Agent tries to modify raw source files.\n\n## Mitigation Notes\n\n- Separate read-only and write-capable MCP tools.\n- Keep `raw/` immutable.\n- Use review queues for any generated concept page update.\n\n## Open Questions\n\n- Should `save_query_note` require explicit user confirmation in a full implementation?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: Connect this risk to the final Agent Role SPEC.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    },
    "human-oversight-gate": {
      "slug": "human-oversight-gate",
      "title": "Human Oversight Gate",
      "type": "control",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.73",
      "path": "wiki/concepts/human-oversight-gate.md",
      "meta": {
        "title": "Human Oversight Gate",
        "type": "control",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.73",
        "control_category": "Governance Process",
        "mitigates": [
          "prompt-injection",
          "sensitive-information-disclosure",
          "excessive-agency"
        ],
        "frameworks": [
          "EU AI Act",
          "NIST AI RMF"
        ],
        "source_count": "2",
        "sources": [
          "raw/ai_governance/eu-ai-act.md",
          "raw/ai_governance/nist-ai-rmf.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"Human Oversight Gate\"\ntype: control\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.73\ncontrol_category: \"Governance Process\"\nmitigates:\n  - prompt-injection\n  - sensitive-information-disclosure\n  - excessive-agency\nframeworks:\n  - EU AI Act\n  - NIST AI RMF\nsource_count: 2\nsources:\n  - raw/ai_governance/eu-ai-act.md\n  - raw/ai_governance/nist-ai-rmf.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# Human Oversight Gate\n\n## Summary\n\nHuman Oversight Gate is a control that requires human review before high-impact actions, stable knowledge promotion, or sensitive updates.\n\n## Control Objective\n\nKeep accountability in the loop when an agent proposes changes that affect governance knowledge, permissions, or source interpretation.\n\n## Related Risks\n\n- [[prompt-injection|Prompt Injection]]\n- [[sensitive-information-disclosure|Sensitive Information Disclosure]]\n- [[excessive-agency|Excessive Agency]]\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| Oversight is part of AI governance and risk management. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |\n| Regulatory frameworks discuss human oversight for AI systems. | `raw/ai_governance/eu-ai-act.md` | mvp_validated |\n\n## Implementation Notes\n\n- Pages can remain `draft` until reviewed.\n- `quality_class: stable` requires explicit review.\n- The MVP uses review queue counts to make oversight visible.\n\n## Open Questions\n\n- Which actions should require mandatory approval in a production version?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: Add final Agent Role SPEC references.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    },
    "mitre-atlas": {
      "slug": "mitre-atlas",
      "title": "MITRE ATLAS",
      "type": "framework",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.73",
      "path": "wiki/concepts/mitre-atlas.md",
      "meta": {
        "title": "MITRE ATLAS",
        "type": "framework",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.73",
        "source_count": "1",
        "sources": [
          "raw/ai_governance/mitre-atlas.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"MITRE ATLAS\"\ntype: framework\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.73\nsource_count: 1\nsources:\n  - raw/ai_governance/mitre-atlas.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# MITRE ATLAS\n\n## Summary\n\nMITRE ATLAS provides adversarial AI concepts used to connect AI risks to attack techniques and defensive controls.\n\n## Key Points\n\n- Useful for adversarial AI threat framing.\n- Supports prompt injection and model behavior risk analysis.\n- Complements OWASP and NIST framing.\n\n## Source Links\n\n- `raw/ai_governance/mitre-atlas.md`\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| MITRE ATLAS is used for adversarial AI risk mapping. | `raw/ai_governance/mitre-atlas.md` | mvp_validated |\n\n## Related Concepts\n\n- [[prompt-injection|Prompt Injection]]\n- [[tool-permission-boundary|Tool Permission Boundary]]\n\n## Open Questions\n\n- Which ATLAS technique pages should be added in a full version?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: Keep ATLAS scope small for MVP.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    },
    "model-evaluation-gap": {
      "slug": "model-evaluation-gap",
      "title": "Model Evaluation Gap",
      "type": "risk",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.71",
      "path": "wiki/concepts/model-evaluation-gap.md",
      "meta": {
        "title": "Model Evaluation Gap",
        "type": "risk",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.71",
        "risk_category": "Evaluation and Monitoring",
        "frameworks": [
          "NIST AI RMF",
          "NIST AI RMF Playbook"
        ],
        "related_controls": [
          "evaluation-and-monitoring",
          "risk-inventory"
        ],
        "source_count": "2",
        "sources": [
          "raw/ai_governance/nist-ai-rmf.md",
          "raw/ai_governance/nist-ai-rmf-playbook.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"Model Evaluation Gap\"\ntype: risk\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.71\nrisk_category: \"Evaluation and Monitoring\"\nframeworks:\n  - NIST AI RMF\n  - NIST AI RMF Playbook\nrelated_controls:\n  - evaluation-and-monitoring\n  - risk-inventory\nsource_count: 2\nsources:\n  - raw/ai_governance/nist-ai-rmf.md\n  - raw/ai_governance/nist-ai-rmf-playbook.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# Model Evaluation Gap\n\n## Summary\n\nModel evaluation gap is the risk that an AI system is deployed or used without clear evaluation criteria, quality gates, monitoring signals, or review evidence.\n\n## Risk Definition\n\nThe gap appears when a system has claims about reliability or safety but lacks measurable tests, audit evidence, or ongoing monitoring.\n\n## Why It Matters\n\nAn LLM Wiki can become stale or misleading if source claims are not reviewed. The wiki therefore needs maintenance checks and health reports.\n\n## Related Controls\n\n- [[evaluation-and-monitoring|Evaluation and Monitoring]]\n- [[risk-inventory|Risk Inventory]]\n- [[audit-logging|Audit Logging]]\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| AI risk management requires measurement and monitoring. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |\n| Playbook-style actions help turn risk concepts into checks. | `raw/ai_governance/nist-ai-rmf-playbook.md` | mvp_validated |\n\n## Detection Signals\n\n- No health report exists.\n- Evidence Map is missing.\n- Source claims are marked stable without review.\n\n## Mitigation Notes\n\n- Run `run_maintenance_check`.\n- Generate a wiki health report before submission.\n- Keep `review_status` explicit.\n\n## Open Questions\n\n- What confidence threshold should allow a page to become stable?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: Add rubric-aligned acceptance criteria after MVP validation.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    },
    "nist-ai-rmf": {
      "slug": "nist-ai-rmf",
      "title": "NIST AI RMF",
      "type": "framework",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.78",
      "path": "wiki/concepts/nist-ai-rmf.md",
      "meta": {
        "title": "NIST AI RMF",
        "type": "framework",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.78",
        "source_count": "2",
        "sources": [
          "raw/ai_governance/nist-ai-rmf.md",
          "raw/ai_governance/nist-ai-rmf-playbook.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"NIST AI RMF\"\ntype: framework\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.78\nsource_count: 2\nsources:\n  - raw/ai_governance/nist-ai-rmf.md\n  - raw/ai_governance/nist-ai-rmf-playbook.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# NIST AI RMF\n\n## Summary\n\nNIST AI RMF is the umbrella framework used by this wiki to organize governance, mapping, measurement, and management of AI risks.\n\n## Key Points\n\n- Provides high-level risk management functions.\n- Supports documentation and monitoring controls.\n- Connects risk pages to governance processes.\n\n## Source Links\n\n- `raw/ai_governance/nist-ai-rmf.md`\n- `raw/ai_governance/nist-ai-rmf-playbook.md`\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| NIST AI RMF is the umbrella framework for this wiki. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |\n| Playbook-style actions support controls. | `raw/ai_governance/nist-ai-rmf-playbook.md` | mvp_validated |\n\n## Related Concepts\n\n- [[risk-inventory|Risk Inventory]]\n- [[evaluation-and-monitoring|Evaluation and Monitoring]]\n- [[audit-logging|Audit Logging]]\n\n## Open Questions\n\n- Which NIST function should be shown as the primary GUI grouping?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: Add function-specific pages if needed.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    },
    "owasp-llm-top10": {
      "slug": "owasp-llm-top10",
      "title": "OWASP LLM Top 10",
      "type": "framework",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.77",
      "path": "wiki/concepts/owasp-llm-top10.md",
      "meta": {
        "title": "OWASP LLM Top 10",
        "type": "framework",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.77",
        "source_count": "1",
        "sources": [
          "raw/ai_governance/owasp-llm-top10.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"OWASP LLM Top 10\"\ntype: framework\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.77\nsource_count: 1\nsources:\n  - raw/ai_governance/owasp-llm-top10.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# OWASP LLM Top 10\n\n## Summary\n\nOWASP LLM Top 10 is used as the LLM application risk taxonomy for this project.\n\n## Key Points\n\n- Provides LLM application risk categories.\n- Supports risk pages such as Prompt Injection, Sensitive Information Disclosure, and Excessive Agency.\n- Connects application risks to controls and agent tool boundaries.\n\n## Source Links\n\n- `raw/ai_governance/owasp-llm-top10.md`\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| OWASP LLM Top 10 is the LLM risk taxonomy for this wiki. | `raw/ai_governance/owasp-llm-top10.md` | mvp_validated |\n\n## Related Concepts\n\n- [[prompt-injection|Prompt Injection]]\n- [[sensitive-information-disclosure|Sensitive Information Disclosure]]\n- [[excessive-agency|Excessive Agency]]\n\n## Open Questions\n\n- Should each OWASP category become a separate risk page?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: Expand only categories needed for MVP.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    },
    "prompt-injection": {
      "slug": "prompt-injection",
      "title": "Prompt Injection",
      "type": "risk",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.76",
      "path": "wiki/concepts/prompt-injection.md",
      "meta": {
        "title": "Prompt Injection",
        "type": "risk",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.76",
        "risk_category": "LLM Application Security",
        "frameworks": [
          "OWASP LLM Top 10",
          "MITRE ATLAS"
        ],
        "related_controls": [
          "tool-permission-boundary",
          "human-oversight-gate",
          "audit-logging"
        ],
        "source_count": "2",
        "sources": [
          "raw/ai_governance/owasp-llm-top10.md",
          "raw/ai_governance/mitre-atlas.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"Prompt Injection\"\ntype: risk\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.76\nrisk_category: \"LLM Application Security\"\nframeworks:\n  - OWASP LLM Top 10\n  - MITRE ATLAS\nrelated_controls:\n  - tool-permission-boundary\n  - human-oversight-gate\n  - audit-logging\nsource_count: 2\nsources:\n  - raw/ai_governance/owasp-llm-top10.md\n  - raw/ai_governance/mitre-atlas.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# Prompt Injection\n\n## Summary\n\nPrompt injection is an LLM application risk where untrusted instructions attempt to override the intended task, policy, or tool-use boundary. In this wiki, it is treated as a risk that must be mapped to explicit controls before an agent can use tools or update knowledge.\n\n## Risk Definition\n\nPrompt injection can occur when user input, retrieved documents, web pages, or tool outputs contain instructions that conflict with the trusted system or project policy.\n\n## Why It Matters\n\nWiki tools often read external sources. Without clear boundaries, an agent may treat malicious source text as an instruction instead of data.\n\n## Related Controls\n\n- [[tool-permission-boundary|Tool Permission Boundary]]\n- [[human-oversight-gate|Human Oversight Gate]]\n- [[audit-logging|Audit Logging]]\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| Prompt injection is a major LLM application risk. | `raw/ai_governance/owasp-llm-top10.md` | mvp_validated |\n| Adversarial AI techniques can target model behavior and tool use. | `raw/ai_governance/mitre-atlas.md` | mvp_validated |\n| Tool boundaries reduce the blast radius of malicious instructions. | [[tool-permission-boundary]] | mvp_validated |\n\n## Detection Signals\n\n- Source text contains instructions to ignore prior rules.\n- Retrieved content asks the agent to call tools or reveal secrets.\n- Tool request is unrelated to the user's trusted task.\n\n## Mitigation Notes\n\n- Treat raw documents as data, not instructions.\n- Use `run_maintenance_check` before accepting generated wiki changes.\n- Require human approval for high-impact tool actions.\n\n## Open Questions\n\n- Should indirect prompt injection examples be stored as separate source pages?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: Add specific OWASP section references during source review.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    },
    "risk-inventory": {
      "slug": "risk-inventory",
      "title": "Risk Inventory",
      "type": "control",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.73",
      "path": "wiki/concepts/risk-inventory.md",
      "meta": {
        "title": "Risk Inventory",
        "type": "control",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.73",
        "control_category": "Risk Management",
        "mitigates": [
          "sensitive-information-disclosure",
          "model-evaluation-gap"
        ],
        "frameworks": [
          "NIST AI RMF",
          "NIST AI RMF Playbook"
        ],
        "source_count": "2",
        "sources": [
          "raw/ai_governance/nist-ai-rmf.md",
          "raw/ai_governance/nist-ai-rmf-playbook.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"Risk Inventory\"\ntype: control\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.73\ncontrol_category: \"Risk Management\"\nmitigates:\n  - sensitive-information-disclosure\n  - model-evaluation-gap\nframeworks:\n  - NIST AI RMF\n  - NIST AI RMF Playbook\nsource_count: 2\nsources:\n  - raw/ai_governance/nist-ai-rmf.md\n  - raw/ai_governance/nist-ai-rmf-playbook.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# Risk Inventory\n\n## Summary\n\nRisk Inventory is a control that keeps track of identified risks, related controls, frameworks, evidence, and review status.\n\n## Control Objective\n\nMake AI governance knowledge searchable and auditable instead of leaving risk decisions in chat history.\n\n## Related Risks\n\n- [[sensitive-information-disclosure|Sensitive Information Disclosure]]\n- [[model-evaluation-gap|Model Evaluation Gap]]\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| AI risk management needs documented risk context. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |\n| A playbook can turn governance questions into maintainable records. | `raw/ai_governance/nist-ai-rmf-playbook.md` | mvp_validated |\n\n## Implementation Notes\n\n- Risks are stored as `type: risk` concept pages.\n- Controls are stored as `type: control` concept pages.\n- `map_risk_to_controls` reads `related_controls` from risk pages.\n\n## Open Questions\n\n- Should risks be scored by severity and likelihood in the MVP?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: Add scoring fields only if needed for final demo.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    },
    "sensitive-information-disclosure": {
      "slug": "sensitive-information-disclosure",
      "title": "Sensitive Information Disclosure",
      "type": "risk",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.72",
      "path": "wiki/concepts/sensitive-information-disclosure.md",
      "meta": {
        "title": "Sensitive Information Disclosure",
        "type": "risk",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.72",
        "risk_category": "Information Protection",
        "frameworks": [
          "OWASP LLM Top 10",
          "EU AI Act"
        ],
        "related_controls": [
          "audit-logging",
          "human-oversight-gate"
        ],
        "source_count": "2",
        "sources": [
          "raw/ai_governance/owasp-llm-top10.md",
          "raw/ai_governance/eu-ai-act.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"Sensitive Information Disclosure\"\ntype: risk\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.72\nrisk_category: \"Information Protection\"\nframeworks:\n  - OWASP LLM Top 10\n  - EU AI Act\nrelated_controls:\n  - audit-logging\n  - human-oversight-gate\nsource_count: 2\nsources:\n  - raw/ai_governance/owasp-llm-top10.md\n  - raw/ai_governance/eu-ai-act.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# Sensitive Information Disclosure\n\n## Summary\n\nSensitive information disclosure is the risk that an AI system exposes secrets, personal data, confidential records, or internal project material through model output, logs, or connected tools.\n\n## Risk Definition\n\nThe risk includes both direct output leakage and indirect leakage through saved query notes, logs, source summaries, or copied raw content.\n\n## Why It Matters\n\nAn MCP-served wiki can accumulate data from raw sources and user questions. It needs explicit boundaries for what can be stored, displayed, and passed to agents.\n\n## Related Controls\n\n- [[audit-logging|Audit Logging]]\n- [[human-oversight-gate|Human Oversight Gate]]\n- [[risk-inventory|Risk Inventory]]\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| LLM applications need controls for sensitive information disclosure. | `raw/ai_governance/owasp-llm-top10.md` | mvp_validated |\n| Governance frameworks emphasize documentation and oversight for AI systems. | `raw/ai_governance/eu-ai-act.md` | mvp_validated |\n\n## Detection Signals\n\n- Output contains API keys, tokens, personal data, or confidential identifiers.\n- Query notes contain raw private content.\n- Logs include more data than needed for audit.\n\n## Mitigation Notes\n\n- Redact secrets from wiki pages.\n- Keep raw source paths visible, but avoid copying sensitive raw content into concept pages.\n- Store the minimum answer draft needed for review.\n\n## Open Questions\n\n- Should the MVP include automated secret scanning?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: Add a separate control page for data minimization if scope expands.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    },
    "tool-permission-boundary": {
      "slug": "tool-permission-boundary",
      "title": "Tool Permission Boundary",
      "type": "control",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.76",
      "path": "wiki/concepts/tool-permission-boundary.md",
      "meta": {
        "title": "Tool Permission Boundary",
        "type": "control",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.76",
        "control_category": "Agent Tool Governance",
        "mitigates": [
          "prompt-injection",
          "excessive-agency"
        ],
        "frameworks": [
          "OWASP LLM Top 10",
          "NIST AI RMF"
        ],
        "source_count": "2",
        "sources": [
          "raw/ai_governance/owasp-llm-top10.md",
          "raw/ai_governance/nist-ai-rmf.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"Tool Permission Boundary\"\ntype: control\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.76\ncontrol_category: \"Agent Tool Governance\"\nmitigates:\n  - prompt-injection\n  - excessive-agency\nframeworks:\n  - OWASP LLM Top 10\n  - NIST AI RMF\nsource_count: 2\nsources:\n  - raw/ai_governance/owasp-llm-top10.md\n  - raw/ai_governance/nist-ai-rmf.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# Tool Permission Boundary\n\n## Summary\n\nTool Permission Boundary is a control that separates read-only tools from write-capable or high-impact tools, and makes tool permissions explicit for agents.\n\n## Control Objective\n\nReduce prompt injection and excessive agency risk by ensuring agents can only call tools that match the user's goal and the agent's role.\n\n## Related Risks\n\n- [[prompt-injection|Prompt Injection]]\n- [[excessive-agency|Excessive Agency]]\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| Tool permissions should be explicit for agentic systems. | `raw/ai_governance/owasp-llm-top10.md` | mvp_validated |\n| Governance controls should define responsibilities and risk management actions. | `raw/ai_governance/nist-ai-rmf.md` | mvp_validated |\n\n## Implementation Notes\n\n- `search_wiki`, `read_page`, `list_pages`, and `get_wiki_graph` are read-only.\n- `save_query_note` writes to `wiki/queries/`.\n- Raw source files are immutable.\n\n## Open Questions\n\n- Should write tools be disabled by default in the MCP server?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: Align with final README tool table.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    }
  },
  "selected": {
    "found": true,
    "page": {
      "slug": "prompt-injection",
      "title": "Prompt Injection",
      "type": "risk",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "confidence": "0.76",
      "path": "wiki/concepts/prompt-injection.md",
      "meta": {
        "title": "Prompt Injection",
        "type": "risk",
        "status": "draft",
        "quality_class": "source-linked",
        "review_status": "mvp_validated",
        "confidence": "0.76",
        "risk_category": "LLM Application Security",
        "frameworks": [
          "OWASP LLM Top 10",
          "MITRE ATLAS"
        ],
        "related_controls": [
          "tool-permission-boundary",
          "human-oversight-gate",
          "audit-logging"
        ],
        "source_count": "2",
        "sources": [
          "raw/ai_governance/owasp-llm-top10.md",
          "raw/ai_governance/mitre-atlas.md"
        ],
        "source_hashes": "[]",
        "stale": "false",
        "created": "2026-06-04",
        "updated": "2026-06-04"
      },
      "text": "---\ntitle: \"Prompt Injection\"\ntype: risk\nstatus: draft\nquality_class: source-linked\nreview_status: mvp_validated\nconfidence: 0.76\nrisk_category: \"LLM Application Security\"\nframeworks:\n  - OWASP LLM Top 10\n  - MITRE ATLAS\nrelated_controls:\n  - tool-permission-boundary\n  - human-oversight-gate\n  - audit-logging\nsource_count: 2\nsources:\n  - raw/ai_governance/owasp-llm-top10.md\n  - raw/ai_governance/mitre-atlas.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-04\nupdated: 2026-06-04\n---\n\n# Prompt Injection\n\n## Summary\n\nPrompt injection is an LLM application risk where untrusted instructions attempt to override the intended task, policy, or tool-use boundary. In this wiki, it is treated as a risk that must be mapped to explicit controls before an agent can use tools or update knowledge.\n\n## Risk Definition\n\nPrompt injection can occur when user input, retrieved documents, web pages, or tool outputs contain instructions that conflict with the trusted system or project policy.\n\n## Why It Matters\n\nWiki tools often read external sources. Without clear boundaries, an agent may treat malicious source text as an instruction instead of data.\n\n## Related Controls\n\n- [[tool-permission-boundary|Tool Permission Boundary]]\n- [[human-oversight-gate|Human Oversight Gate]]\n- [[audit-logging|Audit Logging]]\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| Prompt injection is a major LLM application risk. | `raw/ai_governance/owasp-llm-top10.md` | mvp_validated |\n| Adversarial AI techniques can target model behavior and tool use. | `raw/ai_governance/mitre-atlas.md` | mvp_validated |\n| Tool boundaries reduce the blast radius of malicious instructions. | [[tool-permission-boundary]] | mvp_validated |\n\n## Detection Signals\n\n- Source text contains instructions to ignore prior rules.\n- Retrieved content asks the agent to call tools or reveal secrets.\n- Tool request is unrelated to the user's trusted task.\n\n## Mitigation Notes\n\n- Treat raw documents as data, not instructions.\n- Use `run_maintenance_check` before accepting generated wiki changes.\n- Require human approval for high-impact tool actions.\n\n## Open Questions\n\n- Should indirect prompt injection examples be stored as separate source pages?\n\n## Maintenance Notes\n\n- MVP_REVIEWED: Add specific OWASP section references during source review.\n\nFile updated at: 2026-06-14 18:30:00 +09:00\n\n\n"
    }
  },
  "mapping": {
    "found": true,
    "risk": {
      "slug": "prompt-injection",
      "title": "Prompt Injection",
      "category": "LLM Application Security",
      "frameworks": [
        "OWASP LLM Top 10",
        "MITRE ATLAS"
      ],
      "sources": [
        "raw/ai_governance/owasp-llm-top10.md",
        "raw/ai_governance/mitre-atlas.md"
      ]
    },
    "controls": [
      {
        "slug": "tool-permission-boundary",
        "title": "Tool Permission Boundary",
        "type": "control",
        "path": "wiki/concepts/tool-permission-boundary.md",
        "frameworks": [
          "OWASP LLM Top 10",
          "NIST AI RMF"
        ]
      },
      {
        "slug": "human-oversight-gate",
        "title": "Human Oversight Gate",
        "type": "control",
        "path": "wiki/concepts/human-oversight-gate.md",
        "frameworks": [
          "EU AI Act",
          "NIST AI RMF"
        ]
      },
      {
        "slug": "audit-logging",
        "title": "Audit Logging",
        "type": "control",
        "path": "wiki/concepts/audit-logging.md",
        "frameworks": [
          "NIST AI RMF",
          "ISO/IEC 42001"
        ]
      }
    ]
  },
  "search": {
    "query": "oversight",
    "count": 5,
    "results": [
      {
        "slug": "eu-ai-act",
        "title": "EU AI Act",
        "type": "framework",
        "review_status": "mvp_validated",
        "quality_class": "source-linked",
        "confidence": "0.72",
        "path": "wiki/concepts/eu-ai-act.md",
        "snippet": "ed: 2026-06-04 --- # EU AI Act ## Summary The EU AI Act provides regulatory vocabulary for risk classification, documentation, transparency, human oversight, and monitoring. ## Key Points - Useful for regulatory framing. - Connects to oversight and documentation controls. - Helps explain why governance evidence matters. ## Source Links - `raw/ai_governance/eu-ai-act.md` ## Evidence Map | Claim | Evidence | Status | | --- | --- | --- | | The EU AI Act supports risk-based AI governance vocabulary. | `raw/ai_governance/eu-ai-act.md` | mvp_validated | ## Related Conce"
      },
      {
        "slug": "excessive-agency",
        "title": "Excessive Agency",
        "type": "risk",
        "review_status": "mvp_validated",
        "quality_class": "source-linked",
        "confidence": "0.74",
        "path": "wiki/concepts/excessive-agency.md",
        "snippet": "74 risk_category: \"Agentic Tool Use\" frameworks: - OWASP LLM Top 10 - NIST AI RMF related_controls: - tool-permission-boundary - human-oversight-gate - audit-logging source_count: 2 sources: - raw/ai_governance/owasp-llm-top10.md - raw/ai_governance/nist-ai-rmf.md source_hashes: [] stale: false created: 2026-06-04 updated: 2026-06-04 --- # Excessive Agency ## Summary Excessive agency is the risk that an AI agent can perform actions beyond the user's intended scope, especially when it can call tools, edit files, or trigger external systems. ## Risk Definiti"
      },
      {
        "slug": "human-oversight-gate",
        "title": "Human Oversight Gate",
        "type": "control",
        "review_status": "mvp_validated",
        "quality_class": "source-linked",
        "confidence": "0.73",
        "path": "wiki/concepts/human-oversight-gate.md",
        "snippet": "--- title: \"Human Oversight Gate\" type: control status: draft quality_class: source-linked review_status: mvp_validated confidence: 0.73 control_category: \"Governance Process\" mitigates: - prompt-injection - sensitive-information-disclosure - excessive-agency frameworks: - EU AI Act - NIST AI RMF source_count: 2 sources: - raw/ai_governance/eu-ai-act.md - raw/ai_governance/nist-ai-rmf.md source_hashes: [] sta"
      },
      {
        "slug": "prompt-injection",
        "title": "Prompt Injection",
        "type": "risk",
        "review_status": "mvp_validated",
        "quality_class": "source-linked",
        "confidence": "0.76",
        "path": "wiki/concepts/prompt-injection.md",
        "snippet": "category: \"LLM Application Security\" frameworks: - OWASP LLM Top 10 - MITRE ATLAS related_controls: - tool-permission-boundary - human-oversight-gate - audit-logging source_count: 2 sources: - raw/ai_governance/owasp-llm-top10.md - raw/ai_governance/mitre-atlas.md source_hashes: [] stale: false created: 2026-06-04 updated: 2026-06-04 --- # Prompt Injection ## Summary Prompt injection is an LLM application risk where untrusted instructions attempt to override the intended task, policy, or tool-use boundary. In this wiki, it is treated as a risk that must be"
      },
      {
        "slug": "sensitive-information-disclosure",
        "title": "Sensitive Information Disclosure",
        "type": "risk",
        "review_status": "mvp_validated",
        "quality_class": "source-linked",
        "confidence": "0.72",
        "path": "wiki/concepts/sensitive-information-disclosure.md",
        "snippet": "ategory: \"Information Protection\" frameworks: - OWASP LLM Top 10 - EU AI Act related_controls: - audit-logging - human-oversight-gate source_count: 2 sources: - raw/ai_governance/owasp-llm-top10.md - raw/ai_governance/eu-ai-act.md source_hashes: [] stale: false created: 2026-06-04 updated: 2026-06-04 --- # Sensitive Information Disclosure ## Summary Sensitive information disclosure is the risk that an AI system exposes secrets, personal data, confidential records, or internal project material through model output, logs, or connected tools. ## Risk Definition"
      }
    ]
  },
  "graph": {
    "node_count": 13,
    "edge_count": 65,
    "nodes": [
      {
        "id": "audit-logging",
        "label": "Audit Logging",
        "type": "control"
      },
      {
        "id": "eu-ai-act",
        "label": "EU AI Act",
        "type": "framework"
      },
      {
        "id": "evaluation-and-monitoring",
        "label": "Evaluation and Monitoring",
        "type": "control"
      },
      {
        "id": "excessive-agency",
        "label": "Excessive Agency",
        "type": "risk"
      },
      {
        "id": "human-oversight-gate",
        "label": "Human Oversight Gate",
        "type": "control"
      },
      {
        "id": "mitre-atlas",
        "label": "MITRE ATLAS",
        "type": "framework"
      },
      {
        "id": "model-evaluation-gap",
        "label": "Model Evaluation Gap",
        "type": "risk"
      },
      {
        "id": "nist-ai-rmf",
        "label": "NIST AI RMF",
        "type": "framework"
      },
      {
        "id": "owasp-llm-top10",
        "label": "OWASP LLM Top 10",
        "type": "framework"
      },
      {
        "id": "prompt-injection",
        "label": "Prompt Injection",
        "type": "risk"
      },
      {
        "id": "risk-inventory",
        "label": "Risk Inventory",
        "type": "control"
      },
      {
        "id": "sensitive-information-disclosure",
        "label": "Sensitive Information Disclosure",
        "type": "risk"
      },
      {
        "id": "tool-permission-boundary",
        "label": "Tool Permission Boundary",
        "type": "control"
      }
    ],
    "edges": [
      {
        "source": "audit-logging",
        "target": "sensitive-information-disclosure",
        "type": "mitigates"
      },
      {
        "source": "audit-logging",
        "target": "excessive-agency",
        "type": "mitigates"
      },
      {
        "source": "audit-logging",
        "target": "model-evaluation-gap",
        "type": "mitigates"
      },
      {
        "source": "audit-logging",
        "target": "nist-ai-rmf",
        "type": "frameworks"
      },
      {
        "source": "audit-logging",
        "target": "sensitive-information-disclosure",
        "type": "wikilink"
      },
      {
        "source": "audit-logging",
        "target": "excessive-agency",
        "type": "wikilink"
      },
      {
        "source": "audit-logging",
        "target": "model-evaluation-gap",
        "type": "wikilink"
      },
      {
        "source": "eu-ai-act",
        "target": "human-oversight-gate",
        "type": "wikilink"
      },
      {
        "source": "eu-ai-act",
        "target": "sensitive-information-disclosure",
        "type": "wikilink"
      },
      {
        "source": "evaluation-and-monitoring",
        "target": "model-evaluation-gap",
        "type": "mitigates"
      },
      {
        "source": "evaluation-and-monitoring",
        "target": "nist-ai-rmf",
        "type": "frameworks"
      },
      {
        "source": "evaluation-and-monitoring",
        "target": "model-evaluation-gap",
        "type": "wikilink"
      },
      {
        "source": "excessive-agency",
        "target": "tool-permission-boundary",
        "type": "related_controls"
      },
      {
        "source": "excessive-agency",
        "target": "human-oversight-gate",
        "type": "related_controls"
      },
      {
        "source": "excessive-agency",
        "target": "audit-logging",
        "type": "related_controls"
      },
      {
        "source": "excessive-agency",
        "target": "nist-ai-rmf",
        "type": "frameworks"
      },
      {
        "source": "excessive-agency",
        "target": "tool-permission-boundary",
        "type": "wikilink"
      },
      {
        "source": "excessive-agency",
        "target": "human-oversight-gate",
        "type": "wikilink"
      },
      {
        "source": "excessive-agency",
        "target": "audit-logging",
        "type": "wikilink"
      },
      {
        "source": "human-oversight-gate",
        "target": "prompt-injection",
        "type": "mitigates"
      },
      {
        "source": "human-oversight-gate",
        "target": "sensitive-information-disclosure",
        "type": "mitigates"
      },
      {
        "source": "human-oversight-gate",
        "target": "excessive-agency",
        "type": "mitigates"
      },
      {
        "source": "human-oversight-gate",
        "target": "eu-ai-act",
        "type": "frameworks"
      },
      {
        "source": "human-oversight-gate",
        "target": "nist-ai-rmf",
        "type": "frameworks"
      },
      {
        "source": "human-oversight-gate",
        "target": "prompt-injection",
        "type": "wikilink"
      },
      {
        "source": "human-oversight-gate",
        "target": "sensitive-information-disclosure",
        "type": "wikilink"
      },
      {
        "source": "human-oversight-gate",
        "target": "excessive-agency",
        "type": "wikilink"
      },
      {
        "source": "mitre-atlas",
        "target": "prompt-injection",
        "type": "wikilink"
      },
      {
        "source": "mitre-atlas",
        "target": "tool-permission-boundary",
        "type": "wikilink"
      },
      {
        "source": "model-evaluation-gap",
        "target": "evaluation-and-monitoring",
        "type": "related_controls"
      },
      {
        "source": "model-evaluation-gap",
        "target": "risk-inventory",
        "type": "related_controls"
      },
      {
        "source": "model-evaluation-gap",
        "target": "nist-ai-rmf",
        "type": "frameworks"
      },
      {
        "source": "model-evaluation-gap",
        "target": "evaluation-and-monitoring",
        "type": "wikilink"
      },
      {
        "source": "model-evaluation-gap",
        "target": "risk-inventory",
        "type": "wikilink"
      },
      {
        "source": "model-evaluation-gap",
        "target": "audit-logging",
        "type": "wikilink"
      },
      {
        "source": "nist-ai-rmf",
        "target": "risk-inventory",
        "type": "wikilink"
      },
      {
        "source": "nist-ai-rmf",
        "target": "evaluation-and-monitoring",
        "type": "wikilink"
      },
      {
        "source": "nist-ai-rmf",
        "target": "audit-logging",
        "type": "wikilink"
      },
      {
        "source": "owasp-llm-top10",
        "target": "prompt-injection",
        "type": "wikilink"
      },
      {
        "source": "owasp-llm-top10",
        "target": "sensitive-information-disclosure",
        "type": "wikilink"
      },
      {
        "source": "owasp-llm-top10",
        "target": "excessive-agency",
        "type": "wikilink"
      },
      {
        "source": "prompt-injection",
        "target": "tool-permission-boundary",
        "type": "related_controls"
      },
      {
        "source": "prompt-injection",
        "target": "human-oversight-gate",
        "type": "related_controls"
      },
      {
        "source": "prompt-injection",
        "target": "audit-logging",
        "type": "related_controls"
      },
      {
        "source": "prompt-injection",
        "target": "mitre-atlas",
        "type": "frameworks"
      },
      {
        "source": "prompt-injection",
        "target": "tool-permission-boundary",
        "type": "wikilink"
      },
      {
        "source": "prompt-injection",
        "target": "human-oversight-gate",
        "type": "wikilink"
      },
      {
        "source": "prompt-injection",
        "target": "audit-logging",
        "type": "wikilink"
      },
      {
        "source": "prompt-injection",
        "target": "tool-permission-boundary",
        "type": "wikilink"
      },
      {
        "source": "risk-inventory",
        "target": "sensitive-information-disclosure",
        "type": "mitigates"
      },
      {
        "source": "risk-inventory",
        "target": "model-evaluation-gap",
        "type": "mitigates"
      },
      {
        "source": "risk-inventory",
        "target": "nist-ai-rmf",
        "type": "frameworks"
      },
      {
        "source": "risk-inventory",
        "target": "sensitive-information-disclosure",
        "type": "wikilink"
      },
      {
        "source": "risk-inventory",
        "target": "model-evaluation-gap",
        "type": "wikilink"
      },
      {
        "source": "sensitive-information-disclosure",
        "target": "audit-logging",
        "type": "related_controls"
      },
      {
        "source": "sensitive-information-disclosure",
        "target": "human-oversight-gate",
        "type": "related_controls"
      },
      {
        "source": "sensitive-information-disclosure",
        "target": "eu-ai-act",
        "type": "frameworks"
      },
      {
        "source": "sensitive-information-disclosure",
        "target": "audit-logging",
        "type": "wikilink"
      },
      {
        "source": "sensitive-information-disclosure",
        "target": "human-oversight-gate",
        "type": "wikilink"
      },
      {
        "source": "sensitive-information-disclosure",
        "target": "risk-inventory",
        "type": "wikilink"
      },
      {
        "source": "tool-permission-boundary",
        "target": "prompt-injection",
        "type": "mitigates"
      },
      {
        "source": "tool-permission-boundary",
        "target": "excessive-agency",
        "type": "mitigates"
      },
      {
        "source": "tool-permission-boundary",
        "target": "nist-ai-rmf",
        "type": "frameworks"
      },
      {
        "source": "tool-permission-boundary",
        "target": "prompt-injection",
        "type": "wikilink"
      },
      {
        "source": "tool-permission-boundary",
        "target": "excessive-agency",
        "type": "wikilink"
      }
    ]
  },
  "health": {
    "found": true,
    "path": "logs/wiki-health-report.md",
    "text": "# Wiki Health Report\n\nGenerated: 2026-06-14 18:43:24 +09:00\n\n## Summary\n\n- Total pages: 13\n- Needs review: 0\n- Stale pages: 0\n- Missing sources: 0\n- Missing evidence map: 0\n\n## Page Table\n\n| Page | Type | Review | Quality | Confidence | Stale | Issues |\n| --- | --- | --- | --- | --- | --- | --- |\n| [audit-logging](./wiki/concepts/audit-logging.md) | control | mvp_validated | source-linked | 0.72 | false | ok |\n| [eu-ai-act](./wiki/concepts/eu-ai-act.md) | framework | mvp_validated | source-linked | 0.72 | false | ok |\n| [evaluation-and-monitoring](./wiki/concepts/evaluation-and-monitoring.md) | control | mvp_validated | source-linked | 0.74 | false | ok |\n| [excessive-agency](./wiki/concepts/excessive-agency.md) | risk | mvp_validated | source-linked | 0.74 | false | ok |\n| [human-oversight-gate](./wiki/concepts/human-oversight-gate.md) | control | mvp_validated | source-linked | 0.73 | false | ok |\n| [mitre-atlas](./wiki/concepts/mitre-atlas.md) | framework | mvp_validated | source-linked | 0.73 | false | ok |\n| [model-evaluation-gap](./wiki/concepts/model-evaluation-gap.md) | risk | mvp_validated | source-linked | 0.71 | false | ok |\n| [nist-ai-rmf](./wiki/concepts/nist-ai-rmf.md) | framework | mvp_validated | source-linked | 0.78 | false | ok |\n| [owasp-llm-top10](./wiki/concepts/owasp-llm-top10.md) | framework | mvp_validated | source-linked | 0.77 | false | ok |\n| [prompt-injection](./wiki/concepts/prompt-injection.md) | risk | mvp_validated | source-linked | 0.76 | false | ok |\n| [risk-inventory](./wiki/concepts/risk-inventory.md) | control | mvp_validated | source-linked | 0.73 | false | ok |\n| [sensitive-information-disclosure](./wiki/concepts/sensitive-information-disclosure.md) | risk | mvp_validated | source-linked | 0.72 | false | ok |\n| [tool-permission-boundary](./wiki/concepts/tool-permission-boundary.md) | control | mvp_validated | source-linked | 0.76 | false | ok |\n\nFile updated at: 2026-06-14 18:43:24 +09:00\n"
  },
  "resources": {
    "resources": [
      {
        "uri": "wiki://audit-logging",
        "name": "Audit Logging",
        "description": "control page, review_status=mvp_validated",
        "mimeType": "text/markdown"
      },
      {
        "uri": "wiki://eu-ai-act",
        "name": "EU AI Act",
        "description": "framework page, review_status=mvp_validated",
        "mimeType": "text/markdown"
      },
      {
        "uri": "wiki://evaluation-and-monitoring",
        "name": "Evaluation and Monitoring",
        "description": "control page, review_status=mvp_validated",
        "mimeType": "text/markdown"
      },
      {
        "uri": "wiki://excessive-agency",
        "name": "Excessive Agency",
        "description": "risk page, review_status=mvp_validated",
        "mimeType": "text/markdown"
      },
      {
        "uri": "wiki://human-oversight-gate",
        "name": "Human Oversight Gate",
        "description": "control page, review_status=mvp_validated",
        "mimeType": "text/markdown"
      },
      {
        "uri": "wiki://mitre-atlas",
        "name": "MITRE ATLAS",
        "description": "framework page, review_status=mvp_validated",
        "mimeType": "text/markdown"
      },
      {
        "uri": "wiki://model-evaluation-gap",
        "name": "Model Evaluation Gap",
        "description": "risk page, review_status=mvp_validated",
        "mimeType": "text/markdown"
      },
      {
        "uri": "wiki://nist-ai-rmf",
        "name": "NIST AI RMF",
        "description": "framework page, review_status=mvp_validated",
        "mimeType": "text/markdown"
      },
      {
        "uri": "wiki://owasp-llm-top10",
        "name": "OWASP LLM Top 10",
        "description": "framework page, review_status=mvp_validated",
        "mimeType": "text/markdown"
      },
      {
        "uri": "wiki://prompt-injection",
        "name": "Prompt Injection",
        "description": "risk page, review_status=mvp_validated",
        "mimeType": "text/markdown"
      },
      {
        "uri": "wiki://risk-inventory",
        "name": "Risk Inventory",
        "description": "control page, review_status=mvp_validated",
        "mimeType": "text/markdown"
      },
      {
        "uri": "wiki://sensitive-information-disclosure",
        "name": "Sensitive Information Disclosure",
        "description": "risk page, review_status=mvp_validated",
        "mimeType": "text/markdown"
      },
      {
        "uri": "wiki://tool-permission-boundary",
        "name": "Tool Permission Boundary",
        "description": "control page, review_status=mvp_validated",
        "mimeType": "text/markdown"
      }
    ]
  },
  "prompts": {
    "prompts": [
      {
        "name": "governance_answer",
        "description": "Answer with source-grounded wiki evidence and risk-control links.",
        "arguments": [
          {
            "name": "query",
            "description": "Governance question",
            "required": true
          }
        ]
      },
      {
        "name": "risk_review",
        "description": "Review a risk page and propose missing controls or evidence.",
        "arguments": [
          {
            "name": "risk_id",
            "description": "Risk page slug",
            "required": true
          }
        ]
      }
    ]
  },
  "coverage": {
    "page_count": 13,
    "unique_source_count": 6,
    "missing_source_count": 0,
    "missing_evidence_map_count": 0,
    "source_count_mismatch_count": 0,
    "unregistered_source_count": 0,
    "blocking_issue_count": 0,
    "pages": [
      {
        "slug": "audit-logging",
        "type": "control",
        "review_status": "mvp_validated",
        "source_count": 2,
        "declared_source_count": "2",
        "has_evidence_map": true
      },
      {
        "slug": "eu-ai-act",
        "type": "framework",
        "review_status": "mvp_validated",
        "source_count": 1,
        "declared_source_count": "1",
        "has_evidence_map": true
      },
      {
        "slug": "evaluation-and-monitoring",
        "type": "control",
        "review_status": "mvp_validated",
        "source_count": 2,
        "declared_source_count": "2",
        "has_evidence_map": true
      },
      {
        "slug": "excessive-agency",
        "type": "risk",
        "review_status": "mvp_validated",
        "source_count": 2,
        "declared_source_count": "2",
        "has_evidence_map": true
      },
      {
        "slug": "human-oversight-gate",
        "type": "control",
        "review_status": "mvp_validated",
        "source_count": 2,
        "declared_source_count": "2",
        "has_evidence_map": true
      },
      {
        "slug": "mitre-atlas",
        "type": "framework",
        "review_status": "mvp_validated",
        "source_count": 1,
        "declared_source_count": "1",
        "has_evidence_map": true
      },
      {
        "slug": "model-evaluation-gap",
        "type": "risk",
        "review_status": "mvp_validated",
        "source_count": 2,
        "declared_source_count": "2",
        "has_evidence_map": true
      },
      {
        "slug": "nist-ai-rmf",
        "type": "framework",
        "review_status": "mvp_validated",
        "source_count": 2,
        "declared_source_count": "2",
        "has_evidence_map": true
      },
      {
        "slug": "owasp-llm-top10",
        "type": "framework",
        "review_status": "mvp_validated",
        "source_count": 1,
        "declared_source_count": "1",
        "has_evidence_map": true
      },
      {
        "slug": "prompt-injection",
        "type": "risk",
        "review_status": "mvp_validated",
        "source_count": 2,
        "declared_source_count": "2",
        "has_evidence_map": true
      },
      {
        "slug": "risk-inventory",
        "type": "control",
        "review_status": "mvp_validated",
        "source_count": 2,
        "declared_source_count": "2",
        "has_evidence_map": true
      },
      {
        "slug": "sensitive-information-disclosure",
        "type": "risk",
        "review_status": "mvp_validated",
        "source_count": 2,
        "declared_source_count": "2",
        "has_evidence_map": true
      },
      {
        "slug": "tool-permission-boundary",
        "type": "control",
        "review_status": "mvp_validated",
        "source_count": 2,
        "declared_source_count": "2",
        "has_evidence_map": true
      }
    ],
    "source_refs": {
      "raw/ai_governance/nist-ai-rmf.md": 8,
      "raw/ai_governance/iso-iec-42001-overview.md": 1,
      "raw/ai_governance/eu-ai-act.md": 3,
      "raw/ai_governance/nist-ai-rmf-playbook.md": 4,
      "raw/ai_governance/owasp-llm-top10.md": 5,
      "raw/ai_governance/mitre-atlas.md": 2
    },
    "missing_sources": [],
    "missing_evidence_map": [],
    "source_count_mismatches": [],
    "unregistered_sources": []
  },
  "trace": {
    "found": true,
    "page": {
      "slug": "prompt-injection",
      "title": "Prompt Injection",
      "type": "risk",
      "review_status": "mvp_validated",
      "quality_class": "source-linked",
      "path": "wiki/concepts/prompt-injection.md"
    },
    "sources": [
      {
        "source": "raw/ai_governance/owasp-llm-top10.md",
        "exists": true
      },
      {
        "source": "raw/ai_governance/mitre-atlas.md",
        "exists": true
      }
    ],
    "related_controls": [
      "tool-permission-boundary",
      "human-oversight-gate",
      "audit-logging"
    ],
    "mitigates": [],
    "frameworks": [
      "OWASP LLM Top 10",
      "MITRE ATLAS"
    ],
    "outgoing_edges": [
      {
        "source": "prompt-injection",
        "target": "tool-permission-boundary",
        "type": "related_controls"
      },
      {
        "source": "prompt-injection",
        "target": "human-oversight-gate",
        "type": "related_controls"
      },
      {
        "source": "prompt-injection",
        "target": "audit-logging",
        "type": "related_controls"
      },
      {
        "source": "prompt-injection",
        "target": "mitre-atlas",
        "type": "frameworks"
      },
      {
        "source": "prompt-injection",
        "target": "tool-permission-boundary",
        "type": "wikilink"
      },
      {
        "source": "prompt-injection",
        "target": "human-oversight-gate",
        "type": "wikilink"
      },
      {
        "source": "prompt-injection",
        "target": "audit-logging",
        "type": "wikilink"
      },
      {
        "source": "prompt-injection",
        "target": "tool-permission-boundary",
        "type": "wikilink"
      }
    ],
    "incoming_edges": [
      {
        "source": "human-oversight-gate",
        "target": "prompt-injection",
        "type": "mitigates"
      },
      {
        "source": "human-oversight-gate",
        "target": "prompt-injection",
        "type": "wikilink"
      },
      {
        "source": "mitre-atlas",
        "target": "prompt-injection",
        "type": "wikilink"
      },
      {
        "source": "owasp-llm-top10",
        "target": "prompt-injection",
        "type": "wikilink"
      },
      {
        "source": "tool-permission-boundary",
        "target": "prompt-injection",
        "type": "mitigates"
      },
      {
        "source": "tool-permission-boundary",
        "target": "prompt-injection",
        "type": "wikilink"
      }
    ],
    "connectivity": {
      "incoming_count": 6,
      "outgoing_count": 8,
      "source_count": 2
    }
  },
  "claimTrace": {
    "found": true,
    "page": {
      "slug": "prompt-injection",
      "title": "Prompt Injection",
      "path": "wiki/concepts/prompt-injection.md"
    },
    "claim_query": "tool boundaries",
    "claim_count": 1,
    "claims": [
      {
        "claim": "Tool boundaries reduce the blast radius of malicious instructions.",
        "evidence": "[[tool-permission-boundary]]",
        "status": "mvp_validated",
        "raw_refs": [],
        "wiki_refs": [
          {
            "slug": "tool-permission-boundary",
            "found": true
          }
        ]
      }
    ]
  },
  "quality": {
    "page_id": null,
    "page_count": 13,
    "average_score": 100.0,
    "status": "pass",
    "blocking_issue_count": 0,
    "warning_count": 0,
    "blocking_issues": [],
    "warnings": [],
    "source_coverage": {
      "missing_source_count": 0,
      "missing_evidence_map_count": 0,
      "source_count_mismatch_count": 0
    },
    "pages": [
      {
        "slug": "audit-logging",
        "title": "Audit Logging",
        "type": "control",
        "review_status": "mvp_validated",
        "score": 100,
        "status": "pass",
        "claim_count": 2,
        "source_count": 2,
        "issues": {
          "missing_fields": [],
          "missing_source_files": [],
          "missing_evidence_map": false,
          "broken_wikilinks": []
        }
      },
      {
        "slug": "eu-ai-act",
        "title": "EU AI Act",
        "type": "framework",
        "review_status": "mvp_validated",
        "score": 100,
        "status": "pass",
        "claim_count": 1,
        "source_count": 1,
        "issues": {
          "missing_fields": [],
          "missing_source_files": [],
          "missing_evidence_map": false,
          "broken_wikilinks": []
        }
      },
      {
        "slug": "evaluation-and-monitoring",
        "title": "Evaluation and Monitoring",
        "type": "control",
        "review_status": "mvp_validated",
        "score": 100,
        "status": "pass",
        "claim_count": 2,
        "source_count": 2,
        "issues": {
          "missing_fields": [],
          "missing_source_files": [],
          "missing_evidence_map": false,
          "broken_wikilinks": []
        }
      },
      {
        "slug": "excessive-agency",
        "title": "Excessive Agency",
        "type": "risk",
        "review_status": "mvp_validated",
        "score": 100,
        "status": "pass",
        "claim_count": 2,
        "source_count": 2,
        "issues": {
          "missing_fields": [],
          "missing_source_files": [],
          "missing_evidence_map": false,
          "broken_wikilinks": []
        }
      },
      {
        "slug": "human-oversight-gate",
        "title": "Human Oversight Gate",
        "type": "control",
        "review_status": "mvp_validated",
        "score": 100,
        "status": "pass",
        "claim_count": 2,
        "source_count": 2,
        "issues": {
          "missing_fields": [],
          "missing_source_files": [],
          "missing_evidence_map": false,
          "broken_wikilinks": []
        }
      },
      {
        "slug": "mitre-atlas",
        "title": "MITRE ATLAS",
        "type": "framework",
        "review_status": "mvp_validated",
        "score": 100,
        "status": "pass",
        "claim_count": 1,
        "source_count": 1,
        "issues": {
          "missing_fields": [],
          "missing_source_files": [],
          "missing_evidence_map": false,
          "broken_wikilinks": []
        }
      },
      {
        "slug": "model-evaluation-gap",
        "title": "Model Evaluation Gap",
        "type": "risk",
        "review_status": "mvp_validated",
        "score": 100,
        "status": "pass",
        "claim_count": 2,
        "source_count": 2,
        "issues": {
          "missing_fields": [],
          "missing_source_files": [],
          "missing_evidence_map": false,
          "broken_wikilinks": []
        }
      },
      {
        "slug": "nist-ai-rmf",
        "title": "NIST AI RMF",
        "type": "framework",
        "review_status": "mvp_validated",
        "score": 100,
        "status": "pass",
        "claim_count": 2,
        "source_count": 2,
        "issues": {
          "missing_fields": [],
          "missing_source_files": [],
          "missing_evidence_map": false,
          "broken_wikilinks": []
        }
      },
      {
        "slug": "owasp-llm-top10",
        "title": "OWASP LLM Top 10",
        "type": "framework",
        "review_status": "mvp_validated",
        "score": 100,
        "status": "pass",
        "claim_count": 1,
        "source_count": 1,
        "issues": {
          "missing_fields": [],
          "missing_source_files": [],
          "missing_evidence_map": false,
          "broken_wikilinks": []
        }
      },
      {
        "slug": "prompt-injection",
        "title": "Prompt Injection",
        "type": "risk",
        "review_status": "mvp_validated",
        "score": 100,
        "status": "pass",
        "claim_count": 3,
        "source_count": 2,
        "issues": {
          "missing_fields": [],
          "missing_source_files": [],
          "missing_evidence_map": false,
          "broken_wikilinks": []
        }
      },
      {
        "slug": "risk-inventory",
        "title": "Risk Inventory",
        "type": "control",
        "review_status": "mvp_validated",
        "score": 100,
        "status": "pass",
        "claim_count": 2,
        "source_count": 2,
        "issues": {
          "missing_fields": [],
          "missing_source_files": [],
          "missing_evidence_map": false,
          "broken_wikilinks": []
        }
      },
      {
        "slug": "sensitive-information-disclosure",
        "title": "Sensitive Information Disclosure",
        "type": "risk",
        "review_status": "mvp_validated",
        "score": 100,
        "status": "pass",
        "claim_count": 2,
        "source_count": 2,
        "issues": {
          "missing_fields": [],
          "missing_source_files": [],
          "missing_evidence_map": false,
          "broken_wikilinks": []
        }
      },
      {
        "slug": "tool-permission-boundary",
        "title": "Tool Permission Boundary",
        "type": "control",
        "review_status": "mvp_validated",
        "score": 100,
        "status": "pass",
        "claim_count": 2,
        "source_count": 2,
        "issues": {
          "missing_fields": [],
          "missing_source_files": [],
          "missing_evidence_map": false,
          "broken_wikilinks": []
        }
      }
    ]
  },
  "draftPreview": {
    "created": false,
    "dry_run": true,
    "path": "wiki/drafts/nist-ai-rmf-draft-example.md",
    "slug": "nist-ai-rmf-draft-example",
    "title": "NIST AI RMF Draft Example",
    "source": "raw/ai_governance/nist-ai-rmf.md",
    "preview": "---\ntitle: \"NIST AI RMF Draft Example\"\ntype: concept\nstatus: draft\nquality_class: source-linked\nreview_status: needs_review\nconfidence: 0.5\nframeworks: []\nrelated_controls: []\nmitigates: []\nsource_count: 1\nsources:\n  - raw/ai_governance/nist-ai-rmf.md\nsource_hashes: []\nstale: false\ncreated: 2026-06-15\nupdated: 2026-06-15\n---\n\n# NIST AI RMF Draft Example\n\n## Summary\n\n# NIST AI Risk Management Framework source_name: NIST AI Risk Management Framework source_type: framework source_url: https://www.nist.gov/itl/ai-risk-management-framework provider: National Institute of Standards and Technology usage_purpose: Define AI risk management functions and governance concepts for the wiki. ## Notes NIST AI RMF organizes AI risk management around governance, mapping, measurement, and management functions. This source is used as the umbrella framework for AI governanc\n\n## Evidence Map\n\n| Claim | Evidence | Status |\n| --- | --- | --- |\n| Draft page is derived from the supplied raw source. | `raw/ai_governance/nist-ai-rmf.md` | needs_review |\n\n## Related\n\n- REVIEW_REQUIRED: Link this draft to existing wiki pages.\n\n## Maintenance Notes\n\n- REVIEW_REQUIRED: Human review is required before promotion to `mvp_validated`.\n\nFile updated at: 2026-06-15 00:00:00 +09:00\n"
  },
  "manifest": {
    "project": "AI Governance Control Wiki",
    "required_root_files": {
      "DOMAIN.md": {
        "exists": true,
        "path": "submission/DOMAIN.md",
        "resolved_path": "ai-governance-mcp-wiki/submission/DOMAIN.md",
        "bytes": 4852
      },
      "JOURNAL.md": {
        "exists": true,
        "path": "submission/JOURNAL.md",
        "resolved_path": "ai-governance-mcp-wiki/submission/JOURNAL.md",
        "bytes": 7695
      },
      "PRD.md": {
        "exists": true,
        "path": "submission/PRD.md",
        "resolved_path": "ai-governance-mcp-wiki/submission/PRD.md",
        "bytes": 10818
      },
      "README.md": {
        "exists": true,
        "path": "submission/README.md",
        "resolved_path": "ai-governance-mcp-wiki/submission/README.md",
        "bytes": 10897
      },
      "MVP.png": {
        "exists": true,
        "path": "submission/MVP.png",
        "resolved_path": "ai-governance-mcp-wiki/submission/MVP.png",
        "bytes": 181430
      }
    },
    "all_required_root_files_present": true,
    "zip": {
      "path": "AI_Governance_Control_Wiki_Submission.zip",
      "exists": true,
      "root_layout_ok": true,
      "extracted_layout_ok": true,
      "entry_count": 150,
      "cache_entry_count": 0,
      "top_level_entries": [
        "DOMAIN.md",
        "JOURNAL.md",
        "MVP.png",
        "PRD.md",
        "README.md",
        "project/README.md",
        "project/app/app.js",
        "project/app/index.html",
        "project/app/styles.css",
        "project/app/wiki-data.js",
        "project/docs/AGENT_SPEC.md",
        "project/logs/feature-research.md"
      ]
    },
    "mcp_tools": [
      "search_wiki",
      "read_page",
      "list_pages",
      "map_risk_to_controls",
      "get_wiki_graph",
      "run_maintenance_check",
      "save_query_note",
      "health_report",
      "source_coverage",
      "trace_page",
      "trace_claim",
      "quality_report",
      "create_wiki_draft",
      "submission_manifest"
    ]
  },
  "tools": [
    "search_wiki",
    "read_page",
    "list_pages",
    "map_risk_to_controls",
    "get_wiki_graph",
    "run_maintenance_check",
    "save_query_note",
    "health_report",
    "resources/list",
    "resources/read",
    "prompts/list",
    "prompts/get",
    "source_coverage",
    "trace_page",
    "trace_claim",
    "quality_report",
    "create_wiki_draft",
    "submission_manifest"
  ]
};
