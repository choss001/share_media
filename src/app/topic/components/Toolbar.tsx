"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Image,
} from "lucide-react";
import { useCallback, useState, useRef } from "react";
import { uploadImage } from '@/app/topic/utils/uploadImage';

type Props = {
  editor: Editor | null;
  content: string;
  readOnly: boolean;
};

const Toolbar = ({ editor, readOnly = false }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  
  if (!editor) {
    return null;
  }
  return (
    <div
      className="px-1 py-1 rounded-tl-md rounded-tr-md flex
      items-center w-full flex-wrap border border-gray-700 h-full"
    >
      <div className="flex justify-start items-center gap-2 w-11/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-sky-700 text-white p-1 rounded-lg hover:bg-sky-200"
              : "text-sky-400 p-1 hover:text-sky-200"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400 p-1 hover:text-sky-200"
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400 p-1 hover:text-sky-200"
          }
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400 p-1 hover:text-sky-200"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400 p-1 hover:text-sky-200"
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400 p-1 hover:text-sky-200"
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400 p-1 hover:text-sky-200"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400 p-1 hover:text-sky-200"
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400 p-1 hover:text-sky-200"
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Redo className="w-5 h-5" />
        </button>

        {!readOnly && (
          <div className='flex'>
            <button 
              onClick={() => handleImageUploadButtonClick()}
              className="text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg" 
            > 
              <Image className="w-5 h-5"/>
            </button>
            <input 
              className='hidden' 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} />
          </div>
        )}

      </div>

      {!readOnly && (
        // <div className='flex items-center justify-center pt-2 pb-2'>
        <div className="flex items-center pt-2 pb-2 w-1/12 lg:pt-0 lg:pb-0">
          <button className='bg-blue-500 rounded-md w-[4rem] h-[3rem]' type="submit">Save</button>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
