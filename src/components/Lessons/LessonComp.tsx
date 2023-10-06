'use client'
import React, {Fragment, useEffect} from 'react'
import {LessonFilesType, LessonType} from "@/types/SchemasType";
import {useRouter, useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import { useState } from 'react'
import ShowVideoButton from "@/components/Lessons/Show Video Button";
import Link from "next/link";
import DownloadIcon from "../Icons/Download Icon";
import { ChevronIcon } from '@/components/Icons'

type LessonsCompType = {
    lessons : LessonType[];
    order : number
}

const LessonComp = ({lessons , order : orderNow}: LessonsCompType) => {
    const {data: user, status, update} = useSession()
    const [order, setOrder] = useState<null | number>(null);
    const isLogin = status === 'authenticated'

    useEffect(() => {
        setOrder(orderNow)
    },[orderNow])

    const handlePick = (orderNew: number) => {
        setOrder(prev => prev === orderNew ? null : orderNew)
         // router.push(orderNew === order ? '/lessons' : `?lesson=${orderNew}`)
    }

    return (
        <div className="flex flex-col md:w-[400px]">
            {
                lessons.map(lesson => {
                    let active = order === lesson.order
                    return <div className='my-1' key={lesson?._id?.toString()}>
                        <button onClick={() => handlePick(lesson.order!)}
                                className="group border-t border-r border-l border-accentBg w-full dark:border-accentSec dark:bg-accentSec bg-accentBg">
                            <div
                                className={`flex items-center justify-between h-16 px-3 group-hover:font-bold transition-all duration-300 group-hover:tracking-widest text-accentSec dark:text-accentBg text-[22px] ${active && 'font-bold tracking-widest'}`}>
                                <span >{lesson.title}</span>
                                <span className={`${active && 'rotate-180'} transition-all duration-300`}><ChevronIcon position={'bottom'}/></span>
                            </div>
                        </button>
                            <div className={`${active ? 'max-h-max' : 'max-h-0'} px-2 overflow-hidden transition-all duration-300 dark:bg-accentSec bg-accentBg text-accentSec dark:text-accentBg`}>
                                <p className='whitespace-pre-wrap text-[20px]'>
                                    {lesson.description}
                                </p>
                                <div className='flex items-center justify-between'>
                                    {
                                        lesson?.files?.length! > 0 && isLogin ? <div>
                                            {
                                                lesson?.files!.map((file : LessonFilesType) =>
                                                    <Link className='text-white flex justify-center items-center gap-2 max-w-max px-2 bg-accentSec dark:bg-accentBg text-[22px]' key={file?._id!.toString()} href={file.url!}>
                                                        <span><DownloadIcon/></span>
                                                        {file.title}
                                                    </Link>
                                                )
                                            }
                                        </div>  : null
                                    }
                                    <div className={!isLogin ? 'w-full' : ''}>
                                        <ShowVideoButton order={lesson.order!} free={lesson.free!} isLoginIn={status === 'authenticated'}/>
                                    </div>
                                </div>
                            </div>
                    </div>
                })
            }
        </div>
    )
}
export default LessonComp
