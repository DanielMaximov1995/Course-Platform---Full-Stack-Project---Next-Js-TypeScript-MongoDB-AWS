'use client'

import ButtonUploadFile from "@/components/Button Upload File";
import Image from "next/image";
import {SectionsTypeContents} from "@/types/Layout";

const SecondSection = (props: SectionsTypeContents) => {
    const { home, handleChange, handleFileToFiles, handleAltPic } = props;

    return (
        <>
            <div className='flex'>
                <div className='w-full md:mb-0 p-2'>
                    <ButtonUploadFile htmlForData='html-for-pic-1' handleChange={handleFileToFiles} folder={'assets'} fileName={home?.pic1?.fileName} urlFile={home?.pic1?.url} index='pic1' accept='image/*'/>
                    {home?.pic1?.url && <Image src={home?.pic1?.url} alt={home?.pic1?.alt || ""} unoptimized={true} width={0} height={0} className='object-contain w-full h-[215px] rounded-[24px]' sizes='100vw' quality={100}/>}
                    <div className='w-full md:mb-0 py-2'>
                        <input
                            className="input h-10"
                            placeholder='כותרת אלטרנטיבית'
                            name='pic1'
                            value={home?.pic1?.alt || ''}
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
                            name='title1'
                            value={home?.title1 || ''}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className='w-full md:mb-0 p-2'>
                        <input
                            className="input"
                            placeholder='כותרת משנית'
                            name='subTitle1'
                            value={home?.subTitle1 || ''}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className='w-full md:mb-0 p-2'>
                        <textarea
                            className="text-area"
                            placeholder='תיאור'
                            name='text1'
                            value={home?.text1 || ''}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default SecondSection
