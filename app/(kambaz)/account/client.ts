import axios from "axios";
import type { User } from "./AccountContext";

// Include credentials so the browser sends the session cookie with each request.
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const signin = async (credentials: { username: string; password: string }) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};
export const signup = async (user: User) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};
export const updateUser = async (user: User) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};
export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};
// The People table creates a user without signing in as that user.
export const createUser = async (user: User) => {
  const response = await axios.post(USERS_API, user);
  return response.data;
};
