"use client";

import styles from "./page.module.css";
import { TodoItem } from "./todo-item/todo-item-type";
import TodoItemAdd from "./todo-item/todo-item-add";
import TodoList from "./todo-list/todo-list";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000";

export default function Home() {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/items`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleSubmit = (text: string) => {
    const newTodo: TodoItem = { text, completed: false };
    setTodos([newTodo, ...todos]);
  };

  const handleRemove = async (itemId: number) => {
    // If item doesn't have an ID, it's likely not yet synced with the backend
    if (itemId === undefined) {
      // Just remove it from the local state
      setTodos(todos.filter(item => item.id !== itemId));
      return;
    }

    try {
      // Call the delete endpoint
      const response = await fetch(`${API_URL}/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.statusText}`);
      }

      // Update the UI by removing the item from the state
      setTodos(todos.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggle = (index: number) => {
    setTodos(todos.map((item, i) => {
      if (i === index) {
        return { ...item, completed: !item.completed };
      }
      return item;
    }));
  };

  return (
    <div className={styles.page}>
      <TodoItemAdd
        dataSource={todos}
        onSubmitted={handleSubmit}
      />
      <TodoList
        dataSource={todos}
        onItemRemoved={handleRemove}
        onItemToggle={handleToggle}
      />
    </div>
  );
}
