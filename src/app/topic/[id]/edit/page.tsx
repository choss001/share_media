import { notFound } from "next/navigation";
import EditClient from "../../components/editClient"; // Import client-side component

export default async function EditPage({ params }: { params: { id: string } }) {
  // Fetch data server-side
  const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap/${params.id}`,{
    cache: "no-store",
  });
  
  if (!res.ok) {
    notFound(); // Show 404 page if the topic is not found
  }

  const topic = await res.json();

  return <EditClient topic={topic} />; // Pass data to Client Component
}
