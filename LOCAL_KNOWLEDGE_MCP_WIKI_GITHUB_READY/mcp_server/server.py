from __future__ import annotations

import json
import sys
from typing import Any, Callable

from wiki_core import (
    get_prompt,
    get_wiki_graph,
    health_report,
    list_prompts,
    list_pages,
    list_resources,
    map_risk_to_controls,
    create_wiki_draft,
    quality_report,
    read_page,
    read_resource,
    run_maintenance_check,
    save_query_note,
    search_wiki,
    source_coverage,
    submission_manifest,
    trace_claim,
    trace_page,
)


TOOLS: dict[str, tuple[str, Callable[..., dict[str, Any]], dict[str, Any]]] = {
    "search_wiki": (
        "Search AI governance wiki pages by keyword.",
        search_wiki,
        {"type": "object", "properties": {"query": {"type": "string"}, "page_type": {"type": "string"}, "limit": {"type": "integer"}}, "required": ["query"]},
    ),
    "read_page": (
        "Read a wiki page by slug.",
        read_page,
        {"type": "object", "properties": {"page_id": {"type": "string"}}, "required": ["page_id"]},
    ),
    "list_pages": (
        "List wiki pages by type or review status.",
        list_pages,
        {"type": "object", "properties": {"page_type": {"type": "string"}, "review_status": {"type": "string"}}},
    ),
    "map_risk_to_controls": (
        "Return controls mapped to a governance risk page.",
        map_risk_to_controls,
        {"type": "object", "properties": {"risk_id": {"type": "string"}}, "required": ["risk_id"]},
    ),
    "get_wiki_graph": (
        "Return nodes and edges for risk-control-framework visualization.",
        get_wiki_graph,
        {"type": "object", "properties": {}},
    ),
    "run_maintenance_check": (
        "Run wiki quality checks and return the result.",
        run_maintenance_check,
        {"type": "object", "properties": {}},
    ),
    "save_query_note": (
        "Save a query and optional answer draft to wiki/queries.",
        save_query_note,
        {"type": "object", "properties": {"query": {"type": "string"}, "answer_draft": {"type": "string"}}, "required": ["query"]},
    ),
    "health_report": (
        "Read the latest wiki health report.",
        health_report,
        {"type": "object", "properties": {}},
    ),
    "source_coverage": (
        "Summarize source and Evidence Map coverage across wiki pages.",
        source_coverage,
        {"type": "object", "properties": {}},
    ),
    "trace_page": (
        "Trace one wiki page to its sources, incoming edges, and outgoing edges.",
        trace_page,
        {"type": "object", "properties": {"page_id": {"type": "string"}}, "required": ["page_id"]},
    ),
    "trace_claim": (
        "Trace Evidence Map claims on a page to raw sources and wiki links.",
        trace_claim,
        {"type": "object", "properties": {"page_id": {"type": "string"}, "claim_query": {"type": "string"}}, "required": ["page_id"]},
    ),
    "quality_report": (
        "Score wiki pages against frontmatter, source, evidence, and wikilink quality gates.",
        quality_report,
        {"type": "object", "properties": {"page_id": {"type": "string"}}},
    ),
    "create_wiki_draft": (
        "Create or preview a review-needed wiki draft from one raw markdown source.",
        create_wiki_draft,
        {
            "type": "object",
            "properties": {
                "raw_path": {"type": "string"},
                "title": {"type": "string"},
                "page_type": {"type": "string"},
                "dry_run": {"type": "boolean"},
            },
            "required": ["raw_path"],
        },
    ),
    "submission_manifest": (
        "Return deliverable, zip, and tool manifest for grading harness checks.",
        submission_manifest,
        {"type": "object", "properties": {}},
    ),
}


def rpc_response(request_id: Any, result: Any = None, error: Any = None) -> dict[str, Any]:
    payload = {"jsonrpc": "2.0", "id": request_id}
    if error is not None:
        payload["error"] = error
    else:
        payload["result"] = result
    return payload


def handle(req: dict[str, Any]) -> dict[str, Any] | None:
    method = req.get("method")
    request_id = req.get("id")
    params = req.get("params") or {}

    if method == "initialize":
        return rpc_response(
            request_id,
            {
                "protocolVersion": "2025-06-18",
                "serverInfo": {"name": "ai-governance-control-wiki", "version": "0.2.0"},
                "capabilities": {"tools": {"listChanged": False}, "resources": {}, "prompts": {}},
            },
        )

    if method == "notifications/initialized":
        return None

    if method == "tools/list":
        return rpc_response(request_id, {"tools": [{"name": n, "description": v[0], "inputSchema": v[2]} for n, v in TOOLS.items()]})

    if method == "tools/call":
        name = params.get("name")
        args = params.get("arguments") or {}
        if name not in TOOLS:
            return rpc_response(request_id, error={"code": -32602, "message": f"unknown tool: {name}"})
        try:
            result = TOOLS[name][1](**args)
            return rpc_response(request_id, {"content": [{"type": "text", "text": json.dumps(result, ensure_ascii=False, indent=2)}]})
        except Exception as exc:
            return rpc_response(request_id, error={"code": -32000, "message": str(exc)})

    if method == "resources/list":
        return rpc_response(request_id, list_resources())

    if method == "resources/read":
        uri = params.get("uri", "")
        result = read_resource(uri)
        if not result.get("found"):
            return rpc_response(request_id, error={"code": -32602, "message": result.get("error", "resource not found")})
        return rpc_response(request_id, {"contents": result["contents"]})

    if method == "prompts/list":
        return rpc_response(request_id, list_prompts())

    if method == "prompts/get":
        result = get_prompt(params.get("name", ""), params.get("arguments") or {})
        if "error" in result:
            return rpc_response(request_id, error={"code": -32602, "message": result["error"]})
        return rpc_response(request_id, result)

    return rpc_response(request_id, error={"code": -32601, "message": f"method not found: {method}"})


def main() -> None:
    for line in sys.stdin:
        if not line.strip():
            continue
        try:
            result = handle(json.loads(line))
        except Exception as exc:
            result = rpc_response(None, error={"code": -32700, "message": str(exc)})
        if result is not None:
            print(json.dumps(result, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    main()
