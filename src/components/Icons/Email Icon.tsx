'use client'

import {IconsType} from "@/types/others";

const strokes = {
    primary : 'text-accentBg',
    accent : 'text-accent',
    success : 'text-green-600',
    error : 'text-red-600',
    warning : 'text-yellow-400',
    info : 'text-white'
}

const EmailIcon = (props : IconsType) => {
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
            <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
        </svg>
    );
}
export default EmailIcon
