import pytest
from playwright.sync_api import Page, expect
from ..pages.login_page import LoginPage
from ..pages.todo_page import TodoPage


@pytest.fixture(scope="function")
def login_page(page: Page):
    return LoginPage(page)

@pytest.fixture(scope="function")
def todo_page(page: Page):
    return TodoPage(page)

def test_login_success(login_page: LoginPage, todo_page: TodoPage, page: Page):
    # GIVEN: The user is on the login page
    login_page.navigate()

    # WHEN: The user logs in with valid credentials
    login_page.login("demo@demo.demo", "demo")

    # THEN: The user should be redirected to the todo page
    expect(page).to_have_url("http://localhost:3001/")
    expect(todo_page.logout_button).to_be_visible()

def test_login_failure(login_page: LoginPage, page: Page):
    # GIVEN: The user is on the login page
    login_page.navigate()

    # WHEN: The user logs in with invalid credentials
    login_page.login("wrong", "user")

    # THEN: The user should remain on the login page
    expect(page).to_have_url("http://localhost:3001/login")

def test_logout(login_page: LoginPage, todo_page: TodoPage, page: Page):
    # GIVEN: The user is logged in
    login_page.navigate()
    login_page.login("demo@demo.demo", "demo")

    # WHEN: The user clicks the logout button
    todo_page.logout()

    # THEN: The user should be redirected to the login page
    expect(page).to_have_url("http://localhost:3001/login")
