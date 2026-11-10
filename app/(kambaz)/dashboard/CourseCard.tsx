import Link from "next/link";
import Image from "next/image";
import type { Course } from "../courses/client";
import { useAccountContext } from "../account/AccountContext";

export default function CourseCard({
  course,
  onEdit,
  onDelete,
  enrolled,
  onToggleEnrollment,
}: {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
  enrolled: boolean;
  onToggleEnrollment: () => void;
}) {
  const { currentUser } = useAccountContext();
  return (
    <div className="wd-dashboard-course w-[300px] max-w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <Link
        href={`/courses/${course._id}/home`}
        className="wd-dashboard-course-link block text-neutral-900 no-underline"
      >
        {/* next/image optimizes these local thumbnails; Lab 1 uses plain <img> on purpose to show the raw HTML tag. */}
        <Image
          src={course.image}
          width={300}
          height={160}
          alt={course.name}
          className="h-40 w-full object-cover"
        />
        <div className="p-4">
          <h5 className="wd-dashboard-course-title m-0 mb-2 truncate text-lg font-semibold whitespace-nowrap">
            {course.name}
          </h5>
          {/* A fixed description height keeps every card the same height regardless of description length. */}
          <p className="wd-dashboard-course-description m-0 mb-3 h-[100px] overflow-hidden text-sm text-neutral-600">
            {course.description}
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
          >
            Go
          </button>
          {/* Both buttons sit inside the card's Link, so preventDefault keeps the click from opening the course. */}
          <button
            type="button"
            id="wd-edit-course-click"
            className="ms-2 inline-flex items-center justify-center rounded bg-yellow-400 px-3 py-1.5 text-sm font-medium"
            onClick={(event) => {
              event.preventDefault();
              onEdit();
            }}
          >
            Edit
          </button>
          <button
            type="button"
            id="wd-delete-course-click"
            className="ms-2 inline-flex items-center justify-center rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
            onClick={(event) => {
              event.preventDefault();
              onDelete();
            }}
          >
            Delete
          </button>
          {currentUser && (
            <button
              type="button"
              className={`wd-enrollment-toggle mt-2 block rounded px-3 py-1.5 text-sm font-medium text-white ${
                enrolled ? "bg-red-600" : "bg-green-600"
              }`}
              onClick={(event) => {
                event.preventDefault();
                onToggleEnrollment();
              }}
            >
              {enrolled ? "Unenroll" : "Enroll"}
            </button>
          )}
        </div>
      </Link>
    </div>
  );
}
