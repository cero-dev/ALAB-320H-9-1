import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./components/TodoList";
import "./styles.css";

const initialState = {
  todos: [],
  todo: "",
  edit: false,
  newTitle: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: uuidv4(), title: action.payload, completed: false },
        ],
        todo: "",
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "SET_EDIT":
      return {
        ...state,
        edit: action.payload.id,
        newTitle: action.payload.title,
      };
    case "SET_NEW_TITLE":
      return {
        ...state,
        newTitle: action.payload,
      };
    case "SAVE_EDIT":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.newTitle }
            : todo
        ),
        edit: false,
        newTitle: "",
      };
    case "SET_TODO":
      return {
        ...state,
        todo: action.payload,
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", payload: state.todo });
  }

  return (
    <>
      <div className="mainContent">
        <h1 className="mainHeader">Ultimate Todo-List</h1>
        <form onSubmit={handleSubmit} className="mainForm">
          <input
            value={state.todo}
            type="text"
            onChange={(e) =>
              dispatch({ type: "SET_TODO", payload: e.target.value })
            }
          />
          <button type="submit">Add</button>
        </form>
        <ul className="mainTodoList">
          <TodoList state={state} dispatch={dispatch} />
        </ul>
      </div>
    </>
  );
}
