import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import RichTextEditor from "../../RichText";
import * as client from "../../client";

const FIELD = "rounded border border-neutral-300 px-3 py-2 font-sans";
const ICON_BUTTON = "border-0 bg-transparent text-neutral-600";
const ADD_BUTTON = "inline-flex items-center gap-1 border-0 bg-transparent text-red-600";

// Edits a copy of one question; nothing reaches the quiz until Save Question passes the checks.
export default function QuestionEditor({
  question,
  onSave,
  onCancel,
}: {
  question: client.Question;
  onSave: (question: client.Question) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState({ ...question, answers: question.answers ?? [] });
  // The correct choice is tracked by position, because its text changes while it is typed.
  const [correct, setCorrect] = useState(
    Math.max(0, question.choices.indexOf(question.answers?.[0] ?? "")),
  );
  const [error, setError] = useState("");
  const setItem = (list: "choices" | "answers", index: number, text: string) =>
    setDraft({ ...draft, [list]: draft[list].map((item, i) => (i === index ? text : item)) });
  // A new type keeps the title, points and question text and starts its answers over.
  const changeType = (type: string) => {
    setDraft({
      ...draft,
      type,
      choices: type === "MULTIPLE_CHOICE" ? ["", ""] : [],
      answers: type === "TRUE_FALSE" ? ["True"] : type === "FILL_IN_BLANK" ? [""] : [],
    });
    setCorrect(0);
  };
  const removeChoice = (index: number) => {
    setDraft({ ...draft, choices: draft.choices.filter((_, i) => i !== index) });
    setCorrect(index < correct ? correct - 1 : index === correct ? 0 : correct);
  };
  const save = () => {
    const choices = draft.choices.map((choice) => choice.trim());
    const answers =
      draft.type === "MULTIPLE_CHOICE"
        ? [choices[correct]]
        : draft.answers.map((answer) => answer.trim()).filter((answer) => answer);
    // Answers are graded without regard to case, so choices that differ only by case count as the same.
    const distinct = new Set(choices.map((choice) => choice.toLowerCase()));
    let problem = "";
    if (!draft.title.trim()) problem = "The question needs a title.";
    else if (draft.points < 0) problem = "Points cannot be negative.";
    else if (draft.type === "MULTIPLE_CHOICE") {
      if (choices.length < 2) problem = "Add at least two choices.";
      else if (choices.includes("")) problem = "Fill in or remove the empty choice.";
      else if (distinct.size < choices.length) problem = "Two choices are the same.";
    } else if (answers.length === 0) problem = "Add at least one accepted answer.";
    if (problem) {
      setError(problem);
      return;
    }
    onSave({ ...draft, title: draft.title.trim(), choices, answers });
  };
  return (
    <div className="wd-question-editor rounded border border-neutral-300 p-3">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <input
          className={`wd-question-title flex-1 ${FIELD}`}
          placeholder="Question title"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
        <select
          className={`wd-question-type ${FIELD}`}
          value={draft.type}
          onChange={(e) => changeType(e.target.value)}
        >
          {Object.entries(client.QUESTION_TYPES).map(([type, label]) => (
            <option key={type} value={type}>
              {label}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2">
          pts:
          <input
            type="number"
            min={0}
            className={`wd-question-points w-20 ${FIELD}`}
            value={draft.points}
            onChange={(e) => setDraft({ ...draft, points: Number(e.target.value) })}
          />
        </label>
      </div>
      <div className="mb-1 font-medium">Question:</div>
      <RichTextEditor
        id={`wd-question-text-${draft._id}`}
        value={draft.question}
        onChange={(question) => setDraft((d) => ({ ...d, question }))}
      />
      <div className="mt-3 mb-1 font-medium">Answers:</div>
      {draft.type === "MULTIPLE_CHOICE" && (
        <>
          {draft.choices.map((choice, index) => (
            <div key={index} className="wd-question-choice mb-2 flex items-center gap-2">
              <input
                type="radio"
                name={`wd-correct-${draft._id}`}
                title="Correct answer"
                checked={index === correct}
                onChange={() => setCorrect(index)}
              />
              <textarea
                rows={2}
                className={`flex-1 ${FIELD}`}
                placeholder={index === correct ? "Correct answer" : "Possible answer"}
                value={choice}
                onChange={(e) => setItem("choices", index, e.target.value)}
              />
              <button
                type="button"
                title="Remove choice"
                className={`wd-remove-choice ${ICON_BUTTON}`}
                onClick={() => removeChoice(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            className={`wd-add-choice ${ADD_BUTTON}`}
            onClick={() => setDraft({ ...draft, choices: [...draft.choices, ""] })}
          >
            <FaPlus /> Add Another Answer
          </button>
        </>
      )}
      {draft.type === "TRUE_FALSE" && (
        <div className="flex gap-4">
          {["True", "False"].map((value) => (
            <label key={value} className="wd-question-true-false flex items-center gap-2">
              <input
                type="radio"
                name={`wd-correct-${draft._id}`}
                checked={draft.answers[0] === value}
                onChange={() => setDraft({ ...draft, answers: [value] })}
              />
              {value}
            </label>
          ))}
        </div>
      )}
      {draft.type === "FILL_IN_BLANK" && (
        <>
          {draft.answers.map((answer, index) => (
            <div key={index} className="wd-question-blank mb-2 flex items-center gap-2">
              <input
                className={`flex-1 ${FIELD}`}
                placeholder="Possible answer"
                value={answer}
                onChange={(e) => setItem("answers", index, e.target.value)}
              />
              <button
                type="button"
                title="Remove answer"
                className={`wd-remove-blank ${ICON_BUTTON}`}
                onClick={() =>
                  setDraft({ ...draft, answers: draft.answers.filter((_, i) => i !== index) })
                }
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            className={`wd-add-blank ${ADD_BUTTON}`}
            onClick={() => setDraft({ ...draft, answers: [...draft.answers, ""] })}
          >
            <FaPlus /> Add Another Answer
          </button>
        </>
      )}
      {error && <p className="wd-question-error mt-3 mb-0 text-red-600">{error}</p>}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="wd-question-cancel rounded bg-neutral-200 px-3 py-2 text-neutral-900"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="wd-question-save rounded bg-red-600 px-3 py-2 text-white"
          onClick={save}
        >
          Save Question
        </button>
      </div>
    </div>
  );
}
