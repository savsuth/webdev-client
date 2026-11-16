"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import { RichTextView } from "../RichText";
import * as client from "../client";
import { useAccountContext } from "../../../../account/AccountContext";

const BUTTON = "inline-flex items-center gap-1 rounded border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-neutral-900 no-underline";
const yesNo = (value: boolean) => (value ? "Yes" : "No");

export default function QuizDetails() {
  const params = useParams();
  const cid = String(params.cid);
  const qid = String(params.qid);
  const router = useRouter();
  const { currentUser } = useAccountContext();
  const isFaculty = currentUser?.role === "FACULTY";
  const [quiz, setQuiz] = useState<client.Quiz>();
  const [taken, setTaken] = useState(false);
  // The server answers 404 for a quiz that does not exist or is not published to this user.
  useEffect(() => {
    Promise.all([client.findQuizById(qid), client.findLastAttempt(qid)])
      .then(([quiz, attempt]) => {
        setQuiz(quiz);
        setTaken(Boolean(attempt));
      })
      .catch(() => router.push(`/courses/${cid}/quizzes`));
  }, [cid, qid, router]);
  if (!quiz) return null;
  const href = `/courses/${cid}/quizzes/${qid}`;
  const settings = [
    ["Quiz Type", quiz.quizType],
    ["Points", client.quizPoints(quiz)],
    ["Assignment Group", quiz.assignmentGroup],
    ["Shuffle Answers", yesNo(quiz.shuffleAnswers)],
    ["Time Limit", `${quiz.timeLimit} Minutes`],
    ["Multiple Attempts", yesNo(quiz.multipleAttempts)],
    ["How Many Attempts", quiz.howManyAttempts],
    ["Show Correct Answers", quiz.showCorrectAnswers],
    // Students never receive the access code, so only faculty get its row.
    ...(isFaculty ? [["Access Code", quiz.accessCode]] : []),
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
        ) : (
          <Link
            id="wd-quiz-start"
            href={`${href}/take`}
            className="rounded bg-red-600 px-3 py-1.5 font-medium text-white no-underline"
          >
            {taken ? "View Last Attempt" : "Start"}
          </Link>
        )}
      </div>
      <hr className="my-3" />
      <h3 id="wd-quiz-title" className="mb-4 text-2xl font-semibold">
        {quiz.title}
      </h3>
      {quiz.description && (
        <div id="wd-quiz-description" className="mb-4">
          <RichTextView value={quiz.description} />
        </div>
      )}
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
    </div>
  );
}
