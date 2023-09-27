'use client'

import UsersIcon from "@/components/Icons/Users Icon";
import Modal from "@/components/Modal";
import {useState , ReactNode} from "react";
import AcademicIcon from "@/components/Icons/Academic Icon";
import AddNewLesson from "@/components/Layout/Lessons Area/Add New Lesson";
import {LessonType} from "@/types/SchemasType";
import Lessons from "@/components/Layout/Lessons Area/Lessons";

const MainLessons = ({allLessons} : { allLessons : LessonType }) => {
    const [openLessonState, setOpenLessonState] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabIndex = (index : number) => {
        setTabIndex(index)
    }

    const tabs = ['כל השיעורים' , 'הוסף שיעור']

    const viewTab : { [key: number]: ReactNode }= {
        0: <Lessons allLessons={allLessons}/>,
        1 : <AddNewLesson handleTabIndex={handleTabIndex}/>
    }

    const ViewTabCurrent = viewTab[tabIndex]

    return (
        <>
            <button
                onClick={() => setOpenLessonState(prev => !prev)}
                className='hover:tracking-wider gap-x-2 items-center w-full dark:text-accentBg text-accentSec rounded transition-all p-1.5 duration-300 flex justify-center text-[20px]'>
                <AcademicIcon fontSize={30}/>
                <span>שיעורים</span>
            </button>
            <Modal isOpen={openLessonState} onClose={() => setOpenLessonState(prev => !prev)}>
                <div className='w-full md:w-auto h-auto z-50 p-6 bg-accentSec dark:bg-accentBg rounded'>
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
export default MainLessons
