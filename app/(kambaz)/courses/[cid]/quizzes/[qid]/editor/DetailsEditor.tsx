import RichTextEditor from "../../RichText";
import * as client from "../../client";

const LABEL = "mb-1 block font-medium";
const FIELD = "w-full rounded border border-neutral-300 px-3 py-2 font-sans";
const CHECK = "flex items-center gap-2";

// The Details tab edits the draft held by the editor screen; nothing is stored until Save.
export default function DetailsEditor({
  quiz,
  onChange,
}: {
  quiz: client.Quiz;
  onChange: (updates: Partial<client.Quiz>) => void;
}) {
  return (
    <div id="wd-quiz-details-editor">
      <div className="mb-4">
        <label htmlFor="wd-quiz-title" className={LABEL}>
          Title
        </label>
        <input
          id="wd-quiz-title"
          value={quiz.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className={FIELD}
        />
      </div>
      <div className="mb-4">
        <div className={LABEL}>Description</div>
        <RichTextEditor
          id="wd-quiz-description"
          value={quiz.description ?? ""}
          onChange={(description) => onChange({ description })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="wd-quiz-type" className={LABEL}>
          Quiz Type
        </label>
        <select
          id="wd-quiz-type"
          value={quiz.quizType}
          onChange={(e) => onChange({ quizType: e.target.value })}
          className={FIELD}
        >
          <option>Graded Quiz</option>
          <option>Practice Quiz</option>
          <option>Graded Survey</option>
          <option>Ungraded Survey</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="wd-quiz-group" className={LABEL}>
          Assignment Group
        </label>
        <select
          id="wd-quiz-group"
          value={quiz.assignmentGroup}
          onChange={(e) => onChange({ assignmentGroup: e.target.value })}
          className={FIELD}
        >
          <option>Quizzes</option>
          <option>Exams</option>
          <option>Assignments</option>
          <option>Project</option>
        </select>
      </div>
      <div className="mb-4">
        <div className={LABEL}>Options</div>
        <div className="flex flex-col gap-2 rounded border border-neutral-300 p-3">
          <label htmlFor="wd-quiz-shuffle" className={CHECK}>
            <input
              type="checkbox"
              id="wd-quiz-shuffle"
              checked={quiz.shuffleAnswers}
              onChange={(e) => onChange({ shuffleAnswers: e.target.checked })}
            />
            Shuffle Answers
          </label>
          <label htmlFor="wd-quiz-time-limit" className={CHECK}>
            Time Limit
            <input
              type="number"
              min={1}
              id="wd-quiz-time-limit"
              value={quiz.timeLimit}
              onChange={(e) => onChange({ timeLimit: Number(e.target.value) })}
              className="w-20 rounded border border-neutral-300 px-2 py-1"
            />
            Minutes
          </label>
          {/* A quiz without multiple attempts always allows exactly one. */}
          <label htmlFor="wd-quiz-multiple-attempts" className={CHECK}>
            <input
              type="checkbox"
              id="wd-quiz-multiple-attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) =>
                onChange({
                  multipleAttempts: e.target.checked,
                  howManyAttempts: e.target.checked ? quiz.howManyAttempts : 1,
                })
              }
            />
            Multiple Attempts
          </label>
          {quiz.multipleAttempts && (
            <label htmlFor="wd-quiz-attempts" className={`ms-6 ${CHECK}`}>
              How Many Attempts
              <input
                type="number"
                min={1}
                id="wd-quiz-attempts"
                value={quiz.howManyAttempts}
                onChange={(e) => onChange({ howManyAttempts: Number(e.target.value) })}
                className="w-20 rounded border border-neutral-300 px-2 py-1"
              />
            </label>
          )}
          <label htmlFor="wd-quiz-one-question" className={CHECK}>
            <input
              type="checkbox"
              id="wd-quiz-one-question"
              checked={quiz.oneQuestionAtATime}
              onChange={(e) => onChange({ oneQuestionAtATime: e.target.checked })}
            />
            One Question at a Time
          </label>
          <label htmlFor="wd-quiz-webcam" className={CHECK}>
            <input
              type="checkbox"
              id="wd-quiz-webcam"
              checked={quiz.webcamRequired}
              onChange={(e) => onChange({ webcamRequired: e.target.checked })}
            />
            Webcam Required
          </label>
          <label htmlFor="wd-quiz-lock-questions" className={CHECK}>
            <input
              type="checkbox"
              id="wd-quiz-lock-questions"
              checked={quiz.lockQuestionsAfterAnswering}
              onChange={(e) => onChange({ lockQuestionsAfterAnswering: e.target.checked })}
            />
            Lock Questions After Answering
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="wd-quiz-show-answers" className={LABEL}>
          Show Correct Answers
        </label>
        <select
          id="wd-quiz-show-answers"
          value={quiz.showCorrectAnswers}
          onChange={(e) => onChange({ showCorrectAnswers: e.target.value })}
          className={FIELD}
        >
          <option>Immediately</option>
          <option>After due date</option>
          <option>Never</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="wd-quiz-access-code" className={LABEL}>
          Access Code
        </label>
        <input
          id="wd-quiz-access-code"
          value={quiz.accessCode ?? ""}
          onChange={(e) => onChange({ accessCode: e.target.value })}
          className={FIELD}
        />
      </div>
      <div className="mb-4">
        <div className={LABEL}>Assign</div>
        <div className="rounded border border-neutral-300 p-3">
          <label htmlFor="wd-quiz-due" className={LABEL}>
            Due
          </label>
          <input
            type="datetime-local"
            id="wd-quiz-due"
            value={quiz.due ?? ""}
            onChange={(e) => onChange({ due: e.target.value })}
            className={`${FIELD} mb-3`}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="wd-quiz-available" className={LABEL}>
                Available from
              </label>
              <input
                type="datetime-local"
                id="wd-quiz-available"
                value={quiz.available ?? ""}
                onChange={(e) => onChange({ available: e.target.value })}
                className={FIELD}
              />
            </div>
            <div>
              <label htmlFor="wd-quiz-until" className={LABEL}>
                Until
              </label>
              <input
                type="datetime-local"
                id="wd-quiz-until"
                value={quiz.until ?? ""}
                onChange={(e) => onChange({ until: e.target.value })}
                className={FIELD}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
