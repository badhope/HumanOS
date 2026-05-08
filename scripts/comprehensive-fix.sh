#!/bin/bash

echo "========================================="
echo "  MindMirror 全面配置修复脚本"
echo "========================================="

# 1. 确保所有配置文件在正确位置
echo ""
echo "[1/5] 检查配置文件..."

# 检查 Vite 配置
if [ ! -f "vite.config.ts" ]; then
    echo "  - 复制 vite.config.ts 到根目录"
    cp configs/vite.config.ts vite.config.ts
fi

# 检查 PostCSS 配置
if [ ! -f "postcss.config.js" ]; then
    echo "  - 复制 postcss.config.js 到根目录"
    cp configs/postcss.config.js postcss.config.js
fi

# 检查 Tailwind 配置
if [ ! -f "tailwind.config.js" ]; then
    echo "  - 复制 tailwind.config.js 到根目录"
    cp configs/tailwind.config.js tailwind.config.js
fi

# 检查 ESLint 配置
if [ ! -f "eslint.config.js" ]; then
    echo "  - 复制 eslint.config.js 到根目录"
    cp configs/eslint.config.js eslint.config.js
fi

# 2. 清理缓存
echo ""
echo "[2/5] 清理缓存..."
rm -rf dist node_modules/.vite .vite

# 3. 重新安装依赖
echo ""
echo "[3/5] 重新安装依赖..."
npm install

# 4. 运行构建测试
echo ""
echo "[4/5] 运行构建测试..."
npm run build

# 5. 总结
echo ""
echo "========================================="
echo "  修复完成！"
echo "========================================="
echo ""
echo "运行以下命令启动开发服务器："
echo "  npm run dev"
echo ""
echo "或预览生产版本："
echo "  npm run preview"
