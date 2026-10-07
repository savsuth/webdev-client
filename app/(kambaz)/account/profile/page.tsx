import Link from "next/link";

const FIELD = "mb-2 w-full rounded border border-neutral-300 px-3 py-2";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="max-w-sm">
      <h1 className="mb-3 text-2xl font-semibold">Profile</h1>
      <input
        defaultValue="alice"
        placeholder="username"
        className={`wd-username ${FIELD}`}
      />
      <input
        defaultValue="123"
        placeholder="password"
        type="password"
        className={`wd-password ${FIELD}`}
      />
      <input
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className={FIELD}
      />
      <input
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className={FIELD}
      />
      <input defaultValue="2000-01-01" type="date" id="wd-dob" className={FIELD} />
      <input
        defaultValue="alice@wonderland"
        type="email"
        id="wd-email"
        className={FIELD}
      />
      <select defaultValue="FACULTY" id="wd-role" className={FIELD}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Link
        href="/account/signin"
        className="block w-full rounded bg-red-600 px-3 py-2 text-center text-white no-underline"
      >
        Sign out
      </Link>
    </div>
  );
}
