import { useState, useEffect, useRef } from "react";

export default function VideoPlayer({ videoId }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
  console.log(`why =!!! `, apiUrl);
  const id = videoId;

  useEffect(() => {
    fetch(`${apiUrl}/stream/${id}`)
        .then((res) => res.blob())
        .then((blob) => {
            const url = URL.createObjectURL(blob);
            console.log("whatis this url : ",url)
            setVideoUrl(url);
        })
        .catch((err) => console.error("Error fetching board List:", err))

    const videoElement = videoRef.current;
    console.log('before loading', loading);
    const handleLoad = () => setLoading(false);
    console.log('after loading', loading);
    const handleError = () => alert("Failed to load video");

    if (videoElement) {
      videoElement.addEventListener("loadeddata", handleLoad);
      videoElement.addEventListener("error", handleError);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadeddata", handleLoad);
        videoElement.removeEventListener("error", handleError);
      }
    };
  }, [id, apiUrl, loading]);


  return (
    <div>
      {loading && <p>Loading...</p>}
      <video
        ref={videoRef}
        controls
        autoPlay
        style={{
          width: "100%",
          maxWidth: "600px",
          visibility: loading ? "hidden" : "visible",
        }}
      >
        <source src={`${apiUrl}/stream/${videoId}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}