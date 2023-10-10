import Image from 'next/image'
import {HomePageType} from "@/types/Home Page";
import {BoxesWithImageType, SiteContentType} from "@/types/SchemasType";
import {getSiteContentBySlug} from "@/services/getData";
import React from 'react'
import Link from "next/link";
import dynamicNext from 'next/dynamic';
const IconsBoxes = dynamicNext(() => import('@/components/Home Page/Icons Boxes'))
const HorizontalForm = dynamicNext(() => import("@/components/Home Page/Horizontal Form"))

export const dynamic = 'force-dynamic'

const HomePage = async ({searchParams}: HomePageType) => {
    const content: SiteContentType = await getSiteContentBySlug('עמוד-הבית')

    return (
        <main className='pt-20 md:pt-0'>
            <section className='flex flex-wrap md:flex-nowrap w-[90%] mx-auto h-[800px] items-center'>
                <div className='w-full'>
                    <h1 className='h2 border-r-[4px] border-accentBg dark:border-accent px-6 rounded-xl text-accentBg dark:text-accent'>{content?.title}</h1>
                    <p className='h5 text-accentBg dark:text-accent mr-6'>{content?.subTitle}</p>
                    <p className=' whitespace-pre-wrap py-2 text-[18px] mr-6'>{content?.text}</p>
                </div>
                <div className='relative w-full h-full flex items-center'>
                    <Image unoptimized={true} src={content?.pic?.url!} width={0} height={0}
                           alt={content?.pic?.alt || ""}
                           className='object-contain w-full opacity-80 hover:opacity-100 transition-all duration-300 rounded-[24px]'
                           sizes='100vw' quality={100}/>
                </div>
            </section>
            <section className='dark:bg-[#222B45] bg-accentBg/5 w-full h-auto py-20 flex flex-wrap items-center'>
                <div className='w-full'>
                    <div
                        className='flex flex-wrap md:flex-nowrap w-[80%] justify-between md:gap-x-20 mx-auto items-center'>
                        <div className='md:w-1/2'>
                            <Image unoptimized={true} src={content?.pic1?.url!} width={0} height={0}
                                   alt={content?.pic1?.alt || ""}
                                   className='object-contain w-full opacity-80 hover:opacity-100 transition-all duration-300 rounded-[24px]'
                                   sizes='100vw' quality={100}/>
                        </div>
                        <div className='w-full md:w-1/2'>
                            <h2 className='h2 border-r-[4px] border-accentBg dark:border-accent px-6 rounded-xl text-accentBg dark:text-accent'>{content?.title1}</h2>
                            <p className='h5 text-accentBg dark:text-accent mr-6'>{content?.subTitle1}</p>
                            <p className='whitespace-pre-wrap py-2 text-[18px] mr-6'>{content?.text1}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full mx-auto md:w-[80%]'>
                    <HorizontalForm/>
                </div>
            </section>
            <section className='w-[80%] mx-auto py-20 '>
                <h3 className='h2 md:pb-14 text-center text-accentBg dark:text-accent'>למי הקורס מתאים?</h3>
                <div className='flex flex-wrap justify-between'>
                    {
                        content?.boxesWithImage?.map((imageBox: BoxesWithImageType) => (
                            <div key={imageBox?._id?.toString()!} className='p-1'>
                                <div
                                     className="max-w-sm rounded-xl bg-accentBg dark:bg-accentSec overflow-hidden shadow-lg">
                                    <Image unoptimized={true} src={imageBox?.pic?.url!} width={0} height={0}
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
                </div>
            </section>
            <section className='dark:bg-[#222B45] bg-accentBg/5 w-full h-auto py-20 flex flex-wrap items-center'>
                <div className='w-full'>
                    <h4 className='h2 md:pb-14 text-center text-accentBg dark:text-accent' id='מה_מקבלים?'>מה מקבלים?</h4>
                    <div className='flex w-[90%] md:w-[80%] flex-wrap justify-between gap-x-20 mx-auto items-center'>
                        <div className='flex flex-wrap w-full md:w-1/2'>
                            <IconsBoxes boxesWithIcon={content?.boxesWithIcon}/>

                        </div>
                        <div className='flex w-[90%] md:w-[40%] md:justify-end mx-auto'>
                            <div className="max-w-sm rounded-xl bg-accentBg dark:bg-accentSec overflow-hidden shadow-lg">
                                <Image unoptimized={true} src={content?.pic2?.url!} width={0} height={0}
                                       alt={content?.pic2?.alt || ""}
                                       className='object-cover w-full h-[200px] opacity-80 hover:opacity-100 transition-all duration-300'
                                       sizes='100vw' quality={100}/>
                                <div className="p-4">
                                    <div className="font-bold text-accent dark:text-accentBg text-xl mb-2 text-center">{content?.title2}</div>
                                    <p className="text-accentSec dark:text-accentBg text-[18px]">{content?.subTitle2}</p>
                                        <Link href='lessons?lesson=0' className='bg-accent text-white hover:bg-accent/70 transition-all duration-300 flex justify-center w-full h-full py-2 text-[22px]'>לשיעור מתנה</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
</main>
)
}
export default HomePage

