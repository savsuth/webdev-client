"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AttemptResult from "../../AttemptResult";
import QuizForm from "../../QuizForm";
import * as client from "../../client";
import { useAccountContext } from "../../../../../account/AccountContext";

export default function QuizTake() {
  const params = useParams();
  const cid = String(params.cid);
  const qid = String(params.qid);
  const router = useRouter();
  const { currentUser } = useAccountContext();
  const isFaculty = currentUser?.role === "FACULTY";
  const [quiz, setQuiz] = useState<client.Quiz>();
  // The last attempt stays undefined until the server answers, and is null when there is none.
  const [attempt, setAttempt] = useState<client.Attempt | null>();
  const [retaking, setRetaking] = useState(false);
  const list = `/courses/${cid}/quizzes`;
  const details = `${list}/${qid}`;
  // Faculty preview a quiz instead of taking it, so they are sent to its Details screen.
  useEffect(() => {
    if (isFaculty) {
      router.replace(details);
      return;
    }
    Promise.all([client.findQuizById(qid), client.findLastAttempt(qid)])
      .then(([quiz, attempt]) => {
        setQuiz(quiz);
        setAttempt(attempt);
      })
      .catch(() => router.push(list));
  }, [isFaculty, qid, list, details, router]);
  if (!quiz || attempt === undefined) return null;
  const allowed = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  const left = allowed - (attempt?.attempt ?? 0);
  // The server refuses a submission past the attempt limit, and then the last stored attempt is shown.
  const submit = async (answers: Record<string, string>) => {
    const result = await client
      .submitAttempt(qid, answers)
      .catch(() => client.findLastAttempt(qid));
    setAttempt(result);
    setRetaking(false);
  };
  return (
    <div id="wd-quiz-take" className="max-w-3xl">
      <h3 id="wd-quiz-title" className="mb-3 text-2xl font-semibold">
        {quiz.title}
      </h3>
      {attempt && !retaking ? (
        <>
          <p id="wd-quiz-attempt-number" className="mb-1 text-neutral-600">
            Attempt {attempt.attempt} of {allowed}
          </p>
          <AttemptResult attempt={attempt} />
          {left > 0 ? (
            <button
              type="button"
              id="wd-quiz-retake"
              onClick={() => setRetaking(true)}
              className="rounded bg-red-600 px-3 py-2 text-white"
            >
              Take the Quiz Again ({left} {left === 1 ? "attempt" : "attempts"} left)
            </button>
          ) : (
            <p id="wd-quiz-no-attempts" className="text-neutral-600">
              You have no attempts left for this quiz.
            </p>
          )}
        </>
      ) : (
        <QuizForm quiz={quiz} onSubmit={submit} />
      )}
    </div>
  );
}
