import Link from "next/link";

// Shared class strings keep every label and field in the editor styled the same way.
const LABEL = "mb-1 block font-medium";
const FIELD = "w-full rounded border border-neutral-300 px-3 py-2 font-sans";

export default async function AssignmentEditor({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  // Every assignment opens the same editor content for now; a later chapter
  // will load details for the specific aid.
  return (
    <div id="wd-assignments-editor" className="max-w-3xl">
      <div className="mb-4">
        <label htmlFor="wd-name" className={LABEL}>
          Assignment Name
        </label>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" className={FIELD} />
      </div>
      <div className="mb-4">
        <label htmlFor="wd-description" className={LABEL}>
          Description
        </label>
        <textarea
          id="wd-description"
          rows={5}
          className={FIELD}
          defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Vercel. The landing page should include the following:"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="wd-points" className={LABEL}>
          Points
        </label>
        <input id="wd-points" defaultValue={100} className={FIELD} />
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
            defaultValue="2026-09-27"
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
                defaultValue="2026-09-14"
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
                defaultValue="2026-09-27"
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
        <Link
          href={`/courses/${cid}/assignments`}
          id="wd-save"
          className="rounded bg-red-600 px-3 py-2 text-white no-underline"
        >
          Save
        </Link>
      </div>
    </div>
  );
}
