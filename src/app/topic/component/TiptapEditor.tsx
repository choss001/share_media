// components/TiptapEditor.js
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { useCallback, useState, useRef } from "react";
import styles from './styles.scss';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
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


  const handleImageUploadButtonClick = () =>{
    fileInputRef.current?.click();
  }

  const handleImageUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
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
  

  return (
    <form action={action}>
      <div className='p-[1px] bg-gray-500 relative'>
        <div className='rounded-md bg-white w-[50rem] h-full'>
          <div className='p-2 bg-red-50 h-12'>
            <input 
              className='border-solid border-white border-2 h-full w-full pl-2 pr-2 text-center text-justify'
              type="text"
              name="title"
              placeholder='write title'
            />
          </div>
          <div className='flex'>
            <button className='bg-blue-50 mr-5' onClick={() => handleImageUploadButtonClick()}>this is first button</button>
            <input 
              className='hidden' 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} />
            <button className='bg-red-50' onClick={handleImageUploadButton}> this is button</button>
          </div>
          <EditorContent className={styles.ProseMirror} editor={editor} />
          <input type="hidden" name="content" value={content} />
          <div className='flex items-center justify-center pt-2 pb-2'>
            <button className='bg-blue-500 rounded-md w-[4rem] h-[3rem]' type="submit">Save</button>
          </div>
        </div>
      </div>
    </form>
  );
}
