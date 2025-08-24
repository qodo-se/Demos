from playwright.sync_api import Page

class LoginPage:
    def __init__(self, page: Page):
        self.page = page
        self.email_input = page.locator('[data-test-id="email-input"]')
        self.password_input = page.locator('[data-test-id="password-input"]')
        self.login_button = page.locator('[data-test-id="login-button"]')

    def navigate(self):
        self.page.goto("http://localhost:3001/login")

    def login(self, email, password):
        self.email_input.fill(email)
        self.password_input.fill(password)
        self.login_button.click()
