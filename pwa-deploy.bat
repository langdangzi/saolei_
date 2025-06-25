@echo off
echo 🚀 扫雷游戏 - PWABuilder 一键部署
echo ========================================
echo.

:menu
echo 选择部署方式：
echo.
echo 1. 🌐 打开 Netlify 拖拽部署页面
echo 2. 📦 打开 PWABuilder 官网
echo 3. 📋 查看详细部署指南
echo 4. 🎮 本地预览游戏
echo 5. 📊 查看 PWABuilder 演示
echo 6. 🔄 检查项目文件
echo 7. 📱 生成应用图标
echo 8. ❌ 退出
echo.

set /p choice=请输入选项编号 (1-8): 

if "%choice%"=="1" goto netlify_deploy
if "%choice%"=="2" goto pwabuilder
if "%choice%"=="3" goto guide
if "%choice%"=="4" goto preview
if "%choice%"=="5" goto demo
if "%choice%"=="6" goto check_files
if "%choice%"=="7" goto generate_icons
if "%choice%"=="8" goto exit

echo 无效选项，请重新选择
goto menu

:netlify_deploy
echo 🌐 打开 Netlify 拖拽部署页面...
echo.
echo 📋 部署步骤：
echo 1. 将在浏览器中打开 Netlify Drop 页面
echo 2. 将整个项目文件夹拖拽到页面上
echo 3. 等待上传完成
echo 4. 复制得到的 URL（例如：https://amazing-game-123456.netlify.app）
echo 5. 保存这个 URL，后面会用到
echo.
start https://app.netlify.com/drop
pause
goto menu

:pwabuilder
echo 📦 打开 PWABuilder 官网...
echo.
echo 📋 使用步骤：
echo 1. 在首页输入您刚才部署得到的 URL
echo 2. 点击 "Start" 按钮进行分析
echo 3. 等待 PWA 分析完成
echo 4. 点击 "Package For Stores" 生成安装包
echo 5. 选择目标平台（Android、iOS、Windows、macOS）
echo 6. 下载生成的安装包文件
echo.
start https://www.pwabuilder.com
pause
goto menu

:guide
echo 📋 打开详细部署指南...
start PWA-BUILDER-GUIDE.md
pause
goto menu

:preview
echo 🎮 启动本地预览...
echo 游戏将在 http://localhost:3000 启动
start http://localhost:3000
npm run dev
pause
goto menu

:demo
echo 📊 打开 PWABuilder 演示页面...
start http://localhost:3000/pwa-demo.html
pause
goto menu

:check_files
echo 🔄 检查项目文件...
echo.
echo 📂 必需的 PWA 文件：
if exist "manifest.json" (
    echo ✅ manifest.json - PWA 清单文件
) else (
    echo ❌ manifest.json - 缺失
)

if exist "sw.js" (
    echo ✅ sw.js - Service Worker
) else (
    echo ❌ sw.js - 缺失
)

if exist "index.html" (
    echo ✅ index.html - 主页面
) else (
    echo ❌ index.html - 缺失
)

if exist "style.css" (
    echo ✅ style.css - 样式文件
) else (
    echo ❌ style.css - 缺失
)

if exist "script.js" (
    echo ✅ script.js - 游戏逻辑
) else (
    echo ❌ script.js - 缺失
)

echo.
echo 📁 图标文件检查：
if exist "icons\" (
    echo ✅ icons 目录存在
    dir /b icons\*.png 2>nul | findstr "." >nul && (
        echo ✅ 发现 PNG 图标文件
    ) || (
        echo ⚠️  icons 目录为空，建议添加图标文件
    )
) else (
    echo ⚠️  icons 目录不存在
)

echo.
echo 📋 建议：
echo - 如果缺少图标，使用选项 7 生成
echo - 确保所有核心文件都存在
echo - 部署前先用选项 4 本地测试
echo.
pause
goto menu

:generate_icons
echo 📱 生成应用图标...
echo.
echo 🎨 推荐的图标生成方法：
echo.
echo 1. 在线工具（推荐）：
echo    - RealFaviconGenerator: https://realfavicongenerator.net/
echo    - PWA Asset Generator: https://tools.crawlink.com/tools/pwa-asset-generator
echo.
echo 2. 需要的图标尺寸：
echo    - 72x72, 96x96, 128x128, 144x144
echo    - 152x152, 192x192, 384x384, 512x512
echo.
echo 3. 图标要求：
echo    - PNG 格式
echo    - 正方形
echo    - 清晰的游戏主题设计
echo.
echo 📂 将在浏览器中打开图标生成工具...
start https://realfavicongenerator.net/
pause
goto menu

:exit
echo.
echo 🎉 PWABuilder 快速部署流程总结：
echo.
echo 第一步：部署网站
echo ├─ 使用 Netlify 拖拽上传项目文件夹
echo └─ 获得部署 URL
echo.
echo 第二步：生成安装包
echo ├─ 在 PWABuilder 输入部署 URL
echo ├─ 等待 PWA 分析完成
echo ├─ 选择目标平台生成安装包
echo └─ 下载安装包文件
echo.
echo 第三步：测试使用
echo ├─ Android: 安装 APK 文件
echo ├─ Windows: 安装 MSIX 文件
echo └─ iOS: 使用 Xcode 编译项目
echo.
echo 💡 提示：整个流程大约需要 30-60 分钟
echo 📱 生成的应用可以像原生应用一样安装和使用！
echo.
echo 感谢使用扫雷游戏 PWA 部署助手！
pause
exit
