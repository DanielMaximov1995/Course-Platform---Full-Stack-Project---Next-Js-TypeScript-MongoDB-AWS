'use client'
import ThemeSwitcher from "@/components/Layout/Header/Theme Switcher";
import Image from "next/image";
import Link from "next/link";
import IconButton from "@/components/IconButton";
import AccountIcon from "@/components/Icons/Account Icon";
import TooltipBottom from "../../Tooltip Bottom";
import {useSession , signIn , signOut} from 'next-auth/react'
import {useSearchParams , useRouter} from "next/navigation";
import GoogleButton from "@/components/Google Button";
import {useEffect, useState} from "react";
import AuthError from "@/components/Home Page/AuthError";
import ProfileBox from "@/components/Layout/Header/Profile Box";

const menu = [
    {id: 0, name: 'עמוד הבית', path: '/'},
    {id: 1, name: 'מה מקבלים?', path: '/#מה_מקבלים?'},
    {id: 2, name: 'אודות', path: '/אודות'},
    {id: 3, name: 'צרו קשר', path: '/צרו-קשר'},
    {id: 4, name: 'קורס', path: '/lessons'},
]

const IndexHeader = () => {
    const {data : user , status , update} = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()


    // useEffect(() => {
    //     console.log(error)
    //     if(error) {
    //         switch (error) {
    //             case 'false':
    //                 toast.error('משתמש זה לא קיים!')
    //                 router.push('/')
    //                 break;
    //             default:
    //                 toast.error('שגיאה בהתחברות נסו מאוחר יותר !')
    //                 router.push('/')
    //         }
    //     }
    // }, []);

    // const account = {
    //     authenticated : <TooltipBottom title={user?.user?.fullName || ''}>
    //         <button
    //             onClick={() => signOut({redirect :false})}
    //             className='bg-accentSec dark:bg-accentBg rounded-full text-accentBg dark:text-accentSec transition-all duration-300'>
    //             <AccountIcon fontSize={40}/>
    //         </button>
    //     </TooltipBottom>,
    //     unauthenticated : <button
    //         onClick={() => setUserAction(prev => !prev)}
    //         className='bg-accentSec dark:bg-accentBg rounded-full text-accentBg dark:text-accentSec transition-all duration-300'>
    //         <AccountIcon fontSize={40}/>
    //     </button>,
    //     loading : <div className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]">
    //         <div className="relative w-full h-full rounded-full overflow-hidden">
    //             <div className="progress__circle border-accent border-2">
    //             </div>
    //         </div>
    //     </div>
    // }

    return (
        <header className='flex fixed bg-accentSec dark:bg-accentBg z-50 justify-between shadow items-center w-full h-[100px]'>
            <AuthError searchParams={searchParams.get('error')}/>
            <div className='flex justify-between items-center w-[90%] mx-auto'>
                <div className='items-center flex'>
                    <Link href='/'>
                    <Image src='/logo.png' alt='' className='object-contain' width={150} height={150}/>
                    </Link>
                    <div className='mr-10 flex items-center gap-x-12'>
                        {
                            menu.map(item => <Link
                                className='text-[18px] hover:font-semibold hover:tracking-wider hover:text-accent transition-all duration-300'
                                key={item.id} href={item.path}>{item.name}</Link>)
                        }
                    </div>
                </div>
                <div className='flex items-center gap-x-4'>
                    <ThemeSwitcher/>
                    <ProfileBox />
                </div>
            </div>
        </header>
    )
}
export default IndexHeader