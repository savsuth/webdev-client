import Link from "next/link";
import { FaFileAlt, FaTrash } from "react-icons/fa";

export default function AssignmentItem({
  cid,
  aid,
  title,
  details,
  canEdit,
  onDelete,
}: {
  cid: string;
  aid: string;
  title: string;
  details: string;
  canEdit: boolean;
  onDelete: () => void;
}) {
  return (
    <li className="wd-assignment-list-item mb-3 flex gap-3 border border-neutral-300 border-l-[3px] border-l-green-600 bg-white p-3">
      <FaFileAlt className="mt-1 shrink-0 text-xl text-green-700" />
      <div className="flex-1">
        <Link
          href={`/courses/${cid}/assignments/${aid}`}
          className="wd-assignment-link font-semibold text-neutral-900 no-underline"
        >
          {title}
        </Link>
        <div className="mt-1 text-sm text-neutral-600">{details}</div>
      </div>
      {/* Like the module trash can, but deleting asks for confirmation first; only faculty see it. */}
      {canEdit && (
        <FaTrash
          className="wd-delete-assignment mt-1 shrink-0 cursor-pointer text-red-600"
          title="Delete assignment"
          onClick={() => {
            if (window.confirm(`Are you sure you want to remove ${title}?`)) {
              onDelete();
            }
          }}
        />
      )}
    </li>
  );
}
