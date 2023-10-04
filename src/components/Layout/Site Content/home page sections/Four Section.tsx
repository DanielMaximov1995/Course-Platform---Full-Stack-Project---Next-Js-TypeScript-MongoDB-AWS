'use client'

import ButtonUploadFile from "@/components/Button Upload File";
import Image from "next/image";
import {SectionsTypeContents} from "@/types/Layout";
import {ChangeEvent, useState} from "react";
import {BoxesWithImageType} from "@/types/SchemasType";
import IconPicker from "@/components/Icon Picker";

const FourSection = (props: SectionsTypeContents) => {
    const { home , handleChange} = props;

    const handleIconSelect = (iconName: string , id : string) => {
        if (handleChange) {
            const event = {
                target: { name: 'icon', value: iconName, id: id },
            };
            handleChange(event as any);
        }
    };


    return (
        <div className='flex flex-wrap'>
            {
                home?.boxesWithIcon?.map((box , index) =>
                <div key={index} className='p-2 w-1/2'>
                    <div className='border-accentBg dark:border-accentSec border-[1px]'>
                        <div className='w-full md:mb-0 p-2'>
                            <IconPicker onSelect={(iconName : string) => handleIconSelect(iconName , index.toString())} selected={box?.icon}/>
                        </div>
                        <div className='w-full md:mb-0 p-2'>
                            <input
                                className="input h-10"
                                placeholder='כותרת'
                                name='title'
                                id={index.toString()}
                                value={box?.title || ''}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className='w-full md:mb-0 p-2'>
                            <textarea
                                className="text-area"
                                placeholder='תיאור'
                                name='subTitle'
                                id={index.toString()}
                                value={box?.subTitle || ''}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    )
}
export default FourSection
