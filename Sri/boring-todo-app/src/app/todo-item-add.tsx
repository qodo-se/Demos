import styles from "./page.module.css";
import { TodoItem } from "./todo-item-type";

interface Props {
    dataSource: Array<TodoItem>;
    onSubmitted: (text: string) => void;
}

/**
 * A React component that renders an input field for adding new todo items.
 * 
 * @param dataSource - Array of existing todo items to check for duplicates
 * @param onSubmitted - Callback function triggered when a valid todo item is submitted
 * @returns Input element that handles todo item addition on Enter key press
 */
export default function TodoItemAdd(
    { dataSource, onSubmitted }: Props
) {
    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
            className={styles.todo_item_add}
            autoFocus
            type="text"
            placeholder="create a new task"
            onKeyUp={e => onKeyUp(e)} />
    );
}