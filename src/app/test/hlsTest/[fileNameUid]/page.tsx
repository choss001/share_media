'use client'
import Hls from "hls.js";
import {useRef, useEffect} from 'react';


// const source = "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8"
export default function Home({ params }: {params: {fileNameUid: string}}){
    const fileNameUid = params.fileNameUid;
    const videoRef = useRef<HTMLVideoElement>(null)
    const source = `http://localhost:8080/resource/media/hls/${fileNameUid}/master.m3u8`

    useEffect(() => {
        const hls = new Hls()
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
                <video controls ref={videoRef}/>
            </div>

        </>
    );
}