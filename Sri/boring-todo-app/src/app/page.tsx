"use client";

import styles from "./page.module.css";
import { TodoItem } from "./todo-item-type";
import TodoItemAdd from "./todo-item-add";
import TodoList from "./todo-list";
import { useState } from "react";

/**
 * A React component that manages a todo list application.
 * 
 * @returns A page containing an input field for adding todos and a list of todo items
 */
export default function Home() {
  const [todos, setTodos] = useState<Array<TodoItem>>([
    { "text": "hello world", "completed": false },
    { "text": "foo bar", "completed": false },
    { "text": "lorem ipsum", "completed": false },
  ]);

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
