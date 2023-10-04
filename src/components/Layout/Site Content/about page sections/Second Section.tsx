'use client'

import {SectionsTypeContents} from "@/types/Layout";
import ButtonUploadFile from "@/components/Button Upload File";
import Image from "next/image";
import RichText from "@/components/Rich Text";

const SecondSection = (props : SectionsTypeContents) => {
    const { about, handleChange } = props;

    const handleChangeRich = (value: string) => {
        if (handleChange) {
            const event = {
                target: { name: 'text1', value },
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
                        placeholder='כותרת'
                        name='title1'
                        value={about?.title1 || ''}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div className='w-full md:mb-0 p-2'>
                        <RichText value={about?.text1} handleChange={handleChangeRich}/>
                        {/*<textarea*/}
                        {/*    className="text-area"*/}
                        {/*    placeholder='תיאור'*/}
                        {/*    name='text1'*/}
                        {/*    value={about?.text1 || ''}*/}
                        {/*    onChange={handleChange}*/}
                        {/*    autoComplete="off"*/}
                        {/*/>*/}
                </div>
            </div>
        </div>
    )
}
export default SecondSection
