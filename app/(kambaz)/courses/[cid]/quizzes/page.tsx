"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import QuizItem, { type SortKey } from "./QuizItem";
import * as client from "./client";
import { useAccountContext } from "../../../account/AccountContext";

export default function Quizzes() {
  const { currentUser } = useAccountContext();
  const isFaculty = currentUser?.role === "FACULTY";
  const cid = String(useParams().cid);
  const router = useRouter();
  // The list stays undefined until the server answers, so the empty message does not flash first.
  const [quizzes, setQuizzes] = useState<client.Quiz[]>();
  const [attempts, setAttempts] = useState<(client.Attempt | null)[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("title");
  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes: client.Quiz[] = await client.findQuizzesForCourse(cid);
      setQuizzes(quizzes);
      // Faculty take no quizzes, so only the other roles ask for their last attempt of each quiz.
      if (!isFaculty) {
        setAttempts(await Promise.all(quizzes.map((q) => client.findLastAttempt(q._id))));
      }
    };
    fetchQuizzes();
  }, [cid, isFaculty]);
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
      <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
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
            attempt={attempts.find((a) => a?.quiz === quiz._id)}
            canEdit={isFaculty}
            onDelete={() => deleteQuiz(quiz._id)}
            onTogglePublished={() => togglePublished(quiz)}
            sortBy={sortBy}
            onSort={setSortBy}
          />
        ))}
      </ul>
    </div>
  );
}
