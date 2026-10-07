export default function Dimensions() {
  return (
    <div id="wd-css-dimensions">
      <h2>Dimension</h2>
      <div>
        <div className="wd-dimension-portrait wd-bg-color-yellow">Portrait</div>
        <div className="wd-dimension-landscape wd-bg-color-blue wd-fg-color-white">
          Landscape
        </div>
        <div className="wd-dimension-square wd-bg-color-red">Square</div>
        <div
          id="wd-your-dimension"
          className="wd-your-dimension-wide wd-bg-color-green wd-fg-color-white"
        >
          Wide
        </div>
        {/* The fixed height lets this long sentence overflow, which makes the declared size visible. */}
        <div id="wd-ai-dimension" className="wd-ai-dimension">
          This sample box declares a small fixed size, so this long sentence
          clearly runs past the edges of the 120 by 60 pixel box.
        </div>
      </div>
    </div>
  );
}
