# Quality Gate

## Pass Conditions

- Missing sources: 0
- Missing Evidence Map: 0
- Stale pages: 0 for MVP
- Every risk page has at least one related control
- Every control page has at least one mitigated risk
- Source pages remain draft until reviewed

## Review Queue

`review_status: needs_review` is not a failure. It means the page has source links but still needs human or agent review before becoming stable.

## Stable Promotion

Stable pages require:

- `review_status: reviewed`
- `quality_class: stable`
- `confidence >= 0.8`
- `stale: false`
- Evidence Map claims reviewed

파일 갱신 시각: 2026-06-04 03:05:00 +09:00
