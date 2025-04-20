import styles from "../page.module.css";
import { TodoItem } from "../todo-item/todo-item-type";

interface Props {
    dataSource: Array<TodoItem>;
    onItemRemoved: (index: number) => void;
    onItemToggle: (index: number) => void;
}

export default function TodoList(
    { dataSource, onItemRemoved, onItemToggle }: Props
) {
    const listItems = dataSource.map((item, index) => {
        const classNames = ["todo_list_item", styles.todo_list_item];
        let deleteLink = (
            <a
                className={[styles.todo_list_item_delete, "todo_list_item_delete"].join(" ")}
                data-testid={`todo_list_item_delete_${index}`}
                onClick={() => onItemRemoved(index)}>
                🗑️
            </a>);
        if (item.completed) {
            classNames.push(styles.todo_list_item_completed);
            deleteLink = (<></>);
        }

        return (
            <li className={classNames.join(" ")}
                key={index}>
                <span
                    className="todo_list_item_text"
                    data-testid={`todo_list_item_text_${index}`}
                    onClick={() => onItemToggle(index)}>{item.text}</span>
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
