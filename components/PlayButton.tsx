"use client";

import useInfoModal from "@/hooks/useInfoModal";
import { useRouter } from "next/navigation";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
    movieId: string;
}

const PlayButton = ({
    movieId
}: PlayButtonProps) => {
    const router = useRouter();
    const { closeModal } = useInfoModal();

    const handlePlay = () => {
        router.push(`/watch/${movieId}`);
        closeModal();
    };

    return (
        <button
            onClick={handlePlay}
            className="
                bg-white
                rounded-md
                py-1 md:py-2
                px-2 md:px-4
                w-auto
                text-xs lg:text-lg
                font-semibold
                flex
                flex-row
                items-center
                hover:bg-neutral-300
                transition
                cursor-pointer
            "
        >
            <BsFillPlayFill size={25} className="mr-1" />
            Play
        </button>
    )
}

export default PlayButton;