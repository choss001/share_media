'use client';
import { useEffect, useRef } from "react";
import videojs from "video.js"; // Import video.js
import "video.js/dist/video-js.css";

// Define the type for the Video.js player
type VideoJsPlayer = ReturnType<typeof videojs>;

interface HlsPlayerProps {
  src: string;
}

const HlsPlayer: React.FC<HlsPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null); // Correct type

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: src,
            type: "application/x-mpegURL",
          },
        ],
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [src]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default HlsPlayer;
