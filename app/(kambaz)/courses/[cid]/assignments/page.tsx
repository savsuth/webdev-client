import AssignmentItem from "./AssignmentItem";

export default async function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  // Need cid from the route to link each assignment to the right course.
  const { cid } = await params;
  return (
    <div id="wd-assignments">
      <input id="wd-search-assignment" placeholder="Search for Assignments" />
      <button id="wd-add-assignment-group" type="button">
        + Group
      </button>
      <button id="wd-add-assignment" type="button">
        + Assignment
      </button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button type="button">+</button>
      </h3>
      <ul id="wd-assignment-list">
        <AssignmentItem
          cid={cid}
          aid="A1"
          title="A1 - ENV + HTML"
          details="Multiple Modules | Not available until May 6 at 12:00am | Due May 13 at 11:59pm | 100 pts"
        />
        <AssignmentItem
          cid={cid}
          aid="A2"
          title="A2 - CSS + TAILWIND"
          details="Multiple Modules | Not available until May 13 at 12:00am | Due May 20 at 11:59pm | 100 pts"
        />
        <AssignmentItem
          cid={cid}
          aid="A3"
          title="A3 - JAVASCRIPT + REACT"
          details="Multiple Modules | Not available until May 20 at 12:00am | Due May 27 at 11:59pm | 100 pts"
        />
      </ul>
    </div>
  );
}
