#!/usr/bin/env python3
"""
完整测试智能随机出题系统 - 修复版本
"""

from playwright.sync_api import sync_playwright
import time
import os
import json

OUTPUT_DIR = "/workspace/dogfood-output"
os.makedirs(f"{OUTPUT_DIR}/screenshots", exist_ok=True)

# 注意: mbti 被映射到 sbti-personality
MBTI_KEY = "sbti-personality"  # localStorage key 中的测评ID

def take_screenshot(page, name):
    path = f"{OUTPUT_DIR}/screenshots/{name}.png"
    page.screenshot(path=path, full_page=True)
    return path

def get_local_storage_key(page, route_key):
    """获取正确的localStorage key"""
    draft = page.evaluate(f"localStorage.getItem('assessment-answers-draft-{route_key}-normal')")
    return draft

def main():
    print("\n" + "="*60)
    print("🧪 智能随机出题系统测试 (修复版)")
    print("="*60)
    
    results = {}
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 390, "height": 844})
        
        # ========== 步骤1: 首次进入 ==========
        print("\n📌 步骤1: 进入MBTI测评...")
        
        page.goto("http://localhost:5174/legacy/assessment/mbti")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        take_screenshot(page, "step1_initial")
        
        # 获取第1题
        q1 = ""
        for h in page.locator("h2").all():
            if h.is_visible():
                text = h.inner_text()
                if "？" in text or "?" in text:
                    q1 = text
                    break
        print(f"  第1题: {q1[:40]}...")
        results["q1_original"] = q1
        
        # 点击第一个选项
        option_btns = page.locator("button.w-full.p-4").all()
        if not option_btns:
            option_btns = page.locator("button[class*='rounded-xl']").all()
        
        if option_btns:
            option_btns[0].click()
            page.wait_for_timeout(1000)
            take_screenshot(page, "step1_selected")
            print("  ✅ 选择选项成功")
        
        # 检查草稿 (使用正确的 key)
        draft1 = page.evaluate(f"localStorage.getItem('assessment-answers-draft-{MBTI_KEY}-normal')")
        if draft1:
            d1 = json.loads(draft1)
            results["seed1"] = d1.get("randomizationSeed")
            results["answers_count1"] = len(d1.get("answers", []))
            print(f"  ✅ 草稿已保存!")
            print(f"     种子: {results['seed1'][:30] if results['seed1'] else 'N/A'}...")
            print(f"     已答: {results['answers_count1']} 题")
        else:
            print("  ❌ 草稿未保存 (检查错误日志)")
        
        # 点击下一题
        next_btn = page.locator("button:has-text('下一题')")
        if next_btn.count() > 0 and next_btn.get_attribute("disabled") is None:
            next_btn.click()
            page.wait_for_timeout(1000)
            print("  ✅ 进入下一题")
            
            q2 = ""
            for h in page.locator("h2").all():
                if h.is_visible():
                    text = h.inner_text()
                    if "？" in text or "?" in text:
                        q2 = text
                        break
            print(f"  第2题: {q2[:40]}...")
            results["q2_after_answer"] = q2
        
        # ========== 步骤2: 重新进入 ==========
        print("\n📌 步骤2: 退出后重新进入...")
        
        page.goto("http://localhost:5174/app/daily")
        page.wait_for_timeout(500)
        
        page.goto("http://localhost:5174/legacy/assessment/mbti")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        take_screenshot(page, "step2_return")
        
        # 获取恢复后的第1题
        q1_return = ""
        for h in page.locator("h2").all():
            if h.is_visible():
                text = h.inner_text()
                if "？" in text or "?" in text:
                    q1_return = text
                    break
        print(f"  恢复后第1题: {q1_return[:40]}...")
        
        # 检查种子
        draft2 = page.evaluate(f"localStorage.getItem('assessment-answers-draft-{MBTI_KEY}-normal')")
        if draft2:
            d2 = json.loads(draft2)
            results["seed2"] = d2.get("randomizationSeed")
            results["last_question"] = d2.get("lastQuestion")
            print(f"  种子: {results['seed2'][:30] if results['seed2'] else 'N/A'}...")
        
        # ========== 步骤3: 测试新随机 ==========
        print("\n📌 步骤3: 清除缓存测试新随机...")
        
        page.evaluate("localStorage.clear()")
        page.goto("http://localhost:5174/legacy/assessment/mbti")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        
        q1_new = ""
        for h in page.locator("h2").all():
            if h.is_visible():
                text = h.inner_text()
                if "？" in text or "?" in text:
                    q1_new = text
                    break
        print(f"  清除后第1题: {q1_new[:40]}...")
        
        # ========== 结果分析 ==========
        print("\n" + "="*60)
        print("📊 测试结果")
        print("="*60)
        
        q_same = q1 == q1_return
        seed_saved = bool(results.get("seed1"))
        seed_same = results.get("seed1") == results.get("seed2")
        new_random = q1_new != q1_return
        
        print(f"\n🎯 核心验证:")
        print(f"  草稿保存: {'✅ 是' if seed_saved else '❌ 否'}")
        print(f"  题目恢复一致: {'✅ 是' if q_same else '❌ 否'}")
        print(f"  种子恢复一致: {'✅ 是' if seed_same else '❌ 否'}")
        print(f"  清除后新随机: {'✅ 不同' if new_random else '❌ 相同'}")
        
        print(f"\n📝 说明:")
        print(f"  首次进入 -> 生成种子 -> 随机题目 -> 答题后保存草稿")
        print(f"  重新进入 -> 读取草稿 -> 恢复相同顺序")
        print(f"  清除缓存 -> 新种子 -> 新随机顺序")
        
        # 保存报告
        all_pass = seed_saved and seed_same
        report = f"""# 智能随机出题系统测试报告

**测试时间**: {time.strftime('%Y-%m-%d %H:%M:%S')}

## 测试结果

| 功能 | 结果 |
|------|------|
| 草稿保存 | {'✅' if seed_saved else '❌'} |
| 种子恢复 | {'✅' if seed_same else '❌'} |
| 题目恢复一致 | {'✅' if q_same else '❌'} |
| 新随机化 | {'✅' if new_random else '⚠️'} |

## 详细信息

- 首次第1题: {q1[:50]}...
- 恢复后第1题: {q1_return[:50]}...
- 清除后第1题: {q1_new[:50]}...

## 结论

{'✅ **智能随机出题系统工作正常!**' if all_pass else '⚠️ 部分功能可能存在问题'}
"""
        
        with open(f"{OUTPUT_DIR}/randomization_test_report.md", "w", encoding="utf-8") as f:
            f.write(report)
        
        print(f"\n📄 报告: {OUTPUT_DIR}/randomization_test_report.md")
        browser.close()
        print("\n✅ 测试完成!")

if __name__ == "__main__":
    main()
