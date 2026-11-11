"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as client from "../client";
import { emptyUser, useAccountContext } from "../AccountContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [errorMessage, setErrorMessage] = useState("");
  const { setCurrentUser } = useAccountContext();
  const router = useRouter();

  // The server creates the user and signs them in; a taken username comes back as a 400.
  const signup = async () => {
    if (!username || !password) return;
    try {
      const user = await client.signup({ ...emptyUser, username, password, role });
      setCurrentUser(user);
      router.push("/account/profile");
    } catch {
      setErrorMessage("Username already in use");
    }
  };

  return (
    <div id="wd-signup-screen" className="max-w-sm">
      <h1 className="mb-3 text-2xl font-semibold">Sign up</h1>
      <input
        id="wd-username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="wd-username mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <input
        id="wd-password"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="wd-password mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <input
        placeholder="verify password"
        type="password"
        className="wd-password-verify mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      {/* The role decides what the new user may do: faculty create courses, students enroll in them. */}
      <select
        id="wd-role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="wd-role mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
      </select>
      {errorMessage && (
        <p id="wd-signup-error" className="mb-2 rounded bg-red-100 px-3 py-2 text-red-800">
          {errorMessage}
        </p>
      )}
      <button
        type="button"
        onClick={signup}
        id="wd-signup-btn"
        className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-center text-white"
      >
        Sign up
      </button>
      <Link href="/account/signin" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
