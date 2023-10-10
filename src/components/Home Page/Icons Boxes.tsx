'use client'

import {BoxesWithIconType} from "@/types/SchemasType";
import * as Icons from "@/components/Icons";
import {IconComponent} from "@/components/Icon Picker";

const IconsBoxes = ({boxesWithIcon} : {boxesWithIcon ?: BoxesWithIconType[]}) => {
    return (
        <>
            {
                boxesWithIcon?.map((boxIcon : BoxesWithIconType) => {
                    const iconComponents: IconComponent = Icons;
                    const IconComponent = iconComponents[boxIcon?.icon!];
                    return <div key={boxIcon?._id?.toString()} className='w-1/2 p-2'>
                        <div className='bg-accentBg dark:bg-accentSec p-2 py-4 h-[260px] rounded-xl'>
                            <span className='flex justify-center dark:text-accentBg text-accent '><IconComponent fontSize={80}/></span>
                            <p className='text-center text-accent dark:text-accentBg text-[22px]'>{boxIcon?.title}</p>
                            <p className='text-center text-accentSec dark:text-accentBg'>{boxIcon?.subTitle}</p>
                        </div>
                    </div>
                } )
            }
        </>
    )
}
export default IconsBoxes
