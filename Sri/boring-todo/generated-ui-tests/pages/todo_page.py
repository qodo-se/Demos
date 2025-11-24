from playwright.sync_api import Page

class TodoPage:
    def __init__(self, page: Page):
        self.page = page
        self.new_task_input = page.locator("[data-testid='todo_item_add_input']")
        self.todo_list = page.locator("[data-testid='todo_list']")
        self.logout_button = page.locator("[data-testid='logout-button']")

    def create_todo(self, task_name):
        self.new_task_input.fill(task_name)
        self.new_task_input.press("Enter")

    def get_todo_items(self):
        return self.todo_list.locator("li")

    def delete_todo_item(self, task_name):
        item = self.get_todo_items().filter(has_text=task_name)
        item.locator("[data-testid^='todo_list_item_delete_']").click()

    def logout(self):
        self.logout_button.click()
