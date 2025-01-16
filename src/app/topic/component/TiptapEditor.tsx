// components/TiptapEditor.js
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { useState } from "react";

const uploadImage = async(file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap/image`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log(data);
  console.log(`why!! ${process.env.NEXT_PUBLIC_SPRING_API_URL}/${data.contents}`)
  return `${process.env.NEXT_PUBLIC_SPRING_API_URL}/${data.contents}`;
}

export default function TiptapEditor({ action } : { action: (data: FormData) => void}) {
  const [content, setContent] = useState("");
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Image.configure({ allowBase64: false }), Dropcursor],
    content: `
        <p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://placehold.co/800x400" />
        <img src="https://placehold.co/800x400/6A00F5/white" />
      `,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      console.log(content);
    },
  });

  if (!editor) {
    return null; // Avoid rendering until editor is fully initialized
  }

  const handleImageUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imageUrl = await uploadImage(file);
    editor?.chain().focus().setImage({ src: imageUrl }).run();
  }

  return (
    <form action={action}>
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <EditorContent editor={editor} />
        <input type="hidden" name="content" value={content} />
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
