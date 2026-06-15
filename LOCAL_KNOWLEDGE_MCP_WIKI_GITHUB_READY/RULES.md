# RULES.md

## Harness Rules

This project is considered valid when:

- `raw/`, `wiki/`, `schema/`, `tools/`, `viewer/`, `skills/`, `hooks/`, and `demo/` exist.
- At least one sample raw file exists under `raw/`.
- At least one Wiki page exists under `wiki/concepts/`.
- The MCP server exposes `tools/list` and `tools/call`.
- The viewer can load `viewer/index.html`.
- `demo/mvp.png` exists as proof that the Wiki rendered.

## Quality Rules

- Every stable Wiki page must include frontmatter.
- Every stable Wiki page must include `sources`.
- Every stable Wiki page must include an `## Evidence Map` section.
- Broken wikilinks are blocking issues.
- Missing raw evidence files are blocking issues.

## Agent Rules

- Reader agents may call read-only tools.
- Maintainer agents may run quality checks.
- Editor agents may create drafts but must not overwrite stable pages.
- Human review is required before a draft becomes a stable concept page.

파일 갱신 시각: 2026-06-15 00:00:00 +09:00
