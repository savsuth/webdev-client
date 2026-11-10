"use client";

import { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const FIELD = "mb-2 me-2 rounded border border-neutral-300 px-3 py-1.5";
const LINK =
  "mb-2 me-2 inline-block rounded bg-blue-600 px-3 py-1.5 text-sm text-white no-underline";

export default function WorkingWithRemoteArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    completed: false,
  });
  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className={LINK} href={API}>
        Get Todos
      </a>
      <h4>Retrieving an Item from an Array by ID</h4>
      <a id="wd-retrieve-todo-by-id" className={LINK} href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <input
        id="wd-todo-id"
        className={FIELD}
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <h4>Filtering Array Items</h4>
      <a
        id="wd-retrieve-completed-todos"
        className={LINK}
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <h4>Creating new Items in an Array</h4>
      <a id="wd-create-todo" className={LINK} href={`${API}/create`}>
        Create Todo
      </a>
      <h4>Removing from an Array</h4>
      <a id="wd-remove-todo" className={LINK} href={`${API}/${todo.id}/delete`}>
        Remove Todo with ID = {todo.id}
      </a>
      <h4>Updating an Item in an Array</h4>
      <a
        id="wd-update-todo-title"
        className={LINK}
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Todo
      </a>
      <input
        className={FIELD}
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <a
        id="wd-update-todo-completed"
        className={LINK}
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Complete Todo ID = {todo.id}
      </a>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />
      <br />
      <a
        id="wd-update-todo-description"
        className={LINK}
        href={`${API}/${todo.id}/description/${todo.description}`}
      >
        Describe Todo ID = {todo.id}
      </a>
      <input
        className={FIELD}
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <hr />
    </div>
  );
}
