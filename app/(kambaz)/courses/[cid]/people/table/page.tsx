"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../Table";
import * as coursesClient from "../../../client";
import * as accountClient from "../../../../account/client";
import {
  emptyUser,
  useAccountContext,
  type User,
} from "../../../../account/AccountContext";

const FIELD = "rounded border border-neutral-300 px-2 py-1";

export default function People() {
  const { cid } = useParams();
  const courseId = String(cid);
  const [users, setUsers] = useState<User[]>([]);
  const [person, setPerson] = useState<User>(emptyUser);
  const { currentUser } = useAccountContext();
  // Only faculty and administrators add people; everyone else reads the list.
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  // Retrieve only the users enrolled in this course from the server.
  const fetchUsers = async () => {
    setUsers(await coursesClient.findUsersForCourse(courseId));
  };
  useEffect(() => {
    const loadUsers = async () => {
      setUsers(await coursesClient.findUsersForCourse(courseId));
    };
    loadUsers();
  }, [courseId]);
  // Adding a person creates the user on the server, then enrolls that user in this course.
  const addPerson = async () => {
    if (!person.firstName && !person.lastName) return;
    // The database requires a unique username and a password, which this form does not ask for.
    const newUser = await accountClient.createUser({
      ...person,
      username: `newuser${Date.now()}`,
      password: "password123",
    });
    await coursesClient.enrollIntoCourse(newUser._id, courseId);
    setUsers([...users, newUser]);
    setPerson(emptyUser);
  };
  return (
    <div id="wd-people">
      {canEdit && (
        <div id="wd-people-add" className="mb-3 flex flex-wrap items-center gap-2">
          <input
            id="wd-people-first-name"
            placeholder="First name"
            className={FIELD}
            value={person.firstName}
            onChange={(e) => setPerson({ ...person, firstName: e.target.value })}
          />
          <input
            id="wd-people-last-name"
            placeholder="Last name"
            className={FIELD}
            value={person.lastName}
            onChange={(e) => setPerson({ ...person, lastName: e.target.value })}
          />
          <select
            id="wd-people-role"
            className={FIELD}
            value={person.role}
            onChange={(e) => setPerson({ ...person, role: e.target.value })}
          >
            <option value="STUDENT">Student</option>
            <option value="TA">TA</option>
            <option value="FACULTY">Faculty</option>
          </select>
          <button
            type="button"
            id="wd-people-add-click"
            className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white"
            onClick={addPerson}
          >
            + People
          </button>
        </div>
      )}
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
