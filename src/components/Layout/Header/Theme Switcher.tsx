'use client'
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import MoonIcon from "@/components/Icons/Moon Icon";
import SunIcon from "@/components/Icons/Sun Icon";

const ThemeSwitcher = () => {
    const { theme , setTheme } = useTheme()
    const [mounted, setMounted] = useState(false);

    const handleDarkLightMode = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    useEffect(() => {
        setMounted(true)
    },[])

    if(!mounted) {
        return null
    }

    return (
        <div>
            <div className='inline-flex items-center gap-2 my-4 cursor-pointer' onClick={handleDarkLightMode}>
                <div className={`w-16 h-8 relative bg-accentBg dark:bg-accentSec shadow px-1 flex items-center rounded-2xl transition-all duration-300`}>
                    <span className={`absolute p-3 bg-white dark:bg-accentBg rounded-full ${theme === 'light' && 'mr-8'} duration-300 transition-all`}/>
                        <div className='flex gap-x-4'>
                            <span className='text-accentSec'><MoonIcon fontSize={20}/></span>
                            <span className='text-accentBg'><SunIcon fontSize={20}/></span>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default ThemeSwitcher
