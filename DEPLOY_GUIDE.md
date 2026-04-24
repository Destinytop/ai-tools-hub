# 🚀 部署指南

## 快速部署（推荐）

### 方式一：Vercel Dashboard（最简单）

1. **Fork/创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 仓库名: `ai-tools-hub`
   - 设置为 Public
   - 创建仓库

2. **推送代码到 GitHub**
   ```bash
   # 在项目目录中运行
   git remote add origin https://github.com/Destinytop/ai-tools-hub.git
   git branch -M main
   git push -u origin main
   ```

3. **一键部署到 Vercel**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Destinytop/ai-tools-hub)

   或者手动:
   - 访问 https://vercel.com/new
   - 导入 `ai-tools-hub` 仓库
   - Framework: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - 点击 Deploy

### 方式二：Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署
vercel --prod
```

---

## ⚙️ 配置说明

项目已包含 `vercel.json` 配置文件，会自动设置：
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `dist`
- 自动 Git 集成

---

## 🔧 手动配置（如果自动失败）

### GitHub 设置
1. 创建 Personal Access Token: https://github.com/settings/tokens
2. 权限选择: `repo` (完整仓库访问)

### Vercel 设置
1. 导入项目时选择正确的 Framework: **Next.js**
2. **重要**: 修改 Output Directory 为 `dist`
3. 环境变量（可选）: 不需要设置

---

## ✅ 部署后检查

部署完成后，访问您的域名，检查：
- [ ] 首页正常显示
- [ ] Sora Prompt Generator 可用
- [ ] DeepSeek-V4 Calculator 可用
- [ ] LLMs.txt Generator 可用

---

## 🆘 常见问题

### Q: 推送代码到 GitHub 失败？
A: 使用 Token 认证：
```bash
git remote set-url origin https://Destinytop:YOUR_TOKEN@github.com/Destinytop/ai-tools-hub.git
```

### Q: Vercel 部署失败？
A: 检查：
1. Output Directory 是否为 `dist`
2. Build Command 是否为 `npm run build`
3. 查看 Vercel 的 Build Logs

### Q: 页面显示 404？
A: 检查 `next.config.js` 中的 `trailingSlash: true` 设置

---

## 📞 需要帮助？

- Vercel 文档: https://vercel.com/docs
- Next.js 部署: https://nextjs.org/docs/deployment
