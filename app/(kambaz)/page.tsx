import Link from "next/link";

// The landing page names who built the project and where its code lives, and is open without signing in.
export default function Kambaz() {
  return (
    <div id="wd-landing" className="max-w-3xl">
      <h1 className="mt-0">Kambaz Quizzes</h1>
      <p>
        Faculty build and publish quizzes for their courses, and students take them and see their
        scores.
      </p>
      <h2 className="mb-1">Team</h2>
      <p id="wd-landing-team" className="mt-0">
        Aasav Suthar, CS 5610, Section 1
      </p>
      <h2 className="mb-1">Repositories</h2>
      <ul className="mt-0">
        <li>
          <a
            id="wd-landing-client-repo"
            href="https://github.com/savsuth/webdev-client"
            target="_blank"
            rel="noreferrer"
          >
            Client (Next.js): github.com/savsuth/webdev-client
          </a>
        </li>
        <li>
          <a
            id="wd-landing-server-repo"
            href="https://github.com/savsuth/webdev-server"
            target="_blank"
            rel="noreferrer"
          >
            Server (Node.js and Express): github.com/savsuth/webdev-server
          </a>
        </li>
      </ul>
      <Link
        id="wd-landing-signin"
        href="/account/signin"
        className="inline-block rounded bg-red-600 px-3 py-2 text-white no-underline"
      >
        Sign in
      </Link>
    </div>
  );
}
