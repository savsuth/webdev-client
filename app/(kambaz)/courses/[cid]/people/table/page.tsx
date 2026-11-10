"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import * as coursesClient from "../../../client";
import * as accountClient from "../../../../account/client";
import { emptyUser, type User } from "../../../../account/AccountContext";

const FIELD = "rounded border border-neutral-300 px-2 py-1";

export default function PeopleTable() {
  const { cid } = useParams();
  const courseId = String(cid);
  const [users, setUsers] = useState<User[]>([]);
  const [person, setPerson] = useState<User>(emptyUser);
  // Retrieve the users enrolled in this course from the server.
  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(await coursesClient.findUsersForCourse(courseId));
    };
    fetchUsers();
  }, [courseId]);
  // Adding a person creates the user on the server, then enrolls that user in this course.
  const addPerson = async () => {
    if (!person.firstName && !person.lastName) return;
    const newUser = await accountClient.createUser(person);
    await coursesClient.enrollIntoCourse(newUser._id, courseId);
    setUsers([...users, newUser]);
    setPerson(emptyUser);
  };
  const removePerson = async (userId: string) => {
    await coursesClient.unenrollFromCourse(userId, courseId);
    setUsers(users.filter((user) => user._id !== userId));
  };
  return (
    <div id="wd-people-table" className="overflow-x-auto">
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
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-300">
            <th className="p-2">Name</th>
            <th className="p-2">Login ID</th>
            <th className="p-2">Section</th>
            <th className="p-2">Role</th>
            <th className="p-2">Last Activity</th>
            <th className="p-2">Total Activity</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        {/* Only users with an enrollment in the current course appear in the table. */}
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="odd:bg-neutral-50">
              <td className="wd-full-name p-2 text-nowrap">
                <FaUserCircle className="me-2 inline align-middle text-4xl text-neutral-500" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id p-2">{user.loginId}</td>
              <td className="wd-section p-2">{user.section}</td>
              <td className="wd-role p-2">{user.role}</td>
              <td className="wd-last-activity p-2">{user.lastActivity}</td>
              <td className="wd-total-activity p-2">{user.totalActivity}</td>
              <td className="p-2">
                <button
                  type="button"
                  className="wd-people-unenroll rounded bg-neutral-200 px-2 py-0.5 text-xs"
                  onClick={() => removePerson(user._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
