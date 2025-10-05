import useInfoModal from "@/hooks/useInfoModal";

interface MovieCardProps {
    data: Record<string, any>;
}

const MovieCard = ({
    data
}: MovieCardProps) => {
    const { openModal } = useInfoModal();

    return (
        <div onClick={() => openModal(data?.id)} className="group bg-zinc-900 col-span relative">
            <img className="
                cursor-pointer
                object-cover
                transition
                shadow-xl
                rounded-md
                w-full
                hover:opacity-50"
                src={data.thumbnailUrl}
                alt="Thumbnail"
            />
        </div>
    )
}

export default MovieCard;