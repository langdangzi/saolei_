@echo off
echo 扫雷游戏 - PWA 部署助手
echo ================================
echo.

:menu
echo 请选择要执行的操作：
echo 1. 安装依赖包
echo 2. 启动开发服务器
echo 3. 部署到 Netlify (拖拽)
echo 4. 部署到 Netlify (CLI)
echo 5. 部署到 Vercel
echo 6. 生成应用图标
echo 7. 打开部署向导
echo 8. 检查 PWA 配置
echo 9. 退出
echo.

set /p choice=请输入选项编号 (1-9): 

if "%choice%"=="1" goto install_deps
if "%choice%"=="2" goto start_dev
if "%choice%"=="3" goto deploy_netlify_drag
if "%choice%"=="4" goto deploy_netlify_cli
if "%choice%"=="5" goto deploy_vercel
if "%choice%"=="6" goto generate_icons
if "%choice%"=="7" goto open_guide
if "%choice%"=="8" goto check_pwa
if "%choice%"=="9" goto exit

echo 无效选项，请重新选择
goto menu

:install_deps
echo 安装项目依赖...
npm install
echo 依赖安装完成！
pause
goto menu

:start_dev
echo 启动开发服务器...
echo 服务器将在 http://localhost:3000 启动
start http://localhost:3000
npm run dev
pause
goto menu

:deploy_netlify_drag
echo 部署到 Netlify (拖拽方式)...
echo 1. 访问 https://app.netlify.com/drop
echo 2. 将整个项目文件夹拖拽到页面上
echo 3. 等待部署完成
start https://app.netlify.com/drop
pause
goto menu

:deploy_netlify_cli
echo 部署到 Netlify (命令行)...
echo 首先需要安装并登录 Netlify CLI
npm install -g netlify-cli
echo 请在浏览器中完成登录...
netlify login
netlify deploy --prod --dir .
pause
goto menu

:deploy_vercel
echo 部署到 Vercel...
echo 首先需要安装并登录 Vercel CLI
npm install -g vercel
vercel login
vercel --prod
pause
goto menu

:generate_icons
echo 生成应用图标...
echo 推荐使用以下在线工具：
echo 1. https://realfavicongenerator.net/
echo 2. https://www.pwabuilder.com/imageGenerator
echo 3. https://tools.crawlink.com/tools/pwa-asset-generator
start https://realfavicongenerator.net/
pause
goto menu

:open_guide
echo 打开部署向导...
start deploy-guide.html
pause
goto menu

:check_pwa
echo 检查 PWA 配置...
echo 检查以下文件是否存在：
if exist "manifest.json" (
    echo ✓ manifest.json 存在
) else (
    echo ✗ manifest.json 不存在
)

if exist "sw.js" (
    echo ✓ sw.js 存在
) else (
    echo ✗ sw.js 不存在
)

if exist "icon-192.png" (
    echo ✓ icon-192.png 存在
) else (
    echo ✗ icon-192.png 不存在
)

if exist "icon-512.png" (
    echo ✓ icon-512.png 存在
) else (
    echo ✗ icon-512.png 不存在
)

echo.
echo PWA 配置检查完成！
pause
goto menu

:exit
echo 感谢使用扫雷游戏 PWA 部署助手！
echo 部署完成后，用户可以通过以下方式安装：
echo - Android: Chrome浏览器 → 菜单 → 添加到主屏幕
echo - iOS: Safari → 分享 → 添加到主屏幕
pause
exit
