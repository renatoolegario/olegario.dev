from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:3000")
            page.goto("http://localhost:3000", timeout=60000)

            # Wait for main content
            print("Waiting for content")
            page.wait_for_selector("text=Arquiteto de Software", timeout=60000)

            # Hero Section Screenshot
            print("Taking Hero screenshot")
            page.screenshot(path="verification_hero.png")

            # Scroll to Projects
            print("Scrolling to Projects")
            page.evaluate("document.getElementById('projects').scrollIntoView()")
            page.wait_for_timeout(2000) # Wait for animations
            page.screenshot(path="verification_projects.png")

            # Scroll to Stack
            print("Scrolling to Stack")
            page.evaluate("document.getElementById('stack').scrollIntoView()")
            page.wait_for_timeout(2000)
            page.screenshot(path="verification_stack.png")

            # Scroll to Footer
            print("Scrolling to Footer")
            page.evaluate("document.getElementById('contact').scrollIntoView()")
            page.wait_for_timeout(2000)
            page.screenshot(path="verification_footer.png")

            print("Screenshots taken")
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
