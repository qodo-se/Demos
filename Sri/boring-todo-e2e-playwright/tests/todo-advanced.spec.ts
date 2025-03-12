import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

test.describe('Todo App Advanced Functionality', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await todoPage.goto();
    });

    test('should handle multiple todos', async () => {
        // Arrange & Act - Add multiple todos
        const todos = ['First task', 'Second task', 'Third task'];

        for (const todo of todos) {
            await todoPage.addTodo(todo);
        }

        const numberOfTodosOnInit = 3;

        // Assert all todos were added
        await todoPage.assertTodoCount(todos.length + numberOfTodosOnInit);

        const todoTexts = await todoPage.getTodoTexts();
        for (const todo of todos) {
            expect(todoTexts).toContain(todo);
        }
    });

    test('should handle empty input', async () => {
        // Arrange - Get initial todo count
        const initialCount = (await todoPage.getTodoTexts()).length;

        // Act - Try to add empty todo
        await todoPage.todoInput.fill('');
        await todoPage.todoInput.press('Enter');

        // Assert - Todo count should not change
        await todoPage.assertTodoCount(initialCount);
    });

    test('should handle very long todo text', async () => {
        // Arrange
        const longText = 'This is a very long todo item text that should still be handled correctly by the application without any issues or truncation in the display or functionality'.repeat(3);

        // Act
        await todoPage.addTodo(longText);

        // Assert
        await todoPage.assertTodoExists(longText);
    });

    test('should handle special characters in todo text', async () => {
        // Arrange
        const specialText = '!@#$%^&*()_+<>?:"{}|~`-=[]\\;\',./';

        // Act
        await todoPage.addTodo(specialText);

        // Assert
        await todoPage.assertTodoExists(specialText);
    });
});