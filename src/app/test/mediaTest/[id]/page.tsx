'use client'
import { useRouter } from "next/navigation";
import VideoPlayer from "../VideoPlayer";

export default function VideoPage({ params}: {params: {id: string}}) {
  const router = useRouter();
  const id = params.id;

  if (!id) return <p>Loading video...</p>;

  return (
    <div>
      <h1>Streaming Video ID: {id}</h1>
      <VideoPlayer videoId={id} />
    </div>
  );
}
