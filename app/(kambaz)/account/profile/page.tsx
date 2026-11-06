"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext, type User } from "../AccountContext";

const FIELD = "mb-2 w-full rounded border border-neutral-300 px-3 py-2";

export default function Profile() {
  const { currentUser, setCurrentUser } = useAccountContext();
  // The form edits a local copy of the signed-in user, so typing does not write the context.
  const [profile, setProfile] = useState<User | null>(currentUser);
  const router = useRouter();

  // With no signed-in user, leave for Sign in; the effect only performs the navigation.
  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signin");
    }
  }, [currentUser, router]);

  const signout = () => {
    setCurrentUser(null);
    router.push("/account/signin");
  };

  if (!currentUser || !profile) return null;
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
      {/* Update writes the draft back to the context, so Account and Dashboard see the edited user. */}
      <button
        type="button"
        onClick={() => setCurrentUser(profile)}
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
