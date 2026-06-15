from __future__ import annotations

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "mcp_server"))

from wiki_core import quality_report  # noqa: E402


def main() -> int:
    report = quality_report()
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report["status"] == "pass" and report["blocking_issue_count"] == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
