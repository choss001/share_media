'use client'
import { useEffect, useState} from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DeleteMedia } from '@/app/ui/services/button';

//const apiUrl = process.env.SPRING_API_URL;

export default function Page({ params }: {params: {id: string}}){
    const id = params.id;

    const [videoUrl, setVideoUrl] = useState("");
    const router = useRouter();

    const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
    useEffect(() => {
        fetch(`${apiUrl}/stream/${id}`)
        .then((res) => res.blob())
        .then((blob) => {
            const url = URL.createObjectURL(blob);
            setVideoUrl(url);
        })
        .catch((err) => console.error("Error fetching board List:", err))
    }, [id]);

    const handleDeleteSuccess = () => {
        // Redirect to the list page after deletion
        router.push('/services'); // Replace '/media-list' with the actual list page path
      };
    return(
        <div>
            {videoUrl ? (
                <>
                <video 
                    controls 
                    width="400" 
                    height="300"
                    autoPlay
                    loop
                    preload="auto"
                    muted
                >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
                    <Link
                        href={`/deleteMedia/${id}`}>
                        <Image 
                            src='/trash-can-icon.avif'
                            width={30}
                            height={200}
                            alt='trash'>
                        </Image>
                    </Link>
                    <DeleteMedia id={id} onDelete={handleDeleteSuccess} ></DeleteMedia>
                </>
            ) : (
                <p>Loading video...</p>
            )}

        </div>
    )
}