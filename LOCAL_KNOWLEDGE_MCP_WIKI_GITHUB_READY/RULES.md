# RULES.md

## Harness Rules

This project is considered valid when:

- `raw/`, `wiki/`, `schema/`, `tools/`, `viewer/`, `app/`, `skills/`, `hooks/`, and `demo/` exist.
- At least one sample raw file exists under `raw/`.
- At least one Wiki page exists under `wiki/concepts/`.
- The MCP server exposes `tools/list` and `tools/call`.
- The dynamic viewer can load `app/index.html`.
- `viewer/index.html` redirects to `app/index.html` for backward compatibility.
- `demo/mvp.png` exists as proof that the Wiki rendered.

## Quality Rules

- Every stable Wiki page must include frontmatter.
- Every stable Wiki page must include `sources`.
- Every stable Wiki page must include an `## Evidence Map` section.
- Broken wikilinks are blocking issues.
- Missing raw evidence files are blocking issues.
- Viewer data must be regenerated with `python tools\render_viewer_data.py` after Wiki or app-data changes.

## Viewer Integrity Rules

- Source Coverage cards must reflect selected page source and quality data.
- Evidence Trace must show Raw Source, Wiki Page, Evidence Map, and Quality Gate steps.
- Reading Deck must stay client-side only and must not create repository files.
- Wiki Graph edges must use consistent node anchors and must not visually connect to arbitrary positions.

## Agent Rules

- Reader agents may call read-only tools.
- Maintainer agents may run quality checks.
- Editor agents may create drafts but must not overwrite stable pages.
- Human review is required before a draft becomes a stable concept page.

파일 갱신 시각: 2026-06-15 19:45:00 +09:00
