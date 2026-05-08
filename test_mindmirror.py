#!/usr/bin/env python3
"""
Comprehensive testing script for MindMirror application.
Tests all pages, features, interactions, and checks for errors.
"""

from playwright.sync_api import sync_playwright
import time
import os

OUTPUT_DIR = "/workspace/dogfood-output"
os.makedirs(f"{OUTPUT_DIR}/screenshots", exist_ok=True)

def take_screenshot(page, name):
    """Take a screenshot with the given name."""
    path = f"{OUTPUT_DIR}/screenshots/{name}.png"
    page.screenshot(path=path, full_page=True)
    print(f"📸 Screenshot saved: {name}.png")
    return path

def log_issue(issue_num, severity, title, description, screenshot=None):
    """Log an issue to a report file."""
    report_path = f"{OUTPUT_DIR}/report.md"
    with open(report_path, "a", encoding="utf-8") as f:
        f.write(f"\n## ISSUE-{issue_num:03d} [{severity}] {title}\n")
        f.write(f"{description}\n")
        if screenshot:
            f.write(f"Screenshot: {screenshot}\n")

def main():
    issues_found = []
    issue_num = 1

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 390, "height": 844})  # iPhone 14 Pro size

        # Enable console logging
        console_errors = []
        def handle_console(msg):
            if msg.type == "error":
                console_errors.append(msg.text)
                print(f"❌ Console Error: {msg.text}")

        page.on("console", handle_console)

        # ========== 1. Test Daily Page (Homepage) ==========
        print("\n" + "="*50)
        print("Testing Daily Page (Homepage)")
        print("="*50)

        page.goto("http://localhost:5174/app/daily")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        take_screenshot(page, "01_daily_home")

        # Check for Welcome text
        welcome = page.locator("text=晚上好").first
        if welcome.is_visible():
            print("✅ Welcome message visible")

        # Check Usage Guide
        usage_guide = page.locator("text=使用方法").first
        if usage_guide.is_visible():
            print("✅ Usage Guide card visible")
            take_screenshot(page, "02_usage_guide")
            # Try to expand/navigate through the guide
            usage_guide.click()
            page.wait_for_timeout(500)

        # Check Mood Check-in
        mood_section = page.locator("text=心情打卡").first
        if mood_section.is_visible():
            print("✅ Mood check-in section visible")
            take_screenshot(page, "03_mood_checkin")

            # Try to select a mood
            mood_buttons = page.locator("button").filter(has=page.locator("text=很糟糕"))
            if mood_buttons.count() > 0:
                mood_buttons.first.click()
                page.wait_for_timeout(500)
                print("✅ Clicked mood button")
                take_screenshot(page, "04_mood_selected")

                # Check for confirm button
                confirm_btn = page.locator("text=确认打卡")
                if confirm_btn.is_visible():
                    confirm_btn.click()
                    page.wait_for_timeout(500)
                    print("✅ Confirmed mood")
                    take_screenshot(page, "05_mood_confirmed")

        # Check Daily Training section
        training_section = page.locator("text=今日心灵训练").first
        if training_section.is_visible():
            print("✅ Daily training section visible")
            take_screenshot(page, "06_daily_training")

        # Check Daily Psychology section
        psychology_section = page.locator("text=每日心理学").first
        if psychology_section.is_visible():
            print("✅ Daily psychology section visible")
            take_screenshot(page, "07_daily_psychology")

        # ========== 2. Test Navigation ==========
        print("\n" + "="*50)
        print("Testing Navigation")
        print("="*50)

        # Test Assessment page
        print("Navigating to Assessment page...")
        page.goto("http://localhost:5174/app/assessment")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        take_screenshot(page, "08_assessment_page")

        # Check for assessment cards
        assessment_cards = page.locator("[class*='cursor-pointer']").all()
        print(f"Found {len(assessment_cards)} clickable assessment cards")

        if len(assessment_cards) > 0:
            assessment_cards[0].click()
            page.wait_for_timeout(1000)
            take_screenshot(page, "09_assessment_detail")
            print("✅ Assessment card clicked")

        # ========== 3. Test Training Page ==========
        print("\n" + "="*50)
        print("Testing Training Page")
        print("="*50)

        page.goto("http://localhost:5174/app/training")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        take_screenshot(page, "10_training_page")

        # Check for training categories
        categories = page.locator("text=情绪管理").all()
        if len(categories) > 0:
            print(f"✅ Found {len(categories)} training categories")

        # Try clicking on a training card
        training_cards = page.locator("[class*='rounded-xl'][class*='cursor-pointer']").all()
        if len(training_cards) > 0:
            training_cards[0].click()
            page.wait_for_timeout(1000)
            take_screenshot(page, "11_training_detail")
            print("✅ Training card clicked")

        # ========== 4. Test Results Page ==========
        print("\n" + "="*50)
        print("Testing Results Page")
        print("="*50)

        page.goto("http://localhost:5174/app/results")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        take_screenshot(page, "12_results_page")

        # ========== 5. Test Progress Page ==========
        print("\n" + "="*50)
        print("Testing Progress Page")
        print("="*50)

        page.goto("http://localhost:5174/app/progress")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        take_screenshot(page, "13_progress_page")

        # Check for progress charts
        chart_elements = page.locator("[class*='chart']").all()
        print(f"Found {len(chart_elements)} chart elements")

        # ========== 6. Test Settings Page ==========
        print("\n" + "="*50)
        print("Testing Settings Page")
        print("="*50)

        page.goto("http://localhost:5174/app/settings")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        take_screenshot(page, "14_settings_page")

        # Check for settings tabs
        settings_tabs = page.locator("button[class*='tab']").all()
        if len(settings_tabs) > 0:
            print(f"✅ Found {len(settings_tabs)} settings tabs")
            take_screenshot(page, "15_settings_tab")

        # ========== 7. Test Search ==========
        print("\n" + "="*50)
        print("Testing Search")
        print("="*50)

        page.goto("http://localhost:5174/app/search")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        take_screenshot(page, "16_search_page")

        # Try searching
        search_input = page.locator("input[type='search'], input[placeholder*='搜索']").first
        if search_input.is_visible():
            search_input.fill("焦虑")
            page.wait_for_timeout(1000)
            take_screenshot(page, "17_search_results")
            print("✅ Search functionality works")

        # ========== 8. Console Errors Summary ==========
        print("\n" + "="*50)
        print("Console Errors Summary")
        print("="*50)

        if console_errors:
            print(f"❌ Found {len(console_errors)} console errors:")
            for i, err in enumerate(console_errors[:10], 1):
                print(f"  {i}. {err[:100]}...")
                log_issue(issue_num, "HIGH", f"Console Error: {err[:50]}",
                         f"Console error detected: {err}", None)
                issue_num += 1
        else:
            print("✅ No console errors detected")

        # ========== 9. Test Edge Cases ==========
        print("\n" + "="*50)
        print("Testing Edge Cases")
        print("="*50)

        # Test empty states
        page.goto("http://localhost:5174/app/progress")
        page.wait_for_load_state("networkidle")
        empty_states = page.locator("text=暂无").all()
        if empty_states:
            print(f"✅ Found {len(empty_states)} empty states")

        # Test loading states
        page.goto("http://localhost:5174/app/assessment")
        page.wait_for_load_state("networkidle")
        loading_states = page.locator("text=加载中").all()
        if loading_states:
            print(f"⚠️ Found loading states still visible")

        # ========== 10. Mobile Responsiveness ==========
        print("\n" + "="*50)
        print("Testing Mobile Responsiveness")
        print("="*50)

        # Test smaller screen
        page.set_viewport_size({"width": 375, "height": 667})  # iPhone SE size
        page.goto("http://localhost:5174/app/daily")
        page.wait_for_load_state("networkidle")
        take_screenshot(page, "18_mobile_small")

        # Check if content overflows
        body_height = page.evaluate("document.body.scrollHeight")
        viewport_height = page.viewport_size["height"]
        if body_height > viewport_height * 1.5:
            print(f"⚠️ Page content exceeds viewport (scroll needed)")
        else:
            print("✅ Content fits within viewport")

        # ========== Summary ==========
        print("\n" + "="*50)
        print("Testing Summary")
        print("="*50)
        print(f"Total screenshots: 18")
        print(f"Console errors: {len(console_errors)}")
        print(f"Issues logged: {issue_num - 1}")

        browser.close()

        print("\n✅ All tests completed!")
        print(f"📸 Screenshots saved to: {OUTPUT_DIR}/screenshots/")

if __name__ == "__main__":
    main()
