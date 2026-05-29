#!/bin/bash

echo "开始 SBTI 趣味人格测试自动化..."

# 完成第1题
echo "完成第1题..."
agent-browser click @e5 && agent-browser click @e22 && agent-browser wait 500

# 完成第2-23题
for i in {2..23}; do
    echo "正在处理第${i}题..."
    
    # 获取当前页面的快照
    agent-browser snapshot -i > /tmp/snapshot_$i.txt
    
    # 等待页面稳定
    agent-browser wait 300
    
    # 点击选项A (ref=e5)
    agent-browser click @e5 > /dev/null 2>&1
    
    # 点击"下一题"按钮 (ref=e22)
    agent-browser click @e22 > /dev/null 2>&1
    
    # 等待页面更新
    agent-browser wait 500
    
    # 每5题显示一次进度
    if [ $((i % 5)) -eq 0 ]; then
        echo "已完成 $i 道题，进度：$i/24"
    fi
done

echo "完成第24题（最后一道）..."

# 处理第24题
agent-browser snapshot -i > /tmp/snapshot_24.txt
agent-browser wait 300

# 点击选项A
agent-browser click @e5 > /dev/null 2>&1

# 第24题点击"提交"按钮而不是"下一题"
echo "第24题：点击提交按钮"
agent-browser click @e22 > /dev/null 2>&1

# 等待结果页面加载
echo "等待结果页面加载..."
agent-browser wait --load networkidle
agent-browser wait 2000

# 获取结果页面快照
echo "获取结果页面快照..."
agent-browser snapshot -i

echo "========================================="
echo "所有24道题已完成！"
echo "========================================="
