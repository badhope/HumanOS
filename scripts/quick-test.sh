#!/bin/bash
# MindMirror快速功能测试脚本

echo "========================================"
echo "心镜 MindMirror - 快速功能测试"
echo "========================================"

BASE_URL="http://localhost:5173"

# 测试1: 首页加载
echo ""
echo "[测试1] 检查首页是否可访问..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL)
if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ 首页访问成功 (HTTP $HTTP_CODE)"
else
    echo "✗ 首页访问失败 (HTTP $HTTP_CODE)"
fi

# 测试2: 检查HTML内容
echo ""
echo "[测试2] 检查首页HTML内容..."
TITLE=$(curl -s $BASE_URL | grep -o '<title>[^<]*</title>' | head -1)
if [ -n "$TITLE" ]; then
    echo "✓ 找到页面标题: $TITLE"
else
    echo "⚠ 未找到页面标题"
fi

# 测试3: 检查关键资源
echo ""
echo "[测试3] 检查关键资源文件..."
for resource in "/pwa-512x512.png" "/vite.svg" "/index.css"; do
    RES_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$resource")
    if [ "$RES_CODE" = "200" ]; then
        echo "✓ $resource 可访问 (HTTP $RES_CODE)"
    else
        echo "✗ $resource 不可访问 (HTTP $RES_CODE)"
    fi
done

# 测试4: 检查JavaScript模块加载
echo ""
echo "[测试4] 检查主要JavaScript模块..."
JS_FILE=$(curl -s $BASE_URL | grep -o 'src="[^"]*\.js"' | head -1)
if [ -n "$JS_FILE" ]; then
    echo "✓ 找到JavaScript入口: $JS_FILE"
else
    echo "⚠ 未找到JavaScript入口"
fi

# 测试5: 检查页面元数据
echo ""
echo "[测试5] 检查页面元数据..."
DESCRIPTION=$(curl -s $BASE_URL | grep -o 'meta name="description" content="[^"]*"' | head -1)
if [ -n "$DESCRIPTION" ]; then
    echo "✓ 找到页面描述: $DESCRIPTION"
else
    echo "⚠ 未找到页面描述"
fi

THEME_COLOR=$(curl -s $BASE_URL | grep -o 'meta name="theme-color" content="[^"]*"' | head -1)
if [ -n "$THEME_COLOR" ]; then
    echo "✓ 找到主题色: $THEME_COLOR"
else
    echo "⚠ 未找到主题色"
fi

# 测试6: 检查Open Graph标签
echo ""
echo "[测试6] 检查Open Graph标签..."
OG_TYPE=$(curl -s $BASE_URL | grep -o 'property="og:type" content="[^"]*"' | head -1)
if [ -n "$OG_TYPE" ]; then
    echo "✓ 找到OG类型: $OG_TYPE"
else
    echo "⚠ 未找到OG类型"
fi

# 测试7: 检查关键JavaScript依赖
echo ""
echo "[测试7] 检查关键JavaScript依赖..."
VITE_CLIENT=$(curl -s "$BASE_URL/@vite/client" | head -5)
if [ -n "$VITE_CLIENT" ]; then
    echo "✓ Vite开发服务器运行正常"
else
    echo "✗ Vite开发服务器可能有问题"
fi

# 测试8: 检查PWA配置
echo ""
echo "[测试8] 检查PWA配置文件..."
for pwa_file in "/manifest.webmanifest" "/robots.txt" "/sitemap.xml"; do
    PWA_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$pwa_file")
    if [ "$PWA_CODE" = "200" ]; then
        echo "✓ $pwa_file 可访问 (HTTP $PWA_CODE)"
    else
        echo "✗ $pwa_file 不可访问 (HTTP $PWA_CODE)"
    fi
done

# 测试9: 响应时间测试
echo ""
echo "[测试9] 响应时间测试..."
START_TIME=$(date +%s%3N)
curl -s $BASE_URL > /dev/null
END_TIME=$(date +%s%3N)
RESPONSE_TIME=$((END_TIME - START_TIME))
echo "✓ 首页响应时间: ${RESPONSE_TIME}ms"

if [ $RESPONSE_TIME -lt 500 ]; then
    echo "✓ 响应时间优秀 (<500ms)"
elif [ $RESPONSE_TIME -lt 1000 ]; then
    echo "⚠ 响应时间一般 (500-1000ms)"
else
    echo "✗ 响应时间较慢 (>1000ms)"
fi

# 测试10: 检查API端点（如果有的话）
echo ""
echo "[测试10] 检查可能的API端点..."
for endpoint in "/api" "/api/health" "/api/status" "/health"; do
    API_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$endpoint")
    if [ "$API_CODE" != "404" ]; then
        echo "✓ $endpoint 响应: HTTP $API_CODE"
    fi
done

echo ""
echo "========================================"
echo "快速功能测试完成"
echo "========================================"
echo ""
echo "建议后续进行完整测试:"
echo "1. 使用Playwright进行UI自动化测试"
echo "2. 测试完整的用户流程（注册→测评→结果）"
echo "3. 测试响应式设计和移动端"
echo "4. 测试分享和导出功能"
echo ""
