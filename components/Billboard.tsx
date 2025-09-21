"use client";

import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useBillboard from "@/hooks/useBillboard";
import { useCallback, useEffect, useRef } from "react";
import Hls from "hls.js";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {
  const { movie } = useBillboard();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(movie?.id);
  }, [openModal, movie?.id]);

  useEffect(() => {
    if (movie?.trailerUrl && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(movie.trailerUrl);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        // для Safari
        videoRef.current.src = movie.trailerUrl;
      }
    }
  }, [movie?.trailerUrl]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        ref={videoRef}
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl">
          {movie?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {movie?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={movie?.id} />
          <button onClick={handleOpenModal} className="bg-white/30 text-white rounded-md py-1 md:py-2 px-2 md:px-4 text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-white/20 transition cursor-pointer">
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default Billboard;