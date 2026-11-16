import QuizQuestion from "./QuizQuestion";
import * as client from "./client";

// A graded attempt: the score, when it was submitted, and every question with the answer given.
export default function AttemptResult({ attempt }: { attempt: client.Attempt }) {
  const score = `${attempt.score} out of ${attempt.points}`;
  return (
    <div id="wd-quiz-result">
      <p id="wd-quiz-score" className="mb-1 text-lg font-semibold">
        Score for this quiz: {score}
      </p>
      <p id="wd-quiz-submitted" className="mb-4 text-neutral-600">
        Submitted {client.formatDate(attempt.submitted)}
      </p>
      {attempt.questions.map((question, index) => (
        <QuizQuestion key={question._id} number={index + 1} question={question} />
      ))}
      <p className="mb-4 text-right font-semibold">Quiz Score: {score}</p>
    </div>
  );
}
