import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodos, toggleStatus } from "./store/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <span>{title}</span>
      <span onClick={() => dispatch(deleteTodos( id ))} className="delete">
        &times;
      </span>
    </li>
  );
};

export default TodoItem;
