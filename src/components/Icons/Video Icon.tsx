'use client'

import {IconsType} from "@/types/others";

const strokes = {
    primary: 'stroke-accentBg',
    accent: 'stroke-accent',
    success: 'stroke-green-600',
    error: 'stroke-red-600',
    warning: 'stroke-yellow-400',
    info: 'stroke-white'
}

const VideoIcon = (props: IconsType) => {
    const {fontSize, color} = props

    return (
        <svg
            className={`${color && strokes[color]}`}
            style={{fontSize: `${fontSize}px`}}
            stroke='currentColor'
            fill="none"
            strokeWidth="1.5"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
                <path
                    d="M18 7c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-3.333L22 17V7l-4 3.333V7zm-1.998 10H4V7h12l.001 4.999L16 12l.001.001.001 4.999z"></path>
        </svg>
    );
}
export default VideoIcon
