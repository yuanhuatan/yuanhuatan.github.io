/**
 * 生成密码对应的 SHA-256 哈希，用于填到 hexo/_config.yml 的 password_hash。
 * 用法（在仓库根目录执行）：node scripts/generate-pass-hash.js 你的密码
 * 若当前在 scripts 目录：node generate-pass-hash.js 你的密码
 */
const crypto = require('crypto');
const pass = process.argv[2];
if (!pass) {
  console.error('用法：在仓库根目录执行 node scripts/generate-pass-hash.js 你的密码');
  process.exit(1);
}
const hash = crypto.createHash('sha256').update(pass, 'utf8').digest('hex');
console.log('将下面这行填到 hexo/_config.yml 的 password_hash，并设置 password_protect: true');
console.log(hash);
