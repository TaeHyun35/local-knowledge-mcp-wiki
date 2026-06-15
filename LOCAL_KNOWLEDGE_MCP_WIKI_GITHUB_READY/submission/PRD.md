# PRD.md - AI Governance Control Wiki

## 과제 매핑

이 문서는 과제 요구 산출물 중 **에이전트가 실제 작업을 위해 작성한 PRD 문서 또는 프로젝트 Goal 달성을 위한 사양서**에 해당한다.

## Goal

AI 거버넌스 지식을 Markdown Wiki로 구조화하고, MCP-style 서버가 Agent에게 검색, 읽기, 위험-통제 매핑, 출처 추적, 품질 검증, 초안 생성 기능을 제공하는 실행 가능한 MVP를 만든다.

## Problem

AI 거버넌스 지식은 NIST, OWASP, MITRE, EU AI Act, ISO/IEC 42001처럼 여러 출처에 흩어져 있다. 일반 채팅 방식은 편하지만 출처, 검토 상태, 위험-통제 연결, 유지보수 이력을 놓치기 쉽다. 이 프로젝트는 지식을 Markdown으로 남기고 MCP Tool을 통해 Agent가 구조적으로 조회하게 만든다.

## Users

- LLM Wiki Tool 과제 제출자
- Wiki를 읽고 답변하는 AI Agent
- 위험-통제 관계를 검토하는 유지보수자
- 자동 채점 하네스 또는 교수자 평가자

## Functional Requirements

| ID | 요구사항 | 수용 기준 |
| --- | --- | --- |
| FR1 | Wiki 검색 | `search_wiki("oversight")`가 관련 페이지를 반환한다. |
| FR2 | 페이지 읽기 | `read_page("prompt-injection")`가 Markdown 본문과 metadata를 반환한다. |
| FR3 | 페이지 목록 | `list_pages(page_type="risk")`가 위험 페이지 목록을 반환한다. |
| FR4 | 위험-통제 매핑 | `map_risk_to_controls("prompt-injection")`가 관련 controls를 반환한다. |
| FR5 | 그래프 제공 | `get_wiki_graph()`가 nodes/edges를 반환한다. |
| FR6 | 유지보수 검사 | `run_maintenance_check()`가 구조 이슈와 review queue를 보고한다. |
| FR7 | Query 기록 | `save_query_note()`가 `wiki/queries/`에 Markdown 기록을 만든다. |
| FR8 | MCP Resources | `resources/list`, `resources/read`가 Wiki 페이지를 `wiki://slug` 리소스로 제공한다. |
| FR9 | MCP Prompts | `prompts/list`, `prompts/get`이 답변/리뷰 프롬프트 템플릿을 제공한다. |
| FR10 | MVP GUI | `app/index.html`이 페이지, 도구, 그래프, health status를 보여준다. |
| FR11 | Agent SPEC | `docs/AGENT_SPEC.md`가 Agent 역할, 권한, 금지 기능, workflow를 설명한다. |
| FR12 | Wiki Serving 설명 | README가 무엇을/왜/어떻게 만들었는지와 시각화/도구 사용 방식을 설명한다. |
| FR13 | Claim trace | `trace_claim("prompt-injection")`이 Evidence Map claim과 raw/wiki evidence를 반환한다. |
| FR14 | Quality gate | `quality_report()`가 페이지별 점수와 blocking issue count를 반환한다. |
| FR15 | Draft pipeline | `create_wiki_draft(raw_path, dry_run=true)`가 raw 자료 1건에서 Wiki draft preview를 만든다. |

## Non-Functional Requirements

- Python 3.10+와 PowerShell만으로 실행 가능해야 한다.
- 외부 Python 패키지 설치 없이 smoke test가 통과해야 한다.
- Markdown 파일은 사람이 읽을 수 있어야 한다.
- MCP tool name과 JSON-RPC method는 자동 채점 하네스가 찾기 쉽게 명시적이어야 한다.
- 모든 주요 Wiki 페이지는 source와 Evidence Map을 가져야 한다.
- `health_report` 기준으로 `Missing sources: 0`, `Missing evidence map: 0`이어야 한다.
- 쓰기 기능은 `wiki/queries/` 또는 `wiki/drafts/`처럼 제한된 경로만 사용해야 한다.

## MCP Tool SPEC

| Tool | 목적 | 읽기/쓰기 |
| --- | --- | --- |
| `search_wiki` | 키워드로 Wiki 페이지 검색 | read |
| `read_page` | slug로 페이지 본문 읽기 | read |
| `list_pages` | type/review_status 기준 목록 조회 | read |
| `map_risk_to_controls` | 위험 페이지에서 관련 통제 찾기 | read |
| `get_wiki_graph` | 위험-통제-프레임워크 그래프 반환 | read |
| `run_maintenance_check` | Wiki 검증 실행 | read/log |
| `save_query_note` | 사용자 질문과 검색 결과 기록 | write |
| `health_report` | 최신 health report 조회 | read |
| `source_coverage` | 출처 파일, Evidence Map, source_count 정합성 요약 | read |
| `trace_page` | 특정 페이지의 출처와 incoming/outgoing 연결 추적 | read |
| `trace_claim` | Evidence Map claim을 raw source와 wiki link로 추적 | read |
| `quality_report` | frontmatter, source, Evidence Map, wikilink 검증 점수화 | read |
| `create_wiki_draft` | raw 자료 1건에서 검토 대기 Wiki draft 생성 또는 미리보기 | write/dry-run |
| `submission_manifest` | 제출 산출물, ZIP layout, MCP Tool 목록 검증 | read |

## Agent Permission SPEC

| 역할 | 허용 | 제한 |
| --- | --- | --- |
| Reader Agent | 검색, 읽기, 리소스 조회 | 파일 쓰기 금지 |
| Mapper Agent | 위험-통제 매핑, 관련 페이지 조회 | 출처 없는 매핑 추가 금지 |
| Maintainer Agent | 유지보수 검사, source coverage, quality report 실행 | `raw/` 삭제 금지 |
| Editor Agent | query note와 draft 초안 작성 | 사람 검토 없이 stable page 승격 금지 |
| Harness Agent | tool discovery, smoke test, manifest 검증 | Wiki 내용 임의 수정 금지 |

상세 Agent SPEC은 `docs/AGENT_SPEC.md`에 분리되어 있다.

## MVP Scope

포함:

- 위험 페이지 4개
- 통제 페이지 5개
- 프레임워크 페이지 4개
- MCP Tools 14개
- MCP Resources/Prompts 기본 구현
- 정적 GUI와 MVP 이미지
- 제출용 Markdown 문서 4종
- Agent SPEC 문서

제외:

- 실제 LLM API 호출
- 인증/권한 시스템
- 데이터베이스
- 법적 판단 자동화
- 표준 문서 전문 자동 동기화

## Success Criteria

1. `python .\mcp_server\smoke_test.py`가 성공한다.
2. `tools/list`가 14개 Tool을 반환한다.
3. `map_risk_to_controls("prompt-injection")`가 2개 이상 control을 반환한다.
4. `resources/read`로 `wiki://prompt-injection`을 읽을 수 있다.
5. `quality_report()`가 `status: pass`, `blocking_issue_count: 0`을 반환한다.
6. `trace_claim("prompt-injection")`이 1개 이상 claim을 반환한다.
7. `create_wiki_draft(..., dry_run=true)`가 파일을 쓰지 않고 preview를 반환한다.
8. 제출 폴더에 `DOMAIN.md`, `JOURNAL.md`, `PRD.md`, `README.md`, `MVP.png`가 존재한다.

## Testability Matrix

| 검증 대상 | 명령 또는 요청 | 기대 결과 |
| --- | --- | --- |
| smoke test | `python .\mcp_server\smoke_test.py` | `SMOKE TEST OK`, `pages=13`, `risks=4` |
| tool discovery | JSON-RPC `tools/list` | 14개 Tool 반환 |
| risk mapping | `tools/call` + `map_risk_to_controls` | `prompt-injection` 관련 controls 반환 |
| resource serving | `resources/read` + `wiki://prompt-injection` | Markdown page text 반환 |
| prompt template | `prompts/get` + `governance_answer` | source-grounded answer workflow 반환 |
| source coverage | `tools/call` + `source_coverage` | `blocking_issue_count: 0` |
| page trace | `tools/call` + `trace_page` | sources, controls, edges 반환 |
| claim trace | `tools/call` + `trace_claim` | Evidence Map claim과 evidence refs 반환 |
| quality gate | `tools/call` + `quality_report` | `status: pass`, `blocking_issue_count: 0` |
| unknown page | `quality_report("missing-page")` | `status: fail`, `blocking_issue_count: 1` |
| draft pipeline | `tools/call` + `create_wiki_draft` | raw source 기반 draft preview 또는 draft 생성 |
| unsafe draft path | `create_wiki_draft("submission/README.md")` | `raw_path must be inside raw/` |
| submission manifest | `tools/call` + `submission_manifest` | root deliverables와 ZIP layout OK 반환 |
| maintenance | `powershell ... maintenance_check.ps1` | `Blocking issues: 0` |
| health report | `powershell ... wiki_health_report.ps1` | `Missing sources: 0`, `Missing evidence map: 0` |
| GUI data | `python .\scripts\generate_app_data.py` | `app/wiki-data.js` 갱신 |

## Automated Harness Expectations

자동 하네스는 다음 순서로 평가할 수 있다.

1. ZIP 또는 repo를 해제한다.
2. 루트에 `DOMAIN.md`, `JOURNAL.md`, `PRD.md`, `README.md`, `MVP.png`가 있는지 확인한다.
3. `project/` 폴더로 이동한다.
4. `python .\mcp_server\smoke_test.py`를 실행한다.
5. `python .\mcp_server\server.py`에 JSON-RPC 한 줄 요청을 전달한다.
6. `tools/list`, `tools/call`, `resources/read`, `prompts/get`의 응답 구조를 확인한다.

## Response Contract

| Method | 필수 입력 | 반환 구조 |
| --- | --- | --- |
| `tools/list` | 없음 | `{ "tools": [...] }` |
| `tools/call` | `name`, `arguments` | `{ "content": [{ "type": "text", "text": "..." }] }` |
| `resources/list` | 없음 | `{ "resources": [...] }` |
| `resources/read` | `uri` | `{ "contents": [{ "uri": "...", "mimeType": "text/markdown", "text": "..." }] }` |
| `prompts/list` | 없음 | `{ "prompts": [...] }` |
| `prompts/get` | `name`, `arguments` | `{ "messages": [...] }` |
| `tools/call: source_coverage` | 없음 | `{ "page_count": 13, "blocking_issue_count": 0, ... }` |
| `tools/call: trace_page` | `page_id` | `{ "found": true, "sources": [...], "connectivity": {...} }` |
| `tools/call: trace_claim` | `page_id`, optional `claim_query` | `{ "found": true, "claim_count": 1, "claims": [...] }` |
| `tools/call: quality_report` | optional `page_id` | `{ "status": "pass", "average_score": 100, "blocking_issue_count": 0, ... }` |
| `tools/call: create_wiki_draft` | `raw_path`, optional `title`, `dry_run` | `{ "created": false, "dry_run": true, "path": "wiki/drafts/...", "preview": "..." }` |
| `tools/call: submission_manifest` | 없음 | `{ "all_required_root_files_present": true, "zip": {"root_layout_ok": true, "extracted_layout_ok": true, ...} }` |

## Quality Gates

- Blocking structural issue는 0개여야 한다.
- Wiki 페이지는 `mvp_validated` 또는 명확한 review status를 가져야 한다.
- 출처가 없는 concept page는 없어야 한다.
- Evidence Map이 없는 concept page는 없어야 한다.
- Broken wikilink가 없어야 한다.
- 제출 ZIP에는 Python cache 파일이 없어야 한다.
- Draft 생성은 기존 파일을 덮어쓰지 않아야 한다.
- `raw/` 외부 파일은 draft 입력으로 사용할 수 없어야 한다.

파일 갱신 시각: 2026-06-15 00:00:00 +09:00
