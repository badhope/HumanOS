from playwright.sync_api import sync_playwright
import time

def test_mindmirror():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Capture console messages
        console_messages = []
        page.on("console", lambda msg: console_messages.append(f"[{msg.type}] {msg.text}"))
        
        print("Opening http://localhost:5181/...")
        page.goto('http://localhost:5181/')
        
        # Wait for initial load
        page.wait_for_load_state('networkidle')
        print("Page loaded, waiting for splash screen...")
        
        # Wait 1 second and check what's on screen
        time.sleep(1)
        
        # Check if splash screen is visible
        splash = page.locator('text=心镜 MindMirror')
        if splash.is_visible():
            print("✓ Splash screen is visible")
        else:
            print("✗ Splash screen NOT visible")
            # Check what's actually on the page
            content = page.content()
            if "MindMirror" in content:
                print("  But MindMirror text exists in page HTML")
        
        # Wait for splash to complete (3 seconds total)
        print("Waiting for splash animation to complete...")
        time.sleep(3)
        
        # Check if main content is visible
        main_visible = page.locator('text=3分钟').is_visible()
        if main_visible:
            print("✓ Main page content is visible after splash")
        else:
            print("✗ Main page content NOT visible after splash")
            # Try to find any content
            try:
                body_text = page.locator('body').inner_text()
                print(f"  Page body text (first 200 chars): {body_text[:200]}")
            except:
                print("  Could not get page body text")
        
        # Check for any error messages
        errors = [m for m in console_messages if '[error]' in m.lower()]
        if errors:
            print(f"\nConsole errors found:")
            for err in errors[:5]:
                print(f"  {err}")
        
        # Take screenshot
        page.screenshot(path='/tmp/mindmirror_test.png', full_page=True)
        print(f"\nScreenshot saved to /tmp/mindmirror_test.png")
        
        browser.close()
        print("\nTest completed!")

if __name__ == "__main__":
    test_mindmirror()
