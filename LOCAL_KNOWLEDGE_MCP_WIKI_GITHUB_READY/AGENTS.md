# AGENTS.md

## Project Overview

This repository is a local Markdown-only LLM Wiki kit. It turns raw Markdown notes into reviewable Wiki pages, serves the Wiki through MCP-style JSON-RPC tools, and renders a static viewer for human inspection.

## Setup Commands

- Run the smoke test: `python .\tools\mcp_server\smoke_test.py`
- Rebuild viewer data: `python .\tools\render_viewer_data.py`
- Run quality checks: `python .\tools\validate_wiki.py`
- Start the viewer: `python -m http.server 8000`, then open `http://localhost:8000/app/index.html`
- Start the MCP server: `python .\tools\mcp_server\server.py`

## Editing Rules

- Treat files in `raw/` as source evidence.
- Put generated or reviewed Wiki pages in `wiki/`.
- Use `wiki/drafts/` for new pages until a human reviews them.
- Do not promote a draft to `wiki/concepts/` unless sources and Evidence Map are present.
- Do not delete raw evidence while editing Wiki pages.
- Keep MCP tool names stable because README examples and harness checks depend on them.
- Keep `app/index.html`, `app/app.js`, `app/styles.css`, and `app/wiki-data.js` aligned when changing viewer behavior.
- `viewer/index.html` is only a compatibility redirect to `app/index.html`.

## Required Checks

Before finishing a change, run:

```powershell
python .\tools\mcp_server\smoke_test.py
python .\tools\validate_wiki.py
python .\tools\render_viewer_data.py
```

Viewer-specific changes should also preserve:

- Source Coverage cards map to `source_coverage`.
- Evidence Trace steps map to `source_coverage`, `read_page`, `trace_claim`, and `quality_report`.
- Reading Deck uses browser localStorage only and must not write repository files.
- Wiki Graph edges should connect from a left/right node anchor consistently.

## Safety

- `create_wiki_draft` may write only under `wiki/drafts/`.
- Raw input paths must stay inside `raw/`.
- Unknown pages must fail closed in quality checks.

파일 갱신 시각: 2026-06-15 19:45:00 +09:00
