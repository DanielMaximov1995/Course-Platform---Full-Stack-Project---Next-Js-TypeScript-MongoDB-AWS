'use client'

import {IconsType} from "@/types/others";

const strokes = {
    primary: 'text-accentBg',
    accent: 'text-accent',
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-400',
    info: 'text-white'
}

const AddFileIcon = (props: IconsType) => {
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
                    d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zM8 14h3v-3h2v3h3v2h-3v3h-2v-3H8v-2z"></path>

        </svg>
    );
}
export default AddFileIcon
