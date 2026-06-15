# AGENT_SPEC.md - LLM Wiki Agent and MCP Tool Specification

## 목적

이 문서는 과제 요구 항목 중 **"LLM Wiki 편집 혹은 챗봇 기능등을 수행 할 Agents"**와 **"에이전트의 역할, 권한, 허용된 기능 등을 정리한 SPEC 문서"**에 해당한다.

AI Governance Control Wiki는 Markdown-only Wiki를 사람이 읽는 문서로 유지하면서, MCP 서버를 통해 Agent가 같은 지식을 Tool, Resource, Prompt 형태로 사용할 수 있게 한다.

## Wiki Pages의 구현과 Serving

### 무엇을 만들 것인가

- AI Governance / AI Risk Control 지식 도메인 Wiki
- 위험, 통제, 프레임워크를 분리한 Markdown Wiki Pages
- 각 페이지의 frontmatter 기반 메타데이터
- Evidence Map 기반 출처 추적
- 위험-통제-프레임워크 관계 그래프
- MCP JSON-RPC 서버
- 정적 MVP GUI

### 왜 만들 것인가

AI 거버넌스 지식은 NIST AI RMF, OWASP LLM Top 10, MITRE ATLAS, EU AI Act, ISO/IEC 42001처럼 여러 출처에 흩어져 있다. 일반 챗봇 답변만으로는 출처, 검토 상태, 위험-통제 연결, 유지보수 이력이 사라지기 쉽다.

이 Wiki Tool은 Agent가 지식을 임의 생성하지 않고 검증 가능한 Markdown 페이지와 연결된 Tool 응답을 사용하도록 만든다.

### 어떻게 만들 것인가

1. `raw/ai_governance/`에 원천 자료 요약과 source registry를 둔다.
2. `wiki/concepts/`에 stable Wiki Pages를 Markdown으로 둔다.
3. 각 페이지는 `type`, `review_status`, `quality_class`, `sources`, `related_controls`, `mitigates`, `frameworks`를 frontmatter로 가진다.
4. `mcp_server/wiki_core.py`가 Markdown을 파싱해 검색, 읽기, 매핑, 그래프, 무결성 검사를 수행한다.
5. `mcp_server/server.py`가 JSON-RPC stdin/stdout 방식으로 MCP-style Tool, Resource, Prompt를 서빙한다.
6. `app/index.html`과 `app/wiki-data.js`가 정적 GUI로 Wiki Pages와 Tool 결과를 시각화한다.

## Wiki Pages 시각화 방식

MVP GUI는 `app/index.html`에서 동작하는 정적 화면이다. 외부 서버나 LLM API가 없어도 확인할 수 있게 만들었다.

| 화면 영역 | 표시 내용 | 과제 연결 |
| --- | --- | --- |
| 왼쪽 Wiki 목록 | page type, review status, 검색 가능한 페이지 목록 | Wiki Pages 구현 확인 |
| 중앙 페이지 뷰 | 선택된 Markdown page의 제목, 요약, Evidence Map | 무엇을 만들었는지 확인 |
| 관계 그래프 | risk-control-framework nodes/edges | Wiki 관계 구조 확인 |
| 오른쪽 Agent 패널 | 질문, MCP Tool 목록, 예시 응답 | Tools and Agent 확인 |
| Health 영역 | page count, missing source, review queue | 유지보수 가능성 확인 |

정적 캡처 이미지는 `submission/MVP.png`이며, 제출 ZIP 루트에도 `MVP.png`로 포함된다.

## 도구 사용자가 필요로 하는 기능

| 필요 기능 | 구현 Tool 또는 파일 | 이유 |
| --- | --- | --- |
| Wiki 검색 | `search_wiki` | Agent가 관련 페이지 후보를 빠르게 찾는다. |
| Wiki 읽기 | `read_page`, `resources/read` | Agent가 Markdown 본문과 메타데이터를 근거로 답한다. |
| 페이지 목록 | `list_pages` | 도메인 범위와 review status를 확인한다. |
| 위험-통제 매핑 | `map_risk_to_controls` | 단순 검색이 아니라 의사결정에 필요한 연결을 제공한다. |
| 전체 그래프 | `get_wiki_graph` | GUI와 Agent가 관계망을 확인한다. |
| 유지보수 검사 | `run_maintenance_check`, `health_report` | 누락 출처, Evidence Map, review queue를 확인한다. |
| 질문 기록 | `save_query_note` | 사용자 질문과 결과를 `wiki/queries/`에 남긴다. |
| 출처 무결성 | `source_coverage` | 자동 채점 하네스가 출처 연결을 확인한다. |
| 페이지 추적성 | `trace_page` | 특정 페이지의 incoming/outgoing edge와 출처를 확인한다. |
| Claim 추적 | `trace_claim` | Evidence Map의 개별 claim이 어떤 raw source 또는 wiki link에 의존하는지 확인한다. |
| 품질 게이트 | `quality_report` | frontmatter, source, Evidence Map, wikilink를 점수화해 하네스가 판단할 수 있게 한다. |
| 초안 파이프라인 | `create_wiki_draft` | raw 자료 1건에서 `wiki/drafts/` 초안을 만들거나 dry-run preview를 제공한다. |
| 제출물 검증 | `submission_manifest` | 요구 산출물과 ZIP 구조를 검사한다. |

## MCP 서버 연결 구조

```text
AI Agent or Harness
        |
        | JSON-RPC stdin/stdout
        v
mcp_server/server.py
        |
        v
mcp_server/wiki_core.py
        |
        +--> wiki/concepts/*.md
        +--> raw/ai_governance/*
        +--> logs/*
        +--> wiki/queries/*
```

MCP 서버는 외부 패키지 없이 실행되며, Tool 호출 결과는 JSON 문자열로 반환된다. 자동 평가 하네스는 `tools/list`, `tools/call`, `resources/read`, `prompts/get` 순서로 기능을 검증할 수 있다.

## Agent 역할과 권한

| Agent | 목적 | 허용 기능 | 금지 기능 |
| --- | --- | --- | --- |
| Wiki Reader Agent | 질문에 맞는 페이지를 찾고 근거 기반 답변을 만든다. | `search_wiki`, `read_page`, `list_pages`, `resources/read`, `prompts/get` | 파일 쓰기, review status 변경 |
| Governance Mapping Agent | 위험과 통제의 연결을 설명한다. | `map_risk_to_controls`, `trace_page`, `get_wiki_graph` | 출처 없는 통제 추가, 법적 판단 자동화 |
| Wiki Maintainer Agent | 구조 오류와 유지보수 대상을 찾는다. | `run_maintenance_check`, `health_report`, `source_coverage`, `quality_report`, `submission_manifest` | `raw/` 삭제, stable page 자동 승격 |
| Wiki Editor Agent | 새 페이지 또는 수정안을 제안한다. | `create_wiki_draft`, `save_query_note`, 수정안 초안 작성 | 사람 검토 없이 canonical page 덮어쓰기 |
| Grading Harness Agent | 제출물 구조와 기능을 자동 확인한다. | `submission_manifest`, `source_coverage`, `quality_report`, `trace_claim`, `tools/list`, smoke test 실행 | Wiki 내용 임의 수정 |

## 권한 정책

- 기본 정책은 read-only이다.
- 쓰기 Tool은 `save_query_note` 하나이며, 저장 위치는 `wiki/queries/`로 제한한다.
- `raw/ai_governance/`는 근거 저장소이므로 Agent가 삭제하거나 자동 수정하지 않는다.
- `wiki/concepts/`의 stable page 변경은 사람이 검토한 뒤 반영한다.
- 출처 없는 주장, Evidence Map 없는 페이지, broken wikilink는 유지보수 실패로 취급한다.

## 챗봇 응답 워크플로우

1. 사용자 질문을 받는다.
2. `search_wiki`로 후보 페이지를 찾는다.
3. `read_page` 또는 `resources/read`로 본문을 읽는다.
4. 위험 질문이면 `map_risk_to_controls` 또는 `trace_page`로 연결 관계를 확인한다.
5. 답변에는 page slug와 Evidence Map 기준 출처를 함께 제시한다.
6. 불확실하거나 누락된 내용은 `save_query_note`로 유지보수 후보에 기록한다.

## 편집 워크플로우

1. 새 원천 자료를 `raw/ai_governance/`에 등록한다.
2. `source_registry.md`에 출처와 local file을 기록한다.
3. Wiki page draft를 작성한다.
4. frontmatter와 Evidence Map을 작성한다.
5. `run_maintenance_check`, `source_coverage`, `quality_report`, `trace_claim`으로 누락을 확인한다.
6. 사람이 검토한 뒤 `review_status: mvp_validated`로 승격한다.

## 검증 기준

| 검증 | 기대 결과 |
| --- | --- |
| `python .\mcp_server\smoke_test.py` | `SMOKE TEST OK` |
| `run_maintenance_check` | `Blocking issues: 0` |
| `source_coverage` | `blocking_issue_count: 0` |
| `trace_page("prompt-injection")` | sources, controls, incoming/outgoing edges 반환 |
| `trace_claim("prompt-injection")` | Evidence Map claim과 evidence refs 반환 |
| `quality_report()` | `status: pass`, `blocking_issue_count: 0` |
| `create_wiki_draft(..., dry_run=true)` | 파일 쓰기 없이 draft preview 반환 |
| `submission_manifest` | required root files present, ZIP layout OK |

파일 갱신 시각: 2026-06-15 00:00:00 +09:00
