export default function TernaryOperator() {
  const loggedIn = true;
  const hour = 9;
  const premium = false;
  return (
    <div id="wd-ternary-operator">
      <h4>Logged In</h4>
      {loggedIn ? <p>Welcome</p> : <p>Please login</p>}
      {hour < 12 ? <p>Good morning</p> : <p>Good afternoon</p>}
      {premium ? <p>Premium</p> : <p>Free</p>}
      <hr />
    </div>
  );
}
