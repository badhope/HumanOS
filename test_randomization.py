#!/usr/bin/env python3
"""
Test script for the smart randomization system.
"""

from playwright.sync_api import sync_playwright
import time
import os

OUTPUT_DIR = "/workspace/dogfood-output"
os.makedirs(f"{OUTPUT_DIR}/screenshots", exist_ok=True)

def take_screenshot(page, name):
    path = f"{OUTPUT_DIR}/screenshots/{name}.png"
    page.screenshot(path=path, full_page=True)
    print(f"📸 Screenshot: {name}.png")
    return path

def main():
    print("\n" + "="*60)
    print("🧪 智能随机出题系统测试")
    print("="*60)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 390, "height": 844})
        
        console_errors = []
        def handle_console(msg):
            if msg.type == "error" and "Network" not in msg.text:
                console_errors.append(msg.text)
        page.on("console", handle_console)
        
        # ========== 测试1: 同一测评两次进入 ==========
        print("\n📌 测试1: 同一测评随机化...")
        
        # 第1次进入
        page.goto("http://localhost:5174/legacy/assessment/mbti")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        
        # 获取题目
        q1_run1 = ""
        for h in page.locator("h2").all():
            if h.is_visible():
                text = h.inner_text()
                if "？" in text:
                    q1_run1 = text
                    break
        
        print(f"  第1次第1题: {q1_run1[:30]}...")
        
        # 获取选项顺序
        opts1 = []
        for btn in page.locator("button").all():
            if btn.is_visible():
                text = btn.inner_text()
                if any(k in text for k in ["非常", "有些", "经常", "从不"]) and len(text) < 15:
                    opts1.append(text)
                    if len(opts1) >= 4:
                        break
        print(f"  选项顺序: {' | '.join(opts1[:4])}")
        
        # 检查种子 (在answer draft里)
        draft1 = page.evaluate("localStorage.getItem('assessment-answers-draft-mbti-normal')")
        seed1 = None
        if draft1:
            import json
            draft_data = json.loads(draft1)
            seed1 = draft_data.get("randomizationSeed")
        print(f"  种子: {seed1 if seed1 else '未答题，暂无'}")
        
        take_screenshot(page, "test_same_assessment_run1")
        
        # 返回首页
        page.goto("http://localhost:5174/app/daily")
        page.wait_for_timeout(500)
        
        # 第2次进入同一测评
        page.goto("http://localhost:5174/legacy/assessment/mbti")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        
        q1_run2 = ""
        for h in page.locator("h2").all():
            if h.is_visible():
                text = h.inner_text()
                if "？" in text:
                    q1_run2 = text
                    break
        
        print(f"\n  第2次第1题: {q1_run2[:30]}...")
        
        opts2 = []
        for btn in page.locator("button").all():
            if btn.is_visible():
                text = btn.inner_text()
                if any(k in text for k in ["非常", "有些", "经常", "从不"]) and len(text) < 15:
                    opts2.append(text)
                    if len(opts2) >= 4:
                        break
        print(f"  选项顺序: {' | '.join(opts2[:4])}")
        
        take_screenshot(page, "test_same_assessment_run2")
        
        # ========== 测试2: 不同测评 ==========
        print("\n📌 测试2: 不同测评(应完全不同)...")
        
        page.goto("http://localhost:5174/legacy/assessment/bigfive")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        
        q1_bigfive = ""
        for h in page.locator("h2").all():
            if h.is_visible():
                text = h.inner_text()
                if "？" in text:
                    q1_bigfive = text
                    break
        
        print(f"  BigFive第1题: {q1_bigfive[:30]}...")
        
        take_screenshot(page, "test_different_assessment")
        
        # ========== 结果分析 ==========
        print("\n" + "="*60)
        print("📊 测试结果")
        print("="*60)
        
        q_different = q1_run1 != q1_run2
        o_different = opts1 != opts2
        
        print(f"\n✅ 验证结果:")
        print(f"  同一测评题目顺序不同: {'✅ 是' if q_different else '❌ 否'}")
        print(f"  同一测评选项顺序不同: {'✅ 是' if o_different else '❌ 否'}")
        print(f"  不同测评完全不同: {'✅ 是' if q1_run2 != q1_bigfive else '❌ 否'}")
        print(f"  控制台错误: {len(console_errors)}")
        
        print(f"\n📝 说明:")
        print(f"  由于种子恢复机制，同一测评恢复相同顺序。")
        print(f"  但由于初始化时机，第1题可能不同。")
        print(f"\n  真正的随机化测试需要清除localStorage。")
        
        # 清除并重新测试
        print("\n📌 测试3: 清除缓存后重新进入...")
        
        page.evaluate("localStorage.clear()")
        page.goto("http://localhost:5174/legacy/assessment/mbti")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        
        q1_after_clear = ""
        for h in page.locator("h2").all():
            if h.is_visible():
                text = h.inner_text()
                if "？" in text:
                    q1_after_clear = text
                    break
        
        print(f"  清除后第1题: {q1_after_clear[:30]}...")
        
        # 获取新种子
        draft2 = page.evaluate("localStorage.getItem('assessment-answers-draft-mbti-normal')")
        seed2 = None
        if draft2:
            import json
            draft_data = json.loads(draft2)
            seed2 = draft_data.get("randomizationSeed")
        print(f"  新种子: {seed2}")
        
        print(f"\n  再次清除后进入...")
        page.evaluate("localStorage.clear()")
        page.goto("http://localhost:5174/legacy/assessment/mbti")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        
        q1_after_clear2 = ""
        for h in page.locator("h2").all():
            if h.is_visible():
                text = h.inner_text()
                if "？" in text:
                    q1_after_clear2 = text
                    break
        
        print(f"  第2次清除后第1题: {q1_after_clear2[:30]}...")
        
        # 获取新种子
        draft3 = page.evaluate("localStorage.getItem('assessment-answers-draft-mbti-normal')")
        seed3 = None
        if draft3:
            import json
            draft_data = json.loads(draft3)
            seed3 = draft_data.get("randomizationSeed")
        print(f"  种子2: {seed3}")
        
        print(f"\n  两次清除后的题目相同(恢复): {'✅ 是' if q1_after_clear == q1_after_clear2 else '❌ 否'}")
        print(f"  两次清除后的种子相同: {'✅ 是' if seed2 == seed3 else '❌ 否'}")
        
        # 保存报告
        report = f"""# 智能随机出题系统测试报告

**测试时间**: {time.strftime('%Y-%m-%d %H:%M:%S')}

## 测试结果

| 测试项 | 结果 |
|--------|------|
| 题目随机化 | {'✅' if q_different else '❌'} |
| 选项随机化 | {'✅' if o_different else '❌'} |
| 不同测评区分 | {'✅' if q1_run2 != q1_bigfive else '❌'} |
| 种子存储 | {'✅' if seed2 else '❌'} |
| 种子恢复一致 | {'✅' if seed2 == seed3 else '❌'} |

## 结论

{'✅ 智能随机出题系统工作正常!' if q_different and seed2 else '⚠️ 部分功能可能存在问题'}

### 功能说明:
1. **随机化**: 每次进入测评会随机打乱题目和选项
2. **种子存储**: 种子保存在答题草稿中
3. **恢复机制**: 同一测评会恢复相同的题目顺序(中断保护)
"""
        
        with open(f"{OUTPUT_DIR}/randomization_test_report.md", "w") as f:
            f.write(report)
        
        print(f"\n📄 报告已保存: {OUTPUT_DIR}/randomization_test_report.md")
        browser.close()
        print("\n✅ 测试完成!")

if __name__ == "__main__":
    main()
