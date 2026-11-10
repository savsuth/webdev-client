"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaPlus, FaSearch } from "react-icons/fa";
import AssignmentItem from "./AssignmentItem";
import * as client from "./client";

export default function Assignments() {
  // Use the course identifier from the route to select and link this course's assignments.
  const cid = String(useParams().cid);
  const [assignments, setAssignments] = useState<client.Assignment[]>([]);
  useEffect(() => {
    const fetchAssignments = async () => {
      setAssignments(await client.findAssignmentsForCourse(cid));
    };
    fetchAssignments();
  }, [cid]);
  const onDeleteAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    setAssignments(assignments.filter((a) => a._id !== assignmentId));
  };
  return (
    <div id="wd-assignments">
      {/* The search field and + Group remain placeholders; + Assignment opens the editor for a new row. */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="relative">
          <FaSearch className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500" />
          <input
            placeholder="Search for Assignments"
            id="wd-search-assignment"
            className="rounded border py-1.5 pr-3 pl-9 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            id="wd-add-assignment-group"
            type="button"
            className="inline-flex items-center gap-1 rounded border px-3 py-1.5 text-sm"
          >
            <FaPlus /> Group
          </button>
          <Link
            id="wd-add-assignment"
            href={`/courses/${cid}/assignments/new`}
            className="inline-flex items-center gap-1 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white no-underline"
          >
            <FaPlus /> Assignment
          </Link>
        </div>
      </div>
      <h3
        id="wd-assignments-title"
        className="mb-3 flex items-center justify-between rounded bg-neutral-200 p-3 text-lg"
      >
        <span>ASSIGNMENTS 40% of Total</span>
        <button type="button" className="rounded border bg-white px-2 py-0.5 text-sm">
          <FaPlus />
        </button>
      </h3>
      <ul id="wd-assignment-list" className="m-0 list-none p-0">
        {assignments.map((assignment) => (
          <AssignmentItem
            key={assignment._id}
            cid={cid}
            aid={assignment._id}
            title={assignment.title}
            onDelete={() => onDeleteAssignment(assignment._id)}
            details={`Multiple Modules | Not available until ${assignment.available} | Due ${assignment.due} | ${assignment.points} pts`}
          />
        ))}
      </ul>
    </div>
  );
}
