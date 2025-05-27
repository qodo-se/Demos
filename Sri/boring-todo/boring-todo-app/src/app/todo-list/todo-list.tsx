import styles from "../page.module.css";
import { TodoItem } from "../todo-item/todo-item-type";

interface Props {
    dataSource: Array<TodoItem>;
    onItemRemoved: (id: string) => void;
    onItemToggle: (id: string) => void;
    disabled?: boolean;
}

export default function TodoList(
    { dataSource, onItemRemoved, onItemToggle, disabled = false }: Props
) {
    const listItems = dataSource.map((item, index) => {
        const classNames = ["todo_list_item", styles.todo_list_item];
        let deleteLink = (
            <a
                className={[styles.todo_list_item_delete, "todo_list_item_delete"].join(" ")}
                data-testid={`todo_list_item_delete_${index}`}
                onClick={() => !disabled && onItemRemoved(item.id)}
                style={{ 
                    opacity: disabled ? 0.5 : 1, 
                    cursor: disabled ? 'not-allowed' : 'pointer' 
                }}>
                🗑️
            </a>);
        if (item.completed) {
            classNames.push(styles.todo_list_item_completed);
            deleteLink = (<></>);
        }

        if (disabled) {
            classNames.push('disabled');
        }

        return (
            <li className={classNames.join(" ")}
                key={item.id}
                style={{ opacity: disabled ? 0.7 : 1 }}>
                <span
                    className="todo_list_item_text"
                    data-testid={`todo_list_item_text_${index}`}
                    onClick={() => !disabled && onItemToggle(item.id)}
                    style={{ 
                        cursor: disabled ? 'not-allowed' : 'pointer' 
                    }}>
                    {item.text}
                </span>
                {deleteLink}
            </li>
        );
    });
    return (
        <ul
            id="todo_list"
            className={styles.todo_list}
            data-testid="todo_list">
            {listItems}
        </ul>
    );
}
