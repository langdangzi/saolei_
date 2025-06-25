#!/bin/bash

# 创建基本的PNG图标文件（Base64编码的最小PNG）
# 这是一个1x1透明像素的PNG文件

# 基础PNG数据（1x1透明像素）
BASE64_PNG="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77zgAAAABJRU5ErkJggg=="

# 创建icons目录（如果不存在）
mkdir -p icons

# 生成所有需要的图标尺寸
echo "$BASE64_PNG" | base64 -d > icons/icon-72x72.png
echo "$BASE64_PNG" | base64 -d > icons/icon-96x96.png
echo "$BASE64_PNG" | base64 -d > icons/icon-128x128.png
echo "$BASE64_PNG" | base64 -d > icons/icon-144x144.png
echo "$BASE64_PNG" | base64 -d > icons/icon-152x152.png
echo "$BASE64_PNG" | base64 -d > icons/icon-192x192.png
echo "$BASE64_PNG" | base64 -d > icons/icon-384x384.png
echo "$BASE64_PNG" | base64 -d > icons/icon-512x512.png
echo "$BASE64_PNG" | base64 -d > icons/icon-32x32.png
echo "$BASE64_PNG" | base64 -d > icons/icon-16x16.png

echo "临时图标文件已创建！"
echo "注意：这些是占位文件，请替换为真实的图标。"
