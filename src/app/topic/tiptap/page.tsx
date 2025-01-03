'use client';
import dynamic from 'next/dynamic';

// Dynamically import TiptapEditor
const TiptapEditor = dynamic(() => import('../component/TiptapEditor'), { ssr: false });

export default function Tiptap() {
  return (
    <div>
      <h1>My Tiptap Editor</h1>
      <TiptapEditor/>
    </div>
  );
}