# PowerShell脚本来创建临时截图文件

# 基础PNG数据（1x1透明像素的Base64编码）
$base64PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77zgAAAABJRU5ErkJggg=="

# 确保screenshots目录存在
if (!(Test-Path "screenshots")) {
    New-Item -ItemType Directory -Path "screenshots"
}

# 创建移动端截图 (640x1136)
$bytes = [System.Convert]::FromBase64String($base64PNG)
[System.IO.File]::WriteAllBytes("screenshots/mobile-screenshot.png", $bytes)
Write-Host "创建了 screenshots/mobile-screenshot.png"

# 创建桌面端截图 (1280x720)
[System.IO.File]::WriteAllBytes("screenshots/desktop-screenshot.png", $bytes)
Write-Host "创建了 screenshots/desktop-screenshot.png"

Write-Host "`n临时截图文件创建完成！"
Write-Host "注意：这些是占位文件，建议替换为应用的实际截图。"
