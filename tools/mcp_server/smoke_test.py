from __future__ import annotations

import runpy
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]


if __name__ == "__main__":
    sys.path.insert(0, str(ROOT / "mcp_server"))
    runpy.run_path(str(ROOT / "mcp_server" / "smoke_test.py"), run_name="__main__")
