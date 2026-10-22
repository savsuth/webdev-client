export default function NullUndefined() {
  const nullValue = null;
  const undefinedValue = undefined;
  return (
    <div id="wd-null-undefined">
      <h4>Null vs Undefined</h4>
      nullValue = {String(nullValue)}
      <br />
      undefinedValue = {String(undefinedValue)}
      <br />
      typeof nullValue = {typeof nullValue}
      <br />
      typeof undefinedValue = {typeof undefinedValue}
      <br />
      String(null) = {String(null)}
      <br />
      String(undefined) = {String(undefined)}
      <br />
      nullValue ?? &quot;default&quot; = {nullValue ?? "default"}
      <br />
      null == undefined = {String(null == undefined)}
      <br />
      null === undefined = {String(null === undefined)}
      <hr />
    </div>
  );
}
