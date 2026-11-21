import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

// answers is the answer key; the server sends it, and accessCode, to faculty only.
export type Question = {
  _id: string;
  type: string;
  title: string;
  points: number;
  question: string;
  choices: string[];
  answers?: string[];
};

export type Quiz = {
  _id: string;
  title: string;
  course: string;
  description?: string;
  published: boolean;
  quizType: string;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  due?: string;
  available?: string;
  until?: string;
  questions: Question[];
};

// A graded question: given is the answer the student gave; the key arrives only when the quiz shows it.
export type AnsweredQuestion = Question & { given: string; correct: boolean };

// The faculty preview is graded but not stored, so its result has no quiz, user or attempt number.
export type Attempt = {
  quiz?: string;
  attempt?: number;
  score: number;
  points: number;
  submitted: string;
  questions: AnsweredQuestion[];
};

// Why a student may not begin a quiz; codeRequired means typing the right access code would let them.
export type Refusal = { message: string; codeRequired: boolean };

export const QUESTION_TYPES: Record<string, string> = {
  MULTIPLE_CHOICE: "Multiple Choice",
  TRUE_FALSE: "True/False",
  FILL_IN_BLANK: "Fill in the Blank",
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};
// The server fills in the default name and settings of a new quiz.
export const createQuizForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, {});
  return response.data;
};
export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};
export const updateQuiz = async (quizId: string, quizUpdates: Partial<Quiz>) => {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, quizUpdates);
  return response.data;
};
export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};
// answers holds the given answer of each question by question id; the server grades them.
export const submitAttempt = async (
  quizId: string,
  answers: Record<string, string>,
  accessCode = "",
) => {
  const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`, {
    answers,
    accessCode,
  });
  return response.data;
};
// The server answers null when the user may begin the quiz, or the reason they may not.
export const checkAccess = async (quizId: string, accessCode = ""): Promise<Refusal | null> => {
  try {
    await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/access`, { accessCode });
    return null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) return error.response.data;
    throw error;
  }
};
// The server answers null when the current user has not taken the quiz.
export const findLastAttempt = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/last`);
  return response.data;
};

// A quiz is worth the sum of the points of its questions.
export const quizPoints = (quiz: Quiz) =>
  quiz.questions.reduce((sum, question) => sum + question.points, 0);

// Dates are stored as local date and time, such as 2026-11-20T13:00, and shown as Nov 20 at 1:00 PM.
export const formatDate = (date?: string) => {
  if (!date) return "";
  const d = new Date(date);
  const day = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${day} at ${time}`;
};

// A quiz without an available date is already open, and one without an until date never closes.
export const availability = (quiz: Quiz) => {
  const now = new Date();
  if (quiz.available && now < new Date(quiz.available)) {
    return `Not available until ${formatDate(quiz.available)}`;
  }
  if (quiz.until && now > new Date(quiz.until)) return "Closed";
  return "Available";
};
