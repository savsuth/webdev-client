import { useCounterContext } from "./CounterContext";

export default function ContextCounterWrite() {
  const { count, setCount } = useCounterContext();
  return (
    <div id="wd-context-counter-write">
      <h3>Writer</h3>
      <button
        type="button"
        onClick={() => setCount(count + 1)}
        id="wd-context-up-click"
        className="me-2 rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Up
      </button>
      <button
        type="button"
        onClick={() => setCount(count - 1)}
        id="wd-context-down-click"
        className="me-2 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Down
      </button>
      <button
        type="button"
        onClick={() => setCount(7)}
        id="wd-context-reset-click"
        className="rounded bg-neutral-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Reset
      </button>
    </div>
  );
}
