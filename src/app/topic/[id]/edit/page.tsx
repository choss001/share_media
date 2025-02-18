"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { saveContent } from "@/app/topic/utils/action";

// Dynamically import TiptapEditor (no SSR)
const TiptapEditor = dynamic(() => import("../../components/TiptapEditor"), { ssr: false });

export default function EditPage({ params }: { params: { id: string } }) {
  const [topic, setTopic] = useState<{ title: string; contents: string; id: number} | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchTopic() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch topic");
        const data = await res.json();
        console.log(data)
        setTopic(data);
      } catch (error) {
        console.error(error);
        alert("Error loading topic");
        router.push("/topic"); // Redirect if the topic is not found
      }
    }
    fetchTopic();
  }, [params.id, router]);

  const handleSaveContent = (formData: FormData) => {
    const token = localStorage.getItem("token");
    saveContent(
      formData,
      token,
      () => {
        console.log("Content updated successfully");
        router.push(`/topic`); // Redirect to view page
      },
      (error) => {
        alert(error);
      }
    );
  };

  // Show loading state while fetching
  if (!topic) {
    return <p>Loading...</p>;
  }
  console.log('topic')
  console.log(`${topic.title}`)
  console.log(`${topic.contents}`)

  return (
    <div>
      <TiptapEditor action={handleSaveContent} 
        initialTitle={topic.title} 
        initialContent={topic.contents}
        id={topic.id}
         />
    </div>
  );
}
