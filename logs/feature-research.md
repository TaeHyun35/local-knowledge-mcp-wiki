# Additional Feature Research

## Feature Selection

The added features are deliberately small, read-only, and grading-oriented.

| Feature | Why it helps |
| --- | --- |
| `submission_manifest` | Lets a professor or automated harness verify deliverable presence, ZIP layout, and cache exclusion with one MCP call. |
| `source_coverage` | Proves source-file existence, Evidence Map coverage, and source count consistency across Wiki pages. |
| `trace_page` | Proves page-level connectivity by returning sources, related controls, frameworks, incoming edges, and outgoing edges. |
| `trace_claim` | Traces one Evidence Map claim to raw source refs and wiki refs, following provenance-oriented design. |
| `quality_report` | Converts schema/source/evidence/wikilink checks into a harness-friendly pass/fail score. |
| `create_wiki_draft` | Lets a new user turn one raw markdown source into a review-needed wiki draft or dry-run preview. |

## Stable Output Schemas

### `submission_manifest`

Required fields:

- `project`
- `required_root_files`
- `all_required_root_files_present`
- `zip.exists`
- `zip.root_layout_ok`
- `zip.extracted_layout_ok`
- `zip.cache_entry_count`
- `mcp_tools`

### `source_coverage`

Required fields:

- `page_count`
- `unique_source_count`
- `missing_source_count`
- `missing_evidence_map_count`
- `source_count_mismatch_count`
- `unregistered_source_count`
- `blocking_issue_count`
- `pages`
- `source_refs`

### `trace_page`

Required fields:

- `found`
- `page`
- `sources`
- `related_controls`
- `mitigates`
- `frameworks`
- `incoming_edges`
- `outgoing_edges`
- `connectivity`

### `trace_claim`

Required fields:

- `found`
- `page`
- `claim_query`
- `claim_count`
- `claims`
- `claims[].raw_refs`
- `claims[].wiki_refs`

### `quality_report`

Required fields:

- `page_count`
- `average_score`
- `status`
- `blocking_issue_count`
- `warning_count`
- `pages`
- `source_coverage`

### `create_wiki_draft`

Required fields:

- `created`
- `dry_run`
- `path`
- `slug`
- `title`
- `source`
- `preview`

## Sources Checked

1. Model Context Protocol Specification, 2025-06-18: https://modelcontextprotocol.io/specification/2025-06-18
2. MCP Tools specification: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
3. MCP Resources specification: https://modelcontextprotocol.io/specification/2025-06-18/server/resources
4. MCP Prompts specification: https://modelcontextprotocol.io/specification/2025-06-18/server/prompts
5. NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
6. NIST AI RMF Playbook: https://airc.nist.gov/airmf-resources/playbook/
7. OWASP Top 10 for LLM Applications: https://owasp.org/www-project-top-10-for-large-language-model-applications/
8. OWASP GenAI LLM Top 10 2025: https://genai.owasp.org/llm-top-10/
9. MITRE ATLAS: https://atlas.mitre.org/
10. EU AI Act, Regulation (EU) 2024/1689: https://eur-lex.europa.eu/eli/reg/2024/1689/oj
11. ISO/IEC 42001:2023: https://www.iso.org/standard/42001
12. JSON Schema: https://json-schema.org/
13. W3C PROV Overview: https://www.w3.org/TR/prov-overview/
14. W3C PROV-DM: https://www.w3.org/TR/prov-dm/

File updated at: 2026-06-15 00:00:00 +09:00
