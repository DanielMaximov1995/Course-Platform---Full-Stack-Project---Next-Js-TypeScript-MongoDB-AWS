import { LessonType } from "@/types/SchemasType";
import { useSession } from "next-auth/react";
import  {  FC , MouseEventHandler } from "react";

const VideoPlayer: FC<{ lesson: LessonType | null }> = ({ lesson }) => {
    const { data: user, status, update } = useSession();
    const isLogin: boolean = status === "authenticated";
    const isLoading : boolean = status === 'loading'
    const videoSrc: any = isLogin || lesson?.free ? lesson?.video.url : '';

    const handleContextMenu: MouseEventHandler<HTMLVideoElement> = (e) => {
        e.preventDefault();
    };

    if(isLoading || !videoSrc) {
        return null
    }
        return (
            <div className="relative w-full aspect-w-16 aspect-h-9" >
                <video
                    controls
                    src={videoSrc}
                    onContextMenu={handleContextMenu}
                    controlsList="nodownload"
                    className={`md:w-[800px] md:h-auto object-cover`}
                />
            </div>
        );
};

export default VideoPlayer;
