export default function HeadingTags() {
  return (
    <div id="wd-h-tag">
      <h4>Heading Tags</h4>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      Text documents are often broken up into several sections and subsections.
      Each section is usually prefaced with a short title or heading that
      attempts to summarize the topic of the section it precedes. For instance
      this paragraph is preceded by the heading Heading Tags. The font of the
      section headings are usually larger and bolder than their subsection
      headings. This document uses headings to introduce topics such as HTML
      Documents, HTML Tags, Heading Tags, etc. HTML heading tags can be used
      to format plain text so that it renders in a browser as large headings.
      There are 6 heading tags for different sizes: h1, h2, h3, h4, h5, and
      h6. Tag h1 is the largest heading and h6 is the smallest heading. A{" "}
      <span id="wd-inline-span">span</span> sits in this sentence without
      starting a new line.

      <div id="wd-your-heading">
        <h4>
          Aasav Suthar&apos;s <span id="wd-your-span">Notes</span>
        </h4>
        <p>
          Hello, I am Aasav Suthar, currently pursuing my Master&apos;s at
          Northeastern University with a background in fintech data
          engineering. I build where data systems and artificial intelligence
          converge—exploring how model reasoning functions under the hood and
          designing scalable backends capable of supporting next-generation
          computing.
        </p>
      </div>

      <div id="wd-ai-headings">
        <h4>Lab notes</h4>
        <h5>What I built</h5>
        <h6>Next step</h6>
      </div>
    </div>
  );
}
