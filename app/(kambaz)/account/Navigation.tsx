"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname() ?? "";
  // Reuses the Course Navigation list-group styles from kambaz.css for a consistent account sidebar.
  const linkClass = (href: string) =>
    pathname === href
      ? "list-group-item active border-0"
      : "list-group-item border-0 text-red-600";
  return (
    <div id="wd-account-navigation" className="wd list-group rounded-none text-lg">
      <Link href="/account/signin" className={linkClass("/account/signin")}>
        Signin
      </Link>
      <Link href="/account/signup" className={linkClass("/account/signup")}>
        Signup
      </Link>
      <Link href="/account/profile" className={linkClass("/account/profile")}>
        Profile
      </Link>
    </div>
  );
}
