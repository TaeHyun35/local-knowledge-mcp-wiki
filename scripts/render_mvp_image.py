from __future__ import annotations

import sys
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "mcp_server"))

from wiki_core import get_wiki_graph, list_pages, map_risk_to_controls  # noqa: E402


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def draw_text(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, size: int = 18, fill="#e8eaf0", bold: bool = False) -> None:
    draw.text(xy, text, font=font(size, bold), fill=fill)


def rounded(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], fill: str, outline: str | None = None, radius: int = 8) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline)


def main() -> None:
    W, H = 2048, 1280
    img = Image.new("RGB", (W, H), "#0f1117")
    d = ImageDraw.Draw(img)

    sidebar_w = 390
    agent_x = 1518
    d.rectangle((0, 0, sidebar_w, H), fill="#171a22")
    d.rectangle((agent_x, 0, W, H), fill="#181c26")
    d.line((sidebar_w, 0, sidebar_w, H), fill="#2a2f3b", width=2)
    d.line((agent_x, 0, agent_x, H), fill="#2a2f3b", width=2)

    pages = list_pages()["pages"]
    risks = [p for p in pages if p["type"] == "risk"]
    controls = [p for p in pages if p["type"] == "control"]
    frameworks = [p for p in pages if p["type"] == "framework"]
    graph = get_wiki_graph()
    mapping = map_risk_to_controls("prompt-injection")

    draw_text(d, (24, 32), "AI Governance", 28, bold=True)
    draw_text(d, (24, 68), "Control Wiki", 28, bold=True)
    d.ellipse((24, 116, 36, 128), fill="#4ade80")
    draw_text(d, (46, 110), f"validate OK / {len(pages)} pages / MCP served", 16, "#aab2c0")
    rounded(d, (24, 154, 366, 202), "#0e1118", "#323849")
    draw_text(d, (42, 166), "search: prompt injection", 17, "#d7dcea")

    y = 238
    for title, items, color in [("RISKS", risks, "#7aa2ff"), ("CONTROLS", controls, "#42b883"), ("FRAMEWORKS", frameworks, "#d49b42")]:
        draw_text(d, (24, y), title, 14, "#8892a6", True)
        y += 32
        for i, item in enumerate(items[:6]):
            if item["slug"] == "prompt-injection":
                rounded(d, (18, y - 5, 372, y + 34), "#253047", None)
            d.ellipse((28, y + 8, 40, y + 20), fill=color)
            draw_text(d, (52, y), item["title"][:31], 19)
            y += 40
        y += 18

    content_x = sidebar_w + 48
    top_y = 42
    rounded(d, (content_x, top_y, content_x + 70, top_y + 34), "#263149")
    draw_text(d, (content_x + 16, top_y + 6), "risk", 16)
    rounded(d, (content_x + 82, top_y, content_x + 205, top_y + 34), "#4a3722")
    draw_text(d, (content_x + 98, top_y + 6), "mvp_validated", 16, "#73e0a0")
    draw_text(d, (content_x + 230, top_y + 6), "NIST AI RMF / OWASP LLM Top 10 / MITRE ATLAS", 17, "#9ba5b8")
    draw_text(d, (1350, top_y + 6), f"{graph['edge_count']} graph edges", 17, "#aab2c0")
    d.line((content_x, 94, agent_x - 48, 94), fill="#303647", width=2)

    draw_text(d, (content_x, 128), "Prompt Injection", 44, bold=True)
    draw_text(d, (content_x, 212), "Summary", 24, bold=True)
    summary = (
        "Prompt injection is an LLM application risk where untrusted instructions attempt to override "
        "the intended task, policy, or tool-use boundary. This Wiki maps the risk to explicit controls "
        "before an agent can use tools or update governance knowledge."
    )
    summary_lines = textwrap.wrap(summary, width=92)
    d.multiline_text((content_x, 252), "\n".join(summary_lines), font=font(20), fill="#d5dae5", spacing=8)

    draw_text(d, (content_x, 372), "Related Controls", 24, bold=True)
    card_y = 414
    for i, control in enumerate(mapping["controls"]):
        x = content_x + i * 260
        rounded(d, (x, card_y, x + 238, card_y + 118), "#171c27", "#31384a")
        draw_text(d, (x + 18, card_y + 18), control["title"], 19, bold=True)
        frameworks_text = " / ".join(control.get("frameworks", [])) or "MCP control"
        draw_text(d, (x + 18, card_y + 58), frameworks_text[:24], 15, "#aeb7c8")

    draw_text(d, (content_x, 586), "Evidence Map", 24, bold=True)
    table = (content_x, 630, agent_x - 70, 804)
    rounded(d, table, "#151923", "#303647")
    d.rectangle((table[0], table[1], table[2], table[1] + 44), fill="#1b2030")
    draw_text(d, (table[0] + 16, table[1] + 11), "Claim", 17, "#b8c0d2", True)
    draw_text(d, (table[0] + 520, table[1] + 11), "Evidence", 17, "#b8c0d2", True)
    draw_text(d, (table[0] + 780, table[1] + 11), "Status", 17, "#b8c0d2", True)
    rows = [
        ("Prompt injection is a major LLM application risk.", "OWASP LLM Top 10", "mvp_validated"),
        ("Tool boundaries reduce action blast radius.", "Tool Permission Boundary", "mvp_validated"),
        ("Human approval limits excessive agency.", "Human Oversight Gate", "mvp_validated"),
    ]
    ry = table[1] + 58
    for claim, evidence, status in rows:
        draw_text(d, (table[0] + 16, ry), claim, 17)
        draw_text(d, (table[0] + 520, ry), evidence, 17, "#c7d2fe")
        draw_text(d, (table[0] + 780, ry), status, 17, "#ffd69c")
        ry += 42

    draw_text(d, (content_x, 850), "Wiki Graph Preview", 24, bold=True)
    rounded(d, (content_x, 894, agent_x - 70, 1138), "#11151f", "#303647")
    nodes = [
        ("Prompt Injection", 505, 988, "#24324d", "#5b7ed1"),
        ("Tool Boundary", 820, 930, "#1d3a33", "#42b883"),
        ("Human Oversight", 830, 1010, "#1d3a33", "#42b883"),
        ("Audit Logging", 845, 1090, "#1d3a33", "#42b883"),
        ("OWASP LLM Top 10", 1160, 948, "#3b2e20", "#d49b42"),
        ("NIST AI RMF", 1195, 1040, "#3b2e20", "#d49b42"),
    ]
    lines = [(0, 1), (0, 2), (0, 3), (1, 4), (2, 5), (3, 5)]
    centers = []
    for label, x, yy, fill, outline in nodes:
        centers.append((x + 70, yy + 18))
    for a, b in lines:
        d.line((centers[a], centers[b]), fill="#4c566d", width=2)
    for label, x, yy, fill, outline in nodes:
        rounded(d, (x, yy, x + 165, yy + 38), fill, outline, 18)
        draw_text(d, (x + 14, yy + 8), label, 15)

    draw_text(d, (1542, 34), "Governance Agent", 24, bold=True)
    rounded(d, (1916, 28, 2026, 68), "#2b3650")
    draw_text(d, (1938, 38), "Reset", 16)
    rounded(d, (1702, 112, 2026, 180), "#2f4168")
    draw_text(d, (1724, 132), "What controls map to", 18)
    draw_text(d, (1724, 156), "prompt injection?", 18)
    rounded(d, (1542, 214, 2026, 392), "#222837")
    draw_text(d, (1564, 236), "MCP Tool: map_risk_to_controls", 18, "#dce6ff", True)
    y2 = 276
    for control in mapping["controls"]:
        draw_text(d, (1572, y2), f"- {control['title']}", 18)
        y2 += 30
    rounded(d, (1542, 440, 2026, 720), "#121722", "#2f3647")
    draw_text(d, (1564, 462), "MCP Tools", 22, bold=True)
    tools = ["search_wiki", "read_page", "list_pages", "map_risk_to_controls", "source_coverage", "trace_page", "trace_claim", "quality_report", "create_wiki_draft", "submission_manifest", "resources/read", "prompts/get"]
    for idx, tool in enumerate(tools):
        col = idx // 6
        row = idx % 6
        tx = 1564 + col * 224
        ty = 510 + row * 38
        rounded(d, (tx, ty, tx + 206, ty + 31), "#263149")
        draw_text(d, (tx + 12, ty + 7), tool, 14)
    rounded(d, (1542, 764, 2026, 944), "#121722", "#2f3647")
    draw_text(d, (1564, 786), "Health", 22, bold=True)
    draw_text(d, (1564, 834), "Missing sources: 0", 20)
    draw_text(d, (1564, 878), "Missing Evidence Map: 0", 20)
    draw_text(d, (1564, 922), f"Review queue: {len([p for p in list_pages()['pages'] if p['review_status'] == 'needs_review'])}", 20)

    out = ROOT / "submission" / "MVP.png"
    out.parent.mkdir(exist_ok=True)
    img.save(out)
    print(out)


if __name__ == "__main__":
    main()
