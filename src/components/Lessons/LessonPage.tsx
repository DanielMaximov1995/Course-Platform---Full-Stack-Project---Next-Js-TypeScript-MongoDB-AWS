'use client'

import {LessonType} from "@/types/SchemasType";
import {useSession} from "next-auth/react";
import VideoPlayer from "@/components/Video Player";
import {useRouter} from "next/navigation";
import {updateLessonById, updateUserById} from "@/services/fetchData";
import {Fragment} from "react";
import HorizontalForm from "@/components/Home Page/Horizontal Form";
import ContactLesson from "@/components/Lessons/Contact Lesson";
import WelcomeLesson from "@/components/Lessons/Welcome Lesson";

type LessonPageType = {
    lesson : LessonType;
    lessonsLength : number;
    order : number;
}

const LessonPage = ({lesson , lessonsLength , order} : LessonPageType) => {
    const { data: user, status, update } = useSession();
    let lessonOrder = lesson?.order!
    let completedLesson: boolean | undefined;
    const router = useRouter()
    const isLogin = status === 'authenticated'
    const userLessons = user?.user.lessonsCompleted

    if (userLessons) {
        if (lessonOrder !== undefined) {
            completedLesson = userLessons[lessonOrder];
        }
    } else {
        completedLesson = undefined;
    }

    const handleCompleted = async () => {
        let lessons = {
            lessonsCompleted: {
                ...userLessons,
                [lessonOrder]: !userLessons![lessonOrder]
            }
        }
        await updateUserById(user?.user._id , lessons)

        await update({
            ...user,
            user : {
                ...user?.user,
                ...lessons
            }
        })
    }


    return (
        <div className='my-1'>
                <VideoPlayer lesson={lesson}/>
            {
                isLogin && !isNaN(order) ?
                <Fragment>
                    <div className='my-2 flex justify-between'>
                        <button onClick={() => router.push(`?lesson=${lessonOrder! - 1}`)} disabled={lessonOrder === 0} className='dark:bg-accent bg-accentBg disabled:opacity-50 py-2 px-4 text-[22px] text-white'>שיעור קודם</button>
                        <button onClick={handleCompleted} className={`${completedLesson ? "bg-gray-600" : "bg-green-600"} py-2 px-4 text-[22px] text-white`}>{completedLesson ? "השיעור הושלם" : "השלם שיעור"}</button>
                        <button onClick={() => router.push(`?lesson=${lessonOrder! + 1}`)} disabled={lessonOrder === lessonsLength} className='dark:bg-accent disabled:opacity-50 bg-accentBg py-2 px-4 text-[22px] text-white'>שיעור הבא</button>
                    </div>
                </Fragment> : null
            }
            {
                order !== null && !isLogin ?
                <ContactLesson /> : isNaN(order) && isLogin  ? <WelcomeLesson/> : ''
            }
        </div>
    )
}
export default LessonPage
