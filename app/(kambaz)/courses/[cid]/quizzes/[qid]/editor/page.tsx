"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import DetailsEditor from "./DetailsEditor";
import QuestionsEditor from "./QuestionsEditor";
import * as client from "../../client";
import { useAccountContext } from "../../../../../account/AccountContext";

const TAB = "px-4 py-2 no-underline";

// The dates are stored as text in one format, so comparing the text compares the dates.
const problemWith = (quiz: client.Quiz) => {
  const { available, due, until } = quiz;
  if (!quiz.title.trim()) return "The quiz needs a title.";
  if (available && due && available > due) return "Available from must not be after the due date.";
  if (due && until && due > until) return "The due date must not be after the until date.";
  if (available && until && available > until) return "Available from must not be after the until date.";
  return "";
};

export default function QuizEditor() {
  const params = useParams();
  const cid = String(params.cid);
  const qid = String(params.qid);
  const router = useRouter();
  const showQuestions = useSearchParams().get("tab") === "questions";
  const { currentUser } = useAccountContext();
  const isFaculty = currentUser?.role === "FACULTY";
  // The quiz in state is the draft of the Details tab; its questions always match the server.
  const [quiz, setQuiz] = useState<client.Quiz>();
  const [error, setError] = useState("");
  const list = `/courses/${cid}/quizzes`;
  const details = `${list}/${qid}`;
  // Only faculty edit a quiz, so everyone else is sent to its Details screen.
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
  const save = async (publish: boolean) => {
    const problem = problemWith(quiz);
    if (problem) {
      setError(problem);
      return;
    }
    // A number box can be emptied, so the time limit and the attempts are stored as at least 1.
    await client.updateQuiz(qid, {
      ...quiz,
      title: quiz.title.trim(),
      timeLimit: Math.max(1, quiz.timeLimit),
      howManyAttempts: Math.max(1, quiz.howManyAttempts),
      published: publish || quiz.published,
    });
    router.push(publish ? list : details);
  };
  // A question is stored as soon as it is saved or deleted, apart from the Details draft.
  const saveQuestions = async (questions: client.Question[]) => {
    await client.updateQuiz(qid, { questions });
    setQuiz((q) => q && { ...q, questions });
  };
  const tab = (selected: boolean) =>
    `${TAB} ${selected ? "border-b-2 border-red-600 font-semibold text-neutral-900" : "text-red-600"}`;
  return (
    <div id="wd-quiz-editor" className="max-w-3xl">
      <div className="mb-2 text-right">
        Points <b id="wd-quiz-points">{client.quizPoints(quiz)}</b>
      </div>
      <div className="mb-4 flex border-b border-neutral-300">
        <Link id="wd-quiz-tab-details" href={`${details}/editor`} className={tab(!showQuestions)}>
          Details
        </Link>
        <Link
          id="wd-quiz-tab-questions"
          href={`${details}/editor?tab=questions`}
          className={tab(showQuestions)}
        >
          Questions
        </Link>
      </div>
      {showQuestions ? (
        <QuestionsEditor questions={quiz.questions} onChange={saveQuestions} />
      ) : (
        <DetailsEditor
          quiz={quiz}
          onChange={(updates) => {
            setError("");
            setQuiz((q) => q && { ...q, ...updates });
          }}
        />
      )}
      <hr className="my-3" />
      {error && (
        <p id="wd-quiz-error" className="text-red-600">
          {error}
        </p>
      )}
      <div className="flex justify-end gap-2">
        <Link
          href={list}
          id="wd-quiz-cancel"
          className="rounded bg-neutral-200 px-3 py-2 text-neutral-900 no-underline"
        >
          Cancel
        </Link>
        <button
          type="button"
          id="wd-quiz-save-publish"
          onClick={() => save(true)}
          className="rounded bg-neutral-200 px-3 py-2 text-neutral-900"
        >
          Save and Publish
        </button>
        <button
          type="button"
          id="wd-quiz-save"
          onClick={() => save(false)}
          className="rounded bg-red-600 px-3 py-2 text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}
