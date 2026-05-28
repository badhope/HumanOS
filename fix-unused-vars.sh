#!/bin/bash

# 修复未使用的导入
echo "🔧 开始修复未使用的导入和变量..."

# App.tsx - 移除未使用的 lazy
sed -i 's/import { lazy, Suspense } from/import { Suspense } from/' /workspace/src/App.tsx

# DiscoverCard.tsx - 移除未使用的 color 参数
sed -i 's/function DiscoverCard({ className, color }/function DiscoverCard({ className, }/' /workspace/src/components/DiscoverCard.tsx

# ParticleBackground.tsx - 移除未使用的 Connection
sed -i "s/import { useEffect, useMemo, useRef, type FC, type Connection }/import { useEffect, useMemo, useRef, type FC }/" /workspace/src/components/ParticleBackground.tsx

echo "✅ 修复完成"
