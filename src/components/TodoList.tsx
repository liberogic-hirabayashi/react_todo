import { useState } from "react";
type todoObject = { id: number; text: string; status: string }[];

function TodoList() {
  const [todos, setTodos] = useState<todoObject>([]);
  const [text, setText] = useState<string>("");
  const [todoId, setTodoId] = useState<number>(todos.length + 1);
  const [status, setStatus] = useState<string>("Not started");
  const [edit, setEdit] = useState<boolean>(true);
  const [editId, seteditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const addTodo = () => {
    if (text !== "") {
      setTodos([...todos, { id: todoId, text: text, status: status }]);
      setTodoId(todoId + 1);
      setText("");
    }
  };

  const removeTodo = (i) => {
    setTodos(todos.filter((todo) => todo !== i));
    console.log(todos);
  };
  const todoValue = (e) => {
    setText(e.target.value);
  };

  const editValue = (e) => {
    setEditText(e.target.value);
  };

  const editTodo = (todo) => {
    setEdit(false);
    setEditText(todo.text);
    seteditId(todo.id);
  };

  const editSave = () => {
    const newArray = todos.map((todo) => {
     return todo.id === editId ? { ...todo, text: editText } : todo;
    });
    console.log(newArray)
    setTodos(newArray);
    cancel();
  };

  const cancel = () => {
    setEdit(true);
    setText("");
    seteditId(null);
  };

  return (
    <>
      {edit ? (
        <div>
          <input type="text" value={text} onChange={todoValue} />
          <button onClick={() => addTodo()}>追加</button>
        </div>
      ) : (
        <div>
          <input type="text" value={editText} onChange={editValue} />
          <button onClick={() => editSave()}>編集を保存</button>
          <button onClick={() => cancel()}>キャンセル</button>
        </div>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            {/* <select name="status" >
          <option value="Not started">Not started</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select> */}
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
