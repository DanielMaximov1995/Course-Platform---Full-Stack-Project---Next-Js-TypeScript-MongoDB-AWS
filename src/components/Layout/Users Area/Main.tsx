'use client'

import UsersIcon from "@/components/Icons/Users Icon";
import Modal from "@/components/Modal";
import {ReactNode, useState} from "react";
import Users from "@/components/Layout/Users Area/Users";
import AddNewUser from "@/components/Layout/Users Area/Add New User";
import {UserType} from "@/types/SchemasType";
import {CloseIcon} from "@/components/Icons";

const MainUsers = ({allUsers} : { allUsers : UserType[] }) => {
    const [openUsersState, setOpenUsersState] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabIndex = (index : number) => {
        setTabIndex(index)
    }


    const tabs = ['כל המשתמשים' , 'הוסף משתמש']

    const viewTab : { [key: number]: ReactNode }= {
        0 : <Users allUsers={allUsers}/>,
        1 : <AddNewUser handleTabIndex={handleTabIndex}/>
    }

    const ViewTabCurrent = viewTab[tabIndex]

    return (
        <>
            <button
                onClick={() => setOpenUsersState(prev => !prev)}
                className='hover:tracking-wider gap-x-2 items-center w-full dark:text-accentBg text-accentSec rounded transition-all p-1.5 duration-300 flex justify-center text-[20px]'>
                <UsersIcon fontSize={30}/>
                <span>משתמשים</span>
            </button>
            <Modal isOpen={openUsersState} onClose={() => setOpenUsersState(prev => !prev)}>
                <div className='w-full md:w-auto h-auto z-50 p-6 bg-accentSec dark:bg-accentBg relative rounded'>
                    <button onClick={() => setOpenUsersState(prev => !prev)}><CloseIcon fontSize={30} color='error'/></button>
                    <div className='w-full mx-auto'>
                        <div className='flex my-4 justify-center gap-x-8'>
                            {
                                tabs.map((tab , index) => (
                                    <button key={index} className={`hover:tracking-wider hover:font-semibold ${tabIndex === index ? 'dark:text-accent tracking-wider font-semibold' : 'text-accentBg dark:text-accentSec'} hover:dark:text-accent transition-all duration-300 text-[24px]`} onClick={() => setTabIndex(index)}>{tab}</button>
                                ))
                            }
                        </div>
                        {ViewTabCurrent}
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default MainUsers