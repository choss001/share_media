"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { saveContent } from "@/app/topic/utils/action";

// Dynamically import TiptapEditor (no SSR)
const TiptapEditor = dynamic(() => import("./TiptapEditor"), { ssr: false });

interface Topic {
  title: string;
  contents: string;
  id: number;
}

export default function EditClient({ topic }: { topic: Topic }) {
  const router = useRouter();

  const handleSaveContent = (formData: FormData) => {
    const token = localStorage.getItem("token");
    saveContent(
      formData,
      token,
      () => {
        console.log("Content updated successfully");
        router.push(`/topic`);
      },
      (error) => {
        alert(error);
      }
    );
  };

  return (
    <div>
      <TiptapEditor 
        action={handleSaveContent} 
        initialTitle={topic.title} 
        initialContent={topic.contents}
        id={topic.id}
      />
    </div>
  );
}
