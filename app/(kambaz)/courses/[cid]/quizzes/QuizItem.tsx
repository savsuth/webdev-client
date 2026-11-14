import { useState } from "react";
import Link from "next/link";
import { FaBan, FaRocket } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
import * as client from "./client";

const MENU_ITEM = "block w-full px-3 py-1.5 text-left text-neutral-900 no-underline hover:bg-neutral-100";

export default function QuizItem({
  cid,
  quiz,
  canEdit,
  onDelete,
  onTogglePublished,
}: {
  cid: string;
  quiz: client.Quiz;
  canEdit: boolean;
  onDelete: () => void;
  onTogglePublished: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const href = `/courses/${cid}/quizzes/${quiz._id}`;
  const questions = quiz.questions.length;
  return (
    <li className="wd-quiz-list-item mb-3 flex gap-3 border border-neutral-300 border-l-[3px] border-l-green-600 bg-white p-3">
      <FaRocket className="mt-1 shrink-0 text-xl text-green-700" />
      <div className="flex-1">
        <Link href={href} className="wd-quiz-link font-semibold text-neutral-900 no-underline">
          {quiz.title}
        </Link>
        <div className="wd-quiz-details mt-1 text-sm text-neutral-600">
          <b>{client.availability(quiz)}</b> |{" "}
          {quiz.due ? (
            <>
              <b>Due</b> {client.formatDate(quiz.due)}
            </>
          ) : (
            "No due date"
          )}{" "}
          | {client.quizPoints(quiz)} pts | {questions}{" "}
          {questions === 1 ? "Question" : "Questions"}
        </div>
      </div>
      {/* Only faculty see whether a quiz is published, publish it, and open its menu. */}
      {canEdit && (
        <div className="relative flex items-start gap-2">
          <button
            type="button"
            className="wd-quiz-publish border-0 bg-transparent"
            title={quiz.published ? "Published. Click to unpublish." : "Unpublished. Click to publish."}
            onClick={onTogglePublished}
          >
            {quiz.published ? <GreenCheckmark /> : <FaBan className="text-xl text-neutral-500" />}
          </button>
          <button
            type="button"
            className="wd-quiz-menu-button border-0 bg-transparent"
            title="Quiz menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <IoEllipsisVertical className="text-xl" />
          </button>
          {menuOpen && (
            <div className="wd-quiz-menu absolute top-7 right-0 z-10 w-32 rounded border border-neutral-300 bg-white py-1 text-sm shadow">
              <Link href={href} className={`wd-quiz-edit ${MENU_ITEM}`}>
                Edit
              </Link>
              <button
                type="button"
                className={`wd-quiz-delete border-0 bg-transparent ${MENU_ITEM}`}
                onClick={() => {
                  setMenuOpen(false);
                  if (window.confirm(`Are you sure you want to remove ${quiz.title}?`)) {
                    onDelete();
                  }
                }}
              >
                Delete
              </button>
              <button
                type="button"
                className={`wd-quiz-toggle-publish border-0 bg-transparent ${MENU_ITEM}`}
                onClick={() => {
                  setMenuOpen(false);
                  onTogglePublished();
                }}
              >
                {quiz.published ? "Unpublish" : "Publish"}
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
