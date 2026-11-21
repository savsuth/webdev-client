import { useEffect, useState } from "react";
import QuizQuestion from "./QuizQuestion";
import * as client from "./client";
import { useAnswersStore } from "./store";

const NAV_BUTTON = "rounded border border-neutral-300 bg-neutral-100 px-3 py-2 disabled:opacity-50";

// Shuffle a copy of the choices, so the quiz keeps the order the faculty wrote.
const shuffled = (choices: string[]) => {
  const copy = [...choices];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

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
  // The choices of multiple choice questions are shuffled once each time the form opens.
  const [questions] = useState(() =>
    quiz.questions.map((question) =>
      quiz.shuffleAnswers && question.type === "MULTIPLE_CHOICE"
        ? { ...question, choices: shuffled(question.choices) }
        : question,
    ),
  );
  const [index, setIndex] = useState(0);
  // Leaving the form, after Submit or without it, discards the answers in progress.
  useEffect(() => clearAnswers, [clearAnswers]);
  const oneAtATime = quiz.oneQuestionAtATime;
  const last = index >= questions.length - 1;
  const submit = () => {
    const unanswered = questions.filter((q) => !answers[q._id]?.trim()).length;
    const warning =
      unanswered === 1 ? "1 question is unanswered." : `${unanswered} questions are unanswered.`;
    if (unanswered > 0 && !window.confirm(`${warning} Submit anyway?`)) return;
    onSubmit(answers);
  };
  return (
    <div id="wd-quiz-form">
      {questions.map(
        (question, i) =>
          (!oneAtATime || i === index) && (
            <QuizQuestion key={question._id} number={i + 1} question={question} />
          ),
      )}
      <div className="flex items-center justify-between gap-2 border border-neutral-300 p-3">
        {oneAtATime ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="wd-quiz-previous"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
              className={NAV_BUTTON}
            >
              Previous
            </button>
            <span id="wd-quiz-position">
              Question {Math.min(index + 1, questions.length)} of {questions.length}
            </span>
            <button
              type="button"
              id="wd-quiz-next"
              disabled={last}
              onClick={() => setIndex(index + 1)}
              className={NAV_BUTTON}
            >
              Next
            </button>
          </div>
        ) : (
          <span />
        )}
        {(!oneAtATime || last) && (
          <button
            type="button"
            id="wd-quiz-submit"
            onClick={submit}
            className="rounded bg-red-600 px-3 py-2 text-white"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}
