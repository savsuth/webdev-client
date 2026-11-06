"use client";

const hello = () => {
  alert("Hello World!");
};

const lifeIs = (good: string) => {
  alert(good);
};

export default function PassingDataOnEvent() {
  return (
    <div id="wd-passing-data-on-event">
      <h2>Passing Data on Event</h2>
      <button
        type="button"
        onClick={hello}
        id="wd-pass-data-click"
        className="me-2 rounded bg-yellow-400 px-3 py-1.5 text-sm font-medium"
      >
        Pass Data
      </button>
      <button
        type="button"
        onClick={() => lifeIs("Life is Good!")}
        id="wd-pass-data-parameter-click"
        className="me-2 rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Pass Data Parameter
      </button>
      <button
        type="button"
        onClick={() => lifeIs("Life is better with a cup of chai!")}
        id="wd-pass-data-chai-click"
        className="me-2 rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Pass Chai
      </button>
      <button
        type="button"
        onClick={() => lifeIs("Web Development")}
        id="wd-pass-data-course-click"
        className="rounded bg-neutral-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Pass Course
      </button>
      <hr />
    </div>
  );
}
