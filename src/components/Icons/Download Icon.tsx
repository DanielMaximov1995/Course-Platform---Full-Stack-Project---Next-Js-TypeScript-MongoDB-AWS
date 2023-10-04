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

const DownloadIcon = (props: IconsType) => {
    const {fontSize, color} = props

    return (
        <svg
            className={`${color && strokes[color]}`}
            style={{fontSize: `${fontSize}px`}}
            stroke='none'
            fill="currentColor"
            strokeWidth="1.5"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
                <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
                <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
        </svg>
    );
}
export default DownloadIcon
