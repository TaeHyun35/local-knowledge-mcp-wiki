from __future__ import annotations

import json
import re
import subprocess
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
WIKI_DIR = ROOT / "wiki"
CONCEPTS_DIR = WIKI_DIR / "concepts"
PAGES_DIR = WIKI_DIR / "pages"
QUERIES_DIR = WIKI_DIR / "queries"
DRAFTS_DIR = WIKI_DIR / "drafts"
LOGS_DIR = ROOT / "logs"


@dataclass
class WikiPage:
    slug: str
    title: str
    type: str
    review_status: str
    quality_class: str
    confidence: str
    path: str
    meta: dict[str, Any]
    text: str


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8-sig", errors="replace")


def parse_frontmatter(text: str) -> dict[str, Any]:
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    lines = text[3:end].strip().splitlines()
    data: dict[str, Any] = {}
    current: str | None = None
    for line in lines:
        if re.match(r"^[A-Za-z_][A-Za-z0-9_]*:", line):
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip().strip('"')
            if value == "":
                data[key] = []
                current = key
            else:
                data[key] = value
                current = None
        elif current and line.strip().startswith("- "):
            data.setdefault(current, []).append(line.strip()[2:])
    return data


def page_from_path(path: Path) -> WikiPage:
    text = read_text(path)
    meta = parse_frontmatter(text)
    return WikiPage(
        slug=path.stem,
        title=str(meta.get("title") or path.stem),
        type=str(meta.get("type") or "unknown"),
        review_status=str(meta.get("review_status") or "missing"),
        quality_class=str(meta.get("quality_class") or "missing"),
        confidence=str(meta.get("confidence") or "missing"),
        path=path.relative_to(ROOT).as_posix(),
        meta=meta,
        text=text,
    )


def all_page_paths() -> list[Path]:
    paths: list[Path] = []
    for folder in (CONCEPTS_DIR, PAGES_DIR, DRAFTS_DIR, QUERIES_DIR):
        if folder.exists():
            paths.extend(path for path in folder.rglob("*.md") if path.name != "README.md")
    return sorted(paths)


def list_pages(page_type: str | None = None, review_status: str | None = None) -> dict[str, Any]:
    pages = []
    for path in all_page_paths():
        page = page_from_path(path)
        if page_type and page.type != page_type:
            continue
        if review_status and page.review_status != review_status:
            continue
        pages.append(
            {
                "slug": page.slug,
                "title": page.title,
                "type": page.type,
                "review_status": page.review_status,
                "quality_class": page.quality_class,
                "confidence": page.confidence,
                "path": page.path,
            }
        )
    return {"count": len(pages), "pages": pages}


def read_page(page_id: str) -> dict[str, Any]:
    normalized = page_id.replace(".md", "").lower()
    for path in all_page_paths():
        if path.stem.lower() == normalized:
            page = page_from_path(path)
            return {"found": True, "page": page.__dict__}
    for path in all_page_paths():
        if normalized in path.stem.lower():
            page = page_from_path(path)
            return {"found": True, "page": page.__dict__}
    return {"found": False, "page_id": page_id, "error": "page not found"}


def search_wiki(query: str, page_type: str | None = None, limit: int = 10) -> dict[str, Any]:
    q = query.lower()
    results = []
    for item in list_pages(page_type=page_type)["pages"]:
        page = read_page(item["slug"])["page"]
        text = page["text"]
        haystack = f"{page['title']}\n{text}".lower()
        if q not in haystack:
            continue
        idx = haystack.find(q)
        snippet = re.sub(r"\s+", " ", text[max(0, idx - 160) : idx + 420]).strip()
        results.append({**item, "snippet": snippet})
        if len(results) >= limit:
            break
    return {"query": query, "count": len(results), "results": results}


def map_risk_to_controls(risk_id: str) -> dict[str, Any]:
    page_result = read_page(risk_id)
    if not page_result["found"]:
        return {"found": False, "risk_id": risk_id, "error": "risk not found"}
    risk = page_result["page"]
    if risk["type"] != "risk":
        return {"found": False, "risk_id": risk_id, "error": "page is not a risk"}

    controls = []
    for control_slug in risk["meta"].get("related_controls", []):
        control = read_page(control_slug)
        if control["found"]:
            control_page = control["page"]
            controls.append(
                {
                    "slug": control_page["slug"],
                    "title": control_page["title"],
                    "type": control_page["type"],
                    "path": control_page["path"],
                    "frameworks": control_page["meta"].get("frameworks", []),
                }
            )
        else:
            controls.append({"slug": control_slug, "missing": True})

    return {
        "found": True,
        "risk": {
            "slug": risk["slug"],
            "title": risk["title"],
            "category": risk["meta"].get("risk_category", ""),
            "frameworks": risk["meta"].get("frameworks", []),
            "sources": risk["meta"].get("sources", []),
        },
        "controls": controls,
    }


def get_wiki_graph() -> dict[str, Any]:
    pages = list_pages()["pages"]
    by_slug = {p["slug"]: p for p in pages}
    nodes = [{"id": p["slug"], "label": p["title"], "type": p["type"]} for p in pages]
    edges = []
    for p in pages:
        page = read_page(p["slug"])["page"]
        for field in ("related_controls", "mitigates", "frameworks"):
            for target in page["meta"].get(field, []):
                target_slug = re.sub(r"[^a-z0-9]+", "-", str(target).lower()).strip("-")
                if target_slug in by_slug:
                    edges.append({"source": p["slug"], "target": target_slug, "type": field})
        for match in re.finditer(r"\[\[([^\]|#]+)", page["text"]):
            target = match.group(1).split("/")[-1].replace(".md", "")
            if target in by_slug:
                edges.append({"source": p["slug"], "target": target, "type": "wikilink"})
    return {"node_count": len(nodes), "edge_count": len(edges), "nodes": nodes, "edges": edges}


def source_coverage() -> dict[str, Any]:
    pages = []
    missing_sources: list[dict[str, str]] = []
    missing_evidence_map: list[str] = []
    source_count_mismatches: list[dict[str, Any]] = []
    unregistered_sources: list[str] = []
    source_refs: dict[str, int] = {}
    registry_path = ROOT / "raw" / "ai_governance" / "source_registry.md"
    registry_text = read_text(registry_path) if registry_path.exists() else ""

    for item in list_pages()["pages"]:
        page = read_page(item["slug"])["page"]
        sources = page["meta"].get("sources", [])
        if isinstance(sources, str):
            sources = [sources]
        declared_count_raw = page["meta"].get("source_count", len(sources))
        try:
            declared_count = int(str(declared_count_raw))
        except ValueError:
            declared_count = -1
        if declared_count != len(sources):
            source_count_mismatches.append({"page": item["slug"], "declared": declared_count_raw, "actual": len(sources)})
        if not sources:
            missing_sources.append({"page": item["slug"], "source": "missing"})
        for source in sources:
            source_refs[source] = source_refs.get(source, 0) + 1
            if not (ROOT / source).exists():
                missing_sources.append({"page": item["slug"], "source": source})
            if registry_text and Path(source).name not in registry_text:
                unregistered_sources.append(source)
        has_evidence_map = "## Evidence Map" in page["text"]
        if not has_evidence_map:
            missing_evidence_map.append(item["slug"])
        pages.append(
            {
                "slug": item["slug"],
                "type": item["type"],
                "review_status": item["review_status"],
                "source_count": len(sources),
                "declared_source_count": declared_count_raw,
                "has_evidence_map": has_evidence_map,
            }
        )

    unregistered_sources = sorted(set(unregistered_sources))
    return {
        "page_count": len(pages),
        "unique_source_count": len(source_refs),
        "missing_source_count": len(missing_sources),
        "missing_evidence_map_count": len(missing_evidence_map),
        "source_count_mismatch_count": len(source_count_mismatches),
        "unregistered_source_count": len(unregistered_sources),
        "blocking_issue_count": len(missing_sources) + len(missing_evidence_map) + len(source_count_mismatches),
        "pages": pages,
        "source_refs": source_refs,
        "missing_sources": missing_sources,
        "missing_evidence_map": missing_evidence_map,
        "source_count_mismatches": source_count_mismatches,
        "unregistered_sources": unregistered_sources,
    }


def trace_page(page_id: str) -> dict[str, Any]:
    result = read_page(page_id)
    if not result["found"]:
        return {"found": False, "page_id": page_id, "error": "page not found"}
    page = result["page"]
    graph = get_wiki_graph()
    outgoing = [edge for edge in graph["edges"] if edge["source"] == page["slug"]]
    incoming = [edge for edge in graph["edges"] if edge["target"] == page["slug"]]
    sources = page["meta"].get("sources", [])
    if isinstance(sources, str):
        sources = [sources]
    source_status = [{"source": source, "exists": (ROOT / source).exists()} for source in sources]
    return {
        "found": True,
        "page": {
            "slug": page["slug"],
            "title": page["title"],
            "type": page["type"],
            "review_status": page["review_status"],
            "quality_class": page["quality_class"],
            "path": page["path"],
        },
        "sources": source_status,
        "related_controls": page["meta"].get("related_controls", []),
        "mitigates": page["meta"].get("mitigates", []),
        "frameworks": page["meta"].get("frameworks", []),
        "outgoing_edges": outgoing,
        "incoming_edges": incoming,
        "connectivity": {
            "incoming_count": len(incoming),
            "outgoing_count": len(outgoing),
            "source_count": len(source_status),
        },
    }


def evidence_rows(page_text: str) -> list[dict[str, str]]:
    match = re.search(r"## Evidence Map\s+([\s\S]*?)(?=\n## |\Z)", page_text)
    if not match:
        return []
    rows: list[dict[str, str]] = []
    for line in match.group(1).splitlines():
        line = line.strip()
        if not line.startswith("|") or "---" in line or "Claim" in line:
            continue
        cells = [cell.strip().strip("`") for cell in line.strip("|").split("|")]
        if len(cells) >= 3:
            rows.append({"claim": cells[0], "evidence": cells[1], "status": cells[2]})
    return rows


def trace_claim(page_id: str, claim_query: str = "") -> dict[str, Any]:
    result = read_page(page_id)
    if not result["found"]:
        return {"found": False, "page_id": page_id, "error": "page not found"}
    page = result["page"]
    rows = evidence_rows(page["text"])
    query = claim_query.lower().strip()
    if query:
        rows = [row for row in rows if query in row["claim"].lower() or query in row["evidence"].lower()]
    traced = []
    for row in rows:
        evidence = row["evidence"]
        raw_refs = re.findall(r"raw/[A-Za-z0-9_./-]+", evidence)
        wiki_refs = re.findall(r"\[\[([^\]|#]+)", evidence)
        traced.append(
            {
                **row,
                "raw_refs": [{"path": ref, "exists": (ROOT / ref).exists()} for ref in raw_refs],
                "wiki_refs": [{"slug": ref, "found": read_page(ref)["found"]} for ref in wiki_refs],
            }
        )
    return {
        "found": True,
        "page": {"slug": page["slug"], "title": page["title"], "path": page["path"]},
        "claim_query": claim_query,
        "claim_count": len(traced),
        "claims": traced,
    }


def quality_report(page_id: str | None = None) -> dict[str, Any]:
    required_fields = ["title", "type", "review_status", "quality_class", "source_count", "sources", "stale"]
    pages = []
    blocking_issues: list[dict[str, Any]] = []
    warnings: list[dict[str, Any]] = []
    graph = get_wiki_graph()
    known_slugs = {node["id"] for node in graph["nodes"]}
    target_pages = list_pages()["pages"]
    if page_id:
        target_pages = [item for item in target_pages if item["slug"] == page_id.replace(".md", "")]
        if not target_pages:
            return {
                "page_id": page_id,
                "page_count": 0,
                "average_score": 0,
                "status": "fail",
                "blocking_issue_count": 1,
                "warning_count": 0,
                "blocking_issues": [{"page": page_id, "issues": {"page_not_found": True}}],
                "warnings": [],
                "source_coverage": {},
                "pages": [],
            }

    for item in target_pages:
        page = read_page(item["slug"])["page"]
        meta = page["meta"]
        missing_fields = [field for field in required_fields if field not in meta]
        rows = evidence_rows(page["text"])
        sources = meta.get("sources", [])
        if isinstance(sources, str):
            sources = [sources]
        broken_links = []
        for match in re.finditer(r"\[\[([^\]|#]+)", page["text"]):
            target = match.group(1).split("/")[-1].replace(".md", "")
            if target not in known_slugs:
                broken_links.append(target)
        missing_source_files = [source for source in sources if not (ROOT / source).exists()]
        page_issues = {
            "missing_fields": missing_fields,
            "missing_source_files": missing_source_files,
            "missing_evidence_map": not rows,
            "broken_wikilinks": sorted(set(broken_links)),
        }
        score = 100
        score -= 10 * len(missing_fields)
        score -= 20 * len(missing_source_files)
        score -= 20 if not rows else 0
        score -= 10 * len(set(broken_links))
        score = max(score, 0)
        status = "pass" if score >= 90 and not any(page_issues.values()) else "warn" if score >= 70 else "fail"
        if status == "fail":
            blocking_issues.append({"page": item["slug"], "issues": page_issues})
        elif status == "warn":
            warnings.append({"page": item["slug"], "issues": page_issues})
        pages.append(
            {
                "slug": item["slug"],
                "title": item["title"],
                "type": item["type"],
                "review_status": item["review_status"],
                "score": score,
                "status": status,
                "claim_count": len(rows),
                "source_count": len(sources),
                "issues": page_issues,
            }
        )

    average_score = round(sum(page["score"] for page in pages) / len(pages), 2) if pages else 0
    coverage = source_coverage()
    return {
        "page_id": page_id,
        "page_count": len(pages),
        "average_score": average_score,
        "status": "pass" if not blocking_issues and coverage["blocking_issue_count"] == 0 else "fail",
        "blocking_issue_count": len(blocking_issues) + coverage["blocking_issue_count"],
        "warning_count": len(warnings),
        "blocking_issues": blocking_issues,
        "warnings": warnings,
        "source_coverage": {
            "missing_source_count": coverage["missing_source_count"],
            "missing_evidence_map_count": coverage["missing_evidence_map_count"],
            "source_count_mismatch_count": coverage["source_count_mismatch_count"],
        },
        "pages": pages,
    }


def create_wiki_draft(raw_path: str, title: str = "", page_type: str = "concept", dry_run: bool = False) -> dict[str, Any]:
    source_path = (ROOT / raw_path).resolve()
    raw_root = (ROOT / "raw").resolve()
    if not source_path.exists():
        return {"created": False, "error": "raw file not found", "raw_path": raw_path}
    if raw_root not in source_path.parents and source_path != raw_root:
        return {"created": False, "error": "raw_path must be inside raw/", "raw_path": raw_path}
    source_rel = source_path.relative_to(ROOT).as_posix()
    raw_text = read_text(source_path).strip()
    first_heading = next((line.lstrip("# ").strip() for line in raw_text.splitlines() if line.strip().startswith("#")), "")
    resolved_title = title.strip() or first_heading or source_path.stem.replace("-", " ").replace("_", " ").title()
    slug = re.sub(r"[^a-z0-9]+", "-", resolved_title.lower()).strip("-") or source_path.stem.lower()
    summary = re.sub(r"\s+", " ", raw_text[:500]).strip()
    DRAFTS_DIR.mkdir(parents=True, exist_ok=True)
    draft_path = DRAFTS_DIR / f"{slug}.md"
    content = "\n".join(
        [
            "---",
            f'title: "{resolved_title}"',
            f"type: {page_type}",
            "status: draft",
            "quality_class: source-linked",
            "review_status: needs_review",
            "confidence: 0.5",
            "frameworks: []",
            "related_controls: []",
            "mitigates: []",
            "source_count: 1",
            "sources:",
            f"  - {source_rel}",
            "source_hashes: []",
            "stale: false",
            "created: 2026-06-15",
            "updated: 2026-06-15",
            "---",
            "",
            f"# {resolved_title}",
            "",
            "## Summary",
            "",
            summary or "REVIEW_REQUIRED: Add a concise summary from the raw source.",
            "",
            "## Evidence Map",
            "",
            "| Claim | Evidence | Status |",
            "| --- | --- | --- |",
            f"| Draft page is derived from the supplied raw source. | `{source_rel}` | needs_review |",
            "",
            "## Related",
            "",
            "- REVIEW_REQUIRED: Link this draft to existing wiki pages.",
            "",
            "## Maintenance Notes",
            "",
            "- REVIEW_REQUIRED: Human review is required before promotion to `mvp_validated`.",
            "",
            "File updated at: 2026-06-15 00:00:00 +09:00",
            "",
        ]
    )
    if draft_path.exists() and not dry_run:
        return {
            "created": False,
            "dry_run": dry_run,
            "error": "draft already exists",
            "path": draft_path.relative_to(ROOT).as_posix(),
            "slug": slug,
            "title": resolved_title,
            "source": source_rel,
            "preview": content,
        }
    if not dry_run:
        draft_path.write_text(content, encoding="utf-8")
    return {
        "created": not dry_run,
        "dry_run": dry_run,
        "path": draft_path.relative_to(ROOT).as_posix(),
        "slug": slug,
        "title": resolved_title,
        "source": source_rel,
        "preview": content,
    }


def submission_manifest() -> dict[str, Any]:
    def safe_relative(path: Path) -> str:
        for base in (ROOT, ROOT.parent):
            try:
                return path.relative_to(base).as_posix()
            except ValueError:
                continue
        return str(path)

    required_root = ["DOMAIN.md", "JOURNAL.md", "PRD.md", "README.md", "MVP.png"]
    submission_dir = ROOT / "submission"
    if not all((submission_dir / name).exists() for name in required_root):
        submission_dir = ROOT.parent
    zip_path = ROOT / "AI_Governance_Control_Wiki_Submission.zip"
    if not zip_path.exists():
        zip_path = ROOT.parent / "AI_Governance_Control_Wiki_Submission.zip"
    root_files = {
        name: {
            "exists": (submission_dir / name).exists(),
            "path": f"submission/{name}",
            "resolved_path": (submission_dir / name).relative_to(ROOT.parent).as_posix() if (submission_dir / name).exists() else "",
            "bytes": (submission_dir / name).stat().st_size if (submission_dir / name).exists() else 0,
        }
        for name in required_root
    }
    zip_entries: list[str] = []
    zip_root_ok = False
    cache_entries: list[str] = []
    extracted_root_ok = all((submission_dir / name).exists() for name in required_root) and (ROOT / "mcp_server").exists()
    if zip_path.exists():
        with zipfile.ZipFile(zip_path) as archive:
            zip_entries = sorted(info.filename for info in archive.infolist())
        zip_root_ok = all(name in zip_entries for name in required_root) and any(entry.startswith("project/") for entry in zip_entries)
        cache_entries = [entry for entry in zip_entries if "__pycache__" in entry or entry.endswith(".pyc")]
    return {
        "project": "AI Governance Control Wiki",
        "required_root_files": root_files,
        "all_required_root_files_present": all(item["exists"] for item in root_files.values()),
        "zip": {
            "path": safe_relative(zip_path),
            "exists": zip_path.exists(),
            "root_layout_ok": zip_root_ok if zip_path.exists() else extracted_root_ok,
            "extracted_layout_ok": extracted_root_ok,
            "entry_count": len(zip_entries),
            "cache_entry_count": len(cache_entries),
            "top_level_entries": zip_entries[:12],
        },
        "mcp_tools": [
            "search_wiki",
            "read_page",
            "list_pages",
            "map_risk_to_controls",
            "get_wiki_graph",
            "run_maintenance_check",
            "save_query_note",
            "health_report",
            "source_coverage",
            "trace_page",
            "trace_claim",
            "quality_report",
            "create_wiki_draft",
            "submission_manifest",
        ],
    }


def run_maintenance_check() -> dict[str, Any]:
    script = ROOT / "scripts" / "maintenance_check.ps1"
    completed = subprocess.run(
        ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(script)],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        timeout=60,
    )
    return {"returncode": completed.returncode, "output": (completed.stdout + completed.stderr).strip()}


def save_query_note(query: str, answer_draft: str = "") -> dict[str, Any]:
    QUERIES_DIR.mkdir(parents=True, exist_ok=True)
    slug = re.sub(r"[^a-z0-9]+", "-", query.lower()).strip("-") or "query"
    path = QUERIES_DIR / f"mcp-{slug}.md"
    search = search_wiki(query, limit=5)
    content = "\n".join(
        [
            "---",
            f'title: "Query - {query}"',
            "type: query",
            "status: draft",
            "quality_class: source-linked",
            "review_status: query_review",
            "confidence: 0.5",
            "source_count: 0",
            "sources: []",
            "source_hashes: []",
            "stale: false",
            "created: 2026-06-04",
            "updated: 2026-06-04",
            "---",
            "",
            f"# Query: {query}",
            "",
            "## Search Results",
            "",
            "```json",
            json.dumps(search, ensure_ascii=False, indent=2),
            "```",
            "",
            "## Answer Draft",
            "",
            answer_draft or "REVIEW_REQUIRED: No answer draft supplied.",
            "",
            "## Promotion Candidates",
            "",
            "- REVIEW_REQUIRED: Promote repeated governance answers into concept pages.",
        ]
    )
    path.write_text(content, encoding="utf-8")
    return {"saved": True, "path": path.relative_to(ROOT).as_posix(), "search_count": search["count"]}


def health_report() -> dict[str, Any]:
    report = LOGS_DIR / "wiki-health-report.md"
    if not report.exists():
        return {"found": False, "text": ""}
    return {"found": True, "path": report.relative_to(ROOT).as_posix(), "text": read_text(report).lstrip("\ufeff")}


def list_resources() -> dict[str, Any]:
    resources = []
    for item in list_pages()["pages"]:
        resources.append(
            {
                "uri": f"wiki://{item['slug']}",
                "name": item["title"],
                "description": f"{item['type']} page, review_status={item['review_status']}",
                "mimeType": "text/markdown",
            }
        )
    return {"resources": resources}


def read_resource(uri: str) -> dict[str, Any]:
    if not uri.startswith("wiki://"):
        return {"found": False, "uri": uri, "error": "unsupported resource uri"}
    page_id = uri.removeprefix("wiki://")
    result = read_page(page_id)
    if not result["found"]:
        return {"found": False, "uri": uri, "error": "page not found"}
    page = result["page"]
    return {
        "found": True,
        "contents": [
            {
                "uri": uri,
                "mimeType": "text/markdown",
                "text": page["text"],
            }
        ],
    }


def list_prompts() -> dict[str, Any]:
    return {
        "prompts": [
            {
                "name": "governance_answer",
                "description": "Answer with source-grounded wiki evidence and risk-control links.",
                "arguments": [{"name": "query", "description": "Governance question", "required": True}],
            },
            {
                "name": "risk_review",
                "description": "Review a risk page and propose missing controls or evidence.",
                "arguments": [{"name": "risk_id", "description": "Risk page slug", "required": True}],
            },
        ]
    }


def get_prompt(name: str, arguments: dict[str, Any] | None = None) -> dict[str, Any]:
    args = arguments or {}
    if name == "governance_answer":
        query = args.get("query", "")
        return {
            "description": "Source-grounded governance answer workflow",
            "messages": [
                {
                    "role": "user",
                    "content": {
                        "type": "text",
                        "text": (
                            "Answer the governance question using only wiki evidence. "
                            "Cite page slugs, mention review_status, and list related controls.\n"
                            f"Question: {query}"
                        ),
                    },
                }
            ],
        }
    if name == "risk_review":
        risk_id = args.get("risk_id", "")
        return {
            "description": "Risk page review workflow",
            "messages": [
                {
                    "role": "user",
                    "content": {
                        "type": "text",
                        "text": (
                            "Review the risk page for missing sources, missing controls, stale evidence, "
                            "and unclear mitigations. Return blocking issues first.\n"
                            f"Risk page: {risk_id}"
                        ),
                    },
                }
            ],
        }
    return {"error": f"unknown prompt: {name}"}
