# JOURNAL.md - Agent Decision Journal

## 과제 매핑

이 문서는 과제 요구 산출물 중 **"Wiki Tool 구현을 위해 Agent와 의사결정 라운드를 거쳐왔던 문서"**에 해당한다.

## 최종 결정

최종 구현 방향은 **AI Governance Control Wiki**이다. Markdown Wiki를 원본 지식 저장소로 두고, MCP 서버가 Agent에게 검색, 읽기, 위험-통제 매핑, 그래프 조회, 유지보수 점검 도구를 제공한다.

## 의사결정 라운드

| 라운드 | 검토 질문 | 결정 | 이유 |
| --- | --- | --- | --- |
| 1 | 기존 Agentic Coding Wiki를 그대로 쓸 것인가? | 제외 | 강의 주제와 너무 가까워 평가가 엄격해질 수 있다. |
| 2 | 다른 도메인 후보는 무엇인가? | 연구논문, AI 거버넌스, 사이버보안, 의료, 법률, 금융, 기후, 교육 등을 비교 | 자료 풍부성, Wiki 적합성, MCP 필요성, GUI 표현력을 기준으로 비교했다. |
| 3 | 책임 리스크를 제외하면 무엇이 좋은가? | AI 거버넌스 우선 | 위험-통제-출처 연결이 명확하고 Agent 도구 시연이 자연스럽다. |
| 4 | Wiki는 무엇을 저장해야 하는가? | Markdown 페이지와 frontmatter | 사람이 읽을 수 있고 Agent가 구조화 필드를 파싱할 수 있다. |
| 5 | MCP Tool은 무엇을 제공해야 하는가? | 검색, 읽기, 목록, 위험-통제 매핑, 그래프, 유지보수, 쿼리 노트 | 과제의 "Wiki Tool 구현과 Serving"을 직접 보여준다. |
| 6 | MCP 표준 요소를 얼마나 반영할 것인가? | Tools 중심, Resources/Prompts도 추가 | MCP 사양의 Tools, Resources, Prompts 개념을 과제 설명에 반영한다. |

## 비교 후 탈락한 대안

| 대안 | 장점 | 제외 이유 |
| --- | --- | --- |
| Research Paper Wiki | 인용 그래프와 claim tracking에 강함 | 논문 검색 앱처럼 보일 수 있다. |
| Cybersecurity Defense Wiki | 공격-통제 그래프가 강함 | 범위가 커지고 기법 정규화가 많이 필요하다. |
| Finance Wiki | 데이터와 규칙이 풍부함 | 데이터 파이프라인 과제처럼 보일 수 있다. |
| Health Wiki | 근거 기반 문서화에 강함 | 의료 지식 자체 검증 부담이 크다. |
| Legal Wiki | 조문-판례 구조가 명확함 | 법률 해석 시스템처럼 보일 위험이 있다. |

## 구현 결정

1. `wiki/concepts/`의 Markdown 파일을 canonical store로 사용한다.
2. 각 페이지 frontmatter에 `type`, `review_status`, `quality_class`, `sources`, `related_controls`, `mitigates`, `frameworks`를 둔다.
3. 위험 페이지는 관련 통제를 `related_controls`로 연결한다.
4. 통제 페이지는 완화하는 위험을 `mitigates`로 연결한다.
5. MCP 서버는 외부 패키지 없이 JSON-RPC stdin/stdout 방식으로 실행한다.
6. GUI는 `app/index.html`과 생성된 `app/wiki-data.js`로 정적 시각화를 제공한다.
7. 유지보수는 `maintenance_check.ps1`와 `wiki_health_report.ps1`로 실행한다.

## Agent 역할 SPEC

| Agent | 허용 기능 | 금지 기능 |
| --- | --- | --- |
| Wiki Reader Agent | `search_wiki`, `read_page`, `list_pages`, `get_wiki_graph`, `resources/read` | 파일 쓰기 |
| Governance Mapping Agent | `map_risk_to_controls`, `read_page`, `search_wiki` | 단독으로 stable 판정 |
| Wiki Maintainer Agent | `run_maintenance_check`, `save_query_note`, 품질 이슈 제안 | `raw/` 근거 삭제 |
| Wiki Editor Agent | 페이지 수정안 작성 | 출처 없는 단정 추가 |

상세 SPEC은 `docs/AGENT_SPEC.md`에 별도로 작성했다. 이 파일은 Agent 역할, 권한, 허용 Tool, 금지 작업, 챗봇 응답 워크플로우, Wiki 편집 워크플로우를 과제 문구에 맞춰 독립적으로 설명한다.

## 현재 구현 증거

- Wiki 페이지: `wiki/concepts/`
- 원천 메모: `raw/ai_governance/`
- MCP 서버: `mcp_server/server.py`
- MCP 도구 구현: `mcp_server/wiki_core.py`
- MVP GUI: `app/index.html`
- 제출 문서: `submission/`

## Ping-Pong 검증 기록

| Round | Builder 조치 | Critic 지적 | 반영 결과 |
| --- | --- | --- | --- |
| 1 | 기본 제출물 4종과 MCP 서버를 구성 | MCP 하네스 설명 부족, 모든 페이지 `needs_review`, 문서 루브릭 매핑 부족 | README에 하네스 실행 절차와 JSON-RPC transcript를 추가하고, Wiki 페이지를 MVP 기준 `mvp_validated`로 승격 |
| 2 | Resources/Prompts를 서버에 추가 | GUI 데이터와 문서가 최신 MCP 기능을 충분히 반영해야 함 | `generate_app_data.py`에 resources/prompts를 추가하고 `app/wiki-data.js`를 재생성 |
| 3 | 유지보수 점검을 실행 | `review-needed`가 오류처럼 보일 수 있음 | maintenance 출력 기준을 `Blocking issues`와 `Review queue`로 분리 |
| 4 | 추가 기능 후보를 검토 | 기능이 기존 health/report와 중복될 수 있음 | read-only grading summary로 범위를 제한하고 `submission_manifest`, `source_coverage`, `trace_page`를 추가 |
| 5 | 특별 기능 3종을 더 넣을 것인가? | 추가 | claim 단위 출처 추적, 품질 점수화, raw-to-draft 파이프라인은 최종 GitHub 제품 요구와 직접 연결된다. |
| 6 | viewer와 문서를 최종 점검 | 그래프 간선 anchor, 상단 metadata 겹침, README/PRD/SPEC 설명 불일치가 남을 수 있음 | fixed-anchor graph, metadata overflow 처리, Source Coverage/Evidence Trace/Reading Deck 문서화를 반영 |

## 결정 근거 상세

### 왜 Markdown-only인가

Markdown은 교수자와 자동 하네스가 동시에 읽기 쉽다. 데이터베이스를 쓰면 실행 환경과 의존성이 늘어나지만, Markdown은 파일 자체가 제출물이며 Agent가 읽을 수 있는 canonical source가 된다.

### 왜 MCP Tool인가

일반 Wiki 뷰어는 사람이 클릭해서 읽는 데 그친다. MCP Tool은 Agent가 같은 Wiki를 구조화된 함수처럼 사용할 수 있게 만든다. 이 프로젝트의 핵심은 `map_risk_to_controls`처럼 단순 검색보다 한 단계 높은 의미 연결을 제공한다는 점이다.

### 왜 Resources와 Prompts도 넣었는가

MCP 사양은 서버 기능으로 Tools, Resources, Prompts를 둔다. 과제는 Tool 구현이 중심이지만, 자동 평가 하네스가 MCP 개념을 확인할 수 있도록 Wiki 페이지를 `wiki://slug` resource로 제공하고, source-grounded 답변용 prompt template도 제공한다.

## 재현성 결정

외부 패키지 설치 없이 Python 표준 라이브러리와 PowerShell만 사용한다. 이 결정은 제출 환경에서 dependency failure 가능성을 줄이기 위한 것이다. 표준 MCP SDK를 사용하지 않는 대신, README에 JSON-RPC method, 입력, 기대 출력, smoke test를 명시해 자동 하네스가 검증할 수 있게 했다.

## 추가 기능 결정

| 기능 | 결정 이유 | 제외한 복잡도 |
| --- | --- | --- |
| `submission_manifest` | ZIP root layout과 제출 산출물을 한 번에 검증한다. | 별도 manifest 파일을 수동 관리하지 않는다. |
| `source_coverage` | 출처 파일 존재, Evidence Map, source_count 정합성을 자동 요약한다. | 외부 웹 재검증이나 네트워크 동기화는 하지 않는다. |
| `trace_page` | 페이지 하나의 출처와 incoming/outgoing edge를 보여줘 연결성을 증명한다. | 전체 그래프 시각화는 기존 GUI와 `get_wiki_graph`에 맡긴다. |
| `trace_claim` | Evidence Map claim 하나를 raw source와 wiki link로 추적한다. | 긴 자연어 답변 생성은 하지 않는다. |
| `quality_report` | 페이지별 품질 점수와 blocking issue count를 반환한다. | 기존 health report를 대체하지 않고 하네스용 구조화 요약만 제공한다. |
| `create_wiki_draft` | raw 자료 1건에서 검토 대기 Wiki draft를 만들거나 dry-run preview를 제공한다. | stable page 자동 승격은 하지 않는다. |

## 최종 무결성 결정

Viewer는 단순 캡처용 화면이 아니라 제출자가 실제로 페이지를 선택하고 MCP Tool 결과를 확인하는 정적 제품이어야 한다. 따라서 `app/index.html`은 Source Coverage, Evidence Trace, Reading Deck, fixed-anchor Wiki Graph를 제공하고, 모든 관련 문서에는 이 기능과 연결 MCP Tool을 명시한다.

파일 갱신 시각: 2026-06-15 19:45:00 +09:00
