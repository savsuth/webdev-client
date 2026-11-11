"use client";

import { useEffect, useState } from "react";
import PeopleTable from "../../courses/[cid]/people/Table";
import * as client from "../client";
import { emptyUser, type User } from "../AccountContext";

const FIELD = "w-1/4 rounded border border-neutral-300 px-2 py-1";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
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
      fetchUsers();
    }
  };
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      setUsers(await client.findUsersByPartialName(name));
    } else {
      fetchUsers();
    }
  };
  // The username carries a timestamp, so two new users never share one.
  const createUser = async () => {
    const user = await client.createUser({
      ...emptyUser,
      firstName: "New",
      lastName: `User ${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };
  return (
    <div id="wd-users-screen">
      <h3>Users</h3>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <input
          className={`wd-filter-by-name ${FIELD}`}
          placeholder="Search people"
          value={name}
          onChange={(e) => filterUsersByName(e.target.value)}
        />
        <select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className={`wd-select-role ${FIELD}`}
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
        <button
          type="button"
          id="wd-add-people"
          onClick={createUser}
          className="ms-auto rounded border-0 bg-red-600 px-3 py-1 text-sm font-medium text-white"
        >
          + Users
        </button>
      </div>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
