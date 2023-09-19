'use client'
import ThemeSwitcher from "@/components/Layout/Header/Theme Switcher";
import Image from "next/image";
import Link from "next/link";
import IconButton from "@/components/IconButton";
import AccountIcon from "@/components/Icons/Account Icon";

const menu = [
    {id : 0 , name : 'עמוד הבית' , path : '/'},
    {id : 1 , name : 'אודות' , path : '/אודות'},
    {id : 2 , name : 'צרו קשר' , path : '/צרו-קשר'},
    {id : 3 , name : 'קורס' , path : '/lessons'},
]

const session = {
    true : '',
    false : ''
}


const IndexHeader = () => {
    return (
        <header className='flex justify-between shadow items-center w-full h-[100px]'>
            <div className='flex justify-between items-center w-[90%] mx-auto'>
                <div className='items-center flex'>
                    <Image src='/logo.png' alt='' className='object-contain' width={150} height={150}/>
                    <div className='mr-10 flex items-center gap-x-12'>
                        {
                            menu.map(item => <Link className='text-[18px] hover:font-semibold hover:tracking-wider hover:text-accent transition-all duration-300' key={item.id} href={item.path}>{item.name}</Link>)
                        }
                    </div>
                </div>
                <div className='flex items-center gap-x-4'>
                    <ThemeSwitcher/>
                {/*<IconButton className='bg-accentSec text-accentBg hover:text-accentSec'>*/}
                    <button className='bg-accentSec dark:bg-accentBg rounded-full text-accentBg dark:text-accentSec transition-all duration-300'>
                    <AccountIcon fontSize={40}/>
                    </button>
                {/*</IconButton>*/}
                </div>
            </div>
        </header>
    )
}
export default IndexHeader