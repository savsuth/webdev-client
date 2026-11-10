"use client";

import { useEffect, useState } from "react";

export default function HelloRoute() {
  const [hello, setHello] = useState({});
  // The request stays on the Next.js origin, so it works without the Express server.
  useEffect(() => {
    const fetchHello = async () => {
      const response = await fetch("/api/lab5/hello");
      setHello(await response.json());
    };
    fetchHello();
  }, []);
  return (
    <div id="wd-lab5-next-hello">
      <h4>GET /api/lab5/hello (Next.js Route Handler)</h4>
      <pre>{JSON.stringify(hello, null, 2)}</pre>
      <hr />
    </div>
  );
}
