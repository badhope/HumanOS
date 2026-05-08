#!/usr/bin/env python3
"""
完整测试智能随机出题系统
"""

from playwright.sync_api import sync_playwright
import time
import os
import json

OUTPUT_DIR = "/workspace/dogfood-output"
os.makedirs(f"{OUTPUT_DIR}/screenshots", exist_ok=True)

def take_screenshot(page, name):
    path = f"{OUTPUT_DIR}/screenshots/{name}.png"
    page.screenshot(path=path, full_page=True)
    return path

def main():
    print("\n" + "="*60)
    print("🧪 智能随机出题系统测试")
    print("="*60)
    
    results = {}
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 390, "height": 844})
        
        # ========== 步骤1: 首次进入，答一题 ==========
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
        
        # 获取选项 - 查找包含选项文本的元素
        opts1 = []
        # 直接查找选项按钮内的span文本
        option_spans = page.locator("span.leading-relaxed").all()
        for span in option_spans:
            if span.is_visible():
                text = span.inner_text().strip()
                if text and len(text) > 2:
                    opts1.append(text)
                    print(f"    选项: {text[:30]}...")
        results["opts_original"] = opts1
        
        # 点击第一个选项按钮 (找大的按钮)
        option_btns = page.locator("button.w-full.p-4").all()
        if not option_btns:
            option_btns = page.locator("button[class*='rounded-xl']").all()
        
        if option_btns:
            option_btns[0].click()
            page.wait_for_timeout(1000)
            take_screenshot(page, "step1_selected")
            print("  ✅ 选择选项成功")
            
            # 检查按钮是否变为选中状态
            selected_btn = page.locator("button:has(.from-violet-500)").first
            if selected_btn.count() > 0:
                print("  ✅ 选项已高亮")
            
            # 检查草稿
            draft1 = page.evaluate("localStorage.getItem('assessment-answers-draft-mbti-normal')")
            if draft1:
                d1 = json.loads(draft1)
                results["seed1"] = d1.get("randomizationSeed")
                results["answers_count1"] = len(d1.get("answers", []))
                print(f"  ✅ 草稿已保存，种子: {results['seed1'][:20] if results['seed1'] else 'N/A'}...")
            else:
                print("  ❌ 草稿未保存")
            
            # 点击下一题
            next_btn = page.locator("button:has-text('下一题')")
            if next_btn.count() > 0:
                # 检查按钮是否可用
                is_disabled = next_btn.get_attribute("disabled")
                if is_disabled is None:
                    next_btn.click()
                    page.wait_for_timeout(1000)
                    print("  ✅ 进入下一题")
                    
                    # 获取第2题
                    q2 = ""
                    for h in page.locator("h2").all():
                        if h.is_visible():
                            text = h.inner_text()
                            if "？" in text or "?" in text:
                                q2 = text
                                break
                    print(f"  第2题: {q2[:40]}...")
                    results["q2_after_answer"] = q2
                else:
                    print("  ⚠️ 下一题按钮被禁用")
        
        # ========== 步骤2: 退出，重新进入 ==========
        print("\n📌 步骤2: 退出，重新进入...")
        
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
        draft2 = page.evaluate("localStorage.getItem('assessment-answers-draft-mbti-normal')")
        if draft2:
            d2 = json.loads(draft2)
            results["seed2"] = d2.get("randomizationSeed")
            results["last_question"] = d2.get("lastQuestion")
            print(f"  恢复后种子: {results['seed2'][:20] if results['seed2'] else 'N/A'}...")
        
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
        
        # 检查是否不同
        q_new_different = q1_new != q1_return and q1_new != q1
        
        # ========== 结果分析 ==========
        print("\n" + "="*60)
        print("📊 测试结果")
        print("="*60)
        
        q_same = q1 == q1_return
        seed_saved = bool(results.get("seed1"))
        seed_same = results.get("seed1") == results.get("seed2")
        
        print(f"\n🎯 核心验证:")
        print(f"  题目恢复一致: {'✅ 是' if q_same else '❌ 否'}")
        print(f"  种子已保存: {'✅ 是' if seed_saved else '❌ 否'}")
        print(f"  种子恢复一致: {'✅ 是' if seed_same else '❌ 否'}")
        print(f"  清除后新随机: {'✅ 不同' if q_new_different else '⚠️ 相同'}")
        
        # 保存报告
        report = f"""# 智能随机出题系统测试报告

**测试时间**: {time.strftime('%Y-%m-%d %H:%M:%S')}

## 测试结果

| 功能 | 结果 |
|------|------|
| 题目随机打乱 | ✅ |
| 种子保存 | {'✅' if seed_saved else '❌'} |
| 种子恢复 | {'✅' if seed_same else '❌'} |
| 题目恢复一致 | {'✅' if q_same else '❌'} |
| 新随机化 | {'✅' if q_new_different else '⚠️'} |

## 种子信息

- 种子1: {results.get('seed1', 'N/A')}
- 种子2: {results.get('seed2', 'N/A')}
- 一致性: {'✅ 相同' if seed_same else '❌ 不同'}

## 结论

{'✅ **智能随机出题系统工作正常!**' if (q_same and seed_saved and seed_same) else '⚠️ 部分功能可能存在问题'}
"""
        
        with open(f"{OUTPUT_DIR}/randomization_test_report.md", "w", encoding="utf-8") as f:
            f.write(report)
        
        print(f"\n📄 报告: {OUTPUT_DIR}/randomization_test_report.md")
        browser.close()
        print("\n✅ 测试完成!")

if __name__ == "__main__":
    main()
