# 卡巴资料库

个人博客，基于 [Hexo](https://hexo.io/) + [NexT](https://theme-next.js.org/) 构建，通过 GitHub Pages 托管。

- **访问地址**：<https://yuanhuatan.github.io>

---

## 项目结构

| 目录/文件 | 说明 |
|-----------|------|
| `hexo/` | 博客源码：文章 Markdown、主题与配置，在本地编辑与生成 |
| `scripts/publish.sh` | 发布脚本（Git Bash）：生成静态站并同步到仓库根目录 |
| 仓库根目录 | 生成后的静态站点，由 GitHub Pages 直接提供访问 |

---

## 维护说明

在 `hexo/` 目录下写文章、改配置，生成后通过发布脚本将结果同步到根目录，再提交推送即可更新线上博客。

**简要步骤：**

1. 进入 `hexo` 目录，执行 `npm install`（仅首次需要）
2. 写文章：`npx hexo new "标题"` 或直接编辑 `hexo/source/_posts/*.md`
3. 本地预览：在 `hexo` 目录执行 `npx hexo server`，访问 http://localhost:4000
4. 发布：在**仓库根目录**执行 `bash scripts/publish.sh`，然后 `git add`、`commit`、`push`

详细说明见 **[hexo/使用说明.md](hexo/使用说明.md)**。

---

## 技术栈

- [Hexo](https://hexo.io/) 6.x
- 主题 [NexT](https://theme-next.js.org/)（Muse 方案）
- [GitHub Pages](https://pages.github.com/)
