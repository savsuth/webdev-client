"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../account/client";
import { emptyUser, type User } from "../../../account/AccountContext";

const FIELD = "rounded border border-neutral-300 px-2 py-1";
const ICON_BUTTON = "float-end border-0 bg-transparent";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<User>(emptyUser);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      if (!uid) return;
      setUser(await client.findUserById(uid));
    };
    fetchUser();
  }, [uid]);
  const editUser = () => {
    setName(`${user.firstName} ${user.lastName}`);
    setEditing(true);
  };
  // The first word is the first name; the rest is the last name, which may contain spaces.
  const saveUser = async () => {
    const [firstName, ...rest] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName: rest.join(" ") };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };
  if (!uid) return null;
  return (
    <div className="wd-people-details fixed top-0 end-0 bottom-0 z-20 w-full max-w-sm bg-white p-4 shadow">
      <button
        type="button"
        onClick={onClose}
        className="wd-close-details absolute end-2 top-2 border-0 bg-transparent"
      >
        <IoCloseSharp className="text-3xl" />
      </button>
      <div className="mt-2 text-center">
        <FaUserCircle className="inline text-7xl text-neutral-500" />
      </div>
      <hr />
      <div className="wd-name text-lg text-red-700">
        {!editing && (
          <button type="button" onClick={editUser} className={`wd-edit ${ICON_BUTTON}`}>
            <FaPencil className="text-lg" />
          </button>
        )}
        {editing && (
          <button type="button" onClick={saveUser} className={`wd-save ${ICON_BUTTON}`}>
            <FaCheck className="text-lg" />
          </button>
        )}
        {!editing && (
          <span className="cursor-pointer" onClick={editUser}>
            {user.firstName} {user.lastName}
          </span>
        )}
        {editing && (
          <input
            className={`wd-edit-name w-3/4 ${FIELD}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveUser();
            }}
          />
        )}
      </div>
      <b>Roles:</b>{" "}
      {editing ? (
        <select
          className={`wd-edit-role ${FIELD}`}
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      ) : (
        <span className="wd-roles">{user.role}</span>
      )}
      <br />
      <b>Email:</b>{" "}
      {editing ? (
        <input
          type="email"
          className={`wd-edit-email ${FIELD}`}
          value={user.email ?? ""}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      ) : (
        <span className="wd-email">{user.email}</span>
      )}
      <br />
      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
      <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span>
      <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button
        type="button"
        onClick={() => deleteUser(uid)}
        className="wd-delete float-end rounded border-0 bg-red-600 px-3 py-1 text-sm text-white"
      >
        Delete
      </button>
      <button
        type="button"
        onClick={onClose}
        className="wd-cancel float-end me-2 rounded border-0 bg-neutral-200 px-3 py-1 text-sm"
      >
        Cancel
      </button>
    </div>
  );
}
