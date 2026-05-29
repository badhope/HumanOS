#!/bin/bash

# SBTI 趣味人格测试自动化脚本

echo "========================================="
echo "SBTI 趣味人格测试自动化"
echo "========================================="
echo ""

# 函数：处理一道题
process_question() {
    local question_num=$1
    
    echo "处理第${question_num}题..."
    
    # 获取当前页面的快照
    local snapshot_output=$(agent-browser snapshot -i 2>&1)
    
    # 等待页面稳定
    agent-browser wait 300 > /dev/null 2>&1
    
    # 从快照中提取refs
    # 选项A通常是 ref=e5
    # "下一题"或"提交"按钮通常是 ref=e22
    
    # 点击选项A
    if echo "$snapshot_output" | grep -q "选项 A"; then
        agent-browser click @e5 > /dev/null 2>&1
        echo "  ✓ 已选择选项 A"
    else
        echo "  ✗ 警告：未找到选项 A"
    fi
    
    # 短暂等待
    agent-browser wait 200 > /dev/null 2>&1
    
    # 判断是点击"下一题"还是"提交"
    if echo "$snapshot_output" | grep -q "提交"; then
        echo "  → 点击提交按钮"
        agent-browser click @e22 > /dev/null 2>&1
    else
        echo "  → 点击下一题按钮"
        agent-browser click @e22 > /dev/null 2>&1
    fi
    
    # 等待页面更新
    agent-browser wait 500 > /dev/null 2>&1
    
    # 每5题显示一次进度
    if [ $((question_num % 5)) -eq 0 ]; then
        echo "  进度：${question_num}/24"
    fi
    
    return 0
}

# 第1题已经在之前完成了，现在处理第2-23题
for i in {2..23}; do
    process_question $i
done

# 处理第24题（最后一道）
echo ""
echo "处理第24题（最后一道）..."
agent-browser snapshot -i > /dev/null 2>&1
agent-browser wait 300 > /dev/null 2>&1
agent-browser click @e5 > /dev/null 2>&1
echo "  ✓ 已选择选项 A"
agent-browser wait 200 > /dev/null 2>&1
echo "  → 点击提交按钮（最终提交）"
agent-browser click @e22 > /dev/null 2>&1

# 等待结果页面加载
echo ""
echo "等待结果页面加载..."
agent-browser wait --load networkidle
agent-browser wait 2000

# 获取结果页面快照
echo ""
echo "========================================="
echo "所有24道题已完成！"
echo "正在获取结果页面..."
echo "========================================="
agent-browser snapshot -i

echo ""
echo "测试完成！"
