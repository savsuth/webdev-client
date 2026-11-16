"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import AttemptResult from "../../AttemptResult";
import QuizForm from "../../QuizForm";
import * as client from "../../client";
import { useAccountContext } from "../../../../../account/AccountContext";

export default function QuizPreview() {
  const params = useParams();
  const cid = String(params.cid);
  const qid = String(params.qid);
  const router = useRouter();
  const { currentUser } = useAccountContext();
  const isFaculty = currentUser?.role === "FACULTY";
  const [quiz, setQuiz] = useState<client.Quiz>();
  const [result, setResult] = useState<client.Attempt>();
  const list = `/courses/${cid}/quizzes`;
  const details = `${list}/${qid}`;
  // Only faculty preview a quiz, so everyone else is sent to its Details screen.
  useEffect(() => {
    if (!isFaculty) {
      router.replace(details);
      return;
    }
    client
      .findQuizById(qid)
      .then(setQuiz)
      .catch(() => router.push(list));
  }, [isFaculty, qid, list, details, router]);
  if (!quiz) return null;
  // The server grades a faculty submission and stores nothing.
  const submit = async (answers: Record<string, string>) => {
    setResult(await client.submitAttempt(qid, answers));
  };
  return (
    <div id="wd-quiz-preview-screen" className="max-w-3xl">
      <h3 id="wd-quiz-title" className="mb-3 text-2xl font-semibold">
        {quiz.title}
      </h3>
      <p id="wd-quiz-preview-note" className="mb-4 rounded border border-red-200 bg-red-50 p-2 text-red-700">
        This is a preview of the quiz. Your answers are graded but not saved.
      </p>
      {result ? <AttemptResult attempt={result} /> : <QuizForm quiz={quiz} onSubmit={submit} />}
      <Link
        id="wd-quiz-edit-questions"
        href={`${details}/editor?tab=questions`}
        className="mt-4 inline-flex items-center gap-1 rounded border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-neutral-900 no-underline"
      >
        <FaPencilAlt /> Edit Quiz
      </Link>
    </div>
  );
}
