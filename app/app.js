(function () {
  const data = window.WIKI_DATA;
  const pages = data.pages;
  let selectedSlug = data.selected.page.slug;
  let selectedTool = "map_risk_to_controls";
  let query = "";

  const bySlug = new Map(pages.map((page) => [page.slug, page]));
  const graphEdges = data.graph.edges || [];
  const graphNodes = data.graph.nodes || [];

  function pageText(slug) {
    if (slug === data.selected.page.slug) return data.selected.page.text;
    return "";
  }

  function extractSection(text, heading) {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = text.match(new RegExp(`## ${escaped}\\s+([\\s\\S]*?)(?=\\n## |$)`));
    return match ? match[1].replace(/\s+/g, " ").trim() : "";
  }

  function evidenceRows(text) {
    const section = extractSection(text, "Evidence Map");
    if (!section) return [];
    return section
      .split("|")
      .join("\n|")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("Claim"))
      .map((line) => line.replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim()))
      .filter((cells) => cells.length >= 3)
      .map((cells) => ({ claim: cells[0], evidence: cells[1].replace(/`/g, ""), status: cells[2] }));
  }

  function pageMatches(page) {
    if (!query) return true;
    const text = `${page.title} ${page.type} ${page.review_status} ${page.path}`.toLowerCase();
    return text.includes(query);
  }

  function renderNavList(type, targetId) {
    const target = document.getElementById(targetId);
    target.innerHTML = pages
      .filter((page) => page.type === type)
      .filter(pageMatches)
      .map((page) => `<button class="nav-item ${page.slug === selectedSlug ? "active" : ""}" data-slug="${page.slug}" type="button">${page.title}</button>`)
      .join("");
  }

  function renderNav() {
    renderNavList("risk", "riskList");
    renderNavList("control", "controlList");
    renderNavList("framework", "frameworkList");
  }

  function controlsFor(page) {
    const related = page.slug === data.mapping.risk?.slug ? data.mapping.controls : [];
    if (related.length) return related;
    const targets = graphEdges.filter((edge) => edge.source === page.slug && edge.type === "related_controls").map((edge) => edge.target);
    return targets.map((slug) => bySlug.get(slug)).filter(Boolean);
  }

  const toolInfo = {
    search_wiki: {
      description: "Search page titles, metadata, and generated snippets.",
      request: () => ({ query: document.querySelector(".search").value || bySlug.get(selectedSlug).title, limit: 5 }),
      result: () => data.search.results.map((item) => `${item.title} (${item.type})`)
    },
    read_page: {
      description: "Read the selected page as Markdown plus frontmatter.",
      request: () => ({ page_id: selectedSlug }),
      result: () => {
        const page = bySlug.get(selectedSlug);
        return [`title: ${page.title}`, `type: ${page.type}`, `review_status: ${page.review_status}`, `path: ${page.path}`];
      }
    },
    list_pages: {
      description: "List pages filtered by type or review status.",
      request: () => ({ page_type: bySlug.get(selectedSlug).type }),
      result: () => pages.filter((page) => page.type === bySlug.get(selectedSlug).type).map((page) => page.title)
    },
    map_risk_to_controls: {
      description: "Map a risk page to related control pages.",
      request: () => ({ risk_id: selectedSlug }),
      result: () => controlsFor(bySlug.get(selectedSlug)).map((control) => control.title)
    },
    get_wiki_graph: {
      description: "Return graph nodes and edges for visualization.",
      request: () => ({}),
      result: () => [`nodes: ${data.graph.node_count}`, `edges: ${data.graph.edge_count}`, `selected: ${selectedSlug}`]
    },
    run_maintenance_check: {
      description: "Run structural checks and report blocking issues.",
      request: () => ({}),
      result: () => ["Blocking issues: 0", `Review queue: ${data.summary.needs_review}`]
    },
    save_query_note: {
      description: "Persist a question and answer draft under wiki/queries.",
      request: () => ({ query: document.querySelector(".search").value || bySlug.get(selectedSlug).title, answer_draft: "REVIEW_REQUIRED" }),
      result: () => ["write target: wiki/queries/", "requires explicit tool call outside viewer"]
    },
    health_report: {
      description: "Read the latest generated health report.",
      request: () => ({}),
      result: () => ["Missing sources: 0", "Missing Evidence Map: 0", `Review queue: ${data.summary.needs_review}`]
    },
    source_coverage: {
      description: "Check source file, Evidence Map, and source_count coverage.",
      request: () => ({}),
      result: () => [
        `pages: ${data.coverage.page_count}`,
        `missing sources: ${data.coverage.missing_source_count}`,
        `missing evidence maps: ${data.coverage.missing_evidence_map_count}`,
        `blocking: ${data.coverage.blocking_issue_count}`
      ]
    },
    trace_page: {
      description: "Trace selected page to sources and graph edges.",
      request: () => ({ page_id: selectedSlug }),
      result: () => selectedSlug === data.trace.page.slug
        ? [`sources: ${data.trace.connectivity.source_count}`, `incoming: ${data.trace.connectivity.incoming_count}`, `outgoing: ${data.trace.connectivity.outgoing_count}`]
        : [`Use MCP trace_page for ${selectedSlug}`, "Static preview is bundled for prompt-injection."]
    },
    trace_claim: {
      description: "Trace Evidence Map claims to raw source refs and wiki refs.",
      request: () => ({ page_id: selectedSlug, claim_query: "tool boundaries" }),
      result: () => data.claimTrace.claims.map((claim) => `${claim.claim} -> ${claim.evidence}`)
    },
    quality_report: {
      description: "Score pages against schema, source, evidence, and wikilink gates.",
      request: () => ({ page_id: selectedSlug }),
      result: () => [`overall: ${data.quality.status}`, `average: ${data.quality.average_score}/100`, `blocking: ${data.quality.blocking_issue_count}`]
    },
    create_wiki_draft: {
      description: "Create or preview a review-needed draft from one raw source.",
      request: () => ({ raw_path: data.draftPreview.source, title: data.draftPreview.title, dry_run: true }),
      result: () => [`preview: ${data.draftPreview.path}`, `source: ${data.draftPreview.source}`, "write mode requires --write"]
    },
    submission_manifest: {
      description: "Verify deliverables, ZIP layout, and MCP tool manifest.",
      request: () => ({}),
      result: () => [`root files: ${data.manifest.all_required_root_files_present}`, `tools: ${data.manifest.mcp_tools.length}`, `zip cache: ${data.manifest.zip.cache_entry_count}`]
    }
  };

  function renderInspector() {
    const page = bySlug.get(selectedSlug);
    const info = toolInfo[selectedTool] || toolInfo.map_risk_to_controls;
    const request = {
      jsonrpc: "2.0",
      method: "tools/call",
      params: {
        name: selectedTool,
        arguments: info.request()
      }
    };
    const result = info.result();
    document.getElementById("selectedPageType").textContent = page.type;
    document.getElementById("selectedPageSlug").textContent = page.slug;
    document.getElementById("selectedToolName").textContent = selectedTool;
    document.getElementById("selectedToolDescription").textContent = info.description;
    document.getElementById("toolRequest").textContent = JSON.stringify(request, null, 2);
    document.getElementById("toolResult").innerHTML = result.length
      ? result.map((line) => `<div>${line}</div>`).join("")
      : "<div>No bundled preview result for this page.</div>";
  }

  function renderPage() {
    const page = bySlug.get(selectedSlug) || pages[0];
    selectedSlug = page.slug;
    const text = pageText(page.slug);
    const summary = text ? extractSection(text, "Summary") : `${page.title} page. Use read_page through MCP for full Markdown text.`;
    const controls = controlsFor(page);
    const evidence = text ? evidenceRows(text) : [];

    document.getElementById("pageTitle").textContent = page.title;
    document.querySelector(".topbar .pill").textContent = page.type;
    document.querySelector(".topbar .pill.ok").textContent = page.review_status;
    document.querySelector(".topbar .muted").textContent = page.path;
    document.getElementById("summaryText").textContent = summary;
    document.getElementById("controlCards").innerHTML = controls.length
      ? controls.map((control) => `<button class="card" data-slug="${control.slug}" type="button"><strong>${control.title}</strong><span>${(control.frameworks || []).join(" / ")}</span></button>`).join("")
      : `<div class="card"><strong>No direct controls</strong><span>Use graph or search to inspect related pages.</span></div>`;

    const body = document.querySelector("tbody");
    body.innerHTML = evidence.length
      ? evidence.map((row) => `<tr><td>${row.claim}</td><td>${row.evidence}</td><td>${row.status}</td></tr>`).join("")
      : `<tr><td colspan="3">Evidence Map is available through source_coverage or read_page.</td></tr>`;

    renderGraph();
    renderNav();
    renderInspector();
  }

  function renderGraph() {
    const graph = document.getElementById("graph");
    const nodes = [
      { id: "prompt-injection", label: "Prompt Injection", type: "risk", x: 38, y: 84 },
      { id: "tool-permission-boundary", label: "Tool Boundary", type: "control", x: 350, y: 38 },
      { id: "human-oversight-gate", label: "Human Oversight", type: "control", x: 346, y: 112 },
      { id: "audit-logging", label: "Audit Logging", type: "control", x: 354, y: 176 },
      { id: "owasp-llm-top10", label: "OWASP LLM Top 10", type: "framework", x: 668, y: 76 },
      { id: "nist-ai-rmf", label: "NIST AI RMF", type: "framework", x: 690, y: 150 }
    ];
    const edges = [[0, 1], [0, 2], [0, 3], [1, 4], [2, 5], [3, 5]];
    function edge(a, b) {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      return `<div class="edge" style="left:${a.x + 55}px;top:${a.y + 15}px;width:${len}px;transform:rotate(${angle}deg)"></div>`;
    }
    graph.innerHTML = edges.map(([a, b]) => edge(nodes[a], nodes[b])).join("") +
      nodes.map((node) => `<button class="node ${node.type} ${node.id === selectedSlug ? "active" : ""}" data-slug="${node.id}" type="button" style="left:${node.x}px;top:${node.y}px">${node.label}</button>`).join("");
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-slug]");
    if (!target) return;
    if (target.hasAttribute("data-tool")) {
      selectedTool = target.getAttribute("data-tool");
      renderInspector();
      document.querySelectorAll("[data-tool]").forEach((button) => button.classList.toggle("active", button.getAttribute("data-tool") === selectedTool));
      return;
    }
    const slug = target.getAttribute("data-slug");
    if (!bySlug.has(slug)) return;
    selectedSlug = slug;
    renderPage();
  });

  document.querySelector(".search").addEventListener("input", (event) => {
    query = event.target.value.trim().toLowerCase();
    renderNav();
  });

  document.getElementById("resetView").addEventListener("click", () => {
    selectedSlug = "prompt-injection";
    selectedTool = "map_risk_to_controls";
    query = "";
    document.querySelector(".search").value = "";
    renderPage();
  });

  document.getElementById("pageCount").textContent = data.summary.page_count;
  document.getElementById("edgeCount").textContent = data.graph.edge_count;
  document.getElementById("reviewCount").textContent = data.summary.needs_review;
  document.getElementById("toolList").innerHTML = data.tools
    .filter((tool) => !tool.includes("/"))
    .map((tool) => `<button class="tool ${tool === selectedTool ? "active" : ""}" data-tool="${tool}" type="button">${tool}</button>`)
    .join("");
  document.getElementById("qualityStatus").textContent = `${data.quality.status.toUpperCase()} / ${data.quality.average_score}/100`;
  document.getElementById("qualityDetail").textContent = `blocking ${data.quality.blocking_issue_count}, warnings ${data.quality.warning_count}`;
  document.getElementById("claimTrace").textContent = `${data.claimTrace.claim_count} matched claim`;
  const firstClaim = data.claimTrace.claims[0];
  document.getElementById("claimTraceDetail").textContent = firstClaim ? `${firstClaim.claim} -> ${firstClaim.evidence}` : "No matched claim";
  document.getElementById("draftPipeline").textContent = data.draftPreview.dry_run ? "preview ready" : "draft created";
  document.getElementById("draftPipelineDetail").textContent = `${data.draftPreview.path} from ${data.draftPreview.source}`;

  renderPage();
})();
