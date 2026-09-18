import type { ReactNode } from "react";

export default function Lesson({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <li className="wd-lesson">
      <span className="wd-title">{title}</span>
      <ul className="wd-content">{children}</ul>
    </li>
  );
}
