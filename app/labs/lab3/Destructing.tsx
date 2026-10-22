export default function Destructing() {
  const person = { name: "John", age: 25, city: "Boston" };
  const { name, age, city } = person;
  const numbers = ["one", "two", "three", "four"];
  const [first, second, third, fourth] = numbers;
  return (
    <div id="wd-destructing">
      <h2>Destructing</h2>
      <h3>Object Destructing</h3>
      const &#123; name, age &#125; = &#123; name: &quot;John&quot;, age: 25 &#125;
      <br />
      <br />
      name = {name}
      <br />
      age = {age}
      <br />
      city = {city}
      <h3>Array Destructing</h3>
      const [first, second, third] = [&quot;one&quot;,&quot;two&quot;,&quot;three&quot;]
      <br />
      <br />
      first = {first}
      <br />
      second = {second}
      <br />
      third = {third}
      <br />
      fourth = {fourth}
      <hr />
    </div>
  );
}
