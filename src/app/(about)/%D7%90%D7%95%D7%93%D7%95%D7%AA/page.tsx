import Image from 'next/image'
import HorizontalForm from "@/components/Home Page/Horizontal Form";

import React from 'react'

const AboutPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between pt-16">
            <h1 className='h2 border-x-[4px] border-accentBg dark:border-accent px-6 md:px-40 mt-20 rounded-xl text-accentBg dark:text-accent'>אודות</h1>
            <section className='w-[90%] mx-auto h-auto md:py-16'>
                <div className='flex flex-wrap md:flex-nowrap justify-center items-center'>
                    <div>
                        <p className='h5 text-accentBg dark:text-accent mr-6'>מי אני?</p>
                        <p className='mdLpl-48 py-2 text-[18px] mr-6'>קורס המקיף והאיכותי ביותר לעריכת וידאו בכדורגל בתוכנת Adobe Premiere. נצלו את הזמן כבר עכשיו כדי ללמוד עריכת וידאו בכודרגל אצלנו שלב אחר שלב , ללא שום צורך בניסיון קודם בעריכת וידאו.</p>
                    </div>
                    <div className='relative md:w-[50%] w-[80%] h-full'>
                        <Image src='/daniel.webp' width={0} height={0} alt='' className='object-contain w-full opacity-80 hover:opacity-100 transition-all duration-300 rounded-[24px]' sizes='100vw' quality={100}/>
                    </div>
                </div>
            </section>
            <section className='h-auto'>
                <div className='w-[80%] mx-auto'>
                    <p className='h5 text-accentBg dark:text-accent '>קצת על DVF</p>
                    <p className='md:pl-48 py-2 text-[18px] '>קורס המקיף והאיכותי ביותר לעריכת וידאו בכדורגל בתוכנת Adobe Premiere. נצלו את הזמן כבר עכשיו כדי ללמוד עריכת וידאו בכודרגל אצלנו שלב אחר שלב , ללא שום צורך בניסיון קודם בעריכת וידאו.</p>
                </div>
                <div className='w-full mx-auto'>
                    <HorizontalForm/>
                </div>
            </section>
        </main>
    )
}
export default AboutPage


