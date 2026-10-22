export default function JsonStringify() {
  const squares = [1, 4, 16, 25, 36];
  const myCourse = { course: "CS5610", credits: 4 };
  return (
    <div id="wd-json-stringify">
      <h3>JSON Stringify</h3>
      squares = {JSON.stringify(squares)}
      <br />
      myCourse = {JSON.stringify(myCourse)}
      <br />
      sampleCourse = {JSON.stringify({ course: "RS102", modules: 3 })}
      <hr />
    </div>
  );
}
