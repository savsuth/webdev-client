import { useState } from "react";
import { useTodosContext } from "./todosContext";

export default function ReactContextTodoList() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodosContext();
  // The draft title and the row being edited are local form state, not shared data.
  const [title, setTitle] = useState("Learn React Context");
  const [editingId, setEditingId] = useState<string | null>(null);
  return (
    <div id="wd-context-todo-list">
      <h3>React Context Todo List</h3>
      <div className="mb-2 flex flex-wrap gap-2">
        <input
          id="wd-context-todo-title"
          className="rounded border border-neutral-300 px-2 py-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="button"
          id="wd-context-add-todo-click"
          className="rounded bg-green-600 px-3 py-1.5 text-sm text-white"
          onClick={() => addTodo(title)}
        >
          Add
        </button>
        <button
          type="button"
          id="wd-context-update-todo-click"
          className="rounded bg-yellow-400 px-3 py-1.5 text-sm"
          onClick={() => {
            if (editingId) updateTodo({ id: editingId, title });
            setEditingId(null);
          }}
        >
          Update
        </button>
      </div>
      <ul className="m-0 max-w-lg list-none p-0">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="mb-1 flex items-center justify-between rounded border border-neutral-200 px-3 py-1"
          >
            <span>{todo.title}</span>
            <span className="flex gap-2">
              <button
                type="button"
                className="rounded bg-yellow-400 px-2 py-0.5 text-sm"
                onClick={() => {
                  setTitle(todo.title);
                  setEditingId(todo.id);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded bg-red-600 px-2 py-0.5 text-sm text-white"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
