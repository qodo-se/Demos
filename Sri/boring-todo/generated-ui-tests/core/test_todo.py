import pytest
from playwright.sync_api import Page, expect
from ..pages.login_page import LoginPage
from ..pages.todo_page import TodoPage

@pytest.fixture(scope="function", autouse=True)
def setup(page: Page):
    login_page = LoginPage(page)
    login_page.navigate()
    login_page.login("demo@demo.demo", "demo")
    yield

@pytest.fixture(scope="function")
def todo_page(page: Page):
    return TodoPage(page)

def test_create_todo_item(todo_page: TodoPage):
    # GIVEN: The user is on the todo page
    # SETUP FIXTURE

    # WHEN: The user creates a new todo item
    todo_page.create_todo("My New Task")

    # THEN: The new todo item should be in the list
    expect(todo_page.get_todo_items().first).to_have_text("My New Task")

def test_delete_todo_item(todo_page: TodoPage):
    # GIVEN: The user has a todo item
    todo_page.create_todo("Delete Me")

    # WHEN: The user deletes the todo item
    todo_page.delete_todo_item("Delete Me")

    # THEN: The todo item should be removed from the list
    expect(todo_page.get_todo_items().filter(has_text="Delete Me")).not_to_be_visible()
