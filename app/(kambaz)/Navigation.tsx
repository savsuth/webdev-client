"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCircleUser, FaCircleQuestion } from "react-icons/fa6";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ACTIVE = "block bg-white py-3 text-center text-sm text-red-600 no-underline";
const IDLE = "block bg-black py-3 text-center text-sm text-white no-underline";

const LINKS = [
  { label: "Dashboard", path: "/dashboard", icon: AiOutlineDashboard },
  { label: "Courses", path: "/dashboard", icon: LiaBookSolid },
  { label: "Calendar", path: "/calendar", icon: IoCalendarOutline },
  { label: "Inbox", path: "/inbox", icon: FaInbox },
  { label: "Labs", path: "/labs", icon: LiaCogSolid },
  { label: "History", path: "/history", icon: IoCalendarOutline },
  { label: "Help", path: "/labs", icon: FaCircleQuestion },
] as const;

export default function KambazNavigation() {
  // The current route decides which tile gets the white active highlight.
  const pathname = usePathname() ?? "";
  const accountActive = pathname.includes("/account");
  return (
    // Fixed to the window and hidden below md; kambaz.css offsets the page content by the same 120px.
    <nav
      id="wd-kambaz-navigation"
      className="fixed bottom-0 top-0 z-20 hidden w-[120px] bg-black md:block"
    >
      <a
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
        rel="noreferrer"
        className="block bg-black py-3 text-center no-underline"
      >
        <img
          src="/images/NEU.png"
          alt="Northeastern University"
          className="mx-auto w-[75px]"
        />
      </a>
      <Link
        href="/account"
        id="wd-account-link"
        className={accountActive ? ACTIVE : IDLE}
      >
        <FaRegCircleUser
          className={
            accountActive
              ? "inline-block text-3xl text-red-600"
              : "inline-block text-3xl text-white"
          }
        />
        <br />
        Account
      </Link>
      {LINKS.map((link) => {
        // Courses shares the dashboard path, so it is active only while a course is open.
        const active =
          link.label === "Courses"
            ? pathname.includes("/courses")
            : pathname.includes(link.path);
        const Icon = link.icon;
        return (
          <Link
            key={link.label}
            href={link.path}
            id={`wd-${link.label.toLowerCase()}-link`}
            className={active ? ACTIVE : IDLE}
          >
            <Icon className="inline-block text-3xl text-red-600" />
            <br />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
