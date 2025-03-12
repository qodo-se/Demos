// import { test, expect } from '@playwright/test';
// import { TodoPage } from '../pages/todo-page';

// test.describe('Todo App API Integration', () => {
//     let todoPage: TodoPage;

//     test.beforeEach(async ({ page }) => {
//         todoPage = new TodoPage(page);
//     });

//     test('should send correct API request when adding todo', async ({ page }) => {
//         // Arrange
//         const todoText = 'API test todo';

//         // Set up request listener
//         const addRequest = page.waitForRequest(request =>
//             request.url().includes('/api/todos') &&
//             request.method() === 'POST'
//         );

//         // Act
//         await todoPage.goto();
//         await todoPage.addTodo(todoText);

//         // Assert
//         const request = await addRequest;
//         const postData = JSON.parse(request.postData() || '{}');
//         expect(postData.text).toBe(todoText);
//     });

//     test('should send correct API request when toggling todo', async ({ page }) => {
//         // Arrange
//         const todoText = 'Toggle API test todo';

//         // Navigate and add todo
//         await todoPage.goto();
//         await todoPage.addTodo(todoText);

//         // Get the index of the newly added todo
//         const todoItems = await todoPage.getTodoTexts();
//         const index = todoItems.findIndex(item => item === todoText);

//         // Set up request listener
//         const updateRequest = page.waitForRequest(request =>
//             request.url().includes('/api/todos') &&
//             (request.method() === 'PUT' || request.method() === 'PATCH')
//         );

//         // Act
//         await todoPage.toggleTodo(index);

//         // Assert
//         const request = await updateRequest;
//         const requestData = JSON.parse(request.postData() || '{}');
//         expect(requestData.completed).toBe(true);
//     });

//     test('should send correct API request when deleting todo', async ({ page }) => {
//         // Arrange
//         const todoText = 'Delete API test todo';

//         // Navigate and add todo
//         await todoPage.goto();
//         await todoPage.addTodo(todoText);

//         // Get the index of the newly added todo
//         const todoItems = await todoPage.getTodoTexts();
//         const index = todoItems.findIndex(item => item === todoText);

//         // Set up request listener
//         const deleteRequest = page.waitForRequest(request =>
//             request.url().includes('/api/todos') &&
//             request.method() === 'DELETE'
//         );

//         // Act
//         await todoPage.deleteTodo(index);

//         // Assert
//         await deleteRequest;
//         // Verify the todo is removed from the UI
//         await todoPage.assertTodoDoesNotExist(todoText);
//     });
// });