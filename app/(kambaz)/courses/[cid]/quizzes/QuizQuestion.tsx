import { RichTextView } from "./RichText";
import * as client from "./client";
import { useAnswersStore } from "./store";

// One question of a quiz being taken, or of a graded attempt, where the answer can no longer change.
export default function QuizQuestion({
  number,
  question,
}: {
  number: number;
  question: client.Question | client.AnsweredQuestion;
}) {
  const answer = useAnswersStore((state) => state.answers[question._id] ?? "");
  const setAnswer = useAnswersStore((state) => state.setAnswer);
  const graded = "correct" in question;
  const given = graded ? question.given : answer;
  const options = question.type === "TRUE_FALSE" ? ["True", "False"] : question.choices;
  return (
    <div className="wd-quiz-question mb-4">
      {graded && !question.correct && (
        <span className="wd-quiz-incorrect inline-block bg-red-600 px-2 py-0.5 text-sm font-semibold text-white">
          Incorrect
        </span>
      )}
      <div className="border border-neutral-300">
        <div className="flex justify-between border-b border-neutral-300 bg-neutral-100 px-3 py-2 font-semibold">
          <span>Question {number}</span>
          <span className="wd-quiz-question-points">
            {graded && `${question.correct ? question.points : 0} / `}
            {question.points} pts
          </span>
        </div>
        <div className="p-3">
          <RichTextView value={question.question} />
          {question.type === "FILL_IN_BLANK" ? (
            <input
              type="text"
              className="wd-quiz-answer mt-3 block w-full max-w-sm rounded border border-neutral-300 px-2 py-1.5"
              value={given}
              disabled={graded}
              onChange={(e) => setAnswer(question._id, e.target.value)}
            />
          ) : (
            options.map((option) => (
              <label key={option} className="mt-2 flex items-center gap-2 border-t border-neutral-200 pt-2">
                <input
                  type="radio"
                  className="wd-quiz-answer"
                  name={question._id}
                  checked={given === option}
                  disabled={graded}
                  onChange={() => setAnswer(question._id, option)}
                />
                {option}
              </label>
            ))
          )}
          {graded && question.answers && (
            <p className="wd-quiz-correct-answer mt-3 mb-0 text-sm text-neutral-600">
              <b>Correct answer:</b> {question.answers.join(" or ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
