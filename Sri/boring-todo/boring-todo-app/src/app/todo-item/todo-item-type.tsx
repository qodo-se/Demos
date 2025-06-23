export interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
    categoryIds: string[]; // Array of category IDs
}

export interface TodoItemAddProps {
    onAdd: (item: Omit<TodoItem, "id">) => void;
}
