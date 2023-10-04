import {getLessonByOrder, getLessons} from "@/services/getData";
import React from "react";
import LessonComp from "@/components/Lessons/LessonComp";
import LessonPage from "@/components/Lessons/LessonPage";
import ContactLesson from "@/components/Lessons/Contact Lesson";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

type Props = {
    searchParams ?: { [key: string] : string | string[] | undefined | any};
}

const Lessons = async (props : Props) => {
    const lessons = await getLessons()
    const order = props.searchParams!.lesson
    let lesson =  await getLessonByOrder(order)
    const session = await getServerSession(authOptions);

    return (
        <main className="flex md:h-screen flex-col items-center justify-between pt-16">
                <h1 className='h2 border-x-[4px] border-accentBg dark:border-accent px-6 md:px-40 mt-20 rounded-xl text-accentBg dark:text-accent'>קורס</h1>
                <section className='w-[90%] mx-auto md:h-screen'>
                    <div className={`flex flex-wrap ${order ? "justify-evenly" : "gap-x-10"}`}>
                        <div className='md:order-0 order-1'>
                            <LessonComp lessons={lessons} order={parseInt(order)}/>
                        </div>
                        <div className='md:order-1 order-0'>
                            {
                                parseInt(order) > 0 && !session ? <ContactLesson order={parseInt(order)}/> :
                            <LessonPage lesson={lesson} lessonsLength={lessons.length -1} order={parseInt(order)}/>
                            }
                        </div>
                    </div>
                </section>
        </main>
    )
}
export default Lessons
