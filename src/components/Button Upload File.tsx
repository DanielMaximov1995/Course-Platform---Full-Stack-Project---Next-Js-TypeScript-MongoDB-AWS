'use client'
import {ChangeEvent, FC, InputHTMLAttributes, ReactNode} from "react";

interface ButtonUploadFileProps extends InputHTMLAttributes<HTMLInputElement> {
    titleFile?: string;
    index ?: string
    fileName?: string;
    icon?: ReactNode;
}

const ButtonUploadFile: FC<ButtonUploadFileProps> = ({ fileName, index , icon, ...props }) => {

    return (
        <div className='flex w-full h-12 overflow-x-hidden max-h-max'>
            <label htmlFor='uploadFor' className='text-[16px] flex items-center rounded-r-md px-2 h-auto bg-accent dark:bg-accentSec dark:text-accentBg text-accentSec'>
                <span>{icon}</span>
            </label>
            <input
                id='uploadFor'
                data-id={index}
                hidden
                {...props}
                type="file"
            />
            <label htmlFor='uploadFor' className='bg-white w-full h-full flex items-center my-0 pr-1 text-[14px]'>
                { fileName || 'לא נבחר קובץ' }
            </label>

        </div>
    )
}
export default ButtonUploadFile
