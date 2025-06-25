const fs = require('fs');
const path = require('path');

// 创建一个简单的PNG文件头（1x1像素，透明）
function createSimplePNG(width, height) {
  // 这是一个非常基础的PNG生成，实际项目中应该使用专业的图像库
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // 背景渐变
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // 地雷图标
  const centerX = width / 2;
  const centerY = height / 2;
  const mineSize = width * 0.2;
  
  // 地雷主体
  ctx.fillStyle = '#2c3e50';
  ctx.beginPath();
  ctx.arc(centerX, centerY, mineSize, 0, 2 * Math.PI);
  ctx.fill();
  
  // 地雷突起
  const spikes = 8;
  ctx.strokeStyle = '#2c3e50';
  ctx.lineWidth = width * 0.02;
  for (let i = 0; i < spikes; i++) {
    const angle = (i * 2 * Math.PI) / spikes;
    const startX = centerX + Math.cos(angle) * mineSize;
    const startY = centerY + Math.sin(angle) * mineSize;
    const endX = centerX + Math.cos(angle) * mineSize * 1.4;
    const endY = centerY + Math.sin(angle) * mineSize * 1.4;
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
  
  // 高光
  ctx.fillStyle = '#ecf0f1';
  ctx.beginPath();
  ctx.arc(centerX - mineSize * 0.3, centerY - mineSize * 0.3, mineSize * 0.2, 0, 2 * Math.PI);
  ctx.fill();
  
  return canvas.toBuffer('image/png');
}

// 生成所需尺寸的图标
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

sizes.forEach(size => {
  try {
    const buffer = createSimplePNG(size, size);
    fs.writeFileSync(path.join(__dirname, 'icons', `icon-${size}x${size}.png`), buffer);
    console.log(`生成图标: icon-${size}x${size}.png`);
  } catch (error) {
    console.log(`无法生成 ${size}x${size} 图标，需要安装 canvas 库`);
  }
});

console.log('图标生成完成！');
console.log('注意：如果看到错误，请运行: npm install canvas');
