"use client";

import { useState } from "react";

const FIELD = "mb-2 ms-2 rounded border border-neutral-300 px-3 py-1.5";
const SYMBOLS: Record<string, string> = {
  add: "+",
  subtract: "-",
  multiply: "×",
  divide: "÷",
};

export default function CalculatorNextWebApiClient() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  // The operation is a parameter because the dropdown calculates before its new state is rendered.
  const calculate = async (op: string) => {
    const response = await fetch(
      `/api/lab5/calculator?a=${a}&b=${b}&operation=${op}`,
    );
    const data = await response.json();
    if (response.ok) {
      setResult(`${data.a} ${SYMBOLS[op]} ${data.b} = ${data.result}`);
      setError("");
    } else {
      setResult("");
      setError(data.error);
    }
  };
  return (
    <div id="wd-lab5-next-calculator">
      <h3>Calculator (Next.js Web API)</h3>
      <label htmlFor="a-input">A:</label>
      <input
        type="number"
        placeholder="A"
        id="a-input"
        className={FIELD}
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <br />
      <label htmlFor="b-input">B:</label>
      <input
        type="number"
        placeholder="B"
        id="b-input"
        className={FIELD}
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <br />
      <label htmlFor="operation-select">Operation:</label>
      <select
        id="operation-select"
        className={FIELD}
        value={operation}
        onChange={(e) => {
          setOperation(e.target.value);
          if (a && b) calculate(e.target.value);
        }}
      >
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">×</option>
        <option value="divide">÷</option>
      </select>
      <br />
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
        disabled={!a || !b}
        onClick={() => calculate(operation)}
      >
        Calculate
      </button>
      <br />
      {result && (
        <input readOnly id="result-output" className={`mt-2 ${FIELD}`} value={result} />
      )}
      {error && <p className="rounded bg-red-100 px-3 py-2 text-red-800">{error}</p>}
      <hr />
    </div>
  );
}
