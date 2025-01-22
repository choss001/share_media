'use client';
import dynamic from 'next/dynamic';
import { saveContent } from '@/app/topic/component/action';

// Dynamically import TiptapEditor
const TiptapEditor = dynamic(() => import('../component/TiptapEditor'), { ssr: false });


export default function Tiptap() {

  return (
    <div className=''>
      <div className=''>
        <TiptapEditor action={saveContent}/>
      </div>
    </div>
  );
}