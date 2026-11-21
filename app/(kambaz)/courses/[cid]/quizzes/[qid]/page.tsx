"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import { RichTextView } from "../RichText";
import * as client from "../client";
import { useAccountContext } from "../../../../account/AccountContext";

const BUTTON = "inline-flex items-center gap-1 rounded border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-neutral-900 no-underline";
const START = "rounded bg-red-600 px-3 py-1.5 font-medium text-white no-underline";
const yesNo = (value: boolean) => (value ? "Yes" : "No");

export default function QuizDetails() {
  const params = useParams();
  const cid = String(params.cid);
  const qid = String(params.qid);
  const router = useRouter();
  const { currentUser } = useAccountContext();
  const isFaculty = currentUser?.role === "FACULTY";
  const [quiz, setQuiz] = useState<client.Quiz>();
  // The last attempt is null when the user has not taken the quiz.
  const [attempt, setAttempt] = useState<client.Attempt | null>(null);
  const [refusal, setRefusal] = useState<client.Refusal | null>(null);
  // The server answers 404 for a quiz that does not exist or is not published to this user.
  useEffect(() => {
    Promise.all([client.findQuizById(qid), client.findLastAttempt(qid), client.checkAccess(qid)])
      .then(([quiz, attempt, refusal]) => {
        setQuiz(quiz);
        setAttempt(attempt);
        setRefusal(refusal);
      })
      .catch(() => router.push(`/courses/${cid}/quizzes`));
  }, [cid, qid, router]);
  if (!quiz) return null;
  const href = `/courses/${cid}/quizzes/${qid}`;
  // A reason the access code cannot fix, such as the dates or the attempt limit.
  const blocked = refusal && !refusal.codeRequired;
  const allowed = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  const left = allowed - (attempt?.attempt ?? 0);
  const opens = client.availability(quiz);
  // Students see a short summary of the quiz instead of every setting.
  const summary = [
    ["Due", client.formatDate(quiz.due) || "No due date"],
    ["Points", client.quizPoints(quiz)],
    ["Questions", quiz.questions.length],
    ["Available", opens === "Available" && quiz.until ? `until ${client.formatDate(quiz.until)}` : opens],
    ["Time Limit", `${quiz.timeLimit} Minutes`],
  ];
  const settings = [
    ["Quiz Type", quiz.quizType],
    ["Points", client.quizPoints(quiz)],
    ["Assignment Group", quiz.assignmentGroup],
    ["Shuffle Answers", yesNo(quiz.shuffleAnswers)],
    ["Time Limit", `${quiz.timeLimit} Minutes`],
    ["Multiple Attempts", yesNo(quiz.multipleAttempts)],
    ["How Many Attempts", quiz.howManyAttempts],
    ["Show Correct Answers", quiz.showCorrectAnswers],
    ["Access Code", quiz.accessCode],
    ["One Question at a Time", yesNo(quiz.oneQuestionAtATime)],
    ["Webcam Required", yesNo(quiz.webcamRequired)],
    ["Lock Questions After Answering", yesNo(quiz.lockQuestionsAfterAnswering)],
  ];
  return (
    <div id="wd-quiz-details" className="max-w-3xl">
      <div className="flex justify-center gap-2">
        {isFaculty ? (
          <>
            <Link id="wd-quiz-preview" href={`${href}/preview`} className={BUTTON}>
              Preview
            </Link>
            <Link id="wd-quiz-edit" href={`${href}/editor`} className={BUTTON}>
              <FaPencilAlt /> Edit
            </Link>
          </>
        ) : attempt ? (
          <>
            <Link id="wd-quiz-last-attempt" href={`${href}/take`} className={BUTTON}>
              View Last Attempt
            </Link>
            {!blocked && (
              <Link id="wd-quiz-retake" href={`${href}/take?retake=1`} className={START}>
                Take the Quiz Again ({left} {left === 1 ? "attempt" : "attempts"} left)
              </Link>
            )}
          </>
        ) : blocked ? (
          // A quiz outside its dates cannot be started; the take screen asks for an access code.
          <p id="wd-quiz-refusal" className="mb-0 text-neutral-600">
            {refusal.message}
          </p>
        ) : (
          <Link id="wd-quiz-start" href={`${href}/take`} className={START}>
            Start
          </Link>
        )}
      </div>
      <hr className="my-3" />
      <h3 id="wd-quiz-title" className="mb-4 text-2xl font-semibold">
        {quiz.title}
      </h3>
      {!isFaculty && (
        <div id="wd-quiz-summary" className="mb-4 flex flex-wrap gap-x-8 gap-y-1 border-y border-neutral-300 py-2">
          {summary.map(([label, value]) => (
            <span key={label}>
              <b>{label}</b> {value}
            </span>
          ))}
        </div>
      )}
      {quiz.description && (
        <div id="wd-quiz-description" className="mb-4">
          <RichTextView value={quiz.description} />
        </div>
      )}
      {!isFaculty && attempt && (
        // Students see only their last attempt, so the history has one row.
        <>
          <h4 className="mb-2 text-xl font-semibold">Attempt History</h4>
          <table id="wd-quiz-attempt-history" className="mb-6 w-full text-left">
            <thead>
              <tr className="border-b border-neutral-300">
                <th className="p-2"></th>
                <th className="p-2">Attempt</th>
                <th className="p-2">Submitted</th>
                <th className="p-2">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-300">
                <td className="p-2 font-semibold">LATEST</td>
                <td className="p-2">
                  <Link href={`${href}/take`} className="text-red-600">
                    Attempt {attempt.attempt}
                  </Link>
                </td>
                <td className="p-2">{client.formatDate(attempt.submitted)}</td>
                <td className="p-2">
                  {attempt.score} out of {attempt.points}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      {isFaculty && (
        <>
          <table id="wd-quiz-settings" className="mb-6">
            <tbody>
              {settings.map(([label, value]) => (
                <tr key={label}>
                  <th className="py-1 pr-3 text-right align-top">{label}</th>
                  <td className="py-1">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table id="wd-quiz-dates" className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-300">
                <th className="p-2">Due</th>
                <th className="p-2">Available from</th>
                <th className="p-2">Until</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-300">
                <td className="p-2">{client.formatDate(quiz.due)}</td>
                <td className="p-2">{client.formatDate(quiz.available)}</td>
                <td className="p-2">{client.formatDate(quiz.until)}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
