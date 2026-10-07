export default function BackgroundColors() {
  return (
    <div id="wd-css-background-colors">
      {/* Each element combines one background class and one foreground class so the text stays readable. */}
      <h2 className="wd-bg-color-blue wd-fg-color-white">Background color</h2>
      <p className="wd-bg-color-red wd-fg-color-black">
        This background of this paragraph is red but{" "}
        <span className="wd-bg-color-green wd-fg-color-white">
          the background of this text is green and the foreground white
        </span>
      </p>
      <div id="wd-your-bg" className="wd-bg-color-gray wd-fg-color-black">
        A gray background with black text stays readable.
      </div>
      <div id="wd-ai-bg" className="wd-bg-color-yellow wd-fg-color-black">
        A yellow background with black text is also easy to read.
      </div>
    </div>
  );
}
