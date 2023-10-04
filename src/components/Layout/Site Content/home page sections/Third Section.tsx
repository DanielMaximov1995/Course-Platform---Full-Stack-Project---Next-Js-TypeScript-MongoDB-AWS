'use client'

import ButtonUploadFile from "@/components/Button Upload File";
import Image from "next/image";
import {SectionsTypeContents} from "@/types/Layout";
import {useState} from "react";
import {BoxesWithImageType} from "@/types/SchemasType";

const ThirdSection = (props: SectionsTypeContents) => {
    const { home , handleFileToFiles , handleAltPic , handleChange} = props;

    return (
        <div className='flex flex-wrap'>
            {
                home?.boxesWithImage?.map((box , index) =>
                <div key={index} className={`p-2 ${index % 3 === 2 ? "w-full" : "w-1/2"}`}>
                    <div className='border-accentBg dark:border-accentSec border-[1px]'>
                        <div className='w-full md:mb-0 p-2'>
                            <input
                                className="input"
                                placeholder='כותרת'
                                name='title'
                                id={index.toString()}
                                value={box?.title || ''}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className='w-full md:mb-0 p-2'>
                            <textarea
                                className="text-area"
                                placeholder='תיאור'
                                name='subTitle'
                                id={index.toString()}
                                value={box?.subTitle || ''}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className='w-full md:mb-0 p-2'>
                            <ButtonUploadFile htmlForData={`html-for-pic-third-${index}`} handleChange={handleFileToFiles} folder={'assets'} fileName={box?.pic?.fileName} urlFile={box?.pic?.url} index={index.toString()} accept='image/*'/>
                            {box?.pic?.url && <Image src={box?.pic?.url} alt={box?.pic?.alt || ""} unoptimized={true} width={0} height={0} className='object-contain w-full h-[215px] rounded-[24px]' sizes='100vw' quality={100}/>}
                            <div className='w-full md:mb-0 py-2'>
                                <input
                                    className="input h-10"
                                    placeholder='כותרת אלטרנטיבית'
                                    name='pic'
                                    id={index.toString()}
                                    value={box?.pic?.alt || ''}
                                    onChange={handleAltPic}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    )
}
export default ThirdSection
