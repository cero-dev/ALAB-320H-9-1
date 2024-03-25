import React from "react";

export default function TodoList({ state, dispatch }) {
  function handleEditChange(event) {
    dispatch({ type: "SET_NEW_TITLE", payload: event.target.value });
  }

  function handleSaveClick(id) {
    dispatch({ type: "SAVE_EDIT", payload: { id, newTitle: state.newTitle } });
  }

  return (
    <>
      {state.todos.map((todo) => (
        <li key={todo.id}>
          {state.edit === todo.id ? (
            <>
              <input
                type="text"
                value={state.newTitle}
                onChange={handleEditChange}
              />
              <button onClick={() => handleSaveClick(todo.id)}>Save</button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  dispatch({ type: "TOGGLE_TODO", payload: todo.id })
                }
              />
              <label>{todo.title}</label>
              <button
                onClick={() =>
                  dispatch({
                    type: "SET_EDIT",
                    payload: { id: todo.id, title: todo.title },
                  })
                }
              >
                Edit
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "DELETE_TODO", payload: todo.id })
                }
                disabled={!todo.completed}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </>
  );
}
