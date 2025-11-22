'use client';

import React, { useState } from 'react';
import styles from "../page.module.css";
import { TodoItem } from "./todo-item-type";
import { TodoItemAddProps } from "./todo-item-type";
import { CategoryPicker } from '../category/category-picker';

interface Props {
    dataSource: Array<TodoItem>;
    onSubmitted: (text: string, categoryIds?: string[]) => void;
    categories: Array<{ id: string, name: string, color?: string }>;
}

/**
 * A React component that renders an input field for adding new todo items with category selection.
 * 
 * @param dataSource - Array of existing todo items to check for duplicates
 * @param onSubmitted - Callback function triggered when a valid todo item is submitted
 * @param categories - Available categories to assign to the todo item
 * @returns Form for adding todo items with category selection
 */
export default function TodoItemAdd(
    { dataSource, onSubmitted, categories }: Props
) {
    const [text, setText] = useState('');
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let trimmedText = text.trim();
        let valid = true;

        // non-empty string
        valid = valid && trimmedText.length > 0;
        // is duplicate
        valid = valid && !dataSource.some(item => item.text === trimmedText);

        if (valid) {
            onSubmitted(trimmedText, selectedCategoryIds);
            setText('');
            setSelectedCategoryIds([]);
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className={styles.todo_item_add_container}>
            <form onSubmit={handleSubmit}>
                <input
                    id="todo_item_add_input"
                    data-testid="todo_item_add_input"
                    className={styles.todo_item_add}
                    autoFocus
                    type="text"
                    placeholder="create a new task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyUp={handleKeyUp}
                />

                <div className={styles.category_selection}>
                    <CategoryPicker
                        categories={categories}
                        selectedCategoryIds={selectedCategoryIds}
                        onChange={setSelectedCategoryIds}
                    />
                </div>

                <button
                    type="submit"
                    className={styles.add_button}
                    disabled={!text.trim()}
                >
                    Add
                </button>
            </form>
        </div>
    );
}
