import { useState } from "react";
import { FaCheck, FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import QuestionEditor from "./QuestionEditor";
import { RichTextView } from "../../RichText";
import * as client from "../../client";

const BUTTON = "inline-flex items-center gap-1 rounded border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-neutral-900";

// onChange stores the whole list of questions on the server, so every Save and Delete here is kept at once.
export default function QuestionsEditor({
  questions,
  onChange,
}: {
  questions: client.Question[];
  onChange: (questions: client.Question[]) => Promise<void>;
}) {
  const [editing, setEditing] = useState<string[]>([]);
  // New questions wait here and are not stored until their own Save Question is clicked.
  const [added, setAdded] = useState<client.Question[]>([]);
  const addQuestion = () =>
    setAdded([
      ...added,
      {
        _id: crypto.randomUUID(),
        type: "MULTIPLE_CHOICE",
        title: "New Question",
        points: 1,
        question: "",
        choices: ["", ""],
        answers: [],
      },
    ]);
  const stopEditing = (questionId: string) =>
    setEditing(editing.filter((id) => id !== questionId));
  const discard = (questionId: string) =>
    setAdded(added.filter((question) => question._id !== questionId));
  const update = async (question: client.Question) => {
    await onChange(questions.map((q) => (q._id === question._id ? question : q)));
    stopEditing(question._id);
  };
  const append = async (question: client.Question) => {
    await onChange([...questions, question]);
    discard(question._id);
  };
  const remove = (question: client.Question) => {
    if (window.confirm(`Are you sure you want to remove ${question.title}?`)) {
      onChange(questions.filter((q) => q._id !== question._id));
    }
  };
  return (
    <div id="wd-quiz-questions">
      {questions.length + added.length === 0 && (
        <p id="wd-questions-empty" className="text-neutral-600">
          This quiz has no questions yet. Click New Question to add one.
        </p>
      )}
      <ul id="wd-question-list" className="m-0 list-none p-0">
        {questions.map((question) =>
          editing.includes(question._id) ? (
            <li key={question._id} className="mb-3">
              <QuestionEditor
                question={question}
                onSave={update}
                onCancel={() => stopEditing(question._id)}
              />
            </li>
          ) : (
            <li key={question._id} className="wd-question mb-3 rounded border border-neutral-300">
              <div className="flex items-center justify-between gap-2 bg-neutral-100 px-3 py-2">
                <span>
                  <b className="wd-question-name">{question.title}</b>{" "}
                  <span className="text-sm text-neutral-600">
                    {client.QUESTION_TYPES[question.type]}
                  </span>
                </span>
                <span className="wd-question-pts">{question.points} pts</span>
              </div>
              <div className="p-3">
                <RichTextView value={question.question} />
                {question.type === "MULTIPLE_CHOICE" ? (
                  <ul className="wd-question-answers mt-2 mb-0 list-none p-0">
                    {question.choices.map((choice) => (
                      <li key={choice} className="flex items-center gap-2">
                        {question.answers?.includes(choice) ? (
                          <FaCheck className="text-green-600" title="Correct answer" />
                        ) : (
                          <span className="w-4" />
                        )}
                        {choice}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="wd-question-answers mt-2 mb-0">
                    {question.type === "TRUE_FALSE" ? "Correct answer: " : "Accepted answers: "}
                    {question.answers?.join(", ")}
                  </p>
                )}
                <div className="mt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    className={`wd-question-edit ${BUTTON}`}
                    onClick={() => setEditing([...editing, question._id])}
                  >
                    <FaPencilAlt /> Edit
                  </button>
                  <button
                    type="button"
                    className={`wd-question-delete ${BUTTON}`}
                    onClick={() => remove(question)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </li>
          ),
        )}
        {added.map((question) => (
          <li key={question._id} className="mb-3">
            <QuestionEditor
              question={question}
              onSave={append}
              onCancel={() => discard(question._id)}
            />
          </li>
        ))}
      </ul>
      <div className="text-center">
        <button type="button" id="wd-new-question" className={BUTTON} onClick={addQuestion}>
          <FaPlus /> New Question
        </button>
      </div>
    </div>
  );
}
