'use client';
import dynamic from 'next/dynamic';
import { saveContent } from '@/app/topic/utils/action';
import { useRouter } from 'next/navigation';

// Dynamically import TiptapEditor
const TiptapEditor = dynamic(() => import('@/app/topic/components/TiptapEditor'), { ssr: false });

export default function Tiptap() {

  const router = useRouter();
  const handleSaveContent = (formData: FormData) => {
    const token = localStorage.getItem('token');
    saveContent(
      formData,
      token,
      () => {
        console.log('Content saved successfully');
        router.push('/topic');
      },
      (error) => {
        alert(error);
      }
    )
  }

  return (
    <div className=''>
      <TiptapEditor action={handleSaveContent}/>
    </div>
  );
}