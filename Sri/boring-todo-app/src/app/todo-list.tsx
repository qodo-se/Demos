import styles from "./page.module.css";
import { TodoItem } from "./todo-item-type";

interface Props {
    dataSource: Array<TodoItem>;
    onItemRemoved: (index: number) => void;
    onItemToggle: (index: number) => void;
}

export default function TodoList(
    { dataSource, onItemRemoved, onItemToggle }: Props
) {
    const listItems = dataSource.map((item, index) => {
        const classNames = [styles.todo_list_item];
        let deleteLink = (<a className={styles.todo_list_item_delete}
            onClick={() => onItemRemoved(index)}>🗑️</a>);
        if (item.completed) {
            classNames.push(styles.todo_list_item_completed);
            deleteLink = (<></>);
        }

        return (
            <li className={classNames.join(" ")}
                key={index}>
                <span onClick={() => onItemToggle(index)}>{item.text}</span>
                {deleteLink}
            </li>
        );
    });
    return (
        <ul className={styles.todo_list}>
            {listItems}
        </ul>
    );
}
