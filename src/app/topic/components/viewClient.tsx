"use client";

import dynamic from "next/dynamic";

// Dynamically import TiptapEditor (no SSR)
const TiptapEditor = dynamic(() => import("./TiptapEditor"), { ssr: false });

interface Topic {
  title: string;
  contents: string;
  id: number;
}

export default function EditClient({ topic }: { topic: Topic }) {

  return (
    <div>
      <TiptapEditor 
        initialTitle={topic.title} 
        initialContent={topic.contents}
        id={topic.id}
        readOnly={true}
      />
    </div>
  );
}
