export default function YourForm() {
  return (
    <form id="wd-your-form">
      <h4>Student Profile</h4>

      <label htmlFor="wd-your-first-name">First name:</label>
      <input
        id="wd-your-first-name"
        placeholder="Jane"
        defaultValue="Aasav"
      />
      <br />
      <label htmlFor="wd-your-last-name">Last name:</label>
      <input
        id="wd-your-last-name"
        placeholder="Doe"
        defaultValue="Suthar"
      />
      <br />
      {/* Masked as a password field so the student ID isn't shown in plain text on screen. */}
      <label htmlFor="wd-your-student-id">Student ID:</label>
      <input
        type="password"
        id="wd-your-student-id"
        defaultValue="002039249"
      />
      <br />

      <label htmlFor="wd-your-bio">Why I am taking this course:</label>
      <br />
      <textarea
        id="wd-your-bio"
        cols={30}
        rows={5}
        defaultValue="I have a background in fintech data engineering and want to build scalable full-stack systems where data engineering and AI converge."
      />
      <br />

      <label>Class standing:</label>
      <br />
      <input type="radio" name="wd-your-standing" id="wd-your-standing-fresh" />
      <label htmlFor="wd-your-standing-fresh">Freshman</label>
      <br />
      <input type="radio" name="wd-your-standing" id="wd-your-standing-soph" />
      <label htmlFor="wd-your-standing-soph">Sophomore</label>
      <br />
      <input type="radio" name="wd-your-standing" id="wd-your-standing-jr" />
      <label htmlFor="wd-your-standing-jr">Junior</label>
      <br />
      <input type="radio" name="wd-your-standing" id="wd-your-standing-sr" />
      <label htmlFor="wd-your-standing-sr">Senior</label>
      <br />
      <input
        type="radio"
        name="wd-your-standing"
        id="wd-your-standing-grad"
        defaultChecked
      />
      <label htmlFor="wd-your-standing-grad">Graduate</label>
      <br />

      <label>Enrollment:</label>
      <br />
      <input type="radio" name="wd-your-enrollment" id="wd-your-enrollment-ft" defaultChecked />
      <label htmlFor="wd-your-enrollment-ft">Full-time</label>
      <br />
      <input type="radio" name="wd-your-enrollment" id="wd-your-enrollment-pt" />
      <label htmlFor="wd-your-enrollment-pt">Part-time</label>
      <br />

      <label>Interests:</label>
      <br />
      <input type="checkbox" id="wd-your-interest-frontend" />
      <label htmlFor="wd-your-interest-frontend">Frontend development</label>
      <br />
      <input type="checkbox" id="wd-your-interest-backend" />
      <label htmlFor="wd-your-interest-backend">Backend development</label>
      <br />
      <input type="checkbox" id="wd-your-interest-databases" />
      <label htmlFor="wd-your-interest-databases">Databases</label>
      <br />

      <label htmlFor="wd-your-major">Major:</label>
      <br />
      <select id="wd-your-major" defaultValue="CS">
        <option value="CS">Computer Science</option>
        <option value="DS">Data Science</option>
        <option value="CE">Computer Engineering</option>
        <option value="IS">Information Systems</option>
      </select>
      <br />

      <label htmlFor="wd-your-topics">Topics to deepen this term:</label>
      <br />
      <select
        multiple
        id="wd-your-topics"
        defaultValue={["REACT", "MONGODB"]}
      >
        <option value="REACT">React</option>
        <option value="EXPRESS">Express</option>
        <option value="MONGODB">MongoDB</option>
        <option value="TAILWIND">Tailwind CSS</option>
      </select>
      <br />

      <label htmlFor="wd-your-email">School email:</label>
      <input
        type="email"
        id="wd-your-email"
        defaultValue="suthar.aa@northeastern.edu"
      />
      <br />
      <label htmlFor="wd-your-grad-year">Expected graduation year:</label>
      <input
        type="number"
        id="wd-your-grad-year"
        defaultValue={2027}
        min={2026}
        max={2032}
      />
      <br />
      <label htmlFor="wd-your-start-date">Program start date:</label>
      <input type="date" id="wd-your-start-date" defaultValue="2026-09-14" />
      <br />
      <label htmlFor="wd-your-excitement">
        How excited are you about this course (0–10)?
      </label>
      <input
        type="range"
        id="wd-your-excitement"
        min={0}
        max={10}
        defaultValue={8}
      />
      <br />

      <button id="wd-your-form-save" type="submit">
        Save
      </button>
      <button id="wd-your-form-cancel" type="button">
        Cancel
      </button>
    </form>
  );
}
