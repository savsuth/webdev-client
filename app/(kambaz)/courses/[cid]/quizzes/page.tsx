"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import QuizItem from "./QuizItem";
import * as client from "./client";
import { useAccountContext } from "../../../account/AccountContext";

export default function Quizzes() {
  const { currentUser } = useAccountContext();
  const isFaculty = currentUser?.role === "FACULTY";
  const cid = String(useParams().cid);
  const router = useRouter();
  // The list stays undefined until the server answers, so the empty message does not flash first.
  const [quizzes, setQuizzes] = useState<client.Quiz[]>();
  const [sortBy, setSortBy] = useState<"title" | "due" | "available">("title");
  useEffect(() => {
    const fetchQuizzes = async () => {
      setQuizzes(await client.findQuizzesForCourse(cid));
    };
    fetchQuizzes();
  }, [cid]);
  if (!quizzes) return null;
  const sorted = [...quizzes].sort((a, b) =>
    (a[sortBy] ?? "").localeCompare(b[sortBy] ?? ""),
  );
  const addQuiz = async () => {
    const quiz = await client.createQuizForCourse(cid);
    router.push(`/courses/${cid}/quizzes/${quiz._id}`);
  };
  const deleteQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    setQuizzes(quizzes.filter((q) => q._id !== quizId));
  };
  const togglePublished = async (quiz: client.Quiz) => {
    await client.updateQuiz(quiz._id, { published: !quiz.published });
    setQuizzes(
      quizzes.map((q) =>
        q._id === quiz._id ? { ...q, published: !q.published } : q,
      ),
    );
  };
  return (
    <div id="wd-quizzes">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <label htmlFor="wd-sort-quizzes" className="flex items-center gap-2 text-sm">
          Sort by
          <select
            id="wd-sort-quizzes"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded border px-2 py-1.5"
          >
            <option value="title">Name</option>
            <option value="due">Due date</option>
            <option value="available">Available date</option>
          </select>
        </label>
        {/* Only faculty add quizzes. */}
        {isFaculty && (
          <button
            id="wd-add-quiz"
            type="button"
            onClick={addQuiz}
            className="inline-flex items-center gap-1 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
          >
            <FaPlus /> Quiz
          </button>
        )}
      </div>
      <h3
        id="wd-quizzes-title"
        className="mb-3 rounded bg-neutral-200 p-3 text-lg"
      >
        Assignment Quizzes
      </h3>
      {quizzes.length === 0 && (
        <p id="wd-quizzes-empty" className="text-neutral-600">
          {isFaculty
            ? "This course has no quizzes yet. Click + Quiz to add one."
            : "This course has no quizzes yet."}
        </p>
      )}
      <ul id="wd-quiz-list" className="m-0 list-none p-0">
        {sorted.map((quiz) => (
          <QuizItem
            key={quiz._id}
            cid={cid}
            quiz={quiz}
            canEdit={isFaculty}
            onDelete={() => deleteQuiz(quiz._id)}
            onTogglePublished={() => togglePublished(quiz)}
          />
        ))}
      </ul>
    </div>
  );
}
