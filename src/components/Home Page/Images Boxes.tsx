'use client'

import {BoxesWithIconType, BoxesWithImageType} from "@/types/SchemasType";
import Image from "next/image";
import React from "react";


const ImagesBoxes = ({boxesWithImage} : {boxesWithImage ?: BoxesWithImageType[]}) => {
    return (
        <>
            {
                boxesWithImage?.map((imageBox: BoxesWithImageType) => (
                    <div key={imageBox?._id?.toString()!} className='p-1'>
                        <div
                            className="max-w-sm rounded-xl bg-accentBg dark:bg-accentSec overflow-hidden shadow-lg">
                            <Image loading='lazy' unoptimized={true} src={imageBox?.pic?.url!} width={0} height={0}
                                   alt={imageBox?.pic?.alt || ""}
                                   className='object-cover w-full h-[200px] opacity-80 hover:opacity-100 transition-all duration-300'
                                   sizes='100vw' quality={100}/>
                            <div className="p-4">
                                <div
                                    className="font-bold text-accent dark:text-accent text-xl mb-2">{imageBox?.title}</div>
                                <p className="text-accentSec dark:text-accentBg">{imageBox?.subTitle}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
export default ImagesBoxes
