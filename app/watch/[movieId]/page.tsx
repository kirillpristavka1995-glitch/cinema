"use client";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import useMovie from "@/hooks/useMovie";
import Hls from "hls.js";

const Watch = () => {
  const router = useRouter();
  const params = useParams();
  const movieId = params.movieId;

  const { data } = useMovie(movieId as string);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (data?.videoUrl && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(data.videoUrl);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari и iOS
        videoRef.current.src = data.videoUrl;
      }
    }
  }, [data?.videoUrl]);

  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className="
          fixed
          w-full
          p-4
          z-10
          flex
          flex-row
          items-center
          gap-8
          bg-black/70
        "
      >
        <AiOutlineArrowLeft
          onClick={() => router.push('/')}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {data?.title}
        </p>
      </nav>

      <video
        ref={videoRef}
        playsInline
        autoPlay
        controls
        className="h-full w-full"
      />
    </div>
  );
}

export default Watch;