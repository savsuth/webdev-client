"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseCard from "./CourseCard";
import * as client from "../courses/client";
import { useAccountContext } from "../account/AccountContext";

const emptyCourse: client.Course = {
  _id: "0",
  name: "New Course",
  number: "New Number",
  startDate: "2023-09-10",
  endDate: "2023-12-15",
  department: "D123",
  credits: 4,
  description: "New Description",
  image: "/images/reactjs.jpg",
  term: "Fall 2023",
};

export default function Dashboard() {
  const [courses, setCourses] = useState<client.Course[]>([]);
  // The identifiers of the user's own courses: created for faculty, enrolled for everyone else.
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [course, setCourse] = useState<client.Course>(emptyCourse);
  const { currentUser, loading } = useAccountContext();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const router = useRouter();
  const isFaculty = currentUser?.role === "FACULTY";

  // Retrieve the courses from the server on load, and again when a different user signs in.
  useEffect(() => {
    if (loading) return;
    if (!currentUser) {
      router.push("/account/signin");
      return;
    }
    const fetchCourses = async () => {
      try {
        const myCourses: client.Course[] = await client.findMyCourses();
        // Faculty work only with the courses they created; other users also load every course to enroll in.
        setCourses(
          currentUser.role === "FACULTY"
            ? myCourses
            : await client.fetchAllCourses(),
        );
        setEnrolledIds(myCourses.map((c) => c._id));
      } catch {
        setCourses([]);
      }
    };
    fetchCourses();
  }, [currentUser, loading, router]);

  const onAddCourse = async () => {
    const newCourse = await client.createCourse(course);
    setCourses([...courses, newCourse]);
    setEnrolledIds([...enrolledIds, newCourse._id]);
  };
  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter((c) => c._id !== courseId));
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
  };
  const onToggleEnrollment = async (courseId: string) => {
    if (!currentUser) return;
    if (enrolledIds.includes(courseId)) {
      await client.unenrollFromCourse(currentUser._id, courseId);
      setEnrolledIds(enrolledIds.filter((id) => id !== courseId));
    } else {
      await client.enrollIntoCourse(currentUser._id, courseId);
      setEnrolledIds([...enrolledIds, courseId]);
    }
  };

  // Show only the user's own courses unless a student toggled Enrollments on to browse all of them.
  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((c) => enrolledIds.includes(c._id));

  if (!currentUser) return null;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title" className="flex items-center justify-between">
        Dashboard
        {!isFaculty && (
          <button
            type="button"
            id="wd-enrollments-toggle"
            className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            Enrollments
          </button>
        )}
      </h1>
      <hr />
      {/* Only faculty create and edit courses, so only they get the course form. */}
      {isFaculty && (
        <>
          <h5 className="flex flex-wrap items-center gap-2">
            New Course
            <button
              type="button"
              className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
              id="wd-add-new-course-click"
              onClick={onAddCourse}
            >
              Add
            </button>
            <button
              type="button"
              className="rounded bg-yellow-400 px-3 py-1.5 text-sm font-medium"
              id="wd-update-course-click"
              onClick={onUpdateCourse}
            >
              Update
            </button>
          </h5>
          <input
            className="mb-2 mt-2 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            id="wd-course-name"
          />
          <textarea
            className="mb-2 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
            rows={3}
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            id="wd-course-description"
          />
          <input
            className="mb-2 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
            value={course.number}
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
            id="wd-course-number"
            placeholder="Course number"
          />
          <input
            type="date"
            className="mb-3 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
            value={course.startDate}
            onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
            id="wd-course-start-date"
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>
      <hr />
      {!isFaculty && !showAllCourses && visibleCourses.length === 0 && (
        <p id="wd-dashboard-empty">
          You are not enrolled in any course yet. Click Enrollments to see all
          courses and enroll.
        </p>
      )}
      <div
        id="wd-dashboard-courses"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {visibleCourses.map((c) => (
          <CourseCard
            key={c._id}
            course={c}
            onEdit={() => setCourse(c)}
            onDelete={() => onDeleteCourse(c._id)}
            enrolled={enrolledIds.includes(c._id)}
            onToggleEnrollment={() => onToggleEnrollment(c._id)}
          />
        ))}
      </div>
    </div>
  );
}
