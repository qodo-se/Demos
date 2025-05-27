"use client";

import styles from "./page.module.css";
import { TodoItem } from "./todo-item/todo-item-type";
import TodoItemAdd from "./todo-item/todo-item-add";
import TodoList from "./todo-list/todo-list";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8000";

export default function Home() {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/items`);
      if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError("Failed to load todos. Make sure the API server is running! 🚨");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, completed: false }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to create todo: ${response.statusText}`);
      }
      
      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error("Error creating todo:", error);
      setError("Failed to create todo. Arrr! 🏴‍☠️");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.statusText}`);
      }
      
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError("Failed to delete todo. Shiver me timbers! ⚔️");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: string) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !todoToUpdate.completed }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update todo: ${response.statusText}`);
      }
      
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (error) {
      console.error("Error updating todo:", error);
      setError("Failed to update todo. Batten down the hatches! 🌊");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {error && (
        <div style={{ 
          color: 'red', 
          padding: '10px', 
          marginBottom: '10px', 
          border: '1px solid red', 
          borderRadius: '4px',
          backgroundColor: '#ffe6e6'
        }}>
          {error}
        </div>
      )}
      {loading && (
        <div style={{ 
          color: 'blue', 
          padding: '10px', 
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          Loading... ⚓
        </div>
      )}
      <TodoItemAdd
        dataSource={todos}
        onSubmitted={handleSubmit}
        disabled={loading}
      />
      <TodoList
        dataSource={todos}
        onItemRemoved={handleRemove}
        onItemToggle={handleToggle}
        disabled={loading}
      />
    </div>
  );
}
