import { useState } from "react";
import Lesson from "./Lesson";
import ModuleControlButtons from "./ModuleControlButtons";
import type { CourseModule } from "../../client";

export default function Module({
  module,
  updateModule,
  deleteModule,
  editModule,
}: {
  module: CourseModule;
  updateModule: (module: CourseModule) => void;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  const [name, setName] = useState(module.name);
  return (
    <li className="wd-module mb-5 overflow-hidden border border-neutral-400 p-0 text-xl">
      <div className="wd-title flex items-center justify-between bg-neutral-200 p-3 ps-2">
        {/* While editing, the name is a local draft; Enter saves it on the server and ends editing. */}
        {module.editing ? (
          <input
            className="w-1/2 rounded border border-neutral-300 px-2 py-1 text-base"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateModule({ ...module, name, editing: false });
              }
            }}
          />
        ) : (
          <span>{module.name}</span>
        )}
        <ModuleControlButtons
          moduleId={module._id}
          deleteModule={deleteModule}
          editModule={editModule}
        />
      </div>
      <ul className="wd-lessons m-0 list-none p-0">
        {module.lessons?.map((lesson) => (
          <Lesson key={lesson._id} title={lesson.name} />
        ))}
      </ul>
    </li>
  );
}
