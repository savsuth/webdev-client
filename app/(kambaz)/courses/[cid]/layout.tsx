"use client";

import { ReactNode, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import * as client from "../client";
import { useAccountContext } from "../../account/AccountContext";

export default function CoursesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { cid } = useParams();
  const courseId = typeof cid === "string" ? cid : "";
  const [course, setCourse] = useState<client.Course>();
  const [showCourseNav, setShowCourseNav] = useState(true);
  const { currentUser } = useAccountContext();
  const router = useRouter();
  // A signed-in user may open only enrolled courses; signed-out visitors keep the prototype open.
  useEffect(() => {
    const fetchCourse = async () => {
      const courses: client.Course[] = currentUser
        ? await client.findMyCourses()
        : await client.fetchAllCourses();
      const found = courses.find((c) => c._id === courseId);
      setCourse(found);
      if (currentUser && !found) router.push("/dashboard");
    };
    fetchCourse();
  }, [currentUser, courseId, router]);

  return (
    <div id="wd-courses">
      <h2 className="text-red-600">
        <FaAlignJustify
          className="me-4 mb-1 inline cursor-pointer text-xl"
          onClick={() => setShowCourseNav(!showCourseNav)}
          title="Toggle course navigation"
          id="wd-course-nav-toggle"
        />
        <Breadcrumb course={course} />
        <span className="ms-2 text-base text-neutral-500">({course?._id})</span>
      </h2>
      <hr />
      {/* The course sidebar hides below md, at the same width as the Kambaz sidebar. */}
      <div className="flex gap-4">
        {showCourseNav ? (
          <div className="hidden w-[140px] shrink-0 md:block">
            <CourseNavigation cid={courseId} />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
