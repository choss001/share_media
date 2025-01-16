'use client';
import dynamic from 'next/dynamic';
import { saveContent } from '@/app/topic/component/action';

// Dynamically import TiptapEditor
const TiptapEditor = dynamic(() => import('../component/TiptapEditor'), { ssr: false });

export default function Tiptap() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center'>
      <div className='row-start-2'>
        <h1>My Tiptap Editor</h1>
        <TiptapEditor action={saveContent}/>
      </div>
    </div>
  );
}