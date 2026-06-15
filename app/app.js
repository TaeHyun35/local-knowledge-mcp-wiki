(function () {
  const data = window.WIKI_DATA;
  const pages = data.pages;
  let selectedSlug = data.selected.page.slug;
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

    document.getElementById("mappingText").innerHTML = controls.length ? controls.map((c) => `- ${c.title}`).join("<br>") : "No mapped controls for this page.";
    renderGraph();
    renderNav();
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
    const slug = target.getAttribute("data-slug");
    if (!bySlug.has(slug)) return;
    selectedSlug = slug;
    renderPage();
  });

  document.querySelector(".search").addEventListener("input", (event) => {
    query = event.target.value.trim().toLowerCase();
    renderNav();
  });

  document.querySelector(".agent button").addEventListener("click", () => {
    selectedSlug = "prompt-injection";
    query = "";
    document.querySelector(".search").value = "";
    renderPage();
  });

  document.getElementById("pageCount").textContent = data.summary.page_count;
  document.getElementById("edgeCount").textContent = data.graph.edge_count;
  document.getElementById("reviewCount").textContent = data.summary.needs_review;
  document.getElementById("toolList").innerHTML = data.tools.map((tool) => `<span class="tool">${tool}</span>`).join("");
  document.getElementById("qualityStatus").textContent = `${data.quality.status.toUpperCase()} / ${data.quality.average_score}/100`;
  document.getElementById("qualityDetail").textContent = `blocking ${data.quality.blocking_issue_count}, warnings ${data.quality.warning_count}`;
  document.getElementById("claimTrace").textContent = `${data.claimTrace.claim_count} matched claim`;
  const firstClaim = data.claimTrace.claims[0];
  document.getElementById("claimTraceDetail").textContent = firstClaim ? `${firstClaim.claim} -> ${firstClaim.evidence}` : "No matched claim";
  document.getElementById("draftPipeline").textContent = data.draftPreview.dry_run ? "preview ready" : "draft created";
  document.getElementById("draftPipelineDetail").textContent = `${data.draftPreview.path} from ${data.draftPreview.source}`;

  renderPage();
})();
