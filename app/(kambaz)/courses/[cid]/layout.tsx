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
  const { currentUser, loading } = useAccountContext();
  const router = useRouter();
  // A course opens only for a signed-in user who created it or is enrolled in it.
  useEffect(() => {
    if (loading) return;
    if (!currentUser) {
      router.push("/account/signin");
      return;
    }
    const fetchCourse = async () => {
      const courses: client.Course[] = await client.findMyCourses();
      const found = courses.find((c) => c._id === courseId);
      setCourse(found);
      if (!found) router.push("/dashboard");
    };
    fetchCourse();
  }, [currentUser, loading, courseId, router]);

  // The course screens load their data from the server, so they wait until the course is confirmed.
  if (!course) return null;
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
