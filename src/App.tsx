import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

type todoObject={ id: number; text: string; }[]

function App() {
  const [todos, setTodos] = useState<todoObject>([
  ]);
  const [text, setText] = useState<string>("");
const [todoId,setTodoId]=useState(todos.length+1)

  const addTodo = () => {
    if(text!==''){
    setTodos([...todos, {id:todoId,text:text}]);
    setTodoId(todoId+1)
    setText('')}
  };

  const removeTodo=(i)=>{
setTodos(todos.filter((todo)=>(todo!==i)))
console.log(todos)
  }
  const todoValue = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <h1>TodoList</h1>
      <div>
        <input type="text" value={text} onChange={todoValue} />
        <button onClick={() => addTodo()}>追加</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}<button onClick={()=>removeTodo(todo)} className="remove">削除</button></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
