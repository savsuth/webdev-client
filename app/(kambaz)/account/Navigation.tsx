"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccountContext } from "./AccountContext";

export default function AccountNavigation() {
  const { currentUser } = useAccountContext();
  // Signed in shows only Profile; signed out shows only Signin and Signup.
  const links = currentUser
    ? (["profile"] as const)
    : (["signin", "signup"] as const);
  const pathname = usePathname() ?? "";
  // Reuses the Course Navigation list-group styles from kambaz.css for a consistent account sidebar.
  const linkClass = (href: string) =>
    pathname === href
      ? "list-group-item active border-0"
      : "list-group-item border-0 text-red-600";
  return (
    <div id="wd-account-navigation" className="wd list-group rounded-none text-lg">
      {links.map((link) => (
        <Link
          key={link}
          href={`/account/${link}`}
          id={`wd-account-${link}-link`}
          className={linkClass(`/account/${link}`)}
        >
          {link === "signin" ? "Signin" : link === "signup" ? "Signup" : "Profile"}
        </Link>
      ))}
    </div>
  );
}
