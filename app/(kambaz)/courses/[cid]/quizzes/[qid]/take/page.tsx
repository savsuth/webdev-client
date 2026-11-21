"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  // The server's reason the quiz cannot be started now, or null when it can.
  const [refusal, setRefusal] = useState<client.Refusal | null>(null);
  // The Details screen's Take the Quiz Again button opens this screen with ?retake=1.
  const retakeRequested = useSearchParams().get("retake") === "1";
  const [retaking, setRetaking] = useState(retakeRequested);
  const [code, setCode] = useState("");
  // The access code last sent to the server; it stays for retakes during this visit.
  const [accessCode, setAccessCode] = useState("");
  const list = `/courses/${cid}/quizzes`;
  const details = `${list}/${qid}`;
  // Faculty preview a quiz instead of taking it, so they are sent to its Details screen.
  useEffect(() => {
    if (isFaculty) {
      router.replace(details);
      return;
    }
    Promise.all([client.findQuizById(qid), client.findLastAttempt(qid), client.checkAccess(qid)])
      .then(([quiz, attempt, refusal]) => {
        setQuiz(quiz);
        setAttempt(attempt);
        setRefusal(refusal);
      })
      .catch(() => router.push(list));
  }, [isFaculty, qid, list, details, router]);
  if (!quiz || attempt === undefined) return null;
  const allowed = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  const left = allowed - (attempt?.attempt ?? 0);
  // A reason the access code cannot fix, such as the dates or the attempt limit.
  const blocked = refusal && !refusal.codeRequired;
  const enterCode = async (e: FormEvent) => {
    e.preventDefault();
    setAccessCode(code);
    setRefusal(await client.checkAccess(qid, code));
  };
  // A refused submission shows the last stored attempt, or the reason when there is none.
  const submit = async (answers: Record<string, string>) => {
    const result = await client.submitAttempt(qid, answers, accessCode).catch(() => null);
    const [last, reason] = await Promise.all([
      result ?? client.findLastAttempt(qid),
      client.checkAccess(qid, accessCode),
    ]);
    setAttempt(last);
    setRefusal(reason);
    setRetaking(false);
  };
  const reason = (
    <p id="wd-quiz-refusal" className="text-neutral-600">
      {refusal?.message}
    </p>
  );
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
          <div className="mb-4">
            {blocked ? (
              reason
            ) : (
              <button
                type="button"
                id="wd-quiz-retake"
                onClick={() => setRetaking(true)}
                className="rounded bg-red-600 px-3 py-2 text-white"
              >
                Take the Quiz Again ({left} {left === 1 ? "attempt" : "attempts"} left)
              </button>
            )}
          </div>
          <AttemptResult attempt={attempt} />
        </>
      ) : blocked ? (
        reason
      ) : refusal?.codeRequired ? (
        <form id="wd-quiz-access" onSubmit={enterCode} className="max-w-sm">
          <p className="mb-2">This quiz requires an access code.</p>
          <label htmlFor="wd-quiz-access-code" className="mb-1 block font-semibold">
            Access Code
          </label>
          <input
            id="wd-quiz-access-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mb-2 block w-full rounded border border-neutral-300 px-2 py-1.5"
          />
          {accessCode && (
            <p id="wd-quiz-access-error" className="mb-2 text-red-600">
              {refusal.message}
            </p>
          )}
          <button type="submit" id="wd-quiz-access-start" className="rounded bg-red-600 px-3 py-2 text-white">
            Start Quiz
          </button>
        </form>
      ) : (
        <QuizForm quiz={quiz} onSubmit={submit} />
      )}
    </div>
  );
}
