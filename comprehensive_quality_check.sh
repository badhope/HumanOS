#!/bin/bash
# 综合代码质量检查脚本

echo "=========================================="
echo "心镜 MindMirror - 代码质量全面检查"
echo "=========================================="
echo ""

# 1. TypeScript 类型检查
echo "1️⃣ 运行 TypeScript 类型检查..."
npx tsc --noEmit --pretty
TSC_EXIT=$?
echo ""

# 2. ESLint 代码质量检查
echo "2️⃣ 运行 ESLint 代码检查..."
npx eslint src --ext .ts,.tsx --max-warnings=0
ESLINT_EXIT=$?
echo ""

# 3. 构建测试
echo "3️⃣ 运行构建测试..."
npm run build 2>&1 | tail -20
BUILD_EXIT=${PIPESTATUS[0]}
echo ""

# 输出总结
echo "=========================================="
echo "检查结果汇总"
echo "=========================================="
if [ $TSC_EXIT -eq 0 ]; then
    echo "✅ TypeScript 类型检查: 通过"
else
    echo "❌ TypeScript 类型检查: 失败 (退出码: $TSC_EXIT)"
fi

if [ $ESLINT_EXIT -eq 0 ]; then
    echo "✅ ESLint 代码检查: 通过"
else
    echo "❌ ESLint 代码检查: 失败 (退出码: $ESLINT_EXIT)"
fi

if [ $BUILD_EXIT -eq 0 ]; then
    echo "✅ 构建测试: 通过"
else
    echo "❌ 构建测试: 失败 (退出码: $BUILD_EXIT)"
fi

echo ""

# 如果所有检查都通过
if [ $TSC_EXIT -eq 0 ] && [ $ESLINT_EXIT -eq 0 ] && [ $BUILD_EXIT -eq 0 ]; then
    echo "🎉 所有检查都通过了！代码质量优秀！"
    exit 0
else
    echo "⚠️  部分检查未通过，请查看上方详细信息"
    exit 1
fi
