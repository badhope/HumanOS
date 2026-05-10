from playwright.sync_api import sync_playwright
import json

def test_mindmirror():
    results = {
        "success": False,
        "errors": [],
        "warnings": [],
        "page_content": "",
        "screenshot": "/tmp/mindmirror_check.png"
    }
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        console_messages = []
        page.on("console", lambda msg: console_messages.append(f"[{msg.type}] {msg.text}"))
        page.on("pageerror", lambda err: results["errors"].append(str(err)))
        
        print("1. 打开页面...")
        try:
            response = page.goto('http://localhost:5191/', timeout=15000)
            results["status_code"] = response.status if response else None
            print(f"   状态码: {results['status_code']}")
        except Exception as e:
            results["errors"].append(f"导航失败: {str(e)}")
            print(f"   导航失败: {e}")
            browser.close()
            return results
        
        print("2. 等待页面加载...")
        try:
            page.wait_for_load_state('networkidle', timeout=10000)
            print("   网络空闲")
        except Exception as e:
            results["warnings"].append(f"网络等待: {str(e)}")
            print(f"   网络等待: {e}")
        
        print("3. 检查页面内容...")
        try:
            page.wait_for_timeout(2000)
            body_html = page.inner_html('body')
            results["page_content"] = body_html[:500]
            print(f"   HTML长度: {len(body_html)}")
            
            if "MindMirror" in body_html or "心镜" in body_html:
                print("   ✓ 找到心镜相关内容")
                results["success"] = True
            else:
                print("   ✗ 未找到心镜内容")
                results["warnings"].append("未找到心镜内容")
        except Exception as e:
            results["errors"].append(f"内容检查: {str(e)}")
            print(f"   内容检查失败: {e}")
        
        print("4. 截图...")
        try:
            page.screenshot(path=results["screenshot"], full_page=True)
            print(f"   已保存: {results['screenshot']}")
        except Exception as e:
            print(f"   截图失败: {e}")
        
        print("5. 控制台消息:")
        for msg in console_messages[-10:]:
            print(f"   {msg}")
            if "[error]" in msg.lower():
                results["errors"].append(msg)
        
        browser.close()
    
    return results

if __name__ == "__main__":
    result = test_mindmirror()
    print("\n=== 测试结果 ===")
    print(f"成功: {result['success']}")
    if result['errors']:
        print(f"错误: {result['errors']}")
    if result['warnings']:
        print(f"警告: {result['warnings']}")
