(function () {
  const data = window.WIKI_DATA;
  const pages = data.pages;
  const details = data.pageDetails || {};
  const bySlug = new Map(pages.map((page) => [page.slug, page]));
  const graphEdges = data.graph.edges || [];
  const graphNodes = data.graph.nodes || [];

  let selectedSlug = data.selected.page.slug;
  let selectedTool = "map_risk_to_controls";
  let query = "";
  let filter = "all";

  const typeOrder = { risk: 0, control: 1, framework: 2, query: 3, concept: 4 };

  function currentPage() {
    return bySlug.get(selectedSlug) || pages[0];
  }

  function currentDetail() {
    return details[selectedSlug] || data.selected.page;
  }

  function pageText(slug) {
    return (details[slug] && details[slug].text) || "";
  }

  function extractSection(text, heading) {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = text.match(new RegExp(`## ${escaped}\\s+([\\s\\S]*?)(?=\\n## |$)`));
    return match ? match[1].trim() : "";
  }

  function cleanText(text) {
    return text.replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, slug, label) => label || slug).replace(/\s+/g, " ").trim();
  }

  function evidenceRows(text) {
    const section = extractSection(text, "Evidence Map");
    if (!section) return [];
    return section
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("Claim"))
      .map((line) => line.replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim()))
      .filter((cells) => cells.length >= 3)
      .map((cells) => ({ claim: cells[0], evidence: cells[1].replace(/`/g, ""), status: cells[2] }));
  }

  function pageMatches(page) {
    const text = `${page.title} ${page.type} ${page.review_status} ${page.path} ${page.slug}`.toLowerCase();
    const matchesQuery = !query || text.includes(query);
    const matchesFilter = filter === "all" || page.type === filter;
    return matchesQuery && matchesFilter;
  }

  function renderNavList(type, targetId) {
    const target = document.getElementById(targetId);
    const items = pages
      .filter((page) => page.type === type)
      .filter(pageMatches)
      .sort((a, b) => a.title.localeCompare(b.title));
    target.innerHTML = items.length
      ? items.map((page) => `<button class="nav-item ${page.slug === selectedSlug ? "active" : ""}" data-slug="${page.slug}" type="button"><span>${page.title}</span><small>${page.review_status}</small></button>`).join("")
      : `<div class="empty-state">No ${type} pages</div>`;
  }

  function renderNav() {
    renderNavList("risk", "riskList");
    renderNavList("control", "controlList");
    renderNavList("framework", "frameworkList");
  }

  function controlsFor(page) {
    const detail = details[page.slug];
    const direct = detail?.meta?.related_controls || [];
    const mapped = page.slug === data.mapping.risk?.slug ? data.mapping.controls.map((control) => control.slug) : [];
    const graphTargets = graphEdges.filter((edge) => edge.source === page.slug && edge.type === "related_controls").map((edge) => edge.target);
    return [...new Set([...direct, ...mapped, ...graphTargets])].map((slug) => bySlug.get(slug)).filter(Boolean);
  }

  function outgoingFor(slug) {
    return graphEdges.filter((edge) => edge.source === slug);
  }

  function incomingFor(slug) {
    return graphEdges.filter((edge) => edge.target === slug);
  }

  function sourceList() {
    const detail = currentDetail();
    const sources = detail.meta?.sources || [];
    return Array.isArray(sources) ? sources : [sources].filter(Boolean);
  }

  const toolInfo = {
    search_wiki: {
      description: "Search page titles, metadata, and generated snippets.",
      request: () => ({ query: document.getElementById("searchInput").value || currentPage().title, limit: 5 }),
      result: () => pages.filter(pageMatches).slice(0, 5).map((item) => `${item.title} (${item.type})`)
    },
    read_page: {
      description: "Read the selected page as Markdown plus frontmatter.",
      request: () => ({ page_id: selectedSlug }),
      result: () => {
        const page = currentPage();
        return [`title: ${page.title}`, `type: ${page.type}`, `review_status: ${page.review_status}`, `path: ${page.path}`];
      }
    },
    list_pages: {
      description: "List pages filtered by type or review status.",
      request: () => ({ page_type: currentPage().type }),
      result: () => pages.filter((page) => page.type === currentPage().type).map((page) => page.title)
    },
    map_risk_to_controls: {
      description: "Map a risk page to related control pages.",
      request: () => ({ risk_id: selectedSlug }),
      result: () => controlsFor(currentPage()).map((control) => control.title)
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
      request: () => ({ query: document.getElementById("searchInput").value || currentPage().title, answer_draft: "REVIEW_REQUIRED" }),
      result: () => ["write target: wiki/queries/", "viewer is read-only; use MCP server to write"]
    },
    health_report: {
      description: "Read the latest generated health report.",
      request: () => ({}),
      result: () => ["Missing sources: 0", "Missing Evidence Map: 0", `Review queue: ${data.summary.needs_review}`]
    },
    source_coverage: {
      description: "Check source file, Evidence Map, and source_count coverage.",
      request: () => ({}),
      result: () => [`pages: ${data.coverage.page_count}`, `missing sources: ${data.coverage.missing_source_count}`, `missing evidence maps: ${data.coverage.missing_evidence_map_count}`, `blocking: ${data.coverage.blocking_issue_count}`]
    },
    trace_page: {
      description: "Trace selected page to sources and graph edges.",
      request: () => ({ page_id: selectedSlug }),
      result: () => [`sources: ${sourceList().length}`, `incoming: ${incomingFor(selectedSlug).length}`, `outgoing: ${outgoingFor(selectedSlug).length}`]
    },
    trace_claim: {
      description: "Trace Evidence Map claims to raw source refs and wiki refs.",
      request: () => ({ page_id: selectedSlug, claim_query: "evidence" }),
      result: () => evidenceRows(pageText(selectedSlug)).slice(0, 3).map((claim) => `${claim.claim} -> ${claim.evidence}`)
    },
    quality_report: {
      description: "Score pages against schema, source, evidence, and wikilink gates.",
      request: () => ({ page_id: selectedSlug }),
      result: () => {
        const item = data.quality.pages.find((page) => page.slug === selectedSlug);
        return item ? [`status: ${item.status}`, `score: ${item.score}/100`, `claims: ${item.claim_count}`, `sources: ${item.source_count}`] : [`overall: ${data.quality.status}`];
      }
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
    const page = currentPage();
    const info = toolInfo[selectedTool] || toolInfo.map_risk_to_controls;
    const request = { jsonrpc: "2.0", method: "tools/call", params: { name: selectedTool, arguments: info.request() } };
    const result = info.result();
    document.getElementById("selectedPageType").textContent = page.type;
    document.getElementById("selectedPageSlug").textContent = page.slug;
    document.getElementById("selectedToolName").textContent = selectedTool;
    document.getElementById("selectedToolDescription").textContent = info.description;
    document.getElementById("toolRequest").textContent = JSON.stringify(request, null, 2);
    document.getElementById("toolResult").innerHTML = result.length ? result.map((line) => `<div>${line}</div>`).join("") : "<div>No preview result.</div>";
    document.querySelectorAll("[data-tool]").forEach((button) => button.classList.toggle("active", button.getAttribute("data-tool") === selectedTool));
  }

  function renderMeta(detail) {
    const meta = detail.meta || {};
    const items = [
      ["confidence", meta.confidence || "n/a"],
      ["sources", sourceList().length],
      ["incoming", incomingFor(selectedSlug).length],
      ["outgoing", outgoingFor(selectedSlug).length]
    ];
    document.getElementById("metaStrip").innerHTML = items.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  }

  function renderPage() {
    const page = currentPage();
    const detail = currentDetail();
    const text = pageText(page.slug);
    const summary = text ? cleanText(extractSection(text, "Summary")) : `${page.title} page. Use read_page through MCP for full Markdown text.`;
    const controls = controlsFor(page);
    const evidence = evidenceRows(text);

    document.getElementById("pageTitle").textContent = page.title;
    document.getElementById("pageTypePill").textContent = page.type;
    document.getElementById("reviewPill").textContent = page.review_status;
    document.getElementById("pathText").textContent = page.path;
    document.getElementById("summaryText").textContent = summary;
    renderMeta(detail);

    document.getElementById("controlCards").innerHTML = controls.length
      ? controls.map((control) => `<button class="card" data-slug="${control.slug}" type="button"><strong>${control.title}</strong><span>${control.path}</span></button>`).join("")
      : `<div class="card"><strong>No direct controls</strong><span>Use graph or search to inspect related pages.</span></div>`;

    document.querySelector("tbody").innerHTML = evidence.length
      ? evidence.map((row) => `<tr><td>${row.claim}</td><td>${row.evidence}</td><td>${row.status}</td></tr>`).join("")
      : `<tr><td colspan="3">No Evidence Map rows in bundled page detail.</td></tr>`;

    renderGraph();
    renderNav();
    renderInspector();
  }

  function graphPosition(node, index, groupCounts) {
    const column = typeOrder[node.type] ?? 3;
    const total = groupCounts[node.type] || 1;
    const orderInType = graphNodes.filter((item) => item.type === node.type).findIndex((item) => item.id === node.id);
    const x = 34 + column * 255;
    const y = 28 + (orderInType + 1) * (166 / (total + 1));
    return { x, y };
  }

  function renderGraph() {
    const graph = document.getElementById("graph");
    const visibleNodes = graphNodes.filter((node) => node.type !== "query").slice(0, 13);
    const groupCounts = visibleNodes.reduce((acc, node) => ({ ...acc, [node.type]: (acc[node.type] || 0) + 1 }), {});
    const positioned = new Map(visibleNodes.map((node, index) => [node.id, { ...node, ...graphPosition(node, index, groupCounts) }]));
    const visibleEdges = graphEdges.filter((edge) => positioned.has(edge.source) && positioned.has(edge.target)).slice(0, 28);
    const edgeHtml = visibleEdges.map((edge) => {
      const a = positioned.get(edge.source);
      const b = positioned.get(edge.target);
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      return `<div class="edge" title="${edge.type}" style="left:${a.x + 58}px;top:${a.y + 15}px;width:${len}px;transform:rotate(${angle}deg)"></div>`;
    }).join("");
    const nodeHtml = [...positioned.values()].map((node) => `<button class="node ${node.type} ${node.id === selectedSlug ? "active" : ""}" data-slug="${node.id}" type="button" style="left:${node.x}px;top:${node.y}px">${node.label}</button>`).join("");
    graph.innerHTML = edgeHtml + nodeHtml;
  }

  function renderToolButtons() {
    document.getElementById("toolList").innerHTML = data.tools
      .filter((tool) => !tool.includes("/"))
      .map((tool) => `<button class="tool ${tool === selectedTool ? "active" : ""}" data-tool="${tool}" type="button">${tool}</button>`)
      .join("");
  }

  document.addEventListener("click", (event) => {
    const toolTarget = event.target.closest("[data-tool]");
    if (toolTarget) {
      selectedTool = toolTarget.getAttribute("data-tool");
      renderInspector();
      return;
    }
    const filterTarget = event.target.closest("[data-filter]");
    if (filterTarget) {
      filter = filterTarget.getAttribute("data-filter");
      document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("active", button.getAttribute("data-filter") === filter));
      renderNav();
      return;
    }
    const target = event.target.closest("[data-slug]");
    if (!target) return;
    const slug = target.getAttribute("data-slug");
    if (!bySlug.has(slug)) return;
    selectedSlug = slug;
    renderPage();
  });

  document.getElementById("searchInput").addEventListener("input", (event) => {
    query = event.target.value.trim().toLowerCase();
    renderNav();
    renderInspector();
  });

  document.getElementById("resetView").addEventListener("click", () => {
    selectedSlug = "prompt-injection";
    selectedTool = "map_risk_to_controls";
    query = "";
    filter = "all";
    document.getElementById("searchInput").value = "";
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("active", button.getAttribute("data-filter") === "all"));
    renderPage();
  });

  document.getElementById("pageCount").textContent = data.summary.page_count;
  document.getElementById("edgeCount").textContent = data.graph.edge_count;
  document.getElementById("reviewCount").textContent = data.summary.needs_review;
  document.getElementById("qualityStatus").textContent = `${data.quality.status.toUpperCase()} / ${data.quality.average_score}/100`;
  document.getElementById("qualityDetail").textContent = `blocking ${data.quality.blocking_issue_count}, warnings ${data.quality.warning_count}`;
  document.getElementById("claimTrace").textContent = `${data.claimTrace.claim_count} matched claim`;
  const firstClaim = data.claimTrace.claims[0];
  document.getElementById("claimTraceDetail").textContent = firstClaim ? `${firstClaim.claim} -> ${firstClaim.evidence}` : "No matched claim";
  document.getElementById("draftPipeline").textContent = data.draftPreview.dry_run ? "preview ready" : "draft created";
  document.getElementById("draftPipelineDetail").textContent = `${data.draftPreview.path} from ${data.draftPreview.source}`;

  renderToolButtons();
  renderPage();
})();
