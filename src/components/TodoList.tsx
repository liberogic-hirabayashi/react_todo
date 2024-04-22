import { useState } from "react";
type todoObject={ id: number; text: string; status:string }[]

function TodoList() {
  const [todos, setTodos] = useState<todoObject>([]);
  const [text, setText] = useState<string>("");
  const [todoId, setTodoId] = useState<number>(todos.length + 1);
  const [status,setStatus]=useState('Not started')

  const addTodo = () => {
    if (text !== "") {
      setTodos([...todos, { id: todoId, text: text,status:status }]);
      setTodoId(todoId + 1);
      setText("");
      console.log(todos)
    }

  };

  const removeTodo = (i) => {
    setTodos(todos.filter((todo) => todo !== i));
    console.log(todos);
  };
  const todoValue = (e) => {
    setText(e.target.value);
  };
  const todoStatus=(e)=>{
    const value=e.target.value
    setStatus(value)
  }


  return (
    <>
      <div>
        <input type="text" value={text} onChange={todoValue} />
        
        <button onClick={() => addTodo()}>追加</button>
      </div>
      
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}：
            {todo.status}
            <select name="status" onChange={()=>todoStatus}>
          <option value="Not started">Not started</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
            <button onClick={() => removeTodo(todo)} className="remove">
              削除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
