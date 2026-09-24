import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <h2>Aasav Alpeshbhai Suthar</h2>
      <ul>
        <li>
          <Link href="/labs/lab1">Lab 1: HTML Examples</Link>
        </li>
        <li>
          <Link href="/labs/lab2">Lab 2: CSS Basics</Link>
        </li>
        <li>
          <Link href="/labs/lab3">Lab 3: JavaScript Fundamentals</Link>
        </li>
        <li>
          <Link href="/labs/lab4" id="wd-lab4-link">
            Lab 4
          </Link>
        </li>
        <li>
          <Link href="/labs/lab5">Lab 5</Link>
        </li>
        <li>
          <a
            href="https://github.com/savsuth/webdev-client"
            id="wd-github"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repository
          </a>
        </li>
        <li>
          <Link href="/" id="wd-kambaz-link">
            Kambaz
          </Link>
        </li>
      </ul>
    </div>
  );
}
