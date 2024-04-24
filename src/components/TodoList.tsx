import { useState, useEffect } from "react";
type TodoObject = { id: number; text: string; status: string }[];

function TodoList() {
  const [todos, setTodos] = useState<TodoObject>([]);
  const [text, setText] = useState<string>("");
  const [todoId, setTodoId] = useState<number>(todos.length + 1);
  const [status, setStatus] = useState<string>("Not started");
  const [edit, setEdit] = useState<boolean>(false);
  const [editId, seteditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<TodoObject>([]);

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "Not started":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "Not started")
          );
          break;
        case "In progress":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "In progress")
          );
          break;
        case "Done":
          setFilteredTodos(todos.filter((todo) => todo.status === "Done"));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);

  const addTodo = () => {
    if (text !== "") {
      setTodos([...todos, { id: todoId, text: text, status: status }]);
      setTodoId(todoId + 1);
      setText("");
      // console.log(todos);
    }
  };

  const removeTodo = (i) => {
    setTodos(todos.filter((todo) => todo !== i));
  };
  const todoValue = (e) => {
    setText(e.target.value);
  };

  const editValue = (e) => {
    setEditText(e.target.value);
  };

  const editTodo = (todo) => {
    setEdit(true);
    setEditText(todo.text);
    seteditId(todo.id);
  };

  const editSave = () => {
    const newArray = todos.map((todo) => {
      return todo.id === editId ? { ...todo, text: editText } : todo;
    });
    setTodos(newArray);
    cancel();
  };

  const cancel = () => {
    setEdit(false);
    setText("");
    seteditId(null);
  };

  const changeStatus = (targetTodo, e) => {
    // console.log(targetTodo)
    const newArray = todos.map((todo) =>
      todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo
    );

    setTodos(newArray);
  };
  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      {edit ? (
        <div>
          <input type="text" value={editText} onChange={editValue} />
          <button onClick={() => editSave()}>編集を保存</button>
          <button onClick={() => cancel()}>キャンセル</button>
        </div>
      ) : (
        <div>
          <input type="text" value={text} onChange={todoValue} />
          <button onClick={() => addTodo()}>追加</button>
          <select name="status" value={filter} onChange={changeFilter}>
            <option value="All">All</option>
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      )}

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            {todo.status === "Not started" && <span>{todo.text}</span>}
            {todo.status === "In progress" && (
              <span className="inProgress">{todo.text}</span>
            )}
            {todo.status === "Done" && (
              <span className="done">{todo.text}</span>
            )}

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
            <button onClick={() => removeTodo(todo)} className="sm-btn">
              削除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
