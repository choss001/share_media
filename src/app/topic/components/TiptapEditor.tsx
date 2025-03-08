'use client'
// components/TiptapEditor.js
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { useCallback, useState, useRef } from "react";
import styles from './styles.scss';
import { uploadImage } from '@/app/topic/utils/uploadImage';
import { validateFormData } from '@/app/topic/utils/validations';

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
    extensions: [Document, Paragraph, Text, Image.configure({ allowBase64: false }), Dropcursor],
    content: initialContent,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const handleImageUploadButtonClick = () =>{
    fileInputRef.current?.click();
  }

  const handleImageUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('are you in here?');
    const file = event.target.files?.[0];
    if (!file) return;
    const imageUrl = await uploadImage(file);
    editor?.chain().focus().setImage({ src: imageUrl }).run();
  }
  
  const handleImageUploadButton = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("URL")
    if(url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])
  /* if editor not enough render this code return null
  if (!editor){
    return null
  }
  */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (readOnly) return;

    const formData = new FormData(event.currentTarget);
    const validationResult = validateFormData(formData);
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
    <form onSubmit={handleSubmit}>
      <div className='p-[1px] bg-gray-500 relative'>
        <div className='rounded-md bg-white w-[50rem] h-full'>
          <div className='p-2 bg-red-50 h-12'>
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
          {!readOnly && (
            <div className='flex'>
              <button 
                className='bg-blue-50 mr-5' 
                onClick={() => handleImageUploadButtonClick()}
                type='button'
              >
                this is first button
              </button>
              <input 
                className='hidden' 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} />
              <button className='bg-red-50' onClick={handleImageUploadButton}> this is button</button>
            </div>
          )}
          <EditorContent className={styles.ProseMirror} editor={editor} />
          <input type="hidden" name="content" value={content} />
          {!readOnly && (
            <div className='flex items-center justify-center pt-2 pb-2'>
              <button className='bg-blue-500 rounded-md w-[4rem] h-[3rem]' type="submit">Save</button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
