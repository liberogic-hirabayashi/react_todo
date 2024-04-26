import { useState, useEffect } from "react";
import Todo from "./Todo";
import { TodoObject } from "../type";

function TodoList() {
  const [todos, setTodos] = useState<TodoObject>([]);
  const [text, setText] = useState<string>("");
  const [todoId, setTodoId] = useState<number>(todos.length + 1);
  const [status, setStatus] = useState<string>("Not started");
  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<TodoObject>([]);
  const [note, setNote] = useState("");

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
      setNote('')
      // console.log(todos);
    } else {
      setNote("入力してください。");
    }
  };

  const todoValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const editValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const editSave = () => {
    if (editText !== "") {
      const newArray = todos.map((todo) => {
        return todo.id === editId ? { ...todo, text: editText } : todo;
      });
      setTodos(newArray);
      cancel();
      setNote('')
    } else {
      setNote("入力してください。");
    }
  };

  const cancel = () => {
    setEdit(false);
    setText("");
    setEditId(null);
  };

  const changeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <h3 className="text-red">{note}</h3>
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
          <Todo
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            setEdit={setEdit}
            setText={setText}
            setEditText={setEditText}
            setEditId={setEditId}
          />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
