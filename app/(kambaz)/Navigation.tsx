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

export default function KambazNavigation() {
  // The current route decides which tile gets the white active highlight.
  const pathname = usePathname() ?? "";
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
        className={pathname.startsWith("/account") ? ACTIVE : IDLE}
      >
        <FaRegCircleUser
          className={
            pathname.startsWith("/account")
              ? "inline-block text-3xl text-red-600"
              : "inline-block text-3xl text-white"
          }
        />
        <br />
        Account
      </Link>
      <Link
        href="/dashboard"
        id="wd-dashboard-link"
        className={pathname === "/dashboard" ? ACTIVE : IDLE}
      >
        <AiOutlineDashboard className="inline-block text-3xl text-red-600" />
        <br />
        Dashboard
      </Link>
      <Link
        href="/dashboard"
        id="wd-course-link"
        className={pathname.startsWith("/courses") ? ACTIVE : IDLE}
      >
        <LiaBookSolid className="inline-block text-3xl text-red-600" />
        <br />
        Courses
      </Link>
      <Link
        href="/calendar"
        id="wd-calendar-link"
        className={pathname.startsWith("/calendar") ? ACTIVE : IDLE}
      >
        <IoCalendarOutline className="inline-block text-3xl text-red-600" />
        <br />
        Calendar
      </Link>
      <Link
        href="/inbox"
        id="wd-inbox-link"
        className={pathname.startsWith("/inbox") ? ACTIVE : IDLE}
      >
        <FaInbox className="inline-block text-3xl text-red-600" />
        <br />
        Inbox
      </Link>
      <Link href="/labs" id="wd-labs-link" className={IDLE}>
        <LiaCogSolid className="inline-block text-3xl text-red-600" />
        <br />
        Labs
      </Link>
      <Link href="/labs" id="wd-ai-nav-help" className={IDLE}>
        <FaCircleQuestion className="inline-block text-3xl text-red-600" />
        <br />
        Help
      </Link>
    </nav>
  );
}
