'use client'
import {IconsType} from "@/types/others";

const strokes = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-400',
    info : 'stroke-white'
}

const CheckIcon = ({ fontSize, color } : IconsType) => {

    return (
        <svg
            className={`${color && strokes[color]}`}
            style={{ fontSize : `${fontSize}px`}}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            stroke="currentColor"
            fill="none"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
        </svg>
    );
};

export default CheckIcon