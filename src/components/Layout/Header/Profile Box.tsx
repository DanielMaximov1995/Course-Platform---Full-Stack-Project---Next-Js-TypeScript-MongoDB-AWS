'use client'

import AccountIcon from "@/components/Icons/Account Icon";
import {signIn, signOut, useSession} from "next-auth/react";
import RestrictedUserContent from "@/components/Restricted User Content";
import {useState, useRef, useEffect} from "react";
import UsersIcon from "@/components/Icons/Users Icon";
import AcademicIcon from "@/components/Icons/Academic Icon";
import Modal from "@/components/Modal";
import Main from "@/components/Layout/Users Area/Main";
import MainLessons from "@/components/Layout/Lessons Area/Main";
import MainUsers from "@/components/Layout/Users Area/Main";
import RestrictedAdminContent from "@/components/Restricted Admin Content";
import {UserType} from "@/types/SchemasType";
import {ImportsTypes} from "@/types/Layout";

const ProfileBox = ({allUsers , allLessons} : ImportsTypes) => {
    const {data : user , status , update} = useSession()
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
                <AccountIcon fontSize={40}/>
            </button>
            <div ref={boxRef} className={`bg-accentBg dark:bg-accentSec dark:shadow-[0_35px_60px_-15px_rgba(250, 231,208,0.3)] shadow-[0_35px_60px_-15px_rgba(26,33,56,0.3)] rounded p-2 w-[270px] z-50 h-auto absolute -left-10 top-[100%] mt-4 transition-all duration-300 ${!open ? 'opacity-0 hidden' : 'block opacity-100'}`}>
                <div className=''>
                    <RestrictedUserContent>
                        <RestrictedAdminContent>
                            <div className='py-2'>
                                <MainUsers allUsers={allUsers}/>
                            </div>
                            <div className='py-2 '>
                                <MainLessons allLessons={allLessons}/>
                            </div>
                        </RestrictedAdminContent>
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
