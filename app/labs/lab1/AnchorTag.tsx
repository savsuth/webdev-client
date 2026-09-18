export default function AnchorTag() {
  return (
    <>
      <h4>Anchor tag</h4>
      Please{" "}
      <a href="https://www.lipsum.com" id="wd-lipsum">
        click here
      </a>{" "}
      to get dummy text
      <br />
      <a href="https://github.com/jannunzi" id="wd-github">
        GitHub
      </a>
      <br />
A site I visit often:
      <br />
      <a href="https://www.uscis.gov/" id="wd-your-link">
        USCIS
      </a>
      <br />
      My GitHub profile:
      <br />
      <a
        href="https://github.com/savsuth"
        id="wd-your-github"
        target="_blank"
        rel="noreferrer"
      >
        My GitHub (new tab)
      </a>
      <br />
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table"
        id="wd-ai-link"
      >
        MDN: table element
      </a>
    </>
  );
}
