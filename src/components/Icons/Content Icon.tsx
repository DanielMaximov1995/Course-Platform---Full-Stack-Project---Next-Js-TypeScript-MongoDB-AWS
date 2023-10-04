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

const ContentIcon = (props: IconsType) => {
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
            <path
                d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h7v14H4zm9 0V5h7l.001 14H13z"></path>
            <path d="M15 7h3v2h-3zm0 4h3v2h-3z"></path>
        </svg>
    );
}
export default ContentIcon
