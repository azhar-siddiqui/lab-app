"use client";

import { TestGroupFormValuesType } from "@/validation/test-group";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Menubar } from "./components/ui/menubar";

export function RichTextEditor({
  field,
}: Readonly<{
  field: ControllerRenderProps<TestGroupFormValuesType, "interpretation">;
}>) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    editorProps: {
      attributes: {
        class:
          "min-h-62.5 p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none",
      },
    },

    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : "",
  });

  useEffect(() => {
    if (!editor) return;

    if (field.value) {
      editor.commands.setContent(JSON.parse(field.value));
    } else {
      editor.commands.clearContent(); // reset editor
    }
  }, [field.value, editor]);

  return (
    <div className="w-full border border-border rounded-lg overflow-hidden dark:bg-input/30">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
