import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

test.describe('01 Basic', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('should add a new todo', async () => {
    // Arrange
    const todoText = 'Buy groceries';

    // Act
    await todoPage.addTodo(todoText);

    // Assert
    await todoPage.assertTodoExists(todoText);
  });

  test('should toggle todo completion status', async () => {
    // Arrange
    const todoText = 'Complete Playwright tests';
    await todoPage.addTodo(todoText);

    // Get the index of the newly added todo
    const todoItems = await todoPage.getTodoTexts();
    const index = todoItems.findIndex(item => item === todoText);

    // Assert initial state
    expect(await todoPage.isTodoCompleted(index)).toBe(false);

    // Act - toggle completion
    await todoPage.toggleTodo(index);

    // Assert completed state
    expect(await todoPage.isTodoCompleted(index)).toBe(true);

    // Act - toggle again
    await todoPage.toggleTodo(index);

    // Assert uncompleted state
    expect(await todoPage.isTodoCompleted(index)).toBe(false);
  });

  test('should delete a todo', async () => {
    // Arrange
    const todoText = 'Delete this todo';
    await todoPage.addTodo(todoText);

    // Get the index of the newly added todo
    const todoItems = await todoPage.getTodoTexts();
    const index = todoItems.findIndex(item => item === todoText);

    // Act
    await todoPage.deleteTodo(index);

    // Assert
    await todoPage.assertTodoDoesNotExist(todoText);
  });
});