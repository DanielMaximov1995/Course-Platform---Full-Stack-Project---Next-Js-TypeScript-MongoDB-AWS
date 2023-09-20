'use client'

import {IconsType} from "@/types/others";

const strokes = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-400',
    info : 'text-white'
}

const ErrorIcon = ({ fontSize, color } : IconsType) => {

    return (
        <svg
            className={`${color && strokes[color]}`}
            style={{ fontSize : `${fontSize}px`}}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            stroke="none"
            fill="currentColor"
            strokeWidth={1}
            viewBox="0 0 24 24"
        >
            <path d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z"></path>
        </svg>
    );
};


export default ErrorIcon