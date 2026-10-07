import "./index.css";
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Padding from "./Padding";
import Margins from "./Margins";
import BoxModel from "./BoxModel";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Display from "./Display";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import MediaQueriesDemo from "./MediaQueriesDemo";
import ReactIconsSampler from "./ReactIconsSampler";

export default function Lab2() {
  return (
    <div id="wd-lab2">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      {/* Inline styles are used here only to demonstrate the technique; later samples move styling into index.css. */}
      <p style={{ backgroundColor: "blue", color: "white" }}>
        Style attribute allows configuring look and feel right on the
        element. Although it&apos;s very convenient it is considered bad
        practice and you should avoid using the style attribute
      </p>
      <p
        id="wd-your-style-attr"
        style={{ backgroundColor: "green", color: "yellow" }}
      >
        This paragraph styles itself with a green background and yellow text
        through the style attribute.
      </p>
      <p
        id="wd-ai-style-attr"
        style={{ backgroundColor: "purple", color: "white" }}
      >
        This sample paragraph uses a purple background and white text through
        the style attribute.
      </p>

      <div id="wd-css-id-selectors">
        <h3>ID selectors</h3>
        <p id="wd-id-selector-1">
          Instead of changing the look and feel of all the elements of the same
          name, e.g., P, we can refer to a specific element by its ID
        </p>
        <p id="wd-id-selector-2">
          Here&apos;s another paragraph using a different ID and a different
          look and feel
        </p>
        <p id="wd-id-selector-3">
          A third paragraph with its own ID and its own color scheme
        </p>
        <p id="wd-ai-id-selector">
          A sample paragraph whose ID rule changes only this paragraph
        </p>
      </div>

      <div id="wd-css-class-selectors">
        <h3>Class selectors</h3>
        <p className="wd-class-selector">
          Instead of using IDs to refer to elements, you can use an
          element&apos;s CLASS attribute
        </p>
        <h4 className="wd-class-selector">
          This heading has same style as paragraph above
        </h4>
        <p className="wd-your-class">
          My own class styles this paragraph and the heading below
        </p>
        <h4 className="wd-your-class">
          This heading shares the look of my own class
        </h4>
        <p className="wd-ai-class-selector">
          A second sample class styles this paragraph and the heading below
        </p>
        <h4 className="wd-ai-class-selector">
          This heading shares the look of the second sample class
        </h4>
      </div>

      <div id="wd-css-document-structure">
        <div className="wd-selector-1">
          <h3>Document structure selectors</h3>
          <div className="wd-selector-2">
            Selectors can be combined to refer elements in particular places in
            the document
            <p className="wd-selector-3">
              This paragraph&apos;s red background is referenced as
              <br />
              .selector-2 .selector3
              <br />
              meaning the descendant of some ancestor.
              <br />
              <span className="wd-selector-4">
                Whereas this span is a direct child of its parent
              </span>
              <br />
              <strong className="wd-your-selector-5">
                This bold text is a direct child matched by my own child
                selector
              </strong>
              <br />
              <span className="wd-ai-selector-5">
                This span is matched by a descendant selector
              </span>
              <br />
              You can combine these relationships to create specific styles
              depending on the document structure
            </p>
          </div>
        </div>
      </div>

      <div id="wd-css-cascade">
        <h3>CSS selection rule mechanism</h3>
        <blockquote id="wd-your-cascade" className="wd-your-cascade">
          A tag rule (light blue), a class rule (orange), and an id rule
          (purple) all set the background of this element. The id rule wins.
        </blockquote>
        <div id="wd-css-cascade-ai">
          <p id="wd-ai-cascade" className="wd-ai-cascade">
            A tag rule (green), a class rule (yellow), and an id rule (red) all
            set the background of this paragraph. The id rule wins.
          </p>
        </div>
      </div>

      <ForegroundColors />
      <BackgroundColors />
      <Borders />
      <Padding />
      <Margins />
      <BoxModel />
      <Corners />
      <Dimensions />
      <Display />
      <Positions />
      <Zindex />
      <Float />
      <GridLayout />
      <Flex />
      <MediaQueriesDemo />
      <ReactIconsSampler />

      {/* A plain anchor forces a full page load, so the Tailwind lab's Preflight reset does not leak back into this page. */}
      <p>
        <a href="/labs/lab2/tailwind">Open Tailwind CSS lab →</a>
      </p>
    </div>
  );
}
