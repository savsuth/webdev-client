"use client";

import { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const FIELD = "mb-2 me-2 rounded border border-neutral-300 px-3 py-1.5";
const LINK =
  "mb-2 me-2 inline-block rounded bg-blue-600 px-3 py-1.5 text-sm text-white no-underline";

export default function WorkingWithRemoteObjects() {
  // The seed values match the server objects, so the first update is a no-op until a field is edited.
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [module, setModule] = useState({
    id: "M101",
    name: "Introduction to Express",
    description: "Routes, requests, and responses",
    course: "CS5610",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className={LINK} href={ASSIGNMENT_API_URL}>
        Get Assignment
      </a>
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className={LINK}
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className={LINK}
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <input
        id="wd-assignment-title"
        className={FIELD}
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />
      <br />
      <a
        id="wd-update-assignment-score"
        className={LINK}
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <input
        id="wd-assignment-score"
        type="number"
        className={FIELD}
        value={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) || 0 })
        }
      />
      <br />
      <a
        id="wd-update-assignment-completed"
        className={LINK}
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>
      <input
        id="wd-assignment-completed"
        type="checkbox"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />
      <h4>Module (On Your Own)</h4>
      <a id="wd-retrieve-module" className={LINK} href={MODULE_API_URL}>
        Get Module
      </a>
      <a
        id="wd-retrieve-module-name"
        className={LINK}
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <br />
      <a
        id="wd-update-module-name"
        className={LINK}
        href={`${MODULE_API_URL}/name/${module.name}`}
      >
        Update Module Name
      </a>
      <input
        id="wd-module-name"
        className={FIELD}
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <br />
      <a
        id="wd-update-module-description"
        className={LINK}
        href={`${MODULE_API_URL}/description/${module.description}`}
      >
        Update Module Description
      </a>
      <input
        id="wd-module-description"
        className={FIELD}
        value={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
      />
      <hr />
    </div>
  );
}
