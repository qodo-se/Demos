from playwright.sync_api import Page, expect
from ..pages.main_page import MainPage

def test_create_todo_item(logged_in_page: Page):
    # Given the user is logged in
    main_page = MainPage(logged_in_page)

    # When the user creates a new todo item
    main_page.create_task("My New Task")

    # Then the new todo item should be visible in the list
    expect(main_page.get_task(0)).to_have_text("My New Task")

def test_complete_todo_item(logged_in_page: Page):
    # Given the user is logged in and has a todo item
    main_page = MainPage(logged_in_page)
    main_page.create_task("Task to complete")

    # When the user clicks on the todo item
    main_page.get_task(0).click()

    # Then the todo item should be marked as completed
    expect(main_page.get_task(0)).to_have_class(/todo_list_item_completed/)

def test_delete_todo_item(logged_in_page: Page):
    # Given the user is logged in and has a todo item
    main_page = MainPage(logged_in_page)
    main_page.create_task("Task to delete")
    expect(main_page.get_task(0)).to_be_visible()

    # When the user clicks the delete button
    main_page.delete_task(0)

    # Then the todo item should be removed from the list
    expect(main_page.get_task(0)).not_to_be_visible()
