import { deleteTodo } from "@/api/todos";

function TodoItem({ todo, onDeleted }: { todo: {id: number, title: string}, onDeleted: (id: number) => void }) {
  const handleDelete = async () => {
    await deleteTodo(todo.id);
    onDeleted(todo.id);
  };

  return (
    <li>
      {todo.title}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default TodoItem;