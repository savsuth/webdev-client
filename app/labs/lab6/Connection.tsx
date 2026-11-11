"use client";

import { useState } from "react";
import * as client from "./client";

export default function Connection() {
  const [status, setStatus] = useState("Click to read the connection status.");
  const readStatus = async () => {
    try {
      setStatus(JSON.stringify(await client.fetchStatus(), null, 2));
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Request failed");
    }
  };
  return (
    <div id="wd-lab6-connection">
      <h3>MongoDB connection</h3>
      <p>
        The server reads <code>DATABASE_CONNECTION_STRING</code> and connects with
        Mongoose. This button asks the server for its database connection status.
      </p>
      <button
        type="button"
        id="wd-lab6-status"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
        onClick={readStatus}
      >
        Read connection status
      </button>
      <pre id="wd-lab6-status-output" className="mt-2 overflow-x-auto text-sm">
        {status}
      </pre>
      <hr />
    </div>
  );
}
