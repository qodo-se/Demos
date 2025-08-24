from playwright.sync_api import Page, expect
from ..pages.login_page import LoginPage

def test_login_success(page: Page):
    # Given the user is on the login page
    login_page = LoginPage(page)
    login_page.navigate()

    # When the user enters valid credentials and clicks login
    login_page.login("demo@demo.demo", "demo")

    # Then the user should be redirected to the main page
    expect(page).to_have_url("http://localhost:3001/")

def test_login_failure(page: Page):
    # Given the user is on the login page
    login_page = LoginPage(page)
    login_page.navigate()

    # When the user enters invalid credentials and clicks login
    login_page.login("wrong@user.com", "wrongpassword")

    # Then an error message should be displayed
    error_message = page.locator(".error")
    expect(error_message).to_be_visible()
