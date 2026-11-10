"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Module from "./Module";
import ModulesControls from "./ModulesControls";
import * as client from "../../client";

export default function Modules() {
  const cid = String(useParams().cid);
  const [modules, setModules] = useState<client.CourseModule[]>([]);

  // Use the course identifier from the route to retrieve the corresponding modules.
  useEffect(() => {
    const fetchModules = async () => {
      setModules(await client.findModulesForCourse(cid));
    };
    fetchModules();
  }, [cid]);

  const onCreateModuleForCourse = async (name: string) => {
    const newModule = await client.createModuleForCourse(cid, { name });
    setModules([...modules, newModule]);
  };
  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    setModules(modules.filter((m) => m._id !== moduleId));
  };
  const onUpdateModule = async (module: client.CourseModule) => {
    await client.updateModule(module);
    setModules(modules.map((m) => (m._id === module._id ? module : m)));
  };
  // Editing only switches the name to an input, so it stays in the browser until Enter saves it.
  const editModule = (moduleId: string) => {
    setModules(
      modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)),
    );
  };

  return (
    <div>
      <ModulesControls addModule={onCreateModuleForCourse} />
      <ul id="wd-modules" className="m-0 list-none p-0">
        {modules.map((module) => (
          <Module
            key={module._id}
            module={module}
            updateModule={onUpdateModule}
            deleteModule={onRemoveModule}
            editModule={editModule}
          />
        ))}
      </ul>
    </div>
  );
}
