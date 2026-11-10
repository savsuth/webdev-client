"use client";

import { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const FIELD = "mb-2 me-2 rounded border border-neutral-300 px-3 py-1.5";
const LINK =
  "mb-2 me-2 inline-block rounded bg-blue-600 px-3 py-1.5 text-sm text-white no-underline";

export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  const CALCULATOR_API = `${HTTP_SERVER}/lab5/calculator`;
  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>
      <input
        id="wd-query-parameter-a"
        type="number"
        className={FIELD}
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <input
        id="wd-query-parameter-b"
        type="number"
        className={FIELD}
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <br />
      <a
        id="wd-query-parameter-add"
        className={LINK}
        href={`${CALCULATOR_API}?operation=add&a=${a}&b=${b}`}
      >
        Add {a} + {b}
      </a>
      <a
        id="wd-query-parameter-subtract"
        className={LINK}
        href={`${CALCULATOR_API}?operation=subtract&a=${a}&b=${b}`}
      >
        Subtract {a} - {b}
      </a>
      <a
        id="wd-query-parameter-multiply"
        className={LINK}
        href={`${CALCULATOR_API}?operation=multiply&a=${a}&b=${b}`}
      >
        Multiply {a} × {b}
      </a>
      <a
        id="wd-query-parameter-divide"
        className={LINK}
        href={`${CALCULATOR_API}?operation=divide&a=${a}&b=${b}`}
      >
        Divide {a} ÷ {b}
      </a>
      <hr />
    </div>
  );
}
