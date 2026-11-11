import { ReactNode } from "react";
// Lab 6 uses the book's Tailwind classes; reuse Lab 2's utilities-only stylesheet so Preflight does not restyle the other labs.
import "../lab2/tailwind/utilities.css";

export default function Lab6Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
