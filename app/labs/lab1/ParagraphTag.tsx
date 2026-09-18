export default function ParagraphTag() {
  return (
    <div id="wd-p-tag">
      <h4>Paragraph Tag</h4>
      <p id="wd-p-1">
        This is a paragraph. We often separate a long set of sentences with
        vertical spaces to make the text easier to read. Browsers ignore
        vertical white spaces and render all the text as one single set of
        sentences. To force the browser to add vertical spacing, wrap the
        paragraphs you want to separate with the paragraph tag
      </p>
      <p id="wd-p-2">
        This is the first paragraph. The paragraph tag is used to format
        vertical gaps between long pieces of text like this one.
      </p>
      <p id="wd-p-3">
        This is the second paragraph. Even though there is a deliberate white
        gap between the paragraph above and this paragraph, by default
        browsers render them as one contiguous piece of text as shown here on
        the right.
      </p>
      <p id="wd-p-4">
        This is the third paragraph. Wrap each paragraph with the paragraph
        tag to tell browsers to render the gaps.
      </p>

      <p id="wd-p-your-1">
        I am originally from Gujarat, India, and outside of my Monday lecture
        for this course I keep a steady weekly routine: two hours at the gym
        every day, football once a week, and a movie every Sunday.
      </p>
      <p id="wd-p-your-2">
        I come from a background in fintech data engineering, and in this
        course I hope to learn how to design scalable, full-stack systems
        where data engineering and artificial intelligence converge —
        particularly how model reasoning works under the hood and how to
        build backends capable of supporting next-generation computing.
      </p>

      <p id="wd-ai-p">
        Wrapping text in a paragraph tag creates vertical spacing because
        browsers treat &lt;p&gt; as a block-level element, which by default
        adds top and bottom margin and forces the next element onto a new
        line.
      </p>
    </div>
  );
}
