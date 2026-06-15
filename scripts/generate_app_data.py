from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "mcp_server"))

from wiki_core import create_wiki_draft, get_wiki_graph, health_report, list_pages, list_prompts, list_resources, map_risk_to_controls, quality_report, read_page, search_wiki, source_coverage, submission_manifest, trace_claim, trace_page  # noqa: E402


def main() -> None:
    app = ROOT / "app"
    app.mkdir(exist_ok=True)
    pages = list_pages()["pages"]
    selected = read_page("prompt-injection")
    data = {
        "project": "AI Governance Control Wiki",
        "summary": {
            "page_count": len(pages),
            "risk_count": len([p for p in pages if p["type"] == "risk"]),
            "control_count": len([p for p in pages if p["type"] == "control"]),
            "needs_review": len([p for p in pages if p["review_status"] == "needs_review"]),
        },
        "pages": pages,
        "selected": selected,
        "mapping": map_risk_to_controls("prompt-injection"),
        "search": search_wiki("oversight", limit=5),
        "graph": get_wiki_graph(),
        "health": health_report(),
        "resources": list_resources(),
        "prompts": list_prompts(),
        "coverage": source_coverage(),
        "trace": trace_page("prompt-injection"),
        "claimTrace": trace_claim("prompt-injection", "tool boundaries"),
        "quality": quality_report(),
        "draftPreview": create_wiki_draft("raw/ai_governance/nist-ai-rmf.md", title="NIST AI RMF Draft Example", dry_run=True),
        "manifest": submission_manifest(),
        "tools": [
            "search_wiki",
            "read_page",
            "list_pages",
            "map_risk_to_controls",
            "get_wiki_graph",
            "run_maintenance_check",
            "save_query_note",
            "health_report",
            "resources/list",
            "resources/read",
            "prompts/list",
            "prompts/get",
            "source_coverage",
            "trace_page",
            "trace_claim",
            "quality_report",
            "create_wiki_draft",
            "submission_manifest",
        ],
    }
    (app / "wiki-data.js").write_text(
        "window.WIKI_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print("generated app/wiki-data.js")


if __name__ == "__main__":
    main()
