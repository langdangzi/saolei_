#!/bin/bash

# 扫雷游戏启动脚本

echo "🎮 扫雷游戏启动器"
echo "=================="
echo

# 检查是否安装了Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未检测到Node.js，请先安装Node.js"
    echo "   下载地址: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 已安装: $(node --version)"

# 检查是否安装了依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装项目依赖..."
    npm install
fi

echo "🚀 启动开发服务器..."
echo "   服务器将在 http://localhost:3000 启动"
echo "   按 Ctrl+C 停止服务器"
echo

# 启动服务器
npm run dev
