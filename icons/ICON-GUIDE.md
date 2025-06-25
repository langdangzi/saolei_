# PWA 图标生成指南

## 快速生成图标的方法

### 方法 1: 在线工具（推荐）

1. **访问 [RealFaviconGenerator](https://realfavicongenerator.net/)**
   - 上传一个 512x512 的源图标
   - 自动生成所有需要的尺寸
   - 下载图标包并解压到 `icons` 目录

2. **访问 [PWA Builder](https://www.pwabuilder.com/imageGenerator)**
   - 专门为 PWA 生成图标
   - 支持多种格式和尺寸

### 方法 2: 使用 VS Code 扩展

搜索并安装以下扩展：
- `PWA Tools`
- `Icon Fonts`

### 方法 3: 手动创建

如果您有图像编辑软件，创建以下尺寸的 PNG 图标：

```
icons/
├── icon-72x72.png
├── icon-96x96.png
├── icon-128x128.png
├── icon-144x144.png
├── icon-152x152.png
├── icon-192x192.png
├── icon-384x384.png
└── icon-512x512.png
```

### 临时解决方案

如果您想快速测试 PWA 功能，可以：

1. 从网上下载任意的游戏图标
2. 使用在线图片调整工具调整尺寸
3. 重命名为所需的文件名

## 图标设计建议

- **尺寸**: 512x512 像素作为源文件
- **格式**: PNG (支持透明背景)
- **内容**: 简洁的游戏相关图标
- **颜色**: 与游戏主题一致
- **风格**: 现代扁平化设计

## 示例图标元素

可以包含：
- 🎮 游戏手柄
- 💣 地雷符号
- 🚩 旗帜
- 🔢 数字
- ⭐ 星星等游戏元素
