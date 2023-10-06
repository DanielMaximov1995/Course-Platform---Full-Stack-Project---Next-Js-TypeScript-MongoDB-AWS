'use client'

import React, {useEffect, useRef, useState} from "react";
import RestrictedUserContent from "@/components/Restricted User Content";
import RestrictedAdminContent from "@/components/Restricted Admin Content";
import MainUsers from "@/components/Layout/Users Area/Main";
import MainLessons from "@/components/Layout/Lessons Area/Main";
import MainContent from "@/components/Layout/Site Content/Main";
import MainSetting from "@/components/Layout/Setting Area/Main";
import {signOut} from "next-auth/react";
import {HamburgerIcon} from "@/components/Icons";
import Link from "next/link";

type MenuType = {
    id: number;
    name: string;
    path: string;
}[];

const ResponsiveMenu = ({menu} : {menu : MenuType}) => {
    const [open, setOpen] = useState(false);
    const boxRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleOutsideClick = (event : MouseEvent) => {
            if (
                boxRef.current &&
                !boxRef?.current?.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef?.current?.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [boxRef, buttonRef, setOpen]);


    return (
        <div className='relative mt-1'>
            <button ref={buttonRef} onClick={() => setOpen(prev => !prev)}
                    className='bg-accentSec dark:bg-accentBg rounded-full text-accentBg dark:text-accentSec transition-all duration-300'>
                <HamburgerIcon fontSize={40}/>
            </button>
            <div ref={boxRef} className={`bg-accentBg dark:bg-accentSec dark:shadow-[0_35px_60px_-15px_rgba(250, 231,208,0.3)] shadow-[0_35px_60px_-15px_rgba(26,33,56,0.3)] rounded p-2 w-[170px] z-50 h-auto absolute  top-[100%] mt-4 transition-all duration-300 ${!open ? 'opacity-0 hidden' : 'block opacity-100'}`}>
                <div className='flex flex-wrap'>
                    {
                        menu.map(item => <Link
                            className='text-[18px] w-full p-2 hover:font-semibold text-accentSec dark:text-accentBg hover:tracking-wider hover:text-accent transition-all duration-300'
                            key={item.id} href={item.path}>{item.name}</Link>)
                    }
                </div>
            </div>
        </div>
    )
}
export default ResponsiveMenu
