'use client'

import {ReactNode} from "react";

type ToggleType = {
    children : ReactNode;
    active ?: boolean;
    onClick : (newState: boolean) => void;
}

const ToggleSwitch = (props : ToggleType) => {
    const { children , active , onClick} = props

    return (
        <div className='inline-flex items-center gap-2 my-4 cursor-pointer' onClick={() => onClick(!active)}>
            <span className='text-[18px] text-accentBg dark:text-accentSec'>{children}</span>
            <div className={`w-12 ${active ? 'bg-accent  shadow-[rgba(255,146,0,0.35)_0px_6px_12px_-2px,_rgba(255,146,0.3)_0px_3px_7px_-3px]' : 'bg-[#767577]'} h-6 relative px-1 flex items-center rounded-xl transition-all duration-300 `}>
                <span className={`absolute p-2 bg-white rounded-full ${active && 'mr-6'} duration-300 transition-all`}/>
            </div>
        </div>

    )
}
export default ToggleSwitch