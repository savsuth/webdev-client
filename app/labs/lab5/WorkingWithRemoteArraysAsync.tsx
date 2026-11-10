"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaPencilAlt, FaPlusCircle, FaTrash } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";

export default function WorkingWithRemoteArraysAsync() {
  const [todos, setTodos] = useState<client.Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const removeTodo = async (todo: client.Todo) => {
    setTodos(await client.removeTodo(todo));
  };
  const createNewTodo = async () => {
    setTodos(await client.createNewTodo());
  };
  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos([...todos, newTodo]);
  };
  // The server reports a missing todo as a 404 whose body carries the message to display.
  const showError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      setErrorMessage(error.response?.data.message);
    }
  };
  const deleteTodo = async (todo: client.Todo) => {
    try {
      await client.deleteTodo(todo);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error) {
      showError(error);
    }
  };
  const editTodo = (todo: client.Todo) => {
    setTodos(todos.map((t) => (t.id === todo.id ? { ...todo, editing: true } : t)));
  };
  const updateTodo = async (todo: client.Todo) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error) {
      showError(error);
    }
  };
  useEffect(() => {
    const fetchTodos = async () => {
      setTodos(await client.fetchTodos());
    };
    fetchTodos();
  }, []);
  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (
        <p
          id="wd-todo-error-message"
          className="rounded bg-red-100 px-3 py-2 text-red-800"
        >
          {errorMessage}
        </p>
      )}
      <h4 className="flex items-center gap-2">
        Todos
        <FaPlusCircle
          onClick={createNewTodo}
          id="wd-create-todo"
          className="cursor-pointer text-green-600"
        />
        <FaPlusCircle
          onClick={postNewTodo}
          id="wd-post-todo"
          className="cursor-pointer text-blue-600"
        />
      </h4>
      <ul className="m-0 max-w-md list-none p-0">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 border border-neutral-300 px-3 py-2"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })}
            />
            {todo.editing ? (
              <input
                className="rounded border border-neutral-300 px-2 py-1"
                value={todo.title}
                onChange={(e) => updateTodo({ ...todo, title: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
              />
            ) : (
              <span className={todo.completed ? "line-through" : ""}>
                {todo.title}
              </span>
            )}
            <FaPencilAlt
              onClick={() => editTodo(todo)}
              className="ms-auto cursor-pointer text-blue-600"
            />
            <FaTrash
              onClick={() => removeTodo(todo)}
              id="wd-remove-todo"
              className="cursor-pointer text-red-600"
            />
            <TiDelete
              onClick={() => deleteTodo(todo)}
              id="wd-delete-todo"
              className="cursor-pointer text-2xl text-red-600"
            />
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
