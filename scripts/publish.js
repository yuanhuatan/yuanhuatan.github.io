/**
 * 在仓库根目录执行：node scripts/publish.js
 * 会先执行 hexo generate，再把 hexo/public 下的内容复制到仓库根目录，用于 GitHub Pages 访问。
 */
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const hexoDir = path.join(repoRoot, 'hexo');
const publicDir = path.join(hexoDir, 'public');

// 1. 在 hexo 目录执行生成
console.log('Running: hexo generate ...');
execSync('npx hexo generate', { cwd: hexoDir, stdio: 'inherit' });

if (!fs.existsSync(publicDir)) {
  console.error('hexo/public 不存在，请先在 hexo 目录执行 npm install');
  process.exit(1);
}

// 2. 将 public 内容复制到仓库根目录（不覆盖 hexo 目录）
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

console.log('Copying hexo/public to repo root ...');
for (const name of fs.readdirSync(publicDir)) {
  const src = path.join(publicDir, name);
  const dest = path.join(repoRoot, name);
  copyRecursive(src, dest);
}

console.log('Done. Commit and push to publish to GitHub Pages.');
