"use client";

import { useParams } from "next/navigation";

export default function PathCalculatorWithC() {
  const params = useParams();
  const aRaw = params.a as string;
  const bRaw = params.b as string;
  const cRaw = params.c as string;
  const sum = parseFloat(aRaw) + parseFloat(bRaw) + parseFloat(cRaw);
  return (
    <div id="wd-path-calculator-c">
      <h1>Calculator – Path Parameters</h1>
      <p>Raw path segments (already decoded by Next.js):</p>
      <p>
        a = <code>{aRaw}</code>
      </p>
      <p>
        b = <code>{bRaw}</code>
      </p>
      <p>
        c = <code>{cRaw}</code>
      </p>
      <h2 className="text-green-700">Sum = {sum}</h2>
    </div>
  );
}
