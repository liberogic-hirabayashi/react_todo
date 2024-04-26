import { TodoObject,TodoType } from "../type";

interface Todoprops {
  todo: { id: number; text: string; status: string };
  todos: TodoObject;
  setTodos: (todos: TodoObject) => void;
  setEdit: (edit: boolean) => void;
  setText: (text: string) => void;
  setEditText: (editText: string) => void;
  setEditId: (editId: number) => void;
}

export default function Todo({
  todo,
  todos,
  setTodos,
  setEdit,
  setEditText,
  setEditId,
}: Todoprops) {
  const removeTodo = (i:number) => {
    setTodos(todos.filter((todo) => todo.id !== i));
    setEditText("");
  };

  const editTodo = (todo:TodoType) => {
    setEdit(true);
    setEditText(todo.text);
    setEditId(todo.id);
  };

  const changeStatus = (targetTodo:TodoType, e:React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(targetTodo)
    const newArray = todos.map((todo) =>
      todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo
    );

    setTodos(newArray);
  };

  return (
    <>
      <li key={todo.id}>
        {todo.status === "Not started" && <span>{todo.text}</span>}
        {todo.status === "In progress" && (
          <span className="inProgress">{todo.text}</span>
        )}
        {todo.status === "Done" && <span className="done">{todo.text}</span>}

        <select
          name="status"
          value={todo.status}
          onChange={(e) => {
            changeStatus(todo, e);
          }}
        >
          <option value="Not started">Not started</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
        <button className="sm-btn" onClick={() => editTodo(todo)}>
          編集
        </button>
        <button onClick={() => removeTodo(todo.id)} className="sm-btn">
          削除
        </button>
      </li>
    </>
  );
}
