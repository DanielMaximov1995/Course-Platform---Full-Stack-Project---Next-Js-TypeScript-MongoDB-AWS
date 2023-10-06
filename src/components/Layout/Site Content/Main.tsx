'use client'

import {ReactNode, useState} from 'react'
import HomePageContent from "@/components/Layout/Site Content/Home Page Content";
import AboutPageContent from "@/components/Layout/Site Content/About Page Content";
import {CloseIcon, ContentIcon} from "@/components/Icons";
import Modal from "@/components/Modal";
import {SiteContentType} from "@/types/SchemasType";
import {ImportsTypes} from "@/types/Layout";

const MainContent = ({allContents} : ImportsTypes) => {
    const [openSiteContent, setOpenSiteContent] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);

    const tabs = ['עמוד הבית' , 'עמוד אודות']

    const home = allContents?.find((content : SiteContentType) => content.slug === 'עמוד-הבית')
    const about = allContents?.find((content : SiteContentType) => content.slug === 'עמוד-אודות')

    const viewTab : { [key: number]: ReactNode }= {
        0: <HomePageContent home={home!}/>,
        1 : <AboutPageContent about={about!}/>
    }

    const ViewTabCurrent = viewTab[tabIndex]

    return (
        <>
            <button
                onClick={() => setOpenSiteContent(prev => !prev)}
                className='hover:tracking-wider gap-x-2 items-center w-full dark:text-accentBg text-accentSec rounded transition-all p-1.5 duration-300 flex justify-center text-[20px]'>
                <ContentIcon fontSize={30}/>
                <span>תוכן אתר</span>
            </button>
            <Modal isOpen={openSiteContent} onClose={() => setOpenSiteContent(prev => !prev)}>
                <div className='w-full md:w-[800px] h-screen overflow-auto z-50 p-6 relative bg-accentSec dark:bg-accentBg rounded'>
                    <button onClick={() => setOpenSiteContent(prev => !prev)}><CloseIcon fontSize={30} color='error'/></button>
                    <div className='w-full h-full mx-auto'>
                        <div className='flex my-4 justify-center gap-x-8'>
                            {
                                tabs.map((tab , index) => (
                                    <button key={index} className={`hover:tracking-wider hover:font-semibold ${tabIndex === index ? 'dark:text-accent tracking-wider font-semibold' : 'text-accentBg dark:text-accentSec'} hover:dark:text-accent transition-all duration-300 text-[24px]`} onClick={() => setTabIndex(index)}>{tab}</button>
                                ))
                            }
                        </div>
                        {ViewTabCurrent}
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default MainContent
