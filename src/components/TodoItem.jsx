import React from "react";

const TodoItem = ({
  id,
  text,
  completed,
  toggleTodoComplete,
  removeTodo,
}) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodoComplete(id)}
      />
      <span>{text}</span>
      <span onClick={() => removeTodo(id)} className="delete">
        &times;
      </span>
    </li>
  );
};

export default TodoItem;
