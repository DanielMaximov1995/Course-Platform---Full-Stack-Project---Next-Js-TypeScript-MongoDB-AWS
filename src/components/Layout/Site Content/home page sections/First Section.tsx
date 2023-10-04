'use client'

import ButtonUploadFile from "@/components/Button Upload File";
import Image from "next/image";
import {SectionsTypeContents} from "@/types/Layout";

const FirstSection = (props: SectionsTypeContents) => {
    const { home, handleChange, handleFileToFiles, handleAltPic } = props;

    return (
        <div className='flex'>
            <div className='w-full'>
                <div className='w-full md:mb-0 p-2'>
                    <input
                        className="input"
                        placeholder='כותרת ראשונה'
                        name='title'
                        value={home?.title || ''}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div className='w-full md:mb-0 p-2'>
                    <input
                        className="input"
                        placeholder='כותרת משנית'
                        name='subTitle'
                        value={home?.subTitle || ''}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div className='w-full md:mb-0 p-2'>
                        <textarea
                            className="text-area"
                            placeholder='תיאור'
                            name='text'
                            value={home?.text || ''}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                </div>
            </div>
            <div className='w-full md:mb-0 p-2'>
                <ButtonUploadFile htmlForData='html-for-pic' handleChange={handleFileToFiles} folder={'assets'} fileName={home?.pic?.fileName} urlFile={home?.pic?.url} index='pic' accept='image/*'/>
                {home?.pic?.url && <Image src={home?.pic?.url} alt={home?.pic?.alt || ""} unoptimized={true} width={0} height={0} className='object-contain w-full h-[215px] rounded-[24px]' sizes='100vw' quality={100}/>}
                <div className='w-full md:mb-0 py-2'>
                    <input
                        className="input h-10"
                        placeholder='כותרת אלטרנטיבית'
                        name='pic'
                        value={home?.pic?.alt || ''}
                        onChange={handleAltPic}
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    )
}
export default FirstSection
