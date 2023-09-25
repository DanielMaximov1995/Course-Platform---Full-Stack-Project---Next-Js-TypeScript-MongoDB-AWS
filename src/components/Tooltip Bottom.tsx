'use client'
import {ReactNode} from "react";

type TooltipType = {
    children : ReactNode;
    title : string
}

const TooltipBottom = (props : TooltipType) => {
    const {children , title} = props

    return (
        <div className='justify-center relative group transition-all duration-300'>
            <div className='mx-2.5 md:-mb-2 mb-0  transition-all duration-300'>
                {children}
            </div>
            <div id='tooltip' className='group-hover:z-high rounded-sm absolute ml-1 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 dark:bg-accentSec bg-accentBg -m-2 mx-auto hidden md:inline-block min-w-max'>
                <span className='text-accent px-2'>{title}</span>
                <div className='h-2 absolute bottom-full left-1/2 right-[45%] border-x-[0.6rem] border-x-transparent border-b-[8px] dark:border-accentSec border-accentBg'></div>
            </div>
        </div>
    )
}
export default TooltipBottom
