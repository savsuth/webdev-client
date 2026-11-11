"use client";

import { useState } from "react";
import * as client from "./client";

export default function Todos() {
  const [todos, setTodos] = useState<client.Todo[]>([]);
  const [title, setTitle] = useState("Learn Mongoose");
  const [todoById, setTodoById] = useState("");
  const [message, setMessage] = useState("");
  const fetchTodos = async () => {
    const todos = await client.fetchTodos();
    setTodos(todos);
    setMessage(`Retrieved ${todos.length} todos`);
  };
  const fetchCompleted = async () => {
    const todos = await client.fetchTodos(true);
    setTodos(todos);
    setMessage(`Completed: ${todos.length}`);
  };
  const createTodo = async () => {
    await client.createTodo({ title, completed: false });
    await fetchTodos();
  };
  const toggleTodo = async (todo: client.Todo) => {
    await client.updateTodo(todo._id, { completed: !todo.completed });
    await fetchTodos();
  };
  const deleteTodo = async (id: string) => {
    await client.deleteTodo(id);
    await fetchTodos();
  };
  return (
    <div id="wd-lab6-todos">
      <h3>Lab 6 todos (Mongoose CRUD)</h3>
      <div className="mb-2 flex flex-wrap gap-2">
        <button
          type="button"
          id="wd-lab6-fetch-todos"
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
          onClick={fetchTodos}
        >
          Find all
        </button>
        <button
          type="button"
          id="wd-lab6-fetch-completed"
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
          onClick={fetchCompleted}
        >
          Find completed
        </button>
        <button
          type="button"
          id="wd-lab6-create-todo"
          className="rounded bg-green-600 px-3 py-1.5 text-sm text-white"
          onClick={createTodo}
        >
          Create
        </button>
      </div>
      <input
        id="wd-lab6-todo-title"
        className="mb-2 rounded border border-neutral-300 px-2 py-1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p id="wd-lab6-todo-message" className="text-sm text-neutral-600">
        {message}
      </p>
      <ul className="m-0 list-none p-0">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="mb-1 flex flex-wrap items-center gap-2 rounded border border-neutral-200 px-2 py-1"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo)}
              />
              <span className={todo.completed ? "line-through" : undefined}>
                {todo.title}
              </span>
            </label>
            <button
              type="button"
              className="rounded bg-neutral-200 px-2 py-0.5 text-xs"
              onClick={async () =>
                setTodoById(JSON.stringify(await client.fetchTodoById(todo._id)))
              }
            >
              By id
            </button>
            <button
              type="button"
              className="rounded bg-red-600 px-2 py-0.5 text-xs text-white"
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todoById && <pre className="mt-2 overflow-x-auto text-xs">{todoById}</pre>}
      <hr />
    </div>
  );
}
