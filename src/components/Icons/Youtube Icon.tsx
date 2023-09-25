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

const YoutubeIcon = (props : IconsType) => {
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
            <path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"></path>
        </svg>
    );
}
export default YoutubeIcon
