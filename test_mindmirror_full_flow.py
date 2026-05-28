from playwright.sync_api import sync_playwright
import sys
import time

def test_complete_flow():
    """
    完整测试MindMirror心理测评平台的完整流程
    包括：首页 → 测评列表 → 开始测评 → 答题 → 提交 → 查看结果 → 分享导出
    """
    print("=" * 80)
    print("开始全面测试 MindMirror 心理测评平台")
    print("=" * 80)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1280, 'height': 720},
            locale='zh-CN'
        )
        page = context.new_page()

        # 捕获控制台日志
        console_messages = []
        page.on("console", lambda msg: console_messages.append(f"[{msg.type}] {msg.text}"))
        page.on("pageerror", lambda err: console_messages.append(f"[PAGE ERROR] {err}"))

        try:
            # ========================================
            # 测试1: 首页加载
            # ========================================
            print("\n[测试1] 首页加载...")
            page.goto('http://localhost:5173')
            page.wait_for_load_state('networkidle')
            time.sleep(2)  # 等待动画完成

            # 截图保存
            page.screenshot(path='/tmp/01_homepage.png', full_page=True)
            print("✓ 首页截图已保存到 /tmp/01_homepage.png")

            # 检查页面元素
            title = page.title()
            print(f"✓ 页面标题: {title}")

            # 查找主要导航元素
            buttons = page.locator('button').all()
            print(f"✓ 页面按钮数量: {len(buttons)}")

            # ========================================
            # 测试2: 导航到测评列表
            # ========================================
            print("\n[测试2] 导航到测评列表...")

            # 尝试点击测评相关按钮
            assessment_buttons = page.locator('text=/测评|评估|开始/').all()
            if assessment_buttons:
                print(f"✓ 找到 {len(assessment_buttons)} 个测评相关按钮")
                # 点击第一个看起来像进入测评列表的按钮
                for btn in assessment_buttons[:3]:
                    try:
                        btn_text = btn.inner_text()
                        print(f"  - 按钮: {btn_text}")
                    except:
                        pass
            else:
                print("⚠ 未找到明确的测评按钮，尝试查找导航链接...")

            # 截图
            page.screenshot(path='/tmp/02_assessment_list.png', full_page=True)
            print("✓ 测评列表截图已保存")

            # ========================================
            # 测试3: 进入一个测评
            # ========================================
            print("\n[测试3] 进入一个测评...")

            # 查找测评卡片
            assessment_cards = page.locator('[class*="card"], [class*="assessment"]').all()
            print(f"✓ 找到 {len(assessment_cards)} 个测评卡片")

            if assessment_cards:
                # 点击第一个测评卡片
                first_card = assessment_cards[0]
                try:
                    first_card.click()
                    print("✓ 点击了第一个测评卡片")
                    page.wait_for_load_state('networkidle')
                    time.sleep(1)

                    # 截图
                    page.screenshot(path='/tmp/03_assessment_intro.png', full_page=True)
                    print("✓ 测评介绍页截图已保存")

                    # ========================================
                    # 测试4: 开始测评
                    # ========================================
                    print("\n[测试4] 开始测评...")

                    # 查找开始按钮
                    start_button = page.locator('button:has-text("开始"), button:has-text("开始测评")').first
                    if start_button:
                        start_button.click()
                        print("✓ 点击了开始按钮")
                        page.wait_for_load_state('networkidle')
                        time.sleep(1)

                        # 截图
                        page.screenshot(path='/tmp/04_start_assessment.png', full_page=True)
                        print("✓ 测评进行中截图已保存")

                        # ========================================
                        # 测试5: 回答问题
                        # ========================================
                        print("\n[测试5] 回答问题...")

                        # 回答3-5个问题
                        for i in range(5):
                            # 查找问题选项
                            options = page.locator('[class*="option"], button[class*="option"], [role="button"]').all()

                            if options and len(options) > 0:
                                # 随机选择一个选项
                                selected_option = options[i % len(options)]
                                try:
                                    selected_option.click()
                                    print(f"✓ 回答了第 {i+1} 个问题")
                                    time.sleep(0.5)
                                except Exception as e:
                                    print(f"⚠ 选择选项失败: {e}")
                                    break

                            # 截图当前进度
                            if (i + 1) % 2 == 0:
                                page.screenshot(path=f'/tmp/05_question_{i+1}.png', full_page=True)

                            # 查找下一个按钮
                            next_button = page.locator('button:has-text("下一"), button:has-text("继续")').first
                            if next_button:
                                try:
                                    next_button.click()
                                    time.sleep(0.5)
                                except:
                                    pass
                            else:
                                print("⚠ 未找到下一题按钮")
                                break
                    else:
                        print("⚠ 未找到开始按钮")

                except Exception as e:
                    print(f"⚠ 进入测评失败: {e}")

            # ========================================
            # 测试6: 查看结果页面
            # ========================================
            print("\n[测试6] 查看结果页面...")

            # 查找提交或完成按钮
            submit_button = page.locator('button:has-text("提交"), button:has-text("完成"), button:has-text("查看结果")').first
            if submit_button:
                try:
                    submit_button.click()
                    print("✓ 点击了提交/完成按钮")
                    page.wait_for_load_state('networkidle')
                    time.sleep(2)

                    # 截图
                    page.screenshot(path='/tmp/06_results.png', full_page=True)
                    print("✓ 结果页面截图已保存")

                except Exception as e:
                    print(f"⚠ 提交失败: {e}")

            # ========================================
            # 测试7: 分享和导出功能
            # ========================================
            print("\n[测试7] 测试分享和导出功能...")

            # 查找分享按钮
            share_buttons = page.locator('button:has-text("分享"), button:has-text("导出"), button:has-text("下载")').all()
            print(f"✓ 找到 {len(share_buttons)} 个分享/导出相关按钮")

            for btn in share_buttons[:2]:  # 测试前两个按钮
                try:
                    btn_text = btn.inner_text()
                    print(f"  - 点击: {btn_text}")
                    btn.click()
                    time.sleep(1)
                    page.screenshot(path=f'/tmp/07_share_{btn_text}.png', full_page=True)
                    print(f"✓ 分享/导出截图已保存")
                except Exception as e:
                    print(f"⚠ 点击失败: {e}")

            # ========================================
            # 测试8: 返回导航测试
            # ========================================
            print("\n[测试8] 测试返回导航...")

            # 尝试返回
            back_buttons = page.locator('button:has-text("返回"), button:has-text("上一步"), [aria-label="返回"], [aria-label="back"]').all()
            if back_buttons:
                try:
                    back_buttons[0].click()
                    print("✓ 点击了返回按钮")
                    time.sleep(1)
                    page.screenshot(path='/tmp/08_back.png', full_page=True)
                except Exception as e:
                    print(f"⚠ 返回失败: {e}")
            else:
                print("⚠ 未找到返回按钮")

            # ========================================
            # 测试9: 设置页面测试
            # ========================================
            print("\n[测试9] 测试设置页面...")

            # 导航到设置
            page.goto('http://localhost:5173/settings')
            page.wait_for_load_state('networkidle')
            time.sleep(1)

            page.screenshot(path='/tmp/09_settings.png', full_page=True)
            print("✓ 设置页面截图已保存")

            # ========================================
            # 测试10: 测评列表页面
            # ========================================
            print("\n[测试10] 测试测评列表页面...")

            # 导航到测评列表
            page.goto('http://localhost:5173/assessments')
            page.wait_for_load_state('networkidle')
            time.sleep(1)

            page.screenshot(path='/tmp/10_assessments.png', full_page=True)
            print("✓ 测评列表截图已保存")

            # ========================================
            # 控制台日志分析
            # ========================================
            print("\n" + "=" * 80)
            print("控制台日志分析:")
            print("=" * 80)

            error_count = 0
            warning_count = 0
            for msg in console_messages:
                if '[PAGE ERROR]' in msg:
                    print(f"❌ {msg}")
                    error_count += 1
                elif '[error]' in msg.lower():
                    print(f"⚠ {msg}")
                    warning_count += 1

            if error_count == 0 and warning_count == 0:
                print("✓ 未发现错误或警告")
            else:
                print(f"\n总结: 发现 {error_count} 个错误, {warning_count} 个警告")

            print("\n" + "=" * 80)
            print("测试完成！所有截图已保存到 /tmp/ 目录")
            print("=" * 80)

        except Exception as e:
            print(f"\n❌ 测试过程中发生错误: {e}")
            import traceback
            traceback.print_exc()
            page.screenshot(path='/tmp/error_screenshot.png', full_page=True)
            print("✓ 错误截图已保存到 /tmp/error_screenshot.png")

        finally:
            browser.close()

if __name__ == "__main__":
    test_complete_flow()
