"use client";

import { useEffect, useState } from "react";
import * as client from "./client";

const FIELD = "mb-2 block w-full max-w-sm rounded border border-neutral-300 px-3 py-1.5";

export default function WorkingWithRemoteObjectsAsync() {
  const [assignment, setAssignment] = useState<client.Assignment>({
    id: 0,
    title: "",
    description: "",
    due: "",
    completed: false,
    score: 0,
  });
  const updateTitle = async () => {
    setAssignment(await client.updateTitle(assignment.title));
  };
  useEffect(() => {
    const fetchAssignment = async () => {
      setAssignment(await client.fetchAssignment());
    };
    fetchAssignment();
  }, []);
  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>
      <input
        className={FIELD}
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />
      <textarea
        className={FIELD}
        rows={3}
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />
      <input
        type="date"
        className={FIELD}
        value={assignment.due}
        onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
      />
      <label className="mb-2 block">
        <input
          type="checkbox"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        Completed
      </label>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
        onClick={updateTitle}
      >
        Update Title
      </button>
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
