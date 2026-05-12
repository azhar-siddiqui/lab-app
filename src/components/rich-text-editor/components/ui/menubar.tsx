"use client";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BoldIcon,
  Heading1,
  Heading2,
  Heading3,
  ItalicIcon,
  ListIcon,
  ListOrdered,
  RedoIcon,
  Strikethrough,
  Underline,
  UndoIcon,
} from "lucide-react";

interface MenubarProps {
  editor: Editor | null;
}

export function Menubar({ editor }: Readonly<MenubarProps>) {
  if (!editor) return null;

  return (
    <div className="border border-input border-t-0 border-x-0 rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  aria-label="Toggle bold"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <BoldIcon />
                </Toggle>
              }
            />
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  aria-label="Toggle italic"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <ItalicIcon />
                </Toggle>
              }
            />
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  aria-label="Toggle Strike"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                  <Strikethrough />
                </Toggle>
              }
            />
            <TooltipContent>Strike</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  aria-label="Toggle Underline"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <Underline />
                </Toggle>
              }
            />
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  aria-label="Toggle Heading 1"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  <Heading1 />
                </Toggle>
              }
            />
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  aria-label="Toggle Heading 2"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  <Heading2 />
                </Toggle>
              }
            />
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  aria-label="Toggle Heading 3"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                >
                  <Heading3 />
                </Toggle>
              }
            />
            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  aria-label="Toggle Bullet List"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                >
                  <ListIcon />
                </Toggle>
              }
            />
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  aria-label="Toggle Order List"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                >
                  <ListOrdered />
                </Toggle>
              }
            />
            <TooltipContent>Ordered List</TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  aria-label="Toggle Align Left"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                >
                  <AlignLeft />
                </Toggle>
              }
            />
            <TooltipContent>Align Left</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  aria-label="Toggle Align Center"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                >
                  <AlignCenter />
                </Toggle>
              }
            />
            <TooltipContent>Align Center</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  aria-label="Toggle Align Right"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                >
                  <AlignRight />
                </Toggle>
              }
            />
            <TooltipContent>Align Right</TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  aria-label="Undo Content"
                  size="icon-sm"
                  variant="ghost"
                  type="button"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={editor.can().chain().focus().undo().run()}
                >
                  <UndoIcon />
                </Button>
              }
            />
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  aria-label="Redo Content"
                  size="icon-sm"
                  variant="ghost"
                  type="button"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={editor.can().chain().focus().redo().run()}
                >
                  <RedoIcon />
                </Button>
              }
            />
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
