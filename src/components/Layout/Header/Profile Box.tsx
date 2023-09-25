'use client'

import TooltipBottom from "@/components/Tooltip Bottom";
import AccountIcon from "@/components/Icons/Account Icon";
import GoogleButton from "@/components/Google Button";
import {signIn, signOut, useSession} from "next-auth/react";
import RestrictedUserContent from "@/components/Restricted User Content";
import {useState} from "react";
import AddUserIcon from "@/components/Icons/Add User Icon";
import UsersIcon from "@/components/Icons/Users Icon";
import AcademicIcon from "@/components/Icons/Academic Icon";

const ProfileBox = () => {
    const {data : user , status , update} = useSession()
    const [open, setOpen] = useState(false);


    return (
        <div className='relative mt-1'>
            <button onClick={() => setOpen(prev => !prev)}
                    className='bg-accentSec dark:bg-accentBg rounded-full text-accentBg dark:text-accentSec transition-all duration-300'>
                <AccountIcon fontSize={40}/>
            </button>
            <div className={`bg-accentBg dark:bg-accentSec dark:shadow-[0_35px_60px_-15px_rgba(250, 231,208,0.3)] shadow-[0_35px_60px_-15px_rgba(26,33,56,0.3)] rounded p-2 w-[270px] z-50 h-auto absolute -left-10 top-[100%] mt-4 transition-all duration-300 ${!open ? 'opacity-0 hidden' : 'block opacity-100'}`}>
                <div className=''>
                    <RestrictedUserContent>
                        <div className=' py-2'>
                            <button
                                className='hover:tracking-wider gap-x-2 items-center w-full dark:text-accentBg text-accentSec rounded transition-all p-1.5 duration-300 flex justify-center text-[20px]'>
                                <UsersIcon fontSize={30}/>
                                <span>משתמשים</span>
                            </button>
                        </div>
                        <div className='py-2 '>
                            <button
                                className='hover:tracking-wider gap-x-2 items-center w-full dark:text-accentBg text-accentSec rounded transition-all p-1.5 duration-300 flex justify-center text-[20px]'>
                                <AcademicIcon fontSize={30}/>
                                <span>שיעורים</span>
                            </button>
                        </div>
                        <button
                            onClick={() => signOut({redirect :false})}
                            className='hover:tracking-wider flex gap-x-2 items-center dark:bg-accentBg w-full bg-accent dark:text-accentSec text-accentBg rounded transition-all p-1.5 duration-300 justify-center flex text-[20px]'>
                            <span>התנתקות</span>
                        </button>
                    </RestrictedUserContent>
                </div>
            </div>
        </div>

    )
}
export default ProfileBox
