import styles from "../page.module.css";
import { TodoItem } from "./todo-item-type";

interface Props {
    dataSource: Array<TodoItem>;
    onSubmitted: (text: string) => void;
    disabled?: boolean;
}

/**
 * A React component that renders an input field for adding new todo items.
 * 
 * @param dataSource - Array of existing todo items to check for duplicates
 * @param onSubmitted - Callback function triggered when a valid todo item is submitted
 * @param disabled - Whether the input should be disabled during loading
 * @returns Input element that handles todo item addition on Enter key press
 */
export default function TodoItemAdd(
    { dataSource, onSubmitted, disabled = false }: Props
) {
    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;
        
        e.preventDefault();
        if (e.key === "Enter") {
            let text = (e.target as HTMLInputElement).value;
            text = text.trim();
            let valid = true;
            // non-empty string
            valid = valid && text.length > 0;
            // is duplicate
            valid = valid && !dataSource.some(item => item.text === text);
            if (valid) {
                onSubmitted(text);
                (e.target as HTMLInputElement).value = "";
            }
        }
    }
    return (
        <input
            id="todo_item_add_input"
            data-testid="todo_item_add_input"
            className={styles.todo_item_add}
            autoFocus
            type="text"
            placeholder={disabled ? "Loading... ⚓" : "create a new task"}
            disabled={disabled}
            onKeyUp={e => onKeyUp(e)} />
    );
}