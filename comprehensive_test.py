#!/usr/bin/env python3
"""
全面测试心镜 MindMirror Web应用
测试所有主要功能和页面，捕获错误和异常
"""

from playwright.sync_api import sync_playwright
import time
import json
from datetime import datetime

def log(message, level="INFO"):
    """统一日志输出"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] [{level}] {message}")

def capture_console_logs(page, log_list):
    """捕获控制台日志"""
    def handle_console(msg):
        log_entry = {
            'type': msg.type,
            'text': msg.text,
            'location': msg.location
        }
        log_list.append(log_entry)
        
        if msg.type in ['error', 'warning']:
            log(f"控制台 {msg.type}: {msg.text}", "WARN")

    page.on('console', handle_console)

def test_homepage(page):
    """测试首页"""
    log("=== 测试首页 ===")
    try:
        page.goto('http://localhost:5174/home', wait_until='networkidle')
        page.wait_for_timeout(2000)
        
        # 检查主要元素
        title = page.title()
        log(f"页面标题: {title}")
        
        # 截图
        page.screenshot(path='/tmp/test_homepage.png', full_page=True)
        log("首页截图已保存")
        
        # 检查导航元素
        nav_buttons = page.locator('button').filter(has_text=['首页', '测评中心', '训练中心', '我的进度'])
        count = nav_buttons.count()
        log(f"导航按钮数量: {count}")
        
        return True
    except Exception as e:
        log(f"首页测试失败: {str(e)}", "ERROR")
        page.screenshot(path='/tmp/error_homepage.png')
        return False

def test_assessments_page(page):
    """测试测评列表页"""
    log("=== 测试测评列表页 ===")
    try:
        page.goto('http://localhost:5174/assessments', wait_until='networkidle')
        page.wait_for_timeout(2000)
        
        page.screenshot(path='/tmp/test_assessments.png', full_page=True)
        log("测评列表页截图已保存")
        
        # 查找测评卡片
        assessment_cards = page.locator('button').filter(has_text='测试')
        count = assessment_cards.count()
        log(f"测评卡片数量: {count}")
        
        # 测试筛选功能
        category_buttons = page.locator('button').filter(has_text=['人格', '关系', '心理', '职业'])
        for btn in category_buttons.all()[:3]:
            btn.click()
            page.wait_for_timeout(1000)
            log(f"点击分类: {btn.inner_text()}")
        
        return True
    except Exception as e:
        log(f"测评列表页测试失败: {str(e)}", "ERROR")
        page.screenshot(path='/tmp/error_assessments.png')
        return False

def test_sbti_assessment(page):
    """测试SBTI测评完整流程"""
    log("=== 测试SBTI测评完整流程 ===")
    try:
        # 导航到测评
        page.goto('http://localhost:5174/assessment/sbti-personality', wait_until='networkidle')
        page.wait_for_timeout(2000)
        
        page.screenshot(path='/tmp/test_sbti_intro.png', full_page=True)
        log("SBTI介绍页截图已保存")
        
        # 点击开始测评
        start_btn = page.locator('button').filter(has_text='开始测评')
        if start_btn.count() > 0:
            start_btn.first.click()
            log("点击开始测评")
            page.wait_for_timeout(2000)
        
        # 完成前5题测试流程
        for i in range(5):
            log(f"=== 完成第 {i+1} 题 ===")
            
            # 选择第一个选项
            option_a = page.locator('role=option[name*="选项 A"]')
            if option_a.count() > 0:
                option_a.first.click()
                log(f"第 {i+1} 题选择选项A")
                page.wait_for_timeout(500)
            
            # 点击下一题
            next_btn = page.locator('button').filter(has_text='下一题')
            if next_btn.count() > 0:
                next_btn.first.click()
                log(f"第 {i+1} 题点击下一题")
                page.wait_for_timeout(1000)
            else:
                log("未找到下一题按钮，可能已经是最后一题", "WARN")
                break
        
        page.screenshot(path='/tmp/test_sbti_progress.png', full_page=True)
        log("SBTI测评进度截图已保存")
        
        return True
    except Exception as e:
        log(f"SBTI测评测试失败: {str(e)}", "ERROR")
        page.screenshot(path='/tmp/error_sbti.png')
        return False

def test_training_page(page):
    """测试训练中心"""
    log("=== 测试训练中心 ===")
    try:
        page.goto('http://localhost:5174/training', wait_until='networkidle')
        page.wait_for_timeout(2000)
        
        page.screenshot(path='/tmp/test_training.png', full_page=True)
        log("训练中心截图已保存")
        
        # 检查训练卡片
        training_items = page.locator('button')
        count = training_items.count()
        log(f"训练项目数量: {count}")
        
        return True
    except Exception as e:
        log(f"训练中心测试失败: {str(e)}", "ERROR")
        page.screenshot(path='/tmp/error_training.png')
        return False

def test_progress_page(page):
    """测试我的进度页"""
    log("=== 测试我的进度页 ===")
    try:
        page.goto('http://localhost:5174/progress', wait_until='networkidle')
        page.wait_for_timeout(2000)
        
        page.screenshot(path='/tmp/test_progress.png', full_page=True)
        log("我的进度页截图已保存")
        
        return True
    except Exception as e:
        log(f"我的进度页测试失败: {str(e)}", "ERROR")
        page.screenshot(path='/tmp/error_progress.png')
        return False

def test_settings_page(page):
    """测试设置页"""
    log("=== 测试设置页 ===")
    try:
        page.goto('http://localhost:5174/settings', wait_until='networkidle')
        page.wait_for_timeout(2000)
        
        page.screenshot(path='/tmp/test_settings.png', full_page=True)
        log("设置页截图已保存")
        
        return True
    except Exception as e:
        log(f"设置页测试失败: {str(e)}", "ERROR")
        page.screenshot(path='/tmp/error_settings.png')
        return False

def check_console_errors(page):
    """检查并输出所有控制台错误"""
    log("=== 检查控制台错误 ===")
    
    # 获取所有console消息
    messages = []
    page.on('console', lambda msg: messages.append({
        'type': msg.type,
        'text': msg.text,
        'timestamp': datetime.now().isoformat()
    }))
    
    return messages

def main():
    """主测试函数"""
    log("=" * 60)
    log("开始全面测试心镜 MindMirror Web应用")
    log("=" * 60)
    
    console_logs = []
    
    with sync_playwright() as p:
        # 启动浏览器
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()
        
        # 捕获控制台日志
        capture_console_logs(page, console_logs)
        
        # 执行各项测试
        test_results = {}
        
        test_results['homepage'] = test_homepage(page)
        test_results['assessments'] = test_assessments_page(page)
        test_results['sbti'] = test_sbti_assessment(page)
        test_results['training'] = test_training_page(page)
        test_results['progress'] = test_progress_page(page)
        test_results['settings'] = test_settings_page(page)
        
        # 等待一段时间收集所有日志
        page.wait_for_timeout(3000)
        
        # 输出测试结果
        log("=" * 60)
        log("测试结果汇总")
        log("=" * 60)
        for test_name, result in test_results.items():
            status = "✅ 通过" if result else "❌ 失败"
            log(f"{test_name}: {status}")
        
        # 保存控制台日志
        with open('/tmp/console_logs.json', 'w', encoding='utf-8') as f:
            json.dump(console_logs, f, ensure_ascii=False, indent=2)
        log(f"控制台日志已保存到 /tmp/console_logs.json")
        
        # 输出错误信息
        errors = [log for log in console_logs if log['type'] == 'error']
        if errors:
            log("=" * 60)
            log(f"发现 {len(errors)} 个控制台错误:")
            log("=" * 60)
            for idx, error in enumerate(errors, 1):
                log(f"{idx}. {error['text']}")
        else:
            log("✅ 未发现控制台错误")
        
        browser.close()
        
        log("=" * 60)
        log("全面测试完成！")
        log("=" * 60)
        
        return test_results, console_logs

if __name__ == '__main__':
    main()
