'use client'

import {HTMLAttributes} from "react";

const IconButton = (props : HTMLAttributes<any>) => {

    const className = `${props.className} cursor-pointer hover:bg-accent/30 transition-all p-1.5 rounded-full duration-300 text-2xl justify-center flex md:text-3xl hover:text-accent/60`

    return (
        <button className={className}>
            {props.children}
        </button>
    )
}
export default IconButton
