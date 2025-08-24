import pytest
from playwright.sync_api import Page
from .pages.login_page import LoginPage

@pytest.fixture
def logged_in_page(page: Page) -> Page:
    login_page = LoginPage(page)
    login_page.navigate()
    login_page.login("demo@demo.demo", "demo")
    page.wait_for_url("http://localhost:3001/")
    return page
