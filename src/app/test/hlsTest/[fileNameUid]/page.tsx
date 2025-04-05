'use client'
import Hls from "hls.js";
import {useRef, useEffect} from 'react';


// const source = "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8"
export default function Home({ params }: {params: {fileNameUid: string}}){
    const fileNameUid = params.fileNameUid;
    // const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
    const videoRef = useRef<HTMLVideoElement>(null)
    // const source = `${apiUrl}/resource/media/hls/${fileNameUid}/master.m3u8`
    const source = `http://localhost:81/static/hls/${fileNameUid}/master.m3u8`

    useEffect(() => {
        const hls = new Hls({
            xhrSetup: function (xhr) {
              xhr.withCredentials = true; // ✅ send cookies!
            }
          });
        if(Hls.isSupported()){
            hls.loadSource(source)
            if(videoRef.current){
                hls.attachMedia(videoRef.current)
            }
        }
    },[])
    return (
        <>
            <div className="mt-[50px]">
                <video controls crossOrigin="use-credentials" ref={videoRef}/>
            </div>

        </>
    );
}