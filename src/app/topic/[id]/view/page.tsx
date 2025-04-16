'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Assume this utility function fetches content by ID
import { getContentById } from '@/app/topic/utils/action';

export default function ViewTopic() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [content, setContent] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getContentById(id)
      .then((data) => {
        console.log(data)
        setTitle(data.title)
        return data})
      .then((data) => setContent(data.contents))
      .catch((err) => setError(`Failed to load content. ${err}`));
  }, [id]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!content) return <div>Loading...</div>;

  return (
    <div className="pt-[50px]">
      <h1 className='text-3xl font-bold mb-6'>{title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
