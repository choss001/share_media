'use client'
import { useEffect, useState} from 'react';

export default function page(){

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/test")
        .then((res) => res.json())
        .then((data) => {
            setMessage(data.key)
            console.log(data)
        })
        .catch((err) => console.error("Error fetching message:", err));
    }, []);

    return(
        <>
            <div className='my-5'>
                <div className='grid grid-cols-3 gap-4'>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <video width="320" height="240" controls preload="none">
                        <source src="http://localhost:8080/stream/16" type="video/mp4" />
                        <track
                            src="/path/to/captions.vtt"
                            kind="subtitles"
                            srcLang="en"
                            label="English"
                        />
                        Your browser does not support the video tag.
                    </video>
                    <div>services{message}</div>
                    <div>I will fill this box my media</div>
                </div>
            </div>
        </>
    )
}