# PowerShell脚本来创建临时图标文件

# 基础PNG数据（1x1透明像素的Base64编码）
$base64PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77zgAAAABJRU5ErkJggg=="

# 确保icons目录存在
if (!(Test-Path "icons")) {
    New-Item -ItemType Directory -Path "icons"
}

# 图标尺寸列表
$sizes = @(16, 32, 72, 96, 128, 144, 152, 192, 384, 512)

# 为每个尺寸创建图标文件
foreach ($size in $sizes) {
    $fileName = "icons/icon-$size" + "x$size.png"
    $bytes = [System.Convert]::FromBase64String($base64PNG)
    [System.IO.File]::WriteAllBytes($fileName, $bytes)
    Write-Host "创建了 $fileName"
}

Write-Host "`n临时图标文件创建完成！"
Write-Host "注意：这些是最小的占位文件，请使用以下方法之一替换为真实图标："
Write-Host "1. 使用在线图标生成器: https://realfavicongenerator.net/"
Write-Host "2. 使用create-icons.html文件生成自定义图标"
Write-Host "3. 手动创建PNG图标文件"
