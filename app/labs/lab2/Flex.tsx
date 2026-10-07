import "./index.css";

export default function Flex() {
  return (
    <div id="wd-css-flex">
      <h2>Flex</h2>
      {/* The three sample rows follow the book's progression: a plain row, a growing last column, then a pinned first column. */}
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow">Column 1</div>
        <div className="wd-bg-color-blue wd-fg-color-white">Column 2</div>
        <div className="wd-bg-color-red wd-fg-color-white">Column 3</div>
      </div>
      <br />
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow">Column 1</div>
        <div className="wd-bg-color-blue wd-fg-color-white">Column 2</div>
        <div className="wd-bg-color-red wd-fg-color-white wd-flex-grow-1">
          Column 3
        </div>
      </div>
      <br />
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow wd-width-75px">Column 1</div>
        <div className="wd-bg-color-blue wd-fg-color-white">Column 2</div>
        <div className="wd-bg-color-red wd-fg-color-white wd-flex-grow-1">
          Column 3
        </div>
      </div>
      <br />
      <div id="wd-your-flex" className="wd-flex-row-container">
        <div className="wd-bg-color-green wd-fg-color-white wd-flex-grow-1">
          Grows
        </div>
        <div className="wd-bg-color-gray">Natural width</div>
        <div className="wd-bg-color-blue wd-fg-color-white wd-width-75px">
          Pinned
        </div>
      </div>
      <br />
      <div id="wd-ai-flex" className="wd-flex-row-container">
        <div className="wd-bg-color-yellow wd-width-75px">Pinned</div>
        <div className="wd-bg-color-gray">Natural width</div>
        <div className="wd-bg-color-red wd-fg-color-white wd-flex-grow-1">
          Grows
        </div>
      </div>
    </div>
  );
}
