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
        "bytes": 10147
      },
      "README.md": {
        "exists": true,
        "path": "submission/README.md",
        "resolved_path": "ai-governance-mcp-wiki/submission/README.md",
        "bytes": 10169
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
