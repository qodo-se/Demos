import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

test.describe('Todo App Visual Tests', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await todoPage.goto();
    });

    test('should match empty todo list snapshot', async ({ page }) => {
        // Clear any existing todos if needed
        // ...

        // Update baseline screenshot
        // await page.screenshot({ path: 'tests/screenshots/empty-todo-list.png' });

        // Take a screenshot and compare with baseline
        await expect(page).toHaveScreenshot('tests/screenshots/empty-todo-list.png');
    });

    test('should match todo list with items snapshot', async ({ page }) => {
        // Add some todos
        await todoPage.addTodo('First visual test todo');
        await todoPage.addTodo('Second visual test todo');


        // Update baseline screenshot
        // await page.screenshot({ path: 'tests/screenshots/todo-list-with-items.png' });

        // Take a screenshot and compare with baseline
        await expect(page).toHaveScreenshot('tests/screenshots/todo-list-with-items.png');
    });

    test('should match completed todo item snapshot', async ({ page }) => {
        // Add a todo and mark it as completed
        await todoPage.addTodo('Completed todo item');

        const todoItems = await todoPage.getTodoTexts();
        const index = todoItems.findIndex(item => item === 'Completed todo item');
        await todoPage.toggleTodo(index);

        // Update baseline screenshot
        // await page.screenshot({ path: 'tests/screenshots/completed-todo-item.png' });

        // Take a screenshot and compare with baseline
        await expect(page).toHaveScreenshot('tests/screenshots/completed-todo-item.png');
    });
});