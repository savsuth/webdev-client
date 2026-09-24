import Link from "next/link";

export default function TOC() {
  return (
    <ul>
      <li>
        <Link href="/labs" id="wd-lab1-link">
          Home
        </Link>
      </li>
      <li>
        <Link href="/labs/lab1">Lab 1</Link>
      </li>
      <li>
        <Link href="/labs/lab2">Lab 2</Link>
      </li>
      <li>
        <Link href="/labs/lab3">Lab 3</Link>
      </li>
      <li>
        <Link href="/" id="wd-kambaz-link">
          Kambaz
        </Link>
      </li>
      <li>Aasav Alpeshbhai Suthar</li>
      <li>
        <a
          href="https://webdev-client.vercel.app/book/ch1"
          id="wd-toc-book-link"
          target="_blank"
          rel="noreferrer"
        >
          Chapter 1
        </a>
      </li>
    </ul>
  );
}
