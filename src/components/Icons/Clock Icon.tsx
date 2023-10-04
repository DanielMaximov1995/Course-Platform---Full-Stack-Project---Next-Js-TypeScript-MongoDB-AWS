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

const ClockIcon = (props : IconsType) => {
    const {fontSize , color} = props

    return (
        <svg
            className={`${color && strokes[color]}`}
            style={{ fontSize : `${fontSize}px`}}
            stroke='currentColor'
            fill="none"
            strokeWidth="1.5"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
export default ClockIcon
