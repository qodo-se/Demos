'use client';

import React, { useState, useEffect } from 'react';
import styles from "../page.module.css";
import { TodoItem } from "../todo-item/todo-item-type";
import { Category } from '../category/category-type';
import { v4 as uuidv4 } from 'uuid';
import TodoItemAdd from '../todo-item/todo-item-add';
import { CategoryManager } from '../category/category-manager';

interface Props {
    dataSource: Array<TodoItem>;
    onItemRemoved: (id: string) => void;
    onItemToggle: (id: string) => void;
}

export default function TodoList({ dataSource, onItemRemoved, onItemToggle }: Props) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [filter, setFilter] = useState<string | null>(null);

    // Sample categories for starting the app
    useEffect(() => {
        // In a real app, load from backend/localStorage
        const initialCategories: Category[] = [
            { id: uuidv4(), name: 'Work', color: '#ffcccb' },
            { id: uuidv4(), name: 'Personal', color: '#c2e0c6' },
            { id: uuidv4(), name: 'Urgent', color: '#f9d0c4' }
        ];
        setCategories(initialCategories);
    }, []);

    // Add new category
    const handleAddCategory = (category: Omit<Category, 'id'>) => {
        const newCategory = {
            ...category,
            id: uuidv4()
        };
        setCategories([...categories, newCategory]);
    };

    // Rename category
    const handleRenameCategory = (id: string, newName: string) => {
        setCategories(
            categories.map(category =>
                category.id === id ? { ...category, name: newName } : category
            )
        );
    };

    // Delete category
    const handleDeleteCategory = (id: string) => {
        setCategories(categories.filter(category => category.id !== id));

        if (filter === id) {
            setFilter(null);
        }
    };

    // Filter todos by category
    const filteredTodoItems = filter
        ? dataSource.filter(item => item.categoryIds && item.categoryIds.includes(filter))
        : dataSource;

    // Get category names for a todo item
    const getCategoryNames = (categoryIds?: string[]): JSX.Element[] => {
        if (!categoryIds) return [];
        return categoryIds.map(id => {
            const category = categories.find(cat => cat.id === id);
            return category ? (
                <span
                    key={id}
                    className={styles.todo_category}
                    style={{ backgroundColor: category.color }}
                >
                    {category.name}
                </span>
            ) : <></>;
        });
    };

    const listItems = filteredTodoItems.map((item) => {
        const classNames = ["todo_list_item", styles.todo_list_item];
        let deleteLink = (
            <a
                className={[styles.todo_list_item_delete, "todo_list_item_delete"].join(" ")}
                data-testid={`todo_list_item_delete_${item.id}`}
                onClick={() => onItemRemoved(item.id)}>
                🗑️
            </a>);
        if (item.completed) {
            classNames.push(styles.todo_list_item_completed);
            deleteLink = (<></>);
        }

        return (
            <li className={classNames.join(" ")}
                key={item.id}>
                <div className={styles.todo_content}>
                    <span
                        className="todo_list_item_text"
                        data-testid={`todo_list_item_text_${item.id}`}
                        onClick={() => onItemToggle(item.id)}>
                        {item.text}
                    </span>
                    <div className={styles.todo_categories}>
                        {getCategoryNames(item.categoryIds)}
                    </div>
                </div>
                {deleteLink}
            </li>
        );
    });

    return (
        <div className={styles.todo_application}>
            <div className={styles.app_container}>
                <div className={styles.todo_container}>
                    <div className={styles.category_filters}>
                        <button
                            className={filter === null ? styles.active : ''}
                            onClick={() => setFilter(null)}
                        >
                            All
                        </button>

                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={filter === category.id ? styles.active : ''}
                                onClick={() => setFilter(category.id)}
                                style={{ backgroundColor: category.color + '50' }}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    <ul
                        id="todo_list"
                        className={styles.todo_list}
                        data-testid="todo_list">
                        {listItems}
                    </ul>
                </div>

                <div className={styles.category_container}>
                    <CategoryManager
                        categories={categories}
                        onCategoryAdd={handleAddCategory}
                        onCategoryRename={handleRenameCategory}
                        onCategoryDelete={handleDeleteCategory}
                    />
                </div>
            </div>
        </div>
    );
}
