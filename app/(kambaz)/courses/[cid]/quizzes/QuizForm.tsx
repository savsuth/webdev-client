import { useEffect } from "react";
import QuizQuestion from "./QuizQuestion";
import * as client from "./client";
import { useAnswersStore } from "./store";

// The quiz as it is taken, by a student or in the faculty preview; onSubmit receives the answers.
export default function QuizForm({
  quiz,
  onSubmit,
}: {
  quiz: client.Quiz;
  onSubmit: (answers: Record<string, string>) => void;
}) {
  const answers = useAnswersStore((state) => state.answers);
  const clearAnswers = useAnswersStore((state) => state.clearAnswers);
  // Leaving the form, after Submit or without it, discards the answers in progress.
  useEffect(() => clearAnswers, [clearAnswers]);
  const submit = () => {
    const unanswered = quiz.questions.filter((q) => !answers[q._id]?.trim()).length;
    const warning =
      unanswered === 1 ? "1 question is unanswered." : `${unanswered} questions are unanswered.`;
    if (unanswered > 0 && !window.confirm(`${warning} Submit anyway?`)) return;
    onSubmit(answers);
  };
  return (
    <div id="wd-quiz-form">
      {quiz.questions.map((question, index) => (
        <QuizQuestion key={question._id} number={index + 1} question={question} />
      ))}
      <div className="flex justify-end border border-neutral-300 p-3">
        <button
          type="button"
          id="wd-quiz-submit"
          onClick={submit}
          className="rounded bg-red-600 px-3 py-2 text-white"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
