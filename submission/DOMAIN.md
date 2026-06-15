# DOMAIN.md - AI Governance Control Wiki

## 과제 매핑

이 문서는 과제 요구 산출물 중 **"어떤 지식 도메인을 대상으로 wiki를 만들 것인지 정의한 문서"**에 해당한다.

## 대상 지식 도메인

대상 도메인은 **AI Governance / AI Risk Control**이다. 이 Wiki는 생성형 AI와 LLM 애플리케이션을 운영할 때 필요한 위험 분류, 통제 수단, 근거 출처, 검토 상태를 Markdown 지식 베이스로 구조화하고 MCP 서버를 통해 Agent가 조회할 수 있게 만든다.

## 왜 이 도메인인가

AI 거버넌스는 단순 키워드 검색보다 **위험-통제-프레임워크 연결**이 중요하다. 예를 들어 `prompt-injection` 위험은 `tool-permission-boundary`, `human-oversight-gate`, `audit-logging` 같은 통제와 연결되어야 하고, 각 연결은 NIST, OWASP, MITRE, EU AI Act, ISO/IEC 42001 같은 외부 근거로 설명되어야 한다.

이 도메인은 본 강의 주제 자체를 그대로 서빙하는 Wiki가 아니므로, "강의 주제로 Wiki Pages를 서빙하면 평가가 빡빡할 수 있음"이라는 조건을 피하면서도 MCP, Agent, Tool, Maintenance의 필요성을 자연스럽게 보여준다.

## 핵심 출처

| 출처 | Wiki에서 쓰는 역할 |
| --- | --- |
| NIST AI Risk Management Framework | AI 위험관리의 상위 프레임워크 |
| NIST AI RMF Playbook | Govern, Map, Measure, Manage 기반 실행 항목 |
| OWASP Top 10 for LLM Applications | LLM 앱 보안 위험 분류 |
| MITRE ATLAS | 적대적 AI 공격/전술/기술 분류 |
| EU AI Act | 규제 언어와 위험 기반 접근 |
| ISO/IEC 42001 | AI 관리 시스템과 조직 운영 기준 |
| Model Context Protocol Specification | Wiki Tool을 Agent와 연결하는 MCP 근거 |

원천 메모는 `raw/ai_governance/`에 보관하고, Wiki 페이지는 `wiki/concepts/`에 보관한다.

## Wiki 범위

포함 범위:

- AI 위험 페이지
- 거버넌스 통제 페이지
- 프레임워크 페이지
- Evidence Map
- 위험-통제-프레임워크 그래프
- MCP 기반 검색, 읽기, 매핑, 유지보수 도구

MVP 제외 범위:

- 법적 준수 자동 판정
- 실시간 외부 문서 동기화
- 전체 표준 문서 전문 파싱
- 실제 LLM 챗봇 API 호출
- 사용자 인증과 권한 관리

## 예상 사용자

- MCP 기반 Wiki Tool 과제 제출자
- Wiki를 구조화된 기억으로 쓰는 AI Agent
- AI 거버넌스 검토자
- 위험과 통제 관계를 확인하는 유지보수자

## 도메인 적합성 결론

AI Governance / AI Risk Control은 근거 기반 서술, 관계형 그래프, 유지보수 상태, Agent 권한 통제가 모두 필요한 주제다. 따라서 Markdown-only LLM Wiki와 MCP Tool의 필요성을 설명하기 좋고, 채점자가 기능을 빠르게 검증하기에도 적합하다.

## 채점 기준 대응

| 평가 관점 | 대응 내용 |
| --- | --- |
| 강의 주제 회피 | Agentic Coding 강의 자료가 아니라 외부 AI 거버넌스 프레임워크를 대상으로 한다. |
| Wiki Pages 구현 | 위험, 통제, 프레임워크를 별도 Markdown 페이지로 구성했다. |
| Serving 방식 | MCP-compatible JSON-RPC 서버가 Wiki를 Tool, Resource, Prompt 형태로 제공한다. |
| 시각화 | MVP GUI는 페이지 목록, 선택 페이지, Evidence Map, 관련 통제, 그래프, Agent 패널을 보여준다. |
| Agent 활용성 | Agent가 `map_risk_to_controls`로 단순 검색을 넘어 위험-통제 관계를 조회할 수 있다. |

## 핵심 개념 예시

| Wiki 개념 | type | 연결 관계 | 평가자가 확인할 수 있는 점 |
| --- | --- | --- | --- |
| `prompt-injection` | risk | `tool-permission-boundary`, `human-oversight-gate`, `audit-logging` | LLM 보안 위험이 통제로 매핑되는지 확인 가능 |
| `sensitive-information-disclosure` | risk | `audit-logging`, `tool-permission-boundary` | 정보 노출 위험과 통제의 연결 확인 가능 |
| `nist-ai-rmf` | framework | governance controls | 외부 프레임워크가 Wiki 근거로 사용되는지 확인 가능 |
| `owasp-llm-top10` | framework | LLM risks | LLM 앱 위험 분류가 페이지에 반영되는지 확인 가능 |

## MVP 검증 상태 정의

이 프로젝트에서 `mvp_validated`는 다음을 의미한다.

- 페이지에 frontmatter가 있다.
- `type`, `quality_class`, `review_status`, `sources`, `source_count`, `stale` 필드가 있다.
- 본문에 `Summary`와 `Evidence Map`이 있다.
- 위험 페이지는 하나 이상의 관련 통제를 가진다.
- 통제 페이지는 하나 이상의 완화 대상 위험을 가진다.

`mvp_validated`는 법률 자문이나 표준 인증을 의미하지 않는다. 과제 MVP에서 Wiki 구조와 MCP serving 대상으로 사용할 수 있음을 뜻한다.

파일 갱신 시각: 2026-06-14 00:00:00 +09:00
