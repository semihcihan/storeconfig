"use client";

import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  className?: string;
  title?: string;
}

export function VideoPlayer({ src, className = "", title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let thumbnailSet = false;

    const seekToThumbnail = () => {
      if (thumbnailSet || hasPlayedRef.current) return;

      if (video.duration >= 6) {
        video.currentTime = 6;
        thumbnailSet = true;
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration >= 6) {
        setTimeout(() => {
          seekToThumbnail();
        }, 100);
      }
    };

    const handleLoadedData = () => {
      if (!thumbnailSet) {
        seekToThumbnail();
      }
    };

    const handleCanPlay = () => {
      if (!thumbnailSet) {
        seekToThumbnail();
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }
    if (video.readyState >= 2) {
      handleLoadedData();
    }
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (!hasPlayedRef.current) {
        video.currentTime = 0;
        hasPlayedRef.current = true;
      }
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    if (video.currentTime === video.duration) {
      setIsPlaying(false);
      video.currentTime = 0;
    }
  };

  return (
    <div
      className={`relative group ${className} cursor-pointer bg-black w-full aspect-square max-h-[65vh] mx-auto`}
      onClick={togglePlay}
      aria-label={title}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        preload="auto"
        playsInline
      />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors pointer-events-none">
          <div className="h-20 w-20 rounded-full bg-white/90 flex items-center justify-center text-black shadow-lg">
            <Play style={{ width: "40px", height: "40px" }} />
          </div>
        </div>
      )}
    </div>
  );
}
