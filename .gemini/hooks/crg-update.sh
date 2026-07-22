#!/usr/bin/env bash
# code-review-graph: incremental update after write/replace (Gemini CLI hook)
# Must output ONLY JSON on stdout. Low-noise: no systemMessage.
set -euo pipefail

cat > /dev/null || true

code-review-graph update --skip-flows --repo "C:/Users/jisungb/Desktop/SNU/동아리/unit.ie/06. 학술부 로드맵 제작 사업/route-snu-ie" >/dev/null 2>&1 || true
echo '{"suppressOutput": true}'
exit 0
