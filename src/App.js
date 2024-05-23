import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
    
  const addTodo = () => {
    if(text.trim().length) {
      setTodos([...todos, {
        id: new Date().toISOString(),
        text,
        completed: false,
      }]);
    }
    setText('');
  }

  const handleDelete =(id) => {
    if (todos) 
      setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="App">
      <div className="App-container">
        <label>
          <input value={text} onChange={e=>setText(e.target.value)}/>
          <button onClick={addTodo}>Add todo</button>
        </label>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input type="checkbox"/>
              <span>{todo.text}</span>
              <span onClick={() => handleDelete(todo.id)} className="delete">&times;</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
