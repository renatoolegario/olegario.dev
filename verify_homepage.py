from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            print("Navigating to homepage...")
            page.goto("http://localhost:3000")
            page.wait_for_selector("main", timeout=60000) # Wait for main content

            print("Waiting for key elements...")
            # Wait for specific elements to ensure hydration/loading
            page.wait_for_selector("text=Arquiteto de Software", timeout=10000)

            # Scroll to bottom to trigger any lazy loading or animations
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(2000) # Wait for animations
            page.evaluate("window.scrollTo(0, 0)")
            page.wait_for_timeout(1000)

            print("Taking screenshots...")
            # Take full page screenshot
            page.screenshot(path="homepage_full.png", full_page=True)

            # Take individual section screenshots for better detail if needed
            # Hero (first section)
            hero = page.locator("section").first
            if hero.is_visible():
                hero.screenshot(path="hero_section.png")

            # Differential
            diff = page.locator("#differential")
            if diff.is_visible():
                diff.screenshot(path="differential_section.png")

            # Projects
            projects = page.locator("#projects")
            if projects.is_visible():
                projects.screenshot(path="projects_section.png")

            # Tech Stack
            stack = page.locator("#stack")
            if stack.is_visible():
                stack.screenshot(path="tech_stack_section.png")

            # Footer
            footer = page.locator("footer")
            if footer.is_visible():
                footer.screenshot(path="footer_section.png")

            print("Screenshots taken successfully.")
        except Exception as e:
            print(f"Error: {e}")
            # Take a screenshot of the error state if possible
            try:
                page.screenshot(path="error_state.png")
            except:
                pass
        finally:
            browser.close()

if __name__ == "__main__":
    run()
