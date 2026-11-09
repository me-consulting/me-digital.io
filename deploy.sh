#!/usr/bin/env bash
# Deploy the built Angular app to GitHub Pages (develop /docs).
# Safe against losing docs/CNAME / 404.html / .nojekyll: we recreate the
# static files every run instead of deleting the whole docs/ dir.
set -euo pipefail
cd "$(dirname "$0")"

OUT=dist/it-consultant/browser
DEST=docs

echo ">> building"
pnpm build >/dev/null

echo ">> deploying to $DEST/ (clean, so stale chunks don't linger)"
rm -rf "$DEST"
mkdir -p "$DEST"
cp -r "$OUT"/. "$DEST"/

# static pages files (not in the build output — recreated each run so they survive)
echo "me-digital.io" > "$DEST/CNAME"
cp "$DEST/index.html" "$DEST/404.html"   # SPA fallback
touch "$DEST/.nojekyll"

echo ">> done. commit + push to develop:/docs"
git add -A
git commit -m "deploy: pages build $(date -u +%Y-%m-%dT%H:%M:%SZ)" || true

# push via the live VS Code git socket (shell socket is stale in this devcontainer)
LIVE=""
for s in /tmp/vscode-git-*.sock; do
  if python3 -c "import socket,sys
s=socket.socket(socket.AF_UNIX); s.settimeout(1.5)
try:
    s.connect('$s'); sys.exit(0)
except Exception:
    sys.exit(1)" 2>/dev/null; then
    LIVE="$s"; break
  fi
done
export VSCODE_GIT_IPC_HANDLE="${LIVE:-/dev/null}"
git pull --rebase origin develop
git push origin develop
echo ">> pushed develop. GitHub Pages re-publishes in ~1-2 min."
