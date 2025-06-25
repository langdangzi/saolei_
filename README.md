# 扫雷游戏

一个现代化的扫雷游戏，支持多种难度等级，可以在浏览器中运行，也可以打包成移动应用。

## 功能特点

- 🎮 三种难度等级：简单(9x9)、中等(16x16)、困难(30x16)
- 🚩 支持右键标记地雷
- ⏱️ 计时功能
- 📱 响应式设计，支持移动设备
- 🔄 游戏重置功能
- 🎯 现代化UI设计
- 📲 PWA支持，可安装到桌面
- 🔄 离线游戏支持

## 如何运行

### 在浏览器中运行
1. 直接打开 `index.html` 文件
2. 或者使用本地服务器：
   ```bash
   npm install
   npm run dev
   ```

### 打包成移动应用

#### 方法一：使用 Apache Cordova

1. 安装 Cordova CLI：
   ```bash
   npm install -g cordova
   ```

2. 初始化 Cordova 项目：
   ```bash
   cordova create MinesweeperApp com.yourcompany.minesweeper "扫雷游戏"
   cd MinesweeperApp
   ```

3. 复制游戏文件到 `www` 目录

4. 添加平台：
   ```bash
   cordova platform add android
   cordova platform add ios
   ```

5. 构建应用：
   ```bash
   cordova build android
   cordova build ios
   ```

#### 方法二：使用 Capacitor

1. 安装 Capacitor：
   ```bash
   npm install @capacitor/core @capacitor/cli
   npm install @capacitor/android @capacitor/ios
   ```

2. 初始化 Capacitor：
   ```bash
   npx cap init "扫雷游戏" "com.yourcompany.minesweeper"
   ```

3. 添加平台：
   ```bash
   npx cap add android
   npx cap add ios
   ```

4. 构建和同步：
   ```bash
   npx cap copy
   npx cap sync
   ```

5. 在原生IDE中打开：
   ```bash
   npx cap open android
   npx cap open ios
   ```

#### 方法三：使用 PWA Builder

1. **第一步：部署您的网站**
   ```bash
   # 快速部署到 Netlify
   npm run deploy:netlify
   
   # 或使用拖拽部署
   # 访问 https://app.netlify.com/drop
   # 拖拽整个项目文件夹上传
   ```

2. **第二步：访问 PWABuilder**
   - 打开 [PWABuilder.com](https://www.pwabuilder.com)
   - 在首页输入您部署的网站 URL (例如：https://your-site.netlify.app)
   - 点击 "Start" 按钮

3. **第三步：PWA 分析**
   - PWABuilder 会自动分析您的网站
   - 检查 Manifest、Service Worker 等 PWA 要素
   - 显示 PWA 评分和建议改进项

4. **第四步：生成安装包**
   - 在分析完成后，点击 "Package For Stores"
   - 选择目标平台：
     - **Android**: 生成 APK 或 AAB 文件
     - **iOS**: 生成 Xcode 项目
     - **Windows**: 生成 MSIX 包
     - **macOS**: 生成 PKG 安装包

5. **第五步：下载和安装**
   - 下载生成的安装包
   - 按照平台说明进行安装或发布

## 游戏规则

1. 点击格子揭露内容
2. 数字表示周围地雷的数量
3. 右键点击标记可疑的地雷位置
4. 揭露所有非地雷格子即可获胜
5. 点击地雷则游戏失败

## 技术栈

- HTML5
- CSS3 (Grid, Flexbox, 渐变等)
- 原生 JavaScript (ES6+)
- Service Worker (PWA支持)
- Web App Manifest

## 文件结构

```
扫雷/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 游戏逻辑
├── manifest.json       # PWA配置
├── sw.js              # Service Worker
├── config.xml         # Cordova配置
├── package.json       # 项目配置
├── icons/             # 应用图标
└── README.md          # 说明文档
```

## 开发计划

- [ ] 添加音效
- [ ] 添加动画效果
- [ ] 自定义难度设置
- [ ] 游戏统计和排行榜
- [ ] 主题切换
- [ ] 多语言支持

## 许可证

MIT License
