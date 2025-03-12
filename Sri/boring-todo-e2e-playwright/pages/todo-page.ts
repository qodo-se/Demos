import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly todoInput: Locator;
  readonly todoList: Locator;
  readonly todoItems: Locator;
  readonly todoTexts: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todoInput = page.locator('#todo_item_add_input');
    this.todoList = page.locator('#todo_list');
    this.todoItems = page.locator('#todo_list .todo_list_item');
    this.todoTexts = page.locator('#todo_list .todo_list_item .todo_list_item_text');
    this.deleteButtons = page.locator('#todo_list .todo_list_item .todo_list_item_delete');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Todo App/);
  }

  async addTodo(text: string) {
    await this.todoInput.fill(text);
    await this.todoInput.press('Enter');

    // Wait for the new todo to appear in the list
    await expect(this.todoTexts.filter({ hasText: text })).toBeVisible();
  }

  async getTodoTexts() {
    return await this.todoTexts.allTextContents();
  }

  async toggleTodo(index: number) {
    const todoItem = this.todoItems.nth(index);
    await todoItem.click();
  }

  async deleteTodo(index: number) {
    const deleteButton = this.deleteButtons.nth(index);
    await deleteButton.click();
  }

  async isTodoCompleted(index: number) {
    const todoItem = this.todoItems.nth(index);
    const classAttribute = await todoItem.getAttribute('class');
    return classAttribute?.includes('todo_list_item_completed') ?? false;
  }

  async assertTodoCount(count: number) {
    await expect(this.todoItems).toHaveCount(count);
  }

  async assertTodoExists(text: string) {
    await expect(this.todoTexts.filter({ hasText: text })).toBeVisible();
  }

  async assertTodoDoesNotExist(text: string) {
    await expect(this.todoTexts.filter({ hasText: text })).toHaveCount(0);
  }
}