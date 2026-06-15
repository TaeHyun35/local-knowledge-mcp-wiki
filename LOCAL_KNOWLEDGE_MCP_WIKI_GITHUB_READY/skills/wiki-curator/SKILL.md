# Wiki Curator Skill

## When To Use

Use this skill when adding raw knowledge, creating a Wiki draft, checking evidence coverage, or preparing the viewer.

## Workflow

1. Put one source note in `raw/inbox/`.
2. Run `python .\tools\ingest.py raw/inbox/<file>.md`.
3. Review the generated draft in `wiki/drafts/`.
4. Run `python .\tools\validate_wiki.py`.
5. Run `python .\tools\render_viewer_data.py`.
6. Open `viewer/index.html` or serve it with `python -m http.server 8000 -d viewer`.

## Quality Bar

- A draft must have title, type, review status, source count, sources, and Evidence Map.
- A stable page must not contain unresolved `REVIEW_REQUIRED` markers.
- Do not delete raw sources to make validation pass.

파일 갱신 시각: 2026-06-15 00:00:00 +09:00
