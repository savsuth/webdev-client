import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const TODOS_API = `${HTTP_SERVER}/lab6/todos`;

export type Todo = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
};

export const fetchStatus = async () => {
  const response = await axios.get(`${HTTP_SERVER}/lab6/status`);
  return response.data;
};
// With no argument every todo is returned; otherwise only those with that completed value.
export const fetchTodos = async (completed?: boolean) => {
  const url =
    completed === undefined ? TODOS_API : `${TODOS_API}?completed=${completed}`;
  const response = await axios.get(url);
  return response.data;
};
export const fetchTodoById = async (id: string) => {
  const response = await axios.get(`${TODOS_API}/${id}`);
  return response.data;
};
export const createTodo = async (todo: { title: string; completed: boolean }) => {
  const response = await axios.post(TODOS_API, todo);
  return response.data;
};
export const updateTodo = async (id: string, todo: { completed: boolean }) => {
  const response = await axios.put(`${TODOS_API}/${id}`, todo);
  return response.data;
};
export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`${TODOS_API}/${id}`);
  return response.data;
};
