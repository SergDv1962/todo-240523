import { useState } from "react";
import { useDispatch } from "react-redux";

import "./App.css";
import TodoList from "./components/TodoList";
import InputFiel from "./components/InputFiel";
import { addTodo } from "./components/store/todoSlice";


function App() {
  const dispatch = useDispatch()
  const [text, setText] = useState("");

  const addTask = () => {
    dispatch(addTodo({ text }));
    setText('');
  }

  return (
    <div className="App">
      <div className="App-container">
        <InputFiel text={text} 
          handleInput={setText}
          handleSubmit={addTask} />
        <TodoList/>
      </div>
    </div>
  );
}

export default App;
