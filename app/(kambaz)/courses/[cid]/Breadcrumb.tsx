"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname() ?? "";
  const section = pathname.split("/").pop() ?? "";
  // The People screen lives at people/table, so its last segment is renamed for the heading.
  const label =
    section === "table"
      ? "People"
      : section.charAt(0).toUpperCase() + section.slice(1);
  return (
    <span>
      {course?.name} &gt; {label}
    </span>
  );
}
