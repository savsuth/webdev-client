import { ReactNode } from "react";
import CourseNavigation from "./Navigation";

export default async function CoursesLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ cid: string }>;
}>) {
  // Dynamic route segments arrive as a Promise in this App Router version.
  const { cid } = await params;
  return (
    <div id="wd-courses">
      <h2 className="text-red-600">Courses {cid}</h2>
      <hr />
      {/* The course sidebar hides below md, at the same width as the Kambaz sidebar. */}
      <div className="flex gap-4">
        <div className="hidden w-[140px] shrink-0 md:block">
          <CourseNavigation cid={cid} />
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
