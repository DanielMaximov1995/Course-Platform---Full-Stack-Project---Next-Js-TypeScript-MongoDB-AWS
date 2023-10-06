import Image from 'next/image'
import HorizontalForm from "@/components/Home Page/Horizontal Form";

import React from 'react'
import {getSiteContentBySlug} from "@/services/getData";
import {SiteContentType} from "@/types/SchemasType";
import {PropsTypes} from "@/types/Layout";

export const generateMetadata = async ({ params, searchParams } : PropsTypes)  => {
    return {
        title : 'אודות'
    }
}

export const dynamic = 'force-dynamic'

const AboutPage = async () => {
    const content : SiteContentType= await getSiteContentBySlug('עמוד-אודות')

    return (
        <main className="flex min-h-screen flex-col items-center justify-between pt-16">
            <h1 className='h2 border-x-[4px] border-accentBg dark:border-accent px-6 md:px-40 mt-20 rounded-xl text-accentBg dark:text-accent'>אודות</h1>
            <section className='w-[90%] mx-auto h-auto md:py-16'>
                <div className='flex flex-wrap md:flex-nowrap justify-center items-center'>
                    <div>
                        <p className='h5 text-accentBg dark:text-accent mr-6'>{content?.title}</p>
                        <div className='md:pl-30 py-2 text-[18px] mr-6' dangerouslySetInnerHTML={{ __html: content?.text ?? "" }} />
                    </div>
                    <div className='relative w-[80%] h-full'>
                        <Image unoptimized={true} src={content?.pic?.url!} width={0} height={0} alt={content?.pic?.alt || ""} className='object-contain w-full opacity-80 hover:opacity-100 transition-all duration-300 rounded-[24px]' sizes='100vw' quality={100}/>
                    </div>
                </div>
            </section>
            <section className='h-auto'>
                <div className='w-[80%] mx-auto'>
                    <p className='h5 text-accentBg dark:text-accent '>{content?.title1}</p>
                    <div className='md:pl-30 py-2 text-[18px] mr-6' dangerouslySetInnerHTML={{ __html: content?.text1 ?? "" }} />
                </div>
                <div className='w-[80%] mx-auto'>
                    <HorizontalForm/>
                </div>
            </section>
        </main>
    )
}
export default AboutPage


