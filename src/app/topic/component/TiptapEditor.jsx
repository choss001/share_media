// components/TiptapEditor.js
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Image, Dropcursor],
    content: `
        <p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://placehold.co/800x400" />
        <img src="https://placehold.co/800x400/6A00F5/white" />
      `,
  });

  if (!editor) {
    return null; // Avoid rendering until editor is fully initialized
  }

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
}
