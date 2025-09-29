from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Log in
    page.goto("http://localhost:5173/")
    page.get_by_role("button", name="Login").click()
    page.get_by_label("Email").fill("test@example.com")
    page.get_by_label("Your password").fill("password")
    page.locator("form").get_by_role("button", name="Log in").click()

    # Dashboard screenshot
    page.wait_for_url("**/dashboard")
    page.screenshot(path="jules-scratch/verification/dashboard-debug.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)