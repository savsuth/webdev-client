"use client";

import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FaBold, FaItalic, FaListOl, FaListUl } from "react-icons/fa";

// Tailwind removes list markers, so the lists inside rich text get them back here.
const CONTENT = "[&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6";
const BUTTON = "rounded border-0 p-2";

// The WYSIWYG field for a quiz description or a question; onChange receives HTML, or "" when empty.
export default function RichTextEditor({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    // Tiptap asks for this under Next.js, so the editor is created in the browser only.
    immediatelyRender: false,
    editorProps: { attributes: { id, class: `min-h-24 px-3 py-2 outline-none ${CONTENT}` } },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? "" : editor.getHTML()),
  });
  // The toolbar re-renders only when one of these marks turns on or off.
  const active = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor?.isActive("bold"),
      italic: editor?.isActive("italic"),
      bulletList: editor?.isActive("bulletList"),
      orderedList: editor?.isActive("orderedList"),
    }),
  });
  if (!editor) return null;
  const pressed = (on?: boolean) => `${BUTTON} ${on ? "bg-neutral-300" : "bg-transparent"}`;
  return (
    <div className="rounded border border-neutral-300">
      <div className="flex gap-1 border-b border-neutral-300 bg-neutral-100 p-1">
        <button
          type="button"
          title="Bold"
          className={pressed(active?.bold)}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FaBold />
        </button>
        <button
          type="button"
          title="Italic"
          className={pressed(active?.italic)}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FaItalic />
        </button>
        <button
          type="button"
          title="Bulleted list"
          className={pressed(active?.bulletList)}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FaListUl />
        </button>
        <button
          type="button"
          title="Numbered list"
          className={pressed(active?.orderedList)}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FaListOl />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

// Saved rich text is shown through a read-only editor, so only the formatting Tiptap knows is rendered.
export function RichTextView({ value }: { value: string }) {
  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: value,
      editable: false,
      immediatelyRender: false,
      editorProps: { attributes: { class: CONTENT } },
    },
    [value],
  );
  return <EditorContent editor={editor} />;
}
