'use client'

import TooltipBottom from "@/components/Tooltip Bottom";
import AccountIcon from "@/components/Icons/Account Icon";
import GoogleButton from "@/components/Google Button";
import {signIn, signOut, useSession} from "next-auth/react";
import RestrictedUserContent from "@/components/Restricted User Content";
import {useState} from "react";

const ProfileBox = () => {
    const {data : user , status , update} = useSession()
    const [open, setOpen] = useState(false);


    return (
        <div className='relative'>
            <button onClick={() => setOpen(prev => !prev)}
                    className='bg-accentSec dark:bg-accentBg rounded-full text-accentBg dark:text-accentSec transition-all duration-300'>
                <AccountIcon fontSize={40}/>
            </button>
            <div className={`bg-accentBg dark:bg-accentSec dark:shadow-[0_35px_60px_-15px_rgba(250, 231,208,0.3)] shadow-[0_35px_60px_-15px_rgba(26,33,56,0.3)] rounded p-2 w-[300px] z-50 h-auto absolute -left-10 top-[100%] mt-4 transition-all duration-300 ${!open ? 'opacity-0 hidden' : 'block opacity-100'}`}>
                <div className='flex flex-nowrap justify-center items-center'>
                    <RestrictedUserContent>
                        <button
                            onClick={() => signOut({redirect :false})}
                            className='bg-accentSec dark:bg-accentBg rounded-full text-accentBg dark:text-accentSec transition-all duration-300'>
                            <span>התנתקות</span>
                        </button>
                    </RestrictedUserContent>
                </div>
            </div>
        </div>

    )
}
export default ProfileBox
