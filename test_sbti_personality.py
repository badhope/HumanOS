
from playwright.sync_api import sync_playwright
import time

def test_sbti_personality():
    """
    完成 SBTI 人格测试的完整流程
    共24道题，每次选择第一个选项（Option A）
    """
    print("=" * 80)
    print("开始 SBTI 人格测试")
    print("=" * 80)

    with sync_playwright() as p:
        # 使用无头模式
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1280, 'height': 720},
            locale='zh-CN'
        )
        page = context.new_page()

        try:
            # 1. 打开测试页面 - 这已经是答题页面了！
            print("\n[步骤 1] 打开 SBTI 测试答题页面...")
            page.goto('http://localhost:5174/assessment/sbti-personality/start')
            page.wait_for_load_state('networkidle')
            time.sleep(2)  # 等待页面完全加载
            page.screenshot(path='/tmp/sbti_01_start.png', full_page=True)
            print("✓ 开始答题页面截图已保存")

            # 2. 回答24道问题
            for question_num in range(1, 25):
                print(f"\n[步骤 2] 回答第 {question_num} 题...")
                
                # 截图当前问题
                page.screenshot(path=f'/tmp/sbti_02_question_{question_num:02d}.png', full_page=True)
                
                # 查找并点击第一个选项（Option A）
                # 使用精确的选择器查找选项
                try:
                    # 查找所有 role="option" 的元素，点击第一个
                    options = page.locator('[role="option"]')
                    if options.count() > 0:
                        options.first.click()
                        print(f"✓ 点击了第一个选项")
                        time.sleep(0.5)
                except Exception as e:
                    print(f"⚠ 尝试失败，使用备用选择器: {e}")
                    # 备用方案：查找所有按钮并尝试选择第一个
                    try:
                        all_buttons = page.locator('button').all()
                        for btn in all_buttons:
                            # 点击看起来像选项的按钮
                            btn.click()
                            print(f"✓ 点击了选项按钮")
                            time.sleep(0.5)
                            break
                    except Exception as e2:
                        print(f"⚠ 所有方法都失败: {e2}")
                
                # 检查是否是最后一题（第24题）
                if question_num < 24:
                    # 不是最后一题，点击"下一题"
                    try:
                        next_button = page.locator('button:has-text("下一题"), button:has-text("下一")').first
                        if next_button:
                            next_button.click()
                            print(f"✓ 点击了下一题按钮")
                            page.wait_for_load_state('networkidle')
                            time.sleep(0.5)
                    except Exception as e:
                        print(f"⚠ 点击下一题失败: {e}")
                else:
                    # 最后一题，点击"提交"
                    print(f"\n[步骤 3] 最后一题，点击提交...")
                    try:
                        submit_button = page.locator('button:has-text("提交")').first
                        if submit_button:
                            submit_button.click()
                            print(f"✓ 点击了提交按钮")
                            page.wait_for_load_state('networkidle')
                            time.sleep(3)
                    except Exception as e:
                        print(f"⚠ 点击提交失败: {e}")
            
            # 3. 查看结果页面
            print("\n[步骤 4] 查看结果页面...")
            time.sleep(3)
            page.screenshot(path='/tmp/sbti_03_result.png', full_page=True)
            print("✓ 结果页面截图已保存")
            
            # 获取并打印页面内容
            print("\n" + "=" * 80)
            print("结果页面内容:")
            print("=" * 80)
            
            try:
                body_text = page.locator('body').inner_text()
                print(body_text)
            except Exception as e:
                print(f"获取页面文本失败: {e}")
                page_content = page.content()
                print(page_content[:5000])
            
            print("\n" + "=" * 80)
            print("测试完成！")
            print("=" * 80)
            print("\n所有截图已保存到 /tmp 目录：")
            print("  - 开始答题页面: /tmp/sbti_01_start.png")
            for i in range(1, 25):
                print(f"  - 第 {i} 题: /tmp/sbti_02_question_{i:02d}.png")
            print("  - 结果页面: /tmp/sbti_03_result.png")

        except Exception as e:
            print(f"\n❌ 测试过程中发生错误: {e}")
            import traceback
            traceback.print_exc()
            try:
                page.screenshot(path='/tmp/sbti_error.png', full_page=True)
                print("✓ 错误截图已保存到 /tmp/sbti_error.png")
            except:
                pass

        finally:
            browser.close()

if __name__ == "__main__":
    test_sbti_personality()

