import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import InputFiel from "./components/InputFiel";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim().length) {
      setTodos([
        ...todos,
        {
          id: new Date().toISOString(),
          text,
          completed: false,
        },
      ]);
    }
    setText("");
  };

  const removeTodo = (todoId) => {
    if (todos) setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const toggleTodoComplete = (todoId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== todoId) return todo;
        return {
          ...todo,
          completed: !todo.completed,
        };
      })
    );
  };
  return (
    <div className="App">
      <div className="App-container">
        <InputFiel text={text} handleInput={setText} handleSubmit={addTodo}/>
        <TodoList
          todos={todos}
          toggleTodoComplete={toggleTodoComplete}
          removeTodo={removeTodo}
        />
      </div>
    </div>
  );
}

export default App;
