'use client'
import { useEffect, useState} from 'react';
import Image from 'next/image'
import Link from 'next/link';

interface MediaItem{
    id: string;
    fileName: string;
    image: Uint8Array | null;
}

export default function Page(){

    const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    console.log(`why!!! ${apiUrl}`)

    useEffect(() => {
        fetch(`${apiUrl}/mediaList`)
        .then((res) => res.json())
        .then((data: MediaItem[]) => {
            setMediaList(data)
            console.log(data)

        })
        .catch((err) => console.error("Error fetching board List:", err))
    }, [apiUrl]);


    return(
        <>
            <div className='my-[60px]'>
                <div className='grid grid-cols-3 gap-4'>
                    {mediaList.map((temp) => (
                        <div key={temp.id} className='border-solid border-slate-100 border-[1px] p-2 flex flex-col'> 
                            <p className='whitespace-nowrap hidden md:block'>File Name: {temp.fileName}</p>
                                <div className='flex grow justify-center items-center '>
                                    <Link
                                        href={`/services/${temp.id}`}>
                                        <Image 
                                            src={temp.image ? `data:image/png;base64,${temp.image}` : '/no_image.webp'}
                                            alt="nothing"
                                            width={100}
                                            height={100}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </Link>
                                </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}
    /*
                    <video className='w-[280px] h-[140px]' controls preload="none">
                        <source src="http://localhost:8080/stream/16" type="video/mp4" />
                        <track
                            src="/path/to/captions.vtt"
                            kind="subtitles"
                            srcLang="en"
                            label="English"
                        />
                        Your browser does not support the video tag.
                    </video>
    */