"use client";

import styles from "./page.module.css";
import { TodoItem } from "./todo-item/todo-item-type";
import TodoItemAdd from "./todo-item/todo-item-add";
import TodoList from "./todo-list/todo-list";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:8000/items");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleSubmit = (text: string) => {
    const newTodo: TodoItem = { text, completed: false };
    setTodos([newTodo, ...todos]);
  };

  const handleRemove = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
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
