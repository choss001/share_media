'use client'
// components/TiptapEditor.js
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { useCallback, useState, useRef } from "react";
import styles from './styles.module.scss';
import { validateFormData } from '@/app/topic/utils/validations';
import Toolbar from '@/app/topic/components/Toolbar'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline';
import { FileAttachment } from '@/app/topic/components/fileAttachment';

interface TiptapEditorProps{
  action?: (data: FormData) => void;
  initialTitle?: string;
  initialContent?: string;
  id?: number;
  readOnly?: boolean;
}

export default function TiptapEditor({ 
  action,
  initialTitle = "",
  initialContent = "",
  id = 0,
  readOnly = false,
} : TiptapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const editor = useEditor({
    extensions: [StarterKit, Document, Paragraph, Text, Underline,
       Image.configure({ allowBase64: false }), Dropcursor, FileAttachment
    ],
    content: initialContent,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    immediatelyRender: false,
  });


  if (!editor){
    return null
  }
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (readOnly) return;

    const formData = new FormData(event.currentTarget);
    const validationResult = validateFormData(formData);
    console.log("hello");
    if(!validationResult.success) {
      alert(
        validationResult.error.errors
          .map((error) => error.message)
          .join("\n")
      );
      return;
    }
    if (action) action(formData);
  };

  

  return (
    <form onSubmit={handleSubmit} className='h-full'>
      <div className='pt-[50px] h-dvh'>
        <div className='border-4 border-gray-550 rounded-md bg-white w-full md:w-[50rem] h-full flex flex-col'>
          <div className='p-2 bg-red-50 border-4 border-pink-500 h-[50px]'>
            <input 
              className='border-solid border-white border-2 h-full w-full pl-2 pr-2 text-center text-justify'
              type="text"
              name="title"
              placeholder='write title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              readOnly={readOnly}
            />

            <input 
              className='hidden' 
              type="number"
              name="id"
              value={id ? Number(id) : ''}  // Ensures empty string if id is null/undefined
              readOnly={true}
            />
          </div>
          <div>
            <Toolbar editor={editor} content={content} readOnly={readOnly}/>
          </div>
          <div onClick={() => editor?.commands.focus()} className='flex-1 border-4 border-pink-400'>
            <EditorContent className={styles.ProseMirror} editor={editor} style={{ whiteSpace: "pre-line" }}  />
          </div>
          <input type="hidden" name="content" value={content} />
        </div>
      </div>
    </form>
  );
}
