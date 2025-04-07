'use client'
import { useAuth } from '@/app/context/Authcontext';
import { useRouter } from 'next/navigation';
import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import Hls from "hls.js";

interface MediaFile {
  title: string;
  content: string;
  publicYn: string;
  fileNameUid: string;
}

export default function VideoPage({ params }: { params: { fileNameUid: string } }) {

  const fileNameUid = params.fileNameUid;
  // const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
  const videoRef = useRef<HTMLVideoElement>(null)
  // const source = `${apiUrl}/resource/media/hls/${fileNameUid}/master.m3u8`
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [media, setMedia] = useState<MediaFile | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;

  const deleteMedia = async () => {
    try {
      const response = await fetch(`${apiUrl}/deleteMedia/${fileNameUid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      if (response.ok) {
        alert("Delete success!");
        router.push('/services');
      } else if (response.status === 401) {
        alert("You do not have authorization");
      } else if (response.status === 500) {
        alert("Delete failed due to an internal error. Try again later");
      }
    } catch (error) {
      alert("Can't delete: " + error);
    }
  };

  useEffect(() => {
    const getMediaFile = async () => {
      try {
        const response = await fetch(`${apiUrl}/media/${fileNameUid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        });

        if (response.ok) {
          const media: MediaFile = await response.json();
          setMedia(media);
        }

        if (response.status === 401){
          alert('you does not have authorized');
          router.push('/services')
        }

        if(response.status === 403){
          alert('you are authenticated but does not have permission');
          router.push('/services')
        }
      } catch (error) {
        alert("Can't get data: " + error);
      }
    };
    getMediaFile();
  },[])
  useLayoutEffect(() => {
    if (media == null || videoRef == null){
      return
    }

    const hls = new Hls({
      xhrSetup: function (xhr) {
        xhr.withCredentials = true; // ✅ send cookies!
      }
    });

    const source = (media?.publicYn == 'Y') ? `${apiUrl}/static/hls/public/${fileNameUid}/master.m3u8`
      :`${apiUrl}/static/hls/private/${fileNameUid}/master.m3u8`

    if(Hls.isSupported()){
      hls.loadSource(source)
      console.log(`videoRef.current ${videoRef.current}`)
      if(videoRef.current){
        console.log(`hello ${source}`)
        hls.attachMedia(videoRef.current)
      }
    }
  },[media])

  if (!media) return <p className="text-center text-xl text-gray-500">Loading video...</p>;

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">      
      <div className="w-full flex justify-center pt-6">
        <video controls crossOrigin="use-credentials" ref={videoRef}/>
      </div>
      
      <div className="w-full mt-6 p-4 bg-gray-200 rounded-lg shadow-inner">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">{media.title}</h1>
          <div className="flex space-x-3 text-xl">
            <button className="hover:text-red-500 transition duration-300">🤍</button>
            <button className="hover:text-blue-500 transition duration-300">💬</button>
            {isAuthenticated && (
              <button
                className="hover:text-red-600 transition duration-300"
                onClick={deleteMedia}
              >
                🗑️
              </button>
            )}
          </div>
        </div>
        <p className="mt-3 text-gray-700 text-lg">{media.content}</p>
      </div>
    </div>
  );
}