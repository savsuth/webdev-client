export default function Borders() {
  return (
    <div id="wd-css-borders">
      <h2>Borders</h2>
      {/* Width, style, and color come from separate classes, so new combinations need no new CSS rules. */}
      <p className="wd-border-fat wd-border-red wd-border-solid">
        Solid fat red border
      </p>
      <p className="wd-border-thin wd-border-blue wd-border-dashed">
        Dashed thin blue border
      </p>
      <p
        id="wd-your-border"
        className="wd-border-fat wd-border-blue wd-border-dashed"
      >
        Dashed fat blue border
      </p>
      <p
        id="wd-ai-border"
        className="wd-border-fat wd-border-dashed wd-border-yellow"
      >
        Dashed fat yellow border
      </p>
    </div>
  );
}
