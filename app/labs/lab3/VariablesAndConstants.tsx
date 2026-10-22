/* eslint-disable no-var, prefer-const */
// The var and let declarations are intentional because this lab demonstrates scoping keywords.
export default function VariablesAndConstants() {
  var functionScoped = 2;
  let blockScoped = 5;
  const constant1 = functionScoped - blockScoped;
  let studentName = "Aasav";
  const greeting = "Hello, " + studentName;
  const sampleSum = functionScoped + blockScoped;
  return (
    <div id="wd-variables-and-constants">
      <h4>Variables and Constants</h4>
      functionScoped = {functionScoped}
      <br />
      blockScoped = {blockScoped}
      <br />
      constant1 = {constant1}
      <br />
      studentName = {studentName}
      <br />
      greeting = {greeting}
      <br />
      sampleSum = {sampleSum}
      <hr />
    </div>
  );
}
