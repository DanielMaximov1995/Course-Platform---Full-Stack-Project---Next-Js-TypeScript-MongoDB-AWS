'use client'
import React from 'react'
import ButtonUploadFile from "@/components/Button Upload File";
import {SectionsTypeContents} from "@/types/Layout";
import Image from 'next/image'

const ImagesArea = (props : SectionsTypeContents) => {
    const { setting , handleFileToFiles , handleAltPic } = props

    return (
        <>
            <div className='w-full md:w-1/2 md:mb-0 p-2'>
                <div className='border-accentBg dark:border-accentSec border-[1px] p-2'>
                    <p className='text-center text-[22px]'>לוגו</p>
                    <ButtonUploadFile htmlForData='html-for-Logo' handleChange={handleFileToFiles} folder={'assets'} fileName={setting?.logo?.fileName} urlFile={setting?.logo?.url} index='logo' accept='image/*'/>
                    {setting?.logo?.url && <Image src={setting?.logo?.url} alt={setting?.logo?.alt || ""} unoptimized={true} width={0} height={0} className='object-contain w-full h-[215px] rounded-[24px]' sizes='100vw' quality={100}/>}
                    <div className='w-full md:mb-0 py-2'>
                        <input
                            className="input h-10"
                            placeholder='כותרת אלטרנטיבית'
                            name='logo'
                            value={setting?.logo?.alt || ''}
                            onChange={handleAltPic}
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 md:mb-0 p-2'>
                <div className='border-accentBg dark:border-accentSec border-[1px] p-2'>
                    <p className='text-center text-[22px]'>לוגו במצב לילה</p>
                    <ButtonUploadFile htmlForData='html-for-Logo-Dark' handleChange={handleFileToFiles} folder={'assets'} fileName={setting?.logoDark?.fileName} urlFile={setting?.logoDark?.url} index='logoDark' accept='image/*'/>
                    {setting?.logoDark?.url && <Image src={setting?.logoDark?.url} alt={setting?.logoDark?.alt || ""} unoptimized={true} width={0} height={0} className='object-contain w-full h-[215px] rounded-[24px]' sizes='100vw' quality={100}/>}
                    <div className='w-full md:mb-0 py-2'>
                        <input
                            className="input h-10"
                            placeholder='כותרת אלטרנטיבית'
                            name='logoDark'
                            value={setting?.logoDark?.alt || ''}
                            onChange={handleAltPic}
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 md:mb-0 p-2'>
                <div className='border-accentBg dark:border-accentSec border-[1px] p-2'>
                    <p className='text-center text-[22px]'>תמונה SEO</p>
                    <ButtonUploadFile htmlForData='html-for-Image-Google' handleChange={handleFileToFiles} folder={'assets'} fileName={setting?.ogImage?.fileName} urlFile={setting?.ogImage?.url} index='ogImage' accept='image/*'/>
                    {setting?.ogImage?.url && <Image src={setting?.ogImage?.url} alt={setting?.ogImage?.alt || ""} unoptimized={true} width={0} height={0} className='object-contain w-full h-[215px] rounded-[24px]' sizes='100vw' quality={100}/>}
                    <div className='w-full md:mb-0 py-2'>
                        <input
                            className="input h-10"
                            placeholder='כותרת אלטרנטיבית'
                            name='ogImage'
                            value={setting?.ogImage?.alt || ''}
                            onChange={handleAltPic}
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 md:mb-0 p-2'>
                <div className='border-accentBg dark:border-accentSec border-[1px] p-2'>
                    <p className='text-center text-[22px]'>אייקון האתר</p>
                    <ButtonUploadFile htmlForData='html-for-Icon-site' handleChange={handleFileToFiles} folder={'assets'} fileName={setting?.icon?.fileName} urlFile={setting?.icon?.url} index='icon' accept='.ico'/>
                    {setting?.icon?.url && <Image src={setting?.icon?.url} alt="" unoptimized={true} width={0} height={0} className='object-contain w-full h-[215px] rounded-[24px]' sizes='100vw' quality={100}/>}
                </div>
            </div>
        </>
    )
}
export default ImagesArea
