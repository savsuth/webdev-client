"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as client from "../client";
import { useAccountContext, type User } from "../AccountContext";

const FIELD = "mb-2 w-full rounded border border-neutral-300 px-3 py-2";

export default function Profile() {
  const { setCurrentUser } = useAccountContext();
  // The form edits a local copy of the signed-in user, so typing does not write the context.
  const [profile, setProfile] = useState<User | null>(null);
  const router = useRouter();

  // Retrieve the profile from the server session, so a reload still shows it; with no session, leave for Sign in.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfile(await client.profile());
      } catch {
        router.push("/account/signin");
      }
    };
    fetchProfile();
  }, [router]);

  const updateProfile = async () => {
    if (!profile) return;
    const user = await client.updateUser(profile);
    setCurrentUser(user);
  };

  const signout = async () => {
    await client.signout();
    setCurrentUser(null);
    router.push("/account/signin");
  };

  if (!profile) return null;
  return (
    <div id="wd-profile-screen" className="max-w-sm">
      <h1 className="mb-3 text-2xl font-semibold">Profile</h1>
      <input
        id="wd-username"
        placeholder="username"
        value={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        className={`wd-username ${FIELD}`}
      />
      <input
        id="wd-password"
        placeholder="password"
        type="password"
        value={profile.password}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        className={`wd-password ${FIELD}`}
      />
      <input
        id="wd-firstname"
        placeholder="First Name"
        value={profile.firstName}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        className={FIELD}
      />
      <input
        id="wd-lastname"
        placeholder="Last Name"
        value={profile.lastName}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        className={FIELD}
      />
      <input
        id="wd-email"
        type="email"
        placeholder="Email"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        className={FIELD}
      />
      <select
        id="wd-role"
        value={profile.role}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        className={FIELD}
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      {/* Update saves the draft on the server, then the context, so Account and Dashboard see the edited user. */}
      <button
        type="button"
        onClick={updateProfile}
        id="wd-update-profile-btn"
        className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-center text-white"
      >
        Update
      </button>
      <button
        type="button"
        onClick={signout}
        id="wd-signout-btn"
        className="block w-full rounded bg-red-600 px-3 py-2 text-center text-white"
      >
        Sign out
      </button>
    </div>
  );
}
