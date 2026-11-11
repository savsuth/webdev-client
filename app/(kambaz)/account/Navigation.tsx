"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccountContext } from "./AccountContext";

export default function AccountNavigation() {
  const { currentUser } = useAccountContext();
  // Signed in shows Profile, and Users for an administrator; signed out shows only Signin and Signup.
  const links = !currentUser
    ? ["signin", "signup"]
    : currentUser.role === "ADMIN"
      ? ["profile", "users"]
      : ["profile"];
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
          {link[0].toUpperCase() + link.slice(1)}
        </Link>
      ))}
    </div>
  );
}
