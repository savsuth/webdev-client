"use client";

import { useEffect, useState } from "react";
// The Kambaz account client already talks to the users API that this exercise practices.
import * as client from "../../(kambaz)/account/client";
import { emptyUser, type User } from "../../(kambaz)/account/AccountContext";

const FIELD = "rounded border border-neutral-300 px-2 py-1";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const fetchUsers = async () => {
    setUsers(await client.findAllUsers());
  };
  useEffect(() => {
    const loadUsers = async () => {
      setUsers(await client.findAllUsers());
    };
    loadUsers();
  }, []);
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      setUsers(await client.findUsersByRole(role));
    } else {
      await fetchUsers();
    }
  };
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      setUsers(await client.findUsersByPartialName(name));
    } else {
      await fetchUsers();
    }
  };
  const createUser = async () => {
    const newUser = await client.createUser({
      ...emptyUser,
      firstName: "New",
      lastName: `User ${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, newUser]);
  };
  const selectUser = async (userId: string) => {
    const user = await client.findUserById(userId);
    setUser(user);
    setFullName(`${user.firstName} ${user.lastName}`);
    setEditing(false);
  };
  const saveUser = async () => {
    if (!user) return;
    const [firstName, ...rest] = fullName.split(" ");
    const updatedUser = { ...user, firstName, lastName: rest.join(" ") };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    await fetchUsers();
  };
  const deleteUser = async (userId: string) => {
    await client.deleteUser(userId);
    setUser(null);
    await fetchUsers();
  };
  return (
    <div id="wd-lab6-users">
      <h3>Users</h3>
      <div className="mb-2 flex flex-wrap gap-2">
        <button
          type="button"
          id="wd-add-people"
          className="rounded bg-red-600 px-3 py-1.5 text-sm text-white"
          onClick={createUser}
        >
          + Users
        </button>
        <input
          className={`wd-filter-by-name ${FIELD}`}
          placeholder="Search people"
          value={name}
          onChange={(e) => filterUsersByName(e.target.value)}
        />
        <select
          className={`wd-select-role ${FIELD}`}
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-300">
              <th className="p-2">Name</th>
              <th className="p-2">Role</th>
              <th className="p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="odd:bg-neutral-50">
                <td className="wd-full-name p-2">
                  <button
                    type="button"
                    className="text-blue-700 underline"
                    onClick={() => selectUser(u._id)}
                  >
                    <span className="wd-first-name">{u.firstName}</span>{" "}
                    <span className="wd-last-name">{u.lastName}</span>
                  </button>
                </td>
                <td className="wd-role p-2">{u.role}</td>
                <td className="p-2">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {user && (
        <div className="wd-people-details mt-3 rounded border border-neutral-300 p-3">
          <div className="wd-name text-lg text-red-700">
            {editing ? (
              <input
                className={`wd-edit-name w-full max-w-xs ${FIELD}`}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveUser();
                }}
              />
            ) : (
              <span>
                {user.firstName} {user.lastName}
              </span>
            )}
          </div>
          <p>
            <b>Roles:</b> <span className="wd-roles">{user.role}</span>
          </p>
          <p>
            <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
          </p>
          <div className="mt-2 flex gap-2">
            {editing ? (
              <button
                type="button"
                className="wd-save rounded bg-green-600 px-3 py-1 text-sm text-white"
                onClick={saveUser}
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                className="wd-edit rounded bg-yellow-400 px-3 py-1 text-sm"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            )}
            <button
              type="button"
              className="wd-delete rounded bg-red-600 px-3 py-1 text-sm text-white"
              onClick={() => deleteUser(user._id)}
            >
              Delete
            </button>
            <button
              type="button"
              className="wd-cancel rounded bg-neutral-200 px-3 py-1 text-sm"
              onClick={() => setUser(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <hr />
    </div>
  );
}
