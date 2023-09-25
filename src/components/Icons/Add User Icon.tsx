'use client'

import {IconsType} from "@/types/others";

const strokes = {
    primary : 'stroke-accentBg',
    accent : 'stroke-accent',
    success : 'stroke-green-600',
    error : 'stroke-red-600',
    warning : 'stroke-yellow-400',
    info : 'stroke-white'
}

const AddUserIcon = (props : IconsType) => {
    const {fontSize , color} = props

    return (
        <svg
            className={`${color && strokes[color]}`}
            style={{ fontSize : `${fontSize}px`}}
            stroke='none'
            fill="currentColor"
            strokeWidth="1.5"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path d="M4.5 8.552c0 1.995 1.505 3.5 3.5 3.5s3.5-1.505 3.5-3.5-1.505-3.5-3.5-3.5-3.5 1.505-3.5 3.5zM19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2z"></path>
        </svg>
    );
}
export default AddUserIcon
