"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import * as client from "../client";

// Shared class strings keep every label and field in the editor styled the same way.
const LABEL = "mb-1 block font-medium";
const FIELD = "w-full rounded border border-neutral-300 px-3 py-2 font-sans";

export default function AssignmentEditor() {
  const params = useParams();
  const cid = String(params.cid);
  const aid = String(params.aid);
  const router = useRouter();
  // The editor works on a local draft: a blank assignment for this course until an existing one is retrieved.
  const [assignment, setAssignment] = useState<client.Assignment>({
    ...client.emptyAssignment,
    course: cid,
  });
  const [isNew, setIsNew] = useState(true);
  // Retrieve the course's assignments and edit the one named in the URL, if it exists.
  useEffect(() => {
    const fetchAssignment = async () => {
      const assignments: client.Assignment[] =
        await client.findAssignmentsForCourse(cid);
      const found = assignments.find((a) => a._id === aid);
      if (found) {
        setAssignment(found);
        setIsNew(false);
      }
    };
    fetchAssignment();
  }, [cid, aid]);
  // Save on the server first, so the list is current when the Assignments screen loads.
  const save = async () => {
    if (isNew) {
      await client.createAssignmentForCourse(cid, assignment);
    } else {
      await client.updateAssignment(assignment);
    }
    router.push(`/courses/${cid}/assignments`);
  };
  return (
    <div id="wd-assignments-editor" className="max-w-3xl">
      <div className="mb-4">
        <label htmlFor="wd-name" className={LABEL}>
          Assignment Name
        </label>
        <input
          id="wd-name"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          className={FIELD}
        />
        <div id="wd-assignment-id" className="mt-1 text-sm text-neutral-600">
          Assignment id: {aid}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="wd-description" className={LABEL}>
          Description
        </label>
        <textarea
          id="wd-description"
          rows={5}
          className={FIELD}
          value={assignment.description}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="wd-points" className={LABEL}>
          Points
        </label>
        <input
          id="wd-points"
          type="number"
          value={assignment.points}
          onChange={(e) =>
            setAssignment({ ...assignment, points: Number(e.target.value) })
          }
          className={FIELD}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="wd-group" className={LABEL}>
          Assignment Group
        </label>
        <select id="wd-group" defaultValue="ASSIGNMENTS" className={FIELD}>
          <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          <option value="QUIZZES">QUIZZES</option>
          <option value="EXAMS">EXAMS</option>
          <option value="PROJECT">PROJECT</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="wd-display-grade-as" className={LABEL}>
          Display Grade as
        </label>
        <select id="wd-display-grade-as" defaultValue="PERCENTAGE" className={FIELD}>
          <option value="PERCENTAGE">Percentage</option>
          <option value="POINTS">Points</option>
          <option value="LETTER">Letter Grade</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="wd-submission-type" className={LABEL}>
          Submission Type
        </label>
        <div className="rounded border border-neutral-300 p-3">
          <select id="wd-submission-type" defaultValue="ONLINE" className={FIELD}>
            <option value="ONLINE">Online</option>
            <option value="ON_PAPER">On Paper</option>
            <option value="NO_SUBMISSION">No Submission</option>
          </select>
          <div className="mt-3 mb-2 font-medium">Online Entry Options</div>
          <div className="flex flex-col gap-2">
            <label htmlFor="wd-text-entry" className="flex items-center gap-2">
              <input type="checkbox" id="wd-text-entry" />
              Text Entry
            </label>
            <label htmlFor="wd-website-url" className="flex items-center gap-2">
              <input type="checkbox" id="wd-website-url" defaultChecked />
              Website URL
            </label>
            <label htmlFor="wd-media-recordings" className="flex items-center gap-2">
              <input type="checkbox" id="wd-media-recordings" />
              Media Recordings
            </label>
            <label htmlFor="wd-student-annotation" className="flex items-center gap-2">
              <input type="checkbox" id="wd-student-annotation" />
              Student Annotation
            </label>
            <label htmlFor="wd-file-upload" className="flex items-center gap-2">
              <input type="checkbox" id="wd-file-upload" />
              File Uploads
            </label>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className={LABEL}>Assign</div>
        <div className="rounded border border-neutral-300 p-3">
          <label htmlFor="wd-assign-to" className={LABEL}>
            Assign to
          </label>
          <input id="wd-assign-to" defaultValue="Everyone" className={`${FIELD} mb-3`} />
          <label htmlFor="wd-due-date" className={LABEL}>
            Due
          </label>
          <input
            type="date"
            id="wd-due-date"
            value={assignment.due}
            onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
            className={`${FIELD} mb-3`}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="wd-available-from" className={LABEL}>
                Available from
              </label>
              <input
                type="date"
                id="wd-available-from"
                value={assignment.available}
                onChange={(e) =>
                  setAssignment({ ...assignment, available: e.target.value })
                }
                className={FIELD}
              />
            </div>
            <div>
              <label htmlFor="wd-available-until" className={LABEL}>
                Until
              </label>
              <input
                type="date"
                id="wd-available-until"
                value={assignment.until ?? ""}
                onChange={(e) =>
                  setAssignment({ ...assignment, until: e.target.value })
                }
                className={FIELD}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="wd-ai-editor-notes" className={LABEL}>
          Sample notes
        </label>
        <textarea id="wd-ai-editor-notes" rows={3} className={FIELD} />
      </div>
      <hr />
      <div className="mt-3 flex justify-end gap-2">
        <Link
          href={`/courses/${cid}/assignments`}
          id="wd-cancel"
          className="rounded bg-neutral-200 px-3 py-2 text-neutral-900 no-underline"
        >
          Cancel
        </Link>
        <button
          type="button"
          onClick={save}
          id="wd-save"
          className="rounded bg-red-600 px-3 py-2 text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}
