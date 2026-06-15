from server import TOOLS
from wiki_core import create_wiki_draft, get_prompt, get_wiki_graph, list_pages, list_prompts, list_resources, map_risk_to_controls, quality_report, read_page, read_resource, search_wiki, source_coverage, submission_manifest, trace_claim, trace_page


def main() -> None:
    pages = list_pages()
    assert pages["count"] >= 13, pages["count"]
    for tool_name in ("source_coverage", "trace_page", "trace_claim", "quality_report", "create_wiki_draft", "submission_manifest"):
        assert tool_name in TOOLS, sorted(TOOLS)

    risk_pages = list_pages(page_type="risk")
    assert risk_pages["count"] >= 4, risk_pages["count"]

    result = map_risk_to_controls("prompt-injection")
    assert result["found"], result
    assert len(result["controls"]) >= 2, result

    search = search_wiki("oversight")
    assert search["count"] > 0, search

    page = read_page("human-oversight-gate")
    assert page["found"], page

    graph = get_wiki_graph()
    assert graph["node_count"] >= 13, graph
    assert graph["edge_count"] >= 8, graph

    resources = list_resources()
    assert len(resources["resources"]) >= 13, resources
    resource = read_resource("wiki://prompt-injection")
    assert resource["found"], resource

    prompts = list_prompts()
    assert len(prompts["prompts"]) >= 2, prompts
    prompt = get_prompt("governance_answer", {"query": "prompt injection"})
    assert "messages" in prompt, prompt

    coverage = source_coverage()
    assert coverage["blocking_issue_count"] == 0, coverage
    assert coverage["missing_source_count"] == 0, coverage
    assert coverage["missing_evidence_map_count"] == 0, coverage
    assert coverage["source_count_mismatch_count"] == 0, coverage

    trace = trace_page("prompt-injection")
    assert trace["found"], trace
    assert trace["connectivity"]["outgoing_count"] >= 3, trace
    assert trace["connectivity"]["source_count"] >= 2, trace

    claims = trace_claim("prompt-injection", "tool boundaries")
    assert claims["found"], claims
    assert claims["claim_count"] >= 1, claims

    quality = quality_report()
    assert quality["status"] == "pass", quality
    assert quality["blocking_issue_count"] == 0, quality
    assert quality["average_score"] >= 90, quality
    missing_quality = quality_report("missing-page")
    assert missing_quality["status"] == "fail", missing_quality
    assert missing_quality["blocking_issue_count"] == 1, missing_quality

    draft = create_wiki_draft("raw/ai_governance/nist-ai-rmf.md", title="NIST AI RMF Draft Example", dry_run=True)
    assert draft["dry_run"] and not draft["created"], draft
    assert "## Evidence Map" in draft["preview"], draft
    unsafe_draft = create_wiki_draft("submission/README.md", dry_run=True)
    assert not unsafe_draft["created"], unsafe_draft
    assert "raw_path must be inside raw/" in unsafe_draft["error"], unsafe_draft

    manifest = submission_manifest()
    assert manifest["all_required_root_files_present"], manifest
    if manifest["zip"]["exists"]:
        assert manifest["zip"]["root_layout_ok"], manifest
        assert manifest["zip"]["cache_entry_count"] == 0, manifest

    print("SMOKE TEST OK")
    print(f"pages={pages['count']} risks={risk_pages['count']} graph_edges={graph['edge_count']}")


if __name__ == "__main__":
    main()
