from __future__ import annotations

import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REQUIRED = ["raw", "wiki", "schema", "tools", "viewer", "skills", "hooks", "demo"]


def main() -> int:
    missing = [name for name in REQUIRED if not (ROOT / name).exists()]
    if missing:
        print("PREFLIGHT FAIL: missing " + ", ".join(missing))
        return 1
    if not (ROOT / "demo" / "mvp.png").exists():
        print("PREFLIGHT FAIL: demo/mvp.png is missing")
        return 1
    print("PREFLIGHT OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
