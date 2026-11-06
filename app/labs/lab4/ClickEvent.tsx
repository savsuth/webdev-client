"use client";

const hello = () => {
  alert("Hello World!");
};

const greet = () => {
  alert("Hello, my name is Aasav!");
};

const goodbye = () => {
  alert("Goodbye World!");
};

export default function ClickEvent() {
  return (
    <div id="wd-click-event">
      <h2>Click Event</h2>
      <button
        type="button"
        onClick={hello}
        id="wd-onclick-hello"
        className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Click Hello
      </button>
      <button
        type="button"
        onClick={greet}
        id="wd-onclick-greet"
        className="ms-2 rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Greet Aasav
      </button>
      <button
        type="button"
        onClick={goodbye}
        id="wd-onclick-goodbye"
        className="ms-2 rounded bg-neutral-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Click Goodbye
      </button>
      <hr />
    </div>
  );
}
