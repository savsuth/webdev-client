import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

// until is optional because the seed data has no available-until date.
export type Assignment = {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  due: string;
  available: string;
  until?: string;
};

export const emptyAssignment: Assignment = {
  _id: "new",
  title: "New Assignment",
  course: "",
  description: "New Assignment Description",
  points: 100,
  due: "2026-12-06",
  available: "2026-11-23",
  until: "2026-12-06",
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};
export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Assignment,
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment,
  );
  return response.data;
};
export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};
export const updateAssignment = async (assignment: Assignment) => {
  const response = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment,
  );
  return response.data;
};
