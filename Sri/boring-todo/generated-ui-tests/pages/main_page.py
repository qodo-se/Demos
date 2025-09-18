from playwright.sync_api import Page

class MainPage:
    def __init__(self, page: Page):
        self.page = page
        self.new_task_input = page.locator('[data-testid="todo_item_add_input"]')
        self.todo_list = page.locator('[data-testid="todo_list"]')

    def create_task(self, task_text):
        self.new_task_input.fill(task_text)
        self.new_task_input.press("Enter")

    def get_task_text(self, index):
        return self.page.locator(f'[data-testid="todo_list_item_text_{index}"]').text_content()

    def get_task(self, index):
        return self.page.locator(f'[data-testid="todo_list_item_text_{index}"]')

    def delete_task(self, index):
        self.page.locator(f'[data-testid="todo_list_item_delete_{index}"]').click()
