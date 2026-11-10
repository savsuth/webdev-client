"use client";

import { useEffect, useState } from "react";
import * as client from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");
  const fetchWelcomeOnClick = async () => {
    const message = await client.fetchWelcomeMessage();
    setWelcomeOnClick(message);
  };
  // The effect runs once after the first render, so the message loads without a click.
  useEffect(() => {
    const fetchWelcomeOnLoad = async () => {
      const welcome = await client.fetchWelcomeMessage();
      setWelcomeOnLoad(welcome);
    };
    fetchWelcomeOnLoad();
  }, []);
  return (
    <div id="wd-http-client">
      <h3>HTTP Client</h3>
      <h4>Requesting on Click</h4>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
        onClick={fetchWelcomeOnClick}
      >
        Fetch Welcome
      </button>
      <p>
        Response from server: <b>{welcomeOnClick}</b>
      </p>
      <h4>Requesting on Load</h4>
      <p>
        Response from server: <b>{welcomeOnLoad}</b>
      </p>
      <hr />
    </div>
  );
}
