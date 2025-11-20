import styles from "../page.module.css";
import { TodoItem } from "../todo-item/todo-item-type";

interface Props {
    dataSource: Array<TodoItem>;
    onItemRemoved: (id: string) => void;
    onItemToggle: (id: string) => void;
}

export default function TodoList(
    { dataSource, onItemRemoved, onItemToggle }: Props
) {
    const listItems = dataSource.map((item) => {
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
                <span
                    className="todo_list_item_text"
                    data-testid={`todo_list_item_text_${item.id}`}
                    onClick={() => onItemToggle(item.id)}>{item.text}</span>
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
