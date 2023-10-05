'use client'

import {useEffect, useState} from "react";
import {ChevronIcon} from "@/components/Icons";

const ScrollTop = () => {
    const [scrollPosition, setScrollPosition] = useState(false);
    const handleScroll = () => {
        const currentPosition = window.scrollY || window.pageYOffset;
        setScrollPosition(currentPosition >= 100);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollTopHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    if (scrollPosition) {
        return (
            <div onClick={scrollTopHandler}
                 className={`fixed bottom-4 z-high right-4 ${scrollPosition ? 'opacity-100' : 'opacity-0'} effect`}>
                <div className='bg-accentBg dark:bg-accent fixed shadow-[0_3px_6px_rgb(0,0,0,0.29)] effect cursor-pointer bottom-2 right-2 rounded-full p-1'>
                    <ChevronIcon position='up'  fontSize={35} color='info'/>
                </div>
            </div>
        )
    }
}
export default ScrollTop
