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

const HamburgerIcon = (props : IconsType) => {
    const {fontSize , color} = props

    return (
        <svg
            className={`${color && strokes[color]}`}
            style={{ fontSize : `${fontSize}px`}}
            stroke="currentColor"
            fill="none"
            strokeWidth="1.5"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    );
}
export default HamburgerIcon
