from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "mcp_server"))

from wiki_core import create_wiki_draft  # noqa: E402


def main() -> int:
    parser = argparse.ArgumentParser(description="Create a review-needed Wiki draft from one raw Markdown source.")
    parser.add_argument("raw_path", help="Path inside raw/, for example raw/inbox/my-note.md")
    parser.add_argument("--title", default="", help="Optional Wiki page title")
    parser.add_argument("--type", default="concept", help="Wiki page type")
    parser.add_argument("--write", action="store_true", help="Write the draft to wiki/drafts/. Without this, dry-run preview is returned.")
    args = parser.parse_args()
    result = create_wiki_draft(args.raw_path, title=args.title, page_type=args.type, dry_run=not args.write)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result.get("created") or result.get("dry_run") else 1


if __name__ == "__main__":
    raise SystemExit(main())
