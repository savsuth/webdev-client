// Reuse the Modules route's component so Home shows the same module list
// without duplicating its markup.
import Modules from "../modules/page";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home" className="flex gap-4">
      <div className="min-w-0 flex-1">
        <Modules />
      </div>
      {/* Course Status hides first, below lg, before the sidebars hide at md. */}
      <div className="hidden w-[250px] shrink-0 lg:block">
        <CourseStatus />
      </div>
    </div>
  );
}
