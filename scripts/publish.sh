#!/usr/bin/env bash
# 在仓库根目录用 Git Bash 执行：bash scripts/publish.sh
# 会先执行 hexo generate，再把 hexo/public 下的内容复制到仓库根目录。

set -e
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HEXO_DIR="$REPO_ROOT/hexo"
PUBLIC_DIR="$HEXO_DIR/public"

cd "$REPO_ROOT"
echo "Running: hexo generate ..."
(cd "$HEXO_DIR" && npx hexo generate)

if [ ! -d "$PUBLIC_DIR" ]; then
  echo "Error: hexo/public 不存在，请先在 hexo 目录执行 npm install" >&2
  exit 1
fi

echo "Copying hexo/public to repo root ..."
cp -r "$PUBLIC_DIR"/. "$REPO_ROOT/"

echo "Done. Commit and push to publish to GitHub Pages."
