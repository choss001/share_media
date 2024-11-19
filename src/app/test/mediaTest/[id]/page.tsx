'use client'
import VideoPlayer from "../VideoPlayer";

export default function VideoPage({ params}: {params: {id: string}}) {
  const id = params.id;

  if (!id) return <p>Loading video...</p>;

  return (
    <div className="flex justify-center items-center h-full">
      <VideoPlayer videoId={id} />
    </div>
  );
}
