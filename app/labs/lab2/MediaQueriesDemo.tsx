import "./MediaQueriesDemo.css";

export default function MediaQueriesDemo() {
  return (
    <div id="wd-media-queries-demo" className="wd-media-queries-demo">
      <h2>Media Query Demo</h2>
      <p>
        This demo uses CSS media queries to change colors based on screen width:
      </p>
      {/* Each bullet matches one breakpoint in MediaQueriesDemo.css, which highlights the active one. */}
      <ul>
        <li className="wd-mq-rule-default">
          Default (no media query): White text on Green background
        </li>
        <li className="wd-mq-rule-ai">
          Below 750px: White text on Purple background
        </li>
        <li className="wd-mq-rule-750">
          750px to 1000px: Black text on Yellow background
        </li>
        <li className="wd-mq-rule-1000">
          1000px to 1250px: White text on Blue background
        </li>
        <li className="wd-mq-rule-1250">
          1250px to 1500px: White text on Red background
        </li>
        <li className="wd-mq-rule-your-1500">
          Above 1500px: White text on Black background
        </li>
      </ul>
    </div>
  );
}
