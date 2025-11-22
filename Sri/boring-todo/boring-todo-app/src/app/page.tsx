"use client";

import styles from "./page.module.css";
import { TodoItem } from "./todo-item/todo-item-type";
import TodoItemAdd from "./todo-item/todo-item-add";
import TodoList from "./todo-list/todo-list";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${API_URL}/items`);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleSubmit = async (text: string) => {
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, completed: false }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to create todo");
      }
      
      const newTodo: TodoItem = await response.json();
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      
      setTodos(todos.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggle = async (id: string) => {
    const todoToToggle = todos.find((item) => item.id === id);
    if (!todoToToggle) return;
    
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !todoToToggle.completed }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      
      const updatedTodo: TodoItem = await response.json();
      setTodos(todos.map((item) => (item.id === id ? updatedTodo : item)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
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
