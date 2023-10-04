'use client'

import ButtonUploadFile from "@/components/Button Upload File";
import Image from "next/image";
import {SectionsTypeContents} from "@/types/Layout";

const FourSectionTwice = (props: SectionsTypeContents) => {
    const { home, handleChange, handleFileToFiles, handleAltPic } = props;

    return (
        <>
                <div className='w-full md:mb-0 p-2'>
                    <ButtonUploadFile htmlForData='html-for-pic-2' handleChange={handleFileToFiles} folder={'assets'} fileName={home?.pic2?.fileName} urlFile={home?.pic2?.url} index='pic2' accept='image/*'/>
                    {home?.pic2?.url && <Image src={home?.pic2?.url} alt={home?.pic2?.alt || ""} unoptimized={true} width={0} height={0} className='object-contain w-full h-[215px] rounded-[24px]' sizes='100vw' quality={100}/>}
                    <div className='w-full md:mb-0 py-2'>
                        <input
                            className="input h-10"
                            placeholder='כותרת אלטרנטיבית'
                            name='pic2'
                            value={home?.pic2?.alt || ''}
                            onChange={handleAltPic}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className='w-full'>
                    <div className='w-full md:mb-0 p-2'>
                        <input
                            className="input"
                            placeholder='כותרת ראשונה'
                            name='title2'
                            value={home?.title2 || ''}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className='w-full md:mb-0 p-2'>
                        <textarea
                            className="text-area"
                            placeholder='תיאור'
                            name='subTitle2'
                            value={home?.subTitle2 || ''}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
        </>
    )
}
export default FourSectionTwice
