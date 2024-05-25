import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import TodoList from "./components/TodoList";
import InputFiel from "./components/InputFiel";
import { addNewTodo, fetchTodos } from "./components/store/todoSlice";

function App() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.todos);
  const [text, setText] = useState("");

  const handleAction = () => {
    if (text.trim().length) 
    dispatch(addNewTodo(text));
    setText("");
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="App-container">
        <InputFiel
          text={text}
          handleInput={setText}
          handleSubmit={handleAction}
        />
        {status === 'loading' && <h2>Loading...</h2>}
        {error && <h2>An error occured: {error}</h2>}
        <TodoList />
      </div>
    </div>
  );
}

export default App;
