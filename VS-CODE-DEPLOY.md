# 📱 VS Code 中部署扫雷游戏 PWA 完整指南

## 🚀 快速开始

### 方法 1: 使用 VS Code 命令面板

1. **按 `Ctrl+Shift+P` 打开命令面板**
2. **选择以下操作之一**：

   #### 启动开发服务器
   - 输入: `Tasks: Run Task`
   - 选择: `启动开发服务器`
   - 访问: http://localhost:3000

   #### 部署到 Netlify
   - 输入: `Tasks: Run Task`
   - 选择: `部署到 Netlify`

   #### 部署到 Vercel
   - 输入: `Tasks: Run Task`
   - 选择: `部署到 Vercel`

### 方法 2: 使用集成终端

1. **按 `Ctrl+`` 打开终端**
2. **运行以下命令**：

```bash
# 启动开发服务器
npm run dev

# 部署到 Netlify
npm run deploy:netlify

# 部署到 Vercel
npm run deploy:vercel
```

## 🎯 推荐部署流程

### 步骤 1: 测试本地运行

```bash
# 1. 安装依赖（如果还没有）
npm install

# 2. 启动开发服务器
npm run dev

# 3. 在浏览器中访问 http://localhost:3000
# 4. 测试游戏功能是否正常
```

### 步骤 2: 选择部署平台

#### 🥇 选项 A: Netlify（最简单）

**方法 A1: 拖拽部署**
1. 访问 [Netlify Drop](https://app.netlify.com/drop)
2. 将整个项目文件夹拖拽到页面
3. 等待部署完成
4. 获得 URL：`https://random-name-123456.netlify.app`

**方法 A2: CLI 部署**
```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 部署项目
netlify deploy --prod --dir .
```

#### 🥈 选项 B: Vercel

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel --prod
```

#### 🥉 选项 C: GitHub Pages

1. **推送到 GitHub**：
```bash
git init
git add .
git commit -m "初始提交：扫雷PWA"
git branch -M main
git remote add origin https://github.com/yourusername/minesweeper-pwa.git
git push -u origin main
```

2. **启用 GitHub Pages**：
   - 进入仓库设置
   - 找到 Pages 部分
   - 选择 main 分支
   - 获得 URL：`https://yourusername.github.io/minesweeper-pwa`

### 步骤 3: 测试 PWA 功能

部署完成后：

1. **在手机上测试**：
   - 用 Chrome（Android）或 Safari（iOS）访问部署的 URL
   - 查看是否出现"添加到主屏幕"提示
   - 安装并测试离线功能

2. **在桌面上测试**：
   - 用 Chrome 访问 URL
   - 地址栏会显示安装图标
   - 安装后可以像桌面应用一样使用

## 🛠️ VS Code 扩展推荐

以下扩展已为您的项目推荐：

- **Netlify**: 直接在 VS Code 中管理 Netlify 部署
- **Live Server**: 本地开发服务器
- **JSON**: JSON 文件语法高亮和验证

## 📂 项目文件说明

您的项目现在包含以下关键文件：

```
扫雷/
├── .vscode/
│   ├── tasks.json          # VS Code 任务配置
│   ├── launch.json         # 调试配置
│   ├── settings.json       # 工作区设置
│   └── extensions.json     # 推荐扩展
├── icons/                  # PWA 图标目录
├── index.html             # 游戏主页面
├── style.css              # 样式文件
├── script.js              # 游戏逻辑
├── manifest.json          # PWA 清单
├── sw.js                  # Service Worker
├── netlify.toml           # Netlify 配置
├── vercel.json            # Vercel 配置
├── package.json           # 项目配置
├── build-app.bat          # Windows 部署助手
└── deploy-guide.html      # 部署向导页面
```

## 🔧 常见问题解决

### 问题 1: Service Worker 无法注册
**解决方案**: 确保项目运行在 HTTPS 环境下（部署到支持 HTTPS 的平台）

### 问题 2: 图标显示不正确
**解决方案**: 
1. 检查 `icons/` 目录中是否有所需尺寸的图标
2. 使用 [RealFaviconGenerator](https://realfavicongenerator.net/) 生成完整图标集

### 问题 3: PWA 安装提示不显示
**检查清单**:
- ✅ 必须是 HTTPS 连接
- ✅ 必须有 `manifest.json`
- ✅ 必须有 Service Worker (`sw.js`)
- ✅ 必须有图标文件
- ✅ 必须满足 PWA 最低要求

### 问题 4: 部署后页面无法访问
**解决方案**: 
1. 检查部署平台的构建日志
2. 确认所有文件都已正确上传
3. 检查 CORS 设置

## 📊 部署平台对比

| 平台 | 部署难度 | 免费额度 | 自定义域名 | HTTPS | 构建时间 |
|------|----------|----------|------------|-------|----------|
| Netlify | ⭐⭐⭐⭐⭐ | 100GB/月 | ✅ | ✅ | 快 |
| Vercel | ⭐⭐⭐⭐ | 100GB/月 | ✅ | ✅ | 很快 |
| GitHub Pages | ⭐⭐⭐ | 1GB | ✅ | ✅ | 中等 |

## 🎉 成功部署后

用户可以通过以下方式安装您的 PWA：

### Android 用户
1. 在 Chrome 中访问您的网址
2. 点击地址栏中的"安装"图标
3. 或通过菜单选择"添加到主屏幕"

### iOS 用户
1. 在 Safari 中访问您的网址
2. 点击分享按钮
3. 选择"添加到主屏幕"

### 桌面用户
1. 在 Chrome 中访问您的网址
2. 点击地址栏中的安装图标
3. 或通过菜单选择"安装扫雷游戏"

恭喜！您现在有了一个可以像原生应用一样安装和使用的扫雷游戏！🎮
