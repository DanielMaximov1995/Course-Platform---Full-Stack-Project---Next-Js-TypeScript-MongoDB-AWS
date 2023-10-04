'use client'

import {SectionsTypeContents} from "@/types/Layout";
import ButtonUploadFile from "@/components/Button Upload File";
import Image from "next/image";
import RichText from "@/components/Rich Text";

const FirstSection = (props : SectionsTypeContents) => {
    const { about, handleChange, handleFileToFiles, handleAltPic } = props;

    const handleChangeRich = (value: string) => {
        if (handleChange) {
            const event = {
                target: { name: 'text', value },
            };
            handleChange(event as any);
        }
    };

    return (
        <div className='flex'>
            <div className='w-full'>
                <div className='w-full md:mb-0 p-2'>
                    <input
                        className="input"
                        placeholder='כותרת ראשונה'
                        name='title'
                        value={about?.title || ''}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div className='w-full md:mb-0 p-2'>
                    <RichText value={about?.text} handleChange={handleChangeRich}/>
                </div>
            </div>
            <div className='w-full md:mb-0 p-2'>
                <ButtonUploadFile htmlForData='html-for-pic' handleChange={handleFileToFiles} folder={'assets'} fileName={about?.pic?.fileName} urlFile={about?.pic?.url} index='pic' accept='image/*'/>
                {about?.pic?.url && <Image src={about?.pic?.url} alt={about?.pic?.alt || ""} unoptimized={true} width={0} height={0} className='object-contain w-full h-[215px] rounded-[24px]' sizes='100vw' quality={100}/>}
                <div className='w-full md:mb-0 py-2'>
                    <input
                        className="input h-10"
                        placeholder='כותרת אלטרנטיבית'
                        name='pic'
                        value={about?.pic?.alt || ''}
                        onChange={handleAltPic}
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    )
}
export default FirstSection
