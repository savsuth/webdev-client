import "./Classes.css";

export default function Classes() {
  const color = "blue";
  const dangerous = true;
  const sunny = false;
  const shade = "green";
  return (
    <div id="wd-classes">
      <h2>Classes</h2>
      <div className="wd-bg-yellow wd-fg-black wd-padding-10px">
        Yellow background
      </div>
      <div className="wd-bg-blue wd-fg-black wd-padding-10px">
        Blue background
      </div>
      <div className="wd-bg-red wd-fg-black wd-padding-10px">
        Red background
      </div>
      <div className={`wd-bg-${color} wd-fg-black wd-padding-10px`}>
        Dynamic Blue background
      </div>
      <div
        className={`${dangerous ? "wd-bg-red" : "wd-bg-green"} wd-fg-black wd-padding-10px`}
      >
        Dangerous background
      </div>
      <div
        className={`${sunny ? "wd-bg-yellow" : "wd-bg-green"} wd-fg-black wd-padding-10px`}
      >
        {sunny ? "Yellow" : "Green"} background (sunny = {sunny + ""})
      </div>
      <div className={`wd-bg-${shade} wd-fg-black wd-padding-10px`}>
        Dynamic Green background
      </div>
      <hr />
    </div>
  );
}
