# README.md - AI Governance Control Wiki

## 과제 산출물 맵

| 요구 산출물 | 제출 파일 |
| --- | --- |
| 지식 도메인 정의 문서 | `DOMAIN.md` |
| Agent 의사결정 Journal | `JOURNAL.md` |
| PRD / Goal 사양서 | `PRD.md` |
| 프로젝트 README 및 MCP Tool 설명 | `README.md` |
| MVP GUI 이미지 | `MVP.png` |

추가 구현 문서로 `project/docs/AGENT_SPEC.md`를 포함한다. 이 문서는 Wiki Pages 구현과 Serving, Tools and Agent 연결, 에이전트 역할/권한/허용 기능을 상세 SPEC 형태로 정리한다.

## 프로젝트 개요

**AI Governance Control Wiki**는 AI 위험과 거버넌스 통제를 Markdown-only Wiki로 정리하고, MCP-style JSON-RPC 서버를 통해 Agent가 Wiki를 검색, 조회, 검증, 추적할 수 있게 만든 실행 가능한 MVP다.

이 프로젝트는 사람이 읽는 Wiki와 Agent가 호출하는 Tool을 같은 지식베이스 위에 둔다. 모든 핵심 페이지는 출처, Evidence Map, review status, risk-control-framework 연결을 가진다.

## 무엇을 만드는가

- AI Governance / AI Risk Control 지식 도메인 Wiki
- `raw/` 원천 자료와 `wiki/` Markdown 페이지
- Evidence Map 기반 출처 추적
- 위험-통제-프레임워크 그래프
- MCP-style JSON-RPC Tool 서버
- 정적 MVP GUI
- 자동 검증용 smoke test와 maintenance check
- Agent 역할/권한 SPEC

## 왜 만드는가

일반 챗봇형 지식 관리에서는 답변의 출처, 검토 상태, 연결 관계가 쉽게 사라진다. 이 도구는 LLM/Agent가 지식베이스를 사용할 때 다음을 구조화한다.

- 어떤 Wiki 페이지를 근거로 답했는가
- 어떤 raw source에서 문장이 파생되었는가
- 어떤 risk가 어떤 control로 완화되는가
- 어떤 페이지가 하네스 검증을 통과하는가
- Agent가 어디까지 읽고 쓸 수 있는가

## 어떻게 동작하는가

```text
raw/ai_governance/       원천 자료 메모
wiki/concepts/           위험, 통제, 프레임워크 Wiki 페이지
wiki/drafts/             raw 자료에서 생성한 검토 대기 초안
wiki/queries/            Agent query note 저장 위치
mcp_server/wiki_core.py  Wiki 검색/읽기/검증/추적 로직
mcp_server/server.py     JSON-RPC Tool/Resource/Prompt 서버
app/                     정적 MVP GUI
logs/                    유지보수 로그와 health report
docs/AGENT_SPEC.md       Agent 역할, 권한, Wiki Serving SPEC
```

## Wiki Pages 구현과 Serving

| 과제 질문 | 구현 답변 |
| --- | --- |
| 무엇을 만들 것인가? | AI Governance / AI Risk Control을 대상으로 하는 Markdown-only LLM Wiki와 MCP Wiki Tool을 만든다. |
| 왜 만들 것인가? | 분산된 AI 위험/통제 지식을 출처, Evidence Map, 검토 상태, risk-control 연결과 함께 Agent가 재현 가능하게 사용하도록 하기 위해서다. |
| 어떻게 만들 것인가? | `raw/` 원천 자료, `wiki/concepts/` Markdown pages, `mcp_server/` JSON-RPC Tool 서버, `app/` 정적 GUI로 구성한다. |
| 어떤 방식으로 시각화할 것인가? | `app/index.html`과 `MVP.png`에서 페이지 목록, 선택 페이지, Evidence Map, Source Coverage, Evidence Trace, Reading Deck, 연결 controls, fixed-anchor graph, MCP Inspector, health status를 보여준다. |
| 도구 활용에 필요한 기능은 무엇인가? | 검색, 읽기, 목록, risk-control mapping, graph, maintenance check, source coverage, page trace, claim trace, quality report, draft pipeline, submission manifest가 필요하다. |
| Tool과 AI Agent는 어떻게 연결되는가? | Agent 또는 하네스가 stdin/stdout JSON-RPC로 `mcp_server/server.py`를 호출하고, 서버가 `wiki_core.py`를 통해 Markdown Wiki를 조회한다. |
| Agent SPEC은 어디에 있는가? | 상세 역할, 권한, 금지 기능, 챗봇/편집 workflow는 `project/docs/AGENT_SPEC.md`에 있다. |

## MCP Tool 목록

| Tool | 기능 | 권한 |
| --- | --- | --- |
| `search_wiki` | Wiki 페이지 키워드 검색 | read |
| `read_page` | slug 기반 페이지 읽기 | read |
| `list_pages` | type/review_status 기준 목록 조회 | read |
| `map_risk_to_controls` | 위험에 연결된 통제 매핑 | read |
| `get_wiki_graph` | graph nodes/edges 반환 | read |
| `run_maintenance_check` | Wiki 유지보수 검사 실행 | read/log |
| `save_query_note` | 질문과 검색 결과를 Markdown으로 저장 | write |
| `health_report` | 최신 health report 읽기 | read |
| `source_coverage` | source file, Evidence Map, source_count 무결성 요약 | read |
| `trace_page` | 특정 Wiki 페이지의 출처와 연결 관계 추적 | read |
| `trace_claim` | Evidence Map의 개별 claim을 raw source와 wiki link로 추적 | read |
| `quality_report` | frontmatter, source, Evidence Map, wikilink 품질 점수화 | read |
| `create_wiki_draft` | raw 자료 1건으로 검토 대기 Wiki draft 생성 또는 미리보기 | write/dry-run |
| `submission_manifest` | 제출 파일, ZIP 구조, Tool manifest 검증 | read |

추가 MCP 기능:

- `resources/list`, `resources/read`: Wiki 페이지를 `wiki://slug` 리소스로 제공
- `prompts/list`, `prompts/get`: source-grounded answer와 risk review 프롬프트 템플릿 제공

## 실행 방법

환경:

- Windows PowerShell
- Python 3.10 이상
- 외부 Python 패키지 설치 불필요

검증:

```powershell
cd ai-governance-mcp-wiki
python .\mcp_server\smoke_test.py
```

유지보수 검사:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\maintenance_check.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\wiki_health_report.ps1
```

MCP-style 서버 실행:

```powershell
python .\mcp_server\server.py
```

GUI 확인:

```text
http://localhost:8000/app/index.html
```

## JSON-RPC 요청 예시

```json
{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}
{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"map_risk_to_controls","arguments":{"risk_id":"prompt-injection"}}}
{"jsonrpc":"2.0","id":3,"method":"resources/read","params":{"uri":"wiki://prompt-injection"}}
{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"quality_report","arguments":{}}}
{"jsonrpc":"2.0","id":5,"method":"tools/call","params":{"name":"trace_claim","arguments":{"page_id":"prompt-injection","claim_query":"tool boundaries"}}}
{"jsonrpc":"2.0","id":6,"method":"tools/call","params":{"name":"create_wiki_draft","arguments":{"raw_path":"raw/ai_governance/nist-ai-rmf.md","title":"NIST AI RMF Draft Example","dry_run":true}}}
```

## 특별 기능 3종

| 기능 | 목적 | 하네스 검증 포인트 |
| --- | --- | --- |
| `trace_claim` | Evidence Map claim이 어떤 raw source 또는 wiki link에 근거하는지 추적한다. | `found: true`, `claim_count >= 1`, `raw_refs` 또는 `wiki_refs` 반환 |
| `quality_report` | 페이지별 frontmatter, source, Evidence Map, wikilink 품질을 점수화한다. | `status: pass`, `blocking_issue_count: 0`, unknown page는 `status: fail` |
| `create_wiki_draft` | raw 자료 1건에서 검토 대기 draft를 만들거나 dry-run preview를 반환한다. | `raw/` 외부 경로 거부, dry-run은 파일 미작성, 기존 draft 덮어쓰기 방지 |

## Viewer 특별 기능 3종

| 기능 | 화면 위치 | 연결 MCP Tool |
| --- | --- | --- |
| Source Coverage | 선택 페이지 아래 coverage cards | `source_coverage` |
| Evidence Trace | Raw Source → Wiki Page → Evidence Map → Quality Gate 단계 | `source_coverage`, `read_page`, `trace_claim`, `quality_report` |
| Reading Deck | 검토 중인 페이지 저장 목록 | client-side localStorage, repository write 없음 |

Wiki Graph Preview는 risk/control/framework 노드의 좌우 anchor를 통일해 간선이 임의 위치가 아니라 노드 경계에 연결되도록 구현했다.

## 검증 기준

정상 smoke test 예시:

```text
SMOKE TEST OK
pages=13 risks=4 graph_edges=65
```

정상 health report 기준:

```text
Missing sources: 0
Missing evidence map: 0
```

추가 기능 검증 기준:

- `quality_report`: `status: pass`, `blocking_issue_count: 0`
- `trace_claim`: Evidence Map claim과 raw/wiki evidence 연결 반환
- `create_wiki_draft`: `dry_run: true`일 때 파일을 쓰지 않고 draft preview 반환
- `create_wiki_draft`: `dry_run: false`일 때 기존 draft가 있으면 `created: false`, `error: draft already exists`

## Professor / Harness Quick Check

압축 해제 후 다음 순서로 확인할 수 있다.

```powershell
cd project
python .\mcp_server\smoke_test.py
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\maintenance_check.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\wiki_health_report.ps1
```

기대 출력:

```text
SMOKE TEST OK
pages=13 risks=4 graph_edges=65
Maintenance check passed.
Blocking issues: 0
```

## MCP Client Configuration Example

표준 MCP SDK를 추가 설치하지 않아도 MVP는 stdin/stdout JSON-RPC 서버로 실행된다. MCP client가 command 기반 서버 실행을 지원하면 다음 형태로 연결할 수 있다.

```json
{
  "mcpServers": {
    "ai-governance-control-wiki": {
      "command": "python",
      "args": ["mcp_server/server.py"],
      "cwd": "PROJECT_ABSOLUTE_PATH"
    }
  }
}
```

## MVP Image Caption

`MVP.png`는 Wiki page list, 선택된 risk page, Evidence Map, related controls, Source Coverage, Evidence Trace, Reading Deck, MCP Inspector, MCP Tool 목록, health status, risk-control-framework graph를 보여주는 정적 GUI 캡처다.

## Write Tool Safety

`save_query_note`는 `wiki/queries/`에만 query note를 저장한다. `create_wiki_draft`는 `raw/` 내부 파일만 입력으로 허용하고, 초안은 `wiki/drafts/`에만 생성한다. 기존 draft가 있으면 덮어쓰지 않고 오류를 반환한다.

## 참고 출처

- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- NIST AI RMF Playbook: https://airc.nist.gov/airmf-resources/playbook/
- OWASP Top 10 for LLM Applications: https://owasp.org/www-project-top-10-for-large-language-model-applications/
- MITRE ATLAS: https://atlas.mitre.org/
- EU AI Act Regulation (EU) 2024/1689: https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- ISO/IEC 42001:2023: https://www.iso.org/standard/42001
- Model Context Protocol Specification: https://modelcontextprotocol.io/specification/2025-06-18
- W3C PROV Overview: https://www.w3.org/TR/prov-overview/
- W3C PROV-DM: https://www.w3.org/TR/prov-dm/
- JSON Schema: https://json-schema.org/

## 한계

- GUI의 Agent panel은 시각적 데모이며 실제 LLM API 호출은 포함하지 않는다.
- Wiki 내용은 MVP용 curated source note를 기반으로 하며 전체 표준 문서 전문 동기화는 하지 않는다.
- Draft page의 stable promotion은 사람 검토 후 수행한다.

파일 갱신 시각: 2026-06-15 19:45:00 +09:00
