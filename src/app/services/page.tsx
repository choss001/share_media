'use client'
import { useEffect, useState} from 'react';
import Image from 'next/image'
import Link from 'next/link';

interface MediaItem{
    id: string;
    fileName: string;
    image: Uint8Array | null;
    thumbnailName: string;
}

export default function Page(){

    const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);
        const token = localStorage.getItem("token");
        fetch(`${apiUrl}/mediaList`,
            {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        
                    },
            }
        )
        .then((res) => res.json())
        .then((data: MediaItem[]) => {
            setMediaList(data)
            setLoading(false);

        })
        .catch((err) => console.error("Error fetching board List:", err))
    }, [apiUrl]);


    return(
        <>
            {loading ? (
                    <div className='flex justify-center items-center h-full'>Loading</div>
            ): (
            <div className='my-[60px]'>
                <div className='grid grid-cols-3 gap-4'>
                    {mediaList.map((temp) => (
                        <div key={temp.id} className='border-solid border-slate-100 border-[1px] p-2'> 
                            <p className='whitespace-nowrap hidden md:block'>File Name: {temp.fileName}</p>
                                <Link
                                    href={`/test/mediaTest/${temp.id}`}>
                                    <Image 
                                        src={temp.thumbnailName ? `${apiUrl}/${temp.thumbnailName}` : '/no_image.webp'}
                                        alt="nothing"
                                        width={100}
                                        height={100}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </Link>
                                {apiUrl}/{temp.thumbnailName}
                        </div>
                    ))}
                </div>
            </div>
            )}
        </>
    )
}